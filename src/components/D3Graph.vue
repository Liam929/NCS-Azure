<template>
  <div>
    <div ref="networkGraph"></div>
    <div ref="subPageGraph" style="display: none;"></div>
    <div ref="subPageGraph2" style="display: none;"></div>
    <div ref="subSubPageGraph" style="display: none;"></div>
    <div ref="subSubPageGraph2" style="display: none;"></div>
    <div ref="subSubPageGraph3" style="display: none;"></div>
    <div v-if="selectedNode" class="node-info">
      <h3>Node Information</h3>
      <p><strong>Type:</strong> {{ selectedNode.type }}</p>
      <p><strong>Icon:</strong> {{ selectedNode.icon }}</p>
      <p v-if="selectedNode.IpAddress"><strong>IP Address:</strong> {{ selectedNode.IpAddress }}</p>
      <p v-if="selectedNode.information"><strong>Information:</strong> {{ selectedNode.information }}</p>
      <p v-if="selectedNode.FileInformation"><strong>File Information:</strong> {{ selectedNode.FileInformation }}</p>
    </div>
    <button @click="goBack" v-if="currentLevel > 0 && currentLevel3 <= 1">Go Back</button>
    <button @click="goBack2" v-if="currentLevel2 > 0">Go Back</button>
    <button @click="goBack3" v-if="currentLevel3 > 1">Go Back</button>
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
      selectedNode: null,
    };
  },
  mounted() {
    this.createNetworkGraph();
    this.createSubPageGraph();
    this.createSubPageGraph2();
    this.createSubSubPageGraph();
    this.createSubSubPageGraph2();
    this.createSubSubPageGraph3();
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
                  .on("click", (event, d) => {
                    this.selectedNode = d;
                  })
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
                        else if(d.id === '10.0.1.6') {
                        this.currentLevel2 = 1;
                        this.$refs.networkGraph.style.display = 'none';
                        this.$refs.subPageGraph2.style.display = 'block';
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
                      .on("click", (event, d) => {
                        this.selectedNode = d;
                      })
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
                        else if(d.id === 'Step4-Defense Evasion and Discovery') {
                          this.currentLevel3 = 2;
                          this.$refs.subPageGraph.style.display = 'none';
                          this.$refs.subSubPageGraph3.style.display = 'block';
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
    createSubPageGraph2() {
      const width = 800;
      const height = 500;

      const svg = d3.select(this.$refs.subPageGraph2)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(subPageData2.nodes)
                           .force("link", d3.forceLink(subPageData2.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subPageData2.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey");

      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subPageData2.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("circle")
                      .data(subPageData2.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 20)
                      .attr("fill", d => d.type === "unclick" ? "green" : "orange")
                      .on("click", (event, d) => {
                        this.selectedNode = d;
                      })
                      .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended))
                      .on("dblclick", (event, d) => {
                        if (d.id === 'Step8-Lateral Movement') {
                          this.currentLevel2 = 2;
                          this.$refs.subPageGraph2.style.display = 'none';
                          this.$refs.subSubPageGraph2.style.display = 'block';
                        }
                      });

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(subPageData2.nodes)
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
                      .on("click", (event, d) => {
                        this.selectedNode = d;
                      })
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
    createSubSubPageGraph2() {
      const width = 1200;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph2)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(subSubPageData2.nodes)
                           .force("link", d3.forceLink(subSubPageData2.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubPageData2.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey");
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubPageData2.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("circle")
                      .data(subSubPageData2.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 20)
                      .attr("fill", d => d.type === "program" ? "red" : "blue")
                      .on("click", (event, d) => {
                        this.selectedNode = d;
                      })
                      .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(subSubPageData2.nodes)
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
    createSubSubPageGraph3() {
      const width = 1200;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph3)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      const simulation = d3.forceSimulation(subSubPageData3.nodes)
                           .force("link", d3.forceLink(subSubPageData3.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubPageData3.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey");
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubPageData3.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("circle")
                      .data(subSubPageData3.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 20)
                      .attr("fill", d => d.type === "program" ? "red" : "blue")
                      .on("click", (event, d) => {
                        this.selectedNode = d;
                      })
                      .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

      const labels = svg.append("g")
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(subSubPageData3.nodes)
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
    goBack2() {
      if (this.currentLevel2 === 2) {
        this.currentLevel2 = 1;
        this.$refs.subSubPageGraph2.style.display = 'none';
        this.$refs.subPageGraph2.style.display = 'block';
      } else if (this.currentLevel2 === 1) {
        this.currentLevel2 = 0;
        this.$refs.subPageGraph2.style.display = 'none';
        this.$refs.networkGraph.style.display = 'block';
      }
    },
    goBack3() {
      if (this.currentLevel3 === 2) {
        this.currentLevel3 = 1;
        this.$refs.subSubPageGraph3.style.display = 'none';
        this.$refs.subPageGraph.style.display = 'block';
      } 
    },
  },
};
</script>




<style scoped>
/* .node-info {
  position: absolute;
  right: 50px;
  top: 200px;
  width: 300px;    
  height: 400px;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
.node-info h3 {
  margin-top: 0;
} */

.node-info {
  position: absolute;
  right: 50px;
  top: 200px;
  width: 300px;
  height: 400px;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow: auto;
  transition: all 0.3s ease-in-out;
}

.node-info:hover {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
}

.node-info h3 {
  margin-top: 0;
  color: #333;
  font-weight: 600;
}

.node-info p {
  margin-bottom: 1em;
  color: #555;
  line-height: 1.6;
  font-size: 0.9em;
}

.node-info p strong {
  color: #222;
  font-weight: 700;
}

</style>


  