# Connectivity tool README

<!--START_SECTION:badges-->
## Develomenpt tools

![HTML5](https://img.shields.io/badge/HTML-239120?style=plastic&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=white)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=plastic&logo=jquery&logoColor=white)
![Less](https://img.shields.io/badge/less-2B4C80?style=plastic&logo=less&logoColor=white)

![GitHub language count](https://img.shields.io/github/languages/count/miguelfernandez2022/connectivitytool?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/miguelfernandez2022/connectivitytool?style=plastic)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/miguelfernandez2022/connectivitytool?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/miguelfernandez2022/connectivitytool?style=plastic)

<!--END_SECTION:badges-->

## Provisioning flowchart

- [x] Beta Version review 0.1
- [x] Coded in JSON by Matthew Carpenter, ARRIS Tier 1 Support.
- [x] Modify by Miguel Alejandro Fernandez Costa Rica Team"
- [x] Add/modify steps in 'steps' section following guide in the readme.txt file.
- [x] Version 3.5 adds the NoNotes option.
- [x] Version 4.0 adds the LEDchart and LEDfail option, ans well as Popmsg and Poplink.
- [x] Version 4.2 adds Skips options. This replaces 'Resetdone'. See Readme/changelog.
- [x] Version 4.2 adds Table option. See Readme/changelog.
- [x] Version 4.3 adds Noteheight option.
- [x] Version 4.6.6 adds the CAP process
- [x] Version 4.8 adds Slow Speed Workflow TS processes
- [x] Version 4.81 fixes four identified broken paths and adds new 'No GUI Access' paths
- [x] Version 4.82 removed 'Do not use' column from opening table, updated 'cable' signal, offer AA program, removed      'Suggest exchanging with retailer' instruction.
- [x] Version 4.9 added Gateway combined US/DS LED instructions, re-worded redirect to ISP T2 for cable signal levels, added ISP compatiblity for different LED states
- [x] Version 5 Refresh all GUI and some behaviors, compatibility to Modern Browsers.
- [x] Version 6 Refresh GUI and Refresh steps, add modularization steps in files
- [x] Version 6.1 Create a new feature for question template inside the notes
- [ ] Add delight to the experience when all tasks are complete :tada:

## Interactive flowchart in HTML/Javascript/jQuery

>Specify JSON file location at top of flowchart.js
>var stepfile = "filename.json";

````jsvascript
var stepfile = "./src/js/start.js"; // specify JSON file location here
````

## Debug

>Toggle showing a step's name on mouseover by changing debug to true (enable) or false (disable)
>var debug = true;

````javascript
var debug = true; //Enables showing STEPNAME when holding mouse pointer over a step
````

## Creating steps on json file

>Add items to "steps" section of JSON file in following format:
>All options in each step are optional, but remember to put a comma at the end of all but the last item in a step
>If you get a "parsererror" or "SyntaxError", try validating the JSON file using this site,
>[JSON formatter](http://jsonformatter.curiousconcept.com/). Comma must be present if there is more than one line!

### Option "Question"

>A simple text string that will be displayed in a large size, depends on css class="question"

````json
"Question" : "First question that appear on the step",
````

![Question image](./src/img/readme/Question.jpg)

### Option "Popmsg" and "Poplink"

>"Popmsg" contains text for message box popup on click for clarification.
>"Poplink" opens a link in new window/tab.
>"Popmsg" and "Poplink"  create an "info" button on the step.
>An alternate label instead of "info" can be defined with "Popmsglabel"
>Using both "Poplink" and "Popmsg" will cause the Popmsg text to be used as an OK/Cancel confirmation before opening the Poplink.
>These two options REQUIRE the "Question" option to be present. This may be changed in future versions if needed.
>CSS class="tip"

````json
"Popmsg" : "Use this tool whenever you need to troubleshoot a device with technical issues",
````

````json
"Poplink" : "https://arris.my.salesforce.com/articles/General_FAQs/ARRIS-Product-Warranty-Replacement-Guidelines",
````

![info example](./src/img/readme/info.jpg)

### Option "Text"

>An array of text between brackets, this option is for basic text or important text to clarify the step, it also supports certain HTML tags, such as links, line breaks. CSS class="text"

````json
"Text" :
[
 "<br>",
 "Array of text, inside brackets",
 "another text",
 "<a href='http://somepage.com' target = '_blank'>A link for a certain page</a>"
]
````

![Text](./src/img/readme/Text.jpg)

### Option "QuestionsTemplate"

>An array template that will automatically appear in the notes if are empty. Agent can delete that questions

````json
"QuestionsTemplate":
[
 "First question:  ",
 "Second question: "
],
````

![QuestionsTemplate](./src/img/readme/QuestionTemplate.jpg)

### Option "NoNotes"

>"NoNotes" : "true", omit this line entirely to include a notes section for the agent to type comments

````json
"NoNotes":"true",
````

### Option Note height

>An string that can set a height property on the notes

````json
"Noteheight": "8rem", specify for custom note height,
````

### Option Table

>Option "Table" creates a table in similar formatting to the "Text" option. Use "***" to set a box as a table header.

````json
"Table":
[
 ["***Header 1", "***Header 2", "***Header 3"],
 ["Data 1", "Data 2", "Data 3"]
],
````

![Template](./src/img/readme/Table.jpg)

### Option Skips

>"Skips" has the flowchart remember a reset was performed at this step. If step is backtracked or the flow is started over,the remembered reset is forgotten. You can specify as many remembered actions as needed.
>
>You can skip to different steps for different steps remembered as well, like this:

````json
"Skips" : 
[
  ["reset", "redirsignal"],
  ["power", "rma"]
],
````

### Option Buttons

>Buttons to advance to the next step, these buttons contain more than one action in a conditional way.

````json
"Buttons":
[
 ["step_to_jump_to","Yes/No/Option","action_to_remember","another_action_to_remember"],
 ["step_to_jump_to","Yes/No/Option","another_action_to_remember","another_action_to_remember"]
]
````

![Buttons](./src/img/readme/Buttons.jpg)

### Option 4 LED LEDchart

>These steps do not have buttons, because they are selection.
>first item in each line is the destination step.
>Following are led status in order [ 4 LED -> Power, Receive, Send, Online ], [ 3 LED -> Power, US/DS, Online ].
>For LED status, [ * ]  matches any status.

#### Option for 4 LED devices ledchart

````json
"LEDchart": 
[
 ["4led_poweroff_power_on_fail", "off", "off", "off", "off"],
 ["4led_poweroff_hardware_fail", "solid", "off", "off", "off"],
 ["4led_not_internet_access", "solid", "flashing", "off", "off"],
 ["4led_not_internet_access", "solid", "solid", "flashing", "off"],
 ["4led_first_time_setup", "solid", "solid", "solid", "flashing"],
 ["4led_not_service", "solid", "solid", "solid", "solid"],
 ["4led__led_behavior", "*", "*", "*", "*"]
],
"LEDfail" : "4led_poweroff_hardware_fail"	
````

#### Option 3 LED ledchart


````json
"LEDchart3led":
[
 ["3led_poweroff_power_on_fail","off","off","off"],
 ["3led_poweroff_hardware_fail", "solid","off","off"],
 ["3led_not_internet_access", "solid","flashing","off"],
 ["3led_first_time_setup", "solid","solid","flashing"],
 ["3led_not_service", "solid","solid","solid"],
 ["3led__led_behavior", "*", "*","*"]
],
"LEDfail" : "3led_poweroff_hardware_fail"
````



Example with LED Chart handling
first item in each line is the destination step.



````json
"allsolid" :
{
 "Question" : "What is the LED status?",
 "LEDchart" : 
 [
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

### Step example

````json
"step1": 
{
"Question": "Text of the question, or just open and close quotes to not print a question.",
"Text":["*** highlight - for non-question or elaboration","smaller font - for non-question or elaboration"],
"QuestionsTemplate":["Appear on the notes, can be deleted ","Maybe appear repeated if needed "],
"TextCheckbox":["Checkbox, which appears, once checked, cleans the textnotes and puts the text it contains"],
"Table":[["***Header 1", "***Header 2", "***Header 3"],["Data 1", "Data 2", "Data 3"]],
"NoNotes" : "true",
"Noteheight": "8rem",
"Skips":[["skip1", "redirsignal"],["skip2", "rma"],["skip3", "rma2"]],
"LEDchart3led":[
["3led_poweroff_power_on_fail","off","off","off"],
["3led_poweroff_hardware_fail", "solid","off","off"],
["3led_not_internet_access", "solid","flashing","off"],
["3led_first_time_setup", "solid","solid","flashing"],
["3led_not_service", "solid","solid","solid"],
["3led__led_behavior", "*", "*","*"]],
"LEDfail" : "3led__led_behavior",
},
````
