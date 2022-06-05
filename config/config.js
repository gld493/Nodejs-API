const dotenv = require("dotenv");
//const path = require('path');

dotenv.config();


module.exports = {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   token_secret: process.env.TOKEN_SECRET,
   mongoose: {
      url:  process.env.MONGODB_URL,
      options: {
         useCreateIndex: true,
         useNewUrlParser: true,
         useUnifiedTopology: true,
      },
   },

};