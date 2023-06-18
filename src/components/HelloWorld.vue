<template>
  <div class="app">
    <h1 class="title">NCS_Azure_UI</h1> <!-- 新添加的大标题元素 -->
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
      <log-analytics v-if="currentPage === 2 && childPage.name === 'Raw Logs'"></log-analytics>
      <log-process v-else-if="currentPage === 2 && childPage.name === 'Selected Logs'"></log-process>
      <alert-component v-if="currentPage === 3"></alert-component>
      <log-graph v-if="currentPage === 4 && childPage && childPage.name === 'Alert Graph'"></log-graph>
      <knowledge-repo-svchost v-if="currentPage === 5 && childPage.name === 'Svchost'"></knowledge-repo-svchost>
      <key-lines-test v-if="currentPage === 6"></key-lines-test>
      <attack-graph v-if="currentPage === 7 && childPage.name === 'CTI'"></attack-graph>
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import LogAnalytics from './LogAnalytics.vue';
import LogProcess from './LogProcess.vue';
import AttackChain from './AttackChain.vue';
import LogGraph from './LogGraph.vue';
import AlertComponent from './AlertComponent.vue'
import KnowledgeRepoSvchost from './KnowledgeRepoSvchost.vue';
import KeyLinesTest from './KeyLinesTest.vue';
import AttackGraph from './AttackGraph.vue';
import OverviewComponent from './FlowOverview.vue';
  export default defineComponent({
    components:{
      OverviewComponent,
      AttackChain,
      LogAnalytics,
      LogProcess,
      LogGraph,
      AlertComponent,
      KnowledgeRepoSvchost,
      KeyLinesTest,
      AttackGraph,
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
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 1"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 1"
              }
            ]
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
          {
            name: "Alert",
            description: "This is the third page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 3"
              }
            ]
          },
          {
            name: "Log Graph",
            description: "This is the fourth page",
            children: [
              {
                name: "Reduced Log Graph",
                description: "This is a sub-page of Page 4"
              },
              {
                name: "Alert Graph",
                description: "This is another sub-page of Page 4"
              }
            ]
          },
          {
            name: "Knowledge Repo",
            description: "This is the fifth page",
            children: [
              {
                name: "Svchost",
                description: "This is a sub-page of Page 5"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 5"
              }
            ]
          },
          {
            name: "KeyLines Test",
            description: "This is the sixth page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 6"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 6"
              }
            ]
          },
          {
            name: "Attack Graph",
            description: "This is the seventh page",
            children: [
              {
                name: "CTI",
                description: "This is a sub-page of Page 6"
              }
            ]
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
