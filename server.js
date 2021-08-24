

const { Socket } = require("dgram");
let express = require("express");
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/mern";
// let cors = require("cors");
// app.use(cors());


let options ={
    useNewUrlParser: true,
    useUnifiedTopology: true

}

mongoose.connect(url,options).then(res=>console.log("connected")).catch(error=>console.log(error));
let db = mongoose.connection;



let app = express();




let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/firest",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
let MessageSchema = mongoose.Schema({
    _id:Number,
    messageUser:String,
});
//collections
let MessageModel = mongoose.model("",MessageSchema, "Message");

app.get("/second",(req,res)=>{
    res.sendFile(__dirname+"/client2.html")
})



io.on("connection",(socket)=> {
    // console.log("Client connected");
    // to get the message from a client 
    socket.on("obj",(data)=> {
        console.log(data);
        socket.emit("getMessage",data);  
        let storeMessage=MessageModel ({messageUser:data });
        MessageModel.insertMany( storeMessage , (err , result) =>{
            if(err){
                console.log(err);
            } 
        })


    })
})
http.listen(9090,()=>console.log("Server running in port 9090"))