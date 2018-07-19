const Koa = require('koa');
const app = new Koa();

const bodyParser= require('koa-bodyparser')
app.use(bodyParser())

const cors = require('koa2-cors')
app.use(cors())

const Router = require('koa-router')
let user = require('./appApi/user.js')



let goods = require('./appApi/goods.js')
let router = new Router()
router.use('/user',user.routes())

router.use('/goods',goods.routes());

app.use(router.routes())
app.use(router.allowedMethods())

const mongoose = require('mongoose')
const {connect, initSchemas} = require('./database/init.js');





;(async () => {
    
    connect()
    initSchemas()
    // console.log('aaaa')
    // const User = mongoose.model('User');
    // let oneUser = new User({userName: 'test02', password: '123456'});
    // oneUser.save().then(() => {
    //     console.log('插入用户成功');
    // })

    // let users = await User.findOne({}).exec()

    // console.log('.....................')
    // console.log(users);
    // console.log('..............................')
})()

app.use(async ctx=> {
    ctx.body = '<h1>hello koa</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting up at port 3000')
})