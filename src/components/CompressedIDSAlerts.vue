<template>
    <h1>Compressed IDS Alerts</h1>
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
        {name: 'Timestamp', 'type': 'string'},
        {name: 'Category', 'type': 'string'},
        {name: 'Classification', 'type': 'string'},
        {name: 'Priority', 'type': 'string'},
        {name: 'Protocol', 'type': 'string'},
        {name: 'Direction', 'type': 'string'}
        ],  
        currentPage: 1,
        pageSize: 5, // 每页显示的行数
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
        const csvFilePath = 'static/filtered.csv';
        Papa.parse(csvFilePath, {
          download: true,
          header: true,
          complete: (results) => {
            this.tableData = results.data;
          },
        });
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