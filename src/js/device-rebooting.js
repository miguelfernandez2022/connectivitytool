{
  "comments" : [
		"device-rebooting flowchart"	
	],

  "title" : "SURFboard Troubleshooting Tool",

  "steps" : 
	{
		"START" : {
			"Question" : "device-rebooting?"
		},

		"device_rebooting__device" : 
		{
			"Question" : "Wish type of device have the costumer?",
			"Text" : 
			[ 				
				"If possible, make a direct connection to the device with a ethernet cable."
			],
			"QuestionsTemplate":
			[
				"When start the rebooting proccess?"
			],
			"Skips":
			[	
				["gateway__wired","device_rebooting__gateway__coax_out"],
				["modem","device_rebooting__modem__coax_out"]
			],
			"Buttons" : 
			[
				["device_rebooting__modem__coax_out", "Modem"],
				["device_rebooting__gateway__coax_out", "Gateway"]
			]
		},


		"device_rebooting__modem__coax_out" : 
		{
			"Comments": "device rebooting modem procedure",
			"Question" : "Is the device rebooting on its own even with the coax out?",
			"Text": 
			[
				"The client has a splitter connected? ",
				"Check coax cable, replace if needed ",
				"Disconnect coax cable and try to access web interface (gui)"
			],
			"QuestionsTemplate": 
			[
				"Is there splitter, amplifier, switch, or damaged coax cable?: ", 
				"Is the ethernet cable Damaged?: "
			],
			"Skips":[["rebooting__coax__out","device_rebooting__modem__factory__reset"]],
			"Buttons": [
				["device_rebooting__modem__factory__reset", "Yes"],
				["device_rebooting__modem__checkgui", "No"]
			]
		},
		
		"device_rebooting__modem__factory__reset":
		{
			"Question": "Perform a factory reset",
			"Skips":[["device_rebooting__modem_replace","replace_unit"]],
			"Text": [
				"***Type the reason of why the factory reset could not be perform ( if applicable )",
				"***If it is a Gateway advise this action will erase all previous",
				"***connectivity configurations set by the cable provider",
				"***and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"For SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds",
				"For SB series, follow the steps below:",
				"1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).",
				"2) Go to Configuration, then click Reset All Defaults or Restore Factory Defaults",
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Buttons": 
			[
				["device_rebooting__modem__checkgui","Done","device_rebooting__modem_replace"],
				["device_rebooting__modem__checkconnect","No, SB6183","device_rebooting__modem_replace"]
			]
		},
		"device_rebooting__modem__checkconnect": 
		{
			"Question": "Troubleshoot the coaxial connection, bypass splitters, and powercycle the modem.",
			"Text": 
			[ 
				"If any splitters are present, bypass them.",
				"Make sure no cables are visibly damaged and try another coaxial outlet if available."
			],
			"Buttons":[["device_rebooting__modem__checkgui","Done"]]
		},
		"device_rebooting__modem__checkgui": 
		{
			"Question": "Can customer  go to login screen on web interface (gui)",
			"Text": ["If the customer can access web interface need to provision the unit."],
			"Buttons": 
			[
				["redirect__isp","Yes"],
				["device_rebooting__modem__factory__reset","No"],
				["device_model","Device have internet access"]
			]
		},



		



	"device_rebooting__gateway__coax_out" : 
		{
			"Comments": "device rebooting gateway procedure",
			"Question" : "Is the device rebooting on its own even with the coax out?",
			"Text": 
			[
				"Check splitter, replace if needed",
				"Check coax cable, replace if needed",
				"Disconnect coax cable, restart the gateway and try to access web interface (gui)"
			],
			"QuestionsTemplate": 
			[
				"Is there splitter, amplifier, switch, or damaged coax cable?: ", 
				"Is the ethernet cable Damaged?: "
			],
			"Skips":[["rebooting__coax__out","device_rebooting__modem__factory__reset"]],
			"Buttons": 
			[
				["device_rebooting__gateway__factory__reset", "Yes"],
				["device_rebooting__gateway__checkgui", "No"]
			]
		},
		"device_rebooting__gateway__factory__reset":
		{
			"Question": "Perform a factory reset",
			"Skips":[["device_rebooting__gateway_replace","replace_unit"]],
			"Text": 
			[
				"***Type the reason of why the factory reset could not be perform ( if applicable )",
				"***If it is a Gateway advise this action will erase all previous",
				"***connectivity configurations set by the cable provider",
				"***and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"For SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds",
				"For SB series, follow the steps below:",
				"1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).",
				"2) Go to Configuration, then click Reset All Defaults or Restore Factory Defaults",
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Buttons": 
			[
				["device_rebooting__gateway__checkgui","Done","device_rebooting__gateway_replace"]
			]
		},
		"device_rebooting__gateway__checkgui": 
		{
			"Question": "Can customer go to login screen on web interface (gui)?",			
			"Text": ["If the customer can access web interface need to provision the unit."],
			"Buttons": 
			[
				["redirect__isp","Yes"],
				["device_rebooting__gateway__factory__reset","No"],
				["device_model","Device have internet access"]
			]
		},



		"redirect__isp":
		{
			"Question": "Redirect the customer to ISP for check the signal",
			"Text":
			[
				"<br>",
				"***Address internet connectivity issues by checking their lines",
				"***remotely or if needed physically with a Technician"
			]
		}

   }
}