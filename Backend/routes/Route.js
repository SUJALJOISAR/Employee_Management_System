import Router from 'express';
import db from '../db/connection.js';
import jwt from 'jsonwebtoken';

const appRouter=Router();

appRouter.post("/adminlogin",(req,res)=>{
    const sql = "SELECT * from admin where email =?  and password= ?"
    db.query(sql,[req.body.email,req.body.password],(err,results)=>{ 
        if(err) { 
            res.json({loginStatus:false,Error:"Query Error"})
        }
        if(results.length > 0){
            const email = results[0].email;
            const token = jwt.sign(
                {role:"admin",email:email}, //payload
                process.env.JWT_SECRET,//secret key
                {expiresIn:"1d"}
            );
            res.cookie(process.env.COOKIE_NAME,token,{
                httpOnly:true,
                secure:true,
                signed:true,
                sameSite:'none'
            });
            return res.json({loginStatus:true})
        }
        else{
            return res.json({loginStatus:false,Error:"wrong email or password"});
        }
    })
});

export default appRouter;