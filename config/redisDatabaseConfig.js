const redis = require("redis");
const client = redis.createClient();
client.on("error",function(error){
    console.error("Error encounterd : ".error);
});
client.on("Connect",function(error){
    console.log("Redis Connection established");
});



// const getPost = async (req,res) => {
//     try{
//         console.log("Fetching data");
//         const token = req.query.auth
//         const post = await post.find
//         // res.send(post)
//         if(!post){
//             return res.send("Currently there is no posts");
//         }
//         console.log(psot);
//         client.SETEX('postData',60,post)
//         res.send(post)
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error)
//     }
// }


// const express = require("express");
// const axios = require("axios");
// const redis = require("redis");
// const { post } = require("../server");
// const app = express();
// app.listen(process.env.PORT || 3000, () => {
//     console.log("Node server started");
// });

// This is the post Api to get the data.

// const getPost = async (req,res) => {
//     try{
//         console.log("Fetching data");
//         const token = req.query.auth
//         const post = await post.find
//         // res.send(post)
//         if(!post){
//             return res.send("Currently there is no posts");
//         }
//         console.log(psot);
//         res.send(post)
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error)
//     }
// }
// const express = require("express");
// const redis = require("redis");
// const router = express.router();
// const Post = require('../app/models/note');
// const auth = require('../helper/validationSchema');
// const client = redis.createClient()

// router.post('/post',async(req,res) =>{
//     try{
//         const post = new Post(req.body)
//         if(!post){
//             res.status(400).send('Your post cannot be created');
//         }else{
//             await post.save()
//             res.send(post)
//         }
//     }catch(error){
//         res.status(500).send(error)
//     }
// })

const getPost = async (req,res) => {
    try{
        console.log("Fetching data");
        const token = req.query.auth
        const post = await post.find
        // res.send(post)
        if(!post){
            return res.send("Currently there is no posts");
        }
        console.log(psot);
        client.SETEX('postData',60,post)
        res.send(post)
    }catch(error){
        console.log(error);
        res.status(500).send(error)
    }
}


// router.patch

// const redis_post = (req,res,next) =>{
//     client.get('postData',(err,redis_data) =>{
//         if(err){
//             throw err
//         }else if (redis_data){
//             res.send(JSON.parse(redis_data))
//         }else{
//             next()
//         }
//     })
// }

// router.get('/posts',redis_post,getPost);

