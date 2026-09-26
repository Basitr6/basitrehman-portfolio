const projectDetails = {
  python: {
    number: '01', title: 'Smart File Organizer', eyebrow: 'Python automation // desktop utility',
    summary: 'A practical Windows desktop tool that turns a messy downloads folder into a predictable, searchable workspace.',
    problem: 'Manual file sorting is repetitive, error-prone and easy to postpone. The tool needed to organize files without risking duplicates or accidental loss.',
    solution: 'Built a Tkinter interface around extension-based rules, preview mode, duplicate protection, activity logs and undo/restore workflows.',
    result: 'A safer local automation workflow with tests, clear feedback and Windows packaging for everyday use.',
    stack: ['Python', 'Tkinter', 'File handling', 'Unit testing'],
    steps: ['Scan and preview', 'Classify by extension', 'Move with duplicate protection', 'Log and restore changes'],
    repo: 'https://github.com/Basitr6/smart-file-organizer',
    visual: 'organizer'
  },
  hardware: {
    number: '02', title: 'RISC-V Processor Simulator', eyebrow: 'Digital systems // hardware visualization',
    summary: 'A learning-focused RISC-V environment connecting a custom Verilog core to Python tooling and a browser dashboard.',
    problem: 'Processor state can be difficult to understand when it is hidden inside waveforms and raw simulator output.',
    solution: 'Created a Python assembler, Verilog RISC-V core and interactive Flask dashboard for registers, memory and CPU state.',
    result: 'A visual bridge between instruction execution, hardware design and software debugging.',
    stack: ['Verilog', 'RISC-V', 'Python', 'Flask'],
    steps: ['Assemble instruction', 'Execute in the core', 'Track registers and memory', 'Inspect state in the dashboard'],
    repo: 'https://github.com/Basitr6/RISC--V-Simulator-',
    visual: 'processor'
  },
  security: {
    number: '03', title: 'NetSentinel', eyebrow: 'Network security // telemetry monitor',
    summary: 'A desktop security monitor for practical packet inspection, rogue-device visibility and lightweight audit reporting.',
    problem: 'Small networks need useful security signals without the complexity of a large enterprise monitoring platform.',
    solution: 'Combined Scapy packet inspection with CustomTkinter views, Layer 4 port checks, ARP spoof detection, vendor caching and CSV reports.',
    result: 'Actionable local network telemetry that helps users identify unexpected devices and suspicious activity.',
    stack: ['Python', 'Scapy', 'CustomTkinter', 'CSV reporting'],
    steps: ['Capture traffic', 'Inspect ports and ARP behavior', 'Flag rogue devices', 'Export an audit report'],
    repo: 'https://github.com/Basitr6/NetSentinel',
    visual: 'security'
  },
  networking: {
    number: '04', title: 'Campus Network Architecture', eyebrow: 'Cisco networking // infrastructure design',
    summary: 'A secure three-tier campus design for data, voice and IoT services with clear segmentation and routing decisions.',
    problem: 'A campus network must separate traffic, remain resilient and support different service requirements without becoming difficult to operate.',
    solution: 'Designed VLANs, VLSM addressing, ROAS, multi-area OSPF, ACL firewalls and QoS for VoIP across a Cisco Packet Tracer topology.',
    result: 'A scalable architecture that demonstrates practical enterprise networking fundamentals from addressing to policy enforcement.',
    stack: ['Cisco', 'Packet Tracer', 'VLANs', 'OSPF / ACL / QoS'],
    steps: ['Plan addressing and VLANs', 'Route between segments', 'Apply security policy', 'Prioritize voice and validate paths'],
    repo: 'https://github.com/Basitr6/Campus-Network-Architecture',
    visual: 'network'
  }
};

const detailRoot = document.querySelector('#project-detail');
const id = new URLSearchParams(window.location.search).get('id') || 'python';
const project = projectDetails[id] || projectDetails.python;

detailRoot.innerHTML = `
  <section class="project-detail-hero">
    <div class="project-detail-copy">
      <a class="back-project-link" href="index.html#work" aria-label="Back to all projects" title="Back to all projects"><span class="back-project-icon" aria-hidden="true">←</span></a>
      <p class="eyebrow">${project.eyebrow}</p>
      <span class="project-detail-number">${project.number}</span>
      <h1>${project.title}</h1>
      <p class="project-detail-summary">${project.summary}</p>
      <div class="project-detail-actions"><a class="button button-dark" href="${project.repo}" target="_blank" rel="noreferrer">View repository <span>↗</span></a></div>
    </div>
    <div class="project-detail-visual ${project.visual}" aria-label="${project.title} visual"></div>
  </section>
  <section class="project-detail-content">
    <div class="detail-story"><p class="eyebrow">Case study // ${project.number}</p><h2>Built to make<br /><em>systems clearer.</em></h2><div class="story-block"><span>01 // Problem</span><p>${project.problem}</p></div><div class="story-block"><span>02 // Architecture</span><p>${project.solution}</p></div><div class="story-block"><span>03 // Implementation</span><p>${project.steps.join(' · ')}</p></div><div class="story-block"><span>04 // Result</span><p>${project.result}</p></div></div>
    <aside class="detail-sidebar"><div><span class="sidebar-label">Technology</span><div class="stack-list">${project.stack.map((item) => `<span>${item}</span>`).join('')}</div></div><div><span class="sidebar-label">Workflow</span><ol>${project.steps.map((item) => `<li>${item}</li>`).join('')}</ol></div></aside>
  </section>
  <section class="project-cta"><p class="eyebrow">Have a similar challenge?</p><h2>Let’s start a<br /><em>conversation.</em></h2><p>Tell me what you are building, what is blocked and where you want the system to go.</p><a class="button button-light" href="index.html#contact">Start a conversation <span>↗</span></a></section>
`;

document.title = `${project.title} — Basit Rehman`;
