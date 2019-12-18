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

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > window.innerHeight*1.5) {

      opacity = 1;

      $("#main_title").css({opacity: opacity})

      $("#titleline1").html("WEB");
      $("#titleline2").html("DESIGN");

    } else {

      opacity = window.innerHeight-scrollTop;

      if (opacity > 0) {  opacity = (window.innerHeight-scrollTop)**2/window.innerHeight**2*10; }

      $("#main_title").css({opacity: opacity})

      $("#titleline1").html("RECENT");
      $("#titleline2").html("PROJECTS");

    }

  });

});
