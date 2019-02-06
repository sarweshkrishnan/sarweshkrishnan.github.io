window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

var can, ctx, back, witch, bat; //for canvas and drawimage

var batht=function() {					//for height of bats appearing			
		this.ht=100;
	}
	
var broom=function() {					//has coords of broom
		this.shipX=10;
		this.shipY=140;
}

var background= function() {			//var for scrolling background
		this.xBack=0;
		this.xIncr=2;
}

var pumpkinhit= function(){
		this.px;
		this.py;
		this.v;
		this.theta;
}

var points = function(){
		this.arr;
}

var collected= function(){
		this.score=0;
}

var height = new batht();
var broomht = new broom();
var changebg = new background();
var sc=new collected();
var pumpkin = new pumpkinhit(); 
	
var fruit1 = new points();
var fruit2 = new points();
fruit1.arr=50;
fruit2.arr=200;

			var d = new Date();
            var dnw = new Date();
            var startTime,time;
            var deg = 45;
            var te = 0.1;
            var i = 0; 
         	
            
            // movement and inertial elements 
            var right = false;
            var left = false;
            var down = false;
            var up = false;
            var accx = 2,accy = 2,direction,inertial_speed;
           
            // broom 
            var broomReady = false;
            var broom = new Image();
            
            //pumpkin 
            var pumpkinReady = false;
            var pumpkinimage = new Image();
			
			// to move broom 
            function onKeyDown(e) {
            	  inertial_speed = 0.01;
            	  if (e.keyCode == 39){right = true ; direction = 'right'; accx = 2; inertial_speed = inertial_speed + 0.001;}
            	  if (e.keyCode == 37){left = true; direction = 'left'; accx = 2;    inertial_speed = inertial_speed + 0.001;}
            	  if (e.keyCode == 40){up = true; direction = 'up'; accy = 2;        inertial_speed = inertial_speed + 0.001;}
              	  if (e.keyCode == 38){down = true; direction = 'down'; accy = 2;    inertial_speed = inertial_speed + 0.001;}
            	}
            
            function onKeyUp(e) {
            	  if (e.keyCode == 39) right = false;  
            	  if (e.keyCode == 37) left = false;
            	  if (e.keyCode == 40) up = false;
            	  if (e.keyCode == 38) down = false;
            	}
            
            function acceleration()
            {
            	
            	
            
            }

			
var target=[1,1,1,1,1],target1 = [1,1,1,1],target2 = [1,1,1,1] ,targetX = [], targetY = [], targetSpeed = 1.5,
            phase = 0.1, targets = 4, bullets = [1,1,1,1,1], bulletX, bulletY;
 
function init() {
			var back=document.getElementById("back")
            can = document.getElementById("can");
            ctx = can.getContext("2d");
            ctx.font = "14pt Helvetica";
				
            newTargets();
            animate();
           
			can.addEventListener("mousemove",move, false);
            can.addEventListener("touchmove",tMove, false);
            can.addEventListener("mouseup",newBullet, false);
			addEventListener('keydown',onKeyDown,false);
            addEventListener('keyup',onKeyUp,false);
            time = d.getTime();
        }
		
function newBullet(e) {
        	
        	
        	//pumpkin_array[0].px = 35;
        	//pumpkin_array[0].py = broomht.shipY + 10; 
        	
        	pumpkin.px = broomht.shipX + 35;
            pumpkin.py = broomht.shipY + 10;
            te = 0;
        
       //     bullet.push(pumpkin.px); 
         
        }
 
function newTargets() {
            for (i = 0; i < targets; i++) {
                target[i] = 1;
                targetX[i] = can.width + 10 + i * 50;
                targetY[i] = i * Math.PI / 2;
            }
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
			
			time = (new Date()).getTime() - startTime;
					
			// if background scrolled off screen, reset
            if (changebg.xBack <= -1 * 1200)
            	{
					changebg.xBack += 1200;
					height.ht=Math.random()*200+50;
					fruit1.arr=Math.random()*350+50;
					fruit2.arr=Math.random()*350+50;
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
            // if there is a pumpkin, advance it 
            if (pumpkin.px)
            { 
              var speed = 3500;
              var gravity = 250;
              var t  = time/1000;
              
                pumpkin.px = pumpkin.px + speed*t;
                pumpkin.py = pumpkin.py + (0.5*gravity*te*te);
                te = te + 0.004;
      
             }
            // if the pumpkin goes off the right edge, zero it 
            if (pumpkin.px > can.width)
                 pumpkin.px = 0;
            if (pumpkin.py > can.height)
                 te = 0;
        
            
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
     // load sprite  
            var t  = time/1000;
            var speed = 3500;
            var slow = 1.03-inertial_speed;
         
			broom.onload = function () {
            	broomReady = true;
            };
            	broom.src = "witch.png";
         
            	  
            	 // for direction movement 
            	   if (right) broomht.shipX += speed*t;
                else 
                   if (left) broomht.shipX -= speed*t;
                else
            	   if (up) broomht.shipY += speed*t;
                else 
                   if (down) broomht.shipY -= speed*t;
            	   
            	   // for inertia 
            	      if (!right && direction == 'right') {broomht.shipX += accx; slow = 1.05-inertial_speed; accx = accx/slow;}
                   else 
                      if (!left && direction == 'left') {broomht.shipX -= accx; slow = 1.05-inertial_speed; accx = accx/slow;}
                   else
               	      if (!up && direction == 'up') {broomht.shipY += accy; slow = 1.05-inertial_speed; accy = accy/slow;}
                   else 
                      if (!down && direction == 'down') {broomht.shipY -= accy; slow = 1.05-inertial_speed; accy = accy/slow;}

            ctx.drawImage(broom, broomht.shipX, broomht.shipY, 75, 75);
			}
	
function drawBats(){       	
			ctx.drawImage(bat, changebg.xBack +700,height.ht ,100 , 100);
		}
		
function drawPumpkins() {
				
				var k1=fruit1.arr,k2=fruit2.arr;
				for(var i=0;i<5;i++)					// 4 targets in total
				{
					var tY =  15 * Math.sin(targetY[i]);

					if(target1[i])
						{
						ctx.drawImage(pumpkin, changebg.xBack +620 + k1,fruit1.arr+tY ,25 ,25);
							
							if((changebg.xBack+620+k1)<70 && (changebg.xBack+620+k1)>0)			//subtract x axis of witch to compare
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
		
function drawTarget() {
			
			ctx.strokeStyle = "red";
            // for each target:
            for (i = 0; i < targets; i++) {
                // if target not yet hit:
                if (target[i]) {
                 
				 var tY =  25 * Math.sin(targetY[i]);
                    ctx.arc(targetX[i], tY, 10, 0, 2 * Math.PI);
                    
					// if bullet inside circle, target is hit
                    /*if (bulletX && ctx.isPointInPath(bulletX,bulletY)) {
                        target[i] = 0;
                        score = score + 10;
                    }*/
                }
            }
        }
 
function drawBullet() {					//pumpkin here
            if (pumpkin.px)
              { 	//ctx.fillRect(pumpkin.px, pumpkin.py, 2, 1);
            
                pumpkinimage.onload = function () {
            	pumpkinReady = true;
                };
                
            	pumpkinimage.src = "pumpkin_hit.png";
            	
            ctx.drawImage(pumpkinimage, pumpkin.px, pumpkin.py, 25, 25);
          //  ctx.rotate(pumpkin, deg * Math.PI/180);
          }
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