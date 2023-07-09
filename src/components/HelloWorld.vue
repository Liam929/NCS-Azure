<template>
  <div class="app">
    <!-- <h1 class="title">NCS_Azure_UI</h1> -->
    <header>
      <nav>
        <ul>
          <li @click="goToOverview" :class="{ active: currentPage === 0 }">
            {{ pages[0].name }}
          </li>
          <li v-for="(page, index) in pages.slice(1)" :key="index + 1" :class="{ active: currentPage == index + 1 }" @click="currentPage = index + 1">
            {{ page.name }}
            <ul v-if="page.children" class="sub-menu">
              <li v-for="(child, childIndex) in page.children" :key="childIndex" @click="child.name === 'Reduced Log Graph' ? openAlertGraphPage() : goToChildPage(child)">
                {{ child.name }}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <!-- <h1>{{ pages[currentPage].name }}</h1> -->
      <!-- <p>{{ pages[currentPage].description }}</p> -->
      <!-- <div v-if="childPage">
        <h2>{{ childPage.name }}</h2>
        <p>{{ childPage.description }}</p>
      </div> -->
      <attack-chain v-if="currentPage === 0"></attack-chain>
      <log-analytics v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></log-analytics>
      <system-edrlogs v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></system-edrlogs>
      <e-d-r-alerts v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></e-d-r-alerts>
      <i-d-s-alerts v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></i-d-s-alerts>
      <power-shell-logs v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></power-shell-logs>
      <compressed-system-logs v-if="currentPage === 1 && childPage.name === 'Compressed Logs'"></compressed-system-logs>
      <compressed-i-d-s-alerts v-if="currentPage === 1 && childPage.name === 'Compressed Logs'"></compressed-i-d-s-alerts>
      <!-- <knowledge-repo-svchost v-if="currentPage === 2 && childPage.name === 'Svchost'"></knowledge-repo-svchost> -->
      <d3-graph v-if="currentPage === 2"></d3-graph>
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import LogAnalytics from './LogAnalytics.vue'
import AttackChain from './AttackChain.vue';
import D3Graph from './D3Graph.vue';
import IDSAlerts from './IDSAlerts.vue';
import EDRAlerts from './EDRAlerts.vue'
import PowerShellLogs from './PowerShellLogs.vue'
import CompressedIDSAlerts from './CompressedIDSAlerts.vue'
import CompressedSystemLogs from './CompressedSystemLogs.vue';
import SystemEdrlogs from './SysmonEdrlogs.vue';
  export default defineComponent({
    components:{
      AttackChain,
      LogAnalytics,
      EDRAlerts,
      IDSAlerts,
      D3Graph,
      CompressedSystemLogs,
      SystemEdrlogs,
      PowerShellLogs,
      CompressedIDSAlerts,
    },
    data() {
      return {
        tableData: [],
        currentPage: 0,
        childPage: null,
        pages: [
          {
            name: "Attack TTPs",
            description: "This is the first page",
          },
          {
            name: "Security Logs",
            description: "This is the second page",
            children: [
              {
                name: "Raw Logs",
                description: "This is a sub-page of Page 2"
              },
              {
                name: "Compressed Logs",
                description: "This is another sub-page of Page 2"
              }
            ]
          },
          // {
          //   name: "Knowledge Repo",
          //   description: "This is the fifth page",
          //   children: [
          //     {
          //       name: "Svchost",
          //       description: "This is a sub-page of Page 5"
          //     },
          //     {
          //       name: "Rundll32",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "Regsvr32",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "Explorer",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "cmd",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "Powershell",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "sc",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "lsass",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "Service",
          //       description: "This is another sub-page of Page 5"
          //     },
          //     {
          //       name: "wmic",
          //       description: "This is another sub-page of Page 5"
          //     },
          //   ]
          // },
          {
            name: "Threat Detection",
            description: "This is the seventh page",
          }
        ]
      };
    },
    methods: {
      goToPage(page) {
        this.childPage = null; // 设置为 null
        const index = this.pages.findIndex(p => p.name === page.name);
        if (this.currentPage === index) {
          return; // 如果已经处于当前页面，则不执行任何操作
        }
        this.currentPage = index;
      },
      goToChildPage(childPage) {
        const parentPage = this.pages[this.currentPage];
        if (parentPage.children) {
          const childPageIndex = parentPage.children.findIndex(p => p.name === childPage.name);
          if (childPageIndex !== -1) {
            this.currentPage = childPageIndex;
            this.childPage = parentPage.children[childPageIndex];
          }
        }
      },
      goToOverview() {
        if (this.currentPage === 0) {
          return; // 如果已经处于初始流程图页面，则不执行任何操作
        }
        this.currentPage = 0; // 将当前页面重置为初始流程图页面
        this.childPage = null;
      },
    }
  });
  
  
</script>
  
<style>
@import '~normalize.css/normalize.css';

.app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f7f7f7;
  font-family: sans-serif;
}
  
header {
  background-color: #2684ff;
  color: #fff;
}
  
nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
  
nav li {
  margin-right: 20px;
  padding: 10px;
  cursor: pointer;
}
  
nav li.active {
  background-color: #135cb2;
}
  
.sub-menu {
  display: none;
  position: absolute;
  background-color: #2684ff;
  margin-top: 10px;
  padding: 10px;
  z-index: 1000;
}
  
nav li:hover .sub-menu {
  display: block;
}
  
.sub-menu li {
  margin-bottom: 10px;
  cursor: pointer;
}
  
main {
  padding: 20px;
  background-color: #fff;
}
</style>
