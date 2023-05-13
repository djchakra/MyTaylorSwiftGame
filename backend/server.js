const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors")

const app = express();

const PORT = 5000;
app.use(cors())

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", (req, res)=>{
    res.status(200).send({
        message: "Welcome to the Taylor Swift Game!!!"
    })
})

app.get("/random", (req, res) =>{
    res.status(200).send({
        num1: Math.ceil(Math.random()*10),
        num2: Math.ceil(Math.random()*10)
    })
    
})

app.get("/songs", (req,res)=>{
     axios.get("https://api.musixmatch.com/ws/1.1/track.search?q_artist=taylor%20swift&page_size=3&page=1&s_track_rating=desc&apikey=d43b105a52541ac8f616d5f142686fdb")
        .then((songsData)=>{
            res.status(200).send(songsData.data)
        })
    
})

app.listen(PORT, () => {
    console.log("app running")
})