<!-- <template>
    <div>
      <div v-if="childPage && childPage.name === 'CTI to Graph'">
        <input v-model="inputText" type="text" placeholder="Please Input CTI">
        <button @click="generateImage">Convert to Graph</button>
        <img v-if="generatedImage" :src="generatedImage" alt="The graph generated">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: '',
        generatedImage: ''
      };
    },
    methods: {
      generateImage() {
        // 根据输入的文本生成图片的逻辑，你可以根据具体需求来实现
        // 生成的图片可以赋值给 generatedImage 属性，用于在页面上展示
      }
    }
  };
  </script>
   -->


   <template>
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
  import { ElTable, ElTableColumn, ElButton, ElDatePicker } from 'element-plus';
    
  export default defineComponent({
    components: {
      ElTable,
      ElTableColumn,
      ElButton,
      ElDatePicker,
    },
    data() {
      return {
        startTime: null,
        endTime: null,
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
        const startTimeISO = this.formatDateToISO(this.startTime);
        const endTimeISO = this.formatDateToISO(this.endTime);
        console.log('StartTime:', startTimeISO);
        console.log('EndTime:', endTimeISO);
        // const url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=PT30M';
        const url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=2023-06-04T11:14:31.000Z/2023-06-04T11:43:14.623Z';
        const query = "Event | where Source == 'Microsoft-Windows-Sysmon'";
    
        axios
          .post(url, { query }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJjYTdmM2YwYi03ZDkxLTQ4MmMtOGUwOS1jNWQ4NDBkMGVhYzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgvIiwiaWF0IjoxNjg1ODc1NTI3LCJuYmYiOjE2ODU4NzU1MjcsImV4cCI6MTY4NTg4MDQ4MiwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQUsxQzBmNUN6blI5YnRRL1Z6TENkaDM5dldUMStIOTE3a09Fa3RHNzBETmU0YWVVMUp3RzhIK0Y0M1ljajhlVmVoZlZXd2ZsUzYyZ0tFamxjMHlxckVsWndpUEpXbjZCRkQ2M3pxSnA4QlZzS0s0Tk1jUkpyaXNRdUR2UXpBQ1RnMFkxNG0zeklGWGE3Um93MGZ3NDFubHlBV3JHOTBVYmQrSEhNeXdJQ0Q0Yz0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwMzdGRkUwNkZBNEVEMCIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI2ZTAwYjMxZi0wNmQ0LTRjOTMtOGIxNC1lMDhiNTY4YjRhMDQiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6IjMwNjk2OTY4NzJAcXEuY29tIiwiZmFtaWx5X25hbWUiOiJMaWFvIiwiZ2l2ZW5fbmFtZSI6IllpZmFuIiwiZ3JvdXBzIjpbIjIxNDkzY2UyLTIwY2ItNDc0OC05ZDk4LTViYTJkYmU4ZTFlMyJdLCJpZHAiOiJsaXZlLmNvbSIsImlwYWRkciI6IjE4NS40Mi4yMjAuMTc2IiwibmFtZSI6IllpZmFuIExpYW8iLCJvaWQiOiI0M2I2YWZmZi1mNWRjLTQzZjctYTE0MC0wZjFiZjNlMmU4NjIiLCJwdWlkIjoiMTAwMzIwMDI2NUEyQjFCOSIsInJoIjoiMC5BVW9BSkFvRUZacmFyMC1HNllyb1VxTG0tQXNfZjhxUmZTeElqZ25GMkVEUTZzV0pBTFUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiUFhDLTNicW9BbXVTMTVNYTFLdXpPWnhVNW5va2NjRGx1ZG1LWlo2RTNtMCIsInRpZCI6IjE1MDQwYTI0LWRhOWEtNGZhZi04NmU5LThhZTg1MmEyZTZmOCIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jMzA2OTY5Njg3MkBxcS5jb20iLCJ1dGkiOiJQc2RHVkFIOHBVZXRsM2hiX201NEFRIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.aCNx2LypFJr2wJGYgsyzr12Tj2J2R0o1exnTlhmN1ni9ZvBrD3_UyqSQ9Ny4LX64aAjcuDCUWBKA5vCLGu2ZCDFPI0GzuG5wGyglu_KghXb_v8OIAyWMWTfh8VTnc4K_yh9sSWyjK6qhRpyf2mY9-6XmyfndhkHs9nFLCM9s3D0HyLQAsxCCJ1JOXjq1Ig_trwbej2KPDrE3kwjPEFm8iNRCaE9JFfvegTZb0lpHuQunYjC4sBMyImA6eKD2n0shkf9OFBa7h2TLqjjKSzof3VQzsVw37OVtJs3rCznvJ_mzdTbG1WTdNvYY4_bCLP8lKVyRMqUm__8y8OHrAW6dAA',
            },
          })
          .then((response) => {
            this.tableData = response.data.tables[0].rows.map((row) => {
              const data = {};
              row.forEach((value, index) => {
                const columnName = this.tableColumns[index].name;
                if (columnName !== 'ParameterXml' && columnName !== 'EventData' && columnName !== 'RenderedDescription') {
                  data[columnName] = value;
                }
              });
              return data;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      formatDateToISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
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
  
  .table-row {
    margin-bottom: 10px; /* 调整行之间的下边距 */
  }
  
  </style>
  