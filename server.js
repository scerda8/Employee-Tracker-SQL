const {Pool}= require('pg');

const pool =new Pool({
user: 'postgres',
host: 'localhost',
database: 'employee_tracker_db',
password:'Redpanda8473$!',
port:5432
});

pool.connection((err,client,done)=>{
    if(err)throw err;
    console.log('Connected to database')
})