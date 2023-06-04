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
      <el-button type="primary" @click="getData">Log Query after processing</el-button>
    </div>
</template>
    
<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
    
export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
  },
  data() {
    return {
      tableData: [],
      tableColumns: [
        { name: 'TenantId', type: 'string' },
        { name: 'SourceSystem', type: 'string' },
        { name: 'TimeGenerated', type: 'datetime' },
        { name: 'Source', type: 'string' },
        { name: 'EventLog', type: 'string' },
        { name: 'Computer', type: 'string' },
        { name: 'EventLevel', type: 'int' },
        { name: 'EventLevelName', type: 'string' },
        { name: 'ParameterXml', type: 'string' },
        { name: 'EventData', type: 'string' },
        { name: 'EventID', type: 'int' },
        { name: 'RenderedDescription', type: 'string' },
        { name: 'AzureDeploymentID', type: 'string' },
        { name: 'Role', type: 'string' },
        { name: 'EventCategory', type: 'int' },
        { name: 'UserName', type: 'string' },
        { name: 'Message', type: 'string' },
        { name: 'MG', type: 'string' },
        { name: 'ManagementGroupName', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'ResourceId', type: 'string' },
      ],
    };
  },
  methods: {
    getData() {
      const url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=P1D';
      const query = "Event | where Source == 'Microsoft-Windows-Sysmon' | where tostring(['RenderedDescription']) contains '‮cod.3aka.scr.exe' or tostring(['ParameterXml']) contains '‮cod.3aka.scr.exe'";
    
      axios
        .post(url, { query }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJjYTdmM2YwYi03ZDkxLTQ4MmMtOGUwOS1jNWQ4NDBkMGVhYzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgvIiwiaWF0IjoxNjgzMTY0MjkyLCJuYmYiOjE2ODMxNjQyOTIsImV4cCI6MTY4MzE2OTI0MywiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQWJNbkphbTNPVFJhM1NTR3h5Z1VLSGY0WkRlejhOSXB1aTM2Rk9KOVd6UGI3MEs2NGhmZGkzY3FJQmVIbkZoN05SOUJoUlZMWTZxWUFFY1RDOC9XL1VlSzdKMVhxRmJ3WVF0WTYxZStlRDdWbEtEVndSVHYxc3kvOHN2Z1hMNlE2RWVseWJyOGIvMkdDWVQ4ZmFkVVdkY1pwUlpGMHVPbkV5WHBRbWNKNFRVZz0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwNjdGRkUyMzFBNkQ1QSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI2ZTAwYjMxZi0wNmQ0LTRjOTMtOGIxNC1lMDhiNTY4YjRhMDQiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ilh1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoi5b6QIiwiZ2l2ZW5fbmFtZSI6Iui-sOa0iyIsImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMTM3LjEzMi4yNy42NiIsIm5hbWUiOiJYdWNoZW55YW5nMDYiLCJvaWQiOiI2NzRjYjkzMC0yMzA4LTRlYmQtOGMwOS00OWM3ZGMzMDU3ZjIiLCJwdWlkIjoiMTAwMzIwMDI2NUE0MjE1QyIsInJoIjoiMC5BVW9BSkFvRUZacmFyMC1HNllyb1VxTG0tQXNfZjhxUmZTeElqZ25GMkVEUTZzV0pBTVkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiTDljeWRMWnIxUm9Jb1hxUG9OZWJIOU44cW1BczNueV8xWnQ5Mk9sV1J6ayIsInRpZCI6IjE1MDQwYTI0LWRhOWEtNGZhZi04NmU5LThhZTg1MmEyZTZmOCIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jWHVjaGVueWFuZzA2QGhvdG1haWwuY29tIiwidXRpIjoiZUQwc1ZCMVc0MHlQbTZDWlgyTUVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMTNiZDFjNzItNmY0YS00ZGNmLTk4NWYtMThkM2I4MGYyMDhhIl19.V-BESr9jMBajhpBGzomK0u-DKa8BaPJ_MuxAy_GZCMVSRja867G35KubCfPhDwVdvEQrI8LDiG9e0Ht5uKAPEKdYUTJXem_GThrWvl8FEbN_Hf8Bhk_pnUZm54Fbit1gh0797Eqxa3T9dZfMv19HVxV2laq64oVggaOLQvO0v_AQP-yjjcr6fhIc4bmvS9IQjOhoS64C12QxfjnH-4VauZ99hA42evKuIgIIDDOcF7eUbPcziGWdJvaJefF8J09zKTCqL4aapWykgC0t63F7echgsWM9aPvWRX9GjsWY0CNObe-U3GQKrW6mhPCs16O0P6TEfXYfBpm-WIcKaDBXsQ',
          },
        })
        .then((response) => {
          this.tableData = response.data.tables[0].rows.map((row) => {
            const data = {};
            row.forEach((value, index) => {
              data[this.tableColumns[index].name] = value;
            });
            return data;
          });
        })
        .catch((error) => {
          console.error(error);
        });
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
}

.el-table__body tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style> -->

<template>
  <h1>Selected Logs</h1>
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
      const csvFilePath = 'static/svchost writing a file to a UNC path (T1105).reduce.csv';
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