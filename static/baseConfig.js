/* 进行适配整个屏幕高度，对左边的导航的路由表的内容进行自适应，对整个tableHeight的高度进行自适应 */ 
/*
	tab切换的高度44px(tab)
	搜索条件的高度57px(search)
	底部翻页的高度52px(page)
*/ 
// 在展示的区域中，什么都没有，定义为初始的高度()
var leftNavHeight = document.documentElement.clientHeight - 60; 
// 在展示的区域中，只有一个tab切换(tab)
var tabHeight = document.documentElement.clientHeight - 104; 
// 在展示的区域中，只有一个搜索条件(search)
var searchHeight = document.documentElement.clientHeight - 117;
// 在展示的区域中，只有一个翻页工具(page)
var pageHeight = document.documentElement.clientHeight - 112;
// 在展示的区域中，一个tab切换、一个搜索条件(tab-search)
var tabSearchHeight = document.documentElement.clientHeight - 161;
// 在展示的区域中，一个tab切换、一个翻页工具(tab-page)
var tabPageHeight = document.documentElement.clientHeight - 156;
// 在展示的区域中，一个搜索条件、一个翻页工具(search-page)
var searchPageHeight = document.documentElement.clientHeight - 169; 
// 在展示的区域中，一个tab切换、一个搜索条件、一个翻页工具(tab-search-page)
var tabSearchPageHeight = document.documentElement.clientHeight - 213; 
/* 公共的方法引用 */
var baseConfig = {
	khserver: "http://test-app-h.dianliaoapp.com",
	server: "http://test-manage.dianliaoapp.com",
	requestUrl: "/ydlManage/server/index.php",
	sourceServer: "http://dianliaotools.oss-cn-shenzhen.aliyuncs.com",
	recruitShareIcon: "http://dianliaotools.oss-cn-shenzhen.aliyuncs.com/common/logo.png",//推荐主播分享icon地址
	wechatShareUrl: "http://test-manage.dianliaoapp.com/client/dev/wechat/baseApi/wechatApi.php",// 微信分享接口地址
    // 正常删除、正常其它的信息提示
    normalTipMsg(obj, content) {
        obj.$message({
			message: content,
			type: 'info',
			showClose: true, // 显示关闭按钮
			duration: 3000, // 3s后自动消失
        });
	},
	successTipMsg(obj, content) {
		obj.$message({
			message: content,
			type: 'success',
			showClose: true, // 显示关闭按钮
			duration: 3000, // 3s后自动消失
		});
	},
    // 警告提示,传警告内容，进行显示(用于用户没有进行选择框选择)
    warningTipMsg(obj, content) {
        obj.$notify({
			message: content,
			type: 'warning',
            showClose: true, // 显示关闭按钮
			duration: 3000, // 3s后自动消失
        });
    },
    // 服务器传回的错误消息提示，进行error错误信息显示(用于服务端返回状态ret==0、code==0)
    errorTipMsg(obj, content) {
        obj.$notify({
			message: content,
			type: 'error',
            showClose: true, // 显示关闭按钮
			duration: 0, // 设置为0，让用户自己去关闭掉
        });
    },
    // 设置cookie
	setCooki(name, value, expireDay) {
		expireDay = expireDay || 1;
		var exp = new Date();
	    exp.setTime(exp.getTime() + this.cookieExpire*24*60*60*1000);
	    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString() + "; path=/";
	},
	// 获得cookie
	getCookie(cookie_name) {
		if (document.cookie.length>0) {
			var c_start = document.cookie.indexOf(cookie_name + "=");
			var c_end;
			if (c_start != -1) {
				c_start = c_start + cookie_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return decodeURI(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	// 设置本地存储key, value, type--(true->localStorage, false->sessionStorage)
	setStorage(key, value, type) {
		if (typeof(key)!='string'&&typeof(value)!='string') {
			alert('存储必须是字符串');
		}
		if (type) {
			localStorage.setItem(key,value);
		}else {
			sessionStorage.setItem(key,value);
		}
	},
	// 取出本地存储key, type--(true->localStorage, false->sessionStorage)
	getStorage(key, type) {
		if (type) {
			return localStorage.getItem(key);
		}else {
			return sessionStorage.getItem(key);
		}
	},
	// 获取链接地址后面的参数情况，传入key得value
	getReq(name) {
		var url = location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				this[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
			return this[name];
	   }
	   return null;
	},
	/*
		获取间隔前的时间
		startDate->传入目前的日期(new Date()格式的日期形式),days->间隔的时间
		得到对象beforeTime->之前的时间,currentlyTime->目前的时间
	*/ 
	getDateInterval(startDate, days) {
		var start;
		var end;
		if (startDate instanceof Date) {
			start = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
			var startAfterDays = startDate.setDate(startDate.getDate() - days);
			startAfterDays = new Date(startAfterDays);
			end = startAfterDays.getFullYear() + "-" + (startAfterDays.getMonth() + 1) + "-" + startAfterDays.getDate();
		}
		return {
			beforeTime: end,
			currentlyTime: start 
		};
	},
	/*
		传入时间获取到时分秒(对应十位、个位)
		timeSeconds->传入时间单位为秒
		hourTen->小时的十位，hourBit->小时的个位...
	*/ 
	changeHourMinSecond(timeSeconds) {
		var hour = parseInt(timeSeconds/3600);
		var minter = parseInt(timeSeconds/60%60);
		var second = parseInt(timeSeconds%60);
		//对时、分、秒位数位数少于十位进行处理
		hour = hour>9 ? hour : "0"+hour;
		minter = minter>9 ? minter : "0"+minter;
		second = second>9 ? second : "0"+second;
		var one = (hour+"").substring(0,1);
		var two = (hour+"").substring(1,2);
		var three = (minter+"").substring(0,1);
		var four = (minter+"").substring(1,2);
		var five = (second+"").substring(0,1);
		var six = (second+"").substring(1,2);
		return {
			hourTen: one,
			hourBit: two,
			minterTen: three,
			minterBit: four,
			secondTen: five,
			secondBit: six
		};
	},
	// 对象的深拷贝
	deepCopy(obj) {
		var _this = this;
		if(typeof obj !='object') {
			return obj;
		}
		var newobj = {};
		for(var attr in obj) {
			newobj[attr] = _this.deepCopy(obj[attr]);
		}
		return newobj;
	},
};
// console.log(location.href);
// 进行正式服、测试服区分
if (location.href.indexOf('https://manage.dianliaoapp.com')=='0') {
	baseConfig.khserver = 'https://app-h.dianliaoapp.com';
	baseConfig.server = 'https://manage.dianliaoapp.com';
	baseConfig.wechatShareUrl = 'https://manage.dianliaoapp.com/client/dev/wechat/baseApi/wechatApi.php';
} else {
	// 不进行处理
}