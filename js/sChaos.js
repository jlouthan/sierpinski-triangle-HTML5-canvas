var canvas;  
var ctx;
var xx = 50;
var yy = 397;
var WIDTH = 500;
var HEIGHT = 447; 
var LENGTH = 400;
var count;
var globalCount=0;
var max_depth;
var sChaos;
var clicks=0;

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function rect(x,y,w,h) {
	  ctx.beginPath();
	  ctx.rect(x,y,w,h);
	  ctx.closePath();
	  ctx.fill();
	}
	
function eqTriangle(x,y,length){ 
	var height = (length*Math.sqrt(3))/2;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+(length/2),y-height);
	ctx.lineTo(x+length,y);
	ctx.lineTo(x,y);
	ctx.lineWidth=0.25;
	ctx.stroke();
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click",clicked,false);
  clear();
  ctx.fillStyle = "#EE799F";
  rect(0,0,WIDTH,HEIGHT);
  sChaos = setInterval(chaos, 750);
}

function clicked(){
	clicks++;
	if(clicks%2==1 || globalCount==100){
	stop();}
	else{
	sChaos = setInterval(chaos, 750);	
	}
}

function stop(){
	clearInterval(sChaos);
}

function RandomX(){
	var x = Math.floor(Math.random()*(LENGTH+1))+xx;
	return x;
}

function RandomY(x){
	var maxHeight;
	if(x<xx+(LENGTH/2)){
		maxHeight = Math.sqrt(3)*(x-xx);}
	else{
		maxHeight = Math.sqrt(3)*(xx+LENGTH-x);
	}
	var ymin = yy-maxHeight;
	var y = ymin + Math.floor(Math.random()*(maxHeight+1));
	return y;
}

function plotMidpoint(x0,y0,x1,y1){
	count++;
	x=(x0+x1)/2;
	y=(y0+y1)/2;
	ctx.fillRect(x,y,1,1);
	plotRandomPoint(x,y);
}

function plotRandomPoint(x,y){
	if(count==0){
	x = RandomX();
	y = RandomY(x);}
	if(count<500){
	var vertex = Math.floor(Math.random()*3);
	if(vertex==0){
		xVert = xx;
		yVert = yy;
	}
	if(vertex==1){
		xVert = xx+LENGTH;
		yVert = yy;
	}
	if(vertex==2){
		xVert = xx+(LENGTH/2);
		yVert = yy-(LENGTH*Math.sqrt(3))/2;
	}
	}
	plotMidpoint(x,y,xVert,yVert);
}

function updateText(){
	document.getElementById('iter').innerHTML = globalCount*500;
}


function chaos() {	
ctx.fillStyle = "#000000";
count=0;
globalCount++;
updateText();
if(globalCount==100){
	clicked();
}
plotRandomPoint(0,0);

}

function resetCanvas(){
	  clear();
	  ctx.fillStyle = "#EE799F";
	  rect(0,0,WIDTH,HEIGHT);
	  globalCount=0;
	  if(clicks%2==1){
	  clicked();}
}

init();