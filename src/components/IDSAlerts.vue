<template>
  <h1>IDS Alerts</h1>
  <div>
    <el-table :data="currentPageData" style="width: 100%">
      <el-table-column
        v-for="column in tableColumns"
        :key="column.name"
        :prop="column.name"
        :label="column.name"
        :min-width="200"
        :row-class-name="getRowClassName"
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
        { name: 'Timestamp', type: 'string' },
        { name: 'Category', type: 'string' },
        { name: 'Classification', type: 'string' },
        { name: 'Priority', type: 'string' },
        { name: 'Protocol', type: 'string' },
        { name: 'Direction', type: 'string' }
      ],
      currentPage: 1,
      pageSize: 5,
      redRow: 1, // 第一行日志变红
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
      const csvFilePath1 = '/static/parsed.csv';

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
          this.tableData = data1.map((row, index) => ({ ...row, _rowIndex: index }));
        })
        .catch(err => console.error(err));
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRowClassName(row) {
    return row._rowIndex === this.redRow ? 'red-row' : '';
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

.el-table th.is-leaf,
.el-table td {
  border-color: #000;
}

.el-table th.is-leaf:not(.is-hidden) {
  border-bottom: 1px solid #000;
}

.el-table .cell {
  border-right: 1px solid #000;
}

.red-row {
  background-color: red;
  color: white;
}
</style>
