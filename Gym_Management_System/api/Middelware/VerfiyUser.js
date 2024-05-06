import  Jwt  from "jsonwebtoken";
import { error } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(error(401, 'Unauthorized'));
    }
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
   
        if(err) {
            return next( error(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });

};