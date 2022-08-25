const express = require('express');
const gateway = require('fast-gateway');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const {verifyToken, verifyTokenAndAdmin} = require('./middleware/verifyToken');

const server = gateway({
    
    routes: [
        {
            prefix: '/auth',
            target: 'http://localhost:5000/',
            hooks: {

            }
        },
        {
            prefix: '/admin',
            target: 'http://localhost:5001/',
            hooks: {

            }
        },
        {
            prefix: '/users',
            middlewares: [verifyToken],
            target: 'http://localhost:5002/',
            hooks: {

            }
        },
        {
            prefix: '/products',
            target: 'http://localhost:5003/',
            hooks: {

            }
        },
        {
            prefix: '/coupons',
            middlewares: [verifyToken],
            target: 'http://localhost:5004/',
            hooks: {

            }
        },
        {
            prefix: '/reviews',
            middlewares: [verifyToken],
            target: 'http://localhost:5005/',
            hooks: {

            }
        },
        {
            prefix: '/reports',
            middlewares: [verifyTokenAndAdmin],
            target: 'http://localhost:5006/',
            hooks: {

            }
        },
        {
            prefix: '/orders',
            middlewares: [verifyToken],
            target: 'http://localhost:5007/',
            hooks: {

            }
        },
        {
            prefix: '/carts',
            middlewares: [verifyToken],
            target: 'http://localhost:5008/',
            hooks: {

            }
        },
        {
            prefix: '/wishlists',
            middlewares: [verifyToken],
            target: 'http://localhost:5009/',
            hooks: {

            }
        }
    ]
});
server.use(cors());
server.use(express.json())

server.get('/',(req, res)=>{
    res.send("Api Gateway running sucessfully")
})

server.start(process.env.PORT || 9000).then(server=>{
    console.log("Api Gateway is running at");
    console.log("http://localhost:"+process.env.PORT)
  });