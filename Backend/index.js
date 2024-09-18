import express from 'express'// if you do not mention "type":"module" in package.json file then the error of "import statement cannot be use" will come"
import appRouter from './routes/Route.js';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
config();
import employeerouter from './routes/employeeRoute.js';
import Jwt from 'jsonwebtoken';

const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials:true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('public'));

const verifyUser = (req,res,next)=>{
    const adminToken = req.signedCookies[process.env.COOKIE_NAME];
    const employeeToken = req.signedCookies[process.env.COOKIE_NAME2];
    // Check if either token is present
    const token = adminToken || employeeToken;
    console.log("Token from cookies:", token); // Log the token

    if(token){
        Jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){return res.json({Status:false,Error:"Wrong Token"}) }
            req.id=decoded.id;
            req.role=decoded.role;
            next();
        })
    }
    else{
        return res.json({Status:false,Error:"Not Authenticated"});
    }
}

app.get('/verify',verifyUser,(req,res)=>{
    return res.json({Status:true,role:req.role,id:req.id});
})

app.use('/auth',appRouter);
app.use('/employee',employeerouter);

const Port=process.env.PORT;
app.listen(Port,()=>{
   console.log('Server is running on port 5000'); 
})