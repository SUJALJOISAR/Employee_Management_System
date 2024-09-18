import Router from 'express';
import db from '../db/connection.js';
import jwt from 'jsonwebtoken';
import { hash,compare } from 'bcrypt';
import multer from 'multer';
import path from 'path';

const employeerouter=Router();

employeerouter.post("/employeelogin",(req,res)=>{
    const sql = "SELECT * from employee where email =? "
    db.query(sql,[req.body.email],(err,results)=>{ 
        if(err) { 
            res.json({loginStatus:false,Error:"Query Error"})
        }
        if(results.length > 0){
            compare(req.body.password,results[0].password,(err,response)=>{
                if(err) return res.json({loginStatus:false,Error:"Query Error"});
                if(response){
                    const email=results[0].email;
                    const employeetoken = jwt.sign(
                        {role:"employee",email:email,id:results[0].id}, //payload
                        process.env.JWT_SECRET,//secret key
                        {expiresIn:"1d"}
                    );
                    res.cookie(process.env.COOKIE_NAME2,employeetoken,{
                        httpOnly:true,
                        secure:true,
                        signed:true,
                        sameSite:'none'
                    });
                    return res.json({loginStatus:true,id:results[0].id});
                }
            })
        }
        else{
            return res.json({loginStatus:false,Error:"wrong email or password"});
        }
    })
});

employeerouter.get('/detail/:id',(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM employee where id=?";
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false});
        return res.json(result);
    })
});

employeerouter.get('/logout',(req,res)=>{
    res.clearCookie(process.env.COOKIE_NAME2);
    return res.json({Status:true})
})

export default employeerouter;