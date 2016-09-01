var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var WIDTH = 1024;
var HEIGHT = 768;
var RADIUS = 8;
var balls = [];
var colors = ["red","green","yellow","blue","orange","olive","purple","aqua","maroon","sliver"];
var hours = new Date().getHours();
var minutes = new Date().getMinutes();
var seconds = new Date().getSeconds();
window.onload = function()
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	WIDTH = document.documentElement.clientWidth;
	HEIGHT = document.documentElement.clientHeight;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	MARGIN_LEFT = Math.round(WIDTH/10);
	MARGIN_TOP = Math.round(HEIGHT/5);
	RADIUS = Math.round(WIDTH * 4 / 5 / 108) - 1;
	setInterval(function(){render(context)},50);
}
function render(cxt)
{
	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1),MARGIN_TOP,parseInt(seconds%10),cxt);
	
	var curhours = new Date().getHours();
	var curminutes = new Date().getMinutes();
	var curseconds = new Date().getSeconds();
	if(parseInt(curhours/10)!= parseInt(hours/10))
	{
		addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
	}
	if(parseInt(curhours%10)!= parseInt(hours%10))
	{
		addBalls(MARGIN_LEFT + 15 * (RADIUS + 1),MARGIN_TOP,parseInt(hours%10));
	}
	if(parseInt(curminutes/10)!= parseInt(minutes/10))
	{
		addBalls(MARGIN_LEFT + 39 * (RADIUS + 1),MARGIN_TOP,parseInt(minutes/10));
	}
	if(parseInt(curminutes%10)!= parseInt(minutes%10))
	{
		addBalls(MARGIN_LEFT + 54 * (RADIUS + 1),MARGIN_TOP,parseInt(minutes%10));
	}
	if(parseInt(curseconds/10)!= parseInt(seconds/10))
	{
		addBalls(MARGIN_LEFT + 78 * (RADIUS + 1),MARGIN_TOP,parseInt(seconds/10));
	}
	if(parseInt(curseconds%10)!= parseInt(seconds%10))
	{
		addBalls(MARGIN_LEFT + 93 * (RADIUS + 1),MARGIN_TOP,parseInt(seconds%10));
	}
	hours = curhours;
	minutes = curminutes;
	seconds = curseconds;
	
	for(var i = 0;i < balls.length;i++)
	{
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2 * Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
	
	for(var i = 0;i < balls.length;i++)
	{
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= HEIGHT - RADIUS)
		{
			balls[i].y = HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
}
function renderDigit(x,y,num,cxt)
{
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i = 0;i < digit[num].length;i++)
	{
		for(var j = 0;j < digit[num][i].length;j++)
		{
			if(digit[num][i][j] == 1)
			{
				cxt.beginPath();
				cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1),y + i * 2 * (RADIUS + 1) + (RADIUS + 1),RADIUS,0,2 * Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
function addBalls(a,b,num)
{
	for(var i = 0;i < digit[num].length;i++)
	{
		for(var j = 0;j < digit[num][i].length;j++)
		{
			if(digit[num][i][j] == 1)
			{
				var aBall = {
					x:a + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y:b + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					g:1.5 + Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random() * 100)) * 4,
					vy:-4,
					color:colors[Math.floor(Math.random() * colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}