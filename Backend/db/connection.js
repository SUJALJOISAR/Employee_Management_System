import mysql from 'mysql2';

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sj12345678",
    database:"employeesch"
});

db.connect((err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log("DB Connection Successfull!!");
    }
})

export default db;