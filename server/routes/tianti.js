var express = require('express');
var router = express.Router();

var data;
/* 接收插件数据. */
router.post('/save', function(req, res, next) {
  // res.render('index', { title: req.body });
  var tmp = req.body
  data = JSON.parse(tmp.data)
  data = data.sort(function(pre, next){
    if(pre.pointL1 <= 200){
      if(pre.pointL1 > next.pointL1) return -1
      if(pre.pointL1 < next.pointL1) return 1
      if(pre.pointL1 == next.pointL1) return 0
    }
    else{
      if((pre.pointL1 + pre.pointL2 + pre.award) > (next.pointL1 + next.pointL2 + next.award)) return -1
      if((pre.pointL1 + pre.pointL2 + pre.award) < (next.pointL1 + next.pointL2 + next.award)) return 1
      if((pre.pointL1 + pre.pointL2 + pre.award) == (next.pointL1 + next.pointL2 + next.award)) return 0
    }
  })
  console.log(data)
  res.json({
    status: "ok"
  })
});
// 显示页面
router.get("/show", function(req, res, next){
  res.render('show');
})
// ajax请求数据
router.get("/getData", function(req, res, next){
  res.json({
    status: "ok",
    data: JSON.stringify(data)
  });
})


module.exports = router;
