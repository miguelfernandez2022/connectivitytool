{
  "comments" : [
		"SBG8300 flowchart"	
	],
  "title" : "SURFboard Troubleshooting Tool",

  "steps" : {
		"START" : {
			"Question" : "sbg8300?"
		},

		"sbg8300__checkled" : 
		{
			"Question" : "What is the LED status?",
			"Text" : 
			[
			  "***When troubleshooting a Gateway/Modem with a combined US/DS LED,",
				"***refer to the following table to set the Receive/Send LED accordingly"
			],
			"Skips":	[["sbg8300__intermittentConnection","sbg8300_service_status"]	],
			"Table" : 
			[			
				["***Power Off", "No ligths turning on"],			
				["***Solid Blue", "Device is on / Hardware fail"],			
				["***Fast or Slow blinking Blue","sbg8300__not_internet"],			
				["***Green Blinking","sbg8300_first_time_setup"],			
				["***Solid Green","Device is online, Check Service"]	
			],
			"Buttons" : 
			[
				["sbg8300_poweroff_power_on_fail","Power Off"],
				["sbg8300__hardware_fail","Solid Blue"],
				["sbg8300__not_internet","Blue Blinking"],
				["sbg8300_first_time_setup","Green Blinking"],
				["sbg8300_not_service","Solid Green"]
			]
		},








		"sbg8300_poweroff_power_on_fail": 
		{
			"Comments": "Power on fail procedure", 
			"Question": "Try a different power outlet and/or cord.",
			"Popmsg": "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"Text" : ["Check physical connection, use different cord/outlet "],
			"Skips" : 
			[
				["reset", "sbg8300__hardware_fail__factory_reset"],
				["power", "replace_unit"]
			],
			"Buttons" : [["sbg8300__checkled","Done","reset","power"]]
		},









		"sbg8300__hardware_fail": 
		{
			"Comments": "Power on hardware fail procedure", 
			"Question": "Is the Ethernet port LED on?",
			"QuestionsTemplate": ["Is it green or yellow/amber?:"],
			"Skips" : 
			[	
				["replace", "replace_unit"]	
			],			
			"Buttons" :
			[	
				["sbg8300__hardware_fail__poweroutlet", "Yes"],
				["sbg8300__hardware_fail__factory_reset", "No"]
			]
		},
		"sbg8300__hardware_fail__poweroutlet": 
		{ 
			"Question": "Move to a different location, try another power cord/outlet",
			"Text" : 
			[
				"Check if the system responds in a different location",
				"Disconnect the coaxial cable",
				"Check WiFi connection IPv4",
				"Check if the device feels warm to the touch"
			],
			"QuestionsTemplate": 
			[
				"System responds in a different location?: ",
				"Disconnect the coaxial cable and check Wi-Fi connection IPv4: ",
				"The device feels warm to the touch?: "
			],			
			"Buttons" :
			[	
				["sbg8300_not_service", "Device Responded"],
				["sbg8300__hardware_fail__factory_reset", "Continue with issues"]
			]
		},
		"sbg8300__hardware_fail__factory_reset": 
		{
			"Question": "Perform a factory reset.",
			"Popmsg": "",
			"Text" : 
			["***If it is a Gateway advise this action will erase all previous connectivity configurations set by the cable provider",
				"***and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"For SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds", 
				"For SB series, follow the steps below:",  
				"1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).",
				"2) Go to Configuration, then click Reset All Defaults or Restore Factory Defaults", 
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Skips" : 
			[	["replace", "replace_unit"]	],			
			"Buttons" :
			[	["sbg8300__checkled", "Factory reset modem", "replace"]	]
		},










		"sbg8300_first_time_setup" : 
		{
			"Comments": "This procedure is for first time setup",
			"Question" : "Is this the first-time setup?",
			"Text": 
			["If this is first-time setup,", 
				"there is a higher chance the problem will be related to provisioning."
			],
			"Popmsg" : "If this is first-time setup, there is a higher chance the problem will be related to provisioning.",
			"Skips" : 
			[
				["reprovision","redirect_toprovision"]
			],
			"Buttons" : 
			[ ["sbg8300_other_modems","Yes","reprovision"],
			  ["sbg8300__check_connection", "No","reprovision"]
			]
		},
		"sbg8300_other_modems" : {
			"Question" : "Disconnect Previous modem from the network",
			"Text": 
			[
				"If the previous modem is still connected to the network,",
				"disconnect and restart the new modem",
				"If it is a new house, check the coax outlet on the wall"
			],

			"Buttons" : 
			[ ["sbg8300_check_activation", "Done"] ]
		},
		"sbg8300_check_activation":
		{
			"Question": "Was the unit already activated with the ISP?",
			"Text": ["Verify if the customer has already provided the HFC MAC ID to the service provider"],
			"Buttons": 
			[	["sbg8300_factory_reset","Yes"],
			["self_activation_procedure","No"],
			["self_activation_procedure","No, Comcast/Xfinity"]
		]
		},
		"sbg8300_self_activation":
		{
			"Question": "Call Service Provider Page Procedure"
		},









		"sbg8300__not_internet": 
		{
			"Comments": "Not internet access Procedure",
			"Question": "Does the customer have TV service with the same provider as the internet?",
			"QuestionsTemplate": ["Is it working?"],
			"Skips":
			[
				["reset","sbg8300_factory_reset"]
			],

			"Buttons" :
			[ ["sbg8300__not_internet__checkgui","Yes, TV working","sbg8300replace_unit"],[ "checksignal","Yes, TV not working"],
				["sbg8300__not_internet__checkgui","No TV subscription","sbg8300replace_unit"]
			]	
		},
		"sbg8300__not_internet__checkgui": 
		{
			"Question": "Does the customer have access to the GUI login screen?",
			"Text": [" If the customer has access to the login screen, it could be a provisioning problem"],
			"Buttons" :
			[ 
				[ "checksignal","Yes"],
				["sbg8300__check_connection","No"]
			]	
		},



		"sbg8300_factory_reset":
		{
			"Comments": "Factory reset procedure",
			"Question": "Perform a factory reset",
			"Text": 
			[
				"***Type the reason of why the factory reset could not be perform ( if applicable )",
				"***If it is a Gateway advise this action will erase all previous,",
				"***connectivity configurations set by the cable provider",
				"***and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"Hold the reset button in the back of the modem with a pointed object for more than 30 seconds",
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Skips":
			[
				["ThirdPartyRouter","sbg8300_not_service__thirdpartymanufacturer"],
				["toprovision","redirect_toprovision"]
			],
			"Buttons": 
			[
				["sbg8300__checkled","Done","reset","toprovision"],
				["sbg8300__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},
		"sbg8300_factory_reset_media_disconnected":
		{
			"Comments": "Factory reset procedure",
			"Question": "Perform a factory reset to the Arris device",
			"Text": [
				"***Type the reason of why the factory reset could not be perform ( if applicable )",
				"***If it is a Gateway advise this action will erase all previous,",
				"***connectivity configurations set by the cable provider",
				"***and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"Hold the reset button in the back of the modem with a pointed object for more than 30 seconds",
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Skips":
			[ 
				["ThirdPartyRouter","sbg8300_not_service__thirdpartymanufacturer"],	
				["toreplace_unit","replace_unit"]
			],
			"Buttons": 
			[ 
				["3led__checkled","Done","toreplace_unit"],
				["3led__stop","No, Customer does not want to Factory reset  the unit"]
			]
			},

		"sbg8300__stop": 
		{
			"Question": "Incomplete Troubleshooting"
		},


		"sbg8300__check_connection": 
		{
			"Question": "Troubleshoot physical connections and Power Cycle the ARRIS Unit",
			"Text": 
			[	
				"Troubleshoot in this order: ",
				"Disconnect coax cable",
				"Swap coaxial cables",
				"Check splitter condition",
				"Power Cycle the ARRIS Unit"
			],
			"Skips":
			[
				["reset","sbg8300_factory_reset"]
			],
			"Buttons" : 
			[
				["sbg8300__checkled","Done","reset"]
			]
		},






		"sbg8300_not_service": 
		{
			"Comments": "Not service procedure",
			"Question": "Can customer get online?",
			"Text": 
			[
				"Verify if the customer has internet access,",
				"ask them to go to any website, such as cnn.com/foxnews.com"
			],
			"Buttons": 
			[
				["sbg8300_service_status","Yes"],
				["sbg8300_not_service_bypass","No"]
			]
		},
		"sbg8300_service_status":
		{
			"Question": "Is the Customer experiencing Connectivity Issues?",
			"Text": ["***Slow Speed or Intermittent Connection","When start the issue"],
			"Buttons": 
			[
				["resolved","No"],
				["sbg8300_slow_speed","Yes, slow speed"],
				["sbg8300_intermittent_connection","Yes, intermittent connection"]
			]
		},
		"sbg8300_not_service_bypass":
		{
			"Question": "How is the customer connected to the modem?",
			"QuestionsTemplate": ["Can the customer connect directly using a ethernet cable?"],
			"Skips":
			[
				["media_disconnected","sbg8300_factory_reset_media_disconnected"],
				["bypassReset","redirect_toprovision"]
			],
			"Buttons": 
			[	
				["sbg8300_not_service_checkinternet","Hardwired","bypassReset"],
				["sbg8300_not_service_checkinternet","Wi-Fi","bypassReset"],
				["sbg8300_not_service_bridge","Bridge Mode, Using external router"]
			]
		},
		"sbg8300_not_service_bridge": 
		{
			"Question": "Can the customer bypass the external router",
			"QuestionsTemplate": ["Can the customer connect directly using a ethernet cable?"],
			"Buttons": 
			[	
				["sbg8300_not_service_bypassrouter","Bypass the router"],
				["sbg8300_not_service_unable_bypassrouter","Unable to bypass the router","ThirdPartyRouter"]
			]
		},
		"sbg8300_not_service_bypassrouter": 
		{
			"Question": "Bypassing router",
			"Text": 
			[	
				"***Steps to Bypass the router",
				"► - Power off modem, router and pc.",
				"► - Check if the ethernet cord is properly connected from the modem to the computer.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the modem are solid, power on the pc.",
				"► - Continue troubleshooting."
			],
			"Buttons": 
			[	
				["sbg8300_not_service_checkinternet","Done"]
			]
		},
		"sbg8300_not_service_unable_bypassrouter":
		{
			"Question": "Unable bypass the router",
			"Text": 
			[	
				"***Steps to power cycle the router:",
				"► - Power off modem & router.",
				"► - Check if the ethernet cord is properly connected from the modem to the router.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the Modem are solid, power on the router.",
				"► - Continue Troubleshooting."
			],
			"Buttons": 
			[	
				["sbg8300_not_service_checkinternet","Done"]
			]
		},
		"sbg8300_not_service_checkinternet":
		{
			"Question": "Try accessing a website. Can the customer get online?",
			"Text": ["Verify if the customer has internet access, ask them to go to any website, such as cnn.com/foxnews.com"],			
			"Buttons": 
			[
				["sbg8300_not_service_online","Yes"],
				["sbg8300_not_service_first_setup","No"]
			]
		},
		"sbg8300_not_service_first_setup": 
		{
			"Question": "Is this the first time setup?",
			"Text": ["There is a higher chance the problem will be related to provisioning."],
			"Skips":
			[ 
				["checkIP","sbg8300_not_service_check_ip_dns"]
			],
			"Buttons": 
			[ 
				["sbg8300_other_modems", "Yes"], 
				["sbg8300_not_service_check_ip_dns","No","checkIP"]
			]
		},
		"sbg8300_not_service_online":
		{
			"Question": "Can the customer connect to internet through Wi-Fi?",
			"QuestionsTemplate": ["Can the customer connect to internet through Wi-Fi?"],
			"Buttons":
			[	
				["resolved","Yes"],
				["sbg8300_not_service_check_ip_dns","No"]
			]
		},
		"sbg8300_not_service__thirdpartymanufacturer":
		{
			"Question": "Redirect the Customer to Third Party Manufacturer",
			"Text": 
			[	
				"<br>",
				"***Suggest to acquire a device that could be connected Hardwired to the ARRIS and Call us Back",
				"***Provide Case Number to Customer"
			]
		},







		"sbg8300_not_service_check_ip_dns":
		{
			"Comments": "Procedure for check the IP, DNS",
			"Question": "Can the customer access the modem GUI?",
			"Text": 
			[ 
				" ► Check the IP address on the device",
				" ► You can use any device, for check the ip segment 192.168.*.*"
			],
			"QuestionsTemplate": ["IP address on the device: "],
			"Skips":
			[
				["checkIPreset","sbg8300_factory_reset"]
			],
			"Buttons": 
			[ 
				["sbg8300_factory_reset","Yes","checkIPreset"],
				["sbg8300_not_service_ping","No"]
			]
		},
		"sbg8300_not_service_ping":
		{
			"Question": "Make a ping procedure [ or tracert, only applicable on windows terminal ]",
			"Text": 
			[ 
				" ► On Windows press 'win + R' type 'cmd', 'terminal' , or 'powershell'",
				" ► On MacOS press command + space bar on your Mac Keyboard, type 'terminal'"
			],
			"QuestionsTemplate": ["Have the customer a device compatible with a terminal for ping procedure?"],
			"Skips":
			[
				["checkPingreset","sbg8300_factory_reset"]
			],
			"Buttons": 
			[ 
				["sbg8300_factory_reset","Yes, have a response","checkPingreset"],
				["sbg8300_not_service_disconenct_coax","Not response, time out"]
			]
		},
		"sbg8300_not_service_disconenct_coax":
		{
			"Question": "Have access to GUI with the Coax Disconnected?",
			"Text": 
			[ 
				"***Disconnect the coax cable on the modem",
			  " ► Restart the modem with the Coaxial cable disconnected.",
				" ► Try accessing the GUI while hardwired to a computer"
			],
			"Buttons": 
			[ 
				["sbg8300_not_service_reconnect_coax","Yes"],
				["sbg8300_not_service_check_ipv4","No"]
			]
		},
		"sbg8300_not_service_reconnect_coax":
		{
			"Question": "Connect coax cable and check if the Customer get online?",
			"Text": 
			[ 
				"*** Connect the coax cable on the modem",
				" ► Reconnect the coaxial cable and wait for the correct LEDs Status "	
			],
			"Buttons": 
			[ 
				["sbg8300__checkled","Yes"],
				["redirect_toprovision","No"]
			]
		},
		"sbg8300_not_service_check_ipv4":
		{
			"Question": "Check IPv4 address, Check DNS",
			"Text": 
			[ 
				"*** On windows",
				" ► Open 'Control Panel' ► 'network and internet' ► 'Network sharing center' ► 'change adapter settings'",	
				"*** On macOS",
				" ► Open 'System Preferences' ► 'network' ► 'advanced' ► 'TCP/IP'",
				"*** On iOS",	
				" ► Open 'Settings' ► 'Wi-Fi' ► Scroll down to 'IPv4 Address'",
				"*** On Android",	
				" ► Open 'Settings' ► 'Wireless & networks/WLAN' ► 'Network & Internet' ► 'Wi-Fi'"
			],
			"QuestionsTemplate":
			[
				"IPv4 address? :",
				"DNS address? : "
			],
			"Buttons": 
			[ 
				["sbg8300_not_service_check_gui","192.168.*.*"], 
				["sbg8300_factory_reset","169.254.*.*"],
				["sbg8300_not_service_media_disconnected","Media disconnected","media_disconnected"] 
			]
		},
		"sbg8300_not_service_check_gui":
		{
			"Question": "Access to GUI restored?",
			"Text": ["Access to GUI restored"],
			"Skips":
			[ 
				["checkGUIreset","sbg8300_factory_reset"]
			],
			"Buttons": 
			[ 
				["sbg8300__checkled", "Yes"], 
				["sbg8300_factory_reset","No","checkGUIreset"] 
			]
		},
		"sbg8300_not_service_media_disconnected":
		{
			"Question":"Try with a different ethernet cord and a different device",
			"Text": ["***Restart the gateway"],
			"Buttons":
			[
				["sbg8300__checkled","Done"]
			]
		},






		
		"sbg8300_slow_speed":
		{
			"Comments": "Slow speed procedure",
			"Question": "Is the issue with WiFi, Wired, or both?",
			"Skips":
			[
				["slowspeedReset","redirect_toprovision"]
			],			
			"Buttons":
			[ 
				["sbg8300_slow_speed__wifi","Yes, wi-fi","slowspeedReset"],
				["sbg8300_slow_speed__checkcsl","Yes, wired or both","slowspeedReset"]
			]
		},
		"sbg8300_slow_speed__wifi":
		{
			"Question": "Which clients are affected?",
			"Buttons":
			[
				["sbg8300_slow_speed__oneclient","Only one client"],
				["sbg8300_slow_speed__checkcsl","All clients are affected"]
			]
		},
		"sbg8300_slow_speed__oneclient":
		{
			"Question": "Redirect to 3rd party manufacturer.",
			"Text": ["</br>","Offer AA if applicable"]
		},
		"sbg8300_slow_speed__checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": [	"Access GUI and Check Cable Signal Levels"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ ["sbg8300_slow_speed__adjustcsl","No"],
				["sbg8300_slow_speed__wifi_radio_interference","wi-fi, acceptable"],
				["sbg8300_slow_speed__wifi_congestion","wired - both, acceptable"]
			]
		},
		"sbg8300_slow_speed__adjustcsl":
		{
			"Question": "Redirect to Internet Service Provider to adjust Cable Signal Levels",
			"Text": [ "</br>","Advise check with the service provider, the Cable Signal Status"	]
		},
		"sbg8300_slow_speed__wifi_radio_interference":
		{
			"Question": "Are the 2.4 Ghz and/or 5 Ghz radio experiencing problems?",
			"QuestionsTemplate": ["Are these networks within range?"],
			"Buttons":
			[ 
				["sbg8300_slow_speed_wifi__interference_onenetwork","Only one has interference"],
				["sbg8300_slow_speed_wifi__interference_checkspeed","Both have interference"]
			]
		},
		"sbg8300_slow_speed_wifi__interference_onenetwork":
		{
			"Question": "Test the other network. Still under performing?",
			"Text":["Guide the customer to run a speed test on speedtest.com or fast.com"],
			"QuestionsTemplate":["speed test result: "],
			"Buttons":
			[ 
				["sbg8300_slow_speed_wifi__interference_powercycle","Yes"],
			  ["sbg8300_slow_speed__wifi_congestion","No"]
			]
		},
		"sbg8300_slow_speed_wifi__interference_powercycle":
		{
			"Question": "Power cycle the gateway",
			"Text": ["Disconnect the power cord from the AC wall outlet and wait one minute"],
			"Buttons": 
			[
				["sbg8300_slow_speed_wifi__interference_check","Done"]
			]
		},
		"sbg8300_slow_speed_wifi__interference_check":
		{
			"Question": "Has the speed improved?",
			"Text": ["Check the connection after the restart"],
			"Buttons":
			[
				["resolved","Yes"],
				["sbg8300_slow_speed_wifi__interference_checkspeed","No"]
			]
		}, 
		"sbg8300_slow_speed_wifi__interference_checkspeed":
		{
			"Question": "Check the firewall configuration. Is speed still underperforming?",
			"Text": [ "Ask the customer to run a speed test on speedtest.com or fast.com"	],
			"Buttons":
			[
				["sbg8300_slow_speed__wifi_congestion","Yes"],
				["resolved","No"]
			]
		},
		"sbg8300_slow_speed__wifi_congestion":
		{
			"Question": "Identify an environmental Issue?",
			"Text": 
			[ "Check if the Device's Placement is correct.",
				"Check the Amount of Nearby Access Points and Change WiFi Channels to the Least Congested One."
			],
			"QuestionsTemplate":
			[
				"Amount of Nearby Access Points: ",
				"Amount of APs Found per Band: "
			],
			"Buttons": 
			[
				["sbg8300_slow_speed__wifi_interference", "Yes"],
				["sbg8300_factory_reset","No"]
			]
		},
		"sbg8300_slow_speed__wifi_interference":
		{
			"Question": "Device with high interference or congestion",
			"Text":
			[ "</br>",
				"Suggest the customer to Change the device's Location in order to decrease,",
				"Environmental Issue & Monitor Network's Performance for the next 24 hours,",
				"provide Case Number for future reference"
			]
		},







		"sbg8300_intermittent_connection":
		{
			"Comments":"Intermittent Connection procedure",
			"Question":"Intermittent Connection procedure",
			"Text": ["Verify with the customer when was the ARRIS device installed"],
			"Skips":
			[
				["checkcsl","sbg8300_intermittent_connection__wired_checkinrange"]
			],
			"QuestionsTemplate":
			[
				"When was the ARRIS device installed?: ",
				"When did the issue first appeared?: ",
				"Which type of clients are experiencing issues on the network?: "
			],
			"Buttons": 
			[
				["sbg8300_intermittent_connection__affectiontype","Done","sbg8300__intermittentConnection"]
			]
		},		

		"sbg8300_intermittent_connection__affectiontype":
		{
			"Question":"Is the issue affecting hardwired connection, via WiFi or both?",
			"Text": 
			[ 
				"If customer does not know if it happens Hardwired,",
				"as well please connect a pc hardwired to monitor performance."
			],
			"Buttons": 
			[ 
				["sbg8300_intermittent_connection__affectiontype_wifi","Wi-Fi"],
				["sbg8300_intermittent_connection__affectiontype_wired","Wired - Both"]
			]
		},
		"sbg8300_intermittent_connection__affectiontype_wifi":
		{
			"Question":"Has the customer already contacted us?",
			"Text": 
			[ 
				"Check if the Device's Placement is correct.",
				"Check the amount of nearby access points and change wifi channels to the least congested one.",
				"Changed wifi channels, device's location and monitored performance?"	
			],
			"QuestionsTemplate":
			[
				"Device's Placement is correct?: ",
				"How many APs found per band?: ",
				"(Only if applicable) Which Wi-Fi channels are the least congested?: ",
				"(Only if applicable) : Number of the case that the client previously contacted us: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["sbg8300_intermittent_connection__affectiontype_monitorperformance","No"]
			]
		},
		"sbg8300_intermittent_connection__affectiontype_monitorperformance":
		{
			"Question":"Monitor Network's Performance for the Next 24 hours",
			"Text": 
			[ 
				"<br>",
				"***Provide Case Number for future reference."
			]
		},
		"sbg8300_intermittent_connection__affectiontype_wired":
		{
			"Question":"Any changes in the network when the issue started?",
			"Noteheight":"8rem",
			"QuestionsTemplate":
			[
				"Any changes in the network when the issue started?: ",
				"How often and what time of day does the issue occur?: ",
				"Was a power cycle performed?",
				"How many times has the customer power cycled the device?: ",
				"Is there splitter, amplifier, switch, or damaged coax cable?: ",
				"Is the ethernet cable Damaged?: "
			],
			"Buttons": 
			[ 
				["sbg8300_intermittent_connection__wired_checkreboot","Done"] 
			]
		},		
		"sbg8300_intermittent_connection__wired_checkreboot":
		{
			"Question":"Does the ARRIS device reboot on its own?",
			"Buttons": 
			[ 
				["device_rebooting__device","Yes","gateway__wired"],
				["sbg8300_intermittent_connection__wired_confirmcsl","No"]
			]
		},
		"sbg8300_intermittent_connection__wired_confirmcsl":
		{
			"Question":"Were Cable Signal Levels previously Checked by us in other case or note?",
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["sbg8300_intermittent_connection__wired_checkcsl","No"]
			]
		},
		"sbg8300_intermittent_connection__wired_checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": 
			[	
				"Access GUI and Check Cable Signal Levels"				
			],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["sbg8300_factory_reset","No","checkcsl"]
			]
		},
		"sbg8300_intermittent_connection__wired_checkinrange":
		{ 
			"Question": "Cable signal levels are range now?",
			"Text": [ "Enter on GUI and check cable signal levels, one more time"	],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],				
			"Buttons":
			[ 
				["sbg8300_intermittent_connection__affectiontype_monitorperformance","Yes"],
			  ["sbg8300_slow_speed__adjustcsl","No"]
			]
		}

		

   }
}