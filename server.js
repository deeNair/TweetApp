//read env file
require('dotenv').config();

const express= require('express');
//const mongoose = require('mongoose');
const connectTodb=require('./config/db');
const Tweet = require('./models/Tweet')



 const app = express();

 
 /*app.get('/',(req,res)=>{
    res.send('server is up')
 })*/

 //data comes from client or react app
 

  const manyTweets = [
    {
      title: "Deep Thoughts",
      body: "Friends, I am the realest coder alive",
      author: "Arthur",
    },
    {
      title: "Sage Advice",
      body: "Friends, I am awesome and you are too",
      author: "Arthur",
      likes: 20,
    },
    {
      title: "Is TI the Jadakiss of the South",
      body: "TI is severely underrated and we need to fix that expeditiously",
      author: "Arthur",
      likes: 40,
    },
    {
      title: "Crypto",
      body: "Friends, I have spent $2300 to be one of the first people to own a random jpeg and that makes me cool",
      author: "Arthur",
      likes: 162,
    },
    {
      title: "Confusion",
      body: "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
      author: "Arthur",
      likes: -100,
    },
    {
      title: "Vespa",
      body: "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
      author: "Arthur",
      likes: 2,
    },
    {
      title: "Licensed",
      body: "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
      author: "Arthur",
      likes: 3,
    },
    {
      title: "Water",
      body: "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
      author: "Arthur",
    },
  ];

//query all doc n return selected fields
  app.get('/',(req,res)=>{
    Tweet.find({}, "title body")
    // if database transaction succeeds
    .then((tweets) => {
      res.send(tweets);
    })
    // if database transaction fails
    .catch((error) => {
      console.log(error)
    })
    // close db connection either way
    .finally(() => {
        console.log(' find particular item ,runs anyway');
    })})

  app.post("/tweets",(req,res)=>{
    //data comes from form client
    const myFirstTweet = {
      title: "Deep Thoughts",
      body: "Friends, I am the realest coder alive",
      author: "Arthur",
    };

      //handling thru promises,pass tweet to create, if tweet connected then to next
  Tweet.create(myFirstTweet)
  .then(tweet =>{
    // res.send('tweet created')
console.log(tweet);
res.send(tweet)
})
.catch((error)=>{
  console.error(error);
}).finally(()=>{
    console.log(' this runs anyways,if promise completed or rejected ');
})})

//adds dummy data to database
app.get("/seed",(req,res)=>{
Tweet.insertMany(manyTweets)
.then((tweets)=>{
    console.log(tweets);
    res.redirect('/tweets');
})
.catch((error)=>{
    console.log(error);
})
.finally(()=>{
    console.log(' insertion runs anyway');
})
})


app.get("/tweets",(req,res)=>{
Tweet.find({})
// if database transaction succeeds
.then((tweets) => {
  console.log(tweets);
  res.send(tweets);
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
// close db connection either way
.finally(() => {
    console.log(' find runs anyway');
})
})
//find the tweets that have 20 or more likes,gte standard keywords
//returns all tweets with 20 or more likes
app.get('/trending',(req,res)=>{
  Tweet.find({ likes: { $gte: 20 } })
  // if database transaction succeeds
  .then((tweets) => {
  res.send(tweets)
  })
  // if database transaction fails
  .catch((error) => {
    console.log(error)
  })
  // close db connection either way
  .finally(() => {
      console.log(' find likes more than 20 ,runs anyway');
  })})
  

  app.delete('/tweets/:title',(req,res)=>{
/*Tweet.findOneAndRemove({ title: req.params.title })
// if database transaction succeeds
.then((tweet) => {
res.redirect('/tweets')
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
*/
})
//*===============

app.delete('/tweets/:id',(req,res)=>{
/*Tweet.findOneAndRemove({ title: req.params.id })
// if database transaction succeeds
.then((tweet) => {
res.redirect('/tweets')
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
*/
  
})

/*Tweet.findOneAndUpdate(
    { title: "Vespa" },
    { sponsored: true },
    { new: true })
  // if database transaction succeeds
  .then((tweet) => {
    console.log(tweet)
  })
  // if database transaction fails
  .catch((error) => {
    console.log(error)
  })
  // close db connection either way
  .finally(() => {
    console.log(' find one and update,runs anyway')
  })*/


  app.get("/tweets/count",(req,res)=>{
  /*Tweet.countDocuments({ likes: { $gte: 20 } })
// if database transaction succeeds
.then((count) => {
  //returning number so thinks its status so wrap it in object set key and send or {count}
res.send({count:count});
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
// close db connection either way
.finally(() => {
 console.log(' count hw many,runs anyway')
})*/})


//limit the number of returned queries to 2, sort them by title,
//exec return promise, what to return title -id(removes id) cld be title likes (likes after title ) and sort(title) sort(-title) may be descending

app.get("/tweets/sort",(req,res)=>{
/*Tweet.find({ likes: { $gte: 20 } }, "title -_id")
  .limit(2)
  .sort("title")
  .exec()
// if database transaction succeeds
.then((tweets) => {
  res.send(tweets)
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
*/
})


//*====================
//tweet with title water,search for tweet by title

app.get('/tweets/:title',(req,res)=>{


  Tweet.find({ title: req.params.title })
  // if database transaction succeeds
  .then((tweet) => {
    res.send(tweet);
  })
  // if database transaction fails
  .catch((error) => {
    console.log(error)
  })
  // close db connection either way
  .finally(() => {
      console.log(' find particular item ,runs anyway');
  })
  
  })
//*==========================

 app.listen(3000,()=>{
    console.log('server up');

  connectTodb(); // call config db.js 
 })