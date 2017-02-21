var vw,vh,nav,ul;
console.log(nav);
var Parallax = {
  containers: [],
  add: function(elementQuery){
    this.containers.push(document.querySelector(elementQuery));
  },
  move: function(){
    var direction;
    var speed;
    for (var i = 0; i < this.containers.length; i++) {
      direction = this.containers[i].getAttribute('data-direction');
      speed = this.containers[i].getAttribute('data-speed');
      stockX = (this.containers[i].getAttribute('data-posx'))? this.containers[i].getAttribute('data-posx').slice(0, this.containers[i].getAttribute('data-posx').length-2) : 1;
      stockY = (this.containers[i].getAttribute('data-posy'))? this.containers[i].getAttribute('data-posy').slice(0, this.containers[i].getAttribute('data-posy').length-2) : 1;
        if (direction == 'horizontal') {
          this.containers[i].style.backgroundPositionY = ((window.pageYOffset+stockY*vh) * +speed) +'px';
        } else if (direction == 'vertical') {
          this.containers[i].style.backgroundPositionX = ((window.pageYOffset+stockX*vw) * +speed) +'px';
        } else if (direction == 'fixed'){
          this.containers[i].style.backgroundPositionY = window.pageYOffset+'px';
        }
    }
  }
};
function fadeNavigation(){
  if (window.pageYOffset > 5*window.vh) window.nav.classList.add('scroll');
  else window.nav.classList.remove('scroll');
}
function CalculateScreen() {
  window.vw = document.body.clientWidth / 100;
  window.vh = document.body.clientHeight / 100;
}

window.onload = function(){
  window.nav = document.getElementById('navigation');
  document.getElementById('toggle_nav').onclick = function(){
    window.nav.classList.toggle('toggle');
  }
  document.getElementById('menu').onclick = function(){
    window.nav.classList.remove('toggle');
  }
  CalculateScreen();
  fadeNavigation();
  Parallax.add('#parallax');
  Parallax.add('#parallax .mask1');
  Parallax.add('#parallax .mask2');
  Parallax.move();
  window.onresize = function(){
    CalculateScreen();
  }
  window.onscroll = function(){
    Parallax.move();
    fadeNavigation();
  }
}
