
const mongoose =require('mongoose');
const ConnectDb=()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        
        console.log('connection established '+ con.connection.host)
    }
    )
}

module.exports=ConnectDb