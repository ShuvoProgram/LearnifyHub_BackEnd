const mongoose = require('mongoose')
const config = require('./config');
const app = require('./app');

const Server = require('http')

process.on('uncaughtException', (err) => {
    console.log('Uncaught exception - ', err)
    console.log('closing node process')
    process.exit(1)
})

// let Server;


const connectDB = async () => {
    try {
        await mongoose.connect(config.database_url)
        app.listen(config.port, () => {
            console.info(`Application listening on port ${config.port}`)
        })

        process.on('unhandledRejection', (err) => {
            if (Server) {
                Server.close(() => {
                  
                  process.exit(1);
                });
              } else {
                process.exit(1);
              }
        })
    } catch (error) {
        console.error(`Database connection error: ${error}`)
    }
};

connectDB();

// termination signal from OS
process.on('SIGTERM',()=>{
    Server.close((err)=>{
        console.log('Http server closed')
        process.exit(err ? 1:0)
    })
})