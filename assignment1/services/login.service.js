const MongoClient = require('mongodb').MongoClient;
const UserConstants = require('./utils').UserConstants;
class loginService {

    checklogin(user,callback) {
        
        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
            conn.db(UserConstants.mongo.db).collection('bank').find({customerpassword : user.customerpassword, customername : user.customername}).toArray((error, user) => {
                    if(!error){
                    console.log(user);
                    console.log("here");
                    callback(error,user);
                    
                    } 
            });
        });
    }
    adduser(user,callback){
       
        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
            conn.db(UserConstants.mongo.db).collection('bank').insert({customername:user.customername, customeremail:user.customeremail,customerpassword:user.customerpassword,customeraccountnumber:user.customeraccountnumber,customeraccounttype:user.customeraccounttype,customerbalance:user.customerbalance},(err,response)=>{
                callback(err,response);
   
            })
   
    })
}
fetchUser(user,callback){
    console.log(user.customeremail);
    MongoClient.connect(UserConstants.mongo.url,(err,conn)=>{
        conn.db(UserConstants.mongo.db).collection('bank').find({customeremail:user.customeremail}).toArray((error,users)=>{
            if(!error){
                console.log(users);
                callback(error,users);
            }
        })
    })
}
}

module.exports = {
    loginService
}