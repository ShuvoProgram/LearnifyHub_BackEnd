corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.LOCALE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

module.exports = corsOptions;