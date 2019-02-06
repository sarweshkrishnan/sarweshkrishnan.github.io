    var preload;
    $("#loadingOverlay").fadeIn("slow");

    ///////////////  ADD THE IMAGE ASSETS AS OBJECTS AS SHOWN BELOW  /////////////////////    
   	var manifest = [
           {src:"images/backlight.png", id:"image0"},
		   {src:"images/Clouds.png", id:"image2"},
           {src:"images/Clouds2.png", id:"image3"},
		   {src:"images/Clouds3.png", id:"image4"},
           {src:"images/ct1.jpg", id:"image5"},
		   {src:"images/ct2.jpg", id:"image6"},
           {src:"images/ct3.jpg", id:"image7"},
		   {src:"images/ct5.png", id:"image8"},
           {src:"images/ghost.png", id:"image9"},
		   {src:"images/pumpkin_bullet.png", id:"image10"},
		   {src:"images/pumpkin_hit.png", id:"image11"},
		   {src:"images/sp.png", id:"image12"},
		   {id:"back", src:"images/BG4.png"},
		   {id:"clouds", src:"images/Clouds.png"},
		 ];

    function init(){
        //preload = new createjs.LoadQueue(true, "http://festember.com/your/base/path");
        preload = new createjs.LoadQueue(true, "http://localhost/Witchescape/");
        
        preload.addEventListener("progress", preloadHandleProgress);
        preload.addEventListener("complete", preloadHandleComplete);
        preload.setMaxConnections(10);
        preload.loadManifest(manifest);
    }

    function stop() {
        if (preload != null) { preload.close(); }
    }

    function preloadHandleProgress(event) {
        if(event)
            $("#loader").text(Math.round((event.loaded*100.0)).toString()+"%") ;
	}

    function preloadHandleComplete(event) { 
        $("#loader").text("Starting Game...");
		var js  = document.createElement("script");
		js.type = "text/javascript";
		js.src  = "gameScript.js";
		document.body.appendChild(js);
		$("#loadingOverlay").fadeOut("slow");
    }

    init();