<template>
    <h1>Zeek Logs</h1>
    <div>
      <el-table :data="currentPageData" style="width: 100%">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.name"
          :prop="column.name"
          :label="column.name"
          :min-width="200"
        />
      </el-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableData.length"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </template>
      
  <script>
  import { defineComponent } from 'vue';
  import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
  import Papa from 'papaparse';
  
  export default defineComponent({
    components: {
      ElTable,
      ElTableColumn,
      ElPagination,
    },
    data() {
      return {
        tableData: [],
        tableColumns: [
          {name: 'ts', 'type': 'string'},
          {name: 'uid', 'type': 'string'},
          {name: 'id.orig_h', 'type': 'string'},
          {name: 'id.orig_p', 'type': 'string'},
          {name: 'id.resp_h', 'type': 'string'},
          {name: 'id.resp_p', 'type': 'string'},
          {name: 'proto', 'type': 'string'},
          {name: 'service', 'type': 'string'},
          {name: 'duration', 'type': 'string'},
          {name: 'orig_bytes', 'type': 'string'},
          {name: 'resp_bytes', 'type': 'string'},
          {name: 'conn_state', 'type': 'string'},
          {name: 'local_orig', 'type': 'string'},
          {name: 'local_resp', 'type': 'string'},
          {name: 'missed_bytes', 'type': 'string'},
          {name: 'history', 'type': 'string'},
          {name: 'orig_pkts', 'type': 'string'},
          {name: 'orig_ip_bytes', 'type': 'string'},
          {name: 'resp_pkts', 'type': 'string'},
          {name: 'resp_ip_bytes', 'type': 'string'},
          {name: 'tunnel_parents', 'type': 'string'}
        ],  
        currentPage: 1,
        pageSize: 5,
      };
    },
    computed: {
      currentPageData() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.tableData.slice(startIndex, endIndex);
      },
    },
    mounted() {
      this.loadCSVData();
    },
    methods: {
      loadCSVData() {
        const csvFilePath1 = '/static/conn.csv';
        // const csvFilePath2 = '/static/apt29_log.csv';
  
        const parseCsvFile = (filePath) => {
          return new Promise((resolve, reject) => {
            Papa.parse(filePath, {
              download: true,
              header: true,
              complete: results => resolve(results.data),
              error: err => reject(err)
            });
          });
        };
        Promise.all([
          parseCsvFile(csvFilePath1),
        ])
        .then(([data1]) => {
          console.log(data1); 
          this.tableData = [...data1];
        })
        .catch(err => console.error(err));
      },
      handlePageChange(currentPage) {
        this.currentPage = currentPage;
      },
    },
  });
  </script>
  
  
  
  <style scoped>
  .el-table th,
  .el-table td {
    padding: 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    min-width: 200px;
  }
  
  .el-table__header-wrapper {
    background-color: #f5f5f5;
  }
  
  .el-table__header th {
    font-weight: bold;
    text-align: center;
    color: white;
    background-color: #3a8ee6;
  }
  
  .el-table__body tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .el-table th.is-leaf, .el-table td {
    border-color: #000;
  }
  
  .el-table th.is-leaf:not(.is-hidden) {
    border-bottom: 1px solid #000;
  }
  
  .el-table .cell {
    border-right: 1px solid #000;
  }
  </style>
  