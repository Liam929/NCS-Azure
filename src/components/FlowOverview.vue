<template>
  <div>
    <div id="Framework">
      <div class="button-container">
        <div id="op1" @click="navigateToPage('op1')" v-if="showOp1Button">Knowledge-repo-svchost</div>
        <div id="op2" @click="navigateToPage('op2')" v-if="showOp2Button">Attack-chain</div>
      </div>
      <div class="arrow-container">
        <div class="arrow"></div>
      </div>
      <router-view v-if="!showOp1Button && !showOp2Button"></router-view>
    </div>
  </div>
</template>

<style>
#Framework {
  position: relative;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#op1,
#op2 {
  padding: 10px 20px;
  background-color: #2684ff;
  color: #fff;
  cursor: pointer;
}

.arrow-container {
  position: relative;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #2684ff;
}

.router-link-active {
  background-color: #135cb2;
  color: #fff;
}
</style>
