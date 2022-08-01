/* Admin version 1
	Written Miguel Alejandro Fernandez Costa Rica Team
	Originally created for ARRIS connectivity tool
*/

//var stepfile = "provision.js"; // specify JSON file location here
var stepfile = "./src/js/start.js"; // specify JSON file location here
var stepfileDeviceRebooting = "./src/js/device-rebooting.js"; // specify JSON file location here
var stepfile1led = "./src/js/1led.js"; // specify JSON file location here
var stepfile3led = "./src/js/3led.js"; // specify JSON file location here
var stepfile4led = "./src/js/4led.js"; // specify JSON file location here
var stepfilesbg8300 = "./src/js/sbg8300.js"; // specify JSON file location here

var stepdata;
var stepdataDeviceRebooting;
var stepdata1led;
var stepdata3led;
var stepdata4led;
var stepdatasbg8300;



$(document).ready(function() {

  function presentsteps(){
    console.log(stepdata);
     

    $.each(stepdata, function(key,value){  
      
      var $card = $("<div class='card'  style='margin: 5px; width:850px;'>");
      var $cardHeader = $("<div class='card-header'>"+ "Procedure name: " + key + "</div> ");

      var $steps = $("<div class='card-body'>")
      console.log(key , value);
      

      var $ul = $("<ul class='list-group list-group-flush'>");

        $.each(value, function(key2,value2){  
          console.log(key , value);
          var $il = ("<il class'list-group-item'>"+ key2 + " : " + value2 + "</il>");
 
          $ul.append($il); 
        });

        $steps.append($ul); 
        $card.append($cardHeader);
        $card.append($steps);    
        $("#flowchart-area").append($card);     
    });
    
  }
  

  // Loading
  var $load = $("<h1 />", {text: "Loading..."});
	$load.appendTo($("#flowchart-area"));



  var jsonget = $.getJSON( stepfile, function( data ) { 
    //console.log( "Successfully retrieved " + stepfile );
    stepdata = data.steps;
    // save the start file on session.
    sessionStorage.setItem('stepdata',JSON.stringify(stepdata));
    //get page title from step data if present
    try { 
      pagetitle = data.title;
      if (pagetitle) $(document).attr("title", pagetitle);
      else $(document).attr("title", "Flowchart");
    } catch (e) {
      //use default title if this results in an exception
      $(document).attr("title", "Flowchart");
    }
  }).done(function() {
    //console.log( "Finished with JSON retrieval." );
  }).fail(function( jget, textstatus, error) {
    //console.log("JSON fetch failed"); 
    alert("Unable to fetch the following file:\n\t" +
      stepfile + "\n\nPlease report this issue to a supervisor.\n\n" +
      "Status: " + textstatus + "\nError: " + error +
      "\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
      );
  
    //if (enable_fallback) fallback();
  }).always(function() {
    //console.log( "JSON fetch attempt complete." );
  });


 

  jsonget.complete(function(){
    $load.remove();
    presentsteps();
  });

});

