var mouseX = 0, mouseY = 0;

$(document).ready(function() {
  var xp = 0, yp = 0;

  $(document).mousemove(function(e){
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30;
  });

  setInterval(function(){
    xp += ((mouseX - xp)/3);
    yp += ((mouseY - yp)/3);
    $("#cursor").css({left: xp +'px', top: yp +'px'});
  }, 20);

});
