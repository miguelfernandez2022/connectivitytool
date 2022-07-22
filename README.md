## Connectivity tool README

<!--START_SECTION:badges-->
### Develomenpt tools  
<div>

[![Development Branch](https://img.shields.io/badge/development_branch-main-green.svg)](https://github.com/miguelfernandez2022/connectivitytool/tree/main/)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/miguelfernandez2022/connectivitytool)
![GitHub last commit](https://img.shields.io/github/last-commit/miguelfernandez2022/connectivitytool)

</div>

<div>

![HTML5](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

</div>
<!--END_SECTION:badges-->

### Interactive flowchart in HTML/Javascript/jQuery

specify JSON file location at top of flowchart.js
var stepfile = "filename.json";

## Debug: 
toggle showing a step's name on mouseover by changing debug to true (enable) or false (disable)
	var debug = true;

## Adding steps on json database: 
add items to "steps" section of JSON file in following format:
comma must be present if there is more than one line

"NoNotes" : "true", omit this line entirely to include a notes section for the agent to type comments

"Noteheight": "8rem", specify for custom note height

Example with LED Chart handling
first item in each line is the destination step. 

Following are led status in order Power, Receive, Send, Online
for LED status, "*" matches any status.

````json
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

````

## Options on json steps
"QuestionsTemplate"An array template that will automatically appear in the notes if are empty.
Agent can delete that questions

"Popmsg" contains text for message box popup on click for clarification
"Poplink" opens a link in new window/tab
"Popmsg" and "Poplink"  create an "info" button on the step.
An alternate label instead of "info" can be defined with "Popmsglabel"
Using both "Poplink" and "Popmsg" will cause the Popmsg text to be used as an OK/Cancel confirmation before opening the Poplink.
These two options REQUIRE the "Question" option to be present. This may be changed in future versions if needed.

"Skips" has the flowchart remember a reset was performed at this step. If step is backtracked or the flow is started over,
the remembered reset is forgotten. You can specify as many remembered actions as needed.

(example: ["step_to_jump_to", "Performed factory reset", "action_to_remember", "action2_to_remember", "more_actions"])
Use with new option "Skips" : [["step_remembered", "step_to_skip_to"]], to specify skipping to another step instead if a reset was already done.
You can skip to different steps for different steps remembered as well, like this:
````json
"Skips" : [
		["reset", "redirsignal"],
		["power", "rma"]
	],
````

"Table" creates a table in similar formatting to the "Text" option. 
Use "***" to set a box as a table header.
Example:
````json
"Table" : [
		["***Header 1", "***Header 2", "***Header 3"],
		["Data 1", "Data 2", "Data 3"]
	],
````

All options in each step are optional, but remember to put a comma at the end of all but the last item in a step
If you get a "parsererror" or "SyntaxError", try validating the JSON file using this site:
	[JSON formatter](http://jsonformatter.curiousconcept.com/).	

"Text" can include multiple lines:
````json
	"Text": [
		"Line 1",
		"Line 2",
		"Line 3"
		]
````

### Step example

````json
"step1": 
{
"Question": "Text of the question, or just open and close quotes to not print a question.",
"Text":["*** highlight - for non-question or elaboration","smaller font - for non-question or elaboration"],
"QuestionsTemplate":["Appear on the notes, can be deleted ","Maybe appear repeated if needed "],
"TextCheckbox":["Checkbox, which appears, once checked, cleans the textnotes and puts the text it contains"],
"Table":[["***Header 1", "***Header 2", "***Header 3"],["Data 1", "Data 2", "Data 3"]],
"LEDchart3led":[
["3led_poweroff_power_on_fail","off","off","off"],
["3led_poweroff_hardware_fail", "solid","off","off"],
["3led_not_internet_access", "solid","flashing","off"],
["3led_first_time_setup", "solid","solid","flashing"],
["3led_not_service", "solid","solid","solid"],
["3led__led_behavior", "*", "*","*"]],
"LEDfail" : "3led_poweroff_hardware_fail",
"NoNotes" : "true",
"Noteheight": "8rem",
"Skips":[["skip1", "redirsignal"],["skip2", "rma"],["skip3", "rma2"]],
"Buttons":[["step_to_jump_to", "Button Text","skip1","skip2"],["another_step", "Button 2 Text","skip3"]]
},
````