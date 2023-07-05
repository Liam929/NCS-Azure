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
      <overview-component v-if="currentPage === 0 && (!childPage || childPage.name === 'Framework')"></overview-component>
      <attack-chain v-if="currentPage === 1"></attack-chain>
      <!-- <attack-ttp v-if="currentPage === 1 && childPage.name === 'TTP Graph'"></attack-ttp> -->
      <log-analytics v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></log-analytics>
      <system-edrlogs v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></system-edrlogs>
      <log-process v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></log-process>
      <suri-cate v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></suri-cate>
      <power-shell v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></power-shell>
      <t1105-logs v-if="currentPage === 2 && childPage.name === 'Selected Logs'"></t1105-logs>
      <filtered-logs v-if="currentPage === 2 && childPage.name === 'Selected Logs'"></filtered-logs>
      <!-- <alert-component v-if="currentPage === 3"></alert-component> -->
      <!-- <alert-graph v-if="currentPage === 4 && childPage && childPage.name === 'Alert Graph(T1105)'"></alert-graph>
      <alert-graph2 v-if="currentPage === 4 && childPage && childPage.name === 'Alert Graph(T1036)'"></alert-graph2> -->
      <knowledge-repo-svchost v-if="currentPage === 3 && childPage.name === 'Svchost'"></knowledge-repo-svchost>
      <!-- <keylines-graph v-if="currentPage === 6"></keylines-graph> -->
      <d3-graph v-if="currentPage === 4"></d3-graph>
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import LogAnalytics from './LogAnalytics.vue';
import LogProcess from './LogProcess.vue';
import AttackChain from './AttackChain.vue';
// import AttackTtp from './AttackTtp.vue';
// import AlertGraph from './AlertGraph.vue';
// import AlertGraph2 from './AlertGraph2.vue';
// import AlertComponent from './AlertComponent.vue'
import KnowledgeRepoSvchost from './KnowledgeRepoSvchost.vue';
// import AttackGraph from './AttackGraph.vue';
// import KeylinesGraph from './KeylinesGraph.vue';
import OverviewComponent from './FlowOverview.vue';
import D3Graph from './D3Graph.vue';
import SuriCate from './SuriCate.vue';
import T1105Logs from './T1105Logs.vue';
import SystemEdrlogs from './SysmonEdrlogs.vue';
import PowerShell from './PowerShell.vue';
import FilteredLogs from './FilteredLogs.vue';
  export default defineComponent({
    components:{
      OverviewComponent,
      AttackChain,
      // AttackTtp,
      LogAnalytics,
      LogProcess,
      // AlertGraph,
      // AlertGraph2,
      // AlertComponent,
      KnowledgeRepoSvchost,
      // AttackGraph,
      // KeylinesGraph,
      D3Graph,
      SuriCate,
      T1105Logs,
      SystemEdrlogs,
      PowerShell,
      FilteredLogs
    },
    data() {
      return {
        tableData: [],
        currentPage: 0,
        childPage: null,
        pages: [
          {
            name: "Overview",
            description: "This is the Overview page",
            children: [
              {
                name: "Framework",
                description: "This is a FrameWork Page"
              }
            ]
          },
          {
            name: "Attack TTPs",
            description: "This is the first page",
            // children: [
            //   {
            //     name: "Attack Chain",
            //     description: "This is a sub-page of Page 1"
            //   },
            //   {
            //     name: "TTP Graph",
            //     description: "This is another sub-page of Page 1"
            //   }
            // ]
          },
          {
            name: "Microsoft Sentinel Logs",
            description: "This is the second page",
            children: [
              {
                name: "Raw Logs",
                description: "This is a sub-page of Page 2"
              },
              {
                name: "Selected Logs",
                description: "This is another sub-page of Page 2"
              }
            ]
          },
          // {
          //   name: "Alert",
          //   description: "This is the third page",
          //   children: [
          //     {
          //       name: "Sub-page 1",
          //       description: "This is a sub-page of Page 3"
          //     }
          //   ]
          // },
          // {
          //   name: "Log Graph",
          //   description: "This is the fourth page",
          //   children: [
          //     {
          //       name: "Reduced Log Graph",
          //       description: "This is a sub-page of Page 4"
          //     },
          //     {
          //       name: "Alert Graph(T1105)",
          //       description: "This is another sub-page of Page 4"
          //     },
          //     {
          //       name: "Alert Graph(T1036)",
          //       description: "This is another sub-page of Page 4"
          //     }
          //   ]
          // },
          {
            name: "Knowledge Repo",
            description: "This is the fifth page",
            children: [
              {
                name: "Svchost",
                description: "This is a sub-page of Page 5"
              },
              {
                name: "Rundll32",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "Regsvr32",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "Explorer",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "cmd",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "Powershell",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "sc",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "lsass",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "Service",
                description: "This is another sub-page of Page 5"
              },
              {
                name: "wmic",
                description: "This is another sub-page of Page 5"
              },
            ]
          },
          // {
          //   name: "KeyLines Test",
          //   description: "This is the sixth page",
          //   children: [
          //     {
          //       name: "Sub-page 1",
          //       description: "This is a sub-page of Page 6"
          //     },
          //     {
          //       name: "Sub-page 2",
          //       description: "This is another sub-page of Page 6"
          //     }
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
      openAlertGraphPage() {
        const url = 'http://localhost:7474/browser/';
        window.open(url, '_blank');
      }
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
