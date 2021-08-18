const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');


require('dotenv/config');


mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },{ useUnifiedTopology: true },()=>{
    console.log('connected to db!')
});

const FoodiesSchema = mongoose.Schema({
name:{type:String},
locality:String,
number:Number,
email:{type:String},
date:{type:Date,default:Date.now}
});

const foodies = mongoose.model('foodies',FoodiesSchema);

app.set('view engine','pug');
app.set('views','./views');


// important very important
app.use(express.static('img'));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(upload.array());


app.get('/Food',(req,res)=>{
    res.render('index');
});

app.post('/Food',(req,res)=>{
var foodiesObj = req.body;
if(!foodiesObj.name || !foodiesObj.locality || !foodiesObj.number){
    res.render('result',{
        message:"Error fill all details!" , type:"error"
    });
}else{
    var Foodies = new foodies({
        name:foodiesObj.name,
        locality:foodiesObj.locality,
        number:foodiesObj.number,
        email:foodiesObj.email,
        date:foodiesObj.date
    });
    Foodies.save((err,foodies)=>{
        if(err){
            res.render('result',{
              message:"Database backend error!" , type:"error" 
            })
}else{
    res.render('result',{
        message:"Ok your data is saved in backend!" , type:"sucess"
    })
}
})
}
});

app.get('/viewdatabase',(request,response)=>{
    foodies.find((err,res)=>{
        response.json(res);
    });
    });

app.listen(3000,()=>{
console.log('listening at port 3000');
});


