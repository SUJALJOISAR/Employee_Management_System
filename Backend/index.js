import express from 'express'// if you do not mention "type":"module" in package.json file then the error of "import statement cannot be use" will come"
import appRouter from './routes/Route.js';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
config();
import employeerouter from './routes/employeeRoute.js';

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

app.use('/auth',appRouter);
app.use('/employee',employeerouter);

const Port=process.env.PORT;
app.listen(Port,()=>{
   console.log('Server is running on port 5000'); 
})