<template>
  <div>
    <div v-if="currentLevel===0&&currentLevel2<1" class="info-panel">
      <h3 ref="infoTitle"><strong> {{additionalData.title}}</strong></h3>
      <p ref="infoText">{{additionalData.infos}}</p>
    </div>
    <div ref="networkGraph"></div>
    <div ref="subPageGraph" style="display: none;"></div>
    <div ref="subPageGraph2" style="display: none;"></div>
    <div class="subsubpagegraph-container">
      <div ref="subSubPageGraph" style="display: none;"></div>
      <div ref="subSubKnowledge" style="display: none;"></div>
    </div>
    <div class="subsubpagegraph2-container">
      <div ref="subSubPageGraph3" style="display: none;"></div>
      <div ref="subSubKnowledge2" style="display: none;"></div>
    </div>
    <div class="subsubpagegraph3-container">
      <div ref="subSubPageGraph2" style="display: none;"></div>
      <div ref="subSubKnowledge3" style="display: none;"></div>
    </div>
    <div v-if="selectedNode" class="node-info" @mousedown.stop>
      <h3>Node Information</h3>
      <p v-if="selectedNode.name"><strong>Name:</strong> {{ selectedNode.name }}</p>
      <p v-if="selectedNode.IpAddress"><strong>IP Address:</strong> {{ selectedNode.IpAddress }}</p>
      <p v-if="selectedNode.MachineType"><strong>Machine OS:</strong> {{ selectedNode.MachineType }}</p>
      <p v-if="selectedNode.information"><strong>Information:</strong> {{ selectedNode.information }}</p>
      <p v-if="selectedNode.Alert"><strong>IDS Alert:</strong> {{ selectedNode.Alert }}</p>
      <p v-if="selectedNode.NetworkLog"><strong>Network Log:</strong> {{ selectedNode.NetworkLog }}</p>
      <p v-if="selectedNode.FileInformation"><strong>File Information:</strong> {{ selectedNode.FileInformation }}</p>
    </div>
    <button @click="goBack" v-if="currentLevel > 0 && currentLevel3 <= 1">Go Back</button>
    <button @click="goBack2" v-if="currentLevel2 > 0">Go Back</button>
    <button @click="goBack3" v-if="currentLevel3 > 1">Go Back</button>
  </div>
</template>
<script>
import * as d3 from "d3";
import { additionalData, networkData, subPageData, subPageData2, subSubPageData, subSubKnowledge, subSubPageData3, subSubKnowledge2, subSubPageData2, subSubKnowledge3 } from "./../assets/data2.js";

export default {
  name: "D3Graph",
  data() {
    return {
      currentLevel: 0,
      currentLevel2: 0,
      currentLevel3: 0,
      selectedNode: null,
      icons: {
        "machine": "/static/icons/machine.png",
        "step-click": "/static/icons/step-click.png",
        "step-unclick": "/static/icons/step-unclick.png",
        "payload": "/static/icons/payload.png",
        "normal-program": "/static/icons/normal-program.png",
        "abnormal-program": "/static/icons/abnormal-program.png",
        "abnormal-txt": "/static/icons/abnormal-txt.png",
        "abnormal-zip": "/static/icons/abnormal-zip.png",
        "normal-file": "/static/icons/normal-file.png",
        "abnormal-file": "/static/icons/abnormal-file.png",
        "normal-dll": "/static/icons/normal-dll.png",
        "kg-program": "/static/icons/normal-program.png",
        "kg-dll": "/static/icons/normal-dll.png",
        "kg-file": "/static/icons/normal-file.png",
        "reg": "/static/icons/Reg.png",
        "web": "/static/icons/web.png",
      },
      additionalData: additionalData,
    };
  },
  mounted() {
    this.createNetworkGraph();
    this.createSubPageGraph();
    this.createSubPageGraph2();
    this.createSubSubPageGraph();
    this.createSubSubKnowledge();
    this.createSubSubPageGraph3();
    this.createSubSubKnowledge2();
    this.createSubSubPageGraph2();
    this.createSubSubKnowledge3();
    window.addEventListener('mousedown', this.hideNodeInfo);
  },
  beforeUnmount() {
    window.removeEventListener('mousedown', this.hideNodeInfo);
  },
  methods: {
    hideNodeInfo() {
      this.selectedNode = null;
    },
    createNetworkGraph() {
      const width = 500;
      const height = 500;

      const svg = d3.select(this.$refs.networkGraph)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);
                    
      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "black")
                      .attr('marker-end', 'url(#arrow)');
      
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
                  .selectAll("image")
                  .data(networkData.nodes)
                  .enter()
                  .append("image")
                  .attr("xlink:href", d => this.icons[d.type])
                  .attr("width", 40) 
                  .attr("height", 40)
                  .attr("transform", "translate(-20, -20)")
                  .on("click", (event, d) => {
                    event.stopPropagation();
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

        // node.attr("cx", d => d.x)
        //     .attr("cy", d => d.y);

        node.attr("x", d => d.x) // Adjust here to center the icon
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subpage')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subpage)');

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
                      .selectAll("image")
                      .data(subPageData.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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
                          this.$refs.subSubKnowledge.style.display = 'block';
                        }
                        else if(d.id === 'Step4-Defense Evasion and Discovery') {
                          this.currentLevel3 = 2;
                          this.$refs.subPageGraph.style.display = 'none';
                          this.$refs.subSubPageGraph3.style.display = 'block';
                          this.$refs.subSubKnowledge2.style.display = 'block';
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subpage2')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subpage2)');

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
                      .selectAll("image")
                      .data(subPageData2.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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
                          this.$refs.subSubKnowledge3.style.display = 'block';
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      // const svg = d3.select(this.$refs.subSubPageGraph)
      //               .append("svg")
      //               .attr('width', '100%')
      //               .attr('height', '100%')

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubpage')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubpage)');
                    
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
                      .selectAll("image")
                      .data(subSubPageData.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
    createSubSubKnowledge() {
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubKnowledge)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubkg')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

      const simulation = d3.forceSimulation(subSubKnowledge.nodes)
                           .force("link", d3.forceLink(subSubKnowledge.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubKnowledge.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubkg)');
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubKnowledge.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("image")
                      .data(subSubKnowledge.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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
                        .data(subSubKnowledge.nodes)
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
    // createSubSubKnowledge() {
    //   const width = 600;
    //   const height = 800;

    //   const svg = d3.select(this.$refs.subSubPageData)
    //                 .append("svg")
    //                 .attr('width', width)
    //                 .attr('height', height);

    //   // const svg = d3.select(this.$refs.subSubKnowledge)
    //   //               .append("svg")
    //   //               .attr('width', '100%')
    //   //               .attr('height', '100%')

    //   svg.append('defs')
    //     .append('marker')
    //     .attr('id', 'arrow-subsubpageknowledge')
    //     .attr('viewBox', [0, 0, 20, 13])
    //     .attr('refX', 45)
    //     .attr('refY', 6.5)
    //     .attr('markerWidth', 20)
    //     .attr('markerHeight', 9)
    //     .attr('orient', 'auto-start-reverse')
    //     .append('path')
    //     .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
    //     .attr('fill', 'black');

    //   const simulation = d3.forceSimulation(subSubKnowledge.nodes)
    //                        .force("link", d3.forceLink(subSubKnowledge.links).id(d => d.id).distance(200))
    //                        .force("charge", d3.forceManyBody().strength(-200))
    //                        .force("center", d3.forceCenter(width / 2, height / 2));

    //   const link = svg.append("g")
    //                   .attr("class", "links")
    //                   .selectAll("line")
    //                   .data(subSubKnowledge.links)
    //                   .enter()
    //                   .append("line")
    //                   .attr("stroke", "grey")
    //                   .attr('marker-end', 'url(#arrow-subsubpageknowledge)');
                    
    //   const linkLabels = svg.append("g")
    //                         .attr("class", "linkLabels")
    //                         .selectAll("text")
    //                         .data(subSubKnowledge.links)
    //                         .enter()
    //                         .append("text")
    //                         .attr("class", "linkLabel")
    //                         .text(d => d.label);

    //   const node = svg.append("g")
    //                   .attr("class", "nodes")
    //                   .selectAll("image")
    //                   .data(subSubKnowledge.nodes)
    //                   .enter()
    //                   .append("image")
    //                   .attr("xlink:href", d => this.icons[d.type])
    //                   .attr("width", 40) 
    //                   .attr("height", 40)
    //                   .attr("transform", "translate(-20, -20)")
    //                   .on("click", (event, d) => {
    //                     this.selectedNode = d;
    //                   })
    //                   .call(d3.drag()
    //                         .on("start", dragstarted)
    //                         .on("drag", dragged)
    //                         .on("end", dragended));

    //   const labels = svg.append("g")
    //                     .attr("class", "labels")
    //                     .selectAll("text")
    //                     .data(subSubKnowledge.nodes)
    //                     .enter()
    //                     .append("text")
    //                     .attr("class", "label")
    //                     .text(d => d.id);

    //   simulation.on("tick", () => {
    //     link.attr("x1", d => d.source.x)
    //         .attr("y1", d => d.source.y)
    //         .attr("x2", d => d.target.x)
    //         .attr("y2", d => d.target.y);

    //     linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
    //               .attr("y", d => (d.source.y + d.target.y) / 2);

    //     node.attr("x", d => d.x) 
    //         .attr("y", d => d.y);

    //     labels.attr("x", d => d.x - 20)
    //           .attr("y", d => d.y - 20);
    //   });

    //   function dragstarted(event, d) {
    //     if (!event.active) simulation.alphaTarget(0.3).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    //   }

    //   function dragged(event, d) {
    //     d.fx = event.x;
    //     d.fy = event.y;
    //   }

    //   function dragended(event, d) {
    //     if (!event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;
    //   }
    // },
    createSubSubPageGraph2() {
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph2)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubpage2')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubpage2)');
                    
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
                      .selectAll("image")
                      .data(subSubPageData2.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
    createSubSubKnowledge2() {
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubKnowledge2)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubkg2')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

      const simulation = d3.forceSimulation(subSubKnowledge2.nodes)
                           .force("link", d3.forceLink(subSubKnowledge2.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubKnowledge2.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubkg2)');
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubKnowledge2.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("image")
                      .data(subSubKnowledge2.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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
                        .data(subSubKnowledge2.nodes)
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubPageGraph3)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubpage3')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

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
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubpage3)');
                    
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
                      .selectAll("image")
                      .data(subSubPageData3.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
    createSubSubKnowledge3() {
      const width = 600;
      const height = 800;

      const svg = d3.select(this.$refs.subSubKnowledge3)
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);

      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow-subsubkg3')
        .attr('viewBox', [0, 0, 20, 13])
        .attr('refX', 45)
        .attr('refY', 6.5)
        .attr('markerWidth', 20)
        .attr('markerHeight', 9)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()([[0, 0], [0, 13], [20, 6.5]]))
        .attr('fill', 'black');

      const simulation = d3.forceSimulation(subSubKnowledge3.nodes)
                           .force("link", d3.forceLink(subSubKnowledge3.links).id(d => d.id).distance(200))
                           .force("charge", d3.forceManyBody().strength(-200))
                           .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
                      .attr("class", "links")
                      .selectAll("line")
                      .data(subSubKnowledge3.links)
                      .enter()
                      .append("line")
                      .attr("stroke", "grey")
                      .attr('marker-end', 'url(#arrow-subsubkg3)');
                    
      const linkLabels = svg.append("g")
                            .attr("class", "linkLabels")
                            .selectAll("text")
                            .data(subSubKnowledge3.links)
                            .enter()
                            .append("text")
                            .attr("class", "linkLabel")
                            .text(d => d.label);

      const node = svg.append("g")
                      .attr("class", "nodes")
                      .selectAll("image")
                      .data(subSubKnowledge3.nodes)
                      .enter()
                      .append("image")
                      .attr("xlink:href", d => this.icons[d.type])
                      .attr("width", 40) 
                      .attr("height", 40)
                      .attr("transform", "translate(-20, -20)")
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
                        .data(subSubKnowledge3.nodes)
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

        node.attr("x", d => d.x) 
            .attr("y", d => d.y);

        labels.attr("x", d => d.x - 20)
              .attr("y", d => d.y - 20);
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
        this.$refs.subSubKnowledge.style.display = 'none';
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
        this.$refs.subSubKnowledge3.style.display = 'none';
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
        this.$refs.subSubKnowledge2.style.display = 'none';
        this.$refs.subPageGraph.style.display = 'block';
      }else if (this.currentLevel3 === 1) {
        this.currentLevel3 = 0;
        this.$refs.subPageGraph.style.display = 'none';
        this.$refs.networkGraph.style.display = 'block';
      }
    },
  },
};
</script>




<style scoped>

.subsubpagegraph-container {
  display: flex;
  justify-content: space-between;
}

.subsubpagegraph2-container {
  display: flex;
  justify-content: space-between;
}

.subsubpagegraph3-container {
  display: flex;
  justify-content: space-between;
}

/* .info-panel {
  width: 300px;  
  height: 500px;  
  border: 1px solid #000;
  padding: 10px;
  margin-right: 20px;
  float: left;
} */

.info-panel {
  position: absolute;
  left: 50px;
  top: 200px;
  width: 300px;  /* Adjust as needed */
  height: 500px;  /* Adjust as needed */
  border: 1px solid #ddd;
  padding: 20px;
  margin-right: 30px;
  margin-bottom: 30px;
  float: left;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.info-panel:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}

.info-panel h3 {
  margin-top: 0;
  color: #333;
  font-weight: 600;
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.info-panel p {
  color: #555;
  line-height: 1.4;
  font-size: 1em;
  margin-bottom: 1em;
}

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


  