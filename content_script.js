function Tianti(){
  var data = []
  var groupInfo = []
  this.getData = function(){
    return data;
  }
  this.privatePointRule = function(mode, attrs){
    // attr为每道题的颜色数组
    // 个人分数
    var pointL1 = [5,5,10,10,15,15]
    var pointL2 = [20,25]
    var privatePoint = 0
    // console.log(attr)
    // 绿色rgb(0, 128, 0)
    // 首位ac rgb(67, 205, 128)
    attrs.map(function(attr, index){
      if(mode == "L1"){
        if(attr == "rgb(0, 128, 0)" || attr == "rgb(67, 205, 128)") privatePoint+= pointL1[index]
      }
      if(mode == "L2"){
        if(attr == "rgb(0, 128, 0)" || attr == "rgb(67, 205, 128)") privatePoint+= pointL2[index]
      }
      if(mode == "award"){
        if(attr == "rgb(67, 205, 128)") privatePoint+= 25
      }
    })
    return privatePoint;
  }
  this.groupPointRule = function(){
    
    data.map(function(user, index){
      var flag = 0   // 未有重复的队名
      
      groupInfo.map(function(info){
        if(info.name == user.group){
          flag = 1
          // groupInfo = [
          // ...groupInfo,
          // {
          //   name: user.group,
          // }]
        }
      })
      if(!flag){
        groupInfo = [
        ...groupInfo,
        {
          name: user.group,
          pointL1: user.pointL1,//初始化为组内第一个同学分数
          pointL2: user.pointL2,
          award: user.award
          // pointL1: 0,//初始化为组内第一个同学分数
          // pointL2: 0,
          // award: 0
        }]
      }
      if(flag){
        // 如果有重复就记分
        groupInfo.map(function(info){
          if(info.name == user.group){
            info.pointL1 = info.pointL1+user.pointL1
            info.pointL2 = info.pointL2+user.pointL2
            info.award = info.award+user.award
          }
        })
        // console.log(user.name+"2")
      }
      // console.log(user.name+"1")
    })
    return this
  }
  this.getGroupData = function(){
    return groupInfo
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
            "pointL1": self.privatePointRule("L1",[
              $(td[4]).css("background-color") || "",
              $(td[5]).css("background-color") || "",
              $(td[6]).css("background-color") || "",
              $(td[7]).css("background-color") || "",
              $(td[8]).css("background-color") || "",
              $(td[9]).css("background-color") || "",
            ]),
            "pointL2": self.privatePointRule("L2",[
              $(td[10]).css("background-color") || "",
              $(td[11]).css("background-color") || "",
            ]),
            "award": self.privatePointRule("award",[
              $(td[10]).css("background-color") || "",
              $(td[11]).css("background-color") || "",
            ]),
            "group": $(td[1]).text().split("_")[1]
          }]
        // })
      }
    })
    data = data.sort(function(pre, next){
      return +(pre.group > next.group) || +(pre.group === next.group) - 1;
    })
    return this
  }
  // var f = new Tianti()
  // return f
}

var f = new Tianti()
$(document).ready(function () {
  console.log(f.setData().getData())
  console.log(f.groupPointRule().getGroupData())
})