//各种处理函数写在这

//处理url地址
export const dealurl = (url) => {
	//indexOf等于-1就是不存在
	if (url.indexOf('?') > -1) {
		//取url中'com/'后面的字符
		let str = url.split("com/")[1];
		return 'type=' + str.split("?")[0] + '?' + str.split("?")[1]
	}
	//视频
	else if (url.indexOf('mp4') > -1) {
		return 'type=' + url
	}
	//??
	else{
		return 'video=' + url
	}
}
//获取url
/*
		article页面传入query为{channelid: "TY43", category: ""}
		所以对这个json对象循环，叠加到params里，并用&隔开
		i为channelid，obj[i]为TY43
		return channelid=TY43&category=
	*/
export const geturl = (obj) => {
	//定义一个字符串放需要用来请求的url
	let type = obj.type;
	delete obj.type;
	let op = '';
	for(let i in obj){
		op += "&" + i + "=" + obj[i]
	}
	return type + op
}