<template>
  <div>
    <div ref="networkGraph"></div>
    <div ref="subPageGraph" style="display: none;"></div>
    <div ref="subSubPageGraph" style="display: none;"></div>
    <button @click="goBack" v-if="currentLevel > 0">Go Back</button>
  </div>
</template>
<script>
import * as d3 from "d3";
import { networkData, subPageData, subPageData2, subSubPageData, subSubPageData2, subSubPageData3 } from "./../assets/data2.js";

export default {
  name: "D3Graph",
  data() {
    return {
      currentLevel: 0,
      currentLevel2: 0,
      currentLevel3: 0,
    };
  },
  mounted() {
    this.createNetworkGraph();
    this.createSubPageGraph();
    this.createSubSubPageGraph();
  },
  methods: {
    createNetworkGraph() {
      const width = 500;
      const height = 500;

      const svg = d3.select(this.$refs.networkGraph)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(networkData.nodes)
                           .force("link", d3.forceLink(networkData.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(networkData.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "black");
      
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(networkData.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(networkData.nodes)
                  .enter()
                  .append("circle")
                  .attr("r", 20)
                  .attr("fill", "blue")
                  .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                        .on("dblclick", (event, d) => {
                        if (d.id === '10.0.1.4') {
                        this.currentLevel = 1;
                        this.$refs.networkGraph.style.display = 'none';
                        this.$refs.subPageGraph.style.display = 'block';
                        }
                  });

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(networkData.nodes)
                        .enter()
                        .append("text")
                        .attr("class", "label")
                        .text(d => d.id);

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
                  .attr("y", d => (d.source.y + d.target.y) / 2);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels.attr("x", d => d.x)
              .attr("y", d => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    },
    createSubPageGraph() {
      const width = 1200;
      const height = 1000;

      const svg = d3.select(this.$refs.subPageGraph)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(subPageData.nodes)
                           .force("link", d3.forceLink(subPageData.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subPageData.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey");

      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subPageData.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("circle")
                      .data(subPageData.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 20)
                      .attr("fill", d => d.type === "unclick" ? "green" : "orange")
                      .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended))
                      .on("dblclick", (event, d) => {
                        if (d.id === 'Step1-Initial Breach') {
                          this.currentLevel = 2;
                          this.$refs.subPageGraph.style.display = 'none';
                          this.$refs.subSubPageGraph.style.display = 'block';
                        }
                      });

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(subPageData.nodes)
                        .enter()
                        .append("text")
                        .attr("class", "label")
                        .text(d => d.id);

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
                  .attr("y", d => (d.source.y + d.target.y) / 2);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels.attr("x", d => d.x)
              .attr("y", d => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    },
    createSubSubPageGraph() {
      const width = 1200;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(subSubPageData.nodes)
                           .force("link", d3.forceLink(subSubPageData.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubPageData.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey");
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubPageData.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("circle")
                      .data(subSubPageData.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 20)
                      .attr("fill", d => d.type === "program" ? "red" : "blue")
                      .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(subSubPageData.nodes)
                        .enter()
                        .append("text")
                        .attr("class", "label")
                        .text(d => d.id);

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
                  .attr("y", d => (d.source.y + d.target.y) / 2);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels.attr("x", d => d.x)
              .attr("y", d => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    },
    goBack() {
      if (this.currentLevel === 2) {
        this.currentLevel = 1;
        this.$refs.subSubPageGraph.style.display = 'none';
        this.$refs.subPageGraph.style.display = 'block';
      } else if (this.currentLevel === 1) {
        this.currentLevel = 0;
        this.$refs.subPageGraph.style.display = 'none';
        this.$refs.networkGraph.style.display = 'block';
      }
    },
  },
};
</script>




  