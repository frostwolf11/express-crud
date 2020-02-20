const mongoose = require('mongoose')
const dbConfig = require('./config')

let mongo_url = process.env.PORT || dbConfig.url

let db;

try {
    db = mongoose.createConnection(mongo_url,{ useNewUrlParser: true })
} catch (error) {
    console.log('Connection unable to established');
    proccess.exit(0)
    
}


module.exports = db