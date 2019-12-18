var canvasEl = document.querySelector('#circle');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 50//500;
var part_size = 3;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

let randomizer_funcs = [x => x**0.6*10, x => Math.round(x/50)*50, x => function (n) { n=n**0.6*10; a=n%20; return Math.round(n/100)*100+a; }(x)];
var chosen_randomizer = 1;

var chosen_randomizer_modifier = 2;

var position_modifier = 0;
var time_modifier = function (){return (new Date).getSeconds()/20};

var randomizer_modifier = function(n) {

    if (n===0) {
      return 1;
    } else if (n===1) {
      return position_modifier;
    } else if (n===2) {
      return time_modifier();
    }

    return 1;

};

let angle_randomizer_funcs = [x => x * Math.PI / 180, x => Math.round(x * Math.PI / 90)/2, x => anime.random(0,5)*Math.PI/6*randomizer_modifier(chosen_randomizer_modifier), x => Math.sin(x) ]
var chosen_angle_randomizer = 2

function setCanvasSize() {
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
  var angle = angle_randomizer_funcs[chosen_angle_randomizer](anime.random(0, 360));
  var value = randomizer_funcs[chosen_randomizer](anime.random(0, 360));
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = 1;//anime.random(16, 32);//5;
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 1;
  p.alpha = 0;//0.5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function getParticuleCoord(p, coord) {

  endCoord = p.endPos.x;

  if (coord == "y") { endCoord = p.endPos.y; }

  // a = p.endPos.x - mouseX-30;
  // b = p.endPos.y - mouseY-30;

  // if (Math.sqrt( a*a + b*b ) < 35) { return 0 }

  return endCoord;

}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(window.innerWidth/2, window.innerHeight/2));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p){ return getParticuleCoord(p, "x") },
    y: function(p){ return getParticuleCoord(p, "y") },
    radius: 0.6*part_size,
    duration: anime.random(1200, 1800)/100,
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),
    },
    duration: 0,
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

function autoClick() {
  animateParticules(
    anime.random(centerX-50, centerX+50),
    anime.random(centerY-50, centerY+50)
  );
  anime({duration: 50}).finished.then(autoClick);
}

autoClick();
setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);

$(document).ready(function() {
  var xp = 0, yp = 0;

  var mouseX = 0
  var mouseY = 0

  $(document).mousemove(function(e){
    mouseX = e.pageX - 50;
    mouseY = e.pageY - 50;
    position_modifier = (((mouseX- window.innerWidth/2)/window.innerWidth)**2 - ((mouseY- window.innerHeight/2)/window.innerHeight)**2)*20
  });

  setInterval(function(){
    xp += ((mouseX - xp)/3);
    yp += ((mouseY - yp)/3);
    $("#cursor").css({left: xp +'px', top: yp +'px'});
  }, 20);

  $("#projects_teaser").click(function() {

    $("#projects_teaser_bar").css("width", "100vw");
    $("#projects_teaser_bar").css("right", "0");
    $("#projects_teaser_bar h2").css("right", "-10vw");

    setTimeout(function(){

      window.location.href = "/projects";

    }, 110);

  });

});
