const fs = require('fs');

fs.readFile('./json/goods.json','utf8', (err,data) => {
    let newData = JSON.parse(data);
    let i = 0;
    let pushData = [];

    newData.RECORDS.map((value,index) => {
        if(value.IMAGE1 != null) {
            i++;
            console.log(value.NAME);
            pushData.push(value);
        }
    })
    console.log(i);
    console.log(pushData);

    fs.writeFile('./json/newGoods.json', JSON.stringify(pushData), (err) => {
        if(err) console.log('write File Error');
        else console.log('Write File Success!')
    })
})

