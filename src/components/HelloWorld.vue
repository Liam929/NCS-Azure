<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li v-for="(page, index) in pages" :key="index" :class="{ active: currentPage == index }" @click="currentPage = index">
            {{ page.name }}
            <ul v-if="page.children" class="sub-menu">
              <li v-for="(child, childIndex) in page.children" :key="childIndex" @click="goToChildPage(child)">
              {{ child.name }}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>{{ pages[currentPage].name }}</h1>
      <p>{{ pages[currentPage].description }}</p>
      <div v-if="childPage">
        <h2>{{ childPage.name }}</h2>
        <p>{{ childPage.description }}</p>
      </div>
    </main>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
            name: "bar2",
            description: "This is the second page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 2"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 2"
              }
            ]
          },
          {
            name: "Log Graph",
            description: "This is the third page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 3"
              }
            ]
          },
          {
            name: "bar3",
            description: "This is the fourth page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 4"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 4"
              }
            ]
          },
          {
            name: "Knowledge Repo",
            description: "This is the fifth page",
            children: [
              {
                name: "Sub-page 1",
                description: "This is a sub-page of Page 5"
              },
              {
                name: "Sub-page 2",
                description: "This is another sub-page of Page 5"
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
      }
    }
  };
</script>
  
<style>
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
