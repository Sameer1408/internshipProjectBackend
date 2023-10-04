const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ImageDetails = require('./models/imageDetails')
const Hotel = require('./models/Hotel')
const fs = require('fs');
var path = require('path');
var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Sameer:beZdmx5TeDMLDV5@cluster0.rubvk.mongodb.net/StartUp1?retryWrites=true&w=majority")
.then(console.log("DB Connected"))

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');
const imageDetails = require('./models/imageDetails');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

// app.get('/',async (req,res)=>{
//     let d = await driverSchema.find({});
//     console.log(d,"reached");
//     res.status(200).j;
// })

app.post('/uploadImage',upload.single("image"),async(req,res)=>{
    console.log(req.body)
    const imageName = req.file.filename;  
    try{
        var obj = {
            img:{
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/*'
            },
            name:req.body.name,
             type:req.body.type,
             people:req.body.people,
             average:req.body.average,
             gear:req.body.gear,
             rent:req.body.rent,
             year:req.body.year,
             page:req.body.page
        }
        console.log(obj);
        const event = new ImageDetails(obj);
        const savedEvent = await event.save();
        console.log(savedEvent,"obj");
        res.send({status:"ok"})
    }catch(error)
    {
        res.send({status:"error",error})
    }    
})

app.post('/uploadHotel',upload.single("image"),async(req,res)=>{
    console.log(req.body)
    const imageName = req.file.filename;  
    try{
        var obj = {
            img:{
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/*'
            },
            name:req.body.name,
            city:req.body.city,
             pin:req.body.pin,
             room:req.body.room,
             bed:req.body.bed,
             bath:req.body.bath,
             area:req.body.area,
             rent:req.body.rent,
             popular:req.body.popular,
        }
        console.log(obj);
        const event = new Hotel(obj);
        const savedEvent = await event.save();
        console.log(savedEvent,"obj");
        res.send({status:"ok"})
    }catch(error)
    {
        res.send({status:"error",error})
    }    
})

app.get("/getHotels",async(req,res)=>{
    try{
        Hotel.find({}).then(data=>{
            res.send({status:"ok",data:data})
        })
    }catch(error){
        res.send({status:"error",error});
    }
})

app.get("/getImage",async(req,res)=>{
    try{
        imageDetails.find({}).then(data=>{
            res.send({status:"ok",data:data})
        })
    }catch(error){
        res.send({status:"error",error});
    }
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port);