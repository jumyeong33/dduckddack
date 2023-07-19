import showNotify from "src/utils/notify";

function errorMsgHandler(e, state) {
    if(e.code === 4001) throw showNotify(state);
    throw showNotify('error')
}

function isInstallMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        return false;
      }
      return true;
}

async function signData(account) {
    try {
        const exampleMessage = 'Wellcome to DDUCKDDACK!'
        const sign = await window.ethereum.request({
          method: 'personal_sign',
          params: [exampleMessage, account],
        })
        return sign;
    } catch(e) {
        errorMsgHandler(e, 'rejectSign')
    }
}

export async function checkNetwork() {
    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(parseInt(chainId) !== 137 || parseInt(chainId) !== 80001) {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }],
            })
        }
    } catch(e) {
        errorMsgHandler(e, 'rejectSwitchChain')
    }
}

export async function connectWallet() {
    try {
        if(isInstallMetamask()) showNotify('install');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await signData(accounts[0]);
        return accounts[0];
    } catch {
        return false;
    }
}

