import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const signupRoute ={
    path :'/api/signup',
    method: 'post',
    handler : async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection();

        const user = await db.collection('users').findOne({ email })


        if (user) {
            console.log("errr")
            res.sendStatus(409)
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const startingInfo = {
            hairColor:'',
            favouriteFood: '',
            bio: '',
        }
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false
        })
        const { insertedId } = result;

        jwt.sign({
            id: insertedId,
            email,
            info:startingInfo,
            isVerified: false
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
    }
}