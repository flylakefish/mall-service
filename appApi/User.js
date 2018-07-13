const Router = require('koa-router')
let router = new Router();

const mongoose = require('mongoose')



router.get('/',async(ctx) => {
    ctx.body = '用户操作首页'
})

router.post('/register', async(ctx) => {

    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    })
    .catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
    console.log(ctx.request.body)
    
})

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    console.log(loginUser)

    let userName = loginUser.userName
    let password = loginUser.password

    const User = mongoose.model('User')

    await User.findOne({userName:userName}).exec().then( async (result) => {
        if(result) {
            if(password === result.password) {
                ctx.body = { code: 200, message: 'match'}
            }
        }else {
            ctx.body = {code: 200 , message: '用户名不存在'}
        }
    })
    .catch(error => {
        console.log(error)
        ctx.body= {code:500, message:error}
    })
})

module.exports = router;