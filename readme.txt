Interactive flowchart in HTML/Javascript by Matthew Carpenter
Uses JQuery, see comment of jQuery file included for details.

specify JSON file location at top of flowchart.js
	var stepfile = "filename.json";

toggle showing a step's name on mouseover by changing debug to true (enable) or false (disable)
	var debug = true;

add items to "steps" section of JSON file in following format:

///////////////////////////////////////
"step1": {
	"Question": "Text of the question, or just open and close quotes to not print a question.",	<-- comma must be present if there is more than one line
	"Text": 
		[ 
			"smaller font - for non-question or elaboration"
		],
	"QuestionsTemplate": 
			[
				"Question 1 ", 
				"Question 2 "
			],
	"TextCheckbox": 
		[
			"Checkbox, which appears, once checked, cleans the textnotes and puts the text it contains"
		],
	"NoNotes" : "true",	<-- omit this line entirely to include a notes section for the agent to type comments.
	"Noteheight": "8rem" <-- specify for custom note height
	"Buttons": [						<-- SQUARE bracket
		["step_to_jump_to", "Button Text"],		<-- SQUARE brackets, comma is important if other buttons follow!
		["another_step", "Button 2 Text"]		<-- omit comma for last button
	]								<-- SQUARE bracket
},		<-- the comma is important unless this is last step! Omit this for last step in the JSON
///////////////////////////////////////
Example with LED Chart handling
first item in each line is the destination step. Following are led status in order Power, Receive, Send, Online
for LED status, "*" matches any status.
==============

		"allsolid" : {
			"Question" : "What is the LED status?",
			"LEDchart" : [
				["poweroff", "off", "off", "off", "off"],
				["powerflash", "flashing", "*", "*", "*"],
				["checkconnect2", "solid", "flashing", "off", "off"],
				["sendcheckcoax", "solid", "solid", "flashing", "off"],
				["fwreset", "solid", "flashing", "flashing", "*"],
				["onlinesolid", "solid", "solid", "solid", "solid"],
				["onlineoff", "solid", "solid", "solid", "*"]				
			],
			"LEDfail" : "powerflash" 
		},

///////////////////////////////////////

new Option "QuestionsTemplate"An array template that will automatically appear in the notes if are empty. Agen can delete that questions
New option "Popmsg" contains text for message box popup on click for clarification
New option "Poplink" opens a link in new window/tab
Both of these create an "info" button on the step. An alternate label instead of "info" can be defined with "Popmsglabel"
Using both "Poplink" and "Popmsg" will cause the Popmsg text to be used as an OK/Cancel confirmation before opening the Poplink.
These two new options REQUIRE the "Question" option to be present. This may be changed in future versions if needed.

New item "Skips" has the flowchart remember a reset was performed at this step. If step is backtracked or the flow is started over,
the remembered reset is forgotten. You can specify as many remembered actions as needed.
(example: ["step_to_jump_to", "Performed factory reset", "action_to_remember", "action2_to_remember", "more_actions"])
Use with new option "Skips" : [["step_remembered", "step_to_skip_to"]], to specify skipping to another step instead if a reset was already done.
You can skip to different steps for different steps remembered as well, like this:
	"Skips" : [
		["reset", "redirsignal"],
		["power", "rma"]
	],
*** This replaces the old "ResetDone" option - that will now be ignored if still in the flow.


New option "Table" creates a table in similar formatting to the "Text" option. Example:
	"Table" : [
		["***Header 1", "***Header 2", "***Header 3"],
		["Data 1", "Data 2", "Data 3"]
	],
Use "***" to set a box as a table header.

All options in each step are optional, but remember to put a comma at the end of all but the last item in a step
If you get a "parsererror" or "SyntaxError", try validating the JSON file using this site:
		http://jsonformatter.curiousconcept.com/
		
		
Even if there are no buttons, a "Back" and "Start Over" button will be added to non-start steps
the step named "START" will always be displayed first.
		
Text can include multiple lines:
	
	"Text": [
		"Line 1",
		"Line 2",
		"Line 3"
		]
						
The example below shows an example three-step flow
The "title" can be modified as well, and is optional.
if the title is omitted, no title will be shown at the top of the page, and the titlebar will read "Flowchart"
		
{
	"title" : "Example flowchart",

	"steps" : {
		"START" : {
			"Question": "Will you click Yes?",
			"NoNotes" : "true",
			"Buttons": [
				["ifNo", "No, I will click this button."],
				["ifYes", "Yes"]
			]
		},
		
		"ifNo" : {
			"Text": [
				"You pressed No.",
				"I would rather you pressed Yes."
			],
			"Buttons": [
				["ifYes", "Yes"]
			]
		},
		
		"ifYes" : {
			"Question": ["You pressed Yes."]
		}
	}
}
