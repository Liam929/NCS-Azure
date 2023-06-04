<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li v-for="(page, index) in pages" :key="index" :class="{ active: currentPage == index }" @click="currentPage = index">
            {{ page.name }}
            <ul v-if="page.children" class="sub-menu">
              <!-- <li v-for="(child, childIndex) in page.children" :key="childIndex" @click="goToChildPage(child)">
              {{ child.name }}
              </li> -->
              <li v-for="(child, childIndex) in page.children" :key="childIndex" @click="child.name === 'Reduced Log Graph' ? openAlertGraphPage() : goToChildPage(child)">
              {{ child.name }}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>{{ pages[currentPage].name }}</h1>
      <!-- <p>{{ pages[currentPage].description }}</p> -->
      <!-- <div v-if="childPage">
        <h2>{{ childPage.name }}</h2>
        <p>{{ childPage.description }}</p>
      </div> -->
      <attack-chain v-if="currentPage === 0"></attack-chain>
      <log-analytics v-if="currentPage === 1 && childPage.name === 'Raw Logs'"></log-analytics>
      <log-process v-else-if="currentPage === 1 && childPage.name === 'Selected Logs'"></log-process>
      <alert-component v-if="currentPage === 2"></alert-component>
      <log-graph v-if="currentPage === 3 && childPage && childPage.name === 'Alert Graph'"></log-graph>
      <knowledge-repo-svchost v-if="currentPage === 4 && childPage.name === 'Svchost'"></knowledge-repo-svchost>
      <key-lines-test v-if="currentPage === 5"></key-lines-test>
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
  export default defineComponent({
    components:{
      AttackChain,
      LogAnalytics,
      LogProcess,
      LogGraph,
      AlertComponent,
      KnowledgeRepoSvchost,
      KeyLinesTest,
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
          }
        ]
      };
    },
    methods: {
      goToPage(page) {
        this.childPage = null;
        const index = this.pages.findIndex(p => p.name === page.name);
        this.currentPage = index;
      },
      goToChildPage(childPage) {
        const parentPage = this.pages[this.currentPage];
        if (parentPage.children) {
          this.childPage = childPage;
        }
        const index = parentPage.children.findIndex(p => p.name === childPage.name);
        this.currentPage = index;
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
