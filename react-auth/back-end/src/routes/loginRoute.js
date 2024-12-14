

import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginRoute ={
    path :'/api/login',
    method: 'post',
    handler : async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection();

        const user = await db.collection('users').findOne({ email })

        if (!user) {
            
            res.sendStatus(409)
        }else{
            const { _id: id, isVerified, passwordHash, info} = user

        const isCorrect = await bcrypt.compare(password, passwordHash)

        if (isCorrect){
            jwt.sign({
                id,
                isVerified,
                email,
                info,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            },
            (err, token)=>{
                if(err){
                    return res.status(500).send(err)
                }
                res.status(200).json({ token })
            });
    
        }else{
            res.sendStatus(401)
        }
        }
    }
}