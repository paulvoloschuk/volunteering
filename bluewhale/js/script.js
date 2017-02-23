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
function getXmlHttp() {
    var xmlhttp;
    try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
      xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function sendMessage(element){
  var type;
  var xmlhttp = getXmlHttp();
  element.classList.add('loading');
  xmlhttp.open('POST', 'mail.php', true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send("name=" + encodeURIComponent(element.elements[0].value) + "&contacts=" + encodeURIComponent(element.elements[1].value) + "&text=" + encodeURIComponent(element.elements[2].value));
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      type = (xmlhttp.status == 200)? 'success' : 'error';
      setTimeout(function(){element.classList.add(type);}, 1500);
    }
    setTimeout(function(){element.className = '';element.reset();}, 3000);
  }
}
function fadeNavigation(){
  if (window.pageYOffset > 5*window.vh) window.nav.classList.add('scroll');
  else window.nav.classList.remove('scroll');
}
function calculateScreen() {
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
  document.getElementById('ajax_mail').onsubmit = function(e){
    sendMessage(e.target);
    e.preventDefault();
  }
  calculateScreen();
  fadeNavigation();
  Parallax.add('#parallax');
  Parallax.add('#parallax .mask1');
  Parallax.add('#parallax .mask2');
  Parallax.move();
  window.onresize = function(){
    calculateScreen();
  }
  window.onscroll = function(){
    Parallax.move();
    fadeNavigation();
  }
}
