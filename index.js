var sldr = 0;
var cl = 0;
var img = null;
var w, h;
function init() {
  var z = document.getElementsByClassName("tlo");
  for (let i = 0; i < z.length; i++) {
    main(z[i]);
  }
}

function end() {
  cl = 0;
}

function slide(x) {
  img.style.width = x+"px";
  sldr.style.left = img.offsetWidth-(sldr.offsetWidth/2)+"px";
}

function getMousePos(e) {
  var a, x = 0;
  a = img.getBoundingClientRect();
  x = e.pageX-a.left;
  x = x-window.pageXOffset;
  return x;
}

function main(a) {
  img = a;

  w = img.offsetWidth;
  h = img.offsetHeight;
  img.style.width = (w/2)+"px";

  sldr = document.createElement("div");

  sldr.setAttribute("class", "slider");

  img.parentElement.insertBefore(sldr, img);

  sldr.style.top = (h/2)-(sldr.offsetHeight/2)+"px";
  sldr.style.left = (w /2)-(sldr.offsetWidth/2)+"px";

  sldr.addEventListener("mousedown", rdy);
  window.addEventListener("mouseup", end);
  sldr.addEventListener("touchstart", rdy);
  window.addEventListener("touchend", end);
}

function rdy(e) {
  e.preventDefault();
  cl = 1;
  window.addEventListener("mousemove", mv);
  window.addEventListener("touchmove", mv);
}

function mv(e) {
  if (cl == 0) return false;
  var pos = getMousePos(e);
  if (pos<0) pos = 0;
  if (pos>w) pos = w;
  slide(pos);
}

window.addEventListener('load', init);

document.getElementById("file1").addEventListener("change", handleFiles, false);
document.getElementById("file2").addEventListener("change", handleFiles, false);

function handleFiles(e) {
  var file = e.target.files[0];
  if(e.target.id == "file1") {var img = document.getElementById('zdj1');}
  else var img = document.getElementById('zdj2');
  
  img.file = file;

  const reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}