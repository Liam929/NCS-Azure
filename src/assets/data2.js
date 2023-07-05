export const networkData = {
  nodes: [
    { id: "192.168.0.4", IpAddress:"192.168.0.4",type: "machine", icon: "icon1" },
    { id: "10.0.1.4", IpAddress:"10.0.1.4", type: "machine", icon: "icon2" },
    { id: "10.0.1.6", IpAddress:"10.0.1.6" ,type: "machine", icon: "icon3" },
  ],
  links: [
    { source: "192.168.0.4", target: "10.0.1.4", label: "Initial Breach" },
    { source: "192.168.0.4", target: "10.0.1.6", label: "Lateral Movement" },
  ],
};
  
export const subPageData = {
  nodes: [
    { id: "Step1-Initial Breach",information:"1", type: "click", icon: "icon1" },
    { id: "Step2-Rapid Collection and Exfiltration",information:"1", type: "unclick", icon: "icon2" },
    { id: "Step3-Deploy Stealth Toolkit Breach",information:"1", type: "unclick", icon: "icon1" },
    { id: "Step4-Defense Evasion and Discovery",information:"1", type: "click", icon: "icon1" },
    { id: "Step5-Persistence",information:"1", type: "unclick", icon: "icon1" },
    { id: "Step6-Credential Access",information:"1", type: "unclick", icon: "icon1" },
    { id: "Step7-Collection and Exfiltration",information:"1", type: "unclick", icon: "icon1" },
  ],
  links: [
    { source: "Step1-Initial Breach", target: "Step2-Rapid Collection and Exfiltration", label: "" },
    { source: "Step2-Rapid Collection and Exfiltration", target: "Step3-Deploy Stealth Toolkit Breach", label: "" },
    { source: "Step3-Deploy Stealth Toolkit Breach", target: "Step4-Defense Evasion and Discovery", label: "" },
    { source: "Step4-Defense Evasion and Discovery", target: "Step5-Persistence", label: "" },
    { source: "Step5-Persistence", target: "Step6-Credential Access", label: "" },
    { source: "Step6-Credential Access", target: "Step7-Collection and Exfiltration", label: "" },
  ],
};

export const subPageData2 = {
  nodes: [
    { id: "Step8-Lateral Movement", type: "click", icon: "icon1" },
    { id: "Step9-Collection", type: "unclick", icon: "icon2" },
    { id: "Step10-Persistence Excution", type: "unclick", icon: "icon1" },
  ],
  links: [
    { source: "Step8-Lateral Movement", target: "Step9-Collection", label: "" },
    { source: "Step9-Collection", target: "Step10-Persistence Excution", label: "" },
  ],
};


export const subSubPageData = {
  nodes: [
    { id: "exe.rcs.aka3.doc",FileInformation:"1", type: "program", icon: "icon1" },
    { id: "splunkd.exe_4592",FileInformation:"1", type: "file", icon: "icon2" },
    { id: "powershell.exe_6872",FileInformation:"1", type: "file", icon: "icon2" },
    { id: "Sysmon64.exe_3492",FileInformation:"1", type: "file", icon: "icon2" },
    { id: "Conhost.exe_8204",FileInformation:"1", type: "file", icon: "icon2" },
    { id: "num.exe.rcs.aka3.doc",FileInformation:"1", type: "program", icon: "icon2" },
    { id: "exe.rcs.aka3.doc(key)",FileInformation:"1", type: "program", icon: "icon2" },
    { id: "refitnedl.enoZ:exe.rcs.aka3.doc",FileInformation:"1", type: "program", icon: "icon1" },
    { id: "C:\\Users\\azureuser\\8076_exe.rcs.aka3.doc",FileInformation:"1", type: "program", icon: "icon1" },
    { id: "C:_Users_azureuser_exe.rcs.aka3.doc",FileInformation:"1", type: "program", icon: "icon2" },
  ],
  links: [
    { source: "splunkd.exe_4592", target: "exe.rcs.aka3.doc", label: "Write" },
    { source: "Sysmon64.exe_3492", target: "exe.rcs.aka3.doc", label: "Write" },
    { source: "Conhost.exe_8204", target: "exe.rcs.aka3.doc", label: "Write" },
    { source: "powershell.exe_6872", target: "exe.rcs.aka3.doc", label: "Write" },
    { source: "Conhost.exe_8204", target: "num.exe.rcs.aka3.doc", label: "Write" },
    { source: "Conhost.exe_8204", target: "exe.rcs.aka3.doc(key)", label: "Read Key" },
    { source: "Conhost.exe_8204", target: "C:_Users_azureuser_exe.rcs.aka3.doc", label: "Read Key" },
    { source: "powershell.exe_6872", target: "exe.rcs.aka3.doc(key)", label: "Read Key" },
    { source: "powershell.exe_6872", target: "C:\\Users\\azureuser\\8076_exe.rcs.aka3.doc", label: "Fork" },
    { source: "powershell.exe_6872", target: "refitnedl.enoZ:exe.rcs.aka3.doc", label: "Write" },
    { source: "C:\\Users\\azureuser\\8076_exe.rcs.aka3.doc", target: "exe.rcs.aka3.doc(key)", label: "Read Key" },
  ],
};

export const subSubPageData2 = {
  nodes: [
    { id: "rundll32.exe", type: "program", icon: "icon1" },
    { id: "www/webdav", type: "program", icon: "icon2" },
    { id: "PSEXESVC.exe", type: "file", icon: "icon2" },
    { id: "Explorer.exe", type: "file", icon: "icon2" },
    { id: "svchost.exe", type: "file", icon: "icon2" },
    { id: "C:\\tmp\\svchost.exe", type: "program", icon: "icon2" },
    { id: "Ntdll.dll", type: "file", icon: "icon2" },
    { id: "Anoon pipe", type: "file", icon: "icon2" },
    { id: "Sdelete64.exe", type: "file", icon: "icon2" },
    { id: "Rar.exe", type: "file", icon: "icon2" },
    { id: "Winbrand.dll", type: "file", icon: "icon2" },
  ],
  links: [
    { source: "rundll32.exe", target: "www/webdav", label: "Write" },
    { source: "PSEXESVC.exe", target: "rundll32.exe", label: "Invoke" },
    { source: "Explorer.exe", target: "rundll32.exe", label: "Invoke" },
    { source: "rundll32.exe", target: "C:\\tmp\\svchost.exe", label: "Fork" },
    { source: "rundll32.exe", target: "Ntdll.dll", label: "Loaded" },
    { source: "rundll32.exe", target: "Anoon pipe", label: "Create" },
    { source: "rundll32.exe", target: "Sdelete64.exe", label: "Write" },
    { source: "rundll32.exe", target: "Rar.exe", label: "Write" },
    { source: "C:\\tmp\\svchost.exe", target: "Winbrand.dll", label: "Loaded" },
    { source: "C:\\tmp\\svchost.exe", target: "Explorer.exe", label: "Fork" },
    { source: "C:\\tmp\\svchost.exe", target: "svchost.exe", label: "Write" },
  ],
};

export const subSubPageData3 = {
  nodes: [
    { id: "cmd.exe_1640", type: "file", icon: "icon1" },
    { id: "svchost.exe", type: "program", icon: "icon2" },
    { id: "cmd.exe", type: "file", icon: "icon2" },
    { id: "System32", type: "file", icon: "icon2" },
    { id: "sysmain.sdb", type: "file", icon: "icon2" },
    { id: "SortDefault.nls", type: "file", icon: "icon2" },
    { id: "Sensitive data.txt", type: "program", icon: "icon2" },
    { id: "SysinternalsSuite.zip", type: "program", icon: "icon2" },
    { id: "azureuser", type: "file", icon: "icon2" },
    { id: "C:\\svchost.exe_5274", type: "program", icon: "icon2" },
    { id: "Users", type: "file", icon: "icon2" },
    { id: "None", type: "file", icon: "icon2" },
    { id: "IPC$", type: "file", icon: "icon2" },
    { id: "ntmarta.dll", type: "file", icon: "icon2" },
    { id: "rdbss.sys", type: "file", icon: "icon2" },
  ],
  links: [
    { source: "cmd.exe_1640", target: "svchost.exe", label: "Write" },
    { source: "cmd.exe_1640", target: "cmd.exe", label: "Write" },
    { source: "cmd.exe_1640", target: "System32", label: "Write" },
    { source: "cmd.exe_1640", target: "sysmain.sdb", label: "Write" },
    { source: "cmd.exe_1640", target: "SortDefault.nls", label: "Write" },
    { source: "cmd.exe_1640", target: "Sensitive data.txt", label: "Write" },
    { source: "cmd.exe_1640", target: "SysinternalsSuite.zip", label: "Write" },
    { source: "cmd.exe_1640", target: "azureuser", label: "Write" },
    { source: "cmd.exe_1640", target: "C:\\svchost.exe_5274", label: "Fork" },
    { source: "cmd.exe_1640", target: "Users", label: "Write" },
    { source: "cmd.exe_1640", target: "None", label: "Write" },
    { source: "cmd.exe_1640", target: "IPC$", label: "Write" },
    { source: "cmd.exe_1640", target: "ntmarta.dll", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "None", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "Users", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "azureuser", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "Sensitive data.txt", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "rdbss.sys", label: "Access" },
  ],
};

// export const networkData = {
//   nodes: [
//     { id: "attacker", type: "machine", icon: "icon1" },
//     { id: "victim1", type: "machine", icon: "icon2", subPage: null },
//     { id: "victim2", type: "machine", icon: "icon3" },
//   ],
//   links: [
//     { source: "attacker", target: "victim1", label: "attack1" },
//     { source: "victim1", target: "victim2", label: "attack2" },
//   ],
// };
  
// export const subPageData = {
//   nodes: [
//     { id: "program1", type: "program", icon: "icon1", subPage: null },
//     { id: "file1", type: "file", icon: "icon2" },
//     { id: "subProgram1", type: "program", parentId: "victim1", icon: "icon3", subPage: null },
//   ],
//   links: [
//     { source: "program1", target: "file1", label: "call1" },
//     { source: "subProgram1", target: "file1", label: "call2" },
//   ],
// };

// export const subSubPageData = {
//   nodes: [
//     { id: "subSubProgram1", type: "program", icon: "icon1" },
//     { id: "subSubFile1", type: "file", icon: "icon2" },
//     { id: "subSubFile2", type: "file", icon: "icon2" },
//   ],
//   links: [
//     { source: "subSubProgram1", target: "subSubFile1", label: "call1" },
//     { source: "subSubProgram1", target: "subSubFile2", label: "call2" }
//   ],
// };


