<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, rowIndex) in rowData" :key="rowIndex">
            <tr>
              <td v-for="(item, itemIndex) in row" :key="itemIndex" :class="{ 'highlight-cell': isAttackMatched(columns[itemIndex], item) }">
                {{ item }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        columns: [
          'Reconnaissance',
          'Resource Development',
          'Initial Access',
          'Execution',
          'Persistence',
          'Privilege Escalation',
          'Defense Evasion',
          'Credential Access',
          'Discovery',
          'Lateral Movement',
          'Collection',
          'Command and Control',
          'Exfiltration',
          'Impact'
        ],
        rowData: [
          ['Active Scanning', 'Acquire Access', 'Drive-by Compromise', 'Cloud Administration Command','Account Manipulation','Abuse Elevation Control Mechanism','Abuse Elevation Control Mechanism','Adversary-in-the-Middle','Account Discovery','Exploitation of Remote Services','Adversary-in-the-Middle','Application Layer Protocol','Automated Exfiltration','Account Access Removal'],
          ['Gather Victim Host Information', 'Acquire Infrastructure', 'Exploit Public-Facing Application', 'Command and Scripting Interpreter', 'BITS Jobs','Access Token Manipulation','Access Token Manipulation','Brute Force','Application Window Discovery','Internal Spearphishing','Archive Collected Data','Communication Through Removable Media','Data Transfer Size Limits','Data Destruction'],
          ['Gather Victim Identity Information', 'Compromise Accounts', 'External Remote Services', 'Container Administration Command', 'Boot or Logon Autostart Execution','Boot or Logon Autostart Execution','BITS Jobs','Credentials from Password Stores','Browser Information Discovery','Lateral Tool Transfer','Audio Capture','Data Encoding','Exfiltration Over Alternative Protocol','Data Encrypted for Impact'],
          ['Gather Victim Network Information', 'Compromise Infrastructure', 'Hardware Additions', 'Deploy Container', 'Boot or Logon Initialization Scripts','Boot or Logon Initialization Scripts','Build Image on Host','Exploitation for Credential Access','Cloud Infrastructure Discovery','Remote Service Session Hijacking','Automated Collection','Data Obfuscation','Exfiltration Over C2 Channel','Data Manipulation'],
          ['Gather Victim Org Information', 'Develop Capabilities', 'Phishing', 'Exploitation for Client Execution','Browser Extensions','Create or Modify System Process','Debugger Evasion','Forced Authentication','Cloud Service Dashboard','Remote Services','Browser Session Hijacking','Dynamic Resolution','Exfiltration Over Other Network Medium','Defacement'],
          ['Phishing for Information', 'Establish Accounts', 'Replication Through Removable Media', 'Inter-Process Communication','Compromise Client Software Binary','Domain Policy Modification','Deobfuscate/Decode Files or Information','Forge Web Credentials','Cloud Service Discovery','Replication Through Removable Media','Clipboard Data','Encrypted Channel','Exfiltration Over Physical Medium','Disk Wipe'],
          ['Search Closed Sources', 'Obtain Capabilities', 'Supply Chain Compromise', 'Native API','Create Account','Escape to Host','Deploy Container','Input Capture','Cloud Storage Object Discovery','Software Deployment Tools','Data from Cloud Storage','Fallback Channels','Exfiltration Over Web Service','Endpoint Denial of Service'],
          ['Search Open Technical Databases', 'Stage Capabilities', 'Trusted Relationship', 'Scheduled Task/Job','Create or Modify System Process','Event Triggered Execution','Direct Volume Access','Modify Authentication Process','Container and Resource Discovery','Taint Shared Content','Data from Configuration Repository','Ingress Tool Transfer','Scheduled Transfer','Firmware Corruption'],
          ['Search Open Websites/Domains', '', 'Valid Accounts', 'Serverless Execution','Event Triggered Execution','Exploitation for Privilege Escalation','Domain Policy Modification','Multi-Factor Authentication Interception','Debugger Evasion','Use Alternate Authentication Material','Data from Information Repositories','Multi-Stage Channels','Transfer Data to Cloud Account','Inhibit System Recovery'],
          ['Search Victim-Owned Websites','', '', 'Shared Modules','External Remote Services','Hijack Execution Flow','Execution Guardrails','Multi-Factor Authentication Request Generation','Device Driver Discovery','','Data from Local System','Non-Application Layer Protocol','','Network Denial of Service'],
          ['', '', '', 'Software Deployment Tools','Hijack Excution Flow','Process Injection','Exploitation for Defense Evation','Network Snidding','Domain Trust Discovery','','Data From Network Shared Drive','Non-Standard Port','','Resource Hijacking'/* 其他项 */],
        ['', '', '', 'System Services','Implant Internal Image','Scheduled Task/Job','File and Directory Permissions Modification','OS Credential Dumping','File and Directory Discovery','','Data From Removable Media','Protocol Tunneling','','Service Stop'/* 其他项 */],
        ['', '', '', 'User Excution','Modify Authentication Process','Valid Accounts','Hide Artifacts','Steal Application Access Token','Group Policy Discovery','','Data Staged','Proxy','','System Shutdown/Reboot'/* 其他项 */],
        ['', '', '','Windows Management Instrumentation','Office Application Startup','Hijack Excution Flow','Steal or Forge Authentication Certificates','Network Service Discovery','','','Email Collection','Remote Access Software'/* 其他项 */],
        ['', '', '','','Pre-OS Boot','Impair Defenses','Steal or Forge Kerberos Tickets','Network Share Discovery','','','Input Capture','Traffic Signaling'/* 其他项 */], 
        ['', '', '','','Scheduled Task/Job','Indicator Removal','Steal Web Session Cookie','Network Sniffing','','','Screen Capture','Web Service'/* 其他项 */], 
        ['', '', '','','Server Software','Indirect Command Excution','Unsecured Credentials','Password Policy Discovery','','','Video Capture'/* 其他项 */], 
        ['', '', '','','','Masquerading','','Peripheral Device Discovery'/* 其他项 */], 
        ['', '', '','','','Modify Authentication Process','','Permission Groups Discovery'/* 其他项 */], 
        ['', '', '','','','Modify Cloud Infrastructure','','Process Discovery'/* 其他项 */], 
        ['', '', '','','','Modify Registry','','Query Discovery'/* 其他项 */], 
        ['', '', '','','','Modify System Image','','Remote System Discovery'/* 其他项 */], 
        ['', '', '','','','Network Boundary Bridging','','Software Discovery'/* 其他项 */], 
        ['', '', '','','','Obfuscated Files or Information','','System Information Discovery'/* 其他项 */], 
        ['', '', '','','','Plist File Modification','','System Location Discovery'/* 其他项 */], 
        ['', '', '','','','Pre-OS Boot','','System Network Configuration Discovery'/* 其他项 */], 
        ['', '', '','','','Process Injection','','System Network Connections Discovery'/* 其他项 */], 
        ['', '', '','','','Reflective Code Loading','','System Owner/User Discovery'/* 其他项 */], 
        ['', '', '','','','Rogue Domain Controller','','System Service Discovery'/* 其他项 */], 
        ['', '', '','','','Rootkit','','System Time Discovery'/* 其他项 */], 
        ['', '', '','','','Subvert Trust Controls','','Virtualization/Sandbox Evasion'/* 其他项 */], 
        ['', '', '','','','System Binary Proxy Excution'/* 其他项 */], 
        ['', '', '','','','System Script Proxy Excution'/* 其他项 */], 
        ['', '', '','','','Template Injection'/* 其他项 */], 
        ['', '', '','','','Traffic Signaling'/* 其他项 */], 
        ['', '', '','','','Trsuted Developer Utilities Proxy Excution'/* 其他项 */], 
        ['', '', '','','','Unused/Unsupported Cloud Regions'/* 其他项 */], 
        ['', '', '','','','Use Alternate Authentication Material'/* 其他项 */], 
        ['', '', '','','','Valid Accounts'/* 其他项 */], 
        ['', '', '','','','Virtualization/Sandbox Evasion'/* 其他项 */], 
        ['', '', '','','','Weaken Encryption'/* 其他项 */], 
        ['', '', '','','','XSL Script Processing'/* 其他项 */], 
        ],
      };
    },
    methods: {
      isAttackMatched(column, value) {
        // 检查特定条件是否匹配，并决定是否标红单元格
        // 这里使用示例逻辑来检查 'Reconnaissance' 列是否为 'Gather Victim Host Information'
        if (column === 'Reconnaissance' && value === 'Gather Victim Host Information') {
          return true;
        } else if (column === 'Resource Development' && value === 'Compromise Accounts') {
          return true;
        } else if (column === 'Initial Access' && value === 'Phishing') {
          return true;
        } else if (column === 'Execution' && value === 'Deploy Container') {
          return true;
        } else if (column === 'Persistence' && value === 'Create Account') {
          return true;
        }
        return false;
      },
    },
  };
  </script>
  
  <style>
  .highlight-cell {
    background-color: red;
    color: white;
  }
  .table-container {
  margin-left: -150px; /* 设置水平外边距为自动，实现居中对齐 */
  }

  </style>
  