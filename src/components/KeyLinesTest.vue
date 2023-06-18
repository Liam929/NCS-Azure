<template>
    <!-- <kl-chart id='kl' containerClass='klchart' :data='data' @kl-ready='klReady'/> -->
    <KlChart id='kl' containerClass='klchart' :data='data' @kl-ready='klReady' @kl-click='clickHandler'/>
</template>
  
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import KlChart from './vue/Chart.vue';
import { edges, nodes } from './data';
  
export default {
    name: 'app',
    components: { KlChart },
    methods: {
      klReady(chart) {
        this.chart = chart;
      },
      // clickHandler({ id }) {
      //   console.log(`you clicked on ${id}`);
      // }
      clickHandler({ id }) {
        if (this.chart.getItem(id)) {
          const neighbours = this.chart.graph().neighbours(id).nodes;
          this.chart.foreground(node =>
            node.id === id || neighbours.includes(node.id)
          );
        } else {
          this.chart.foreground(() => true);
        }
      }
    },
    data() {
      return {
        // data: {
        //   type: 'LinkChart',
        //   items: [{
        //     id: 'node1',
        //     type: 'node',
        //     t: 'Hello World',
        //     c: '#43976C'
        //   }],
        // },
        data: {
          type: 'LinkChart',
          items: [
            { type: 'node', id: 'ac1', u: 'icons/bank.png', t: '45081063' },
            { type: 'node', id: 'ac2', u: 'icons/bank.png', t: '91422615' },
            {  type: 'node', id: 'ac3', u: 'icons/bank.png', t: '59798694' },
            { type: 'node', id: 'ac4', u: 'icons/bank.png', t: '71012007' },
            { type: 'node', id: 'ac5', u: 'icons/bank.png', t: '29692722' },
            { type: 'node', id: 'ad1', u: 'icons/address.png', t: '2480 Richards Ave' },
            { type: 'node', id: 'ad2', u: 'icons/address.png', t: '3731 Farland St' },
            { type: 'node', id: 'ad3', u: 'icons/address.png', t: '3343 Beechwood Ave' },
            { type: 'node', id: 'p1', u: 'icons/man.png', t: 'James HALL' },
            { type: 'node', id: 'p2', u: 'icons/woman.png', t: 'Michelle TURNER' },
            { type: 'node', id: 'p3', u: 'icons/man.png', t: 'Ryan TURNER' },
            { type: 'node', id: 'p4', u: 'icons/woman.png', t: 'Jennifer CARTER' },
            { type: 'node', id: 'p5', u: 'icons/woman.png', t: 'Isabella PEREZ' },
            { type: 'node', id: 'p6', u: 'icons/woman.png', t: 'Brittany CAMPBELL' },
            { type: 'link', id: 'l1', id1: 'ac1', id2: 'ac3', a1: true, c: '#79a331', w: 15 },
            { type: 'link', id: 'l2', id1: 'ac1', id2: 'ac3', a2: true, c: '#79a331', w: 3 },
            { type: 'link', id: 'l3', id1: 'ac2', id2: 'ac1', a1: true, c: '#79a331', w: 8 },
            { type: 'link', id: 'l4', id1: 'ac2', id2: 'ac4', a2: true, c: '#79a331', w: 12 },
            { type: 'link', id: 'l5', id1: 'ac2', id2: 'ac5', a2: true, c: '#79a331', w: 10 },
            { type: 'link', id: 'l6', id1: 'ac3', id2: 'ac2', a2: true, c: '#79a331', w: 7 },
            { type: 'link', id: 'l7', id1: 'p1', id2: 'ac1', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l8', id1: 'p1', id2: 'ad2', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l9', id1: 'p2', id2: 'ad1', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l10', id1: 'p2', id2: 'ac3', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l11', id1: 'p3', id2: 'ac3', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l12', id1: 'p3', id2: 'ad1', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l13', id1: 'p4', id2: 'ad2', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l14', id1: 'p4', id2: 'ac4', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l15', id1: 'p5', id2: 'ad3', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l16', id1: 'p5', id2: 'ac2', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l17', id1: 'p6', id2: 'ad3', c: '#ff7f7f', w: 5 },
            { type: 'link', id: 'l18', id1: 'p6', id2: 'ac5', c: '#ff7f7f', w: 5 }
            ]
        },
      }
    }
}
</script>
  
<style>
    html {
      box-sizing: border-box;
    }
  
    *, *:before, *:after {
      box-sizing: inherit;
    }
  
    body {
      margin: 0;
    }
    
    .klchart {
      width: 100vw;
      height: 100vh;
      padding: 16px;
    }
</style>