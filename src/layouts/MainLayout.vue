<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black text-primary row items-center my-tool">
        <div class="row items-center">
          <div class="row items-center col logo">
            <img src="~assets/dddd2.png" style="width: 25px; height: 26.64px" />
            <q-btn class="logo-child" flat label="DDUCAKDDACK" />
          </div>

          <q-tabs shrink narrow-indicator>
            <q-route-tab name="home" label="Home" to="/" exact />
            <q-route-tab name="create" label="Create" to="/create" exact />
          </q-tabs>
        </div>

        <q-space />
        <q-btn class="btn-connect text-white" padding="none">
          connect wallet</q-btn
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.text-primary {
  color: $primary;
}

.btn-connect {
  width: 337px;
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
</style>