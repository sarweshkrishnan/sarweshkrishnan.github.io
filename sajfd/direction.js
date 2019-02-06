<html>
<head>
    <title>Witch Run</title>
    <meta name="viewport" content="width=600" />
    <script type="text/javascript">
    
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 70);
        };
      })();
    	
    var pumpkinhit = function (){
    	this.px;
    	this.py;
    	this.v;
    	this.theta;
    	}
    	
    var pumpkin = new pumpkinhit(); 
    var pumpkin_array = new pumpkinhit();
    pumpkin_array = new Array();
    
    
            var can, ctx, back, xBack = 0, xIncr = 1,
            imgWidth = 1200, shipX = 10, shipY = 140,
            imgw = 1200, imgh = 500,
            target = [1, 1, 1, 1, 1],
            targetX = [], targetY = [], targetSpeed = 1.5,
            phase = 0.1, targets = 4, bullets = [1,1,1,1,1], score = 0;
            
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
            	  if (e.keyCode == 39){right = true ; direction = 'right'; accx = 2; inertial_speed = inertial_speed + 0.001; alert('yo');}
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
            
                     
            // move broom in response to mouse 
            function move(e)
            {
                if (!e)
                    e = event;
                shipY = e.pageY;
       
                return false;
            }
      
            // move broom in response to touch 
            function tMove(e)
            {
                if (!e)
                    e = event;
                shipY = e.touches[0].pageY;
                return false;
            }
            
        function init() {
        	
        	rightDown = false;
        	leftDown = false;
            back = document.getElementById("back");
            can = document.getElementById("can");
            ctx = can.getContext("2d");
            ctx.font = "14pt Helvetica";
            newTargets();
            animate();
           // can.addEventListener("mousemove",move, false);
            can.addEventListener("touchmove",tMove, false);
            can.addEventListener("mouseup",newBullet, false);
            addEventListener('keydown',onKeyDown,false);
            addEventListener('keyup',onKeyUp,false);
            time = d.getTime();
           
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
        // If pumpkin.px = 0, there is no bullet 
 
        // User clicked mouse or lifted finger 
        function newBullet(e) {
        	
        	
        	//pumpkin_array[0].px = 35;
        	//pumpkin_array[0].py = shipY + 10; 
        	
        	pumpkin.px = shipX + 35;
            pumpkin.py = shipY + 10;
            te = 0;
        
       //     bullet.push(pumpkin.px); 
         
        }
 
        function animate() {
            model();
            drawBack();
            drawbroom();
            drawBullet();
           // drawTarget();
            drawScore();
            // request new frame
            requestAnimFrame(function() {
              startTime = (new Date()).getTime();
              animate();
            });
            time = (new Date()).getTime() - startTime;
         //   setTimeout(animate, 15); 
        }
 
        function model() {
            // if there is a pumpkin, advance it 
            if (pumpkin.px)
            { 
              var speed = 3500;
              var gravity = 250;
              var t  = time/1000;
              
                pumpkin.px = pumpkin.px + speed*t;
                pumpkin.py = pumpkin.py + (0.5*gravity*te*te);
                te = te + 0.004;
               //   pumpkin.py = startY - ( v0y * t - (1/2 * g * Math.pow(t,2)) ); 
      
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
                xBack -= xIncr;
                ctx.drawImage(back, xBack, 0 ,imgw, imgh);
                // draw new copy at right edge of old copy 
                ctx.drawImage(back, xBack + imgWidth, 0 ,imgw ,imgh);
                // if background scrolled off screen, reset 
                if (xBack <= -1 * imgWidth)
                    xBack += imgWidth;
        }
 
 
        function drawTarget() {
            ctx.strokeStyle = "red";
            // for each target:
            for (i = 0; i < targets; i++) {
                // if target not yet hit:
                if (target[i]) {
                    // draw a circle
                    ctx.beginPath();
                    var tY = 150 + 25 * Math.sin(targetY[i]);
                    ctx.arc(targetX[i], tY, 10, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                    // if bullet inside circle, target is hit
                    if (pumpkin.px && ctx.isPointInPath(pumpkin.px,pumpkin.py)) {
                        target[i] = 0;
                        score = score + 10;
                    }
                }
            }
        }
 
        function drawbroom() {
     // load sprite  
            var t  = time/1000;
            var speed = 3500;
            var slow = 1.03-inertial_speed;
            broom.onload = function () {
            	broomReady = true;
            };
            	broom.src = "witch.png";
            
            	  
            	 // for direction movement 
            	   if (right) shipX += speed*t;
                else 
                   if (left) shipX -= speed*t;
                else
            	   if (up) shipY += speed*t;
                else 
                   if (down) shipY -= speed*t;
            	   
            	   // for inertia 
            	      if (!right && direction == 'right') {shipX += accx; slow = 1.05-inertial_speed; accx = accx/slow;}
                   else 
                      if (!left && direction == 'left') {shipX -= accx; slow = 1.05-inertial_speed; accx = accx/slow;}
                   else
               	      if (!up && direction == 'up') {shipY += accy; slow = 1.05-inertial_speed; accy = accy/slow;}
                   else 
                      if (!down && direction == 'down') {shipY -= accy; slow = 1.05-inertial_speed; accy = accy/slow;}

            ctx.drawImage(broom, shipX, shipY, 75, 75);
        }
 
        function drawBullet() {
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
 
        function drawScore() {
            var sc = "Score: " + score;
            ctx.fillText(sc, 10, 25);
            
        }
 
   
    </script>
</head>
<body onload="init()" style="background-color:black">
    <canvas id="can" height="500" width="750"
            style="position:absolute;top:0;left:0">
    </canvas>
    <img id="back" style="display:none" src="halloween_final.jpg" />
</body>
</html>

