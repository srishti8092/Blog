const config = {
    mongo: {
       options : {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            maxPoolSize: 50,
            autoIndex: false,
            retryWrites: false
       },
       url : `mongodb+srv://superuser:mysupersecretpwd@cluster0.unj0w2x.mongodb.net/?retryWrites=true&w=majority`
    },
    
    server : {
        host : 'localhost',
        port : 5000
    }
}

export default config;