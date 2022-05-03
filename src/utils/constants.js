export const contractAddress = "0x562A20Ea5eB130eb7721858eA51e84E453eF077b";

export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_hospitalAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_billId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_billHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "newRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patientAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "hospitalAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "recordCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patientAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "hospitalAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum HealthCare.RecordStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "statusMsg",
				"type": "string"
			}
		],
		"name": "recordSigned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_patientAddr",
				"type": "address"
			},
			{
				"internalType": "enum HealthCare.RecordStatus",
				"name": "_status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_statusMsg",
				"type": "string"
			}
		],
		"name": "signRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "records",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "patientAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "hospitalAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "billId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "billHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
