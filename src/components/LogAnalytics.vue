<template>
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
    <el-button type="primary" @click="getData">Log Query</el-button>
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
      const url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=PT30M';
      const query = "Event | where Source == 'Microsoft-Windows-Sysmon'";
  
      axios
        .post(url, { query }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJjYTdmM2YwYi03ZDkxLTQ4MmMtOGUwOS1jNWQ4NDBkMGVhYzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgvIiwiaWF0IjoxNjg0ODUwNDIyLCJuYmYiOjE2ODQ4NTA0MjIsImV4cCI6MTY4NDg1NTk3NCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQURBWXBjblNuNkNQYU1CNWV4OUMxZjZvMUtKb20xWTczc2FXbWw4bHgrN0REWEFmK2pKR2VlWTcvR25kdUdCRDZqR2dudit2dG1hTThnK2NPQ1FiUUdMMUZrUUpCd0xuSmJhODFYUm5IVkI1ZjVmQVhYYmd3cGhYNXZLWHJjUGRRTjlEdmlIaDBraHA5MzNIcUtRQ2JLOVVGYTJuYWxvcWhCbFhFTklxRXJmND0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwNjdGRkUyMzFBNkQ1QSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI2ZTAwYjMxZi0wNmQ0LTRjOTMtOGIxNC1lMDhiNTY4YjRhMDQiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ilh1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoi5b6QIiwiZ2l2ZW5fbmFtZSI6Iui-sOa0iyIsImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMTE2Ljg4LjE5Ni4xNzIiLCJuYW1lIjoiWHVjaGVueWFuZzA2Iiwib2lkIjoiNjc0Y2I5MzAtMjMwOC00ZWJkLThjMDktNDljN2RjMzA1N2YyIiwicHVpZCI6IjEwMDMyMDAyNjVBNDIxNUMiLCJyaCI6IjAuQVVvQUpBb0VGWnJhcjAtRzZZcm9VcUxtLUFzX2Y4cVJmU3hJamduRjJFRFE2c1dKQU1ZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Ikw5Y3lkTFpyMVJvSW9YcVBvTmViSDlOOHFtQXMzbnlfMVp0OTJPbFdSemsiLCJ0aWQiOiIxNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI1h1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsInV0aSI6IjlFN3RjVkNnMjB5UHIwX1ZyX2hDQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjEzYmQxYzcyLTZmNGEtNGRjZi05ODVmLTE4ZDNiODBmMjA4YSJdfQ.i5zUG9XSrTRQmO214q544ypVrjqSqaJYVh_kRC1BFZECrdGSNuhkFaFGwpDdysIZLI3YCzTCGdb-u9rQsb9KC71LFhXaglYRjPqKNgIOXuuw2TPjNIQH-bcXlgObyMZmg1LT6FCjFv95LSWidtUCTW4_HalPfdO7HceIQtiIR2zYNrRQmRGfSD-jnJ69tZ1S_Ev2focWyNIxupezjZoVVL6ry5mgW4VHFWz2lYlAofVtUYtXIu28sjWllGOW3IMQasoH85AElJZKUxpSZtxo7cghcKHYMvMDlnNAZlrL5mkMjzDh7C2TRq962_weUDR_tg-N_Uzm85tPC0HOlDuDwQ',
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
