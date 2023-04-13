const mongoose = require('mongoose');

//create schema

//samething to get data,create object after object ,write timestamp to see when it(document) was created,  
const tweetSchema= new mongoose.Schema({
   title:String ,
   body:{
     type:String,
     min:1,
     max:255
   },
   author:String,
   //category is field, enum provides values tht can be passed to category.
   category:{
    type:String,
    enum:['Programming','Gaming','Arts']
   },
   likes:{
    type:Number,
    default:0
   },
   sponsored:{
    type:Boolean,
    default:false
   }
},

{timestamps:true}
)


//create model

const Tweet = mongoose.model('Tweet',tweetSchema);
module.exports = Tweet;