
const mongoose = require('mongoose');

const mongoURI= process.env.MONGO_URI;//save url to mongoose
 const db= mongoose.connection;// save connection

module.exports = function(){

      //connection to mongo
      mongoose.set('strictQuery',true);
      //PASS url of connection n object to avoid dep warnings
      mongoose.connect(mongoURI,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          //useCreateIndex: true
        })

        //wait 5 sec and call db n close con nection
       /* setTimeout(() => {
            db.close();
          }, 5000);*/
  
        //listen to events , error etc on the connection
        db.on('error',(error)=>console.error(error));
        //if connected ,callback to print
        db.on('open',()=>console.log('connected to mongodb'));
        db.on('close',()=>console.log('disconnected'))
}