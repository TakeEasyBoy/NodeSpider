/*
 *使用http模块来发起请求
 */
//如果获取https的内容,需要使用https的模块
var http = require('http');
var fs = require('fs');
var path = require('path');
http.get('http://www.itsource.cn/',function(res){
//	console.log(res);
	var content = '';
	//真正的拿数据需要绑定data事件,有数据读到的时候会触发data事件
	res.on('data',function(txt){
		
//		console.log('-----------');
//		console.log(txt.toString());
//		console.log(txt.length);  //每次读到的数据长度,根据每次访问时的网络速度不同m长度也会不同
		
		//将每次读到的txt文件流进行累加
		content+=txt;
	});
	//绑定end事件,当服务器将所有数据发送完毕时触发
	res.on('end',function(){
//		console.log(content);
		//分析html数据,提取所有图片地址,通过片正则表达式来过滤
		//含有src='地址'的就是我们要提取的图片地址,然后在拼接网站的网址即可
		var reg = /src="(.*?\.jpg)"/img;
		var filename;
		while(filename = reg.exec(content)){
			getImg(filename[1]);//正则的子匹配,所以使用的是[1]
		}
		/*fs.writeFile('./test.txt',data,function(){
			console.log('写入成功');
		})*/
	});
})
function getImg(url){
//	console.log(path.parse(url).base); //该目录下的root有些值为'',因此需要拼接一个'/'
	var obj = path.parse(url);
	var fn = obj.base;
	var rec = fs.createWriteStream('./files/'+fn);
	//兼容网址里面没有根目录的情况
	if(obj.root.length === 0){
		url='/'+url;
	}
	//拼接完整url,才能发起请求
	url='http://www.baidu.com'+url;
	//请求,将数据流到文件中去
	http.get(url,function(res){
		res.pipe(rec);
		console.log(fn+'文件读取完毕');
	});
	
}
