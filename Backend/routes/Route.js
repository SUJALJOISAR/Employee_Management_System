import Router, { query } from 'express';
import db from '../db/connection.js';
import jwt from 'jsonwebtoken';
import { hash,compare } from 'bcrypt';
import multer from 'multer';
import path from 'path';

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
                {role:"admin",email:email,id:results[0].id}, //payload
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

appRouter.post('/add_category', (req, res) => {
    // console.log('Category received:', req.body.category);
    const sql = "INSERT INTO category (name) VALUES  (?)";
    db.query(sql, [req.body.category], (err, result) => {
        if (err) {
            console.error('Error in query:', err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});

appRouter.get('/category',(req,res)=>{
    const sql="SELECT * FROM category";
    db.query(sql, (err,result)=>{
        if(err){ return res.json({Status:false,Error:"Query Error"})}
        return res.json({Status:true,Result:result});
    });
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" +Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage: storage,
})

appRouter.post('/add_employee',upload.single('image') ,(req, res) => {
    //  console.log(req.body);
    // const { name, email, password, address, salary, category_id } = req.body;  
    hash(req.body.password.toString(),10,(err,hash)=>{
        if (err) {
            console.error('Error in query:', err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        const sql = "INSERT INTO employee (name,email,password,address,salary,image,category_id) VALUES  (?)";
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id
        ]
        // console.log("Final Values are:",values);
        db.query(sql, [values], (err, result) => { 
            if (err) {
                console.error('Error in query:', err);
                return res.json({ Status: false, Error: "Query Error" });
            }
            return res.json({ Status: true });
        });
    });
});

appRouter.get("/employee",(req,res)=>{
    const sql="SELECT * FROM employee";
    db.query(sql,(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.get('/employee/:id',(req,res)=>{
    const id=req.params.id; //or const {id}=req.params
    // console.log(id);
    const sql="SELECT * FROM employee where id=?";
    db.query(sql,[id],(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.put('/edit_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="UPDATE employee SET name=?, email=?, address=?, salary=?, category_id=? where id=?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.salary,
        req.body.category_id
    ]
    db.query(sql,[...values,id],(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"+err}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM employee WHERE id=?";
    db.query(sql,[id],(err,result)=>{ 
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    });
})

appRouter.get('/admin_count',(req,res)=>{
    const sql="SELECT COUNT(id) as admin from admin";
    db.query(sql,(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.get('/employee_count',(req,res)=>{
    const sql="SELECT COUNT(id) as employee from employee";
    db.query(sql,(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.get('/salary_count',(req,res)=>{
    const sql="SELECT SUM(salary) as salary from employee";
    db.query(sql,(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
    })
})

appRouter.get('/admins',(req,res)=>{
    const sql="SELECT * FROM admin";
    db.query(sql,(err,result)=>{
        if(err){return res.json({Status:false,Error:"query Error"}) }
        return res.json({Status:true,Result:result});
     })
})

appRouter.get('/logout',(req,res)=>{
    res.clearCookie(process.env.COOKIE_NAME);
    return res.json({Status:true})
})



export default appRouter;