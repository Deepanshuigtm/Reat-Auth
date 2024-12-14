import { getDbConnection } from "../db"
import { ObjectID } from 'mongodb';
import jwt from 'jsonwebtoken'

export const updateUserInfoRoute ={
    path:'/api/users/:userId',
    method:'put',
    handler:async (req, res)=>{
        // console.log("hdhd", req)
        const { authorization } = req.headers
        const { userId } = req.params
        console.log("sss",authorization)

        const updates = (({
            favouriteFood,
            hairColor,
            bio
        })=>({
            favouriteFood,
            hairColor,
            bio
        }))(req.body)

        if (!authorization){
            
            return res.status(401).json({ message: "No authorization header sent" })
        }

        const token = authorization.split(' ')[1];
        

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify token" });
        
            const { id } = decoded;
            if (id !== userId) return res.status(403).json({ message: "Not allowed to update that user's data" });
        
            const db = getDbConnection();
            console.log("ddd2", id);
        
            try {
                const result = await db.collection('users').findOneAndUpdate(
                    { _id: new ObjectID(id) },  // Ensure correct conversion to ObjectID
                    { $set: { info: updates } },
                    { returnOriginal: false }   // Corrected typo
                );
        
                if (!result.value) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                const { email, isVerified, info } = result.value;
        
                jwt.sign(
                    { id, email, isVerified, info },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            return res.status(500).json({ message: "Error signing token", error: err });
                        }
                        res.status(200).json({ token });
                    }
                );
            } catch (error) {
                console.error("Error updating user data:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}