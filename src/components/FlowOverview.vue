<template>
  <div>
    <div id="Framework">
      <div class="button-container">
        <div id="op1" @click="navigateToPage('op1')" v-if="showOp1Button" class="button button-op1">Raw Logs</div> 
        <div id="op2" @click="navigateToPage('op2')" v-if="showOp2Button" class="button button-op2">Selected Logs</div> 
        <div id="op3" @click="navigateToPage('op3')" v-if="showOp3Button" class="button button-op3">Reduced Log Graph</div> 
        <div id="op4" @click="navigateToPage('op4')" v-if="showOp3Button" class="button button-op4">Knowledge Repo Svchost</div> 
        <div id="op5" @click="navigateToPage('op5')" v-if="showOp3Button" class="button button-op5">Alert Graph</div> 
        <!-- <div id="op6" @click="navigateToPage('op6')" v-if="showOp3Button" class="button button-op6">Alert Graph</div> Attack Chain
        <div id="op7" @click="navigateToPage('op7')" v-if="showOp3Button" class="button button-op6">Attack Graph</div> Attack Graph -->

      </div>
      <div class="arrow-container" v-if="showArrow">
        <div class="arrow-line1"></div>
        <div class="arrow1"></div>
      </div>
      <div class="arrow-container" v-if="showArrow">
        <div class="arrow-line2"></div>
        <div class="arrow2"></div>
      </div>
      <div class="arrow-container" v-if="showArrow">
        <div class="arrow-line3"></div>
        <div class="arrow3"></div>
      </div>
      <div class="arrow-container" v-if="showArrow">
        <div class="arrow-line4"></div>
        <div class="arrow4"></div>
      </div>
      <router-view v-if="!showOp1Button && !showOp2Button"></router-view>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showOp1Button: true,
      showOp2Button: true,
      showOp3Button: true,
      showOp4Button: true,
      showOp5Button: true,
      // showOp6Button: true,
      // showOp7Button: true,
      currentPage: '',
      showArrow: true,
    };
  },
  methods: {
    navigateToPage(operatorId) {
      if (operatorId === 'op1') {
        this.$router.push('/operation-1');
        this.currentPage = 'operation-1';
      } else if (operatorId === 'op2') {
        this.$router.push('/operation-2');
        this.currentPage = 'operation-2';
      } else if (operatorId === 'op3') {
        this.$router.push('/operation-3');
        this.currentPage = 'operation-3';
      } else if (operatorId === 'op4') {
        this.$router.push('/operation-4');
        this.currentPage = 'operation-4';
      } else if (operatorId === 'op5') {
        this.$router.push('/operation-5');
        this.currentPage = 'operation-5';
      }
      this.showOp1Button = false;
      this.showOp2Button = false;
      this.showOp3Button = false;
      this.showOp4Button = false;
      this.showArrow = false;
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

.button-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 修改为 flex-start */
  margin-top: 20px;
}

.button {
  padding: 10px 40px;
  background-color: #fff;
  color: #060303;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.button-op1 {
  border: 1px solid #000;
  margin-right: 100px; /* 调整按钮之间的水平间距 */
  /* margin-top: 100px */
}

.button-op2 {
  border: 1px solid #000;
  margin-right: -350px;
}

.button-op3 {
  border: 1px solid #000;
  margin-right: 50px;
  margin-top: 140px;
}

.button-op4 {
  border: 1px solid #000;
  margin-right: -103px;
  margin-top: 140px;
}

.button-op5 {
  border: 1px solid #000;
  margin-right: 600px;
}

.arrow-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center; /* 修改为 center */
  margin-top: 40px; /* 调整箭头与按钮之间的垂直间距 */
  height: auto;
}

.arrow-line1 {
  position: absolute;
  top: 1px;
  right: -255px;
  transform: translateY(-50%) rotate(0deg); /* 将线旋转90度，使其横向 */
  width: 100px; /* 调整线的宽度 */
  height: 1px; /* 调整线的高度 */
  background-color: #000; /* 设置线的颜色为黑色 */
  z-index: 1; /* 提高线的层级，使其位于箭头上方 */
}

.arrow1 {
  position: absolute;
  top: 1px;
  right: -255px;
  transform: translateY(-50%) rotate(0deg); /* 将箭头旋转90度，使其横向 */
  width: 10px; /* 调整箭头的宽度 */
  height: 10px; /* 调整箭头的高度 */
  background-color: #000; /* 设置箭头的颜色为黑色 */
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* 使用 clip-path 定义箭头形状 */
  z-index: 2; /* 提高箭头的层级，使其位于线的上方 */
}

.arrow-line2 {
  position: absolute;
  top: 70px;
  right: -350px;
  transform: translateY(-50%) rotate(-90deg); /* 将线旋转90度，使其横向 */
  width: 100px; /* 调整线的宽度 */
  height: 1px; /* 调整线的高度 */
  background-color: #000; /* 设置线的颜色为黑色 */
  z-index: 1; /* 提高线的层级，使其位于箭头上方 */
}

.arrow2 {
  position: absolute;
  top: 115px;
  right: -305px;
  transform: translateY(-50%) rotate(90deg); /* 将箭头旋转90度，使其横向 */
  width: 10px; /* 调整箭头的宽度 */
  height: 10px; /* 调整箭头的高度 */
  background-color: #000; /* 设置箭头的颜色为黑色 */
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* 使用 clip-path 定义箭头形状 */
  z-index: 2; /* 提高箭头的层级，使其位于线的上方 */
}

.arrow-line3 {
  position: absolute;
  top: 70px;
  right: -450px;
  transform: translateY(-50%) rotate(-90deg); /* 将线旋转90度，使其横向 */
  width: 100px; /* 调整线的宽度 */
  height: 1px; /* 调整线的高度 */
  background-color: #000; /* 设置线的颜色为黑色 */
  z-index: 1; /* 提高线的层级，使其位于箭头上方 */
}

.arrow3 {
  position: absolute;
  top: 25px;
  right: -405px;
  transform: translateY(-50%) rotate(-90deg); /* 将箭头旋转90度，使其横向 */
  width: 10px; /* 调整箭头的宽度 */
  height: 10px; /* 调整箭头的高度 */
  background-color: #000; /* 设置箭头的颜色为黑色 */
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* 使用 clip-path 定义箭头形状 */
  z-index: 2; /* 提高箭头的层级，使其位于线的上方 */
}


.arrow-line4 {
  position: absolute;
  top: 1px;
  right: -543px;
  transform: translateY(-50%) rotate(0deg); /* 将线旋转90度，使其横向 */
  width: 100px; /* 调整线的宽度 */
  height: 1px; /* 调整线的高度 */
  background-color: #000; /* 设置线的颜色为黑色 */
  z-index: 1; /* 提高线的层级，使其位于箭头上方 */
}

.arrow4 {
  position: absolute;
  top: 1px;
  right: -543px;
  transform: translateY(-50%) rotate(0deg); /* 将箭头旋转90度，使其横向 */
  width: 10px; /* 调整箭头的宽度 */
  height: 10px; /* 调整箭头的高度 */
  background-color: #000; /* 设置箭头的颜色为黑色 */
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* 使用 clip-path 定义箭头形状 */
  z-index: 2; /* 提高箭头的层级，使其位于线的上方 */
}
</style>
