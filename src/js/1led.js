{
  "comments" : [
		"1led flowchart"	
	],
  "title" : "SURFboard Troubleshooting Tool",

  "steps" : {
		"START" : {
			"Question" : "1led?"
		},

		"1led__checkled" :
		{
			"Question" : "What is the status of the LED?",
			"Text" : 
			[
			  "***When troubleshooting a Gateway/Modem with a combined US/DS LED,",
				"***refer to the following table to set the Receive/Send LED accordingly"
			],
			"Table" : 
			[			
				["***Power Off", "The light does not turn on"],			
				["***Solid Amber", "Device is on / Hardware fail"],			
				["***Fast or Slow blinking","Not internet access"],					
				["***Solid Blue","Device is online, Docsis 3.1"],	
				["***Solid Green","Device is online, Docsis 3.0"]	
			],
			"Buttons" : 
			[
				["1led_poweroff_power_on_fail","Power Off"],
				["1led_poweroff_hardware_fail","Solid Amber"],
				["1led_not_internet_access","Blinking"],
				["1led_not_service","Solid Green - Blue"]
			]
		},







		"1led_poweroff_power_on_fail": 
		{
			"Comments": "Power on fail procedure", 
			"Question": "Try a different power outlet and/or cord.",
			"Text" : ["Check physical connection, use different cord/outlet "],
			"Skips" : 
			[
				["reset", "1led_poweroff_hardware_fail"],
				["power", "replace_unit"]
			],
			"Buttons" : 
			[
				["1led__checkled","Done","reset","power"]
			]
		},





		"1led_poweroff_hardware_fail": 
		{
			"Comments": "Power on hardware fail procedure", 
			"Question": "Perform a factory reset.",
			"Text" : 
			[ 
				"If it is a Gateway advise this action will erase all previous connectivity configurations set by the cable provider",
				"and all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"For SBG series, hold the reset button for at least 20 seconds and release it", 
				"For SB series, follow the steps below:",  
				"1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).",
				"2) Go to Configuration, then click Reset All Defaults or Restore Factory Defaults", 
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Skips" : 
			[	
				["replace","replace_unit"]	
			],			
			"Buttons" :
			[	
				["1led__checkled", "Factory reset modem", "replace"]	
			]
		},




		"1led_first_time_setup" : 
		{
			"Comments": "This procedure is for first time setup",
			"Question" : "Is this first time setup?",
			"Text": 
			[
				"If this is first time setup,", 
				"there is a higher chance the problem will be related to provisioning."
			],
			"Popmsg" : "If this is first time setup, there is a higher chance the problem will be related to provisioning.",
			"Skips" : 
			[
				["reprovision","redirect_toprovision"]
			],
			"Buttons" : 
			[ 
				["1led_other_modems","Yes","reprovision"],
			  ["1led__check_connection", "No","reprovision"]
			]
		},
		"1led_other_modems" : {
			"Question" : "Disconnect Previous modem from the network",
			
			"Text": 
			[
				"If the previous modem is still connected to the network,",
				"disconnect and restart the new modem",
				"If it is a new house, check the coax outlet on the wall"
			],

			"Buttons" : 
			[ 
				["1led_check_activation", "Done"] 
			]
		},
		"1led_check_activation":
		{
			"Question": "Was the unit already activated with the ISP?",
			"Text": ["Verify if the customer has already provided the HFC MAC ID to the service provider"],
			"Buttons": 
			[	
				["1led_factory_reset","Yes"],
				["self_activation_procedure","No"]
			]
		},
		"1led_self_activation":
		{
			"Question": "Call Service Provider Page Procedure"
		},









		"1led_not_internet_access": 
		{
			"Comments": "Not internet access procedure",
			"Question": "Is the coaxial cable properly connected?",
			"Text": ["Check physical connections"],	
			"Skips":
			[  
				["provision_remotly","1led_redirect_toprovision" ],	
				["tocheckgui","1led_not_internet_access__checkgui"] 
			],
			"Buttons" :
			[ 
				["1led_not_internet_access__checkgui","Yes"],
				["1led_not_internet_access__checkcables","No"]
			]	
		},
		"1led_not_internet_access__checkcables":
		{
			"Question": "Physical connections corrected and properly connected?",
			"Text": ["Troubleshoot physical connections"],
			"Buttons" :
			[ 
				["1led_not_internet_access__checkgui","Done"] 
			]	
		},
		"1led_not_internet_access__checkgui":
		{
			"Question": "Check if web interface login page is reachable, Is it?",
			"Text": ["Guide the customer to web interface"],
			"Skips": 
			[
				["tocheckgui","1led_redirect_toprovision__factoryreset"]
			],			
			"Buttons" :
			[ 
				["1led_not_internet_access__checkfirsttime","Yes","tocheckgui"],
			  ["1led_not_internet_access__nogui","No","tocheckgui"]
		  ]	
		},
		"1led_not_internet_access__checkfirsttime":
		{
			"Question": "Is this the ARRIS device's first time setup/installation?",	
			"Buttons" :
			[ 
				["1led_factory_reset","Yes","tocheckgui"],
			  ["1led_not_internet_access__checkfirsttime_reboot","No","tocheckgui"]
		  ]	
		},
		"1led_not_internet_access__checkfirsttime_reboot":
		{
			"Question": "Power Cycle the ARRIS Unit",	
			"Buttons" :
			[ 
				["1led__checkled","Done","provision_remotly"] 
			]	
		},
		"1led_redirect_toprovision":
		{
			"Question": "Have we already redirected the Customer to try provisioning again?",
			"Text": 
			[	
				"***There MUST be an existing case or note where the customer",
				"***was already redirected to the Service Provider from our end."
			],
			"QuestionsTemplate":
			[
				"Case number: "
			],
			"Skips":
			[
				["toreplace_unit","replace_unit"]
			],			
			"Buttons": 
			[
				["1led_redirect_toprovision__factoryreset","Yes"],
				["provision_remotly","No"]
			]
		},
		"provision_remotly" : {
			"Question" : "Redirect to service provider for Address internet connectivity.",
			"Text":
			[	"<br>",
				"***Redirect the customer to ISP for the ISP to: Address internet connectivity issues by checking",
				"***their lines remotely or if needed physically with a Technician"
			]
		},
		"1led_redirect_toprovision__factoryreset":
		{
			"Question": "Was a factory reset done before?",			
			"Buttons": 
			[
				["replace_unit","Yes"],
				["1led_factory_reset","No"]
			]
		},
		"1led_not_internet_access__nogui":
		{
			"Question": "Troubleshoot web interface access",
			"Text": 
			[
				"Guide the customer to troubleshoot the web interface access",
				"Suggest a factory reset solution"
			],
			"Skips":
			[
				["nogui","replace_unit"]
			],
			"Buttons" :
			[ 
				["1led_not_internet_access__checkgui","Done","nogui"] 
			]
		},








		"1led_factory_reset":
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
				["toprovision","redirect_toprovision"],
				["ThirdPartyRouter","1led_not_service__thirdpartymanufacturer"],
			  ["1ledtoprovision","1led_redirect_toprovision"],
				["toreplace_unit","replace_unit"]
		  ],
			"Buttons": 
			[ 
				["1led__checkled","Done","1ledtoprovision","toprovision","toreplace_unit"],
			  ["1led__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},
		"1led_factory_reset_media_disconnected":
		{
			"Comments": "Factory reset procedure",
			"Question": "Perform a factory reset on the Arris device",
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
				["ThirdPartyRouter","1led_not_service__thirdpartymanufacturer"],
				["toreplace_unit","replace_unit"]
		  ],
			"Buttons": 
			[ 
				["1led__checkled","Done","toreplace_unit"],
			  ["1led__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},
		"1led__stop": 
		{
			"Question": "Incomplete Troubleshooting"
		},
		"1led__check_connection": 
		{
			"Question": "Troubleshoot physical connections and power cycle the ARRIS unit",
			"Text": ["Check if GUI's Login Page is Reachable."],
			"Skips":
			[
				["toreset","1led_factory_reset"]
			],
			"Buttons" : 
			[
				["1led__checkled","Done","toreset"]
			]
		},










		"1led_not_service": 
		{
			"Comments": "Not service procedure",
			"Question": "Can customer get online?",
			"Text": ["Verify with the Cx if have internet access trying to go any website, such cnn.com/foxnews.com"],
			"Buttons": 
			[
				["1led_service_status","Yes"],
				["1led_not_service_bypass","No"]
			]
		},
		"1led_service_status":
		{
			"Question": "Is the customer experiencing connectivity issues?",
			"Text": ["***Slow Speed or Intermittent Connection"],
			"Buttons": 
			[
				["resolved","No"],
				["1led_slow_speed","Yes, slow speed"],
				["1led_intermittent_connection","Yes, intermittent connection"]
			]
		},
		"1led_not_service_bypass":
		{
			"Question": "How is the customer connected to the modem?",
			"QuestionsTemplate": ["Can the customer connect directly using a ethernet cable?"],
			"Skips":
			[
				["media_disconnected","1led_factory_reset_media_disconnected"],
				["bypassReset","redirect_toprovision"],
				["isp_activation","self_activation_procedure"]
			],
			"Buttons": 
			[	
				["1led_not_service_checkinternet","Hardwired Modem","bypassReset"],
				["1led_not_service_checkinternet","Hardwired Gateway","bypassReset"],
				["1led_not_service_checkinternet","Wi-Fi","bypassReset"],
				["1led_not_service_bridge","Using 3rd party router, unable to bypass"]
			]
		},
		"1led_not_service_bridge": 
		{
			"Question": "Can the customer bypass the external router",
			"Buttons": 
			[	
				["1led_not_service_bypassrouter","Bypass the router"],
				["1led_not_service_unable_bypassrouter","Unable to bypass the router","ThirdPartyRouter"]
			]
		},
		"1led_not_service_bypassrouter": 
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
				["1led_not_service_checkinternet","Done"]
			]
		},
		"1led_not_service_unable_bypassrouter":
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
				["1led_not_service_checkinternet","Done"]
			]
		},
		"1led_not_service_checkinternet":
		{
			"Question": "Try accessing a website. Can the customer get online?",
			"Text": ["Verify if the customer has internet access, ask them to go to any website, such as cnn.com/foxnews.com"],			
			"Buttons": 
			[
				["1led_not_service_online","Yes"],
				["1led_not_service_first_setup","No"]
			]
		},
		"1led_not_service_first_setup": 
		{
			"Question": "Is this the first time setup?",
			"Text": ["There is a higher chance the problem will be related to provisioning."],
			"Skips":
			[ 
				["checkIP","1led_not_service_check_ip_dns"]
			],
			"Buttons": 
			[ 
				["1led_other_modems", "Yes","isp_activation"], 
				["1led_not_service_check_ip_dns","No","checkIP"]
			]
		},
		"1led_not_service_online":
		{
			"Question": "Can the customer connect to internet through Wi-Fi?",
			"Buttons":
			[	
				["resolved","Yes"],
				["1led_not_service_check_ip_dns","No"]	
			]
		},
		"1led_not_service__thirdpartymanufacturer":
		{
			"Question": "Redirect the Customer to Third Party Manufacturer",
			"Text": 
			[	
				"<br>",
				"***Suggest to acquire a device that could be connected Hardwired to the ARRIS and Call us Back",
				"***Provide Case Number to Customer"
			]
		},












		"1led_not_service_check_ip_dns":
		{
			"Comments": "Procedure for check the IP, DNS",
			"Question": "Can the customer access the modem GUI?",
			"Text": 
			[ 
				" ► Check the IP address on the device",
				" ► You can use any device, for check the ip segment 192.168.*.*"
			],
			"QuestionsTemplate":
			[
				"IP address: ",
				"DNS address: "
			],
			"Skips":
			[
				["checkIPreset","1led_factory_reset"]
			],
			"Buttons": 
			[ 
				["1led_factory_reset","Yes","checkIPreset"], 
				["1led_not_service_ping","No"] 
			]
		},
		"1led_not_service_ping":
		{
			"Question": "Make a ping procedure [ or tracert, only applicable on windows terminal ]",
			"Text": 
			[ 
				" ► Have the customer a device compatible with a terminal for ping procedure?",
				" ► On Windows press 'win + R' type 'cmd', 'terminal' , or 'powershell'",
				" ► On MacOS press command + space bar on your Mac Keyboard, type 'terminal'"
			],
			"Skips":
			[
				["checkPingreset","1led_factory_reset"]
			],
			"Buttons": 
			[ 
				["1led_factory_reset","Yes, have a response","checkPingreset"], 
				["1led_not_service_disconnect_coax","Not response, time out"] 
			]
		},
		"1led_not_service_disconnect_coax":
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
				["1led_not_service_reconnect_coax","Yes"], 
				["1led_not_service_check_ipv4","No"] 
			]
		},
		"1led_not_service_reconnect_coax":
		{
			"Question": "Connect coax cable and check if the Customer get online?",
			"Text": 
			[ 
				"*** Connect the coax cable on the modem",
				" ► Reconnect the coaxial cable and wait for the correct LEDs Status "	
			],
			"Buttons": 
			[ 
				["1led__checkled","Yes"], 
				["redirect_toprovision","No"] 
			]
		},
		"1led_not_service_check_ipv4":
		{
			"Question": "Check IPv4 address, Check DNS",
			"Text": 
			[ "*** On windows",
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
				"IPv4 address: ",
				"DNS address: "
			],
			"Buttons": 
			[ 
				["1led_not_service_check_gui","192.168.*.*"], 
				["1led_factory_reset","169.254.*.*"],
				["1led_not_service_media_disconnected","Media disconnected","media_disconnected"] 
			]
		},
		"1led_not_service_check_gui":
		{
			"Question": "Access to GUI restored?",
			"Skips":
			[ 
				["checkGUIreset","1led_factory_reset"] 
			],
			"Buttons": 
			[ 
				["1led__checkled", "Yes"], 
				["1led_factory_reset","No","checkGUIreset"] 
			]
		},
		"1led_not_service_media_disconnected":
		{
			"Question":"Try with a different ethernet cord and a different device",
			"Text": ["***Restart the gateway"],
			"Buttons":
			[
				["1led__checkled","Done"]
			]
		},






		"1led_slow_speed":
		{
			"Comments": "Slow speed procedure",
			"Question": "Has the customer experienced this issue before?",
			"Text":
			[ 
				"Is there a case where the customer has contacted us before to check cable signal levels",
				"or monitor network performance after checking Wi-Fi channels?"
			],
			"QuestionsTemplate":
			[
				"Case number: ",
        "Speed test result: "
			],
			"Skips":
			[
				["slowspeedReset","redirect_toprovision"]
			],			
			"Buttons":
			[ 
				["replace_unit","Yes"],
				["1led_slow_speed__select","No","slowspeedReset"]
			]
		},
		"1led_slow_speed__select":
		{
			"Question": "Device type",
			"Buttons":
			[
				["1led_slow_speed__modem","Modem"],
				["1led_slow_speed__gateway","Gateway"]
			]
		},
		"1led_slow_speed__redirect_manufacturer":
		{
			"Question": "Redirect to 3rd party manufacturer.",
			"Text": ["<br>","Offer AA if applicable"]
		},






		"1led_slow_speed__modem":
		{
			"Question":"Is the customer experiencing through a separate router or hardwired modem?",
			"Buttons":
			[ 
				["1led_slow_speed__modem_separeterouter","Separate router"],
				["1led_slow_speed__modem_checkcsl","Directly connected to the modem"]
			]
		},
		"1led_slow_speed__modem_checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": [	"Access GUI and Check Cable Signal Levels" ],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ 
				["1led_factory_reset","Yes"],
				["1led_slow_speed__modem__adjustcsl","No"]
			]
		},
		"1led_slow_speed__modem__adjustcsl":
		{
			"Question": "Redirect to internet service provider to adjust cable signal levels",
			"Text": ["<br>","***Advise check with the service provider, the Cable Signal Status"]
		},
		"1led_slow_speed__modem_separeterouter":
		{
			"Question":"How many clients are affected on the network?",
			"Buttons":
			[ 
				["1led_slow_speed__modem_separeterouter_allclients","All clients"],
				["1led_slow_speed__modem_separeterouter_someclients","Some clients"],
				["1led_slow_speed__redirect_manufacturer","One client"]
			]
		},
		"1led_slow_speed__modem_separeterouter_allclients":
		{
			"Question":"Can the customer directly connect a device to the modem? (Bypassing the router)",
			"Buttons":
			[ 
				["1led_slow_speed__modem_bypassrouter","Yes"],
				["1led_slow_speed__modem_unable_bypassrouter","No"]
			]
		},
		"1led_slow_speed__modem_bypassrouter": 
		{
			"Question": "bypassing the router",
			"Text": 
			[	
				"***Steps to bypass the router: ",
				"► - Power off modem, router and pc.",
				"► - Check if the ethernet cord is properly connected from the modem to the computer.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the modem are solid, power on the pc.",
				"► - Continue troubleshooting."
			],
			"Buttons": 	
			[	
				["1led_slow_speed__modem_checkspeed","Done"]
			]
		},
		"1led_slow_speed__modem_unable_bypassrouter":
		{
			"Question": "Unable bypass the router",
			"Text": 
			[
				"***Steps to power cycle the router: ",
				"► - Power off modem & router.",
				"► - Check if the ethernet cord is properly connected from the modem to the router.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the Modem are solid, power on the router.",
				"► - Continue Troubleshooting."
			],
			"Buttons": 
			[	
				["1led_slow_speed__modem_checkgui","Done"]
			]
		},
		"1led_slow_speed__modem_checkgui":
		{
			"Question": "Access GUI and check cable signal levels",
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[	
				["1led_slow_speed__modem_checkcsl","GUI Accessed"],
				["1led_slow_speed__modem_nogui","Unable to access GUI"]
			]
		},
		"1led_slow_speed__modem_nogui":
		{
			"Question": "Redirect the Customer to Third Party Manufacturer",
			"Text": 
			[	
				"<br>",
				"***Suggest to acquire a Device that could be connected Hardwired to the modem and Call us Back",
				"***Provide Case Number to Customer"
			]
		},
		"1led_slow_speed__modem_separeterouter_someclients":
		{
			"Question":"Power cycle the router. Did the speed improve?",
			"Buttons":
			[ 
				["1led_slow_speed__modem_checkspeed","Yes"],
				["1led_slow_speed__redirect_manufacturer","No"]
			]
		},
		"1led_slow_speed__modem_checkspeed":
		{
			"Question": "Is the Internet Speed Still Underperforming?",
			"Text":["Run a Speed Test on https://www.speedtest.net or fast.com"],
			"QuestionsTemplate":
			[
				"Speed test result: "
			],
			"Buttons":
			[	
				["1led_slow_speed__modem_checkcsl","Yes"],
				["resolved","No"]
			]
		},




		"1led_slow_speed__gateway":
		{
			"Question": "Is the issue with Wi-Fi, wired, or both?",		
			"Buttons":
			[ 
				["1led_slow_speed__gateway_tryethernet","Yes, wi-fi"],
				["1led_slow_speed__gateway__checkcsl","Yes, wired or both"]
			]
		},
		"1led_slow_speed__gateway_tryethernet":
		{
			"Question": "Does the client have a low speed ethernet connection?",
			"Text": ["Run an speedtest over ethernet"],
			"QuestionsTemplate":
			[
				"Speed test result: "
			],		
			"Buttons":
			[ 
				["1led_slow_speed__gateway__checkcsl","Yes"],
				["1led_slow_speed__gateway__wifi","The client does not use ethernet"],
				["1led_slow_speed__gateway__wifi","No"]
			]
		},
		"1led_slow_speed__gateway__wifi":
		{
			"Question": "How many clients are affected on the network?",
			"Buttons":
			[ 
        ["1led_slow_speed__redirect_manufacturer","Only one client"],
        ["1led_slow_speed__gateway__wifi_radio_interference","All clients are affected"]
			]
		},
		"1led_slow_speed__gateway__checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": ["Access GUI and Check Cable Signal Levels"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ 
				["1led_slow_speed__gateway__adjustcsl","No"],
				["1led_factory_reset","wi-fi, acceptable"],
				["1led_factory_reset","wired - both, acceptable"]
			]
		},
		"1led_slow_speed__gateway__adjustcsl":
		{
			"Question": "Redirect to Internet service provider to adjust cable signal levels",
			"Text":	["<br>","***Advise check with the service provider, the Cable Signal Status" ]
		},
		"1led_slow_speed__gateway__wifi_radio_interference":
		{
			"Question": "Are the 2.4 Ghz and/or 5 Ghz radio experiencing problems?",
			"QuestionsTemplate":
			[
				"Make an speed test, and paste results: ",
				"Check if the Device's Placement is correct: ",
				"Number of nearby access points: ",
				"Number of APs found per band: "
			],
			"Buttons":
			[ 
				["1led_slow_speed__gateway_wifi__interference_onenetwork","Only one has interference"],
				["1led_slow_speed__gateway_wifi__interference_checkspeed","Both have interference"]
			]
		},
		"1led_slow_speed__gateway_wifi__interference_onenetwork":
		{
			"Question": "Try the other network. Still underperforming?",
			"Text":["Guide to speedtest.net or fast.com and do a speed test"],
			"QuestionsTemplate": ["Speed test result: "],
			"Buttons":
			[ 
				["1led_slow_speed__gateway_wifi__interference_powercycle","Yes"],
			  ["1led_slow_speed__gateway__wifi_congestion","No"]
			]
		},
		"1led_slow_speed__gateway_wifi__interference_powercycle":
		{
			"Question": "Power cycle the Gateway and check if the speed improved",
			"Text": 
			[
				"Disconnect the power cord from the AC wall outlet and wait one minute",
				"Check the connection after the restart"
			],
			"QuestionsTemplate":
			[
				"Speed test result:"
			],
			"Buttons": 
			[
				["resolved","Yes"],
				["1led_slow_speed__gateway_wifi__interference_checkspeed","No"]
			]
		}, 
		"1led_slow_speed__gateway_wifi__interference_checkspeed":
		{
			"Question": "Check the firewall configuration. Is speed still underperforming?",
			"Text": ["Ask the customer to run a speed test on speedtest.com or fast.com"],
			"QuestionsTemplate": ["Speed test result: "],
			"Buttons":
			[
				["1led_slow_speed__gateway__wifi_congestion","Yes"],
				["resolved","No"]
			]
		},
		"1led_slow_speed__gateway__wifi_congestion":
		{
			"Question": "Identify signs of Wi-Fi interference",
			"Text": 
			[ 
				"Relocate your wireless router away from nearby routers, appliances and dense building materials.",
				"Unplug the appliances and devices when not in use.",
				"Avoid using too many wireless gadgets at the same time within close proximity of each other.",
				"Check the Amount of Nearby Access Points and Change Wi-Fi Channels to the Least Congested One."
			],
			"QuestionsTemplate":
			[
				"Check if the Device's Placement is correct: ",
				"Number of nearby access points: ",
				"Number of APs found per band: ",
				"Less congested Wi-Fi channels: "
			],
			"Buttons": 
			[
				["1led_slow_speed__gateway__wifi_interference", "Yes"],
				["1led_slow_speed__gateway__checkcsl", "No"]
			]
		},
		"1led_slow_speed__gateway__wifi_interference":
		{
			"Question": "Device with high interference or congestion",
			"Text":
			[ 
				"</br>",
				"Suggest the customer to Change the device's Location in order to decrease,",
				"Environmental Issue & Monitor Network's Performance for the next 24 hours,",
				"Provide Case Number for future reference"
			]
		},












		"1led_intermittent_connection":
		{
			"Comments":"Intermittent Connection procedure",
			"Question":"Intermittent Connection procedure",
			"Text": ["Verify the following details"],
			"Skips":
			[	
				["checkcsl","1led_intermittent_connection__gateway__wired_checkinrange"],
				["device_rebooting__gateway_replace","replace_unit"],
				["device_rebooting","1led_intermittent_connection__modem_confirmcsl"],
				["checkcslmodem","1led_intermittent_connection__modem_checkinrange"]

			],
			"Noteheight": "8rem",
			"QuestionsTemplate":
			[
				"When was the ARRIS device installed?: ",
				"When did the issue first appeared?: ",
				"Any changes in the network when the issue started?: ",
				"How often and what time of day does the issue occur?: ",
				"Was a power cycle performed?: ",
				"How many times has the customer power cycled the device?: ",
				"Is there splitter, amplifier, switch, or damaged coax cable?: ",
				"Is the ethernet cable Damaged?: "
			],
			"Buttons": 
			[
				["1led_intermittent_connection__firstappeared","Done"]
			]
		},		
		"1led_intermittent_connection__firstappeared":
		{
			"Question":"Select device type",
			"Buttons": 
			[	
				["1led_intermittent_connection__modem","modem"],
				["1led_intermittent_connection__gateway","gateway"]
			]
		},



		"1led_intermittent_connection__modem":
		{
			"Question":"Issue happening hardwired to the modem or through a Router?",
			"Buttons": 
			[	
				["1led_intermittent_connection__modem_throughrouter","Through Router"],
				["1led_intermittent_connection__modem_reboot","Hardwired"]
			]
		},
		"1led_intermittent_connection__modem_throughrouter":
		{
			"Question":"Can you connect direclty to the Modem, bypass Router?",
			"Buttons": 
			[	
				["1led_intermittent_connection__modem_reboot","Yes"],
				["1led_intermittent_connection__modem_reboot","No"]
			]
		},	
		"1led_intermittent_connection__modem_reboot":
		{
			"Question":"Does the ARRIS device reboot on its own?",			
			"Buttons": 
			[ 
				["1led_intermittent_connection__modem_rebooting_steps","Yes"],
				["1led_intermittent_connection__modem_confirmcsl","No"]	
			]
		},
		"1led_intermittent_connection__modem_rebooting_steps":
		{
			"Question":"Disconnect coax cable",
			"QuestionsTemplate":
			[
				"Is the device still rebooting on its own even with the coax out?: "
			],
			"Buttons": 
			[ 
				["device_rebooting__device","Yes","rebooting__coax__out","device_rebooting","modem","group1led"],
				["1led_intermittent_connection__modem_confirmcsl","No"]	
			]
		},
		"1led_intermittent_connection__modem_confirmcsl":
		{
			"Question":"Were Cable Signal Levels previously Checked by us in other case or note?",
			"QuestionsTemplate":
			[
				"Case number: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["1led_intermittent_connection__modem_checkcsl","No"]	
			]
		},
		"1led_intermittent_connection__modem_checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text":	["Enter on GUI and check cable signal levels, one more time"],
				"QuestionsTemplate":
				[
					"Downstream Power Level: ",
					"Downstream SNR Level: ",
					"Upstream Power Level: "
				],
			"Buttons": 
			[ 
				["replace_unit","In range"],
				["1led_intermittent_connection__modem_csl_inrange_through_router","In range, Through Router"],	
				["1led_factory_reset","Not in range","checkcslmodem"]	
			]
		},
		"1led_intermittent_connection__modem_csl_inrange_through_router":
		{
			"Question": "Issue only affecting through router?",
			"Buttons": 
			[ 
				["1led_intermittent_connection__modem_redirect_manufacturer","Yes"],
				["replace_unit","No"]				
			]
		},
		"1led_intermittent_connection__modem_redirect_manufacturer":
		{
			"Question": "Redirect to 3rd party manufacturer.",
			"Text": ["<br>","Offer AA if applicacble"]
		},
		"1led_intermittent_connection__modem_checkinrange":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": ["Enter on GUI and check cable signal levels, one more time"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ 
				["1led_intermittent_connection__modem_monitorperformance","In range"],
				["1led_slow_speed__modem__techvisit","Not in range"]
			]
		},
		"1led_slow_speed__modem__techvisit":
		{
			"Question": "Redirect to Internet Service Provider to adjust Cable Signal Levels",
			"Text": ["<br>","***Ask for a Tech's Visit to Adjust Cable Signal Levels"]
		},
		"1led_intermittent_connection__modem_monitorperformance":
		{
			"Question": "Monitor Network's Performance",
			"Text": 
			[ 
				"<br>",
				"For the Next 24 hours,Monitor Network's Performance",
				"***Provide case number for future reference"
			]
		},





		"1led_intermittent_connection__gateway":
		{
			"Question":"Which type of clients are experiencing issues on the network?",
			"Text": ["i.e Wi-Fi laptop, Wi-Fi printer, Wired gaming console, iPhone"],
			"Buttons": 
			[
				["1led_intermittent_connection__gateway__affectiontype","Done"]
			]
		},
		"1led_intermittent_connection__gateway__affectiontype":
		{
			"Question":"Is the issue affecting hardwired connection, via Wi-Fi or both?",
			"Text": 
			[ 
				"If customer does not know if it happens Hardwired,",
				"as well please connect a pc hardwired to monitor performance."
			],
			"Buttons": 
			[ 
				["1led_intermittent_connection__gateway__affectiontype_wifi","Wi-Fi"],
				["1led_intermittent_connection__gateway__wired_checkreboot","Wired - Both"]
			]
		},
		"1led_intermittent_connection__gateway__affectiontype_wifi":
		{
			"Question":"Has the customer already contacted us?",
			"Text": 
			[
				"Check if the Device's Placement is correct.",
				"Check the amount of nearby access points and change Wi-Fi channels to the least congested one.",
				"Type on the comment field below the amount of APs found per band",
				"Changed Wi-Fi channels, device's location and monitored performance?"	
			],
			"QuestionsTemplate":
			[
				"Case number: ",
				"Amount of APs Found per Band: ",
				"Wi-Fi channel least congested: ",
				"Changed Wi-Fi channels: ",
				"Device's location: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["1led_intermittent_connection__gateway__affectiontype_monitorperformance","No"]
			]
		},
		"1led_intermittent_connection__gateway__affectiontype_monitorperformance":
		{
			"Question":"Monitor Network's Performance for the Next 24 hours",
			"Text": ["<br>","***Provide Case Number for future reference."]
		},		
		"1led_intermittent_connection__gateway__wired_checkreboot":
		{
			"Question":"Does the ARRIS device reboot on its own?",
			"Buttons": 
			[ 
				["device_rebooting__device","Yes","gateway__wired"],
				["1led_intermittent_connection__gateway__wired_confirmcsl","No"]
			]
		},
		"1led_intermittent_connection__gateway__wired_confirmcsl":
		{
			"Question":"Were Cable Signal Levels previously Checked by us in other case or note?",
			"QuestionsTemplate":
			[
				"Case number: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["1led_intermittent_connection__gateway__wired_checkcsl","No"]
			]
		},
		"1led_intermittent_connection__gateway__wired_checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text": ["Access GUI and Check Cable Signal Levels"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
		
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["1led_factory_reset","No","checkcsl"]
			]
		},
		"1led_intermittent_connection__gateway__wired_checkinrange":
		{ 
			"Question": "Cable signal levels are range now?",
			"Text": ["Enter on GUI and check cable signal levels, one more time"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons":
			[ 
				["1led_intermittent_connection__gateway__affectiontype_monitorperformance","Yes"],
			  ["1led_slow_speed__gateway__adjustcsl","No"]
			]
		}


  
	}
}