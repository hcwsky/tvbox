var rule = {
	title:'美剧迷[磁]',
	host:'https://www.meijumi.net',
	homeUrl:'/',
	url: '/fyclass/page/fypage/?',
	filter_url:'{{fl.class}}',
	filter:{
	},
	searchUrl: '/?s=**',
	searchable:2,
	quickSearch:0,
	filterable:0,
	headers:{
		'User-Agent': 'PC_UA',
		'Accept': '*/*',
		'Referer': 'https://www.meijumi.net/'
	},
	timeout:5000,
	class_name:'最近更新&美剧&灵异/惊悚&魔幻/科幻&罪案/动作谍战&剧情/历史&喜剧&律政/医务&动漫/动画&纪录片&综艺/真人秀&英剧&韩剧',
	class_url:'news&usa&usa/xuanyi&usa/mohuan&usa/zuian&usa/qinggan&usa/xiju&usa/yiwu&usa/katong&usa/jilu&usa/zongyi&en&hanju',
	play_parse:true,
	play_json:[{
		re:'*',
		json:{
			parse:0,
			jx:0
		}
	}],
	lazy:'',
	limit:6,
	推荐:'',
	推荐:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = [];
let html = request(input);
let items;
items = pdfa(html, 'main#main div.hd ul li:has(>a>img)');
items.forEach(it => {
	d.push({
		title: pdfh(it, 'li&&Text'),
		desc: '',
		pic_url: pd(it, 'img&&src', HOST),
		url: pdfh(it, 'a&&href')
	});
});
items = pdfa(html, 'main#main div.hd div.huandeng span:has(>a>img)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		d.push({
			title: pdfh(it, 'span&&Text'),
			desc: '',
			pic_url: pd(it, 'img&&src', HOST),
			url: pdfh(it, 'a&&href')
		});
	});
}
items = pdfa(html, 'main#main div#pingbi_gg div:has(>div>a>img)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		d.push({
			title: pdfh(it, 'a&&title'),
			desc: pdfh(it, 'div&&span b&&Text'),
			pic_url: pd(it, 'img&&src', HOST),
			url: pdfh(it, 'a&&href')
		});
	});
}
items = pdfa(html, 'main#main div#pingbi_gg div:has(>header>div>a)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		d.push({
			title: pdfh(it, 'header a&&Text'),
			desc: pdfh(it, 'header&&div span&&Text'),
			pic_url: pd(it, 'figure img&&src', HOST),
			url: pdfh(it, 'header a&&href')
		});
	});
}
setResult(d);
`,
	一级:'',
	一级:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = [];
if (MY_CATE !== "news" ){
	let html = request(input);
	let list = pdfa(html, 'div#post_list_box article');
	list.forEach(it => {
		d.push({
			title: pdfh(it, 'header a&&Text'),
			desc: pdfh(it, 'div.entry-content span:eq(1)&&Text'),
			pic_url: pd(it, 'figure img&&src', HOST),
			url: pdfh(it, 'header a&&href')
		});
	})
}else{
	input = rule.homeUrl + MY_CATE + '/';
	let html = request(input);
	let list = pdfa(html, 'article ol&&li');
	list.forEach(it => {
		d.push({
			title: pdfh(it, 'a&&Text'),
			desc: pdfh(it, 'li&&span:eq(3)&&Text') + ' / 更新' + pdfh(it, 'li&&span:eq(1)&&Text'),
			pic_url: '',
			url: pdfh(it, 'a&&href')
		});
	})
}
setResult(d);
	`,
	二级:{
		title:"article&&header&&h1&&Text",
		img:"article div.single-content img&&src",
		desc:"article div.single-content blockquote&&Text",
		content:"article div.single-content table&&Text",
		tabs:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
TABS=[]
let playGroups = [];
let d = pdfa(html, 'article div.single-content&&p:has(>a)');
d.forEach(function(it) {
	let playObj = {"ali":{},"quark":{},"magnet":{}};
	let playUrls = pdfa(it, 'a');
	let title="";
	playUrls.forEach(function(playUrl) {
		let purl = pdfh(playUrl, 'a&&href');
		if (true || title === ""){
			title = pdfh(playUrl, 'a&&Text');
		}
		if (purl.startsWith("magnet")){
			let magfn = title;
			try {
				magfn = purl.match(/(^|&)dn=([^&]*)(&|$)/)[2];
			}catch(e){
				magfn = title;
			}
			let resolution = "unknown";
			try {
				resolution = magfn.match(/(1080|720|2160|4k|4K)/)[1];
			}catch(e){
				resolution = "unknown";
			}
			magfn = resolution + "." + magfn;
			log("tabs magnet filename>>>>>>>>>>>" + magfn);
			playObj["magnet"][purl]=magfn;
		}else if (purl.startsWith("https://www.aliyundrive.com/s/")){
			playObj["ali"][purl]=title;
		}else if (purl.startsWith("https://pan.quark.cn/s/")){
			playObj["quark"][purl]=title;
		}
	});
	playGroups.push(playObj);

});
LISTS.push(playGroups);
let groupIndex = 1;
playGroups.forEach(function (it) {
	let magCount = Object.keys(it["magnet"]).length;
	let aliCount = Object.keys(it["ali"]).length;
	let quarkCount = Object.keys(it["quark"]).length;
	if (magCount==0 && aliCount!==1 && quarkCount!==1 ){

	}else{
		if (magCount>0){
			TABS.push("磁力" + groupIndex);
		}
		if (aliCount === 1){
			TABS.push("阿里雲盤" + groupIndex);
		}
		if (quarkCount === 1){
			TABS.push("夸克雲盤" + groupIndex);
		}
		groupIndex = groupIndex + 1;
	}
});
log('meijumi TABS >>>>>>>>>>>>>>>>>>' + TABS);
`,
		lists:`js:
log(TABS);
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let playGroups = [];
if (false && LISTS.length>0 && typeof LISTS[0] === "object"){
	playGroups = LISTS.shift();
}else{
	let d = pdfa(html, 'article div.single-content&&p:has(>a)');
	d.forEach(function(it) {
		let playObj = {"ali":{},"quark":{},"magnet":{}};
		let playUrls = pdfa(it, 'a');
		let title="";
		playUrls.forEach(function(playUrl) {
			let purl = pdfh(playUrl, 'a&&href');
			if (true || title === ""){
				title = pdfh(playUrl, 'a&&Text');
			}
			if (purl.startsWith("magnet")){
				let magfn = title;
				try {
					magfn = purl.match(/(^|&)dn=([^&]*)(&|$)/)[2];
				}catch(e){
					magfn = title;
				}
				let resolution = "unknown";
				try {
					resolution = magfn.match(/(1080|720|2160|4k|4K)/)[1];
				}catch(e){
					resolution = "unknown";
				}
				magfn = resolution + "." + magfn;
				log("tabs magnet filename>>>>>>>>>>>" + magfn);
				playObj["magnet"][purl]=magfn;
			}else if (purl.startsWith("https://www.aliyundrive.com/s/")){
				playObj["ali"][purl]=title;
			}else if (purl.startsWith("https://pan.quark.cn/s/")){
				playObj["quark"][purl]=title;
			}
		});
		playGroups.push(playObj);

	});
}
LISTS = [];
playGroups.forEach(function(it){
	if (Object.keys(it["magnet"]).length>0){
		let d = [];
		for(const key in it["magnet"]){
			if (it["magnet"].hasOwnProperty(key)){
				let title = it["magnet"][key];
				let burl = key;
				log('meijumi magnet title >>>>>>>>>>>>>>>>>>>>>>>>>>' + title);
				log('meijumi magnet burl >>>>>>>>>>>>>>>>>>>>>>>>>>' + burl);
				d.push(title + '$' + burl);
			}
		}
		d.sort();
		let newd = [];
		d.forEach(it=>{
			newd.push(it.substring(it.indexOf(".")+1));
		});
		LISTS.push(newd);
	}
	if (Object.keys(it["ali"]).length==1){
		let d = [];
		for(const key in it["ali"]){
			if (it["ali"].hasOwnProperty(key)){
				let title = it["ali"][key];
				let burl = "http://127.0.0.1:9978/proxy?do=ali&type=push&url=" + encodeURIComponent(key);
				log('meijumi ali title >>>>>>>>>>>>>>>>>>>>>>>>>>' + title);
				log('meijumi ali burl >>>>>>>>>>>>>>>>>>>>>>>>>>' + burl);
				d.push(title + '$' + burl);
			}
		}
		LISTS.push(d);
	}
	if (Object.keys(it["quark"]).length==1){
		let d = [];
		for(const key in it["quark"]){
			if (it["quark"].hasOwnProperty(key)){
				let title = it["quark"][key];
				let burl = "http://127.0.0.1:9978/proxy?do=quark&type=push&url=" + encodeURIComponent(key);
				log('meijumi quark title >>>>>>>>>>>>>>>>>>>>>>>>>>' + title);
				log('meijumi quark burl >>>>>>>>>>>>>>>>>>>>>>>>>>' + burl);
				d.push(title + '$' + burl);
			}
		}
		LISTS.push(d);
	}
});
`,

	},
	搜索:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let params = 'show=title&tempid=1&tbname=article&mid=1&dopost=search&submit=&keyboard=' + encodeURIComponent(KEY);
let _fetch_params = JSON.parse(JSON.stringify(rule_fetch_params));
let postData = {
    method: "POST",
    body: params
};
delete(_fetch_params.headers['Content-Type']);
Object.assign(_fetch_params, postData);
log("meijumi search postData>>>>>>>>>>>>>>>" + JSON.stringify(_fetch_params));
let search_html = request( rule.homeUrl + 'e/search/index.php', _fetch_params, true);
log("meijumi search result>>>>>>>>>>>>>>>" + search_html);
let d=[];
let dlist = pdfa(search_html, 'div.mainleft&&ul#post_container&&li');
dlist.forEach(function(it){
	let title = pdfh(it, 'div.thumbnail img&&alt');
	if (searchObj.quick === true){
		if (title.includes(KEY)){
			title = KEY;
		}
	}
	let img = pd(it, 'div.thumbnail img&&src', HOST);
	let content = pdfh(it, 'div.article div.entry_post&&Text');
	let desc = pdfh(it, 'div.info&&span.info_date&&Text');
	let url = pd(it, 'div.thumbnail&&a&&href', HOST);
	d.push({
		title:title,
		img:img,
		content:content,
		desc:desc,
		url:url
		});
});
setResult(d);
`,
}
