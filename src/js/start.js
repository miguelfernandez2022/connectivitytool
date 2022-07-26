{
  "comments" : 
	[
		"Provisioning flowchart"
	],

  "title" : "SURFboard Troubleshooting Tool",

  "steps" : 
	{
		"START" : 
		{
			"Question" : "Does this tool apply to the current issue?",
			"Popmsg" : "Use this tool whenever you need to troubleshoot a device with technical issues, this tool will provide guidance and help to educate customers on the issue reported for wired or wireless connection." ,
			"Text" : 
			[
				"***This tool applies to SURFboard products with slow/no internet access"				
			],
			"QuestionsTemplate": 
			[
				"When did the issue first appear?: ", 
				"How often and what time of day does the issue occur?: ",
				"Any changes in the network when the issue started?: ", 
				"Is the entire network affected? (Y/N): "
			],
			"Table" : 
			[
				["***USE IF: ", "*** "],
				["This is a Cable modem/Wi-Fi gateway", "No Internet access"],
				["First-time activation","Device won't power on"],
				["Slow speed connection","Intermittent connection"],
				["Device reboot itself","All clients are impacted"]			
			],
			"Buttons" : 
			[
				["isp__compatibility", "Yes"],
				["non__applicable", "No"]
			]
		},

    "non__applicable" : 
		{
			"Question" : "This tool does not apply.",
				"Text" : ["Do not use notes from this tool"]
		},

		"isp__compatibility": 
		{
			"Question" : "Is this device compatible with subscribed speed tier?",
			"Popmsg": "Refer to Article 000009802 \n\t",
			"Text": 
			[ 
				"***Check and verify the modem/gateway is compatible with MSO",
				"'Wired Download Speed' this refers to how fast your modem,", 
				"  pulls data from the Internet via wired connection. ",
				"<a href='http://arris.force.com/consumers/articles/General_FAQs/Service-Provider-Modem-Compatibility-List' target = '_blank'>SERVICE PROVIDER MODEM COMPATIBILITY LIST</a>"
			],
			"QuestionsTemplate":
			[
				"What is your subscribed internet speed tier? ",
				"Speed tier plan: ",
				"According to the ISP, what is the 'Wired Download Speed':  "
			],
			"Buttons":
			[
				["device__rebooting", "Yes"],
				["device__rebooting", "ISP Confirm is not compatible"],
				["non__compatible","No"]
			]
		},

		"non__compatible": 
		{
			"Question" : "These device is not compatible with the service provider or speed tier plan",
			"Text" : 
			[ 
				"<br>",
				"*** Advise to change speed tier plan"
			]			
		},

		"device__rebooting": 
		{
			"Question" : "Is the device rebooting on its own?",
			"Popmsg" : "Is the device rebooting on its own? ",
			"Text" : 
			[
				"Guide the customer to make sure, the cable are conencted and tight"
			],
			"Buttons" : 
			[
				["device_rebooting__device", "Yes"],
				["device_model", "No"]
			]
		},

		"device_model": 
		{
			"Question": "Identify the group model for the product",
			"TextCheckbox": 
			[
				"Model number:"
			],
			"Skips":
			[	
				["sbg8300","sbg8300__checkled"],
				["group1led","1led__checkled"],
				["group3led","3led__checkled"],
				["group4led","4led__checkled"]
			],
			"Table":
			[
				["***","***Grupo 1-LED","***Group 3-LED","***Group 4-LED"],
				["SBG8300","S33","SBG10","SB6121"],
				["","G34","SBG7600AC2","SB6141"],
				["","G36","SBG7400AC2","SB6183"],
				["","","SBG6950AC2","SB6190"],
				["","","SBG7580-AC","SB8200"],
				["","","SVG2482AC","TM822 (G/R/... )"],
				["","","T25","SBG6400"],
				["","","SBV2402","SBG6900"],
				["","","SBV3202","SBG6580"],
				["","","","SBG6782"]
			],
			"Buttons": 
			[
				["sbg8300__checkled","SBG8300","sbg8300"],
				["1led__checkled","Group 1-LED","group1led"],
				["3led__checkled","Group 3-LED","group3led"],
				["4led__checkled","Group 4-LED"]
			]
		},

		"redirect_toprovision":
		{
			"Comments": "provisioning procedure",
			"Question": "Have we already redirected the Customer to try provising again?",
			"Text": 
			[	
				"***There MUST be an existing case or note where the customer",
				"***was already redirected to the Service Provider from our end."
			],
			"Skips":
			[	
				["1ledtoprovision","1led_redirect_toprovision"]	
			],
			"QuestionsTemplate":
			[
				"Case number: "
			],			
			"Buttons": 
			[
				["replace_unit","Yes"],
				["provision","No"]
			]
		},

		"provision" : {
			"Question" : "Redirect to service provider for provisioning.",
			"Skips" : 
			[
				["provision_remotly", "provision_remotly"]
			],
			"Text" : 
			[	
				"<br>",
				"Advise the customer to ensure the MSO collects the HFC MAC ID.",
				 "Explain to customer there may be a DNS error and to inform the MSO support rep."
			]
		},


		"replace_unit": 
		{
			"Comments": "Replace the unit procedure",
			"Question": "Replacement may be needed. Consult RMA policy.",
			"Poplink" : "https://arris.my.salesforce.com/articles/General_FAQs/ARRIS-Product-Warranty-Replacement-Guidelines",
			"Text": 
			[ 
				"Salesforce article for RMA policy will open in new window.",
				"You must be logged into Salesforce in this browser for the page to load.",
				"Click \"info\" for RMA policy article.",
				"Verify device is in warranty. Obtain authorization from Tier 2 to replace if needed."
			],
			"QuestionsTemplate":
			[
				"Approved by: ",
				"Warranty expiration date:  "
			],
			"Skips":
			[
				["1ledtoreset","1led_factory_reset"]
			],
			"Buttons":
			[
				["replace_in__warranty", "In Warranty"], 
				["replace_out__warranty", "Out warranty"],
				[ "replace_mso__Product", "MSO product"], 
				["replace_additional__troubleshoot","Additional troublesotting required"]
			]
		},
		"replace_out__warranty": 
		{
			"Question" : "Advise device needs to be replaced and is not in warranty.",
			"Text" : ["Offer upsell if applicable."]
		},
		"replace_mso__Product":
		{
			"Question" : "Redirect to service provider for replacement."
		},	
		"replace_additional__troubleshoot": 
		{
			"Question" : "Advise device needs to be replaced and is not in warranty.",
			"Buttons" : 
			[
				["replace_unit","Done"]
			] 
		},
		"replace_in__warranty": 
		{
			"Question": "Has the customer owned the modem longer than 20 days?",			
			"Text" : 
			[ 
				"If the customer has owned the modem for a short time",
				"they may still be able to exchange it with the retailer.",
				"This could be more convenient for the customer than our warranty replacement options.",
				"Consult Guided Assistance for scripting."
			],
			"Buttons" : 
			[  
				["process__warranty__replacement", "Yes"], 
				["replace_in_warranty__exchange", "No"] 
			]
		},
		"process__warranty__replacement":
		{
			"Question": "Proccess warranty replacement",
			"Text" : ["<br>", "***Use the guide for phone payment or email payment."]
		},
		"replace_in_warranty__exchange":
		{
			"Question": "Please read the RMA Script (in Guided Assistance) to the customer.",
			"Text" : 
			[ 
				"***Use Guided Assistance for scripting.",
				"If the customer has owned the modem for a short time",
				"they may still be able to exchange it with the retailer.",
				" This could be more convenient for the customer than our warranty replacement options."
			],
			"Buttons" : 
			[	
				["process__warranty__exchange_with_retailer", "Exchange with retailer"],
			 	["process__warranty__not_exchange", "Does not want to exchange "],
				["process__warranty__not_exchange", "Unable to exchange"]
			]

		},
		"process__warranty__exchange_with_retailer": 
		{
			"Question" : "Customer will exchange modem with retailer."
		},
		"process__warranty__not_exchange": 
		{
			"Question" : "Proccess warranty replacement",
			"Text" : ["</br>", "Use the guide for phone payment or email payment."]
		},


		"checksignal" : {
			"Question" : "Redirect to service provider to check signal.",
			"Text" : 
			[
				"<br>",
				"Advise the customer to ensure the MSO collects the HFC MAC ID.",
				"Explain to customer there may be a signal error and to inform the MSO support rep.",
				"Make sure the MSO support rep. can see or reboot the modem remotly."
			]
		},





		

		"self_activation_procedure":
		{
			"Question": "If user's ISP is: Xfinity/COX/Spectrum do you get the provider page?.",
			"Text":["***If so continue with next step"],
			"Buttons" : 
			[	
				["xfinity_activation_procedure__internet_working", "No"],
				["xfinity_activation_procedure__confirm_self_activation", "Xfinity"],
				["cox_activation_procedure__confirm_self_activation","COX"],
				["spectrum_activation_procedure__confirm_self_activation","SPECTRUM"],
				["other_isp__activation_procedure","Other Service Provider"]
			]
		},		
		"xfinity_activation_procedure__confirm_self_activation":
		{
			"Question": "Follow Comcast self-activation process",
			"Text": 
			[
				"Use the Xfinity app",
				"Is activation successful?"
			],			
			"Buttons" : 
			[
				["xfinity_activation_procedure__internet_working", "Yes"],
				["provision","No"]
			]
		},
		"xfinity_activation_procedure__internet_working":
		{
			"Question": "Is internet working?",
			"Text": ["Verify internet connection by navigating to any website"],
			"Buttons" : 
			[
				["resolved", "Yes"],
				["provision","No"]
			]
		},

		"cox_activation_procedure__confirm_self_activation":
		{
			"Question": "Follow Cox self-activation process",
			"Text": ["Is activation successful?"],			
			"Buttons" : 
			[
				["cox_activation_procedure__internet_working", "Yes"],
				["provision","No"]
			]
		},
		"cox_activation_procedure__internet_working":
		{
			"Question": "Is internet working?",
			"Text": ["Verify internet connection by navigating to any website"],
			"Buttons" : 
			[	
				["resolved", "Yes"],
				["provision","No"]	
			]
		},
		"spectrum_activation_procedure__confirm_self_activation":
		{
			"Question": "Follow Spectrum self-activation process",
			"Text": ["Is activation successful?"],
			"Buttons" : 
			[	
				["spectrum_activation_procedure__internet_working", "Yes"],
				["provision","No"]	
			]
		},
		"spectrum_activation_procedure__internet_working":
		{
			"Question": "Is internet working?",
			"Text": ["Verify internet connection by navigating to any website"],
			"Buttons" : 
			[	
				["resolved", "Yes"],
				["provision","No"]	
			]
		},
		"other_isp__activation_procedure":
		{
			"Question": "Has the customer contacted the service provider to provision the modem or Gateway?",
			"Buttons":
			[ 
				["device_model","Yes"],
				["provision","No"] 
			]
		},

		"resolved": 
		{
			"Question" : "This case is resolved",
			"Text" : 
			[
				"***Please offer ARRIS Assist program to the customer.",
				"***Perform any additional troubleshooting or services as needed."
			]
		}
  }
}