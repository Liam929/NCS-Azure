export const networkData = {
    nodes: [
      { id: "attacker", type: "machine", icon: "icon1" },
      { id: "victim1", type: "machine", icon: "icon2" },
      { id: "victim2", type: "machine", icon: "icon3" },
    ],
    links: [
      { source: "attacker", target: "victim1", label: "Initial Breach" },
      { source: "attacker", target: "victim2", label: "Lateral Movement" },
    ],
  };
    
  export const subPageData = {
    nodes: [
      { id: "Step1-Initial Breach", type: "program", icon: "icon1" },
      { id: "Step2-Rapid Collection and Exfiltration", type: "program", icon: "icon2" },
      { id: "Step3-Deploy Stealth Toolkit Breach", type: "program", icon: "icon1" },
      { id: "Step4-Defense Evasion and Discovery", type: "program", icon: "icon1" },
      { id: "Step5-Persistence", type: "program", icon: "icon1" },
      { id: "Step6-Credential Access", type: "program", icon: "icon1" },
      { id: "Step7-Collection and Exfiltration", type: "program", icon: "icon1" },
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
  
  export const subSubPageData = {
    nodes: [
      { id: "3aka3.doc", type: "program", icon: "icon1" },
      { id: "explorer.exe", type: "program", icon: "icon2" },
      { id: "cmd.exe", type: "program", icon: "icon2" },
      { id: "sdclt.exe", type: "program", icon: "icon2" },
      { id: "Powershell.exe", type: "program", icon: "icon2" },
      { id: "Sfc.dll", type: "file", icon: "icon2" },
      { id: ".para", type: "file", icon: "icon2" },
      { id: "conhost.exe", type: "program", icon: "icon2" },
      { id: "Anonymous Pipe", type: "file", icon: "icon2" },
    ],
    links: [
      { source: "explorer.exe", target: "3aka3.doc", label: "Fork" },
      { source: "3aka3.doc", target: "Sfc.dll", label: "Loaded" },
      { source: "3aka3.doc", target: ".para", label: "Create" },
      { source: "3aka3.doc", target: "conhost.exe", label: "Invoke" },
      { source: "3aka3.doc", target: "Anonymous Pipe", label: "Connect" },
      { source: "3aka3.doc", target: "cmd.exe", label: "Invoke" },
      { source: "cmd.exe", target: "sdclt.exe", label: "Invoke" },
      { source: "cmd.exe", target: "Powershell.exe", label: "Invoke" },
    ],
  };