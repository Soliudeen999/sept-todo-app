const { default: axios } = require('axios');
const express = require('express');
const AppError = require('../errors/app_error');
const { CacheGet, CacheSet } = require('../utils/cache');
const redis = require('../utils/redis');

const app = express.Router()

app.get('/two-functions-called-route', 
    (req, res, next) => {
        console.log('Passed Function 1')
        next()
    },
    function (req, res){
        console.log('Last function called')
        throw Error('Invalid Code')
        return res.json({message : ' ALl functions called successfully'})
    });

app.get('/', (req, res) => res.json({message : 'Welcome to my app'}))

app.get('/about', (request, response) => {
    return response.json({
        message : "This is about us",
        data : {
            name : "Sept Cohort Practice",
            date : Date.now(),
            students : ['Dan', 'Lumid']
        }
    })
})



app.post('/test-register', (req, response) => {
    return response.json({
        message : "All Login Form Data",
        data : req.body || {}
    })
})


app.get('/banks-list', async (req, res) => {

    data = await CacheGet('banks-list')

    if(data){
        console.log('Fetching from paystack');
        return res.json({data});
    }
    const request = await axios.get("https://api.paystack.co/bank", {
        headers : {
            Authorization : process.env.PAYSTACK_SECRET_KEY
        }
    })


    if (request.status !== 200)
         throw new AppError()

    await CacheSet('banks-list', request.data, 86400); // 1 day
    return res.json({data: request.data});
})


app.get('/banks-list-redis', async (req, res) => {

    data = await redis.get('banks-list');

    if(data){
        return res.json({data : JSON.parse(data)});
    }

    const request = await axios.get("https://api.paystack.co/bank", {
        headers : {
            Authorization : process.env.PAYSTACK_SECRET_KEY
        }
    })

    if (request.status !== 200)
         throw new AppError()

    await redis.set('banks-list', JSON.stringify( request.data)); // 1 day
    return res.json({data: request.data});
})

app.get('/states-list', async (req, res) => {
    const request = await axios.get("https://api.paystack.co/address_verification/states?country=US", {
        headers : {
            Authorization : process.env.PAYSTACK_SECRET_KEY
        }
    })

    if (request.status !== 200)
         throw new AppError()

    return res.json({data: request.data});
})

app.get('/weather', async (req, res) => {

    // http://api.weatherstack.com/current
    // ? access_key = 5f7d915da47e4aedcf4e96d321ca86d8

    try{
        const request = await axios.get("https://api.weatherstack.com/current", {
            params : {
                access_key : '5f7d915da47e4aedcf4e96d321ca86d8'
            }
        })

        return res.json(request.data)
    }catch(err){
        console.log(err);
        throw new AppError(err.message)
    }
})
module.exports = app