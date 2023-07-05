<template>
    <h1>Powershell Log</h1>
    <div>
      <el-table :data="currentPageData" :row-class-name="getRowClass" style="width: 100%">
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
        {name: '@timestamp', 'type': 'string'},
        {name: '@version', 'type': 'string'},
        {name: 'Category', 'type': 'string'},
        {name: 'Channel', 'type': 'string'},
        {name: 'EventID', 'type': 'string'},
        {name: 'EventReceivedTime', 'type': 'string'},
        {name: 'EventTime', 'type': 'string'},
        {name: 'EventType', 'type': 'string'},
        {name: 'ExecutionProcessID', 'type': 'string'},
        {name: 'Hostname', 'type': 'string'},
        {name: 'Keywords', 'type': 'string'},
        {name: 'Message', 'type': 'string'},
        {name: 'Opcode', 'type': 'string'},
        {name: 'RecordNumber', 'type': 'string'},
        {name: 'Severity', 'type': 'string'},
        {name: 'SeverityValue', 'type': 'string'},
        {name: 'SourceModuleName', 'type': 'string'},
        {name: 'SourceModuleType', 'type': 'string'},
        {name: 'SourceName', 'type': 'string'},
        {name: 'Task', 'type': 'string'},
        {name: 'ThreadID', 'type': 'string'},
        {name: 'host', 'type': 'string'},
        {name: 'port', 'type': 'string'},
        {name: 'tags', 'type': 'string'}
        ],  
        currentPage: 1,
        pageSize: 5,
        redRow: 3,
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
        const csvFilePath1 = '/static/powershell.csv';
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
      getRowClass(redRow, index) {
      if (index === redRow) {
        return 'el-table__row--red';
      }
      return '';
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

  .el-table__row--red {
  background-color: red;
  color: white;
}
  </style>
  