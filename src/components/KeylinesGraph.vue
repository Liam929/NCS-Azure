<template>
    <div id="kl" ref="kl" style="width: 100%; height: 400px"></div>
  </template>
  
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import KeyLines from 'keylines';
import { edges, nodes } from './../assets/data.js';
import WebFont from 'webfontloader';
  
export default {
  setup() {
    const kl = ref(null);
    onMounted(async () => {
      function transformDataFromJSON() {
        let newItems = [];
        nodes.forEach((node) => {
          newItems.push({
            id: node[0],
            type: 'node',
            c: 'orange',
            t: node[0],
            d: node[1],
          });
        });
        edges.forEach((edge) => {
          const id1 = edge[0];
          const id2 = edge[1];
          const data = JSON.parse(
            // `${edge[2].replace('None', '"None"').replace(/\'/g, '"')}`
            `${edge[2].replace('None', '"None"').replace(/'/g, '"')}`
          );
          newItems.push({
            id: `${id1}-${id2}`,
            id1,
            id2,
            t: data.edge_name,
            d: data,
          });
        });
        return { type: 'LinkChart', items: newItems };
      }
      function startKeyLines() {
        const options = {
          handMode: true,
          selectedNode: {
            b: '#5af2a4',
          },
          imageAlignment: {
            [KeyLines.getFontIcon('fa-user')]: { dy: -9 },
            [KeyLines.getFontIcon('fa-globe')]: { e: 1.2 },
          },
          iconFontFamily: 'Font Awesome 5 Free Solid',
        };
        KeyLines.create({ container: kl.value, options }).then((chart) => {
          chart.load(transformDataFromJSON());
          chart.layout('organic');
        });
      }
  
      WebFont.load({
        custom: {
          // Be sure to include the CSS file in the page with the
          // @font-face definition (see HTML tab)
          families: ['Font Awesome 5 Free Solid'],
        },
        // Start KeyLines if all the fonts have been loaded fine
        active: startKeyLines,
        // Start KeyLines otherwise
        inactive: startKeyLines,
        // 3 seconds is the default timeout
        timeout: 3000,
      });
    });
  
    onBeforeUnmount(() => {
      // here you may need to perform any cleanup if necessary
    });
  
    return { kl };
  },
};
</script>
  
<style scoped>
#kl {
  /* make sure the div has a size to display the chart */
  width: 100%;
  height: 800px;
  /* height: 100vh; */
}
</style>
  