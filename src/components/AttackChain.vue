<template>
  <h1>Attack Chains</h1>
  <div class="attack-chain">
    <div class="attack-step" v-for="(step, index) in attackData" :key="index" @click="showDetails(index)">
      <div class="attack-info">
        <div class="attack-name">{{ step.name }}</div>
        <div class="attack-time">{{ step.time }}</div>
      </div>
      <div class="attack-result" :class="step.result">{{ step.result }}</div>
      <div class="arrow" v-if="index !== attackData.length - 1">
        <div class="arrow-head"></div>
        <div class="arrow-line"></div>
      </div>
    </div>

    <div v-if="selectedStep" class="modal" @click.self="closeDialog">
      <div class="modal-content">
        <h2>{{ selectedStep.name }}</h2>
        <p>{{ selectedStep.time }}</p>
        <p>Command: {{ selectedStep.details.command }}</p>
        <p>Description: {{ selectedStep.details.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedStep: null,
      attackData: [
        { name: 'Step 1:T1102', time: '2023-05-03 12:00:00', result: 'success', details: { command: 'Double click 3aka3.doc ', description: 'The scenario begins with an initial breach, where a legitimate user clicks (T1204) an executable payload (screensaver executable) masquerading as a benign word document (T1036). Once executed, the payload creates a C2 connection over port 1234 (T1065) using the RC4 cryptographic cipher ' } },
        { name: 'Step 2:T1105', time: '2023-05-03 12:30:00', result: 'timeout', details: { command: 'Command 2', description: 'Description 2' } },
        { name: 'Step 3:T1203', time: '2023-05-03 13:00:00', result: 'failed', details: { command: 'Command 3', description: 'Description 3' } },
        // ...
      ],
    };
  },
  methods: {
    showDetails(index) {
      this.selectedStep = this.attackData[index];
    },
    closeDialog() {
      this.selectedStep = null;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.attack-chain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.attack-step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 50px 0;
  background: #f0f0f0;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
}

.arrow {
  position: absolute;
  bottom: -60px;
  left: 50%;
}

.arrow-line {
  width: 2px;
  height: 30px;
  background-color: #ebebeb;
  position: absolute;
  top: 20px;
}

.arrow-head {
  position: absolute;
  top: 0;
  left: -8.5px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #ebebeb;
}

.attack-info {
  display: flex;
  flex-direction: column;
}

.attack-name {
  font-size: 1.2em;
  font-weight: bold;
}

.attack-result {
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.success {
  background: #28a745;
  color: white;
}

.failed {
  background: #dc3545;
  color: white;
}

.timeout {
  background: #17a2b8;
  color: white;
}
</style>

  
  
  
  