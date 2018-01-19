/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = String(document.querySelector("#aqi-city-input").value).trim()
	if (!/[a-zA-Z\u4e00-\u9fa5]+/g.test(city)) {
		alert("城市名必须是中英文字符")
		return 
	}
	var value = Number(document.querySelector("#aqi-value-input").value.trim())
	if (!/\d+/g.test(value)) {
		alert("空气质量指数必须是整数")
		return
	}
	aqiData[city] = value
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var trs = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for (data in aqiData) {
		trs += "<tr><td>" + data + "</td><td>" + aqiData[data] + "</td><td><button>删除</button></td>"
	}
	document.querySelector("#aqi-table").innerHTML = trs
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  // document
  var e = arguments[0]
 	delete aqiData[e.target.parentNode.parentNode.children[0].innerText]
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.querySelector('#btn-add').addEventListener("click", addBtnHandle, false)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.querySelector("#aqi-table").addEventListener("click", function(e) {
  	if (e.target.nodeName === "BUTTON") {
  		delBtnHandle(e)
  	}
  }, false)
}

window.onload = function() {
	init()
}
