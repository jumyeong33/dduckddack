const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const OWNER = process.env.MASTER_WALLET
const ACCESS_KEY = process.env.INFURA_KEY
const MINTING_CONTRACT_ADDRESS = "0x670bd5832DBda6851eFCf2bb7ab7C3D5a204B34D"

const mintABI = [{
    "inputs":[
        {
            "internalType":"address",
            "name":"_to",
            "type":"address"
        },
        {
            "internalType":"uint256",
            "name":"_wallPaperKey",
            "type":"uint256"
            
        },
        {
            "internalType":"string",
            "name":"_tokenURI",
            "type":"string"
            
        }
    ],
    "name":"freeMint",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function",
    "signature":"0xb2b5e6d0"
    
}]

const getProvider = () => {
    return new HDWalletProvider(OWNER, `https://polygon-mumbai.infura.io/v3/${ACCESS_KEY}`)
}

const estimateGas = async (method, sender) => {
    return await method.estimateGas({from: sender})
}
 
const sendTx = async (method, sender, gas) => {
    return await method.send({from: sender, gas})
}

const mintingNFT = async (receiver, uniqueKey, metadataURL) => {
    const web3 = new Web3(getProvider())
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(mintABI, MINTING_CONTRACT_ADDRESS);
    const method = contract.methods.freeMint(receiver, uniqueKey, metadataURL);
    const gas = await estimateGas(method, accounts[0]);
    
    return await sendTx(method, accounts[0], gas);
}

module.exports = {
    mintingNFT
}


