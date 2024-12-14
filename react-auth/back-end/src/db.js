import { MongoClient } from 'mongodb';

let client;
const pass = '2207Deep'
const username = '1410deepanshu'

const mongoose = require('mongoose');



export const initializeDbConnection = async () => {
    // client = await MongoClient.connect('mongodb://localhost:27017', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    const uri = `mongodb+srv://${username}:${pass}@rapid.a2kyy7e.mongodb.net/react-auth-db?retryWrites=true&w=majority&appName=rapid`;

    client = await mongoose.connect(uri)

    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Connected the DateBase :)'));
}

export const getDbConnection = dbName => {
    return mongoose.connection.db;
}