{
  "comments" : [
		"3led flowchart"	
	],
  "title" : "SURFboard Troubleshooting Tool",

  "steps" : {
		"START" : {
			"Question" : "3led?"
		},

		"3led__checkled": 
		{
			"Question" : "Ask the customer how the Power, US/DS, Online LEDs are",
			"Popmsg" : "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"Text" : 
			[
				"***When troubleshooting a Gateway/Modem with a combined US/DS LED,",
				"***refer to the following table to set the US/DS LED accordingly"
			],
			"Table" : 
			[			
				["***Power Off", "No ligths turning on","***[ off ] [ off ] [ off ]"],			
				["***Solid Amber / Blue", "Device is on / Hardware fail","***[ solid ] [ off ] [ off ]"],			
				["***Fast or Slow blinking","Not internet access", "***[ solid ] [ flashing ] [ off ]"],					
				["***Solid Blue","Fisrt time setup", "***[ solid ] [ solid ] [ flashing ]"],
				["***Solid Blue","Device is online", "***[ solid ] [ solid ] [ solid ]"]
			],
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
		},




		"3led_poweroff_power_on_fail": 
		{
			"Comments": "Power on fail procedure", 
			"Question": "Try a different power outlet and/or cord.",
			"Text" : ["Check physical connection, use different cord/outlet "],
			"Skips" : 
			[
				["reset", "3led_poweroff_hardware_fail"],
				["power", "replace_unit"]
			],
			"Buttons" : 
			[
				["3led__checkled","Done","reset","power"]
			]
		},





		"3led_poweroff_hardware_fail": 
		{
			"Comments": "Power on hardware fail procedure", 
			"Question": "Perform a factory reset.",
			"Text" : 
			[ 
				"If it is a Gateway advise this action will erase all previous connectivity configurations set by the cable provider",
				"and erases all custom configurations set up by the user.",
				"Or provisioning errors stored in the modem that could prevent the modem from locking into the correct channels.",
				"For SBG series, hold the reset button for at least 20 seconds and release it", 
				"For SB series, follow the steps below:",  
				"1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).",
				"2) Go to Configuration, then click Reset All Defaults or Restore Factory Defaults", 
				"Restart Cable Modem or Reboot, or powercycle the modem"
			],
			"Skips" : 
			[	
				["replace", "replace_unit"]	
			],			
			"Buttons" :
			[	
				["3led__checkled", "Factory reset modem", "replace"]	
			]
		},







		"3led_first_time_setup" : 
		{
			"Comments": "This procedure is for first time setup",
			"Question" : "Is this first-time setup?",
			"Text": 
			[
				"If this is first-time setup,", 
				"there is a higher chance the problem will be related to provisioning."
			],
			"Popmsg" : "If this is first-time setup, there is a higher chance the problem will be related to provisioning.",
			"Skips" : 
			[
				["reprovision","redirect_toprovision"]
			],
			"Buttons" : 
			[ 
				["3led_other_modems","Yes","reprovision"],
			  ["3led__check_connection", "No","reprovision"]
			]
		},
		"3led_other_modems" : {
			"Question" : "Disconnect Previous modem from the network",			
			"Text": 
			[
				"If the previous modem is still connected to the network,",
				"disconnect and restart the new modem",
				"If it is a new house, check the coax outlet on the wall"
			],

			"Buttons" : 
			[ 
				["3led_check_activation", "Done"] 
			]
		},
		"3led_check_activation":
		{
			"Question": "Was the unit already activated with the ISP?",
			"Text": ["Verify if the customer has already provided the HFC MAC ID to the service provider"],
			"Buttons": 
			[	
				["3led_factory_reset","Yes"],
				["self_activation_procedure","No"]
			]
		},









		"3led_not_internet_access": 
		{
			"Comments": "Not internet access Procedure",
			"Question": "The customer has TV service from same provider as Internet, is it working?",			
			"Skips":
			[
				["reset","3led_factory_reset"],
				["provision_remotly","3led_redirect_toprovision" ],	
				["tocheckgui","3led_not_internet_access__checkgui"] 
			],
			"Buttons" :
			[ 
				["3led__check_tvconnection","Yes, TV working","reset"],
				[ "checksignal","Yes, TV not working"],
				["3led__check_tvconnection","Not TV suscription","reset"]
			]	
		},
		"3led__check_tvconnection": 
		{
			"Question": "Troubleshoot physical connections and Power Cycle the ARRIS Unit",
			"Text": ["Troubleshoot physical connections and Power Cycle the ARRIS Unit"],
			"Skips":
			[
				["toreset","3led_factory_reset"]
			],
			"Buttons" : 
			[
				["3led__checkled","Done","toreset"]
			]
		},
		"3led_not_internet_access__checkcables":
		{
			"Question": "Physical connections corrected and properly connected?",
			"Text": ["Troubleshoot physical connections"],
			"Buttons" :
			[ 
				["3led_not_internet_access__checkgui","Done"] 
			]	
		},
		"3led_not_internet_access__checkgui":
		{
			"Question": "Check if web interface login page is reachable, Is it?",
			"Text": ["Guide the customer to web interface"],
			"Skips": 
			[
				["tocheckgui","3led_redirect_toprovision__factoryreset"]
			],	
			"Buttons" :
			[ 
				["3led_not_internet_access__checkfirsttime","Yes","tocheckgui"],
			  ["3led_not_internet_access__nogui","No","tocheckgui"]
		  ]	
		},
		"3led_not_internet_access__checkfirsttime":
		{
			"Question": "Is this the ARRIS device's first time setup/installation?",		
			"Buttons" :
			[ 
				["3led_factory_reset","Yes","tocheckgui"],
			  ["3led_not_internet_access__checkfirsttime_reboot","No","tocheckgui"]
		  ]	
		},
		"3led_not_internet_access__checkfirsttime_reboot":
		{
			"Question": "Power Cycle the ARRIS Unit",	
			"Buttons" :
			[ 
				["3led__checkled","Done","provision_remotly"] 
			]	
		},
		"3led_redirect_toprovision":
		{
			"Question": "Have we already redirected the Customer to try provising again?",
			"Text": 
			[	
				"***There MUST be an existing case or note where the customer",
				"***was already redirected to the Service Provider from our end."
			],
			"Skips":
			[
				["toreplace_unit","replace_unit"]
			],			
			"Buttons": 
			[
				["3led_redirect_toprovision__factoryreset","Yes"],
				["provision_remotly","No"]
			]
		},
		"provision_remotly" : 
		{
			"Question" : "Redirect to service provider for Address internetconnectivity.",
			"Text":
			[
				"***Redirect the customer to ISP for the ISP to: Address internet connectivity issues by checking",
				"***their lines remotely or if needed physically with a Technician"
			]
		},
		"3led_redirect_toprovision__factoryreset":
		{
			"Question": "Was a FR performed before?",			
			"Buttons": 
			[
				["replace_unit","Yes"],
				["3led_factory_reset","No"]
			]
		},
		"3led_not_internet_access__nogui":
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
				["3led_not_internet_access__checkgui","Done","nogui"] 
			]
		},








		"3led_factory_reset":
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
			  ["3ledtoprovision","3led_redirect_toprovision"],
				["toreplace_unit","replace_unit"]
		  ],
			"Buttons": 
			[ 
				["3led__checkled","Done","3ledtoprovision","toprovision","toreplace_unit"],
			  ["3led__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},
			
		"3led_factory_reset_media_disconnected":
		{
			"Comments": "Factory reset procedure",
			"Question": "Perform a factory reset to the Arris device",			
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
				["toreplace_unit","replace_unit"]
			],
			"Buttons": 
			[ 
				["3led__checkled","Done","toreplace_unit"],
				["3led__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},

		"3led__stop": 
		{
			"Question": "Incomplete Troubleshooting"
		},
		"3led__check_connection": 
		{
			"Question": "Troubleshoot physical connections and Power Cycle the ARRIS Unit",
			"Text": 
			[ 
				"Troubleshoot physical connections and Power Cycle the ARRIS Unit",
				"Check if GUI's Login Page is Reachable."
			],
			"Skips":
			[
				["toreset","3led_factory_reset"]
			],
			"Buttons" : 
			[
				["3led__checkled","Done","toreset"]
			]
		},










		"3led_not_service": 
		{
			"Comments": "Not service procedure",
			"Question": "Can customer get online?",
			"Text": 
			[
				"Verify if the customer has internet access,",
				" ask them to go to any website, such as cnn.com/foxnews.com"
			],
			"Buttons": 
			[
				["3led_service_status","Yes"],
				["3led_not_service_bypass","No"]
			]
		},
		"3led_service_status":
		{
			"Question": "Is the Customer experiencing Connectivity Issues?",
			"Text":	["***Slow Speed or Intermittent Connection"],
			"QuestionsTemplate":
			[
				"When start the issue?: "
			],
			"Buttons": 
			[
				["resolved","No"],
				["3led_slow_speed","Yes, slow speed"],
				["3led_intermittent_connection","Yes, intermittent connection"]
			]
		},
		"3led_not_service_bypass":
		{
			"Question": "How is the customer connected to the modem?",
			"QuestionsTemplate":
			[
				"Can the customer connect directly using a ethernet cable?"
			],
			"Skips":
			[
				["media_disconnected","3led_factory_reset_media_disconnected"],
				["bypassReset","redirect_toprovision"],
				["isp_activation","self_activation_procedure"]
			],
			"Buttons": 
			[	
				["3led_not_service_checkinternet","Hardwired Modem","bypassReset"],
				["3led_not_service_checkinternet","Hardwired Gateway","bypassReset"],
				["3led_not_service_checkinternet","Wi-Fi","bypassReset"],
				["3led_not_service_bridge","Gateway in bridge mode"]
			]
		},
		"3led_not_service_bridge": 
		{
			"Question": "Can the customer bypass the external router",
			"QuestionsTemplate": ["Can the customer connect directly using a ethernet cable?"],
			"Buttons": 
			[	
				["3led_not_service_bypassrouter","Bypass the router"],
				["3led_not_service_unable_bypassrouter","Unable to bypass the router"]
			]
		},
		"3led_not_service_bypassrouter": 
		{
			"Question": "Bypassing router",
			"Text": 
			[	
				"***Steps to Bypass the router",
				"► - Power off modem, router and pc.",
				"► - Check if the ethernet cord is properly connected from the modem to the computer.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the modem are solid, power on the pc.",
				"► - Continue troubleshooting."],
			"Buttons": 
			[	
				["3led_not_service_checkinternet","Done"]
			]
		},
		"3led_not_service_unable_bypassrouter":
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
				["3led_not_service_checkinternet","Done"]
			]
		},
		"3led_not_service_checkinternet":
		{
			"Question": "Try accessing a website. Can the customer get online?",
			"Text": 
			[
				"Verify if the customer has internet access,",
				"ask them to go to any website, such as cnn.com/foxnews.com"
			],			
			"Buttons": 
			[
				["3led_not_service_online","Yes"],
				["3led_not_service_first_setup","No"]
			]
		},
		"3led_not_service_first_setup": 
		{
			"Question": "Is this the first time setup?",
			"Text": ["There is a higher chance the problem will be related to provisioning."],
			"Skips":
			[
				["checkIP","3led_not_service_check_ip_dns"]
			],
			"Buttons": 
			[ 
				["3led_other_modems", "Yes","isp_activation"],
				["3led_not_service_check_ip_dns","No","checkIP"]
			]
		},
		"3led_not_service_online":
		{
			"Question": "Can the customer connect to internet through Wi-Fi?",
			"Text": ["Can the customer connect to internet through Wi-Fi?"],
			"Buttons":
			[	
				["resolved","Yes"],
				["3led_not_service_check_ip_dns","No"]	
			]
		},











		"3led_not_service_check_ip_dns":
		{
			"Comments": "Procedure for check the IP, DNS",
			"Question": "Can the customer access the modem GUI?",
			"Text": 
			[ 
				" ► Check the IP address on the device",
				" ► You can use any device, for check the ip segment 192.168.*.*"
			],
			"Skips":
			[
				["checkIPreset","3led_factory_reset"]
			],
			"QuestionsTemplate":
			[
				"IP address: ",
				"DNS address: "
			],
			"Buttons": 
			[ 
				["3led_factory_reset","Yes","checkIPreset"],
				["3led_not_service_ping","No"] 
			]
		},
		"3led_not_service_ping":
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
				["checkPingreset","3led_factory_reset"]
			],
			"Buttons": 
			[ 
				["3led_factory_reset","Yes, have a response","checkPingreset"], 
				["3led_not_service_disconnect_coax","Not response, time out"] 
			]
		},
		"3led_not_service_disconnect_coax":
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
				["3led_not_service_reconnect_coax","Yes"], 
				["3led_not_service_check_ipv4","No"] 
			]
		},
		"3led_not_service_reconnect_coax":
		{
			"Question": "Connect coax cable and check if the Customer get online?",
			"Text": 
			[ 
				"*** Connect the coax cable on the modem",
				" ► Reconnect the coaxial cable and wait for the correct LEDs Status "	
			],
			"Buttons": 
			[ 
				["3led__checkled","Yes"], 
				["redirect_toprovision","No"] 
			]
		},
		"3led_not_service_check_ipv4":
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
				"IPv4 address: ",
				"DNS address: "
			],
			"Buttons": 
			[ 
				["3led_not_service_check_gui","192.168.0.*"], 
				["3led_factory_reset","169.254.*.*"],
				["3led_not_service_media_disconnected","Media disconnected","media_disconnected"] 
			]
		},
		"3led_not_service_check_gui":
		{
			"Question": "Access to GUI restored?",
			"Text": ["Access to GUI restored"],
			"Skips":
			[ 
				["checkGUIreset","3led_factory_reset"] 
			],
			"Buttons": 
			[ 
				["3led__checkled", "Yes"], 
				["3led_factory_reset","No","checkGUIreset"] 
			]
		},
		"3led_not_service_media_disconnected":
		{
			"Question":"Try with a different ethernet cord and a different device",
			"Text": ["***Restart the gateway"],
			"Buttons":
			[
				["3led__checkled","Done"]
			]
		},






		"3led_slow_speed":
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
				"Case number: "
			],
			"Skips":
			[
				["slowspeedReset","redirect_toprovision"]
			],			
			"Buttons":
			[ 
				["replace_unit","Yes"],
				["3led_slow_speed__select","No","slowspeedReset"]
			]
		},
		"3led_slow_speed__select":
		{
			"Question": "Device type",
			"Buttons":
			[
				["3led_slow_speed__modem","Modem"],
				["3led_slow_speed__gateway","Gateway"]
			]
		},
		"3led_slow_speed__redirect_manufacturer":
		{
			"Question": "Redirect to 3rd party manufacturer.",
			"Text": ["<br>","Offer AA if applicable"]
		},






		"3led_slow_speed__modem":
		{
			"Question":"Is the customer experiencing through a separate router or hardwired modem?",
			"Buttons":
			[ 
				["3led_slow_speed__modem_separeterouter","Separate router"],
				["3led_slow_speed__modem_checkcsl","Directly connected to the modem"]
			]
		},
		"3led_slow_speed__modem_checkcsl":
		{
			"Question": "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text":	["Access GUI and Check Cable Signal Levels"],
			"QuestionsTemplate":
			[
				"Downstream Power Level: ",
				"Downstream SNR Level: ",
				"Upstream Power Level: "
			],
			"Buttons": 
			[ ["3led_factory_reset","Yes"],
				["3led_slow_speed__modem__adjustcsl","No"]
			]
		},
		"3led_slow_speed__modem__adjustcsl":
		{
			"Question": "Redirect to internet service provider to adjust cable signal levels",
			"Text":	["<br>","***Advise check with the service provider, the Cable Signal Status"]
		},
		"3led_slow_speed__modem_separeterouter":
		{
			"Question":"Which client devices are affected?",
			"Buttons":
			[
				["3led_slow_speed__modem_separeterouter_allclients","All clients"],
				["3led_slow_speed__modem_separeterouter_someclients","Some clients"],
				["3led_slow_speed__redirect_manufacturer","One client"]
			]
		},
		"3led_slow_speed__modem_separeterouter_allclients":
		{
			"Question":"Can the customer directly connect a device to the modem? (Bypassing the router)",
			"Buttons":
			[ 
				["3led_slow_speed__modem_bypassrouter","Yes"],
				["3led_slow_speed__modem_unable_bypassrouter","No"]
			]
		},
		"3led_slow_speed__modem_bypassrouter": 
		{
			"Question": "Bypassing router",
			"Text": 
			[	
				"***Steps to bypass the router",
				"► - Power off modem, router and pc.",
				"► - Check if the ethernet cord is properly connected from the modem to the computer.",				
				"► - Power on the modem only.",
				"► - Once all the lights on the modem are solid, power on the pc.",
				"► - Continue troubleshooting."
			],
			"Buttons": 	
			[	
				["3led_slow_speed__modem_checkspeed","Done"] 
			]
		},
		"3led_slow_speed__modem_unable_bypassrouter":
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
				["3led_slow_speed__modem_checkgui","Done"] 
			]
		},
		"3led_slow_speed__modem_checkgui":
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
				["3led_slow_speed__modem_checkcsl","GUI Accessed"],
				["3led_slow_speed__modem_nogui","Unable to access GUI"]
			]
		},
		"3led_slow_speed__modem_nogui":
		{
			"Question": "Redirect the Customer to Third Party Manufacturer",
			"Text": 
			[	
				"<br>",
				"***Suggest to acquire a Device that could be connected Hardwired to the modem and Call us Back",
				"***Provide Case Number to Customer"
			]
		},
		"3led_slow_speed__modem_separeterouter_someclients":
		{
			"Question":"Power cycle the router. Did the speed improve?",
			"Buttons":
			[ 
				["3led_slow_speed__modem_checkspeed","Yes"],
				["3led_slow_speed__redirect_manufacturer","No"]
			]
		},
		"3led_slow_speed__modem_checkspeed":
		{
			"Question": "Is the Internet Speed Still Underperforming?",
			"Text":["Run a Speed Test on https://www.speedtest.net or fast.com"],
			"QuestionsTemplate":
			[
				"Speed test result: "
			],
			"Buttons":
			[	
				["3led_slow_speed__modem_checkcsl","Yes"],
				["resolved","No"]
			]
		},




		"3led_slow_speed__gateway":
		{
			"Question": "Is the issue with WiFi, Wired, or both?",		
			"Buttons":
			[ 
				["3led_slow_speed__gateway__wifi","Yes, wi-fi"],
				["3led_slow_speed__gateway__checkcsl","Yes, wired or both"]
			]
		},
		"3led_slow_speed__gateway__wifi":
		{
			"Question": "Which clients are affected?",
			"Buttons":
			[ 
				["3led_slow_speed__redirect_manufacturer","Only one client"],
			  ["3led_slow_speed__gateway__checkcsl","All clients are affected"]
			]
		},
		"3led_slow_speed__gateway__checkcsl":
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
				["3led_slow_speed__gateway__adjustcsl","No"],
				["3led_slow_speed__gateway__wifi_radio_interference","wi-fi, acceptable"],
				["3led_slow_speed__gateway__wifi_congestion","wired - both, acceptable"]
			]
		},
		"3led_slow_speed__gateway__adjustcsl":
		{
			"Question": "Redirect to Internet Service Provider to adjust Cable Signal Levels",
			"Text": ["<br>","***Advise check with the service provider, the Cable Signal Status"]
		},
		"3led_slow_speed__gateway__wifi_radio_interference":
		{
			"Question": "Are the 2.4 Ghz and/or 5 Ghz radio experiencing problems?",
			"QuestionsTemplate":
			[
				"Check if the Device's Placement is correct: ",
				"Number of nearby access points: ",
				"Number of APs found per band: "
			],
			"Buttons":
			[
				["3led_slow_speed__gateway_wifi__interference_onenetwork","Only one has interference"],
				["3led_slow_speed__gateway_wifi__interference_checkspeed","Both have interference"]
			]
		},
		"3led_slow_speed__gateway_wifi__interference_onenetwork":
		{
			"Question": "Test the other network. Still under performing?",
			"Text":["Guide to speedtes.net or fast.com and make an speed test"],
			"QuestionsTemplate": ["Speed test result: "],
			"Buttons":
			[ 
				["3led_slow_speed__gateway_wifi__interference_powercycle","Yes"],
			  ["3led_slow_speed__gateway__wifi_congestion","No"]
			]
		},
		"3led_slow_speed__gateway_wifi__interference_powercycle":
		{
			"Question": "Power cycle the gateway",
			"Text": ["Unplug the power cord from the AC outlet and wait one minute."],
			"Buttons": 
			[
				["3led_slow_speed__gateway_wifi__interference_check","Done"]
			]
		},
		"3led_slow_speed__gateway_wifi__interference_check":
		{
			"Question": "Has the speed improved?",
			"Text": ["Check the connection after the restart"],
			"Buttons":
			[
				["resolved","Yes"],
				["3led_slow_speed__gateway_wifi__interference_checkspeed","No"]
			]
		}, 
		"3led_slow_speed__gateway_wifi__interference_checkspeed":
		{
			"Question": "Check the firewall configuration. Is speed still underperforming?",
			"Text":	[ "Ask the customer to run a speed test on speedtest.com or fast.com"	],
			"QuestionsTemplate": ["Speed test result: "],
			"Buttons":
			[
				["3led_slow_speed__gateway__wifi_congestion","Yes"],
				["resolved","No"]
			]
		},
		"3led_slow_speed__gateway__wifi_congestion":
		{
			"Question": "Identify an environmental Issue?",
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
				["3led_slow_speed__gateway__wifi_interference", "Yes"],
				["3led_factory_reset","No"]
			]
		},
		"3led_slow_speed__gateway__wifi_interference":
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












		"3led_intermittent_connection":
		{
			"Comments":"Intermittent Connection procedure",
			"Question":"Intermittent Connection procedure",
			"Text": ["Verify with the customer when was the ARRIS device installed"],
			"Skips":
			[	["checkcsl","3led_intermittent_connection__gateway__wired_checkinrange"],
				["device_rebooting__gateway_replace","replace_unit"],
				["device_rebooting","3led_intermittent_connection__modem_confirmcsl"],
				["checkcslmodem","3led_intermittent_connection__modem_checkinrange"]
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
				["3led_intermittent_connection__firstappeared","Done"]
			]
		},
		"3led_intermittent_connection__firstappeared":
		{
			"Question":"Select device type",
	
			"Buttons": 
			[	
				["3led_intermittent_connection__modem","modem"],
				["3led_intermittent_connection__gateway","gateway"]
			]
		},



		"3led_intermittent_connection__modem":
		{
			"Question":"Issue happening hardwired to the modem or through a Router?",
			
			"Buttons": 
			[	
				["3led_intermittent_connection__modem_throughrouter","Through Router"],
				["3led_intermittent_connection__modem_reboot","Hardwired"]
			]
		},
		"3led_intermittent_connection__modem_throughrouter":
		{
			"Question":"Can you connect direclty to the Modem, bypass Router?",			
			"Buttons": 
			[	
				["3led_intermittent_connection__modem_reboot","Yes"],
				["3led_intermittent_connection__modem_reboot","No"]
			]
		},
		"3led_intermittent_connection__modem_reboot":
		{
			"Question":"Does the ARRIS device reboot on its own?",			
			"Buttons": 
			[ 
				["3led_intermittent_connection__modem_rebooting_steps","Yes"],
				["3led_intermittent_connection__modem_confirmcsl","No"]	
			]
		},
		"3led_intermittent_connection__modem_rebooting_steps":
		{
			"Question":"Disconnect coax cable",
			"QuestionsTemplate":
			[
				"Is the device still rebooting on its own even with the coax out?: "
			],
			"Buttons": 
			[ 
				["device_rebooting__device","Yes","rebooting__coax__out","device_rebooting","modem","group3led"],
				["3led_intermittent_connection__modem_confirmcsl","No"]	
			]
		},
		"3led_intermittent_connection__modem_confirmcsl":
		{
			"Question":"Were Cable Signal Levels previously Checked by us in other case or note?",
			"QuestionsTemplate":
			[
				"Case number: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["3led_intermittent_connection__modem_checksl","No"]	
			]
		},
		"3led_intermittent_connection__modem_checksl":
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
				["3led_intermittent_connection__modem_csl_inrange_through_router","In range, Through Router"],	
				["3led_factory_reset","Not in range","checkcslmodem"]	
			]
		},
		"3led_intermittent_connection__modem_csl_inrange_through_router":
		{
			"Question": "Issue only affecting through router?",
			"Buttons": 
			[ 
				["3led_intermittent_connection__modem_redirect_manufacturer","Yes"],
				["replace_unit","No"]				
			]
		},
		"3led_intermittent_connection__modem_redirect_manufacturer":
		{
			"Question": "Redirect to 3rd party manufacturer.",
			"Text": ["<br>","Offer AA if applicacble"]
		},
		"3led_intermittent_connection__modem_checkinrange":
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
				["3led_intermittent_connection__modem_monitorperformance","In range"],
				["3led_slow_speed__modem__techvisit","Not in range"]
			]
		},
		"3led_slow_speed__modem__techvisit":
		{
			"Question": "Redirect to Internet Service Provider to adjust Cable Signal Levels",
			"Text": ["<br>","***Ask for a Tech's Visit to Adjust Cable Signal Levels"]
		},
		"3led_intermittent_connection__modem_monitorperformance":
		{
			"Question": "Monitor Network's Performance",
			"Text": 
			[ 
				"<br>",
				"For the Next 24 hours,Monitor Network's Performance,",
				"***Provide case number for future reference"
			]
		},





		"3led_intermittent_connection__gateway":
		{
			"Question":"Which type of clients are experiencing issues on the network?",
			"Text": ["i.e Wi-Fi laptop, Wi-Fi printer, Wired gaming console, iPhone"],
			"Buttons": 
			[
				["3led_intermittent_connection__gateway__affectiontype","Done"]
			]
		},
		"3led_intermittent_connection__gateway__affectiontype":
		{
			"Question":"Is the issue affecting hardwired connection, via Wi-Fi or both?",
			"Text": 
			[ 
				"If customer does not know if it happens Hardwired,",
				"as well please connect a pc hardwired to monitor performance."
			],
			"Buttons": 
			[ 
				["3led_intermittent_connection__gateway__affectiontype_wifi","Wi-Fi"],
				["3led_intermittent_connection__gateway__wired_checkreboot","Wired - Both"]
			]
		},
		"3led_intermittent_connection__gateway__affectiontype_wifi":
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
				["3led_intermittent_connection__gateway__affectiontype_monitorperformance","No"]
			]
		},
		"3led_intermittent_connection__gateway__affectiontype_monitorperformance":
		{
			"Question":"Monitor Network's Performance for the Next 24 hours",
			"Text": ["<br>","***Provide Case Number for future reference."]
		},		
		"3led_intermittent_connection__gateway__wired_checkreboot":
		{
			"Question":"Does the ARRIS device reboot on its own?",
			"Buttons": 
			[ 
				["device_rebooting__device","Yes","gateway__wired"],
				["3led_intermittent_connection__gateway__wired_confirmcsl","No"]
			]
		},
		"3led_intermittent_connection__gateway__wired_confirmcsl":
		{
			"Question":"Were Cable Signal Levels previously Checked by us in other case or note?",
			"QuestionsTemplate":
			[
				"Case number: "
			],
			"Buttons": 
			[ 
				["replace_unit","Yes"],
				["3led_intermittent_connection__gateway__wired_checkcsl","No"]
			]
		},
		"3led_intermittent_connection__gateway__wired_checkcsl":
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
				["3led_factory_reset","No","checkcsl"]
			]
		},
		"3led_intermittent_connection__gateway__wired_checkinrange":
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
				["3led_intermittent_connection__gateway__affectiontype_monitorperformance","Yes"],
			  ["3led_slow_speed__gateway__adjustcsl","No"]
			]
		},






		"3led__led_behavior":
		{ 
			"Comments":"Not normal lights behavior",
			"Question": "Advise the costumer, this is not normal behavior",
			"Skips":
			[
				["led_behavior_without_coax","3led_factory_reset__led_behavior"],
				["led_behavior_withcoax","3led_factory_reset__led_behavior"]
			],
			"Buttons":
			[ 
				["3led__led_behavior_disconnect_coax","Done"]
			]
		},
		"3led__led_behavior_disconnect_coax":
		{
			"Question": "Disconnected the coax cable",
			"Buttons" :
			[ 
				["3led__led_behavior_reboot","Done"] 
			]	
		},
		"3led__led_behavior_reboot":
		{
			"Question": "Power cycle the ARRIS unit and check if behavior continue?",	
			"Buttons" :
			[ 
				["3led__led_behavior","Yes, Behavior continue","led_behavior_without_coax"],
				["3led__led_behavior_connect_coax","No, Behavior stop","led_behavior_reboot"]
			]	
		},
		"3led_factory_reset__led_behavior":
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
				["replace__led_behavior","replace_unit"]
		  ],
			"Buttons": 
			[ 
				["3led__checkled","Done","replace__led_behavior"],
			  ["3led__stop","No, Customer does not want to Factory reset  the unit"]
			]
		},
		"3led__led_behavior_connect_coax":
		{
			"Question": "Connect coax cable and check if the behavior continue?",	
			"Text":	[" ► Reconnect the coaxial cable and wait for the correct LEDs Status "],
			"Buttons" :
			[ 
				["3led__led_behavior","Yes, Behavior continue","led_behavior_withcoax"],
				["3led__checkled","No, Behavior stop"]
			]	
		}



   }
}