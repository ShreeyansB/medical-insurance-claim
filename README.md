# medical-insurance-claim
This website was made as a concept for implementing the insurance claim process with the help of the blockchain and smart contracts.

### How it Works
1. User Signs Up on the website and enters their details.
2. User files an Insurance Claim by filling details and uploading a pdf of medical and lab bills. The claim is then sent to the smart contract and the pdf is uploaded in storage. Pdf is hashed and the hash is stored on the blockchain to avoid any problems if a dispute occurs.
3. The Hospital then verifies the claim details and bills and approves/denies it on their side which gets recorded on the Blockchain.
4. The Insurer checks the claim and then approves/denies the claim which also gets recorded on the blockchain.
5. If claim is approved, the Insurer then pays the User. If rejected the reason for it is also recorded in the blockchain.
6. Along this process, the User can check the status of the Claim as changes occur.

### Tech Used
mic uses a number of open source projects to work properly:

- [React](https://reactjs.org/) - JS Library for building UIs
- [ChakraUI](https://chakra-ui.com/) - Awesome Component Library
- [Moralis](https://moralis.io) - Smart Contract Event Indexing
- [Supabase](https://supabase.com/) - Open-source Backend as a Service
- [boring-avatars](https://boringavatars.com/) - API for generating unique avatars

### Improvements
 - **Switch to IPFS:** This was part of a Uni project and I did not have enough time to implement IPFS. So I chose to store the file hash instead.
 <br>*.....*
 
### Screenshots
![ss1](https://user-images.githubusercontent.com/37953798/166552263-ce583b47-2ad2-430f-8402-7d7ce584597e.png)
<br>
![ss2](https://user-images.githubusercontent.com/37953798/166552271-9692f4f6-e3bb-46c9-a7c8-1922b1485bd7.png)
<br>
![ss3](https://user-images.githubusercontent.com/37953798/166552278-ada8a9bc-06c5-4d51-8737-0f47f1af7f3b.png)
 
## License
MIT