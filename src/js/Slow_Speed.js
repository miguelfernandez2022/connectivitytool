{
	"title" : "Slow Speed workflow",
	
	"steps" : {
			"START" : {
					"Question" : "Is this device compatible with subscribed speed tier?",
					"Text" : ["What is your subscribed internet speed tier?",
								"Check and verify the modem/gateway is compatible with MSO",
								"Ask Cust. what client devices are connected/affected?",
								"Where is your modem/gateway placed in your household?"],
					"Buttons" : [["ifNO", "NO"],
								["ifYES", "Modem or Gateway"]]
					},
					
			"ifYES" : {
					"Question" : "Modem or Gateway?",
					"Buttons" : [["ifModem", "Modem"],
								["ifGateway", "Gateway"]]
					},
					
			"ifNO" : {
					"Text" : ["Advise Cust. their device is not compatible with their ISP speed tier"],
					"NoNotes" : "true"
					},
			
					
			"ifModem" : {
					"Question" : "Do you have more than one client?",
					"Text" : ["Conduct a speed test on: hhtp://www.speedtest.net/",
							  "Please document speed test results",
							  "Compare Subscribed ISP speed v. Advertised device speed v. Speed test results"], 
					"Buttons" : [["Jump Point C", "No"],
								["ifYES1", "Yes"]]
					},	
					
					
			"Jump Point C" : {
					"Question" : "Can you connect to the modem via Ethernet?",
					"Text" : ["Ethernet port LED = Green - Gigabit transfer rate",
							  "Ethernet port LED = Amber - < Gigabit transfer rate"],
					"Buttons" : [["Bypass WiFi router and directly connect modem to PC via Ethernet", "Yes"],
								["Check back panel Ethernet LEDs between modem-router", "No"]]
					},
							
			
			"ifYES1" : {
					"Question" : "Which clients are affected?",
					"Text" : ["Issue may lie with the client device. If this appears to be the case please re-direct Cust. to client device manufacturer"],
					"Buttons" : [["Check connections between Coax-Modem, also between Modem/Router-PC", "All clients"],
								["Jump Point B", "Some clients"],
								["Jump Point B", "Isolated client (one of many)"]]
					},
					
			"Check connections between Coax-Modem, also between Modem/Router-PC" : {
					"Question" : "Is the ONLINE Globe on?",
					"Text" : ["Check front panel LEDs"],
					"Buttons" : [["Jump Point C", "Yes"],
								["Perform a Factory Reset", "No"]]
					},		
					
					
			"Jump Point B" : {
					"Question" : "Is it an ARRIS router or a 3rd party WiFi router?",
					"NoNotes" : "true",
					"Buttons" : [["Jump Point D", "ARRIS"],
								["Perform a Factory Reset (3rd party router)", "3rd party"]]
					},
					
					
			"Perform a Factory Reset (3rd party router)" : {
					"Question" : "Perform a Factory Reset.",
					"Text" : ["Advise the customer any custom settings will be lost"],
					"Buttons" : [["Done", "Factory Reset Modem"],
								["Unable to complete", "Unable to Factory Reset"]]
					},
					
			
			"Unable to complete" : { 
					"Text" : ["We are unable to troubleshoot further without performing a Factory Reset",
							  "Please call back when you are able to finish troubleshooting"]
					},
					
					
			"Check back panel Ethernet LEDs between modem-router" : {
					"Question" : "Does the Ethernet connection deliver Gigabit speeds?",
					"Buttons" : [["Jump Point B", "No"],
								["Jump Point A", "Yes"]]
					},		
					
					
			"Jump Point A" : {
					"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
					"Text" : ["Check cable signal levels in GUI."],
					"Buttons" : [["Jump Point B", "Yes"],
								["Bypass splitters and check Coax-Modem connection. Then recheck cable signal levels", "No"]]
					},
					
			"Bypass splitters and check Coax-Modem connection. Then recheck cable signal levels" : {
					"Question" : "Is the Internet speed still underperforming?",
					"Buttons" : [["Monitor Network performance. If speed degrades re-direct to ISP to further troubleshoot with Tier 2", "No"],
								["Perform a Factory Reset.", "Yes"]]
					},


			"Monitor Network performance. If speed degrades re-direct to ISP to further troubleshoot with Tier 2" : {
					"Text" : ["Working Unit!"]
					},
					
			"Done" : {
					"Question" : "Within parameters?",
					"Text" : ["Conduct a speed test on: http://www.speedtest.net/"],
					"Buttons" : [["Re-direct Cust. to ISP to adjust cable signal levels with Tier 2", "No"],
								["Advise Cust. to try accessing websites that were underperforming on client device", "Yes"]]
					},
					
			
			"Advise Cust. to try accessing websites that were underperforming on client device" : {
					"Question" : "Is the Internet speed still underperforming?",
					"Text" : ["Reference article no. 17915 to determine what Wi-Fi Standard is supported on client devices"],
					"Buttons" : [["Use Guided-Assistance for in-warranty RMA", "Yes"],
								["Check if speed is limited by ISP or Network drivers on client device. Working unit!", "No"]]
					},
					
					
			"Re-direct Cust. to ISP to adjust cable signal levels with Tier 2" : {
					"Question" : "Re-direct Cust. to ISP to adjust signal levels",
					"Text" : ["Please advise Cust. to ask for a Tier 2 support agent"]
					},
					
					
			"Bypass WiFi router and directly connect modem to PC via Ethernet" : {
					"Question" : "Conduct a speed test on http://www.speedtest.net/. Is the internet speed still underperforming?",
					"Text" : ["Compare Subscribed ISP speed v. Advertised device speed v. Speed test results"],
					"Buttons" : [["Check back panel Ethernet LEDs between modem-PC", "Yes"],
								["Jump Point B", "No"]]
					},
			
			
			"Check back panel Ethernet LEDs between modem-PC" : {
					"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
					"Text" : ["Advise Cust. to check cable signal levels in GUI (192.168.100.1)"],
					"Buttons" : [["Re-direct Cust. to ISP to adjust cable signal levels with Tier 2", "No"],
								["Perform a Factory Reset.", "Yes"]]
					},
					
					
			"Perform a Factory Reset." : {
					"Question" : "Within parameters?",
					"Text" : ["Wait for all LEDs to turn solid. Conduct a speed test on http://www.speedtest.net/"],
					"Buttons" : [["Working Unit!", "Yes"],
								["Use Guided-Assistance for in-warranty RMA", "No"]]
					},
				
					
		
			"ifGateway" : {
					"Question" : "Globe On?",
					"Text" : ["Conduct a speed test on: http://www.speedtest.net/",
							  "Check front panel LEDs"],
					"Buttons" : [["ifNO", "Troubleshoot No Internet connection"],
								["Wired or Wireless?", "Yes"]]
					},
					
					
			"Wired or Wireless?" : {
					"Question" : "Wired or Wireless?",
					"Buttons" : [["Jump Point A", "Wired"],
								["Jump Point A", "Both"],
								["Jump Point D", "Wireless"]]
					},
					
					
			"Jump Point D" : {
					"Question" : "Which clients are affected?",
					"Buttons" : [["Check Wi-Fi signal levels and network SSID on client device. Then check front panel LEDs, verifying Wi-Fi radio band lights.", "All Clients"],
								["Which band is affected?", "Some Clients"],
								["Client connected to 2.4GHz or 5GHz radio?", "Isolated Client (one of many)"]]
					},

				
				
				
			"Check Wi-Fi signal levels and network SSID on client device. Then check front panel LEDs, verifying Wi-Fi radio band lights." : {
						"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
						"Text" : ["Check cable signal levels."],
						"Buttons" : [["2.4GHz or 5GHz radio experiencing problems?", "Yes"],
									["Perform a Factory Reset.1", "No"]]
			},
						
						
				"Perform a Factory Reset.1" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.1", "Factory Reset Modem"],
									["Unable to complete", "Unable to Factory Reset"]]
						},		
						
				
				"Done.1" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Re-direct Cust. to ISP to adjust cable signal levels with Tier 2", "Yes"]]
						},
				
				
				"2.4GHz or 5GHz radio experiencing problems?" : {
						"Buttons" : [["Advise Cust. to switch devices to 5GHz band.", "2.4GHz"],
									["Try disabling WMM & either lowering or removing Firewall settings", "Both"],
									["Advise Cust. to switch devices to 2.4GHz band.", "5GHz"]]
						},
						
						
				"Advise Cust. to switch devices to 5GHz band" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.", "Yes"],
									["Working Unit!", "No"]]
						},
						
						
				"Try disabling WMM & either lowering or removing Firewall settings" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.", "Yes"],
									["Working Unit!", "No"]]
						},		
						
						
				"Advise Cust. to switch devices to 2.4GHz band" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.", "Yes"],
									["Working Unit!", "No"]]
						},
						
						
				"Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage." : {
						"Question" : "Within parameters?",
						"Text" : ["Power Cycle Gateway.",
								  "Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "Yes"],
									["Perform a Factory Reset.2", "No"]]
						},
						
				
				"Perform a Factory Reset.2" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.2", "Factory Reset Modem"],
									["Unable to complete.1", "Unable to Factory Reset"]]
						},
						
						
				"Done.2" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Use Guided-Assistance for in-warranty RMA", "Yes"]]
						},
						
							
				"Unable to complete.1" : { 
						"Text" : ["We are unable to troubleshoot further without performing a Factory Reset",
								  "Please call back when you are able to finish troubleshooting"]
						},		
				
				
				
				
			"Which band is affected?" : {
						"Question" : "Which band is affected?",
						"Buttons" : [["Advise Cust. to switch devices to 5 GHz band.", "2.4 GHz"],
									["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.", "5 GHz"],
									["Perform a Factory Reset.3", "Both"]]
			},
						
				
				"Advise Cust. to switch devices to 5 GHz band." : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Perform Scan for Wireless AP in GUI. Determine which 2.4 GHz WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.", "No"],
									["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.1", "Yes"]]
						},
						
				
				"Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.1" : {
						"Question" : "Power Cycle gateway.",
						"Buttons" : [["Complete", "Power Cycled gateway"]]
						},
						
				
				"Perform Scan for Wireless AP in GUI. Determine which 2.4 GHz WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage." : {
						"Question" : "Power Cycle gateway.",
						"Buttons" : [["Complete", "Power Cycled gateway"]]
						},
						
				"Complete" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Try disabling WMM & either lowering or removing Firewall settings.1", "Yes"],
									["Working Unit!", "No"]]
						},
					
					
				"Try disabling WMM & either lowering or removing Firewall settings.1" : {
						"Question" : "Within paramters?",
						"Text" : ["Try disabling WMM & either lowering or removing Firewall settings. Then conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Peform a Factory Reset.4", "No"],
									["Working Unit!", "Yes"]]
						},
						
				
				"Perform a Factory Reset.3" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.3", "Factory Reset Modem"],
									["Unable to complete.2", "Unable to Factory Reset"]]
						},
						
						
				"Done.4" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Use Guided-Assistance for in-warranty RMA", "Yes"]]
						},
				
				
				"Unable to complete.2" : { 
						"Text" : ["We are unable to troubleshoot further without performing a Factory Reset",
								  "Please call back when you are able to finish troubleshooting"]
						},
				
				
				"Perform a Factory Reset.4" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.4", "Factory Reset Modem"],
									["Unable to complete", "Unable to Factory Reset"]]
						},
				
				"Done.3" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Check cable signal levels in GUI", "Yes"]]
						},
				
				
				"Check cable signal levels in GUI" : {
						"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
						"Buttons" : [["Re-direct Cust. to ISP to adjust signal levels", "No"],
									["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.2", "Yes"]]
						},
				
				
				"Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage.2" : {
						"Question" : "Power Cycle gateway.",
						"Buttons" : [["Finished", "Power Cycled gateway"]]
						},
						
				"Finished" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Suggest moving gateway to another location in the household due to possible interference issues or the addition of a wireless extender"],
						"Buttons" : [["Working Unit!", "No"],
									["Use Guided-Assistance for in-warranty RMA", "Yes"]]
						},
				
				
					
				
			"Client connected to 2.4GHz or 5GHz radio?" : {
						"Question" : "2.4 GHz or 5 GHz radio?",
						"Buttons" : [["Advise Cust. to switch device to other band.", "2.4 GHz"],
									["Advise Cust. to switch to other band.", "5 GHz"]]
			},
						
				
				"Advise Cust. to switch device to other band." : {
						"Text" : ["Perform Scan for Wireless AP in GUI. Determine which WiFi channels are experiencing heavy traffic for both bands? Advise customer to change to a channel with less usage",
								  "Try disabling WMM & either lowering or removing Firewall settings"],
						"Buttons" : [["Is the Internet speed still underperforming?", "Finished"]]
						},
						
				
				"Is the Internet speed still underperforming?" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Buttons" : [["Conduct a speed test on: http://www.speedtest.net/", "No"],
									["Power cycle client device affected", "Yes"]]
						},
						
				
				"Conduct a speed test on: http://www.speedtest.net/" : {
						"Question" : "Within parameters?",
						"Buttons" : [["Working Unit!", "Yes"],
									["Perform a Factory Reset.5", "No"]]
						},
					
					
				"Perform a Factory Reset.5" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.5", "Factory Reset Modem"],
									["Unable to complete", "Unable to Factory Reset"]]
						},
						
						
				"Done.5" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Check if speed is limited by ISP or Network drivers on client device. Use Guided-Assistance for in-warranty RMA", "Yes"]]
						},		
									
									
				"Power cycle client device affected" : {
						"Question" : "Power Cycle gateway",
						"Text" : ["Check cable signal levels when device finishes reboot"],
						"Buttons" : [["Check cable signal levels", "Check cable signal levels"]]
						},
						
				
				"Check cable signal levels" : {
						"Question" : "Are the DS/US Power, SNR levels within an acceptable range?",
						"Buttons" : [["Done", "Yes"],
									["Perform a Factory Reset.6", "No"]]
						},
						
				
				"Perform a Factory Reset.6" : {
						"Question" : "Perform a Factory Reset.",
						"Text" : ["Advise the customer any custom settings will be lost"],
						"Buttons" : [["Done.6", "Factory Reset Modem"],
									["Unable to complete", "Unable to Factory Reset"]]
						},
								

				"Done.6" : {
						"Question" : "Is the Internet speed still underperforming?",
						"Text" : ["Wait for all LEDs to become solid. Conduct a speed test on: http://www.speedtest.net/"],
						"Buttons" : [["Working Unit!", "No"],
									["Re-direct Cust. to ISP to adjust signal levels", "Yes"]]
						}	
			}				
}
								
								
								
								
								
								
								