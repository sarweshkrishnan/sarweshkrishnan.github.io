window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

var can, ctx, back, witch, bat; //for canvas and drawimage

var batht=function() {					//for height of bats appearing			
		this.ht=Math.random()*200+50;
	}
	
var broom=function() {					//has coords of broom
		this.shipX=10;
		this.shipY=140;
}

var background= function() {			//var for scrolling background
		this.xBack=0;
		this.xIncr=4;
}

var pumpkin= function(){
		this.px;
		this.py;
		this.v;
		this.theta;
}

var points = function(){
		this.arr=Math.random()*350+50;
}

var collected= function(){
		this.score=0;
}

var broomht = new broom();
var changebg = new background();
var changebat=new background();
var sc=new collected();
	
var fruit1 = new points();
var fruit2 = new points();

var height = new batht();
var height1 = new batht();
var height2= new batht();

var target=[1,1,1,1,1],target1 = [1,1,1,1],target2 = [1,1,1,1] ,targetX = [], targetY = [], targetSpeed = 1.5,
            phase = 0.1, targets = 4, bullets = [1,1,1,1,1], bulletX, bulletY;
 
function init() {
			pumpkin=document.getElementById("pumpkin");
            witch=document.getElementById("witch");
			back = document.getElementById("back");
            bat = document.getElementById("bat");
            can = document.getElementById("can");
            ctx = can.getContext("2d");
            ctx.font = "14pt Helvetica";
				
            newTargets();
            animate();
           
			can.addEventListener("mousemove",move, false);
            can.addEventListener("touchmove",tMove, false);
            can.addEventListener("mouseup",newBullet, false);
        }
 
function newTargets() {
            for (i = 0; i < targets; i++) {
                target[i] = 1;
                targetX[i] = can.width + 10 + i * 50;
                targetY[i] = i * Math.PI / 2;
            }
        }
 
        // There is a maximum of 1 bullet
        // If user shoots again, old bullet is gone
        // If bulletX = 0, there is no bullet
 
        // User clicked mouse or lifted finger
        function newBullet(e) {
        	bulletX = 35;
            bulletY = broomht.shipY + 10;
        
            bullet.push(bulletX);
        
        }
 
function animate() {
			model();
            drawBack();
			drawWitch();
			drawPumpkins();
			drawBats();
			drawBullet();
            //checkcollision();
			//drawTarget();
            drawScore();
					
			// if background scrolled off screen, reset
            if(changebat.xBack<-1200)
				{
					changebat.xBack += 1200;
					height.ht=Math.random()*200;
					height1.ht=Math.random()*250;
					height2.ht=Math.random()*300;
				}
			
			if (changebg.xBack <= -1 * 1200)
            	{
					changebg.xBack += 1200;
					
					fruit1.arr=Math.random()*300+50;
					fruit2.arr=Math.random()*300+50;
					target1=[1,1,1,1];
					target2=[1,1,1,1];
				}
					
			/*ctx.beginPath();
			ctx.arc(600, 70, 35, 3/2*Math.PI+0.3, 5/2*Math.PI+0.3, false);
			ctx.fillStyle = '#b8b8b8';
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(585, 67, 38, 0, 2*Math.PI, false);
			ctx.fillStyle = '#5e4a96';
			ctx.fill();*/
			
            requestAnimFrame(function(){
			//startTime=(new Datee()),getTime();
			animate();
			});
			//setTimeout(animate, 20);
        }
 
function model() {
            // if there is a bullet, advance it
            if (bulletX)
                bulletX = bulletX + 2;
            // if the bullet goes off the right edge, zero it
            if (bulletX > can.width)
                 bulletX = 0;
             // move targets
            for (i = 0; i < targets; i++) {
                    targetX[i] -= targetSpeed;
                    targetY[i] += phase;
            }
            // if last target off left edge of screen,
            // generate new set
            if (targetX[targets - 1] < 0)
                newTargets();
        }
 
function drawBack() {
                // pan background                
                changebg.xBack -= changebg.xIncr;
                ctx.drawImage(back, changebg.xBack, 0 ,1200, 500);			//800--> image width
                // draw new copy at right edge of old copy
                ctx.drawImage(back, changebg.xBack +1200 , 0 ,1200 , 500);
		}
		
function drawWitch() {
			ctx.drawImage(witch,broomht.shipX,broomht.shipY,100,100);
		}
	
function drawBats(){       	
			changebat.xBack -= 7;
			ctx.drawImage(bat, changebat.xBack +700,height.ht ,75 , 75);
			ctx.drawImage(bat, changebat.xBack +850,height1.ht ,75 , 75);
			ctx.drawImage(bat, changebat.xBack +1000,height2.ht ,75 , 75);
			}
		
function drawPumpkins() {
				
				var k1=fruit1.arr,k2=fruit2.arr;
				for(var i=0;i<5;i++)					// 4 targets in total
				{
					var tY =  15 * Math.sin(targetY[i]);

					if(target1[i])
						{
						ctx.drawImage(pumpkin, changebg.xBack +650 + k1,fruit1.arr+tY ,25 ,25);
							
							if((changebg.xBack+650+k1)<70 && (changebg.xBack+650+k1)>0)			//subtract x axis of witch to compare
							{
								if((broomht.shipY-fruit1.arr)<50 && (broomht.shipY-fruit1.arr)>-100)
								{
									target1[i]=0;
									sc.score+=1;
								}
							}
						}
					
					if(target2[i])
						{
						ctx.drawImage(pumpkin, changebg.xBack +800 + k2,fruit2.arr+tY ,25 ,25);
											
						if((changebg.xBack+800+k2)<100 && (changebg.xBack+800+k2)>0)		//subtract x axis of witch to compare
							{
								if((broomht.shipY-fruit2.arr)<50 && (broomht.shipY-fruit2.arr)>-100)
								{
									target2[i]=0;
									sc.score+=1;
								}
							}
						}
					
					k1+=30;
					k2+=30;
				}
		}
		
function drawBullet() {					//pumpkin here
            if (bulletX)
                ctx.fillRect(bulletX, bulletY, 2, 1);
        }
 
/*function checkcollision(){
	if(changebg.xBack<-800)
		if(broomht.shipY-height.ht<50 && broomht.shipY-height.ht>-50)
		alert("fuck");
	}*/

function drawScore() {
			document.getElementById("scoreupdate").innerHTML="Pumpkins :"+" "+sc.score;
            document.getElementById("bar").style.width=(sc.score*5)+"px";
        }
 
        // move ship in response to mouse
function move(e)
        {
            if (!e)
                e = event;
            broomht.shipY = e.pageY;
            return false;
        }
 
        // move ship in response to touch
function tMove(e)
        {
            if (!e)
                e = event;
            broomht.shipY = e.touches[0].pageY;
            return false;
        }