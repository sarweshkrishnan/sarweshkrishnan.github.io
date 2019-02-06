var can, ctx, back, xBack = 0, xIncr = 1,
            imgWidth = 800, shipX = 10, shipY = 140,
            target = [1, 1, 1, 1, 1],
            targetX = [], targetY = [], targetSpeed = 1.5,
            phase = 0.1, targets = 4, bullets = [1,1,1,1,1], bulletX, bulletY, score = 0,ht=100;
 
function init() {
            back = document.getElementById("back");
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
            bulletY = shipY + 10;
        
            bullet.push(bulletX);
        
        }
 
function animate() {
            model();
            drawBack();
            drawBullet();
            //drawTarget();
            drawScore();
			
			ctx.beginPath();
			ctx.arc(600, 70, 35, 3/2*Math.PI+0.3, 5/2*Math.PI+0.3, false);
			ctx.fillStyle = '#b8b8b8';
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(585, 67, 38, 0, 2*Math.PI, false);
			ctx.fillStyle = '#5e4a96';
			ctx.fill();
            
			setTimeout(animate, 20);
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
                xBack -= xIncr;
                ctx.drawImage(back, xBack, 0 ,800, 500);
                // draw new copy at right edge of old copy
                ctx.drawImage(back, xBack + imgWidth, 0 ,800 , 500);
                // if background scrolled off screen, reset
                if (xBack <= -1 * imgWidth)
                    {
					xBack += imgWidth;
					ht=Math.random()*100+100;
					}	
			ctx.drawImage(bat, xBack + imgWidth,ht ,100 , 100);
			ctx.drawImage(witch,shipX,shipY,100,100);
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
                    if (bulletX && ctx.isPointInPath(bulletX,bulletY)) {
                        target[i] = 0;
                        score = score + 10;
                    }
                }
            }
        }
 
function drawBullet() {
            if (bulletX)
                ctx.fillRect(bulletX, bulletY, 2, 1);
        }
 
        function drawScore() {
            var sc = "Score: " + score;
            ctx.fillText(sc, 10, 25);
        }
 
        // move ship in response to mouse
function move(e)
        {
            if (!e)
                e = event;
            shipY = e.pageY;
            return false;
        }
 
        // move ship in response to touch
function tMove(e)
        {
            if (!e)
                e = event;
            shipY = e.touches[0].pageY;
            return false;
        }