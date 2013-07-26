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
var max_depth=2;
var sCurve;
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
	ctx.stroke();
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click", clicked, false);
  count=0;
  sCurve = setInterval(draw, 1000);
}

function clicked(e) {
	clicks++;
	if(clicks%2==1){
	clearInterval(sCurve);}
	else{
	sCurve = setInterval(draw, 1000);	
	}
}

function line(x0,y0,x1,y1){
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);
	ctx.lineWidth=2;
	ctx.stroke();
}

function fractal(x0,y0,x1,y1,side,n){
	var length = side/2;
	var height = (length*Math.sqrt(3))/2;
	
	if(n==max_depth){
		/*Draw appropriate lines for line || to the x-axis*/
		if(y0==y1){
			X0=x0;
			Y0=y0;
			X1=x0+(length/2);
			Y1=y0-height;
			line(X0,Y0,X1,Y1);
			X0=x0+(length/2);
			Y0=y0-height;
			X1=x1-(length/2);
			Y1=y0-height;
			line(X0,Y0,X1,Y1);
			X0=x1-(length/2);
			Y0=y0-height;
			X1=x1;
			Y1=y1;
			line(X0,Y0,X1,Y1);}
		/*Draw appropriate lines for line slanting right*/
		else if(y0<y1){
			X0=x0-(length/2);
			Y0=y0+height;
			X1=x0;
			Y1=y0;
			line(X0,Y0,X1,Y1);
			X0=x0-(length/2);
			Y0=y0+height;
			X1=x0;
			Y1=y1;
			line(X0,Y0,X1,Y1);
			X0=x0;
			Y0=y1;
			X1=x0+length;
			Y1=y1;
			line(X0,Y0,X1,Y1);
		}
		/*Draw appropriate lines for line slanting left*/
		else if(y0>y1){
			X0=x0;
			Y0=y0;
			X1=x0+length;
			Y1=y0;
			line(X0,Y0,X1,Y1);
			X0=x0+length;
			Y0=y0;
			X1=x1+(length/2);
			Y1=y0-height;
			line(X0,Y0,X1,Y1);
			X0=x1;
			Y0=y1;
			X1=x1+(length/2);
			Y1=y0-height;
			line(X0,Y0,X1,Y1);
		}
	}

	if(n<max_depth){
		/*Send lines with pairs ordered correctly*/
		if(y0==y1){
			X0=x0;
			Y0=y0;
			X1=x0+(length/2);
			Y1=y0-height;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x0+(length/2);
			Y0=y0-height;
			X1=x1-(length/2);
			Y1=y0-height;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x1-(length/2);
			Y0=y0-height;
			X1=x1;
			Y1=y1;
			fractal(X0,Y0,X1,Y1,length,n+1);}
		else if(y0<y1){
			X0=x0-(length/2);
			Y0=y0+height;
			X1=x0;
			Y1=y0;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x0-(length/2);
			Y0=y0+height;
			X1=x0;
			Y1=y1;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x0;
			Y0=y1;
			X1=x0+length;
			Y1=y1;
			fractal(X0,Y0,X1,Y1,length,n+1);
		}
		else if(y0>y1){
			X0=x0;
			Y0=y0;
			X1=x0+length;
			Y1=y0;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x0+length;
			Y0=y0;
			X1=x1+(length/2);
			Y1=y0-height;
			fractal(X0,Y0,X1,Y1,length,n+1);
			X0=x1;
			Y0=y1;
			X1=x1+(height/2);
			Y1=y0-height;
			fractal(X0,Y0,X1,Y1,length,n+1);
		}
		
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
/*eqTriangle(xx,yy,LENGTH);*/
 	  if(count<10){
	  max_depth=count;
	  count++;}
	  else{
		  count=0;
	  }
fractal(xx,yy,xx+LENGTH,yy,LENGTH,0);
updateText();

}

init();