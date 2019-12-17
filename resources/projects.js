$(document).ready(function() {
  var xp = 0, yp = 0;

  var mouseX = 0
  var mouseY = 0

  $(document).mousemove(function(e){
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30;
    randomizer_modifier = (((mouseX- window.innerWidth/2)/window.innerWidth)**2 - ((mouseY- window.innerHeight/2)/window.innerHeight)**2)*20
  });

  setInterval(function(){
    xp += ((mouseX - xp)/3);
    yp += ((mouseY - yp)/3);
    $("#cursor").css({left: xp +'px', top: yp +'px'});
  }, 20);

  $(document).scroll(function() {
    $("#titleline1").html("WEB");
    $("#titleline2").html("DESIGN");
  });

});
