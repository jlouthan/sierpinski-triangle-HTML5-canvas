var canvas;  
var ctx;
var x = 0;
var y = 0;
var xx = 50;
var yy = 397;
var WIDTH = 500;
var HEIGHT = 447; 
var LENGTH = 400;
var count;
var max_depth;
var sTriangle;
var clicks=0;

function clear() {
  ctx.clearRect(x, y, WIDTH, HEIGHT);
}

function rect(x,y,w,h) {
	  ctx.beginPath();
	  ctx.rect(x,y,w,h);
	  ctx.closePath();
	  ctx.fill();
	}

/*draws equilateral triangle with sides of length and (x,y) bottom left corner*/
function eqTriangle(x,y,length){ 
	var height = (length*Math.sqrt(3))/2;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+(length/2),y-height);
	ctx.lineTo(x+length,y);
	ctx.lineTo(x,y);
	ctx.lineWidth=0.25;
	ctx.fill();
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click",clicked,false);
  count=0;
  sTriangle = setInterval(draw, 1000);
}

function clicked(e){
	clicks++;
	if(clicks%2==1){
	clearInterval(sTriangle);}
	else{
	sTriangle = setInterval(draw, 1000);	
	}
}

function fractal(x,y,side,n){
	var length = side/2;
	var height = (length*Math.sqrt(3))/2;
	
	if(n==max_depth){
	eqTriangle(x,y,side);
	eqTriangle(x,y,side);
	eqTriangle(x,y,side);}

	if(n<max_depth){
		fractal(x,y,length,n+1);
		x+=length;
		fractal(x,y,length,n+1);
		x-=length/2;
		y-=height;
		fractal(x,y,length,n+1);
	}
		
	
}

function updateText(){
	var iter;
	if(count==0){
	iter=count;	
	}
	else{
		iter=count-1;
	}
	document.getElementById('iter').innerHTML = iter;
}

function resetCanvas(){
	  clear();
	  ctx.fillStyle = "#EE799F";
	  rect(0,0,WIDTH,HEIGHT);
	  count=0;
	  if(clicks%2==1){
	  clicked();}
}


function backOne(){
	if(count>0){
	count = count-2;}
	else{
		count--;
	}
	draw();
}

function draw() {	
  clear();
  ctx.fillStyle = "#EE799F";
  rect(x,y,WIDTH,HEIGHT);
  ctx.fillStyle = "#000000";
	  if(count<10){
	  max_depth=count;
	  count++;}
	  else{
		  count=0;
	  }
fractal(xx,yy,LENGTH,0);
ctx.fillStyle = "#444444";
updateText();

}

init();