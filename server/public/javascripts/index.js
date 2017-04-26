function clear(){
  $('.container').empty();
}

function render(data){
  if(data.length > 0){
    data.map(function(line, index){
      var list = `<div class="list">
      <div class="avator" style="background-image: url(/images/图片.jpg)"></div>
      <div class="progress">
        <div class="name">
          ${line.name}
        </div>
        <div class="L1">
          <div class="point" style="width:${(line.pointL1 / 360.0) * 100}%">L1:${line.pointL1}</div>
        </div>
        <div class="L2">
          <div class="point" style="width:${(line.pointL2 / 270.0) * 100}%">L2:${line.pointL2}</div>
        </div>
        <div class="award">
          <div class="point" style="width:${(line.award / 50.0) * 100}%">奖励分:${line.award}</div>
        </div>
      </div>
    </div>`
      $('.container').append(list);
    })
  }
  
}


function getData(){
  $.ajax({
    url: "/tianti/getData",
    dataType: "json",
    type: "GET"
  }).done(function(res){
    var payload = JSON.parse(res.data)
    clear()
    render(payload)
  })
}


$(document).ready(function(){
  getData()
  setInterval(getData, 9000)
})