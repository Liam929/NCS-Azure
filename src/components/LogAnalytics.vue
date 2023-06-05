<!-- <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="column in tableColumns"
        :key="column.name"
        :prop="column.name"
        :label="column.name"
        :min-width="200"
      />
    </el-table>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue';
// import axios from 'axios';
// import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { ElTable, ElTableColumn } from 'element-plus';
import Papa from 'papaparse'; // 引入 PapaParse 库
  
export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    // ElButton,
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
      { name: 'Result', type: 'string' },
      { name: 'Detail', type: 'string' },
      ],
    };
  },
  mounted() {
    this.loadCSVData();
  },
  methods: {
    loadCSVData() {
      const csvFilePath = 'static/svchost writing a file to a UNC path (T1105).csv'; // 替换为你的 CSV 文件路径
      Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: (results) => {
          this.tableData = results.data;
        },
      });
    },
    // getData() {
    //   const url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=PT30M';
    //   const query = "Event | where Source == 'Microsoft-Windows-Sysmon'";
  
    //   axios
    //     .post(url, { query }, {
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJjYTdmM2YwYi03ZDkxLTQ4MmMtOGUwOS1jNWQ4NDBkMGVhYzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgvIiwiaWF0IjoxNjg1ODc3NTUyLCJuYmYiOjE2ODU4Nzc1NTIsImV4cCI6MTY4NTg4MjUzOCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQTJDSWZEeGhRamtEWTU5bFJSdnp2SHZlQThwMmRaR09ncnFXdExlRWltcElDNGpKaU1aODVRVTF1aTFDb0RibGVzdDAvRUVkMGxJOW9VdmtPR00yVWVoTjl6VGRwZGtncUZPQTVhWU0zb3M5K2JCUFFuYzBBYU5rYnZLY1Y5T1VvUUJ2dnBBa1lrVlBYVnVvMGo2KzlOc3FnNDd6bzF5Z0RTZkhDek1NcnVCST0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwNjdGRkUyMzFBNkQ1QSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI2ZTAwYjMxZi0wNmQ0LTRjOTMtOGIxNC1lMDhiNTY4YjRhMDQiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ilh1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoi5b6QIiwiZ2l2ZW5fbmFtZSI6Iui-sOa0iyIsImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMTAzLjI1Mi4yMDEuMjE0IiwibmFtZSI6Ilh1Y2hlbnlhbmcwNiIsIm9pZCI6IjY3NGNiOTMwLTIzMDgtNGViZC04YzA5LTQ5YzdkYzMwNTdmMiIsInB1aWQiOiIxMDAzMjAwMjY1QTQyMTVDIiwicmgiOiIwLkFVb0FKQW9FRlpyYXIwLUc2WXJvVXFMbS1Bc19mOHFSZlN4SWpnbkYyRURRNnNXSkFNWS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJMOWN5ZExacjFSb0lvWHFQb05lYkg5TjhxbUFzM255XzFadDkyT2xXUnprIiwidGlkIjoiMTUwNDBhMjQtZGE5YS00ZmFmLTg2ZTktOGFlODUyYTJlNmY4IiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNYdWNoZW55YW5nMDZAaG90bWFpbC5jb20iLCJ1dGkiOiJLZW9FbjI4ZHlVQzVLeThGWGFIV0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIxM2JkMWM3Mi02ZjRhLTRkY2YtOTg1Zi0xOGQzYjgwZjIwOGEiXX0.DtpB5djNro8qxmYMujjZBcbIfBBzrgO8zdV6qTSVs2SkLDlR0i2_kpBsy6JoovwtaKk6NokAns3o0ExxadHSzyjU69iLOM4YYoKBhTv8ErbuhzmLPWki39Fj3jI-kHX1fooiGhxIKMZn--gFy3xwJMdlSUSg-VXCHd-RHF0Ajsd1sLva5YdbOW9emrK6rgCsuW6W_OOTsTbXnFWDeRXteJCTDXyFvY83AJ0-mGtgKzKHmgr4_Li7tMG2r2QNOg0oQUXmowyYTLuz_koD4ZtEiP3YFgcS3LaN9eNru45qLykC0ps4MDCXgAJ9JHgCtffGBqdfW17Es2Xm5C0fFeMgKQ',
    //       },
    //     })
    //     .then((response) => {
    //       this.tableData = response.data.tables[0].rows.map((row) => {
    //         const data = {};
    //         row.forEach((value, index) => {
    //           data[this.tableColumns[index].name] = value;
    //         });
    //         return data;
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
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
</style> -->

<template>
  <h1>Raw Logs</h1>
  <div>
    <el-date-picker
      v-model="startTime"
      type="datetime"
      placeholder="StartTime"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <el-date-picker
      v-model="endTime"
      type="datetime"
      placeholder="EndTime"
      :picker-options="pickerOptions"
    ></el-date-picker>
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
      startTime: null,
      endTime: null,
      tableData: [],
      tableColumns: [
      { name: 'Time of Day', type: 'string' },
      { name: 'Process Name', type: 'string' },
      { name: 'PID', type: 'int' },
      { name: 'Operation', type: 'string' },
      { name: 'Path', type: 'string' },
      { name: 'Result', type: 'string' },
      { name: 'Detail', type: 'string' },
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
      // const startTimeISO = this.formatDateToISO(this.startTime);
      // const endTimeISO = this.formatDateToISO(this.endTime);
      // console.log('StartTime:', startTimeISO);
      // console.log('EndTime:', endTimeISO);
      const csvFilePath = 'static/svchost writing a file to a UNC path (T1105).csv';
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
    // formatDateToISO(date) {
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const day = String(date.getDate()).padStart(2, '0');
    //   const hours = String(date.getHours()).padStart(2, '0');
    //   const minutes = String(date.getMinutes()).padStart(2, '0');
    //   const seconds = String(date.getSeconds()).padStart(2, '0');

    //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    // },
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
