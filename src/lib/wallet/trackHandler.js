export async function trackAccount(account) {
    window.ethereum.on("accountsChanged", (accounts) => {
        console.log('Account changed', accounts)
        console.log('Logged in Account', account)
    });
}

export async function trackNetwork() {
    window.ethereum.on("chainChanged", handleChainChanged);
}

function handleChainChanged() {
    console.log('network changed')
}