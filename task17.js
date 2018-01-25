/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2017-12-01");
  var datStr = ''
  for (var i = 1; i <= 40; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 周期均值计算
 */
function getAverageValue(cycle) {
  var data = aqiSourceData[pageState.nowSelectCity];
  var arr_date = [];
  var arr_value = [];
  for (var x in data) {
    arr_date.push(x);
    arr_value.push(data[x]);
  }

  var yushu = arr_date.length % cycle;
  var arr_value_cycle = [];
  for (var i = 0; i < arr_date.length - yushu; i+=cycle) {
    arr_value_cycle.push(Math.floor(eval(arr_value.slice(i, i+cycle).join('+')) / cycle));
  }
  arr_value_cycle.push(Math.floor(eval(arr_value.slice(-yushu).join('+')) / yushu));
  return arr_value_cycle;
}

/**
 * 渲染图表
 */
function renderChart() {
  var container = document.getElementsByClassName('aqi-chart-wrap')[0];
  var html_divs = '';
  var data = aqiSourceData[pageState.nowSelectCity];
  if (pageState.nowGraTime === 'day') {
    html_divs = '';
    for (var x in data) {
      html_divs += '<div style=\'width: 60px; height: ' + data[x] + 'px\'>' + data[x] + '<span>' + x + '</span></div>';
    }
  } else if (pageState.nowGraTime === 'week') {
    var arr_value_week = getAverageValue(7);
    html_divs = '';
    for (var i = 0; i < arr_value_week.length; ++i) {
      html_divs += '<div style=\'width: 80px; height: ' + arr_value_week[i] + 'px\'>' + arr_value_week[i] + '<span>第' + (i+1) + '周均值</span></div>';
    }
  } else if (pageState.nowGraTime === 'month') {
    var arr_value_month = getAverageValue(31);
    html_divs = '';
    for (var i = 0; i < arr_value_month.length; ++i) {
      html_divs += '<div style=\'width: 120px; height: ' + arr_value_month[i] + 'px\'>' + arr_value_month[i] + '<span>第' + (i+1) + '月均值</span></div>';
    }
  }
  container.innerHTML = html_divs;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {
  // 确定是否选项发生了变化
  // 设置对应数据
  // 调用图表渲染函数
  if (graTime !== pageState.nowGraTime) {
    pageState.nowGraTime = graTime;
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(selectCity) {
  // 确定是否选项发生了变化
  // 设置对应数据
  // 调用图表渲染函数
  if (selectCity !== pageState.nowSelectCity) {
    pageState.nowSelectCity = selectCity;
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputs = document.getElementsByTagName('input');
  inputs[0].onclick = function() {
    graTimeChange(this.value);
  }
  inputs[1].onclick = function() {
    graTimeChange(this.value);
  }
  inputs[2].onclick = function() {
    graTimeChange(this.value);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById('city-select');
  var html_options = '';
  for (var x in aqiSourceData) {
    html_options += '<option value=\'' + x + '\'>' + x + '</option>';
  }
  select.innerHTML = html_options;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange = function() {
    citySelectChange(this.value);
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

window.onload = function() {
  init();
}
