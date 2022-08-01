/* Flowchart version 6
	Written by Matthew Carpenter
	Edited by Gregory Woods
	Modify by Miguel Alejandro Fernandez Costa Rica Team
	Originally created for ARRIS connectivity tool
*/

// Interactive flowchart in HTML/Javascript by Matthew Carpenter
// Uses JQuery, see comment of jQuery file included for details.
// Modify UI by Miguel Fernandez



//var stepfile = "provision.js"; // specify JSON file location here
var stepfile = "./src/js/start.js"; // specify JSON file location here
var stepfileDeviceRebooting = "./src/js/device-rebooting.js"; // specify JSON file location here
var stepfile1led = "./src/js/1led.js"; // specify JSON file location here
var stepfile3led = "./src/js/3led.js"; // specify JSON file location here
var stepfile4led = "./src/js/4led.js"; // specify JSON file location here
var stepfilesbg8300 = "./src/js/sbg8300.js"; // specify JSON file location here



var debug = true; //Enables showing STEPNAME when holding mouse pointer over a step

// Do not modify anything below this line //
//var enable_fallback = false;

var $back;

var stepdata;
var stepdataDeviceRebooting;
var stepdata1led;
var stepdata3led;
var stepdata4led;
var stepdatasbg8300;
var stepnum = 0;

var pagetitle;
//var resetDone = -1; // this will be set to the step where a reset was done.

//replaces resetDone
var skips = {};


//catch missing jQuery
if (typeof jQuery === 'undefined') {

	error = "No jQuery library found in page! " + "<br>"
	+" Please report this issue to a supervisor" + "<br>"
	+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
	+" then paste it in an email to Tier 2."
	showerror(error,"error");	
	/*
	alert("No jQuery library found in page!\nReport this error to a supervisor."+
	"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
	);
	*/
}


/*because IE8 and earlier don't actually have a string trim function...
	may affect some other old browsers as well. Checks to see if the String object has the trim function and adds its own if there is no trim function
	** thanks to http://stackoverflow.com/questions/2308134/trim-in-javascript-not-working-in-ie
*/
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}


//template step for error catching. This will appear if a step referenced by a button does not exist.
var errorstep = function (stepname) {
	var step = {};
	step.Question = "Error, step \"" + stepname + "\" does not exist.";
	step.Text = [	"***Click BACK or START OVER.",
			"***Please report this error to a supervisor!"];

	return step;
};



var $ledtemplate = $('\
<div class="ledin">\
	<div class="note"></div>\
	<form class="ledform">\
		<table class="ledtable">\
			<tr>\
				<th class="ledspacer">&nbsp;</th>\
				<th class="ledon">Solid</th>\
				<th class="ledflash">Flashing</th>\
				<th class="ledoff">Off</th>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_0">Power</th>\
				<td class="ledon">\
					<input type="radio" name="Power" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Power" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Power" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_1">Receive</th>\
				<td class="ledon">\
					<input type="radio" name="Receive" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Receive" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Receive" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_2">Send</th>\
				<td class="ledon">\
					<input type="radio" name="Send" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Send" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Send" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_3">Online</th>\
				<td class="ledon">\
					<input type="radio" name="Online" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Online" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Online" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th colspan="2" class="ledhead2" id="lh_4">ALL SOLID</th>\
				<th colspan="2" class="ledhead2" id="lh_-1">ALL OFF</th>\
			</tr>\
		</table>\
		<div class="ledtable ledsubm">\
			<div>\
				<input class="ledreset" type="reset" value="Reset LEDs"/>\
				<input class="leddone" type="submit" value="Next" />\
			</div>\
		</table>\
	</form>\
</div>');
//template for led table-3led
var $ledtemplate3led = $('\
<div class="ledin">\
	<div class="note"></div>\
	<form class="ledform">\
		<table class="ledtable">\
			<tr>\
				<th class="ledspacer">&nbsp;</th>\
				<th class="ledon">Solid</th>\
				<th class="ledflash">Flashing</th>\
				<th class="ledoff">Off</th>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_0">Power</th>\
				<td class="ledon">\
					<input type="radio" name="Power" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Power" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Power" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_2">US/DS</th>\
				<td class="ledon">\
					<input type="radio" name="Send" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Send" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Send" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th class="ledhead" id="lh_3">Online</th>\
				<td class="ledon">\
					<input type="radio" name="Online" value="solid" />\
				</td>\
				<td class="ledflash">\
					<input type="radio" name="Online" value="flashing" />\
				</td>\
				<td class="ledoff">\
					<input type="radio" name="Online" value="off" />\
				</td>\
			</tr>\
			<tr>\
				<th colspan="2" class="ledhead2" id="lh_4">ALL SOLID</th>\
				<th colspan="2" class="ledhead2" id="lh_-1">ALL OFF</th>\
			</tr>\
		</table>\
		<div class="ledtable ledsubm">\
			<div>\
				<input class="ledreset" type="reset" value="Reset LEDs"/>\
				<input class="leddone" type="submit" value="Next" />\
			</div>\
		</table>\
	</form>\
</div>');




//runs to show a new step
var showStep = function (stepname) {

	var step, z,
		$new = $("<div />", {id: stepnum}),
		$name = $("<span />", {display: "hidden", id: stepnum + "_i"});

	//grab the step data and test its validity
	try {
		step = stepdata[stepname];
		if (typeof step.Question === 'undefined') {
			//console.log("No Question text in step " + stepname + ".");
		}
	} catch (e) {		
		//step does not exist or is malformed, grab the error template
		step = errorstep(stepname);
	}

// Clean the stepdata, delete all TR for others files, used mostly when click back to start again TR.
	if (stepname === "device__rebooting"){
		stepdata = JSON.parse(sessionStorage.stepdata);
		//console.log(stepdata);
	}

	// Grab the troubleshooting for devices that are rebooting itself
	if (stepname === "device_rebooting__device"){
		//console.log(stepname)
		stepdata = Object.assign(stepdataDeviceRebooting,stepdata);		
		//console.log(stepdata)
		
		try {
			step = stepdata[stepname];
			if (typeof step.Question === 'undefined') {
				//console.log("No Question text in step " + stepname + ".");
			}
		} catch (e) {
			//step does not exist or is malformed, grab the error template
			step = errorstep(stepname);
		}		
	}
	

	// Grab the troubleshooting for surfboard SBG8300 device
	if (stepname === "sbg8300__checkled"){
	//console.log(stepname)
	stepdata = Object.assign(stepdatasbg8300,stepdata);		
	//console.log(stepdata)	
	try {
		step = stepdata[stepname];
		if (typeof step.Question === 'undefined') {
			//console.log("No Question text in step " + stepname + ".");
		}
	} catch (e) {
		//step does not exist or is malformed, grab the error template
		step = errorstep(stepname);
	}		
	}
	// Grab the troubleshooting for 1 LED surfboard devices 
	if (stepname === "1led__checkled"){
	//console.log(stepname)
	stepdata = Object.assign(stepdata1led,stepdata);		
	//console.log(stepdata)
	
	try {
		step = stepdata[stepname];
		if (typeof step.Question === 'undefined') {
			//console.log("No Question text in step " + stepname + ".");
		}
	} catch (e) {
		//step does not exist or is malformed, grab the error template
		step = errorstep(stepname);
	}		
	}

  // Grab the TR for differents surfboard devices. deppends of LED 
	if (stepname === "3led__checkled"){
		//console.log(stepname)
		stepdata = Object.assign(stepdata3led,stepdata);		
		//console.log(stepdata)
		
		try {
			step = stepdata[stepname];
			if (typeof step.Question === 'undefined') {
				//console.log("No Question text in step " + stepname + ".");
			}
		} catch (e) {
			//step does not exist or is malformed, grab the error template
			step = errorstep(stepname);
		}		
	}


	// Grab the TR for differents surfboard devices. deppends of LED 
	if (stepname === "4led__checkled"){
		//console.log(stepname)
		stepdata = Object.assign(stepdata4led,stepdata);		
		//console.log(stepdata)
		
		try {
			step = stepdata[stepname];
			if (typeof step.Question === 'undefined') {
				//console.log("No Question text in step " + stepname + ".");
			}
		} catch (e) {
			//step does not exist or is malformed, grab the error template
			step = errorstep(stepname);
		}		
	}


	/*if (step.Resetdone && resetDone > -1) //if this is a reset step and a reset has been performed
	{
		showStep(step.Resetdone); // show the step the step says to skip to if reset done
		return; // stop trying to show this step
	}*/

	if (step.Skips) {	//if this step is skippable
		for (z = 0; z < step.Skips.length; z++) {
			if (skips[step.Skips[z][0]]) {
				showStep(step.Skips[z][1]);
				return;
			}

		}
	}

	if (step.Ifbefore) {// skip if step says not to show if too early
		if (stepnum < step.Ifbefore[0]) {
			showStep(step.Ifbefore[1]);
			return;
		}
	}

	$name.addClass(stepname);
	$name.appendTo($new);

	//format the step as both a flow step and the active step
	$new.addClass("activeq");
	$new.addClass("step");

	//adds mouseover showing step name if `debug` is set to true at top of file
	if (debug) { $new.attr("title", stepname); }

	//if the step has question text, display it in a new <span> and format it appropriately
	if (step.Question) {
		var $qd = $("<span />", {text: step.Question});

		//create new page element "info" button if either Popmsg or Poplink is defined
		if ((step.Popmsg) || (step.Poplink)) {
			var $pop = $("<div />", {
				id: stepnum + "_pop",	//assign this step number so this can be removed
				text: step.Popmsglabel ? step.Popmsglabel : "info",	//if Popmsglabel defined, use that, otherwise label "info"
				click: function () {
					if ((step.Popmsg) && (step.Poplink)) {	//if both Popmsg and Poplink defined
						if (confirm(step.Popmsg)) {		//use Popmsg text as confirmation before
							window.open(step.Poplink);		//opening link in new tab/window
						}
					} else {
						if (step.Popmsg) { showerror(step.Popmsg,"info"); }			//open popup message
						//if (step.Popmsg) { alert(step.Popmsg); }			//open popup message
						if (step.Poplink) { window.open(step.Poplink); }	//open popup link
					}
				}
			});
			$pop.addClass("tip");	//apply formatting to info button
			$pop.appendTo($new);	//add to the step.
		}
	
		$qd.addClass("question"); // because IE8 is picky about the class being added in previous line
	
		$qd.appendTo($new);
	}

	if (step.Text) {
		var $nd = $("<span />", {id: stepnum + "_t"});
		$nd.addClass("text");
		for (var i = 0; i < step.Text.length; i++) {
			//if a line of text starts with "***", format it differently for emphasis
			if ((step.Text[i].length > 3) && (step.Text[i].substring(0,3) === "***")){
				$emphasis = $("<span></span>", {
					"class": "emphasis"
				});
			
				$emphasis.append(" - " + step.Text[i].replace("***", "") + " - ");
				$emphasis.appendTo($nd);
			} else {
				$nd.append(" - " + step.Text[i] + " -");
			}
			
			//append a newline if there is more text to display.
			if ( (i + 1) < step.Text.length)
				$nd.append($("<br />"));
		}
		$nd.appendTo($new);
	}

		//if the step has a checkbox to display, add it as a div and format it appropriately. Sets an ID as well so it can be removed when moving on to next step.
	if (step.TextCheckbox) {
		var $checkText = $("<div />", {id: stepnum + "_tcheckbox"});
		$checkText.addClass("checkcontainer");	
			
	
		for (var i = 0; i < step.TextCheckbox.length; i++) {
			//if a line of text starts with "***", format it differently for emphasis
			if ((step.TextCheckbox[i].length > 3) && (step.TextCheckbox[i].substring(0,3) === "***")){
				$emphasis = $("<span></span>", {
					"class": "emphasis"
				});
				
				$emphasis.append(" - " + step.TextCheckbox[i].replace("***", "") + " - ");
				$emphasis.appendTo($checkText);
			} else {				
			var $checkbox = $(`<input type="checkbox" id="${ stepnum + "_ck" + [i]}" 
					name="${ stepnum + "_ck" +  [i]}" value ="${step.TextCheckbox[i]}">
					<label for:${ stepnum + "_ck" +  [i]}>${step.TextCheckbox[i]}</label></input>`);
				
			$checkbox.click( (event) => {
			var allVals = [];			
			
			$('.checkcontainer :checked').each(function(i) {
						allVals.push((i!=0?"\r\n":"")+ $(this).val());
					});

					$ti.val(allVals);
					//console.log(event.target);					
					event.target.disabled=true;
		 	});
	
			$checkText.append($checkbox);
			//append a newline if there is more text to display.
			if ( (i + 1) < step.TextCheckbox.length)
					$checkText.append($("<br />"));
			}				
			
			}
			$checkText.appendTo($new);
		}


	//if the step has a table to display, add it and format it appropriately
	if (step.Table) {
		var $ntb = $("<table />", {id: stepnum + "_tb"});
		$ntb.addClass("text");
		for (var i = 0; i < step.Table.length; i++) {
			var $row = $("<tr />");
			
			for (var z = 0; z < step.Table[i].length; z++) {
				var $d;
				
				if((step.Table[i][z].length > 3) && (step.Table[i][z].substring(0,3) === "***")) //table header
					$d = $("<th />");
				else
					$d = $("<td />");
				
				$d.append(step.Table[i][z].replace("***", ""));
				/*if (i == 0) $d = $("<th />", {text: step.Table[i][z]}); //first line is Table Header
				else $d = $("<td />", {text: step.Table[i][z]});*/
				
				$d.appendTo($row);
			}
			$row.appendTo($ntb);
		}
		$ntb.appendTo($new);
	}
	
	//check if the step has buttons. All non-end steps should have buttons. If buttons are present, add them to a form.
	if (step.Buttons) {
		$nf = $("<form />", {
			id: stepnum + "_f"
		});
		$nf.addClass("response");

		

		//if NoNotes is not specified on the step, add a note field for user input.
		if(!step.NoNotes){
			//create a textarea with a unique ID that can be referenced later
			
			//add caption to notes field so users do not interpret it as mandatory
			var $tcap = $("<div />", {
				id: stepnum + "_ncap",
				text: "Notes:"
			});
			$tcap.addClass("notecap");
			$tcap.appendTo($nf);
			
			$ti = $("<textarea />", {
				id: stepnum+ "_nf",
				keydown: function(e) { //thanks to http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
					var keyCode = e.keyCode || e.which;

					if (keyCode == 9) {
						e.preventDefault();
						var start = $(this)[0].selectionStart;
						var end = $(this)[0].selectionEnd;
						$(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));
						$(this)[0].selectionStart = $(this)[0].selectionEnd = start + 1;
					}
				}
			});
			$ti.addClass("notefield");

			
			// read and insert the template for probbing questions
			if (step.QuestionsTemplate) {				
				var allVals = [];				
				for(var i = 0; i < step.QuestionsTemplate.length; i++ ){					
					allVals.push(step.QuestionsTemplate[i] + '\n');
				}				
				$ti.val(allVals);
			}


			
			//if Noteheight is specified for this step, use that CSS style instead of the default one defined by CSS class
			if(step.Noteheight) {
				$ti.css("height", step.Noteheight);
			}
			
			$ti.appendTo($nf);

			//add a reset button to clear the textarea for convenience
			$tcb = $("<input />", {
				type: "reset",
				value: "Reset comment"
			});
			$tcb.appendTo($nf);

			$("<br />").appendTo($nf);
		}

		//add buttons to page from step. The name references the step the load.
		try {
			$.each(step.Buttons, function(key, val) {				
				$b = $("<input />", {
					type: "button",
					name: val[0],
					value: val[1]
				});
				//console.log(step.Buttons[0])
				

				//when clicking this button, it will check load the notes if present, append them as text along with the button text, and load the next step
				$b.click(function () {

					/*if (val[2] === "reset"){
						resetDone = stepnum;
					}*/
					
					// if something the tool needs to remember was done, add it to the list of skips
					// new method, handles multiple skips per button
					for (var s = 2; s < val.length; s++) {
						// Only remember the step number if the skip was not already added
						// on a previous step. This way, a backtracked action does not undo 
						// another step's skip
						if (typeof skips[val[s]] === 'undefined')
							skips[val[s]] = stepnum;
					}
					/*if (val[2]){
						skips[val[2]] = stepnum;
					}*/
					
					var notes = [""];

					//read notes and trim surrounding whitespace. If notes section does not exist for this step, an exception is caught and nothing is done.
					try {
						notes = $("#" + stepnum + "_nf")[0].value.trim().split("\n");
					} catch (e) {}

					//get the form for the button and notes
					$old = $("#" + stepnum + "_f");

					//if step comment text exists, remove it
					try {
						$("#" + stepnum + "_t").remove();
					} catch (e) {}

					try {
						$("#" + stepnum + "_tcheckbox").remove();
					} catch (e) {}
					
					//if step table exists, remove it
					try {
						$("#" + stepnum + "_tb").remove();
					} catch (e) {}
					
					//if step Popmsg exists, remove it
					try{
						$("#" + stepnum + "_pop").remove();
					} catch (e) {}
					
					//move on to next step
					stepnum++;

					//if user notes are present, add each one as a new <span> within a <div> ID'ed for later access.
					if (!(notes.length <=1 && notes[0] === "")) {
						$dn = $("<div />", {
							id: stepnum + "_an"
						});
						$.each(notes, function(key, val) {
							//append a newline before second line onward
							if (key > 0)
								$("<br />").appendTo($dn);
							//format line with ** at beginning to differentiate it from other output, and put it in a <span>
							var line = $("<span />", {
								text: val
							});
							line.appendTo($dn);
						});

						//apply CSS formatting to the notes and add them to the page
						$dn.addClass("answertext");
						$dn.appendTo($(this).parent().parent());
					}
					
					//have the button check it's name. This will find the next step
					var name = $(this)[0].name;
					
					//add the button text to the page as a response
					$da = $("<div />", {
						id: stepnum + "_a",
						text: " ► " + $(this)[0].value
					});
					$da.addClass("answer");
					$da.appendTo($(this).parent().parent());

					//remove active step formatting from old step
					$(this).parent().parent().removeClass("activeq");
					
					//remove contents of the form this button was from, and the form itself
					$old.empty();
					$old.remove();

					//add the next step to the page
					showStep(name);				
				});

				//add the button to the form
				$b.appendTo($nf);
			});
		} catch (e) {}
	
	
	}else if (step.LEDchart) {
		//new section for LED chart handling
		$nf = $ledtemplate.clone(); // create copy of chart template for this step
		 // create copy of chart template for this step
		$nf.attr("id", stepnum +"_f");

		//make clicks on the box click the radio button for faster clickability!
		$nf.find("td.ledon, td.ledflash, td.ledoff").click(function() {
			$(this).children("input:radio").prop("checked", true);
			$(this).siblings().removeClass("sel");
			$(this).addClass("sel");
			$(this).siblings(".ledhead").addClass("sel");
		});

		$nf.find("input:radio").change(function() {
			//console.log($(this).parent() + " radio changed");
			$(this).parent().siblings().removeClass("sel");
			$(this).parent().addClass("sel");
			$(this).parent().siblings(".ledhead").addClass("sel");
		});	
		
		$nf.find("input:reset").click(function() {
			$(this).parents().eq(4).find("th, td").removeClass("sel");
		});
		
		$nf.find(".ledhead, .ledhead2").click(function() {
			//add solid to this one and all above
			//id="lh_0"
			
			var lednum = parseInt($(this).attr("id").substring(3,$(this).attr("id").length), 10);

			//$(this).parents("form").reset();
			
			for (var i = 3; i > lednum; i--){
				$("#lh_" + i).siblings().children("[value=off]").prop("checked", true);
				$("#lh_" + i).siblings().removeClass("sel");
				$("#lh_" + i).siblings().children("[value=off]").parent().addClass("sel");
				$("#lh_" + i).addClass("sel");
			}
			
			if (lednum < 4) {
				$("#lh_" + lednum).siblings().children("[value=flashing]").prop("checked", true);
				$("#lh_" + lednum).siblings().removeClass("sel");
				$("#lh_" + lednum).siblings().children("[value=flashing]").parent().addClass("sel");
				if (lednum >= 0) $("#lh_" + lednum).addClass("sel"); //handle the "ALL OFF button"
			}

			for (var i = lednum - 1; i >= 0; i--){
				$("#lh_" + i).siblings().children("[value=solid]").prop("checked", true);
				$("#lh_" + i).siblings().removeClass("sel");
				$("#lh_" + i).siblings().children("[value=solid]").parent().addClass("sel");
				$("#lh_" + i).addClass("sel");
			}
		});
		
		$nf.submit(function(event) {
			//used to handle differences in cleanup behavior between normal buttons and led status selector
			// "ob" is the submit button that was pressed
			var ledshowstep = function (ob, ls) {
				var notes = [""];

				//read notes and trim surrounding whitespace. If notes section does not exist for this step, an exception is caught and nothing is done.
				try {
					notes = $("#" + stepnum + "_nf")[0].value.trim().split("\n");
				} catch (e) {}

				//get the form for the button and notes
				$old = $("#" + stepnum + "_f");

				//if step comment text exists, remove it
				try {
					$("#" + stepnum + "_t").remove();
				} catch (e) {}

				//if step table exists, remove it
				try {
					$("#" + stepnum + "_tb").remove();
				} catch (e) {}
				
				//if step Popmsg exists, remove it
					try{
						$("#" + stepnum + "_pop").remove();
					} catch (e) {}
								
				//move on to next step
				stepnum++;
	
				//if user notes are present, add each one as a new <span> within a <div> ID'ed for later access.
				if (!(notes.length <=1 && notes[0] === "")) {
					$dn = $("<div />", {
						id: stepnum + "_an"
					});
					$.each(notes, function(key, val) {
						//append a newline before second line onward
						if (key > 0)
							$("<br />").appendTo($dn);
						//format line with ** at beginning to differentiate it from other output, and put it in a <span>
						var line = $("<span />", {
							text:  val
						});
						line.appendTo($dn);
					});
					//apply CSS formatting to the notes and add them to the page
					$dn.addClass("answertext");
					$dn.appendTo(ob.parent());
				}
			
				// add the status info as text
				var outtext = " ► Power: " + selo.Power + 
					" | Receive: " + selo.Receive + 
					" | Send: " + selo.Send	+ 
					" | Online: " + selo.Online;

				var $da = $("<div />", {
					id: stepnum + "_a",
					text: outtext
				});
				$da.addClass("answer");

				$da.appendTo(ob.parent());

				//remove active step formatting from old step
				ob.parent().removeClass("activeq");
						

				//remove contents of the form this button was from, and the form itself
				$old.empty();
				$old.remove();


				showStep(ls);
			};

			//get the selected led status
			var sel = $("input").serializeArray();
			//console.log(sel);
			var selo = {}; //make the led status easier to manipulate
			for (var i = 0; i < sel.length; i++) {
				selo[sel[i].name] = sel[i].value;
			}
						
			//catch incomplete form and show notification
			if (sel.length < 4) {
				var missing = "";
				if (!selo.Power)
					missing += "\tPower\n";
				if (!selo.Receive)
					missing += "\tReceive\n";
				if (!selo.Send)
					missing += "\tSend\n";
				if (!selo.Online)
					missing += "\tOnline\n";
				
				error = ("Incomplete LED status. "+"<br>" +"Please check status of following light(s):" + missing);
				showerror(error,"warning")
				//alert("Incomplete LED status.\nPlease check status of following light(s):\n\n" + missing);
				event.preventDefault();
				return false;
			}
			
			try {	//compare the led status to each possible LED status in the step
				for (var i = 0; i < step.LEDchart.length; i++){
					var comp = step.LEDchart[i];
					var nextstep = comp[0];
					var powermatch = (selo.Power === comp[1]) || (comp[1] === "*");	// "*" is treated as a wildcard led status
					var recmatch = (selo.Receive === comp[2]) || (comp[2] === "*");
					var sendmatch = (selo.Send === comp[3]) || (comp[3] === "*");
					var onmatch = (selo.Online === comp[4]) || (comp[4] === "*");
					
					if (powermatch && recmatch && sendmatch && onmatch) {
						ledshowstep($(this), nextstep);
						event.preventDefault();	//keep the submit button from refreshing the page.
						return true;
					}
				}
				//doesn't fit a defined status

				var confstr = "This is not an expected LED status:\n" +
					"\n\tPower:\t" + selo.Power +
					"\n\tReceive:\t" + selo.Receive +
					"\n\tSend:\t" + selo.Send +
					"\n\tOnline:\t" + selo.Online +
					"\n\nPlease confirm the LED status." +
					"\nIf the status is correct, click OK. Click Cancel to make changes.";

				if (confirm(confstr)) {
					ledshowstep($(this), step.LEDfail); //show the defined fallback step if the user confirms the LED status is correct
					event.preventDefault();
					return true;
				}
			} catch (e) { //just in case
				var error = "An error occured. Contact Tier 2 to report this error."+"<br>"
						+e.message;
				showerror(error,"warning");
				//alert ("An error occured. Contact Tier 2 to report this error.\n"+e.message);
			}
			
			event.preventDefault();
		});
		
		//add note field
		if(!step.NoNotes){
			$("<br />").appendTo($nf.children(".note")[0]);
			$tfo = $("<form />");
						
			var $tcap = $("<div />", {
				id: stepnum + "_ncap",
				text: "Notes:"
			});
			$tcap.addClass("notecap");
			$tcap.appendTo($tfo);
			
			//create a textarea with a unique ID that can be referenced later
			$ti = $("<textarea />", {
				id: stepnum+ "_nf",
				keydown: function(e) { //thanks to http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
					var keyCode = e.keyCode || e.which;

					if (keyCode == 9) {
						e.preventDefault();
						var start = $(this)[0].selectionStart;
						var end = $(this)[0].selectionEnd;
						$(this).val($(this).val().substring(0, start) +
							"\t" +
							$(this).val().substring(end));
						$(this)[0].selectionStart = $(this)[0].selectionEnd = start + 1;
					}
				}
			});
			$ti.addClass("notefield");
			$ti.appendTo($tfo);			
			
			//add a reset button to clear the textarea for convenience
			$tcb = $("<input />", {
				type: "reset",
				value: "Reset comment"
			});
			$tcb.appendTo($tfo);

			$tfo.appendTo($nf.children(".note")[0]);
		}
		
	}else if (step.LEDchart3led) {
		//new section for LED chart handling
		$nf = $ledtemplate3led.clone(); // create copy of chart template for this step
		$nf.attr("id", stepnum +"_f");

		//make clicks on the box click the radio button for faster clickability!
		$nf.find("td.ledon, td.ledflash, td.ledoff").click(function() {
			$(this).children("input:radio").prop("checked", true);
			$(this).siblings().removeClass("sel");
			$(this).addClass("sel");
			$(this).siblings(".ledhead").addClass("sel");
		});

		$nf.find("input:radio").change(function() {
			//console.log($(this).parent() + " radio changed");
			$(this).parent().siblings().removeClass("sel");
			$(this).parent().addClass("sel");
			$(this).parent().siblings(".ledhead").addClass("sel");
		});	
		
		$nf.find("input:reset").click(function() {
			$(this).parents().eq(4).find("th, td").removeClass("sel");
		});
		
		$nf.find(".ledhead, .ledhead2").click(function() {
			//add solid to this one and all above
			//id="lh_0"
			
			var lednum = parseInt($(this).attr("id").substring(3,$(this).attr("id").length), 10);

			//$(this).parents("form").reset();
			
			for (var i = 3; i > lednum; i--){
				$("#lh_" + i).siblings().children("[value=off]").prop("checked", true);
				$("#lh_" + i).siblings().removeClass("sel");
				$("#lh_" + i).siblings().children("[value=off]").parent().addClass("sel");
				$("#lh_" + i).addClass("sel");
			}
			
			if (lednum < 4) {
				$("#lh_" + lednum).siblings().children("[value=flashing]").prop("checked", true);
				$("#lh_" + lednum).siblings().removeClass("sel");
				$("#lh_" + lednum).siblings().children("[value=flashing]").parent().addClass("sel");
				if (lednum >= 0) $("#lh_" + lednum).addClass("sel"); //handle the "ALL OFF button"
			}

			for (var i = lednum - 1; i >= 0; i--){
				$("#lh_" + i).siblings().children("[value=solid]").prop("checked", true);
				$("#lh_" + i).siblings().removeClass("sel");
				$("#lh_" + i).siblings().children("[value=solid]").parent().addClass("sel");
				$("#lh_" + i).addClass("sel");
			}
		});
		
		$nf.submit(function(event) {
			//used to handle differences in cleanup behavior between normal buttons and led status selector
			// "ob" is the submit button that was pressed
			var ledshowstep = function (ob, ls) {
				var notes = [""];

				//read notes and trim surrounding whitespace. If notes section does not exist for this step, an exception is caught and nothing is done.
				try {
					notes = $("#" + stepnum + "_nf")[0].value.trim().split("\n");
				} catch (e) {}

				//get the form for the button and notes
				$old = $("#" + stepnum + "_f");

				//if step comment text exists, remove it
				try {
					$("#" + stepnum + "_t").remove();
				} catch (e) {}

				//if step table exists, remove it
				try {
					$("#" + stepnum + "_tb").remove();
				} catch (e) {}
				
				//if step Popmsg exists, remove it
					try{
						$("#" + stepnum + "_pop").remove();
					} catch (e) {}
								
				//move on to next step
				stepnum++;
	
				//if user notes are present, add each one as a new <span> within a <div> ID'ed for later access.
				if (!(notes.length <=1 && notes[0] === "")) {
					$dn = $("<div />", {
						id: stepnum + "_an"
					});
					$.each(notes, function(key, val) {
						//append a newline before second line onward
						if (key > 0)
							$("<br />").appendTo($dn);
						//format line with ** at beginning to differentiate it from other output, and put it in a <span>
						var line = $("<span />", {
							text: val
						});
						line.appendTo($dn);
					});
					//apply CSS formatting to the notes and add them to the page
					$dn.addClass("answertext");
					$dn.appendTo(ob.parent());
				}
			
				// add the status info as text
				var outtext = " --> Power: " + selo.Power +  
					" | Send: " + selo.Send	+ 
					" | Online: " + selo.Online;

				var $da = $("<div />", {
					id: stepnum + "_a",
					text: outtext
				});
				$da.addClass("answer");

				$da.appendTo(ob.parent());

				//remove active step formatting from old step
				ob.parent().removeClass("activeq");
						

				//remove contents of the form this button was from, and the form itself
				$old.empty();
				$old.remove();


				showStep(ls);
			};

			//get the selected led status
			var sel = $("input").serializeArray();
			//console.log(sel);
			var selo = {}; //make the led status easier to manipulate
			for (var i = 0; i < sel.length; i++) {
				selo[sel[i].name] = sel[i].value;
			}
						
			//catch incomplete form and show notification
			if (sel.length < 3) {

				var missing = "";
				if (!selo.Power)
					missing += "\tPower\n";
				if (!selo.Send)
					missing += "\tUS/DS\n";
				if (!selo.Online)
					missing += "\tOnline\n";
				
				var error = "Incomplete LED status. "+"<br>" +"Please check status of following light(s):"  + missing;
				showerror(error,"warning");
				//alert("Incomplete LED status.\nPlease check status of following light(s):\n\n" + missing);
				event.preventDefault();
				return false;
			}
			
			try {	//compare the led status to each possible LED status in the step
				for (var i = 0; i < step.LEDchart3led.length; i++){
					var comp = step.LEDchart3led[i];
					var nextstep = comp[0];
					var powermatch = (selo.Power === comp[1]) || (comp[1] === "*");	// "*" is treated as a wildcard led status
					var sendmatch = (selo.Send === comp[2]) || (comp[2] === "*");
					var onmatch = (selo.Online === comp[3]) || (comp[3] === "*");
					
					if (powermatch && sendmatch && onmatch) {
						ledshowstep($(this), nextstep);
						event.preventDefault();	//keep the submit button from refreshing the page.
						return true;
					}
				}
				//doesn't fit a defined status

				var confstr = "This is not an expected LED status:\n" +
					"\n\tPower:\t" + selo.Power +
					"\n\tSend:\t" + selo.Send +
					"\n\tOnline:\t" + selo.Online +
					"\n\nPlease confirm the LED status." +
					"\nIf the status is correct, click OK. Click Cancel to make changes.";

				if (confirm(confstr)) {
					ledshowstep($(this), step.LEDfail); //show the defined fallback step if the user confirms the LED status is correct
					event.preventDefault();
					return true;
				}
			} catch (e) { //just in case
				var error = "An error occured. Contact Tier 2 to report this error."+e.message;
				showerror(error,"error");
				//alert ("An error occured. Contact Tier 2 to report this error.\n"+e.message);
			}
			
			event.preventDefault();
		});
		
		//add note field
		if(!step.NoNotes){
			$("<br />").appendTo($nf.children(".note")[0]);
			$tfo = $("<form />");
						
			var $tcap = $("<div />", {
				id: stepnum + "_ncap",
				text: "Notes:"
			});
			$tcap.addClass("notecap");
			$tcap.appendTo($tfo);
			
			//create a textarea with a unique ID that can be referenced later
			$ti = $("<textarea />", {
				id: stepnum+ "_nf",
				keydown: function(e) { //thanks to http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
					var keyCode = e.keyCode || e.which;

					if (keyCode == 9) {
						e.preventDefault();
						var start = $(this)[0].selectionStart;
						var end = $(this)[0].selectionEnd;
						$(this).val($(this).val().substring(0, start) +
							"\t" +
							$(this).val().substring(end));
						$(this)[0].selectionStart = $(this)[0].selectionEnd = start + 1;
					}
				}
			});
			$ti.addClass("notefield");
			$ti.appendTo($tfo);			
			
			//add a reset button to clear the textarea for convenience
			$tcb = $("<input />", {
				type: "reset",
				value: "Reset comment"
			});
			$tcb.appendTo($tfo);

			$tfo.appendTo($nf.children(".note")[0]);
		}
		
	} else { // no buttons or led chart
		//format the step as an end step. No active step formatting and add "R:" to beginning.
		$new.removeClass("activeq");
		$new.prepend("<br /><span class=\"question\">R:</span><br />");
	}
	//add form containing buttons to the step.
	$nf.appendTo($new);

	//if this is not the first step, show the Back and Start Over buttons. Otherwise, hide them.
	if (stepnum > 0) {	
		$back.show();
		$startover.show();
	} else {
		$back.hide();
		$startover.hide();
	}



	//add everything we generated to the page
	$("#flowchart-area").append($new);
	//if the step has a notes section, focus it for easy typing
	if (!step.NoNotes) $("#" + stepnum + "_nf").focus();

	//scroll down to bottom
	$('html, body').animate({scrollTop: $(document).height()}, 'slow');	
	
};

//starts the flowchart when pageload is successful
var startsteps = function () {
	// if the page title was specified by the step file, add it to the top of the flowchart area
	if (pagetitle)
	$("#flowchart-area").append( "<h3> " +  "<i class='fa fa-globe' aria-hidden='true'> </i>" + "&nbsp" + pagetitle + "&nbsp"+  "<i class='fa fa-wifi' aria-hidden='true'> </i>" + "</h3>");
	
	//initial text and formatting before steps are displayed	
	$("#flowchart-area").append("<span class=\"question\">A:</span>");
		
	try {
		//if START step exists, show it. Otherwise, error out.
		if (stepdata.START) { 
			//console.log("Showing first step.");
			showStep("START");			
		}	else {
		var error = "Unable to parse start step from" + stepfile + "<br>"
			+"No start step data found."+"<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2.";

		showerror(error,"error");

		//alert("Unable to parse start step from " + stepfile +"\nNo start step data found." +
		//"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
		//);	

		}
	} catch (e) {
		
		var error = "Unable to parse start step from" + stepfile + "<br>"
			+ e.message +"<br>"
			+"No start step data found."+"<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2.";

		showerror(error,"error");
		//if step data is malformed or start step can not be retrieved for any reason other than it simply isn't present in the file, show the exception details
		//alert("Unable to parse start step from " + stepfile +"\n\"" + e.message + "\"" +
		//"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
		//);

	}
};

//returns to the previous step, grabbing any agent notes if present and re-adding them to the step's textarea
var goBack = function() {
	//get previous notes
	var notes = "";

	//convert the text notes back to a string
	try {
		var notea = $("#" + stepnum + "_an").children("span");
		for (var i = 0; i< notea.length; i++) {
			if (i > 0) notes += "\n";
			//preserve HTML-escaped characters like & < >
			notes += (notea[i].textContent || notea[i].innerText).slice(0);
		}
	} catch (e) {}
	
	//remove the current step
	$("#" + stepnum).remove();

	stepnum--;
	/*//if previous step was a one where reset was done, reset the reset indicator
	if (resetDone === stepnum)
		resetDone = -1;*/
	
	//if going back undoes a remembered action, remove it.
	for (var key in skips) {
		if (skips[key] === stepnum)
			delete skips[key];
	}
	
	//get previous step name from the step on the page
	prevstep = $("#" + stepnum + "_i").attr("class");
	
	//remove the previous (modified) step and re-show it
	$("#" + stepnum).remove();
	showStep(prevstep);

	//put previous notes back
	try {
		$("#" + stepnum + "_nf").val(notes);
	} catch (e) {}
	
};

//runs when page and jQuery library finish loading. Loads step data then loads function to start the flowchart if successful.
$(document).ready(function () {

	//check for steps file override in HTML
	//if ($("#stepfile").data) { stepfile = $("#stepfile").data; }

	var $load = $("<h1 />", {text: "Loading..."});
	$load.appendTo($("#flowchart-area"));

	//define navbuttons
	$back = $("#backbutton");
	$back.click(function () { goBack(); });
	
	$startover = $("#sobutton");
	$startover.click(function() {
		//reset steps, empty the flowchart area, and re-start it
		stepnum = 0;
		//resetDone = -1;
		//reset skippable steps
		for (var key in skips) delete skips[key];
		$("#flowchart-area").empty();
		startsteps();
	});
	
		/* 
			Load JSON steps files 
		*/

	//Load JSON file start.js
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
			
			error = "Unable to fetch the following file: " + stepfile + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."
			showerror(error,"error");	
			
			/*
			alert("Unable to fetch the following file:\n\t" +
				stepfile + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);

				*/
			//if (enable_fallback) fallback();
		}).always(function() {
			//console.log( "JSON fetch attempt complete." );
		});

		// Load JSON device-rebooting.js
		var jsongetDeviceRebooting = $.getJSON( stepfileDeviceRebooting, function( data ) { 
			stepdataDeviceRebooting = data.steps;
		}).done(function() {
			//console.log( "Finished with JSON retrieval." );
		}).fail(function( jget, textstatus, error) {			
			
			error = "Unable to fetch the following file: " + stepfileDeviceRebooting + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."
			showerror(error,"error");	
			
			/*			
			alert("Unable to fetch the following file:\n\t" +
				stepfileDeviceRebooting + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);
				*/
				

		}).always(function() {			
			//console.log( "JSON fetch attempt complete." );
		});

		// Load JSON ./src/js/sbg8300.js
		var jsongetsbg8300 = $.getJSON( stepfilesbg8300, function( data ) { 
			stepdatasbg8300 = data.steps;
		}).done(function() {
			//console.log( "Finished with JSON retrieval." );
		}).fail(function( jget, textstatus, error) {			
			
			error = "Unable to fetch the following file: " + stepfilesbg8300 + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."
			showerror(error,"error");		

			/*
			alert("Unable to fetch the following file:\n\t" +
			stepfilesbg8300 + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);	*/		
		
			}).always(function() {		
			//console.log( "JSON fetch attempt complete." );	
		});
		
		// Load JSON ./src/js/1led.js
		var jsonget1led = $.getJSON( stepfile1led, function( data ) { 
			stepdata1led = data.steps;
		})	.done(function() {
			//console.log( "Finished with JSON retrieval." );
		})  .fail(function( jget, textstatus, error) {			
			
			error = "Unable to fetch the following file: " + stepfile1led + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."
			showerror(error,"error");		

			/*alert("Unable to fetch the following file:\n\t" +
			stepdata1led + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);
				*/			
		})  .always(function() {	
			//console.log( "JSON fetch attempt complete." );		
		});
		
		//Load JSON ./src/js/3led.js
		var jsonget3led = $.getJSON( stepfile3led, function( data ) { 
			stepdata3led = data.steps;
		})	.done(function() {
			//console.log( "Finished with JSON retrieval." );
		})  .fail(function( jget, textstatus, error) {
			
			error = error + " Unable to fetch the following file: " + stepfile3led + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."

			showerror(error,"error");			
		/*	alert("Unable to fetch the following file:\n\t" +
				stepfile3led + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);	
				*/		
		})  .always(function() {	
			//console.log( "JSON fetch attempt complete." );		
		});
		
				
		//Load JSON ./src/js/4led.js
		var jsonget4led = $.getJSON( stepfile4led, function( data ) { 
			stepdata4led = data.steps;
		})	.done(function() {
			//console.log( "Finished with JSON retrieval." );
		})  .fail(function( jget, textstatus, error) {	

			error = "Unable to fetch the following file: " + stepfile4led + "<br>"
			+" Please report this issue to a supervisor" + "<br>"
			+"Error: " + error + "<br>"
			+"Status: " + textstatus + "<br>"
			+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
			+" then paste it in an email to Tier 2."
			showerror(error,"error");		

			/*		
			alert("Unable to fetch the following file:\n\t" +
				stepfile4led + "\n\nPlease report this issue to a supervisor.\n\n" +
				"Status: " + textstatus + "\nError: " + error +
				"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
				);
				*/			
		})  .always(function() {	
			//console.log( "JSON fetch attempt complete." );		
		});
		
		// Load complete and start the steps.
		jsonget.complete(function() {
			//console.log(stepdata)
			$load.remove();
			startsteps();
		});


});

	

var debug_reload_steps = function () {
	var jsonget = $.getJSON( stepfile, function( data ) { 
		//console.log( "Successfully retrieved " + stepfile );
		stepdata = data.steps;
		//get page title from step data if present
	})	.done(function() {
		//console.log( "Finished with JSON retrieval." );
	})  .fail(function( jget, textstatus, error) {
		
		error = "Unable to fetch the following file: " + stepfile + "<br>"
		+" Please report this issue to a supervisor" + "<br>"
		+"Error: " + error + "<br>"
		+"Status: " + textstatus + "<br>"
		+"Press CTRL+C to copy this message and paste it in your notes if you are on a call,"+"<br>"
		+" then paste it in an email to Tier 2."
		showerror(error,"error");	
		/*
		//console.log("JSON fetch failed");
		alert("Unable to fetch the following file:\n\t" +
			stepfile + "\n\nPlease report this issue to a supervisor.\n\n" +
			"Status: " + textstatus + "\nError: " + error +
			"\n\nPress CTRL+C to copy this message and paste it in your notes if you are on a call, then paste it in an email to Tier 2."
			);
		//if (enable_fallback) fallback();
		*/

	})  .always(function() {
		//console.log( "JSON fetch attempt complete." );
	});
}

function showerror(message,state){



	var $activeq = $('.activeq');
	var $alert = $("<div>").addClass("alert");
	var $closebtn= $(`<span class="closebtn">&times</span>`);
	var $message = $(`<span>${message}</span>`);;
	

	if($('.info')){		
		$('.info').remove();
	}
	if($('.warning')){		
		$('.warning').remove();
	}

	$closebtn.click(() => {

		$alert[0].style.opacity = "0";
		setTimeout(function(){ $alert.remove(); }, 200);
	});
	
	//$message = $(`<span>${message}</span>`);
	
	$alert.append($closebtn);
	$alert.append($message);
			
	if (state) {
		$alert.addClass(state)
	}		
	//$flowchart.append($alert);
	$alert.insertBefore($activeq);
	
}