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
  selectFile();
});

// Choose json file
function selectFile()
{
  var stepfile = "./src/js/start.js"; // specify JSON file location here
  var stepfileDeviceRebooting = "./src/js/device-rebooting.js"; // specify JSON file location here
  var stepfile1led = "./src/js/1led.js"; // specify JSON file location here
  var stepfile3led = "./src/js/3led.js"; // specify JSON file location here
  var stepfile4led = "./src/js/4led.js"; // specify JSON file location here
  var stepfilesbg8300 = "./src/js/sbg8300.js"; // specify JSON file location here

 
  var $selectdropdown = $("<div class='selectdropdown' >");
  var $selectFile = $("<select class='form-select m-3' name='selectFile'>"); 


  $selectFile.append("<option disabled selected value> -- Select a file -- </option>");
  $selectFile.append("<option value=" + stepfile + " > Start </option>");
  $selectFile.append("<option value=" + stepfileDeviceRebooting + " > Device Rebooting </option>");
  $selectFile.append("<option value=" + stepfile1led + " > 1 LED </option>");
  $selectFile.append("<option value=" + stepfile3led + " > 3 LED </option>");
  $selectFile.append("<option value=" + stepfile4led + " > 4 LED </option>");
  $selectFile.append("<option value=" + stepfilesbg8300 + " > SBG8300 </option>");
 
  $selectdropdown.append($selectFile);
  $selectdropdown.append("<span>");
  $("#flowchart-area").append($selectdropdown);


  ////console.log($selectFile.val());

  $selectFile.on("change", function(e){
    var stepfile = $selectFile.val();
    ////console.log(stepfile);
    loadfile(stepfile);    
  });
}

// Load step json file
function loadfile(stepfile)
{
  $(".card").remove();
   // Loading
   var $load = $("<h1 />", {text: "Loading..."});
   $load.appendTo($("#flowchart-area"));

  $.getJSON( stepfile, function( data ) { 
    stepdata = data.steps;
   
  }).done(function() {
    ////console.log( "Finished with JSON retrieval." );
  }).fail(function( jget, textstatus, error) {
    ////console.log("JSON fetch failed"); 
    alert("Unable to fetch the following file:\n\t" +
      stepfile + "\n\nPlease report this issue to a supervisor.\n\n" +
      "Status: " + textstatus + "\nError: " + error +
      "\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
      );
  }).always(function() {
    ////console.log( "JSON fetch attempt complete." );
  })
  .complete(function(){
    $load.remove();    
    selectStep(stepdata);
    presentallsteps(stepdata);
    //presentsteps(stepdata);
  });
}


//Dropdown button to select the step
function selectStep(stepdata)
{
  $(".card").remove();
  $("#dropdownMenuButton1").remove();
  $selectdropdown = $('.selectdropdown');
  var $selectstep = $("<select class='form-select m-3 mh' id='dropdownMenuButton1' data-live-serch='true'>");
    
  $selectstep.append("<option disabled selected value> -- Select a procedure -- </option>");
  $.each(stepdata, function(key,value){
    $selectstep.append("<option value ="+key+">" +key+ "</option>");  
  });

  $selectdropdown.append($selectstep);
  $("#flowchart-area").append($selectdropdown);

  $selectdropdown.on("change", function(){
    var selected = $selectstep.val();
    present1step(stepdata[selected],selected);
    ////console.log(stepdata);
    ////console.log(selected);
  });
}


// Present the steps
function present1step(stepdata,selected)
{
  //clean the cards on screen
  $(".card").remove();
  
  var $card = $("<div class='card'  style='margin: 5px; width:850px;'>");
  var $cardHeader = $("<div class='card-header'>"+ "Procedure name: " + selected + "</div> ");
  var $steps = $("<div class='card-body'>")
  var $ul = $("<ul class='list-group list-group-flush'>");  
  

  //loop for each step
  $.each(stepdata, function(key,value){    
    //console.log(key);
    
    switch (key) {
      case 'Text':
        var $il = $("<il class='list-group-item'>");
        $il.append("<p class='text-primary'>"+ key +":</p>");
        value.forEach(element => {
          var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
          $il.append($p);
        });
      break;       
      case 'QuestionsTemplate':
        var $il = $("<il class='list-group-item'>");
        $il.append("<p class='text-primary'>"+ key +":</p>");
        value.forEach(element => {
          var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
          $il.append($p);
        });
      break;
      case 'Buttons':
        var $il = $("<il class='list-group-item'>");
        $il.append("<p class='text-primary'>"+ key +":</p>");
        value.forEach(element => {
          var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
          $il.append($p);
        });
      break;
      case 'Skips':
        var $il = $("<il class='list-group-item'>");
        $il.append("<p class='text-primary'>"+ key +":</p>");
        value.forEach(element => {
          var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
          $il.append($p);
        });
      break;
    
      default:
        var $il = ("<il class='list-group-item'>"+ "<p class='text-primary'>"+ key +":</p>"+ "<p class='text-muted'>"+ value +"</p>" + "</il>");
        break;
    }
    $ul.append($il); 
  });

  $steps.append($ul); 
  $card.append($cardHeader);
  $card.append($steps);    
  $("#flowchart-area").append($card);  
}


function presentallsteps(stepdata)
{
  //console.log(stepdata);

  // Report quantiti of procedures.
  var $steps = $("<div class='card-body'>");
  var $card = $("<div class='card'  style='margin: 5px; width:850px;'>");
  var $cardHeader = $("<div class='card-header'>"+ "Report:</div> ");
  var $ul = $("<ul class='list-group list-group-flush'>");  
  var report = ("<il class='list-group-item'> <p class='text-primary'> Number of Procedures: </p>"+ "<p class='text-muted'>"+ Object.keys(stepdata).length +"</p>" + "</il>");
  $ul.append(report);
  $steps.append($ul); 
  $card.append($cardHeader);
  $card.append($steps);    
  $("#flowchart-area").append($card); 

  $.each(stepdata, function(key,value){  
    
    var $card = $("<div class='card'  style='margin: 5px; width:850px;'>");
    var $cardHeader = $("<div class='card-header'>"+ "Procedure name: " + key + "</div> ");

    var $steps = $("<div class='card-body'>");
    //console.log(key , value); 

    var $ul = $("<ul class='list-group list-group-flush'>");
    $.each(value, function(key,value){  
      switch (key) {
        case 'Text':
          var $il = $("<il class='list-group-item'>");
          $il.append("<p class='text-primary'>"+ key +":</p>");
          value.forEach(element => {
            var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
            $il.append($p);
          });
        break;          
        case 'QuestionsTemplate':
          var $il = $("<il class='list-group-item'>");
          $il.append("<p class='text-primary'>"+ key +":</p>");
          value.forEach(element => {
            var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
            $il.append($p);
          });
        break;
        case 'Buttons':
          var $il = $("<il class='list-group-item'>");
          $il.append("<p class='text-primary'>"+ key +":</p>");
          value.forEach(element => {
            var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
            $il.append($p);
          });
        break;
        case 'Skips':
          var $il = $("<il class='list-group-item'>");
          $il.append("<p class='text-primary'>"+ key +": </p>");
          value.forEach(element => {
            var $p = $("<p class='text-muted m-0'>"+ element +"</p>")
            $il.append($p);
          });
        break;      
        default:
          var $il = ("<il class='list-group-item'>"+ "<p class='text-primary'>"+ key +":</p>"+ "<p class='text-muted m-0'>"+ value +"</p>" + "</il>");
          break;
      }

      //console.log(key , value);
      //var $il = ("<il class='list-group-item'>"+ "<p class='text-primary'>"+ key2 +"</p>"+ "<p class='text-muted'>"+ value2 +"</p>" + "</il>");
      $ul.append($il); 
    });

    $steps.append($ul); 
    $card.append($cardHeader);
    $card.append($steps);    
    $("#flowchart-area").append($card);     
  });  
}
