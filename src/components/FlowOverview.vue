<template>
  <div>
    <div id="Framework">
      <div id="op1" @click="navigateToPage('op1')" v-if="showOp1Button">Knowledge-repo-svchost</div>
      <div id="op2" @click="navigateToPage('op2')" v-if="showOp2Button">Attack-chain</div>
      <router-view v-if="!showOp1Button && !showOp2Button"></router-view>
      <!-- <router-link :to="{ path: '/operation-1' }" v-if="!showOp1Button"></router-link>
      <router-link :to="{ path: '/operation-2' }" v-if="!showOp2Button"></router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOp1Button: true,
      showOp2Button: true,
      currentPage: '',
    };
  },
  methods: {
    navigateToPage(operatorId) {
      // 根据操作符标识符执行页面跳转逻辑
      if (operatorId === 'op1') {
        this.$router.push('/operation-1');
        this.currentPage = 'operation-1';
      } else if (operatorId === 'op2') {
        this.$router.push('/operation-2');
        this.currentPage = 'operation-2';
      }
      // 其他操作符的页面跳转逻辑
      // 根据需要设置 showOp1Button 和 showOp2Button 的值来控制按钮的显示
      this.showOp1Button = false;
      this.showOp2Button = false;
    },
  },
};
</script>

<style>
#flowchart {
  width: 100%;
  height: 400px;
  /* 其他样式 */
}
.active {
  /* 高亮样式，可以根据需要自定义 */
  background-color: #135cb2;
  color: #fff;
}
</style>
