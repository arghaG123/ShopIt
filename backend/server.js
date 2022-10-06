const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
// Handle the uncaughtException error
process.on('uncaughtException', err => {
   console.log('Error: ' + err.message);
   console.log('Shutting down server due to uncaught exception.');
   process.exit(1);
})
//setting up config file
dotenv.config({path:'backend/config/config.env'});
// connecting to database
connectDatabase();
const server = app.listen(process.env.PORT,() => {
   console.log(`Server started at port:${process.env.PORT} on ${process.env.NODE_ENV} mode` );
})

process.on('unhandledRejection',err => {
   console.log('Error: ' + err.message);
   console.log('Shutting down server due to unhandled Rejection.');
   server.close(() => {
      process.exit(1);
   });
})
