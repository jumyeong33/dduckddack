<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="bg-black text-primary row items-center my-tool"
        v-if="$q.screen.gt.sm"
      >
        <div class="row items-center">
          <div class="row items-center col logo">
            <img
              src="/src/assets/logo.png"
              style="width: 200px; height: 26.64px"
            />
          </div>

          <q-tabs shrink narrow-indicator style="margin-bottom: 8px">
            <q-route-tab name="home" label="Home" to="/" exact />
            <q-route-tab name="create" label="Create" to="/create" exact />
          </q-tabs>
        </div>

        <q-space />
        <q-btn class="connected" v-if="data?.isConnected">
          {{ shortenWalletAddress(data?.walletAddress) }}
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/mypage">
                <q-item-section>My page</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="disconnect">
                <q-item-section>disconnect</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          class="btn-connect text-white"
          padding="none"
          @click="connect"
          v-else
        >
          Connect Wallet
        </q-btn>
      </q-toolbar>
      <q-toolbar v-else class="bg-black text-primary row items-center q-pa-md">
        <q-toolbar-title>
          <router-link to="/" class="row items-center">
            <img
              src="/src/assets/logo.png"
              style="width: 200px; height: 26.64px" /></router-link
        ></q-toolbar-title>
        <q-btn flat @click="openDrawer" round dense icon="menu" />
        <q-drawer
          side="right"
          v-model="rightDrawerOpen"
          show-if-above
          class="bg-grey-8"
        >
          <q-scroll-area class="fit">
            <q-list padding class="menu-list">
              <q-item active clickable v-ripple to="/create" exact>
                <q-item-section avatar>
                  <q-icon name="star" />
                </q-item-section>

                <q-item-section> Create </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                v-if="data?.isConnected"
                to="/mypage"
                exact
              >
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section> My Page </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                v-if="data?.isConnected"
                @click="disconnect"
              >
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section> disconnect </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
          <div
            class="absolute-bottom bg-black"
            :class="{
              'q-py-xl': !data.isConnected,
              'q-py-md': data.isConnected,
            }"
          >
            <div class="flex items-center justify-center">
              <q-btn
                class="btn-connect-mobile text-white"
                @click="connect"
                padding="none"
                v-if="!data.isConnected"
              >
                Connect
              </q-btn>
              <div class="connected" v-else>
                {{ shortenWalletAddress(data?.walletAddress) }}
              </div>
            </div>
          </div>
        </q-drawer>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { connectWallet, switchNetwork } from "../lib/wallet/connectHandler";
import { SessionStorage } from "quasar";
import showNotify from "src/utils/notify";

const rightDrawerOpen = ref(false);
const data = ref({
  isConnected: false,
  walletAddress: "",
});

watch(
  () => data.value.isConnected,
  (newValue) => {
    if (newValue) {
      trackAccount();
    }
  }
);

onMounted(() => {
  const storedAddress = SessionStorage.getItem("wallet");
  if (storedAddress) {
    data.value.isConnected = true;
    data.value.walletAddress = storedAddress;
  }
  trackNetwork();
});

function openDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function shortenWalletAddress() {
  const address = data.value.walletAddress;
  if (!address.length > 0) {
    return;
  }
  return address.slice(0, 4) + "..." + address.slice(-4);
}

async function connect() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  await switchNetwork(chainId);
  const account = await connectWallet();
  if (account) {
    data.value.isConnected = true;
    data.value.walletAddress = account;
  }
}

function disconnect() {
  SessionStorage.clear();
  data.value.isConnected = false;
  data.value.walletAddress = "";
}

function trackAccount() {
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts.
      data.value.isConnected = false;
      data.value.walletAddress = "";
      SessionStorage.clear();
    } else {
      data.value.walletAddress = accounts[0];
      SessionStorage.set("wallet", accounts[0]);
    }
  });
}

function trackNetwork() {
  window.ethereum.on("chainChanged", async (chainId) => {
    if (parseInt(chainId) !== 137 && parseInt(chainId) !== 80001) {
      disconnect();
      showNotify("rejectSwitchChain");
    }
  });
}
</script>

<style lang="scss" scoped>
.text-primary {
  color: $primary;
}

.btn-connect {
  width: 257px;
  height: 48px;
  font-size: 24px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
}
.btn-connect-mobile {
  width: 50%;
  font-size: 20px;
  background: $primary;
  border-radius: 60px;
}
.logo-child {
  width: 131px;
  height: 29.62px;

  font-family: "Impacted";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  margin-left: 12px;
}

.logo {
  padding-right: 30px;
}
::v-deep .q-tab__label {
  font-size: 24px;
}
::v-deep .q-tab {
  padding-left: 23px;
  padding-right: 23px;
}

::v-deep .q-tab__indicator {
  height: 4px;
  border-radius: 2px;
}
.my-tool {
  padding-top: 31px;
  padding-left: 100px;
  padding-right: 100px;
}
// ::v-deep .q-btn__content {
//   padding-bottom: 5px;
// }

.connected {
  font-family: "Courier New", Courier, monospace;
  font-size: 15px;
}
</style>
