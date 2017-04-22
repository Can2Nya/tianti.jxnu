function Tianti(){
  var data = []
  this.getData = function(){
    return data;
  }
  this.privatePointRule = function(attr){
    // attr为每道题的颜色数组
    // 个人分数
    var point = [5,5,10,10,15,15,20,25]

  }
  this.setData = function(){
    var self = this
    $("table").find("tr").each(function(index){
      if(index != 0){
        // $(this).find("td").each(function(index){
          var td = $(this).find("td")

          data = [
          ...data,
          {
            "rank": $(td[0]).text(),
            "name": $(td[1]).text(),
            "solved": $(td[2]).text(),
            "penalty": $(td[3]).text(),
            "1001": $(td[4]).text(),
            "1002": $(td[5]).text(),
            "1003": $(td[6]).text(),
            "1004": $(td[7]).text(),
            "1005": $(td[8]).text(),
            "1006": $(td[9]).text(),
            "1007": $(td[10]).text(),
            "1008": $(td[11]).text(),
            "point": self.privatePointRule([
              $(td[4]).text(),
              $(td[5]).text(),
              $(td[6]).text(),
              $(td[7]).text(),
              $(td[8]).text(),
              $(td[9]).text(),
              $(td[10]).text(),
              $(td[11]).text(),
            ])
          }]
        // })
      }
    })
    data = data.sort(function(pre, next){
      return +(pre.name > next.name) || +(pre.name === next.name) - 1;
    })
    return this
  }
  // var f = new Tianti()
  // return f
}

var f = new Tianti()
$(document).ready(function () {
  console.log(f.setData().getData())
})