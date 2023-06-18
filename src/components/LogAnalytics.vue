<!-- <template>
  <h1>Raw Logs</h1>
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
      { name: 'Time of Day', type: 'string' },
      { name: 'Process Name', type: 'string' },
      { name: 'PID', type: 'int' },
      { name: 'Operation', type: 'string' },
      { name: 'Path', type: 'string' },
      { name: 'Source', type: 'string' },
      // { name: 'Detail', type: 'string' },
      ],  
      currentPage: 1,
      pageSize: 10, // 每页显示的行数
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
      const csvFilePath1 = '/static/svchost writing a file to a UNC path (T1105).csv';
      const csvFilePath2 = '/static/apt29_log.csv';

      const parseCsvFile = (filePath, source) => {
        return new Promise((resolve, reject) => {
          Papa.parse(filePath, {
            download: true,
            header: true,
            complete: results => resolve(results.data.map(item => ({ ...item, source }))),
            error: err => reject(err)
          });
        });
      };
      Promise.all([
        parseCsvFile(csvFilePath1, 'Process Monitor'),
        parseCsvFile(csvFilePath2, 'Sysmon')
      ])
      .then(([data1, data2]) => {
        console.log(data1, data2); 
        this.tableData = [...data1, ...data2];
      })
      .catch(err => console.error(err));
    },

    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
});
</script> -->
<template>
  <h1>Raw Logs</h1>
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
        { name: 'Time of Day', type: 'string' },
        { name: 'Process Name', type: 'string' },
        { name: 'PID', type: 'int' },
        { name: 'Operation', type: 'string' },
        { name: 'Path', type: 'string' },
        { name: 'Source', type: 'string' }
      ],  
      currentPage: 1,
      pageSize: 10,
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
      const csvFilePath1 = '/static/apt29_log_proc.csv';
      const csvFilePath2 = '/static/apt29_log.csv';

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
        parseCsvFile(csvFilePath2)
      ])
      .then(([data1, data2]) => {
        console.log(data1, data2); 
        this.tableData = [...data1, ...data2];
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
