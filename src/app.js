const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const corsOptions =  require('./config/corsOptions')
const config =  require('./config')
const errorHandler = require('./app/middlewares/error.handler')
const router = require("./app/routes")

const app = express();
app.set('trust proxy', true);

// Request sanitization 
app.use(mongoSanitize());

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Limit requests - Prevents Brute force attacks to auth endpoint
if (config.env === 'production') {
    app.use('/api/auth', authLimiter)
};

//development routes
app.use('/api/v1', require('./app/routes'))


// Testing route
app.get('/api/v1', async (req , res) => {
    res.send('Working Successfully')
  })

// Global error handler (should be placed after route handlers)
app.use(errorHandler)


module.exports = app;