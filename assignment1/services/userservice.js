const MongoClient = require('mongodb').MongoClient;
const UserConstants = require('./utils').UserConstants;
class userService {
 
    checkbalance(name,callback) {
        console.log(name);
        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
            conn.db(UserConstants.mongo.db).collection('bank').find({customername: name}).toArray((error, user) => {
                    if(!error)
                    {
                    console.log(user); 
                    x=user[0].balance;
                    callback(error,user);
                    }
            });
           
        });
     
    }
    deposit(amount,name, callback) {
        console.log(name);
        console.log(amount);
        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
            conn.db(UserConstants.mongo.db).collection('bank').find({customername: name}).toArray((error, user) => {
                    if(!error)
                    {
                let amt = parseInt(amount,10);
                console.log(amt);
                    
                    amt= user[0].customerbalance  + amt;
                    console.log(amt);

                    MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                        //This shall increment the existing salary
                       conn.db(UserConstants.mongo.db).collection('bank').updateOne({customername: name}, {$set:{customerbalance:amt}},(err,user) => {
                           
                   
                       });
                      
                   });
                   MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
                    var status="self-deposit";
                    conn.db(UserConstants.mongo.db).collection('transaction').insertOne({_to:name, _from:name,_dto:"-",_dfrom:"-",amount:amount, _datetime:dateTime,_status:status}, (err, response) => {
                        console.log("transaction done");
                    });
                });
            }
               callback(error,user);
                    })
            });
           
        }
        transfer(amount,name,name1,callback) {
            MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                conn.db(UserConstants.mongo.db).collection('bank').find({customername: name}).toArray((error, user) => {
                        if(!error)
                        {
                    let amt = parseInt(amount,10);
                    console.log(amt);
                        
                        amt= user[0].customerbalance  - amt;
                        console.log(amt);
    
                        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                            //This shall increment the existing salary
                           conn.db(UserConstants.mongo.db).collection('bank').updateOne({customername: name}, {$set:{customerbalance:amt}},(err,user) => {
                               
                       
                           });
                          
                       });
                    
                   }
                   
                })
            })
            MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                conn.db(UserConstants.mongo.db).collection('bank').find({customername: name1}).toArray((error, user) => {
                        if(!error)
                        {
                    let amt = parseInt(amount,10);
                    console.log(amt);
                        
                        amt= user[0].customerbalance  + amt;
                        console.log(amt);
    
                        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                            //This shall increment the existing salary
                           conn.db(UserConstants.mongo.db).collection('bank').updateOne({customername: name1}, {$set:{customerbalance:amt}},(err,user) => {
                               
                       
                           });
                          
                       });
                       
                    
                   }
                   
                        })
                });
               
                MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    var status="t";
                    conn.db(UserConstants.mongo.db).collection('transaction').insertOne({_to:name1, _from:name,_dto:name1,_dfrom:name,amount:amount,_datetime:dateTime,_status:status}, (err, user) => {
                        console.log("transaction done");
                        callback(err,user);
                    });
    
                });
        }
        
       
     
    
    withdrawal(amount,name, callback) 
    {
        console.log(name);
        console.log(amount);
        MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
            conn.db(UserConstants.mongo.db).collection('bank').find({customername: name}).toArray((error, user) => {
                    if(!error)
                    {
                let amt = parseInt(amount,10);
                console.log(amt);
                    
                    amt= user[0].customerbalance  - amt;
                    console.log(amt);

                    MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                        //This shall increment the existing salary
                       conn.db(UserConstants.mongo.db).collection('bank').updateOne({customername: name}, {$set:{customerbalance:amt}},(err,user) => {
                           
                   
                       });
                      
                   });
                   MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    var status="self-withdraw"
                    conn.db(UserConstants.mongo.db).collection('transaction').insertOne({_to:name, _from:name,_dto:"-",_dfrom:"-",amount:amount,_datetime:dateTime,_status:status}, (err, response) => {
                        console.log("transaction done");
                    });
                });
            }
            callback(error,user);
                    })
            });
        };

        details(name, callback)
        {
            console.log(name);
            MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                conn.db(UserConstants.mongo.db).collection('bank').find({customername: name}).toArray((error, user) => {
                        if(!error)
                        {
                        console.log(user); 
                        callback(error,user);
                        }
                });
               
            });   
        }

        passbook(name, callback)
        {
            console.log(name);
            MongoClient.connect(UserConstants.mongo.url, (err, conn) => {
                conn.db(UserConstants.mongo.db).collection('transaction').find({$or:[{_to:name},{_from:name}]}).toArray((error, user) => {
                    if(!error)
                    {
                    console.log(user); 
                    callback(error,user);
                    }
                });
               
            });   
        }
    
    }

module.exports = {
    userService
}