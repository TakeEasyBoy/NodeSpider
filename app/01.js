/*
 *使用http模块来发起请求
 */
//如果获取https的内容,需要使用https的模块
var http = require('http');
http.get('http://www.itsource.cn/',function(res){
//	console.log(res);
	var html = '';
	//真正的拿数据需要绑定data事件,有数据读到的时候会触发data事件
	res.on('data',function(txt){
		
//		console.log('-----------');
		console.log(txt);
//		console.log(txt.length);  //每次读到的数据长度,根据每次访问时的网络速度不同m长度也会不同
		
		//将每次读到的txt文件流进行累加
//		html+=txt;
	});
	//绑定end事件,当服务器将所有数据发送完毕时触发
	res.on('end',function(){
		console.log(html);
	});
});