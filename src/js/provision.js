{
	"comments" : [
		"Provisioning flowchart",
		"Beta Version review 0.1",
		"UI Modify by Miguel Alejandro Fernandez, ARRIS Tier 1 Support Costa Rica.",
		"Version 4.6.1-comcast3, adds special handling for Comcast activation",
		"Coded in JSON by Matthew Carpenter, ARRIS Tier 1 Support.",		
		"Add/modify steps in 'steps' section following guide in the readme.txt file.",
		"Version 3.5 adds the NoNotes option.",
		"Version 4.0 adds the LEDchart and LEDfail option, ans well as Popmsg and Poplink.",
		"Version 4.2 adds Skips options. This replaces 'Resetdone'. See Readme/changelog.",
		"Version 4.2 adds Table option. See Readme/changelog.",
		"Version 4.3 adds Noteheight option.",
		"Version 4.6.6 adds the CAP process",
		"Version 4.8 adds Slow Speed Workflow TS processes",
		"Version 4.81 fixes four identified broken paths and adds new 'No GUI Access' paths", 
		"Version 4.82 removed 'Do not use' column from opening table, updated 'cable' signal, offer AA program, removed 'Suggest exchanging with retailer' instruction",
		"Version 4.9 added Gateway combined US/DS LED instructions, re-worded redirect to ISP T2 for cable signal levels, added ISP compatiblity for different LED states",
		"Version 5 Refresh all GUI and some behaviors, compatibility to Modern Browsers."
	],
	
	"title" : "SURFboard 'No Internet/Slow Speed' Troubleshooting Tool - Version 5.1 Alpha",
	
	"steps" : {
		"START" : {
			"Question" : "Does this tool apply to the current issue?",
			"Popmsg" : "Do not use this tool if any of the following conditions exist:\n\tThis is not a SURFboard product\n\tAt least one device has internet access\n\tProblem is exclusively on wireless connections\n\tProblem is intermittent",
			"Text" : ["***This tool applies to SURFboard products with slow/no internet access",
					  "When did the issue first appear?", 
					  "How often and what time of day does the issue occur?",
					  "Any changes in the network when the issue started?", 
					  "Is the entire network affected? (Y/N)",
					  "-----------------------------------------------------"],
			"Table" : [
				["***USE IF:"],
				["This is a Cable modem/Wi-Fi gateway"],
				["Internet speed is slow or No Internet access"],
				["First-time Activation"],
				["Device won't Power On"],
				["All clients are impacted"],
				["Problem is persistent and NOT intermittent"] 
			],
			"Buttons" : [
				["test1", "Yes"],
				["na", "No"]
			]
		},
		
		"test1" : {
			"Question" : "How many lights do you see in the front panel?",
			
							"Buttons" : [
									["chekled", "1 Ligth"],
									["sendreset", "2 LED"],
									["sendreset", "3 LED"],
									["sendreset", "4 LED"],
									["ifNO", "No"]
								]
						},

		"checkled" : {
			"Question" : "What is the LED status?",
			"Popmsg" : "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"Text" : ["                                                                                                                                    ",
			          "When troubleshooting a Gateway/Modem with a combined US/DS LED, refer to the following table to set the Receive/Send LED accordingly"],
			"Table" : [
				["- SBG10, SBG6950AC2, SBG7400AC2, SBG7580-AC, SBG7600-AC2, SVG2482AC, T25 -"],
				["***If Send/Receive is fast blinking, SET LED table: Receive = Solid, Send = Flashing"],
				["***If Send/Receive is slow blinking, SET LED table: Receive = Flashing, Send = OFF "],				
				["- SBG8300 LED Behavior - "],
				["***If Online LED is Blue (slow blinking), SET LED table: Receive = Solid, Send = Flashing"],
				["***If Online LED is Blue (fast blinking), SET LED table: Receive = Flashing, Send = OFF"],
				["- G34, G36, S33 LED Behavior - "],
				["***If Online LED is blinking Green (US/DS channels locked) SET LED table Receive = Solid, Send = Flashing, Online = Off"],
				["***If Online LED is blinking Green (US/DS unlocked) SET LED table Receive = Flashing, Send = Off, Online = Off"]

			],
			"LEDchart" : [
				["poweroff", "off", "off", "off", "off"],
				["powerreset", "flashing", "*", "*", "*"],
				["powerreset", "solid", "off", "off", "off"],
				["tvserv", "solid", "flashing", "off", "off"],
				["serviceIssue", "solid", "solid", "flashing", "off"],
				["serviceIssue2", "solid", "flashing", "flashing", "solid"],
				["serviceIssue2", "solid", "flashing", "flashing", "off"],
				["onlinesolid", "solid", "solid", "solid", "solid"],
				["serviceIssue2", "solid", "solid", "solid", "*"]				
			],
			"LEDfail" : "powerreset"
		},


		"checkled-cap" : {
			"Question" : "What is the LED status?",
			"Popmsg" : "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"LEDchart" : [
				["poweroff", "off", "off", "off", "off"],
				["powerreset", "flashing", "*", "*", "*"],
				["powerreset", "solid", "off", "off", "off"],
				["tvserv", "solid", "flashing", "off", "off"],
				["serviceIssue", "solid", "solid", "flashing", "off"],
				["serviceIssue2", "solid", "flashing", "flashing", "solid"],
				["serviceIssue2", "solid", "flashing", "flashing", "off"],
				["provision_page_cap", "solid", "solid", "solid", "solid"],
				["serviceIssue2", "solid", "solid", "solid", "*"]				
			],
			"skips":[
				["cap_noinet", "provision_cap"]
			],
			"LEDfail" : "powerreset"
		},


		"serviceIssue" : {
			"Question" : "Is this device compatible with ISP and subscribed speed tier?",
			"Text" : ["                                            ",
					  "Check and verify the modem/gateway is compatible with MSO"],
			"Skips" : [
				["reset","checkconnect", "retryprovision_led"]
			],
			"Noteheight" : "6em",
			"Buttons" : [
				["sendreset", "Yes"],
				["ifNO", "No"]
			]
		},
		
		
		"sendreset" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any automatically learned settings or provisioning errors stored in the modem that could prevent the modem from locking onto the correct channels.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "checkconnect"],
				["nosigreset", "signal"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["checkled", "Factory reset modem", "reset"],
				["checkconnect", "Unable to factory reset", "nosigreset"]
			]
		},
		
		
		"provreset" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any user settings, automatically learned settings, or provisioning errors stored in the modem that could interfere with internet access.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "retryprovision"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["checkled", "Factory Reset modem", "reset"],
				["retryprovision", "Unable to Factory Reset"]
			]
		},
		
		
		"serviceIssue2" : {
			"Question" : "Is this device compatible with ISP and subscribed speed tier?",
			"Text" : ["                                            ",
					  "Check and verify the modem/gateway is compatible with MSO"],
			"Skips" : [
				["reset", "retryprovision_led"]
			],
			"Noteheight" : "6em",
			"Buttons" : [
				["provreset_led", "Yes"],
				["ifNO", "No"]
			]
		},
		
		
		"provreset_led" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any user settings, automatically learned settings, or provisioning errors stored in the modem that could interfere with internet access.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "retryprovision_led"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["checkled", "Factory reset modem", "reset"],
				["retryprovision", "Unable to factory reset"]
			]
		},
		
		
		"provreset2" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any user settings, automatically learned settings, or provisioning errors stored in the modem that could interfere with internet access.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "retryprovision"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["onlinesolid2", "Factory reset modem", "reset"],
				["retryprovision", "Unable to factory reset"]
			]
		},
		
		
		"onlinesolid" : {
			"Question" : "Can the customer get online?",
			"Skips" : [
				["onlinecheck", "onlinesolid3"],
				["asked_firsttime", "onlinesolid3"]
			],
			"Popmsg" : "If internet connectivity has been restored on at least one device, this tool's portion of troubleshooting is complete.",
			"Buttons" : [
				["SpeedIssues", "Yes"],
				["nointernet", "No", "onlinecheck"]
			]
		},
		
		
		"onlinesolid2" : {
			"Question" : "Can the customer get online?",
			"Popmsg" : "This step confirms whether this tool is still needed.",
			"Buttons" : [
				["SpeedIssues", "Yes"],
				["pingtest2", "No"],
				["checkled", "Lights no longer solid"]
			]
		},


		"onlinesolid3" : {
			"Question" : "Can the customer get online?",
			"Popmsg" : "This step confirms whether this tool is still needed.",
			"Skips" : [
				["cap", "onlinesolid3-comcast"]
			],
			"Buttons" : [
				["resolved", "Yes"],
				["firsttime", "No"]
			]
		},
		
		
		"onlinesolid3-comcast" : {
			"Question" : "Can the customer get online?",
			"Popmsg" : "This step confirms whether this tool is still needed.",
			"Skips" : [
				["comcast-preinstall", "comcast-provision5"]
			],
			"Buttons" : [
				["resolved", "Yes"],
				["comcast-provision", "No"]
			]
		},
		
		
		"firsttime" : {
			"Question" : "Is this first-time setup?",
			"Popmsg" : "If this is first-time setup, there is a higher chance the problem will be related to provisioning.",
			"Skips" : [
				["reset", "iptest"],
				["firsttime", "nointernet"]							
			],
			"Buttons" : [
				["othermodems", "Yes", "firsttime", "asked_firsttime"],
				["iptest", "No", "asked_firsttime"]
			]
		},
		
		
		"othermodems" : {
			"Question" : "Is the previous modem still connected to the network?",
			"Popmsg": "Do not power off dedicated telephony modem.",
			"Buttons" : [
				["removeothermodems", "Yes"],
				["provpage", "No"]
			]
		},
		
		
		"removeothermodems" : {
			"Question" : "Remove the previous modem from the network and power cycle the modem",			
		
			"Buttons" : [
				["provpage", "Done"]
			]
		},


		"provpage" : {
			"Question" : "Does the customer get a service provider page?",
			"Popmsg" : "If the customer is getting an activation page or is redirected to any other service provider page automatically, the modem is not provisioned or incorrectly provisioned.",
			"Buttons" : [
				["provision_page", "Yes (Other ISP)"],
				["firsttime2", "No (Other ISP)"],
				["provision_page_cap", "Yes (Comcast)", "cap", "cap_page", "YesCom"],
				["comcast-provision7", "No (Comcast)", "cap", "cap_page"]
			]
		},
		
		
		"no-other-modem-2": { 
			"Question": "Disconnect all existing modems and routers. Connect our modem to the coax cable and power cycle the modem.",
			"Text": ["***Note: Make sure the coax cable is connected hand tight."], 
			"Buttons": [
				["checkled-cap", "Done"]
			]
		},
		
		
		"connectivity" : {
			"Question" : "Are any devices able to access the Internet?",
			"Popmsg" : "This step confirms whether this tool is still needed.",
			"Buttons" : [
				["troubeth", "No wired, WiFi works"],
				["troubwifi", "No WiFi access, wired works"],
				["manufacturer", "Few clients have no access"],
				["nointernet", "No clients have Internet access"]
			]
		},
		
		
		"nointernet" : {
			"Question" : "How is the customer connected to the modem currently?",
			"Popmsg" : "If a separate router is currently connected to the modem, bypassing it might help with further troubleshooting.\nIf the customer is using a wireless connection to the gateway, using an Ethernet connection may help with troubleshooting.",
			"Skips" : [
				["direct", "firsttime"],
				["sbgwifi", "bypass"],
				["seprouter", "bypass2"]
			],
			"Buttons" : [
				["firsttime", "Directly via Ethernet", "direct"],
				["bypass", "On built-in WiFi", "sbgwifi"],
				["bypass2", "Using separate router", "seprouter"]
			]
		},
		
		
		"bypass" : {
			"Question" : "Connect directly to the modem.",
			"Popmsg" : "If the customer is using a wireless connection to the gateway, using an Ethernet connection may help with troubleshooting.",
			"Text" : ["If a router is connected, bypass it then power cycle the modem."],
			"Skips" : [
				["nodirect", "firsttime"]
			],
			"Buttons" : [
				["nointernet2", "Connected directly", "direct"],
				["firsttime", "Unable to connect directly", "nodirect"]
			]
		},
		
		
		"bypass2" : {
			"Question" : "Bypass the router.",
			"Popmsg" : "We need to try to rule out the router as a source of connection problems.",
			"Text" : [ 
				"***Follow the procedure below for this step.",
				"1) Unplug the power to the modem",
				"2) Connect an Ethernet cable directly from the modem to a computer",
				"3) Plug power back into the modem"
			],
			"Skips" : [
				["nodirect", "firsttime"]
			],
			"Buttons" : [
				["nointernet2", "Connected directly", "direct"],
				["cycler", "Unable to connect directly", "nodirect"]
			]
		},
		
		
		"cycler" : {
			"Question" : "Power cycle the modem and router.",
			"Popmsg" : "This step helps ensure the modem and router are communicating.\n\nThe WAN port on most routers will be labeled \"WAN\", \"Internet\", \"Modem\", or have a distinct icon or color-coding to set it apart from the LAN ports.",
			"Text" : [
			"***Follow the procedure below for this step.",
				"1) Disconnect the modem from power.",
				"2) Power the router off or disconnect power from the router.",
				"3) If possible, confirm the modem is connected to the router's WAN port.",
				"4) Plug the modem back into power.",
				"5) Wait for the first four lights on the modem to become solid again.",
				"6) Power the router ON or reconnect it to power."
			],
			"Skips" : [
				["cycledr", "firsttime"]
			],
			"Table" : [

			],
			"Buttons" : [
				["onlinesolid3", "Done", "cycledr"],
				["cycler2", "Lights no longer solid"]
			]
		},
		
		
		"cycler2" : {
			"Question" : "Power on the router or reconnect it to power, if not already done.",
			"Popmsg" : "We might need to attempt GUI access. Since the customer was unable to bypass the router this might still allow access to the modem GUI.",
			"Buttons" : [
				["checkled", "Done"]
			]
		},
		
		
		"nointernet2" : {
			"Question" : "Is the customer now able to get online?",
			"Popmsg" : "This step confirms whether this tool is still needed.",
			"Buttons" : [
				["resolved", "Yes"],
				["firsttime", "No"],
				["checkled", "Lights no longer solid"]
			]
		},
		
		
		
		
		"SpeedIssues" : {
			"Question" : "Is their Internet speed underperforming?",
			"NoNotes" : "true",
			"Buttons" : [
				["SSbegin", "Yes"],
				["resolved", "No"]
			]
		},
		
		
		"SSbegin" : {
			"Question" : "Is this device compatible with subscribed speed tier?",
			"Text" : ["                                            ",
					  "What is your subscribed internet speed tier?",
					  "Check and verify the modem/gateway is compatible with MSO",
					  "Ask Cust. what client devices are connected/affected?",
					  "Where is your modem/gateway placed in your household?"],
			"Noteheight" : "8em",
			"Buttons" : [
				["ifYES", "Yes"],
				["ifNO", "No"]
			]
		},
		
		
		"ifYES" : {
			"Question" : "ARRIS Modem or Gateway?",
			"Buttons" : [
					["ifModem", "Modem"],
					["ifGateway", "Gateway"]
			]
		},
					
					
		"ifNO" : {
			"Question" : "Advise Cust. their device may not compatible with their Internet Service Provider or speed tier.",
			"Text" : ["Check ISP website and validate the Customer's device is incompatible. Offer an alternative ARRIS device that is compatible."],
			"NoNotes" : "true"
		},
		
		
		"ifModem" : {
			"Question" : "Do you have more than one client?",
			"Text" : ["Conduct a speed test on: hhtp://www.speedtest.net/", 
					  "Please document speed test results. Compare Subscribed ISP speed v. Advertised device speed v. Speed test results"], 
			"Buttons" : [
				["ifYES1", "Yes"],
				["Jump Point C", "No"]]
		},	
		
		
		"Jump Point C" : {
			"Question" : "Can you connect to the modem via Ethernet?",
			"Text" : ["Ethernet port LED = Green - Gigabit transfer rate, Ethernet port LED = Amber - < Gigabit transfer rate"],
			"Buttons" : [
				["bypass3", "Yes"],
				["noEthernet", "No"]]
		},
							
			
		"ifYES1" : {
			"Question" : "Which clients are affected?",
			"Text" : ["Issue may lie with the client device. If this appears to be the case please re-direct Cust. to client device manufacturer"],
			"Buttons" : [
				["Check connections between Coax-Modem, also between Modem/Router-PC", "All clients"],
				["Jump Point B", "Some clients"],
				["Jump Point B", "Isolated client (one of many)"]]
		},
		
		
		"Check connections between Coax-Modem, also between Modem/Router-PC" : {
			"Question" : "Is the ONLINE Globe on?",
			"Text" : ["Check front panel LEDs",
					  "Check connections between Coax-Modem, also between Modem/Router-PC"],
			"Buttons" : [["Jump Point C", "Yes"],
						["Perform a Factory Reset.3", "No"]]
					},
					
			
		"Unable to complete" : { 
			"Question" : "We are unable to troubleshoot further without performing a Factory Reset",
			"Text" : ["Please call the router manufacturer to continue troubleshooting."]
		},
		
		
		"noEthernet" : {
			"Question" : "Advise Cust. to power cycle modem, router, and client device.",
			"Text" : ["Check back panel Ethernet LEDs between modem-router before power cycling",
					  "Wait for all hardware devices to come back online and reconnect everything"],
			"Buttons" : [
				["Jump Point A", "Back Online"]]
		},		
					
					
		"Jump Point A" : {
			"Question" : "Check cable signal levels in GUI",
			"Text" : ["Are the DS/US Power, SNR levels within an acceptable range?"],
			"Table" : [
				["***SB modem default", "http://192.168.100.1/"],
				["***SBG series default", "http://192.168.0.1/"]
			],
			"Buttons" : [
				["Jump Point B", "Yes"],
				["splitterPass", "No"]]
		},
					
		
		"Jump Point B" : {
			"Question" : "Is it an ARRIS router or a 3rd-party WiFi router?",
			"Text" : ["Try connecting modem-router with a different Ethernet cable",
					  "Please note what Ethernet cable is being used (Cat 5, Cat 5e, Cat 6)"],
			"Buttons" : [["Jump Point D", "ARRIS"],
						["thirdparty_reset", "3rd-party"]]
		},
		
		
		"thirdparty_reset" : {
			"Question" : "Perform a Factory Reset on the 3rd-party router.",
			"Text" : ["Advise the customer any custom settings will be lost"],
			"Buttons" : [
				["Done", "Factory Reset Performed"],
				["Unable to complete", "Unable to Factory Reset"]]
		},
		
		
		"splitterPass" : {
			"Question" : "Bypass splitters and check Coax-Modem connection. Then recheck cable signal levels",
			"Text" : ["Is the Internet speed still underperforming?"],
			"Buttons" : [
				["signal_reset", "Yes"],
				["monitorNetwork", "No"]]
		},


		"monitorNetwork" : {
			"Question" : "Monitor Network performance. If speed degrades re-direct to ISP to further troubleshoot with Tier 2",
			"Text" : ["Working Unit!"]
		},
		
		
		"Done" : {
			"Question" : "Conduct a speed test on: http://www.speedtest.net/. Are the results within parameters?",
			"Buttons" : [
				["check_website", "Yes"],
				["Re-direct Cust. to 3rd party Wi-Fi router manufacturer", "No"]]
		},
		
		
		"Re-direct Cust. to 3rd party Wi-Fi router manufacturer" : {
			"Question" : "Re-direct Cust. to 3rd party Wi-Fi router manufacturer for additional troubleshooting"
		},
		
			
		"check_website" : {
			"Question" : "Is the Internet speed still underperforming?",
			"Text" : ["Advise Cust. to try accessing websites that were underperforming on client device",
							  "Reference article no. 17915 to determine what Wi-Fi Standard is supported on client devices"],
			"Buttons" : [
				["Use Guided-Assistance for in-warranty RMA", "Yes"],
				["Success", "No"]
			]
		},
		
		
		"Success" : {
			"Question" : "Check if speed is limited by ISP or Network drivers on client device. Working unit!"
		},
					
					
		"Re-direct Cust. to ISP to adjust cable signal levels" : {
			"Question" : "Re-direct customer to ISP to adjust cable signal levels",
			"Text" : ["Request from Tier 1 ISP agent for the cable signal levels to be checked. If the T1 agent cannot assist, please ask for a higher level of support."]
		},
					
					
		"bypass3" : {
			"Question" : "Bypass WiFi router and directly connect modem to PC via Ethernet, conduct a speed test on http://www.speedtest.net/. Is the internet speed still underperforming?",
			"Text" : ["         ",
							  "Compare Subscribed ISP speed v. Advertised device speed v. Speed test results"],
			"Buttons" : [
				["Check back panel Ethernet LEDs between modem-PC", "Yes"],
				["Jump Point B", "No"]
			]
		},
			
			
		"Check back panel Ethernet LEDs between modem-PC" : {
			"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
			"Text" : ["Advise Cust. to check cable signal levels in GUI (192.168.100.1)",
							  "Check back panel Ethernet LEDs between modem-PC"],
			"Buttons" : [
						["signal_reset", "Yes"],
						["Re-direct Cust. to ISP to adjust cable signal levels", "No"]
					]
		},
					
					
		"signal_reset" : {
			"Question" : "Perform a Factory Reset",
			"Text" : ["Wait for all LEDs to turn solid. Then conduct a speed test on http://www.speedtest.net/"],
			"Buttons" : [
				["improvement", "Factory Reset Performed"],
				["Unable to complete.1", "Unable to perform reset"]
			]
		},
					
		"improvement" : {
			"Question" : "Has the Internet speed improved?",
			"Buttons" : [
				["Working Unit!", "Yes"],
				["Use Guided-Assistance for in-warranty RMA", "No"]
			]
		},
		
		
		
		
		"ifGateway" : {
					"Question" : "Globe On?",
					"Text" : ["                                                  ",
							  "Conduct a speed test on: http://www.speedtest.net/",
							  "Check front panel LEDs"],
					"Buttons" : [["Wired or Wireless?", "Yes"],
								["checkled-cap", "Troubleshoot No Internet connection"]]
		},
					
					
		"Wired or Wireless?" : {
					"Question" : "Wired or Wireless speed issues?",
					"Buttons" : [["Jump Point A", "Wired"],
								["Jump Point A", "Both"],
								["Jump Point D", "Wireless"]]
		},
					
					
		"Jump Point D" : {
					"Question" : "Which clients are affected?",
					"Buttons" : [["Check cable signal levels and Wi-Fi signal strength on client device. Then check front panel LEDs, verifying Wi-Fi radio band LEDs.", "All Clients"],
								["Which band is affected?", "Some Clients"],
								["Client connected to 2.4GHz or 5GHz radio?", "Isolated Client (one of many)"]]
		},
				
				
		"Check cable signal levels and Wi-Fi signal strength on client device. Then check front panel LEDs, verifying Wi-Fi radio band LEDs." : {
						"Question" : "Check cable signal levels and Wi-Fi signal strength on client device. Are the DS/US Power, SNR levels within an acceptable range?",
						"Text" : ["Also check front panel LEDs, verifying Wi-Fi radio band LEDs."],
						"Buttons" : [["2.4GHz or 5GHz radio experiencing problems?", "Yes"],
									["Perform a Factory Reset.1", "No"]]
		},
						
						
		"Perform a Factory Reset.1" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Skips" : ["Check cable signal levels and Wi-Fi signal strength on client device. Then check front panel LEDs, verifying Wi-Fi radio band LEDs.", "Perform a Factory Reset.1"],
						"Buttons" : [["Done.1", "Factory Reset Gateway"],
									["Unable to complete", "Unable to Factory Reset"]]
		},		
						
				
		"Done.1" : {
			"Question" : "Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/",
			"Text" : ["Is the Internet speed still underperforming?"],
			"Buttons" : [["Re-direct Cust. to ISP to adjust cable signal levels", "Yes"],
						["Working Unit!", "No"]]
		},
				
				
		"2.4GHz or 5GHz radio experiencing problems?" : {
				"Question" : "2.4 GHz or 5 GHz radio experiencing problems?",
				"Buttons" : [["Advise Cust. to switch devices to 5GHz band", "2.4 GHz"],
							["Try disabling WMM & either lowering or removing Firewall settings", "Both"],
							["Advise Cust. to switch devices to 2.4GHz band", "5 GHz"]]
		},
						
						
		"Advise Cust. to switch devices to 5GHz band" : {
						"Question" : "Advise Cust. to switch devices to 5 GHz band. Is the Internet speed still underperforming?",
						"Buttons" : [["Power cycle", "Yes"],
									["Cust. to switch device to 5 GHz band.", "No"]]
		},
						
						
		"Try disabling WMM & either lowering or removing Firewall settings" : {
				"Question" : "Try disabling WMM & either lowering or removing Firewall settings",
				"Text" : ["Is the Internet speed still underperforming?"],
				"Buttons" : [["Perform Scan for Wireless AP in GUI", "Yes"],
							["Working Unit!", "No"]]
		},		
						
						
		"Advise Cust. to switch devices to 2.4GHz band" : {
						"Question" : "Advise Cust. to switch devices to 2.4 GHz band. Is the Internet speed still underperforming?",
						"Buttons" : [["Cust. to switch to 2.4 GHz band.", "Yes"],
									["Working Unit!", "No"]]
		},
						
						
		"Perform Scan for Wireless AP in GUI" : {
						"Question" : "Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.",
						"Text" : ["Power Cycle Gateway. Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/, are the results within parameters?."],
						"Buttons" : [["Working Unit!-Interference", "Yes"],
									["Perform a Factory Reset.2", "No"]]
		},


		"Working Unit!-Interference" : {
			"Question" : "Please inform Customer their device was experiencing environmental interference and the unit is working as expected. ",
			"Text" : ["Please copy text from the tool into Salesforce case notes"]
		},	
						
				
		"Perform a Factory Reset.2" : {
						"Question" : "Perform a Factory Reset.",
						"Skips" : ["Perform a Factory Reset.2", "Check cable signal levels and Wi-Fi signal strength on client device. Then check front panel LEDs, verifying Wi-Fi radio band lights."],
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.2", "Factory Reset Gateway"],
									["Unable to complete.1", "Unable to Factory Reset"]]
		},
						
						
		"Done.2" : {
				"Question" : "Is the Internet speed still underperforming?",
				"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
				"Buttons" : [["Use Guided-Assistance for in-warranty RMA", "Yes"],
							["Working Unit!", "No"]]
		},
						
							
		"Unable to complete.1" : { 
						"Question" : "We are unable to troubleshoot further without performing a Factory Reset",
						"Text" : ["Please call back when you are able to finish troubleshooting"]
		},
				
				
		"Which band is affected?" : {
						"Question" : "Which band is affected?",
						"Buttons" : [["Cust. to switch devices to 5 GHz band", "2.4 GHz"],
									["Perform Scan for Wireless AP in GUI", "5 GHz"],
									["Perform a Factory Reset.3", "Both"]]
		},
						
				
		"Cust. to switch devices to 5 GHz band" : {
						"Question" : "Advise Cust. to switch devices to 5 GHz band. Is the Internet speed still underperforming?",
						"Buttons" : [["Power cycle", "Yes"],
									["Working Unit!", "No"]]
		},
						
				
		"Power cycle" : {
						"Question" : "Power Cycle gateway.",
						"Buttons" : [["Complete", "Power Cycled gateway"]]
		},
						
				
		"Perform Scan for Wireless AP in GUI. Determine which 2.4 GHz WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage." : {
						"Question" : "Power Cycle gateway after making changes.",
						"Buttons" : [["Complete", "Power Cycled gateway"]]
		},
						
						
		"Complete" : {
						"Question" : "Has the Internet speed improved?",
						"Buttons" : [["Working Unit!", "Yes"],
									["Try disabling WMM & either lowering or removing Firewall settings.1", "No"]]
		},
					
					
		"Try disabling WMM & either lowering or removing Firewall settings.1" : {
						"Question" : "Try disabling WMM & either lowering or removing Firewall settings. Then conduct a speed test on: http://www.speedtest.net/",
						"Text" : ["Within parameters?"],
						"Buttons" : [["Working Unit!", "Yes"],
									["Perform a Factory Reset.4", "No"]]
		},
					
				
		"Perform a Factory Reset.3" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.3", "Factory Reset Gateway"],
									["Unable to complete.2", "Unable to Factory Reset"]]
		},
		
		
		"Done.3" : {
			"Question" : "Is the Internet speed still underperforming?",
			"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
			"Buttons" : [["Check cable signal levels in GUI", "Yes"],
						["Working Unit!", "No"]]
		},
				
				
		"Unable to complete.2" : { 
						"Question" : "We are unable to troubleshoot further without performing a Factory Reset",
						"Text" : ["Please call back when you are able to finish troubleshooting"]
		},
				
				
		"Perform a Factory Reset.4" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.4", "Factory Reset Gateway"],
									["Unable to complete", "Unable to Factory Reset"]]
		},
		
		
		"Done.4" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Use Guided-Assistance for in-warranty RMA", "Yes"],
									["Working Unit!", "No"]]
		},
		
				
		"Check cable signal levels in GUI" : {
			"Question" : "Check cable signal levels in GUI.  Are the DS/US Power, SNR levels within an acceptable range?",
			"Buttons" : [["Wireless_scan_powerCycle", "Yes"],
						["Re-direct Cust. to ISP to adjust cable signal levels", "No"]]
		},
			
				
		"Wireless_scan_powerCycle" : {
						"Question" : "Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage. Power Cycle gateway.",
						"Buttons" : [["Finished", "Power Cycled gateway"]]
		},
						
						
		"Finished" : {
			"Question" : "Is the Internet speed still underperforming?",
			"Text" : ["Suggest moving gateway to another location in the household due to possible interference issues or the addition of a wireless extender"],
			"Buttons" : [["Use Guided-Assistance for in-warranty RMA", "Yes"],
						["Working Unit!", "No"]]
		},
					
				
		"Client connected to 2.4GHz or 5GHz radio?" : {
						"Question" : "2.4 GHz or 5 GHz radio?",
						"Buttons" : [["Cust. to switch device to 5 GHz band.", "2.4 GHz"],
									["Cust. to switch to 2.4 GHz band.", "5 GHz"]]
		},
						
				
		"Cust. to switch device to 5 GHz band." : {
						"Question" : "Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for 2.4 GHz band? Advise customer to change to a channel with less usage",
						"Text" : ["                                                                 ",
								  "Try disabling WMM & either lowering or removing Firewall settings"],
						"Buttons" : [["Is the Internet speed still underperforming?", "Finished"]]
		},
		
		
		"Cust. to switch to 2.4 GHz band." : {
			"Question" : "Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for 5 GHz band? Advise customer to change to a channel with less usage",
						"Text" : ["                                                                 ",
								  "Try disabling WMM & either lowering or removing Firewall settings"],
						"Buttons" : [["Is the Internet speed still underperforming?", "Finished"]]
		},
						
				
		"Is the Internet speed still underperforming?" : {
			"Question" : "Is the Internet speed still underperforming?",
			"Buttons" : [
				["Power cycle client device affected", "Yes"],
				["Conduct a speed test", "Check Speed"]]
		},
						
				
		"Conduct a speed test" : {
						"Question" : "Conduct a speed test on: http://www.speedtest.net/, are the results within parameters?",
						"Buttons" : [
							["Working Unit!", "Yes"],
							["Perform a Factory Reset.5", "No"]]
		},
					
					
		"Perform a Factory Reset.5" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.5", "Factory Reset Gateway"],
									["Unable to complete", "Unable to Factory Reset"]]
		},
						
						
		"Done.5" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Use Guided-Assistance for in-warranty RMA", "Yes"],
									["Working Unit!", "No"]]
		},		
									
									
		"Power cycle client device affected" : {
						"Question" : "Power Cycle gateway",
						"Text" : ["Check cable signal levels when device finishes reboot"],
						"Buttons" : [["Check cable signal levels", "Check cable signal levels"]]
		},
						
				
		"Check cable signal levels" : {
						"Question" : "Are the DS/US Power, SNR levels, within an acceptable range?",
						"Buttons" : [["Done", "Yes"],
									["Perform a Factory Reset.6", "No"]]
		},
						
				
		"Perform a Factory Reset.6" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Skips" : ["Done.6", "Perform a Factory Reset.6"],
						"Buttons" : [["Done.6", "Factory Reset Gateway"],
									["Unable to complete", "Unable to Factory Reset"]]
		},
								

		"Done.6" : {
			"Question" : "Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/",
			"Text" : ["Is the Internet speed still underperforming?"],
			"Buttons" : [["Re-direct Cust. to ISP to adjust cable signal levels", "Yes"],
						["Working Unit!", "No"]]
		},	
			
				
		"Use Guided-Assistance for in-warranty RMA" : {
			"Question" : "Please navigate to the Guided-Assistance tool and begin in-warranty RMA process",
			"Text" : ["Additionally, the Cust. can check if speed is limited by ISP or Network drivers on client device."]
		},
		
		
		"Working Unit!" : {
			"Question" : "Please inform Customer their device is working as expected.",
			"Text" : ["Please copy text from the tool into Salesforce case notes"]
		},
		
		
		
		"firsttime2" : {
			"Question" : "Has the customer contacted the service provider to provision the modem?",
			"Popmsg" : "If the customer has attempted activation, we need to troubleshoot for improper activation or other problems.\n\nIf the customer has gone through self-activation, or had the provider \"scan\" the modem at their office, say \"Yes\"",
			"Text" : ["Verify the customer has given the HFC MAC ID."],
			"Skips" : [
				["provisioned", "iptest"]
			],
			"Buttons" : [
				["iptest", "Yes", "provisioned"],
				["provision", "No"]
			]
		},
		
		"comcast-provision" : { 
			"Question" : "Does the customer have the information required to complete self-activation?",
			"Popmsg" : "If the customer has the information required for self-activation, we will assist with the self-activation.",
			"Text" : ["The customer will either need their Comcast account number and phone number on the account, or their account username and password."],
			"Skips" : [
				["capdone", "provision_cap"],
				["comcast-preinstall", "comcast-provision5"],
				["capinfo", "comcast-provision3"]
			],
			"Buttons" : [
				["comcast-provision3", "Yes", "cap", "capinfo"],
				["provision", "No", "cap"]
			]
		},
		
		"comcast-provision3" : {
			"Question" : "Clear the browser cache and reboot the computer and the modem.",
							
			"Popmsg" : "This ensures browser cache contents and computer behavior are not impacting the activation page.",
			"Text" : [
				"If you can not do one or both steps, note why and proceed.",
				"If asked for what time frame to clear, choose the option to clear all.",
				"If given a list of what items to clear, choose at least \"Temporary Internet Files\" or \"Cache\"."
			],
			"Table" : [
				["***&nbsp;", "***Windows", "***Mac"],
				["***Internet Explorer", "Tools&gt;Safety&gt;Delete Browsing History<br />Control+Shift+Delete", "&nbsp;"],
				["***Firefox", "Firefox&gt;History&gt;Clear Recent History<br />Control+Shift+Delete", "&#8984;Command-Shift-Delete"],
				["***Chrome", "&#9776;Menu&gt;More Tools&gt;Clear Browsing Data<br />Control+Shift+Delete", "&#9776;Menu&gt;More Tools&gt;Clear Browsing Data<br />&#8984;Command-Shift-Delete"],
				["***Safari", "&nbsp;", "History&gt;Clear History and Website Data<br />Safari&gt;Empty Cache (earlier versions)"]
			],
			"Buttons" : [
				["comcast-provision5-1", "Done"]
			]
		},
		
		"comcast-provision5-1" : {
			"Question" :	"Can the customer get online?",
			"skips":[
				["cap_noinet", "provision_cap"]
			],
			"Buttons" : [
				["resolved_cap", "Yes"],
				["checkledcap", "No","cap_noinet"]
			]
		},
		
		"onlinesolidcap" : {
			"Question" : "Can the customer get online?",
			
			"Buttons" : [
				["resolved_cap", "Yes"],
				["checkledcap", "No"]
			]
		},
		
		"checkledcap" : {
			"Question" : "What is the LED status?",
			"Popmsg" : "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"LEDchart" : [
				["poweroff", "off", "off", "off", "off"],
				["powerreset", "flashing", "*", "*", "*"],
				["powerreset", "solid", "off", "off", "off"],
				["tvserv", "solid", "flashing", "off", "off"],
				["sendreset", "solid", "solid", "flashing", "off"],
				["provreset_led", "solid", "flashing", "flashing", "solid"],
				["provreset_led", "solid", "flashing", "flashing", "off"],
				["comcast-provision6", "solid", "solid", "solid", "solid"],
				["provreset_led", "solid", "solid", "solid", "*"]				
			],
			"LEDfail" : "powerreset"
		},
		
			
		"comcast-provision5" : {
			"Question" : "Can the customer get online?",
			"Popmsg" : "We are testing to see if we still need to assist with getting to the self-activation.",
			"Skips" : [
				["cap_manual_attempt", "comcast-provision7"],
				["cap_page", "comcast-provision7"],
				["cap_attempted", "comcast-provision6"]
			],
			"Buttons" : [
				["resolved", "Yes"],
				["provision_page", "Got self-activation", "cap_page"],
				["comcast-provision6", "No"]
			]
		},
		
		"comcast-provision6" : {
			"Question" : "Can the customer access self-activation by going to http://www.comcast.com/activate?",
			"Text": ["</br>The redirect to Comcast Activation page will not work when navigating to secured sites that begins with https such as google.com, yahoo.com, banks, email or social media sites."],
			"Popmsg" : "We are trying to access the self-activation page manually.",
			"Skips":[
				["YesComAct", "provision_cap"]
			],
			"Buttons" : [
				["provision_page", "Yes", "cap_manual_attempt", "cap_page"],
				["comcast-provision7", "No","cap_manual_attempt"]
			]
		},
		
		"comcast-provision6-1" : {
			"Question" : "Can the customer access self-activation by going to http://www.comcast.com/activate?",
			"Text": ["</br>The redirect to Comcast Activation page will not work when navigating to secured sites that begins with https such as google.com, yahoo.com, banks, email or social media sites."],
			"Popmsg" : "We are trying to access the self-activation page manually.",
			"Buttons" : [
				["provision_page", "Yes", "cap_manual_attempt", "cap_page"],
				["comcast-provision3", "No", "cap_manual_attempt"]
			]
			
		},
		
		"comcast-provision7" : {
			"Question" : "Verify the computer is set to obtain its IP and DNS settings automatically?",
			"Popmsg" : "Incorrect IP and DNS settings will interfere with self-activation.",
			"Table" : [
				["***IP address configuration articles"],
				["<a href=\"#\" onclick=\"window.open('http://arris.force.com/consumers/articles/General_FAQs/Windows-8-TCP-IP-configuration', 'newwindow', 'channelmode=yes, menubar=no, toolbar=no, scrollbars=yes, width=1000;height=200')\">Windows 8 / 8.1</a>"],
				["<a href=\"#\" onclick=\"window.open('http://arris.force.com/consumers/articles/General_FAQs/Windows-TCP-IP-Configuration-for-ARRIS-Motorola-Cable-Modems', 'newwindow', 'channelmode=yes, menubar=no, toolbar=no, scrollbars=yes, width=1000;height=200')\">Windows 2000 / XP / Vista / 7</a>"],
				["<a href=\"#\" onclick=\"window.open('http://arris.force.com/consumers/articles/General_FAQs/Windows-10-TCP-IP-Configuration', 'newwindow', 'channelmode=yes, menubar=no, toolbar=no, scrollbars=yes, width=1000;height=200')\">Windows 10 </a>"],
				["<a href=\"#\" onclick=\"window.open('http://arris.force.com/consumers/articles/General_FAQs/MAC-OS-X-TCP-IP-Configuration', 'newwindow', 'channelmode=yes, menubar=no, toolbar=no, scrollbars=yes, width=1000;height=200')\">Mac OS X</a>"]
			],
			"Skips" : [
				["dhcp", "provision"],
				["cap-redirect", "provision_cap"]
			],
			"Buttons" : [
				["comcast-provision6-1", "Yes Changed", "dhcp", "capdone", "cap-redirect", "provision_cap"],
				["comcast-provision6-1", "No already Done", "dhcp", "capdone", "cap-redirect", "provision_cap"]
			]
		},
		
		"retryprovision" : {
			"Question" : "Have we already redirected the customer to try provisioning again?",
			"Text" : ["There may be a DNS issue on the MSO side if www.arris.com is inaccessible."],
			"Popmsg" : "Provisioning may be incorrect or incomplete.",
			"Skips" : [
				["firsttime", "retryprovision-firsttime"]
			],
			"Buttons" : [
				["rma", "Yes"],
				["provision", "No"]
			]
		},
		
		"retryprovision_led" : {
			"Question" : "Have we already redirected the customer to try provisioning again?",
			"Popmsg" : "Provisioning may be incorrect or incomplete.",
			"Buttons" : [
				["rma", "Yes"],
				["provision", "No"]
			]
		},
		
		"retryprovision-firsttime" : {
			"Question" : "Have we already redirected the customer to try provisioning again?",
			"Popmsg" : "Provisioning may be incorrect or incomplete.",
			"Buttons" : [
				["rma", "Yes"],
				["provision", "No"],
				["comcast-provision", "No (Comcast)"]
			]
		},
		
		"iptest" : {
			"Question" : "Can the customer access the ARRIS homepage by going to 128.136.141.21?",
			"Text" : ["To test from your browser, click the \"info\" button."],
			"Popmsg" : "This tests whether the problem is DNS-related.\n\nPress OK to open 128.136.141.21 in your browser.",
			"Poplink" : "http://128.136.141.21/",
			"Buttons" : [
				["provreset2", "Yes"],
				["pingtest", "No"]
			]
		},
		
		"pingtest" : {
			"Question" : "Can the customer ping 8.8.8.8?",
			"Popmsg" : "This tests whether the customer has any WAN access at all.\n\nIf this passes after the previous test failed, there may be a provisioning issue.\nIf responses come from a different address, Cust. may still be in a \"Walled Garden\" unprovisioned state.",
			"Buttons" : [
				["provreset2", "Yes"],
				["guitest", "No"],
				["guitest", "Unable to test"],
				["provreset", "Responses come from a different address"]
			]
		},
		
		
		"pingtest2" : {
			"Question" : "Can the customer access www.arris.com?",
			"Text" : ["Advise Cust. to set static DNS on client device to 8.8.8.8 (google's DNS server), then try accessing the ARRIS website"],
			"Popmsg" : "This tests whether the customer has any WAN access at all.\n\nIf this passes after the previous test failed, there may be a provisioning issue.\nIf responses come from a different address, Cust. may still be in a \"Walled Garden\" unprovisioned state.",
			"Buttons" : [
				["provreset2", "Yes"],
				["retryprovision", "No"],
				["provreset", "Responses come from a different address"]
			]
		},
		
		
		"guitest" : {
			"Question" : "Can the customer access the modem GUI?",
			"Popmsg" : "This confirms whether LAN access is working.",
			"Skips" : [
				["guiaccess", "provreset2"]
			],
			"Table" : [
				["***SB modem default", "http://192.168.100.1/"],
				["***SBG series default", "http://192.168.0.1/"]
			],
			"Buttons" : [
				["provreset2", "Yes", "guiaccess"],
				["troubgui", "No"]
			]
		},
		
		"troubgui" : {
			"Question" : "Troubleshoot GUI access. Check steps 1-3. What does the customer see?",
			"Text" : ["                                                   ",
					  "1. Restart the modem with the Coaxial cable disconnected and try accessing the GUI while hardwired to a computer.",
					  "2. Try another web browser.",
					  "3. Check IPv4 Address of client device that is currently connected, one of the following should be displayed:",
					  "***192.168.100.X  (192.168.0.X if Gateway)",
					  "***169.254.X.X",
					  "***Media disconnected/Cable unplugged"],
			"Noteheight" : "6em",
			"Popmsg" : "Troubleshoot manually to restore GUI access. Confirm the computer is getting a valid IP address from the modem and the computer is connected to the modem properly.\nTry restarting the modem with the Coaxial cable disconnected if the comptuer is getting an address that starts with 169.254.x.x.\n\nConsult Tier 2 if needed on this step.",
			"Buttons" : [
				["192.168.100.X (192.168.0.X if gateway)", "192.168.100.X (192.168.0.X if gateway)", "guiaccess"],
				["169.254.X.X", "169.254.X.X"],
				["Media disconnected/Cable unplugged", "Media disconnected/Cable unplugged", "reset", "guiaccess"],
				["troubguionline", "GUI Access Restored"] 
			]
		},


		"192.168.100.X (192.168.0.X if gateway)" : {
			"Question" : "Try to access GUI. Is GUI access restored?",
			"Buttons" : [
				["troubguionline", "Yes"],
				["rma", "No"]
			]
		},
		
		
		"169.254.X.X" : {
			"Question" : "Power cycle the modem and client device. Follow the procedure listed below:",
			"Text" : ["                                          ",
					  "1) Disconnect the modem from power source.",
					  "2) Power off the client device (or disconnect the Ethernet cable).",
					  "3) Plug the modem back into power.",
					  "4) Wait for the first four lights on the modem to become solid.",
					  "5) Power ON the client device (or reconnect the Ethernet cable)",
					  "-----------------------------------------------------------------------------",
					  "Test another client device (or use Wi-Fi connection if product is a gateway)"],
			"Buttons" : [
				["GUI Restored", "Test Complete"]
			]
		},
		
		
		"GUI Restored" : {
			"Question" : "Try to access the GUI. Is GUI access restored?",
			"Buttons" : [
				["troubguionline", "Yes"],
				["rma", "No"]
			]
		},


		"Media disconnected/Cable unplugged" : {
			"Question" : "Check physical connections, make sure Ethernet port LED lights are illuminated/blinking",
			"Text" : ["Test another Ethernet cable and a different client device."],
			"Buttons" : [
				["GUI Restored", "Test Complete"]
			]
		},


		"troubguionline" : {
			"Question" : "Is Internet access now working?",
			"Popmsg" : "The steps taken to regain GUI access may have restored Internet access as well.",
			"Buttons" : [
				["resolved", "Yes"],
				["provreset2", "No"],
				["checkled", "Lights no longer solid"]
			]

		},
		
		"poweroff" : {
			"Question" : "Try a different power outlet and/or cord.",
			"Popmsg" : "SHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"Skips" : [
				["power", "rma"]
			],
			"Buttons" : [
				["checkled", "Done", "power"]
			]
		},
		
		"powerreset" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any user settings, automatically learned settings, or provisioning errors stored in the modem that could cause the modem to appear to malfunction.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "rma"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["checkled", "Factory reset modem", "reset"],
				["rma", "Unable to factory reset"]
			]
		},
		
		"sigreset" : {
			"Question" : "Perform a factory reset.",
			"Popmsg" : "This will clear any automatically learned settings or provisioning errors stored in the modem that could prevent the modem from locking onto the correct channels.\n\nFor SBG series, hold the reset button in the back of the modem with a pointed object for 5-10 seconds.\n\nFor SB series, follow the steps below:\n\t1) Go to 192.168.100.1 in a web browser (preferably while connected directly to modem via Ethernet).\n\t2) Go to Configuration, then click \"Reset All Defaults\" or \"Restore Factory Defaults\".\n\t3) Click \"Restart Cable Modem\" or \"Reboot\", or powercycle the modem.",
			"Skips" : [
				["reset", "signal"],
				["nosigreset", "signal"]
			],
			"Text" : [
				"***Advise the customer any custom settings will be lost."
			],
			"Buttons" : [
				["checkled", "Factory reset modem", "reset"],
				["signal", "Unable to factory reset"]
			]
		},
		
		"tvserv" : {
			"Question" : "If the customer has TV service from same provider as Internet, is it working?",
			"Popmsg" : "If the customer has TV service that is also malfunctioning, there is a cable signal problem affecting both.\nInability to view on-demand content can indicate signal problems as well.\nIf the TV is unaffected, the signals may not be poor enough to affect TV noticably or only certain channels may be affected.",
			"Skips" : [
				["tv", "checkconnect"]
			],
			"Buttons" : [
				["checkconnect", "TV working", "tv"],
				["redirsignal", "TV not working"],
				["checkconnect", "No TV subscription", "tv"]
			]
		},
		
		"checkconnect" : {
			"Question" : "Troubleshoot the coaxial connection, bypass splitters, and powercycle the modem.",
			"Popmsg" : "If any splitters are present, bypass them. Make sure no cables are visibly damaged and try another coaxial outlet if available.\n\nSHORTCUT: Click an LED's name to set it flashing and all lights above it solid.\nThe remaining lights, if applicable, will be set off",
			"Noteheight" : "8em",
			"Skips" : [
				["linecheck", "sigreset"]
			],
			"Buttons" : [
				["checkled", "Done", "linecheck"]
			]
		},
		
		"rma" : {
			"Question" : "Replacement may be needed. Consult RMA policy.",
			"Poplink" : "https://arris.my.salesforce.com/articles/General_FAQs/ARRIS-Product-Warranty-Replacement-Guidelines",
			"Popmsg" : "Salesforce article for RMA policy will open in new window.\nYou must be logged into Salesforce in this browser for the page to load.",
			"Skips" : [
				["nodirect", "nodirectrma"]
			],
			"Text" : [
				"Click \"info\" for RMA policy article.",
				"Verify device is in warranty. Obtain authorization from Tier 2 to replace if needed."
			],
			"Buttons" : [
				["rmainwarr", "In warranty"],
				["rmaoow", "Out of warranty"],
				["rmamso", "MSO product"],
				["rmatroub", "Additional troubleshooting required"]
			]
		},
		
		"nodirectrma" : {
			"Question" : "Replacement may be needed. Consult RMA policy.",
			"Poplink" : "https://arris.my.salesforce.com/articles/General_FAQs/ARRIS-Product-Warranty-Replacement-Guidelines",
			"Popmsg" : "Salesforce article for RMA policy will open in new window.\nYou must be logged into Salesforce in this browser for the page to load.",
			"Text" : [
				"Click \"info\" for RMA policy article.",
				"***A direct wired connection to the modem was required during troubleshooting but could not be tested!",
				"***We may still need to connect directly to the modem to properly troubleshoot.",
				"Verify device is in warranty. Obtain authorization from Tier 2 to replace if needed."
			],
			"Buttons" : [
				["rmainwarr", "In warranty"],
				["rmaoow", "Out of warranty"],
				["rmamso", "MSO product"],
				["rmatroub", "Additional troubleshooting required"]
			]
		},
		
		"rma2" : {
			"Question" : "What is the warranty status?",
			"Poplink" : "https://arris.my.salesforce.com/articles/General_FAQs/ARRIS-Product-Warranty-Replacement-Guidelines",
			"Popmsg" : "Salesforce article for RMA policy will open in new window.\nYou must be logged into Salesforce in this browser for the page to load.",
			"Text" : [
				"***Click \"info\" for RMA policy article."
			],
			"Buttons" : [
				["rmainwarr", "In warranty"],
				["rmaoow", "Out of warranty"],
				["rmamso", "MSO product"]
			]
		},

		"signal" : {
			"Question" : "Have we redirected to the service provider already to check the cable signal?",
			"Popmsg" : "There may be a cable signal problem based on the led status. The provider will need to check the cable line for issues if they have not already done so.",
			"Buttons" : [
				["rma", "Yes"],
				["redirsignal", "No"]
			]
		},
		
		"rmatroub" : {
			"Question" : "Provide additional troubleshooting.",
			"Noteheight" : "12em",
			"Text" : ["Consult Tier 2 if needed for troubleshooting or replacement authorization."],
			"Popmsg" : "Troubleshoot to verify whether replacement is needed.\nEnter notes about additional troubleshooting in notes field.",
			"Buttons" : [
				["rma2", "Replacement needed"],
				["resolved", "Replacement not needed"]
			]			
		},
	
		"rmainwarr" : {
			"Question" : "Has the customer owned the modem longer than 20 days?",
			"Popmsg" : "If the customer has owned the modem for a short time, they may still be able to exchange it with the retailer. This could be more convenient for the customer than our warranty replacement options.\n\nConsult Guided Assistance for scripting.",
			"Buttons" : [
				["rmainwarr2", "Yes"],
				["exchange", "No"]
			]
		},

		"exchange" : {
			"Question" : "Please read the RMA Script (in Guided Assistance) to the customer.",
			"Popmsg" : "If the customer has owned the modem for a short time, they may still be able to exchange it with the retailer. This could be more convenient for the customer than our warranty replacement options.\n\nConsult Guided Assistance for scripting.",
			"Text" : ["***Use Guided Assistance for scripting."],
			"Buttons" : [
				["exchange2", "Exchanging with retailer"],
				["rmainwarr2", "Unable to exchange"],
				["rmainwarr2", "Does not want to exchange"]
			]
		},

		"resolved" : {
			"Question" : "This case is resolved. Please offer ARRIS Assist program to the customer.",
			"Skips" : [
				["cap", "resolved_cap"]
			],
			"Text" : ["Perform any additional troubleshooting or services as needed."]
		},

		"resolved_cap" : {
			"Question" : "This case is resolved. Please offer ARRIS Assist program to the customer.",
			"Text" : [
				"***Copy entire flow into Salesforce comments",
				"Perform any additional troubleshooting or services as needed."
			]
		},
		
		"provision" : {
			"Question" : "Redirect to service provider for provisioning.",
			"Skips" : [
				["cap", "provision_cap"]
			],
			"Text" : ["Advise the customer to ensure the MSO collects the HFC MAC ID. Explain to customer there may be a DNS error and to inform the MSO support rep."]
		},
		
		"provision_cap" : { 
			"Question" : "Redirect to service provider for provisioning.",
			"Text" : [
				"Advise the customer to have the Account Number, Phone Number (associated with account), Modem Model Number, Modem Serial Number, Modem HFC MAC ID, and EMTA MAC Address as needed."
			]
		},
		
		"provision_page" : {
			"Question" : "Advise customer to proceed with self-activation page or call MSO to activate.",
			"Skips" : [
				["cap", "provision_page_cap"]
			],
			"Text" : [
				"Advise customer to contact MSO if they do not know information requested by this page.",
				"Advise customer to contact MSO for activation if self-activation fails."
			]
		},
		
		"provision_page_cap" : { 
			"Question" : "Does the customer have the information required to complete self-activation?",
			"Text" : [
				"The customer will either need their Comcast account number and phone number on the account, or their account username and password."
			],
			"Popmsg": "The Comcast account number can be found on the billing statement, via the Comcast app or the work order for the service requested from Comcast. In addition, if the Comcast account previously created, the username or email and password can be used to proceed with the activation steps.",
			"Skips" : [
				["capinfo", "provision_page_cap2"]
			],
			"Buttons" : [
				["provision_page_cap2", "Yes", "capinfo"],
				["provision_cap", "No"]
			]
		},
		
		"provision_page_cap2": { 
			"Question" : "Follow Comcast self-activation process per article #15983",
			"Text" : [
				"<a href=\"#\" onclick=\"window.open('https://arris.my.salesforce.com/articles/General_FAQs/Comcast-Self-Activation-Process?popup=false&id=kA3a0000000ciba', 'newwindow', 'channelmode=yes, menubar=no, toolbar=no, scrollbars=yes, width=800;height=200')\">**Link Article #15983</a>",
				"You need to be in the same browser as Salesforce to use this link."
			],
			"Popmsg": "** Under \"Activation\", click on the appropriate activation URL. Enter the Comcast Account Number and phone number associated with the Comcast Activate.",
					
			"Buttons": [
				["provision_page_cap3", "Next"]
			]
		},

		"provision_page_cap3" : {  
			"Question" : "Is activation successful?",
			"Text" : [
				"If the customer gets an error about an incorrect account number and phone number or username and password, choose \"No (incorrect login)\""
			],
			"Popmsg": "Follow the prompts and allow the modem to power on completely. The front LEDs will be solid when it has reached this state. The modem may reboot a few times during the activation process, which is normal.",
			"Buttons" : [
				["provision_page_cap4", "Yes", "YesComAct"],
				["comcast-provision7", "No", "cap_attempted"],
				["provision_cap", "No (incorrect login)", "cap_attempted"]
			]
		},
		
		"provision_page_cap4": { 
			"Question" : "Verify Internet Connection by navigating to www.arris.com or 128.136.141.21",
			"Popmsg": "If the wireless computer is used for activation, it may briefly lose wireless connection and will need to reconnect to the wireless network. It is recommended to turn off the wireless setting and then on again in order to refresh the list of available wireless networks.",
			"Skips": [
				["capdone", "provision_page_cap6"]
			],
			"Buttons" : [
				["resolved_cap", "Yes"],
				["comcast-provision3", "No", "cap_attempted"]
			]
		},
		
		"provision_page_cap5": {  
			"Question": "Follow \"Troubleshoot\" steps as outlined in article #15983.",
			"Buttons":[
				["provision_page_cap6", "Next"]
			]
		},
		
		"provision_page_cap6":{ 
			"Question": "Verify Internet Connection by navigating to www.arris.com or 128.136.141.21",
			"Buttons": [
				["resolved_cap", "Yes"],
				["provision_cap", "No"]
			]
		},

		"exchange2" : {
			"Question" : "Customer will exchange modem with retailer."
		},

		"rmainwarr2" : {
			"Question" : "Process warranty replacement."
		},
		
		"rmaoow" : {
			"Question" : "Advise device needs to be replaced and is not in warranty.",
			"Text" : ["Offer upsell if applicable."]
		},
		
		"rmamso" : {
			"Question" : "Redirect to service provider for replacement."
		},
		
		"redirsignal" : {
			"Question" : "Redirect to service provider to check cable signal."
		},
		
		"manufacturer" : {
			"Question" : "Redirect to manufacturer of affected client."
		},
		
		"troubwifi" : {
			"Question" : "Troubleshoot wireless connection issues."
		},
		
		"troubeth" : {
			"Question" : "Troubleshoot wired connection issues."
		},
		
		"na" : {
			"Question" : "This tool does not apply.",
			"Text" : ["Do not use notes from this tool."]
		}
	}
}