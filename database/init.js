const mongoose = require('mongoose')
const db = "mongodb://localhost/mall-db"

const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise = global.Promise

exports.connect = () => {
    mongoose.connect(db, {useMongoClient:true})

    let maxConnections = 0;

    return new Promise((resolve, reject) => {
        //连接断开时
        mongoose.connection.on('disconnected', ()=>{
            console.log('数据库断开连接.......');
            if(maxConnections < 3){
                maxConnections++;
                mongoose.connext(db);
            } else {
                reject();
                throw new Error('数据库出现问题.....')
            }
        })
    
        mongoose.connection.on('error', (err)=> {
            console.log('数据库错误......');
            if(maxConnections < 3) {
                maxConnections++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库出现问题......')
            }
        })
    
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully!')
        })
    })

    

    
}

exports.initSchemas = () => {
    console.log('aaaaa')
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
    console.log('bbbbb')
}