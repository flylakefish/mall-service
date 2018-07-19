const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo',async (ctx) => {
    console.log('importimport')
    fs.readFile('./json/newGoods.json', 'utf8', (err,data) => {
        goodsData = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        goodsData.map((value,index) => {
            console.log(value);
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount++;
                console.log('save success' + saveCount);
            })
            .catch(err => {
                console.log('save fail' + err);
            })
        })
    })
    ctx.body = 'start import data'
})

router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Catagory');

        data.RECORDS.map((value,index) => {
            console.log(value);
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                saveCount++ ;
                console.log('save success' + saveCount);

            })
            .catch(err => {
                console.log('save fail' + err);
            })
        })
    })
    ctx.body = "start import category";
})

router.get('/insertAllCategorySub', async (ctx)=> {
    fs.readFile('./json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value,index) => {
            console.log(value);
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('save sucess ' + saveCount);
            })
            .catch(err => {
                console.log('save error' + err);
            })
        })
    })
    ctx.body = 'start import categorySub'
})

router.post('/getDetailGoodsInfo', async (ctx) => {
    try{
        let goodsId = ctx.request.body.goodsId;
        console.log(ctx.request.body)
        const Goods = mongoose.model('Goods');
        console.log(Goods)
        let result = await Goods.find({ID:goodsId.ID}).exec()

        console.log(result)
        ctx.body = {code: 200, message:result}

    }catch(err){
        ctx.body = {code: 500, message: err}
    }
})

module.exports = router;