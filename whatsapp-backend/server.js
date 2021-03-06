import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

import dotenv from 'dotenv'; 

// load config
dotenv.config({ path: './Env/config.env' });

const app = express();
const port = process.env.PORT || 9000 ;


// Enter Your Pusher Detail Here
const APP_ID = "XXXXXX"; 
const KEY = "XXXXXXXXXX";
const SECRET = "XXXXXXXXX";
const CLUSTER = "XXX";

// Enter Your MongoDB(CLUSTER) Password
const MONGO_PASSWORD = "XXXXXXXXX";


app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,DELETE,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: CLUSTER,
    useTLS: true
  });

const connection_url = `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.axssz.mongodb.net/whatsappdb?retryWrites=true&w=majority`

mongoose.connect(connection_url,{ useCreateIndex:true, useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;

db.once("open", ()=>{

    console.log('--> DB CONNECTED <--');

    const msgCollections = db.collection("messagecontents");
    const changeStream = msgCollections.watch();

    changeStream.on('change', (change)=>{

        if(change.operationType === "insert"){
            const messageDetail = change.fullDocument;

            pusher.trigger('messages','inserted', {
               name : messageDetail.name,
               message : messageDetail.message ,
               timestamp : messageDetail.timestamp,
               receive : messageDetail.receive
            });
        } else{
            console.log('Error Triggering Pusher');
        }        

        // console.log(change);
    })

});

app.get('/', (req, res)=> res.status(200).send('hello world'));

app.post('/messages/new', (req, res)=>{

    const dbMessages = req.body;

    Messages.create(dbMessages, (err,data) =>{

        if(err){
            res.status(501).send(err);
        }
            res.status(200).send(data)

    })

});


app.get('/messages/getAll', (req,res)=>{

    Messages.find( (err, data)=>{

        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }

    });

});


app.listen(port, ()=> console.log(`server start on localhost:${port}`));
