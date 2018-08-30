var https = require("https");
var fs = require('fs');
var path =require('path')
// 1.第一次请求,HTML结构
https.get('https://zhuanlan.zhihu.com/p/20516914',function(res){
    // 拼接拿到的数据
    var content = '';
    res.on('data',function(str){
        content +=str;
    })
    // 绑定读取结束事件
    res.on('end',()=>{
        // console.log(content);
        // 2.提取图片地址,正则提取图片地址 ,运用子匹配
        var reg = /data-original="(.*?\.jpg)|(.*?\.png)|(.*?\.gif)"/img;
        var filename;
        // console.log(reg.exec(content)[1]);
        while(filename = reg.exec(content)){
            getImage(filename[1])
        }
    })
})
function getImage(url){
    var name = url.split('zhimg.com/')[1];
    var streamFile = fs.createWriteStream('./files/'+name);
    https.get(url,function(res){
        res.pipe(streamFile);
        console.log("读取",url.split('zhimg.com/')[1],"完毕");
    })
}