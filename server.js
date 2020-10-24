// mock data
// port = 2333
// prefix = /api
const qs = require('qs');
const cors = require('cors');
const express = require('express');

const port = 2333;
const app = express();

// 跨域设置
app.use(cors());

// 概览
// request method GET
app.get('/api/overview', function overview(req, res) {
  var r10 = Math.floor(Math.random() * 10);
  var r100 = Math.floor(Math.random() * 100);
  var r1000 = Math.floor(Math.random() * 1000);
  var r10000 = Math.floor(Math.random() * 10000);
  var r100000 = Math.floor(Math.random() * 100000);
  return res.send({
    code: 200,
    success: true,
    data: {
      height: r10,
      total_tx_num: r100,
      online_node_num: r1000,
      consensus_node_num: r10000,
      syn_node_num: r100000,
    },
  });
});

// 动态生成5条区块数据
var uqId = 1;
setInterval(() => {
  uqId++;
}, 1000);

var count_idx = 10;
const fixBlocks = generateBlocks();

setInterval(() => {
  const now = Date.now();
  fixBlocks.splice(0, 0, {
    time: now + uqId,
    tx_num: 1,
    // height: uqId++,
    height: count_idx++,
  });
  fixBlocks.splice(5, 1);
}, 5000);

function getBlocks() {
  return fixBlocks;
}

function generateBlocks() {
  var timestamp = new Date().valueOf();
  const blocks = [];
  var i,
    count = 5;
  for (i = 0; i < count; i++) {
    var r100 = Math.floor(Math.random() * 100);
    blocks.push({
      time: timestamp + uqId,
      tx_num: r100,
      height: i,
    });
  }
  return blocks;
  // return blocks.reverse();
}

// 区块 最新生成
// request method GET
app.get('/api/block', function block(req, res) {
  const result = getBlocks();
  return res.send({
    code: 200,
    success: true,
    data: JSON.stringify({ data: result }),
  });
});

// 动态生成的8条数据 缓存所有的数据
const cacheData = [];
function generateDatas() {
  // 生成随机数 + 时间戳
  const data = [];
  var i,
    count = 8;
  for (i = 0; i < count; i++) {
    var timestamp = new Date().valueOf();
    // var r10 = Math.floor(Math.random() * 10);
    // var r1000 = Math.floor(Math.random() * 1000);
    data.push({
      time: timestamp,
      block_num: uqId + i,
      key: uqId + i,
      user_id: '****a***b**c****' + uqId,
      user_ip: '192.168.0.' + i,
    });
  }
  // cacheData.concat(data);
  return data;
}

// 数据 最新
// request method GET
app.get('/api/datas', function datas(req, res) {
  var url = req.url,
    idx,
    params = {};
  if (~(idx = url.indexOf('?'))) {
    url = url.substring(idx);
    params = qs.parse(url, {
      ignoreQueryPrefix: true,
    });
  }
  var result = generateDatas();
  if (Object.keys(params).length && params.key) {
    const { key } = params;
    result = cacheData.find(item => item.key === key) || [];
    return res.send({
      code: 200,
      success: true,
      data: {
        key,
        data: '数据出来了XXXXXXXXXXXXXXXXXXXXX',
      },
    });
  }
  return res.send({
    code: 200,
    success: true,
    data: JSON.stringify({ data: result }),
  });
});

// 监听端口 2333
app.listen(port, function listen(err) {
  if (err) {
    console.log('服务启动失败！');
    console.log('错误信息 =>', err);
    process.exit(1);
  }
  console.log();
  console.log('服务启动成功：http://localhost:2333');
  console.log();
});
