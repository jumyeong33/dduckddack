<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black text-primary row items-center my-tool">
        <div class="row items-center">
          <div class="row items-center col logo">
            <img src="~assets/logo.png" style="width: 200px; height: 26.64px" />
          </div>

          <q-tabs shrink narrow-indicator style="margin-bottom: 8px">
            <q-route-tab name="home" label="Home" to="/" exact />
            <q-route-tab name="create" label="Create" to="/create" exact />
          </q-tabs>
        </div>

        <q-space />
        <q-btn class="btn-connect text-white" padding="none" @click="connect">
          connect wallet</q-btn
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { connectWallet, checkNetwork } from "../lib/wallet/connectHandler";

const data = ref({
  isConnected: false,
  walletAddress: "",
});

watch(
  () => data.value.isConnected,
  (newValue) => {
    if (newValue) {
      checkNetwork();
      trackAccount(data.value.walletAddress);
    }
  }
);

async function connect() {
  const account = await connectWallet();
  if (account) {
    data.value.isConnected = true;
    data.value.walletAddress = account;
  }
}

function trackAccount(account) {
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts.
      data.value.isConnected = false;
      data.value.walletAddress = "";
    } else if (accounts[0] !== account) {
      data.value.walletAddress = accounts[0];
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
.logo-child {
  width: 131px;
  height: 29.62px;

  font-family: "Impact";
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
::v-deep .q-btn__content {
  padding-bottom: 5px;
}
</style>
