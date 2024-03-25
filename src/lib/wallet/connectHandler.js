import showNotify from "src/utils/notify";
import { SessionStorage } from "quasar";

function errorMsgHandler(e, state) {
  if (e.code === 4001 || e.code === 4902) throw showNotify(state);
  throw showNotify("error");
}

export function isInstallMetamask() {
  if (typeof window.ethereum !== "undefined") {
    return false;
  }
  return true;
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

async function signData(account) {
  try {
    const exampleMessage = "Wellcome to DDUCKDDACK!";
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [exampleMessage, account],
    });
    return sign;
  } catch (e) {
    errorMsgHandler(e, "rejectSign");
  }
}

export async function switchNetwork(chainId) {
  try {
    if (parseInt(chainId) !== 80001) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        //Mumbai
        params: [{ chainId: "0x13881" }],
      });
    }
  } catch (e) {
    if (e.code === 4902) {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Mumbai",
            rpcUrls: ["https://polygon-testnet.public.blastapi.io"],
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com"],
          },
        ],
      });
    }
    errorMsgHandler(e, "rejectSwitchChain");
  }
}

export async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    await signData(accounts[0]);
    SessionStorage.set("wallet", accounts[0]);
    return accounts[0];
  } catch {
    return false;
  }
}
