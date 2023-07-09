export const additionalData = {
  title: 'APT29 Scenario',
  Summary: 'APT29 is a Russia-based cyber espionage organization that focuses on stealing sensitive information from government, military, and business organizations. They employ advanced attack techniques and maintain persistent access to target systems.',
  Origins: 'APT29 activities can be traced back to around 2008.',
  Targets: 'APT29 primarily focuses on stealing sensitive information related to national security, politics, military, and business. Their targets include government agencies, military organizations, energy companies, technology firms, research institutions, and more. '
  
};

export const networkData = {
  nodes: [
    { id: "192.168.0.4", IpAddress:"192.168.0.4",type: "attack-machine", name:"Team Server",Tools:"Caldera",icon: "icon1" },
    { id: "10.0.1.4", IpAddress:"10.0.1.4", type: "machine", name:"Scranton",MachineType:"Windows10 with Office365", icon: "icon2" },
    { id: "10.0.1.6", IpAddress:"10.0.1.6" ,type: "machine", name:"Nushua",MachineType:"Windows10 Pro", icon: "icon3" },
  ],
  links: [
    { source: "192.168.0.4", target: "10.0.1.4", label: "Initial Breach"},
    { source: "10.0.1.4", target: "10.0.1.6", label: "Lateral Movement" },
  ],
};
  
export const subPageData = {
  nodes: [
    { id: "Step1-Initial Breach",information:"The scenario begins with an initial breach, where a legitimate user clicks (T1204) an executable payload (3aka3.doc) masquerading as a benign word document (T1036). Once executed, the payload creates a C2 connection over port 1234 (T1065) using the RC4 cryptographic cipher", type: "step-click", icon: "icon1" },
    { id: "Step2-Rapid Collection and Exfiltration",information:"The attacker runs a one-liner command to search for filesystem for document and media files (T1083, T1119), collecting (T1005) and compressing (T1002) content into a single file (T1074)", type: "step-unclick", icon: "icon2" },
    { id: "Step3-Deploy Stealth Toolkit Breach",information:"The attacker now uploads a new payload (T1105) to the victim. The payload is a legitimately formed image file with a concealed PowerShell script (T1027)", type: "step-unclick", icon: "icon1" },
    { id: "Step4-Defense Evasion and Discovery",information:"The attacker renames the malicious software as svchost.exe (T1036) and then compresses (T1140) and sends the sensitive information to an external destination.", type: "step-click", icon: "icon1" },
    { id: "Step5-Persistence",information:"The attacker establishes two distinct means of persistent access to the victim by creating a new service (T1050) and creating a malicious payload in the Windows Startup folder (T1060)", type: "step-unclick", icon: "icon1" },
    { id: "Step6-Credential Access",information:"The attacker accesses credentials stored in a local web browser (T1081, T1003) using a tool renamed to masquerade as a legitimate utility (T1036)", type: "step-unclick", icon: "icon1" },
    { id: "Step7-Collection and Exfiltration",information:"The attacker collects screenshots (T1113), data from the users clipboard (T1115), and keystrokes (T1056)", type: "step-unclick", icon: "icon1" },
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
    { id: "Step8-Lateral Movement",information:"The attacker passes malicious payloads through the SMB protocol (T1021)to another host, and then remotely executes the malicious payload, calls SCM, and masquerade it as a system service(T1036)" ,type: "step-click", icon: "icon1" },
    { id: "Step9-Collection",information:"The attacker uploads additional utilities to the secondary victim (T1105)", type: "step-unclick", icon: "icon2" },
    { id: "Step10-Persistence Excution",information:"The original victim is rebooted and the legitimate user logs in, emulating ordinary usage and a passage of time. This activity triggers the previously established persistence mechanisms, namely the execution of the new service (T1035) and payload in the Windows Startup folder (T1060)", type: "step-unclick", icon: "icon1" },
  ],
  links: [
    { source: "Step8-Lateral Movement", target: "Step9-Collection", label: "" },
    { source: "Step9-Collection", target: "Step10-Persistence Excution", label: "" },
  ],
};


export const subSubPageData = {
  nodes: [
    { id: "exe.rcs.aka3.doc(file)",FileInformation:"1", type: "payload", icon: "icon1" },
    { id: "exe.rcs.aka3.doc",FileInformation:"1", type: "abnormal-program", icon: "icon1" },
    { id: "powershell.exe_6872",FileInformation:"1", type: "normal-program", icon: "icon2" },
    { id: "powershell.exe_7934",FileInformation:"1", type: "normal-program", icon: "icon2" },
    { id: "powershell.exe_2501",FileInformation:"1", type: "normal-program", icon: "icon2" },
    { id: "Conhost.exe_8204",FileInformation:"1", type: "normal-program", icon: "icon2" },
    { id: "num.exe.rcs.aka3.doc",FileInformation:"1", type: "abnormal-file", icon: "icon2" },
    { id: "exe.rcs.aka3.doc(key)",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "refitnedl.enoZ:exe.rcs.aka3.doc",FileInformation:"1", type: "abnormal-file", icon: "icon1" },
    { id: "C:_Users_azureuser_exe.rcs.aka3.doc",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "Winword.exe",FileInformation:"1", type: "normal-program", icon: "icon2" },
  ],
  links: [
    { source: "exe.rcs.aka3.doc", target: "powershell.exe_6872", label: "Fork" },
    { source: "Conhost.exe_8204", target: "num.exe.rcs.aka3.doc", label: "Write" },
    { source: "Conhost.exe_8204", target: "exe.rcs.aka3.doc(key)", label: "Read Key" },
    { source: "Conhost.exe_8204", target: "C:_Users_azureuser_exe.rcs.aka3.doc", label: "Read Key" },
    { source: "powershell.exe_6872", target: "exe.rcs.aka3.doc(key)", label: "Read Key" },
    { source: "powershell.exe_6872", target: "refitnedl.enoZ:exe.rcs.aka3.doc", label: "Write" },
    { source: "Winword.exe", target: "exe.rcs.aka3.doc", label: "Fork" },
    { source: "Winword.exe", target: "exe.rcs.aka3.doc(file)", label: "Read" },
    { source: "powershell.exe_6872", target: "powershell.exe_7934", label: "Fork" },
    { source: "powershell.exe_7934", target: "powershell.exe_2501", label: "Fork" },
  ],
};

export const subSubKnowledge = {
  nodes: [
    { id: "Winword.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },
    { id: "outlook.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "Iexplore.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "*.doc",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "wow64log.dll",FileInformation:"1", type: "kg-dll", icon: "icon2" },
    { id: "Office/mso4Ouiwin32client.dll",FileInformation:"1", type: "kg-dll", icon: "icon2" },
    { id: "Office/HTTPAPI.dll",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "*.docx",FileInformation:"1", type: "kg-program", icon: "icon1" },
  ],
  links: [
    { source: "Winword.exe", target: "outlook.exe", label: "Fork" },
    { source: "Winword.exe", target: "Iexplore.exe", label: "Fork" },
    { source: "Winword.exe", target: "*.doc", label: "Read/Write" },
    { source: "Winword.exe", target: "wow64log.dll", label: "Load" },
    { source: "Winword.exe", target: "Office/mso4Ouiwin32client.dll", label: "Load" },
    { source: "Winword.exe", target: "Office/HTTPAPI.dll", label: "Load" },
    { source: "Winword.exe", target: "*.docx", label: "Read/Write" },
  ],
};

export const subSubKnowledge2 = {
  nodes: [
    { id: "svchost.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },
    { id: "services.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "C:\\Windows\\System32\\svchost.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "SCMConfig",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "rpcss.dll",FileInformation:"1", type: "kg-dll", icon: "icon2" },
    { id: "wuauserv",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "Session Manager",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "dllhost.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },
  ],
  links: [
    { source: "services.exe", target: "svchost.exe", label: "Fork" },
    { source: "svchost.exe", target: "C:\\Windows\\System32\\svchost.exe", label: "Path" },
    { source: "svchost.exe", target: "SCMConfig", label: "Read Key" },
    { source: "svchost.exe", target: "rpcss.dll", label: "Load" },
    { source: "svchost.exe", target: "wuauserv", label: "Host" },
    { source: "svchost.exe", target: "Session Manager", label: "Read Key" },
    { source: "svchost.exe", target: "dllhost.exe", label: "Fork" },
  ],
};

export const subSubKnowledge3 = {
  nodes: [
    { id: "svchost.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },
    { id: "services.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "C:\\Windows\\System32\\svchost.exe",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "SCMConfig",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "rpcss.dll",FileInformation:"1", type: "kg-dll", icon: "icon2" },
    { id: "wuauserv",FileInformation:"1", type: "kg-program", icon: "icon2" },
    { id: "Session Manager",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "dllhost.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },

    { id: "rundll32.exe",FileInformation:"1", type: "kg-program", icon: "icon1" },
    { id: "Safer\\CodeIdentifiers",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "combase.dll",FileInformation:"1", type: "kg-dll", icon: "icon2" },
    { id: "Control Panel\\Desktop",FileInformation:"1", type: "reg", icon: "icon2" },
    { id: "rundll32.exe.mui",FileInformation:"1", type: "kg-file", icon: "icon1" },
  ],
  links: [
    { source: "services.exe", target: "svchost.exe", label: "Fork" },
    { source: "svchost.exe", target: "C:\\Windows\\System32\\svchost.exe", label: "Path" },
    { source: "svchost.exe", target: "SCMConfig", label: "Read Key" },
    { source: "svchost.exe", target: "rpcss.dll", label: "Load" },
    { source: "svchost.exe", target: "wuauserv", label: "Host" },
    { source: "svchost.exe", target: "Session Manager", label: "Read Key" },
    { source: "svchost.exe", target: "dllhost.exe", label: "Fork" },

    { source: "rundll32.exe", target: "Safer\\CodeIdentifiers", label: "Read Key" },
    { source: "rundll32.exe", target: "combase.dll", label: "Load" },
    { source: "rundll32.exe", target: "Control Panel\\Desktop", label: "Read Key" },
    { source: "rundll32.exe", target: "rundll32.exe.mui", label: "Open File" },
  ],
};

export const subSubPageData2 = {
  nodes: [
    { id: "rundll32.exe", type: "abnormal-program", icon: "icon1" },
    { id: "www/webdav", type: "web",NetworkLog:"{stream:http,system:simplerockbuild.simplerock.lan,proc:zeek,ts:1588206741.916375,uid:CPKuRr3fL4F8tgqXQ1,id_orig_h:10.0.1.4,id_orig_p:60760,id_resp_h:192.168.0.4,id_resp_p:80,trans_depth:15,method:PUT,host:192.168.0.4,uri:/webdav/Sensitive data.rar}", icon: "icon2" },
    { id: "PSEXESVC.exe", type: "normal-program",Alert:"ET POLICY SMB2 NT Create AndX Request For an Executable File In a Temp Directory,Classification: A Network Trojan was detected,Priority: 1,TCP,10.0.1.4:60803 -> 10.0.1.6:445", icon: "icon2" },
    { id: "Explorer.exe", type: "normal-program", icon: "icon2" },
    { id: "svchost.exe", type: "normal-program", icon: "icon2" },
    { id: "C:\\tmp\\svchost.exe", type: "abnormal-program", icon: "icon2" },
    { id: "Ntdll.dll", type: "normal-dll", icon: "icon2" },
    { id: "Anoon pipe", type: "normal-file", icon: "icon2" },
    { id: "Sdelete64.exe", type: "normal-program", icon: "icon2" },
    { id: "Rar.exe", type: "normal-program", icon: "icon2" },
    { id: "Winbrand.dll", type: "normal-dll", icon: "icon2" },
    { id: "Sensitive Data.rar", type: "abnormal-file", icon: "icon2" },
  ],
  links: [
    { source: "rundll32.exe", target: "www/webdav", label: "Connect", information:"Network Log:id_orig_h:10.0.1.6,id_orig_p:60760,id_resp_h:192.168.0.4,id_resp_p:80,trans_depth:15,method:PUT,host:192.168.0.4,uri:/webdav/Sensitive data.rar}" },
    { source: "PSEXESVC.exe", target: "rundll32.exe", label: "Invoke", information:"IDS Alert:(ET POLICY SMB2 NT Create AndX Request For an Executable File In a Temp Directory,Classification: A Network Trojan was detected,Priority: 1,TCP,10.0.1.4:60803 -> 10.0.1.6:445) (ET RPC DCERPC SVCCTL - Remote Service Control Manager Access,Classification: Attempted User Privilege Gain,Priority: 1,TCP,10.0.1.4:60828 -> 10.0.1.6:135) " },
    { source: "Explorer.exe", target: "rundll32.exe", label: "Invoke" },
    { source: "rundll32.exe", target: "C:\\tmp\\svchost.exe", label: "Fork",information:"System Log:Process Name:rundll32.exe PID:2293 Operation:Fork Target:C:\\tmp\\svchost.exe" },
    { source: "rundll32.exe", target: "Ntdll.dll", label: "Loaded" },
    { source: "rundll32.exe", target: "Anoon pipe", label: "Create" },
    { source: "rundll32.exe", target: "Sdelete64.exe", label: "Write" },
    { source: "rundll32.exe", target: "Rar.exe", label: "Write" },
    { source: "rundll32.exe", target: "Sensitive Data.rar", label: "Write" },
    { source: "C:\\tmp\\svchost.exe", target: "Winbrand.dll", label: "Loaded" },
    { source: "C:\\tmp\\svchost.exe", target: "Explorer.exe", label: "Fork" },
    { source: "C:\\tmp\\svchost.exe", target: "svchost.exe", label: "Write" },
  ],
};

export const subSubPageData3 = {
  nodes: [
    { id: "cmd.exe_1640", type: "normal-program", icon: "icon1" },
    { id: "svchost.exe", type: "abnormal-program", icon: "icon2" },
    { id: "cmd.exe", type: "normal-program", icon: "icon2" },
    { id: "System32", type: "normal-program", icon: "icon2" },
    { id: "sysmain.sdb", type: "normal-file", icon: "icon2" },
    { id: "SortDefault.nls", type: "normal-file", icon: "icon2" },
    { id: "Sensitive data.txt", type: "abnormal-txt", icon: "icon2" },
    { id: "SysinternalsSuite.zip", type: "abnormal-zip", icon: "icon2" },
    { id: "azureuser", type: "normal-file", icon: "icon2" },
    { id: "C:\\svchost.exe_5274", type: "abnormal-program", icon: "icon2" },
    { id: "Users", type: "normal-file", icon: "icon2" },
    { id: "None", type: "normal-file", icon: "icon2" },
    { id: "IPC$", type: "normal-file", icon: "icon2" },
    { id: "ntmarta.dll", type: "normal-dll", icon: "icon2" },
    { id: "rdbss.sys", type: "normal-file", icon: "icon2" },
    { id: "WebDav 192.168.0.4", type: "web", icon: "icon2" },
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
    { source: "cmd.exe_1640", target: "C:\\svchost.exe_5274", label: "Fork",information:"System Log:Process Name:cmd.exe PID:1640 Operation:Fork Target:svchost.exe" },
    { source: "cmd.exe_1640", target: "Users", label: "Write" },
    { source: "cmd.exe_1640", target: "None", label: "Write" },
    { source: "cmd.exe_1640", target: "IPC$", label: "Write" },
    { source: "cmd.exe_1640", target: "ntmarta.dll", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "None", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "Users", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "azureuser", label: "Write" },
    { source: "C:\\svchost.exe_5274", target: "Sensitive data.txt", label: "Write"},
    { source: "C:\\svchost.exe_5274", target: "rdbss.sys", label: "Access" },
    { source: "cmd.exe_1640", target: "WebDav 192.168.0.4", label: "Connect",information:"Network Log:id_orig_h:10.0.1.4,id_orig_p:60760,id_resp_h:192.168.0.4,id_resp_p:80,trans_depth:15,method:PUT,host:192.168.0.4,uri:/webdav/Sensitive data.txt}"  },
  ],
};


