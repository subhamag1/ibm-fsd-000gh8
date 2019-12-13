const routes = require('express').Router();
const UService = require('../services/userService').userService;
const userService = new UService();
const setContentHeader = require('../services/utils').setContentHeader;
const LService = require('../services/login.service').loginService;
const lService = new LService();
routes.get('/status', (rq, rs) => {
    rs.status(200).json({
        message: 'Product Service is Running'
    });
});
routes.get('/checkbalance/:name', (rq, rs) => {
    userService.checkbalance(rq.params.name,(err,user) => {
        rs.status(200).json({
            message: 'balance fetched',
            user: user[0].balance
        })
    });
});

routes.get('/deposit/:amount/:name', (rq, rs) => {
    console.log(rq.params.amount)
    userService.deposit(rq.params.amount,rq.params.name,(err,user) => {
        rs.status(200).json({
            message: 'Amount Deposited',
            users: user
        })
    });
});
routes.get('/transfer/:amount/:name/:name1', (rq, rs) => {
    userService.transfer(rq.params.amount,rq.params.name,rq.params.name1,(err,users) => {
        rs.status(200).json({
            message: 'Amount Transfered',
            users: users
        })
    });
});

routes.get('/withdrawal/:amount/:name', (rq, rs) => {
    userService.withdrawal(rq.params.amount,rq.params.name,(err,user) => {
        rs.status(200).json({
            message: 'Amount Withdrawan',
            users: user
        })
    });
});
routes.post('/login', (rq, rs) => {
    user=rq.body;
    console.log(user)
    lService.checklogin(user,(err,user)=> {

        if (err) {
            rs.status(500).json({
                message: 'Unable to process your request'
            });
        } else {
            rs.status(200).json({
                
                user:user
            });
        }
    })
});

routes.get('/Home/:name',(rq,rs)=>{
    userService.details(rq.params.name,(err,user) => {
        rs.status(200).json({
            message: 'details',
            users: user
        })
    });
})

routes.get('/passbook/:name',(rq,rs)=>{
    userService.passbook(rq.params.name,(err,user) => {
        rs.status(200).json({
            message: 'details',
            users: user
        })
    });
})
routes.post('/signup', (rq, rs) => {
    user=rq.body;

    lService.fetchUser(user,(err,res)=> {
        if (res.length!=0) {
            rs.status(500).json({
                message: 1
            });
        } else {
            lService.adduser(user,(err,user)=> {
                rs.status(200).json({
                    message: 'User Registered',
                    users: user
                })
            })
                
        }
                
            });
        })


module.exports = {
    routes
}