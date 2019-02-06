function start(){
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.	msRequestAnimationFrame ||
    	function(callback) {
    		window.setTimeout(callback, 1000 / 60);
    	};
    })();
	
window.cancelRequestAnimFrame = ( function() {model
		
    return window.cancelAnimationFrame              ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame         ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();

    var can, ctx, back; 					//for canvas and drawimage 

    var audio = function(id){
      	 this.id  = id;
      	 var sound = document.getElementById(id);
      	 var vol;
      	 var check = true;
           this.load = function(){
                  sound.load();	  
                   }
           this.play = function() {
		   sound.currentTime = 0; 
		   sound.play();
		   }
           this.playonce = function() {sound.play();}
           this.loop = function() {
          	
          	 if(check)
          	 {  // sound.currentTime = 0;
                sound.play();
                check = false;
          	 }
          	 
               if(sound.ended || request)
              	 check = true;
           }
           this.volume = function(vol) {sound.volume = vol;}        
           
         }    
      
      // audio elements 
      var witch_sound = new audio("witch_sound");
      var thunder_sound = new audio("thunder_sound");
      var pumpkin_sound = new audio("pumpkin_sound");
      var ghost_sound = new audio("pumpkin_sound");
      var bullet_sound = new audio("bullet_sound");
      var hitbat_sound = new audio("hitbat_sound");
      var ouch_sound = new audio("ouch_sound");
      var bgm_sound = new audio("bgm_sound");
      var bat_sound = new audio("bat_sound");
      
      function  load_sounds()
      { 
      	witch_sound.load();
      	thunder_sound.load();
      	pumpkin_sound.load();
      	ghost_sound.load();
      	bullet_sound.load();
      	hitbat_sound.load();
      	ouch_sound.load();
      	bgm_sound.load();	
      	bat_sound.load();
      }
         
var broom=function() {					//has coords of broom 
    		this.shipX=10;
    		this.shipY=140;
    		this.right=false;
    		this.left = false;
    		this.down = false;
    		this.up = false;
    		this.accx = 2;
    		this.accy = 2;
    		this.direction;
    		this.isp;
    		this.driftsp = 0.75;
    		this.upspeed = 7;
    		this.downspeed = 3;
    		this.normalspeed = 3.5;
    }

    var background= function() {			//var for scrolling background 
    		this.xBack=0;
    		this.xIncr=4;
    }

    var pumpkin= function(){
    		this.px;
    		this.py;
    		this.v;	
    }

    var points = function(){				//for ht. of pumpkins to be collected
    		this.arr=Math.random()*350+50;
			this.target=new Array();
    }

    var collected= function(){
    		this.score = 30;
    }
	var points= function(){
		this.startime;
		this.endtime;
		this.score;
	}

    var pumpkinhit = function (){
    	this.px;
    	this.py;
    	this.v;
    	this.tlapse;
    	this.exist;
    }
    
    var ghost = function (){
    	this.gx = 800;
    	this.gy = 350;
    	this.v=1;	
		this.collide=0;
	}
    
    var batht=function() {					//for height of bats appearing			
		this.ht = Math.random()*200+50; 
        this.pos_space;    
        this.exist = 1;
        this.broomcol = 1;
	}
 
    var big_bat = [];	//array of objects for big bats
	var fruit = [];	
    for(var bb = 0 ; bb<4 ; bb++)
    	{
			fruit[bb] = new points;
			fruit[bb].target = [1,1];	
    	}
    for(var bb = 0 ; bb<5 ; bb++)
		{
			big_bat[bb] = new batht;
			big_bat[bb].pos_space = 750 + (bb*150);
		}
	
    var pumpkin_bullets = [];
    for(var j = 0 ; j<3 ; j++)
    pumpkin_bullets[j] = new pumpkinhit(0,0,0.1,0); 
    
   // var pumpkin = new pumpkinhit(); 
    var broomht = new broom();
	var ghostspawn  =  new ghost();
    var changebg = new background();
    var changebat = new background();
    var changeghost = new background();
	
	var changesmallbat1 = new background();
	var changesmallbat2 = new background();
    var sc = new collected();
    
	var height = new batht();
	var height1 = new batht();
	var height2 = new batht();	
	
	var fruit1 = new points();
    var fruit2 = new points();

	var finalscore=new points();
	
    var target1 = [1,1,1,1],target2 = [1,1,1,1] ,targetX = [], targetY = [], targetSpeed = 1.5, phase = 0.1, targets=4;
	var l=0, m=0, n=0,p=0 ,bingo=1, y1=0, y2=0, chkstat=0, prob=1, size=0, request, y=0, restart=0;			//l,m,n -->counter variables
	var bat_collide1=[],bat_collide2=[],introvalue=1;
	
	for(var t=0;t<20;t++)
	{
		bat_collide1[t]=0;
		if(i<15)
			bat_collide2[t]=0;
	}
	
    var d = new Date();
    var dnw = new Date();
    var startTime,time;
    var deg = 45;
    var i = 0; 
    var k = 0;  
    var keysDown = {};
     
    // broom
    var broomimage = new Image();

    //pumpkin bullet 
    var pumpkin_bullet_Ready = false;
    var pumpkin_bullet_image = new Image();

    //pumpkin collect
    var pumpkin_collect_image = new Image();
 
	var lightImage =new Image();
    
	var thunderImage2 = new Image();
	var thunderImage3 = new Image();
	
	var ghostimage =new Image();
	
    // to move broom 
function onKeyDown(e) {
    	  broomht.isp = 0.01;
    	  if (e.keyCode == 39 || e.keyCode == 68){broomht.right = true ; broomht.direction = 'broomht.right'; broomht.accx = 2; broomht.isp = broomht.isp + 0.001;}
    	  if (e.keyCode == 37 || e.keyCode == 65){broomht.left = true; broomht.direction = 'broomht.left'; broomht.accx = 2;    broomht.isp = broomht.isp + 0.001;}
    	  if (e.keyCode == 38 || e.keyCode == 87){broomht.up = true; broomht.direction = 'broomht.up'; broomht.accy = 2;        broomht.isp = broomht.isp + 0.001;}
      	  if (e.keyCode == 40 || e.keyCode == 83){broomht.down = true; broomht.direction = 'broomht.down'; broomht.accy = 2;    broomht.isp = broomht.isp + 0.001;}
    	}

function onKeyUp(e) {
		  if (e.keyCode == 39 || e.keyCode == 68) broomht.right = false;  
    	  else if (e.keyCode == 37 || e.keyCode == 65) broomht.left = false;
    	  else if (e.keyCode == 38 || e.keyCode == 87) broomht.up = false;
    	  else if (e.keyCode == 40 || e.keyCode == 83) broomht.down = false;
    	  else if (e.keyCode==67 && restart==1)
    		  {
    		  restart=0;
    		  setTimeout(function(){
					cancelRequestAnimFrame(request);                
						}, 100);
    		  init();
    		  }
    	  else {
						if(e.keyCode == 13 && y==0)
						{
						y=1;
						setTimeout(function(){
						cancelRequestAnimFrame(request);                
								}, 100);
							}
						else if(y==1)
						{
							y=0;
							animate();
						}
				}
		}

function init() {
	
	target1 = [1,1,1,1],target2 = [1,1,1,1] ,targetX = [], targetY = [], targetSpeed = 1.5, phase = 0.1, targets=4,
    l=0, m=0, n=0,p=0 ,bingo=1, y1=0, y2=0, chkstat=0, prob=1, size=0, request, y=0,			//l,m,n -->counter variables
	bat_collide1=[],bat_collide2=[];
	sc.score=30;
	changebg.xIncr=4;

	broomht.shipX = 10;
	broomht.shipY = 140;
	
		   bat = document.getElementById("bat");
    	   back = document.getElementById("back");
           newTargets();
		   loadimages();
		   load_sounds();
           animate();
           addEventListener("keyup",newBullet, false);
           addEventListener('keydown',onKeyDown,false);
           addEventListener('keyup',onKeyUp,false);
           time = d.getTime();
           
		   finalscore.startime= (new Date()).getTime();
		   finalscore.endtime = 0;
		   }
		   
function newTargets() {
                for (i = 0; i < targets; i++)
                    targetY[i] = i * Math.PI / 2;
           }
		   
function loadimages(){
		broomimage = preload.getResult("image12");
		lightImage = preload.getResult("image0");
		thunderImage2 = preload.getResult("image3");		
		thunderImage3 = preload.getResult("image4");
		pumpkin_bullet = preload.getResult("image10");
		pumpkin_collect_image = preload.getResult("image11");
		ghostimage = preload.getResult("image9");
		back = preload.getResult("back");
		clouds = preload.getResult("clouds");
		
	}
    
function newBullet(e) {
	
	if (e.keyCode == 32)
		{
    	pumpkin_bullets.push(new pumpkinhit(0,0,0.1,0));  	
        // create a new pumpkin 
		sc.score-=3;
        pumpkin_bullets[k].px = broomht.shipX + 35;
    	pumpkin_bullets[k].py = broomht.shipY + 10;
        pumpkin_bullets[k].tlapse = 0;
        pumpkin_bullets[k].exist = 1;
        pumpkin_bullets[k].v = 7;
        k++;
		}
    }

function destroyBullet()
   { var index;
  
     for(j = 0; j < pumpkin_bullets.length; j++ )
	  { index = pumpkin_bullets.indexOf(pumpkin_bullets[j]);

         if (pumpkin_bullets[j].px > 780)
	      {
         	pumpkin_bullets[j].px = 0;
         	pumpkin_bullets[j].py = 0;
          	pumpkin_bullets.splice(j, 1);
            k--;
	      }
      }
    }

function animate() {
    	model();
        drawBack();
		lightning();
		drawbroom();
		drawPumpkins();
	    drawBats();
		drawBullet();
		bgm_sound.loop();
		
		hitbats();
		if(Math.random()*1000<2 && y1!=1 && y2!=1)	
		{
			n=Math.random()*100+50;
			colonyofbats();
			y1=1;
			y2=1;
		}
		if(y1==1||y2==1)
			colonyofbats();
			
		if(Math.random()*5000<10 && changebg.xBack>-700)
			ghosts();
		
		if(p==1)
			ghosts();
			
		resetTargets();
		drawScore();
		checkstatus();
			
        request = requestAnimFrame(function() {
            startTime = (new Date()).getTime();
            animate();
			});

		if(l<200)
			ctx.fillText("Good luck staying alive",200,280);
          time = (new Date()).getTime() - startTime;
		}
     
function model() {
          var speed = 5;
          var gravity = 250;
          var t  = time/1000;
          var j = 0;
          
       for(j = 0; j < pumpkin_bullets.length; j++ )
        { 
          if (pumpkin_bullets[j].px)
          { 
        	  
        	pumpkin_bullets[j].px =  pumpkin_bullets[j].px + pumpkin_bullets[j].v;
              
            if (pumpkin_bullets[j].px > can.width)
        	   {
            	pumpkin_bullets[j].px = 0;
        	   }
            if (pumpkin_bullets[j].py > can.height)
        	   {
            	pumpkin_bullets[j].tlapse = 0;
        	   }
			} 
        } 
          
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
                    ctx.drawImage(back, changebg.xBack, 0 ,1200, 500);			//1200--> image width
                    // draw new copy at broomht.right edge of old copy
                    ctx.drawImage(back, changebg.xBack +1200 , 0 ,1200 , 500);
                    ctx.drawImage(clouds, 0 , -10 , 300, 165);
			}
			
function lightning()
	{
				if(Math.random()*1000 < (changebg.xIncr*2) && bingo==1 && y1!=0 && y2!=0)
				{
					bingo=Math.random()*300+10;
				}
				if(bingo!=1)
				{					
					if(m%1000>=320 && m%1000<400)
					ctx.drawImage(thunderImage2,bingo, 0 ,325, 320);
					else if(m%1000>400 && m%1000<405)					//when lightning strikes; check for broom under it
					{
						ctx.drawImage(thunderImage3,bingo, 0 ,325, 320);
						thunder_sound.play();
					if((bingo-broomht.shipX)<30 && (bingo-broomht.shipX)>-250 && bingo!=1)
    				{
    					if(broomht.shipY<250)
								{
									bingo=1;
									sc.score-=30;
								}
					}
					}
					else if(m%1000>410 && m%1000<500)
					{
						ctx.drawImage(thunderImage2,bingo, 0 ,325, 320);
						bingo=1;
						}
				}
				if(Math.random()*200<4)
				ctx.drawImage(lightImage, Math.random()*800, 0 ,50, 200);
	}
	
function drawbroom() {
	 // load sprite  
    var t  = time/1000;
    var slow = 1.01;    
    	  
    	 // for broomht.direction movement 
    	   if (39 in keysDown || broomht.right)
    	   {
    		   if(broomht.shipX > can.width-70)
    		      broomht.shipX += 0; 
    	      else
    		      broomht.shipX +=  broomht.normalspeed;
    	   }
        else if (37 in keysDown || broomht.left) 
           {
        	   if(broomht.shipX < 20)
        	      broomht.shipX += 0; 
        	   else 
        	      broomht.shipX -= broomht.normalspeed;
           }
        else if (38 in keysDown || broomht.up)   
    	   {
    		   if(broomht.shipY < 10)
    		      broomht.shipY += 0;
    	       else 
    		      broomht.shipY -= broomht.upspeed-2;
    	   }
        else if (40 in keysDown || broomht.down)
           {
        	   if(broomht.shipY > can.height-70)
                 broomht.shipY += 0;
               else 
        	      broomht.shipY += broomht.downspeed;
           }
       else
    	   {
    	    if(broomht.shipY > can.height-70)
                   {broomht.shipY += 0;
    	            broomht.shipX -= broomht.driftsp;
                   }
    	    else
    	    	if(broomht.shipX < 20)
     	           {broomht.shipX += 0;
    	            broomht.shipY += broomht.driftsp;
     	           }
    	    else
          	     if(broomht.shipX < 20 || broomht.shipY > can.height-70)
           	        {broomht.shipX += 0;
          	         broomht.shipY += 0;
           	        }
    	    else
    		  { broomht.shipX -= broomht.driftsp;
    		    broomht.shipY += broomht.driftsp;
    	      }
    	   }
           
    	   // for inertia 
    	      if (!broomht.right && broomht.direction == 'broomht.right') 
    	      { 
    	    	  if(broomht.shipX >= can.width-70)
    		      broomht.shipX += 0; 
    	      else 
    	    	  broomht.shipX += broomht.accx; slow = 1.01; broomht.accx = broomht.accx/slow;
    	    	  }
           else if (!broomht.left && broomht.direction == 'broomht.left') 
              {
           	    if(broomht.shipX <= 20)
         	       broomht.shipX += 0; 
         	    else 
         		   broomht.shipX -= broomht.accx; slow = 1.01; broomht.accx = broomht.accx/slow;
         		   }
           else if (!broomht.up && broomht.direction == 'broomht.up') 
       	      { 
       	    	  if(broomht.shipY <= 10)
       	            broomht.shipY += 0;
       	          else 
       	           broomht.shipY -= broomht.accy; slow = 1.0001; broomht.accy = broomht.accy/slow;   
       	      }
           else if (!broomht.down && broomht.direction == 'broomht.down') 
              {
            	  if(broomht.shipY >= can.height-80)
                      broomht.shipY += 0;
                   else
                	  broomht.shipY += broomht.accy; slow = 1.01; broomht.accy = broomht.accy/slow;
                	   }
		if(size==14000)
			size=0;
		if(l%10==0)
		{
			ctx.drawImage(broomimage, size, 0 ,1400 ,1000, broomht.shipX, broomht.shipY, 75, 75); 
			size+=1400;
		}
		else
			ctx.drawImage(broomimage, size, 0 ,1400 ,1000, broomht.shipX, broomht.shipY, 75, 75); 
		}

function hitbats()
{   
	var index;
    destroyBullet(); 
	for(var bb = 0; bb<5 ; bb++ )
	for(j = 0; j < pumpkin_bullets.length ; j++ ) 
	{
	  index = pumpkin_bullets.indexOf(pumpkin_bullets[j]);
		
	if(big_bat[bb].exist)
	{ 
	   if((changebat.xBack+big_bat[bb].pos_space-pumpkin_bullets[j].px)<40 && (changebat.xBack+big_bat[bb].pos_space-pumpkin_bullets[j].px)>-20 )
				{
				if((pumpkin_bullets[j].py-big_bat[bb].ht)<20 && (pumpkin_bullets[j].py-big_bat[bb].ht)>-40)
					{ 
					    big_bat[bb].exist = 0;
						if(sc.score<100)
							{
							sc.score+=4;
					     	pumpkin_bullets[j].px = 0;
				         	pumpkin_bullets[j].py = 0;
				          	pumpkin_bullets.splice(index, 1);
				            k--;
					     	hitbat_sound.play();
							}
					}
			}
		}
	}	
}
    	
function drawBats(){   

		bat.onload = function () {
        	batReady = true;
			};
       	changebat.xBack -= changebg.xIncr+3;

       	for (var bb = 0 ; bb<5 ; bb++)
       	{
		  if(big_bat[bb].exist)
		{  ctx.drawImage(bat, changebat.xBack +big_bat[bb].pos_space,big_bat[bb].ht ,40 ,40);
			if((changebat.xBack+big_bat[bb].pos_space-broomht.shipX)<60 && (changebat.xBack+big_bat[bb].pos_space-broomht.shipX)>-20 && big_bat[bb].broomcol)//subtract x axis of witch to compare 
					{
					if((broomht.shipY-big_bat[bb].ht)<40 && (broomht.shipY-big_bat[bb].ht)>-60)
						{ 
							big_bat[bb].broomcol = 0;
							sc.score-=10;
							ouch_sound.play();
						}
					}
			}  
       	} 
   }

function drawPumpkins() {        	    			
				for(var p=0,k1=fruit[p].arr;p<4;k1=fruit[p].arr,p++)			//4 set of pumpkins
				for(var i=0;i<2;i++,k1+=30)
    				{
    					var tY =  10 * Math.sin(targetY[i]);

    					if(fruit[p].target[i])
    						{
    						ctx.drawImage(pumpkin_collect_image, changebg.xBack +620+p*100+k1,fruit[p].arr+tY ,25 ,25);
    							if((changebg.xBack+620+p*100+k1-broomht.shipX)<70 && (changebg.xBack+620+p*100+k1-broomht.shipX)>-20)
    							{
    								if((broomht.shipY-fruit[p].arr)<50 && (broomht.shipY-fruit[p].arr)>-100)
    								{
    									fruit[p].target[i]=0;
    									if(sc.score<100)
											sc.score+=2;
    									    pumpkin_sound.play();
    								}
    							}
    						}
					}
			}

function drawBullet() {
    	for(j = 0; j < pumpkin_bullets.length ; j++ ) 
    	  if (pumpkin_bullets[j].px)
          { 
            pumpkin_bullet_image.onload = function () {
        	pumpkin_bullet_Ready = true;
            };
            
        	pumpkin_bullet_image.src = "images/pumpkin_bullet.png";
        	bullet_sound.play();
            ctx.drawImage(pumpkin_bullet_image,  pumpkin_bullets[j].px,  pumpkin_bullets[j].py, 25, 25);
          }
      }
     
function drawScore() {
			if(l%100==5)sc.score-=1;
			
			if(sc.score>100) sc.score=100;
			
			if(finalscore.score>prob*300)	//increases speed of the game
			{
				prob++;	
				changebg.xIncr++;
			}
			if(sc.score>0){
				document.getElementById("bar").style.height=(sc.score*5)+"px";
				document.getElementById("bar").style.marginTop=(500-sc.score*5)+"px";
				}
			else{
				document.getElementById("bar").style.height="5px";
				document.getElementById("bar").style.marginTop="495px";
				}
			document.getElementById("bar").style.backgroundColor='#c24100';
			if(sc.score < 10)
				document.getElementById("bar").style.backgroundColor='#ff0000';
		}

function checkstatus(){
		var i=0;
		
		if(sc.score>0)chkstat=0;
		else if(chkstat==0 && sc.score<=0)
			chkstat=l;
		if(l-chkstat>1000 && chkstat!=0 && sc.score<=0)
		{   
			witch_sound.play();
			changebg.xIncr=1;
			finalscore.endtime= ((((new Date()).getTime()-finalscore.startime)-(((new Date()).getTime()-finalscore.startime)%100))/100);
				ctx.fillText("You're out of pumpkins ! ",400,280);
				ctx.fillText("Press C to play again",400,330);
				restart = 1;
		}
		else
			finalscore.score = ((((new Date()).getTime()-finalscore.startime)-(((new Date()).getTime()-finalscore.startime)%100))/100);
			ctx.fillText(finalscore.score,700,480);
	}

function resetTargets()  // make changes   
	{
			// if background scrolled off screen, reset 
			if (changesmallbat1.xBack <= -1 * 1200)
 				{
					changesmallbat1.xBack += 1200;
					y1=0;
					for(var t=0;t<20;t++)
					{
						bat_collide1[t]=0;
						if(i<15)
						bat_collide2[t]=0;
					}
				}
			if (changesmallbat2.xBack <= -1 * 1200)
 				{
					changesmallbat2.xBack += 1200;			
					y2=0;
				}
				
			if(changebat.xBack<-1200)
				{ 
					changebat.xBack += 1200; 		// create a for loop for bats here 
				  	for (var bb = 0 ; bb<5 ; bb++)
				  		{				 
						if(Math.random() < 0.2)
							big_bat[bb].exist = 0;
						 else 
						 big_bat[bb].exist = 1;
				  	     big_bat[bb].ht = Math.random()*250+bb*50;
				  	     big_bat[bb].broomcol = 1;
				  		}	
				}
			
			if (changebg.xBack <= -1 * 1200)
            	{
					changebg.xBack += 1200;
					for (var bb = 0 ; bb<4 ; bb++)
				  	{	
					fruit[bb].target = [1,1];
					fruit[bb].arr=Math.random()*350+50;
					}
					ghostspawn.gy=350;
					ghostspawn.collide=0;
					p=0;
					
					fruit1.arr=Math.random()*300+50;
					fruit2.arr=Math.random()*300+50;
					target1=[1,1,1,1];
					target2=[1,1,1,1];
				}				
			
			if(l%10==3)
			{
				document.getElementById("bat").src=document.getElementById("bat1").src;
				document.getElementById("smallbat1").src=document.getElementById("bat1").src;
				document.getElementById("smallbat2").src=document.getElementById("bat2").src;
				document.getElementById("smallbat3").src=document.getElementById("bat3").src;
			}
			else if(l%10==6)
			{
				document.getElementById("bat").src=document.getElementById("bat2").src;
				document.getElementById("smallbat1").src=document.getElementById("bat2").src;
				document.getElementById("smallbat2").src=document.getElementById("bat3").src;
				document.getElementById("smallbat3").src=document.getElementById("bat1").src;
			}
			else if(l%10==9)
			{
				document.getElementById("bat").src=document.getElementById("bat3").src;
				document.getElementById("smallbat1").src=document.getElementById("bat3").src;
				document.getElementById("smallbat2").src=document.getElementById("bat1").src;
				document.getElementById("smallbat3").src=document.getElementById("bat2").src;
			}
			
			if(l%50==0)
			{
				document.getElementById("smallbat1").src=document.getElementById("bat1").src;
				document.getElementById("smallbat2").src=document.getElementById("bat2").src;
				document.getElementById("smallbat3").src=document.getElementById("bat3").src;
			}
			else if(l%50==24)
			{
				document.getElementById("smallbat1").src=document.getElementById("bat2").src;
				document.getElementById("smallbat2").src=document.getElementById("bat3").src;
				document.getElementById("smallbat3").src=document.getElementById("bat1").src;
			}
			else if(l%15==48)
			{
				document.getElementById("smallbat1").src=document.getElementById("bat3").src;
				document.getElementById("smallbat2").src=document.getElementById("bat1").src;
				document.getElementById("smallbat3").src=document.getElementById("bat2").src;
			}
			
			l++;
			m++;
	}

function colonyofbats(){
			changesmallbat1.xBack-=changebg.xIncr+5;
			changesmallbat2.xBack-=changebg.xIncr+5;
			var r=0;
			if(y1!=0)
			for(var i=0;i<20;i++,r+=25)
    				{
							if(i%3==0)
							ctx.drawImage(smallbat1, changesmallbat1.xBack +750+ r ,n+10*Math.random() ,15 ,15);							
    						if(i%3==1)
							ctx.drawImage(smallbat2, changesmallbat1.xBack +750+ r ,n+10*Math.random() ,15 ,15);
    						if(i%3==2)
							ctx.drawImage(smallbat3, changesmallbat1.xBack +750+ r ,n+10*Math.random() ,15 ,15);	
							if((changesmallbat1.xBack+750+r-broomht.shipX)<50 && (changesmallbat1.xBack+750+r-broomht.shipX)>-20)
    							{
    								if((broomht.shipY-n)<30 && (broomht.shipY-n)>-70 && bat_collide1[i]==0)
											{
												sc.score=sc.score-2;
												bat_collide1[i]=1;
											}
    							}
    				}
			r=Math.random()*50+50;
			if(y2!=0)
			for(var i=0;i<15;i++,r+=25)
    				{
							if(i%3==0)
							ctx.drawImage(smallbat1, changesmallbat2.xBack +750+ r ,n+200+10*Math.random() ,15 ,15);							
    						if(i%3==1)
							ctx.drawImage(smallbat2, changesmallbat2.xBack +750+ r ,n+200+10*Math.random() ,15 ,15);
    						if(i%3==2)
							ctx.drawImage(smallbat3, changesmallbat2.xBack +750+ r ,n+200+10*Math.random() ,15 ,15);							
							
							if((changesmallbat2.xBack+750+r-broomht.shipX)<50 && (changesmallbat2.xBack+750+r-broomht.shipX)>-10)
    							{	
										if((broomht.shipY-n-200)<30 && (broomht.shipY-n-200)>-70 && bat_collide2[i]==0)
											{
												sc.score=sc.score-2;
												bat_collide2[i]=1;
											}
    							}
    				}
		}

function ghosts()
	{
	    	p=1;
			ctx.drawImage(ghostimage, changebg.xBack+ghostspawn.gx, ghostspawn.gy ,50 ,50);
			ghostspawn.gy-=ghostspawn.v;
			
			if((changebg.xBack+ghostspawn.gx-broomht.shipX)<50 && (changebg.xBack+ghostspawn.gx-broomht.shipX)>-10)
    			{	
				if((broomht.shipY-ghostspawn.gy)<40 && (broomht.shipY-ghostspawn.gy)>-70 && ghostspawn.collide==0)
					{
						ghostspawn.collide=1;
						sc.score-=30;
					}
    			}
	}
	
function intro(){
			can = document.getElementById("can");
			ctx = can.getContext("2d");
			ctx.font = "18pt Creepster";
			ctx.fillStyle = '#9f9f9f';
			
			var sentence= new Array();
			sentence[0]="It was halloween night and Luna was trick r treating in her neighbourhood";
			sentence[1]="Little did she know that the mansion she entered belonged to a wicked witch";
			sentence[2]="Luna grabs the broomstick and dashes out of the house to escape the witch";
			var whichimage=0;

			function slideit(){
				ctx.fillStyle = '#9f9f9f';
				if(whichimage==4)
				{
					init();
					introvalue=0;
					}
				ctx.clearRect(0,0,800,500);
				
			function printSentence(sen,j){
						ctx.fillText(sen,20+j*10,470);
					}
				if(whichimage<4)
					ctx.drawImage(slideimages[whichimage],0,0,800,500);
				if(whichimage<3)
				ctx.fillText("Press arrow keys to navigate",500,30);
				if(whichimage==0)
				{
				var j=0;
					var set=setInterval(function(){
					if(whichimage==0)
						printSentence(sentence[0][j],j);
					j++;
					if(whichimage!=0 || j>=sentence[0].length)clearInterval(set);},30);
				}
				if(whichimage==1)
				{
				var j=0;
					var set=setInterval(function(){
					if(whichimage==1)
						printSentence(sentence[1][j],j);
					j++;
					if(whichimage!=1 || j>=sentence[1].length)clearInterval(set);},30);
				}
				if(whichimage==2)
				{
				var j=0;
					var set=setInterval(function(){
					if(whichimage==2)
						printSentence(sentence[2][j],j);
					j++;
					if(whichimage!=2 || j>=sentence[2].length)clearInterval(set);},30);
				}
				if(whichimage==3)
				{
					ctx.fillStyle = '#c24100';
					ctx.fillText("CONTROLS",350,150);
					ctx.fillStyle = '#9f9f9f';
					ctx.fillText("Arrow keys/WASD to fly the broom",230,200);
					ctx.fillText("SPACE  to  shoot",320,250);
					ctx.fillText("ENTER  to  pause",320,300);
					ctx.fillStyle = '#c24100';
					ctx.fillText("PRESS right arrow to start the game",400,450);					
				}
				}
			slideit();

			function checkKey(e) {
				if(introvalue==1){
					if (e.keyCode == 37)
					{	
						if(whichimage>0)
							whichimage-=1;
						slideit();
						}
					else if (e.keyCode == 39)
					{
						ctx.clearRect(0,0,800,500);
						whichimage++;
						slideit();
						}
					}
				}
			document.onkeyup = checkKey;
	}

var slideimages=new Array();	
		slideimages[0] = preload.getResult("image5");
		slideimages[1] = preload.getResult("image6");
		slideimages[2] = preload.getResult("image7");
		slideimages[3] = preload.getResult("image8");
intro();
}
start();