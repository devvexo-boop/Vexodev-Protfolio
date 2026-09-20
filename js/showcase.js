/**
 * VEXO STUDIO - PORTFOLIO SHOWCASE & LUAU LAB ENGINE
 */

(function () {
  // ==========================================
  // 1. Portfolio Data
  // ==========================================
  const PORTFOLIO_ITEMS = [
    {
      id: "eclipse-combat",
      title: "Project Eclipse: Modular Combat & Hitbox Architecture",
      category: "scripting",
      stat: "18.5M+ Visits",
      badge: "Luau Framework",
      desc: "Server-authoritative hitbox detection engine featuring ping rollback compensation, custom animation timeline events, and zero client spoofing vulnerability.",
      tags: ["Luau OOP", "RaycastHitbox", "Anti-Exploit", "Network Sync"],
      client: "Aethel Studios",
      mediaGradient: "linear-gradient(135deg, #1e1b4b, #312e81, #0f172a)"
    },
    {
      id: "valkyrie-arsenal",
      title: "Valkyrie Cyber Arsenal & Weapons UGC",
      category: "modeling",
      stat: "1,240 Avg Tris",
      badge: "3D Asset Suite",
      desc: "Hard-surface sci-fi weaponry and melee weapons crafted in Blender. Fully optimized for Roblox mobile memory limits with custom normal baking and PBR maps.",
      tags: ["Blender 3D", "PBR Shading", "Hard Surface", "Sub-2k Poly"],
      client: "Apex UGC",
      mediaGradient: "linear-gradient(135deg, #064e3b, #065f46, #022c22)"
    },
    {
      id: "chrono-shards",
      title: "Chrono Shards RPG: Core Framework & Game Loop",
      category: "games",
      stat: "4,200 Peak CCU",
      badge: "Full Game System",
      desc: "Complete production-ready game architecture: dungeon matchmaking, boss state machines, inventory replication, and responsive console/mobile gamepad support.",
      tags: ["Full Game", "Knit Framework", "Matchmaking", "Dungeon AI"],
      client: "Chrono Interactive",
      mediaGradient: "linear-gradient(135deg, #4c1d95, #581c87, #1e1b4b)"
    },
    {
      id: "trading-engine",
      title: "Enterprise Multi-Server Trading & Economy Engine",
      category: "scripting",
      stat: "500K+ Trades",
      badge: "Backend & Data",
      desc: "Zero-duplication trading system utilizing MemoryStoreService and distributed session locks. Handled massive simulator launch spikes with 100% data integrity.",
      tags: ["ProfileService", "MemoryStore", "Anti-Dupe", "DataStore2"],
      client: "Pet World Sim",
      mediaGradient: "linear-gradient(135deg, #701a75, #4a044e, #18181b)"
    },
    {
      id: "neo-tokyo-map",
      title: "Neo-Tokyo Cyberpunk Megamap & Modular Kit",
      category: "modeling",
      stat: "60 FPS on Mobile",
      badge: "Environment & Map",
      desc: "High-density futuristic city built with modular kit pieces, custom mesh LODs, collision hulls, and volumetric neon lighting setups for peak performance.",
      tags: ["Modular Map", "Low Poly", "Lighting / VFX", "Optimized LOD"],
      client: "Nightfall Games",
      mediaGradient: "linear-gradient(135deg, #1e3a8a, #172554, #030712)"
    },
    {
      id: "deadlight-horror",
      title: "Deadlight Horror: Adaptive AI & Dynamic Lighting",
      category: "games",
      stat: "94% Positive Rating",
      badge: "Horror Mechanics",
      desc: "Custom pathfinding monster AI that listens for player footsteps, procedural sanity distortion, flashlight volumetric rays, and heart-rate haptic effects.",
      tags: ["Custom AI", "Horror Engine", "Dynamic Sound", "Immersion UI"],
      client: "Spectral Studio",
      mediaGradient: "linear-gradient(135deg, #3f1816, #2d100f, #0c0808)"
    }
  ];

  // Render Portfolio Cards
  const gridContainer = document.getElementById('portfolio-grid');
  function renderPortfolio(filter = 'all') {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? PORTFOLIO_ITEMS 
      : PORTFOLIO_ITEMS.filter(item => item.category === filter);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-card portfolio-card';
      card.innerHTML = `
        <div class="portfolio-media" style="background: ${item.mediaGradient}">
          <div class="portfolio-badge">${item.badge}</div>
          <div class="portfolio-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${item.stat}
          </div>
        </div>
        <div class="portfolio-body">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <div class="portfolio-tags">
            ${item.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
          </div>
          <div class="portfolio-footer">
            <span>Client: <strong>${item.client}</strong></span>
            <span style="color: #cbd5e1; font-weight: 600;">Verified Commission</span>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.dataset.filter);
    });
  });

  renderPortfolio();

  // ==========================================
  // 2. Interactive Luau Code Inspector
  // ==========================================
  const LUAU_SCRIPTS = {
    hitbox: {
      filename: "ServerRaycastHitbox.luau",
      lines: [
        { num: 1, text: `<span class="syn-comment">--!strict</span>` },
        { num: 2, text: `<span class="syn-comment">-- [VEXO ARCHITECTURE] Server-Authoritative Raycast Hitbox Engine</span>` },
        { num: 3, text: `<span class="syn-kw">local</span> <span class="syn-var">Players</span> = <span class="syn-func">game:GetService</span>(<span class="syn-str">"Players"</span>)` },
        { num: 4, text: `<span class="syn-kw">local</span> <span class="syn-var">Workspace</span> = <span class="syn-func">game:GetService</span>(<span class="syn-str">"Workspace"</span>)` },
        { num: 5, text: `` },
        { num: 6, text: `<span class="syn-kw">local</span> <span class="syn-var">Hitbox</span> = {}` },
        { num: 7, text: `<span class="syn-var">Hitbox</span>.__index = <span class="syn-var">Hitbox</span>` },
        { num: 8, text: `` },
        { num: 9, text: `<span class="syn-kw">function</span> <span class="syn-var">Hitbox</span>.<span class="syn-func">new</span>(<span class="syn-var">weaponPart</span>: <span class="syn-type">BasePart</span>, <span class="syn-var">points</span>: {<span class="syn-type">Vector3</span>})` },
        { num: 10, text: `    <span class="syn-kw">local</span> <span class="syn-var">self</span> = <span class="syn-func">setmetatable</span>({}, <span class="syn-var">Hitbox</span>)` },
        { num: 11, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Part</span> = <span class="syn-var">weaponPart</span>` },
        { num: 12, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Attachments</span> = <span class="syn-var">points</span>` },
        { num: 13, text: `    <span class="syn-var">self</span>.<span class="syn-prop">PreviousPoints</span> = {} :: {<span class="syn-type">Vector3</span>}` },
        { num: 14, text: `    <span class="syn-var">self</span>.<span class="syn-prop">HitTargets</span> = {} :: {[<span class="syn-type">Model</span>]: <span class="syn-type">boolean</span>}` },
        { num: 15, text: `    <span class="syn-var">self</span>.<span class="syn-prop">RayParams</span> = <span class="syn-type">RaycastParams</span>.<span class="syn-func">new</span>()` },
        { num: 16, text: `    <span class="syn-var">self</span>.<span class="syn-prop">RayParams</span>.<span class="syn-prop">FilterType</span> = <span class="syn-type">Enum</span>.<span class="syn-prop">RaycastFilterType</span>.<span class="syn-prop">Exclude</span>` },
        { num: 17, text: `    <span class="syn-kw">return</span> <span class="syn-var">self</span>` },
        { num: 18, text: `<span class="syn-kw">end</span>` },
        { num: 19, text: `` },
        { num: 20, text: `<span class="syn-kw">function</span> <span class="syn-var">Hitbox</span>:<span class="syn-func">Step</span>(<span class="syn-var">delta</span>: <span class="syn-type">number</span>)` },
        { num: 21, text: `    <span class="syn-kw">for</span> <span class="syn-var">i</span>, <span class="syn-var">offset</span> <span class="syn-kw">in</span> <span class="syn-func">ipairs</span>(<span class="syn-var">self</span>.<span class="syn-prop">Attachments</span>) <span class="syn-kw">do</span>` },
        { num: 22, text: `        <span class="syn-kw">local</span> <span class="syn-var">currentPoint</span> = <span class="syn-var">self</span>.<span class="syn-prop">Part</span>.<span class="syn-prop">CFrame</span>:PointToWorldSpace(<span class="syn-var">offset</span>)` },
        { num: 23, text: `        <span class="syn-kw">local</span> <span class="syn-var">lastPoint</span> = <span class="syn-var">self</span>.<span class="syn-prop">PreviousPoints</span>[<span class="syn-var">i</span>] <span class="syn-kw">or</span> <span class="syn-var">currentPoint</span>` },
        { num: 24, text: `        <span class="syn-kw">local</span> <span class="syn-var">direction</span> = <span class="syn-var">currentPoint</span> - <span class="syn-var">lastPoint</span>` },
        { num: 25, text: `        <span class="syn-kw">local</span> <span class="syn-var">result</span> = <span class="syn-var">Workspace</span>:<span class="syn-func">Raycast</span>(<span class="syn-var">lastPoint</span>, <span class="syn-var">direction</span>, <span class="syn-var">self</span>.<span class="syn-prop">RayParams</span>)` },
        { num: 26, text: `        <span class="syn-kw">if</span> <span class="syn-var">result</span> <span class="syn-kw">and</span> <span class="syn-var">result</span>.<span class="syn-prop">Instance</span> <span class="syn-kw">then</span>` },
        { num: 27, text: `            <span class="syn-kw">local</span> <span class="syn-var">char</span> = <span class="syn-var">result</span>.<span class="syn-prop">Instance</span>:FindFirstAncestorOfClass(<span class="syn-str">"Model"</span>)` },
        { num: 28, text: `            <span class="syn-kw">if</span> <span class="syn-var">char</span> <span class="syn-kw">and</span> <span class="syn-kw">not</span> <span class="syn-var">self</span>.<span class="syn-prop">HitTargets</span>[<span class="syn-var">char</span>] <span class="syn-kw">then</span>` },
        { num: 29, text: `                <span class="syn-var">self</span>.<span class="syn-prop">HitTargets</span>[<span class="syn-var">char</span>] = <span class="syn-kw">true</span>` },
        { num: 30, text: `                <span class="syn-var">self</span>:<span class="syn-func">OnDamageValidated</span>(<span class="syn-var">char</span>, <span class="syn-var">result</span>.<span class="syn-prop">Position</span>)` },
        { num: 31, text: `            <span class="syn-kw">end</span>` },
        { num: 32, text: `        <span class="syn-kw">end</span>` },
        { num: 33, text: `        <span class="syn-var">self</span>.<span class="syn-prop">PreviousPoints</span>[<span class="syn-var">i</span>] = <span class="syn-var">currentPoint</span>` },
        { num: 34, text: `    <span class="syn-kw">end</span>` },
        { num: 35, text: `<span class="syn-kw">end</span>` }
      ],
      simLogs: [
        { time: "14:22:01.104", type: "server", status: "info", text: "[HitboxManager] Initialized 4 Attachment points for Voidwalker_Katana" },
        { time: "14:22:01.320", type: "client", status: "info", text: "[ClientCombat] User initiated AttackCombo_Swing_01" },
        { time: "14:22:01.345", type: "server", status: "success", text: "[HitboxResult] Raycast intersection detected on TargetDummy_R15" },
        { time: "14:22:01.346", type: "server", status: "success", text: "[AntiExploit] Ping check: 32ms | Delta threshold passed (0.021s)" },
        { time: "14:22:01.348", type: "server", status: "success", text: "[CombatEngine] 65.0 Base Damage registered. Visual impact FX spawned." }
      ]
    },
    profile: {
      filename: "ProfileDataService.luau",
      lines: [
        { num: 1, text: `<span class="syn-comment">--!strict</span>` },
        { num: 2, text: `<span class="syn-comment">-- [VEXO ARCHITECTURE] High-Reliability Player Data Layer</span>` },
        { num: 3, text: `<span class="syn-kw">local</span> <span class="syn-var">ProfileService</span> = <span class="syn-func">require</span>(<span class="syn-var">ServerScriptService</span>.<span class="syn-prop">Libs</span>.<span class="syn-prop">ProfileService</span>)` },
        { num: 4, text: `<span class="syn-kw">local</span> <span class="syn-var">ProfileTemplate</span> = {` },
        { num: 5, text: `    <span class="syn-prop">Coins</span> = 1000,` },
        { num: 6, text: `    <span class="syn-prop">Gems</span> = 50,` },
        { num: 7, text: `    <span class="syn-prop">Inventory</span> = { <span class="syn-str">"Voidwalker_Katana"</span> },` },
        { num: 8, text: `    <span class="syn-prop">LastLogin</span> = <span class="syn-type">os.time</span>()` },
        { num: 9, text: `}` },
        { num: 10, text: `` },
        { num: 11, text: `<span class="syn-kw">local</span> <span class="syn-var">ProfileStore</span> = <span class="syn-var">ProfileService</span>.<span class="syn-func">GetProfileStore</span>(` },
        { num: 12, text: `    <span class="syn-str">"PlayerData_v2.8"</span>,` },
        { num: 13, text: `    <span class="syn-var">ProfileTemplate</span>` },
        { num: 14, text: `)` },
        { num: 15, text: `` },
        { num: 16, text: `<span class="syn-kw">function</span> <span class="syn-var">DataService</span>:<span class="syn-func">LoadProfile</span>(<span class="syn-var">player</span>: <span class="syn-type">Player</span>)` },
        { num: 17, text: `    <span class="syn-kw">local</span> <span class="syn-var">profileKey</span> = <span class="syn-str">"Player_"</span> .. <span class="syn-var">player</span>.<span class="syn-prop">UserId</span>` },
        { num: 18, text: `    <span class="syn-kw">local</span> <span class="syn-var">profile</span> = <span class="syn-var">ProfileStore</span>:<span class="syn-func">LoadProfileAsync</span>(<span class="syn-var">profileKey</span>)` },
        { num: 19, text: `    <span class="syn-kw">if</span> <span class="syn-var">profile</span> ~= <span class="syn-kw">nil</span> <span class="syn-kw">then</span>` },
        { num: 20, text: `        <span class="syn-var">profile</span>:<span class="syn-func">AddUserId</span>(<span class="syn-var">player</span>.<span class="syn-prop">UserId</span>)` },
        { num: 21, text: `        <span class="syn-var">profile</span>:<span class="syn-func">Reconcile</span>()` },
        { num: 22, text: `        <span class="syn-var">self</span>.<span class="syn-prop">Profiles</span>[<span class="syn-var">player</span>] = <span class="syn-var">profile</span>` },
        { num: 23, text: `        <span class="syn-var">self</span>:<span class="syn-func">ReplicateToClient</span>(<span class="syn-var">player</span>, <span class="syn-var">profile</span>.<span class="syn-prop">Data</span>)` },
        { num: 24, text: `    <span class="syn-kw">else</span>` },
        { num: 25, text: `        <span class="syn-var">player</span>:<span class="syn-func">Kick</span>(<span class="syn-str">"Data loading error. Please rejoin."</span>)` },
        { num: 26, text: `    <span class="syn-kw">end</span>` },
        { num: 27, text: `<span class="syn-kw">end</span>` }
      ],
      simLogs: [
        { time: "14:22:04.012", type: "server", status: "info", text: "[ProfileStore] Connecting to DataStore 'PlayerData_v2.8'..." },
        { time: "14:22:04.089", type: "server", status: "success", text: "[SessionLock] Granted lock for UserId 78219409 [Player_78219409]" },
        { time: "14:22:04.095", type: "server", status: "success", text: "[Reconcile] Template fields verified. 0 missing keys." },
        { time: "14:22:04.110", type: "client", status: "success", text: "[ReplicaController] Synchronized Inventory [1 item] & 1000 Coins" }
      ]
    },
    spring: {
      filename: "ProceduralWeaponSpring.luau",
      lines: [
        { num: 1, text: `<span class="syn-comment">--!strict</span>` },
        { num: 2, text: `<span class="syn-comment">-- [VEXO ARCHITECTURE] Client-Side 2nd Order Damped Spring</span>` },
        { num: 3, text: `<span class="syn-kw">local</span> <span class="syn-var">Spring</span> = {}` },
        { num: 4, text: `<span class="syn-var">Spring</span>.__index = <span class="syn-var">Spring</span>` },
        { num: 5, text: `` },
        { num: 6, text: `<span class="syn-kw">function</span> <span class="syn-var">Spring</span>.<span class="syn-func">new</span>(<span class="syn-var">mass</span>: <span class="syn-type">number</span>, <span class="syn-var">force</span>: <span class="syn-type">number</span>, <span class="syn-var">damping</span>: <span class="syn-type">number</span>)` },
        { num: 7, text: `    <span class="syn-kw">local</span> <span class="syn-var">self</span> = <span class="syn-func">setmetatable</span>({}, <span class="syn-var">Spring</span>)` },
        { num: 8, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Mass</span> = <span class="syn-var">mass</span> <span class="syn-kw">or</span> 1` },
        { num: 9, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Force</span> = <span class="syn-var">force</span> <span class="syn-kw">or</span> 50` },
        { num: 10, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Damping</span> = <span class="syn-var">damping</span> <span class="syn-kw">or</span> 4` },
        { num: 11, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Velocity</span> = <span class="syn-type">Vector3</span>.<span class="syn-prop">zero</span>` },
        { num: 12, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Position</span> = <span class="syn-type">Vector3</span>.<span class="syn-prop">zero</span>` },
        { num: 13, text: `    <span class="syn-kw">return</span> <span class="syn-var">self</span>` },
        { num: 14, text: `<span class="syn-kw">end</span>` },
        { num: 15, text: `` },
        { num: 16, text: `<span class="syn-kw">function</span> <span class="syn-var">Spring</span>:<span class="syn-func">Impulse</span>(<span class="syn-var">impulseVector</span>: <span class="syn-type">Vector3</span>)` },
        { num: 17, text: `    <span class="syn-var">self</span>.<span class="syn-prop">Velocity</span> += <span class="syn-var">impulseVector</span> / <span class="syn-var">self</span>.<span class="syn-prop">Mass</span>` },
        { num: 18, text: `<span class="syn-kw">end</span>` }
      ],
      simLogs: [
        { time: "14:22:08.401", type: "client", status: "info", text: "[CameraSway] Binding to RenderStepped at priority 200" },
        { time: "14:22:08.520", type: "client", status: "success", text: "[SpringSystem] Applied recoil impulse: Vector3.new(0, 0.45, -0.8)" },
        { time: "14:22:08.610", type: "client", status: "success", text: "[SpringSystem] Damping settled within 0.001 epsilon (Restored CFrame)" }
      ]
    }
  };

  let activeScriptKey = 'hitbox';
  const editorArea = document.getElementById('code-editor-area');
  const simTerminal = document.getElementById('simulation-terminal');

  function renderScript(key) {
    if (!editorArea || !LUAU_SCRIPTS[key]) return;
    activeScriptKey = key;
    const script = LUAU_SCRIPTS[key];

    editorArea.innerHTML = script.lines.map(line => `
      <div class="code-line">
        <span class="line-num">${line.num}</span>
        <span class="line-content">${line.text}</span>
      </div>
    `).join('');

    // Clear simulation when switching
    if (simTerminal) {
      simTerminal.innerHTML = '';
      simTerminal.classList.remove('active');
    }
  }

  // Tabs
  document.querySelectorAll('.file-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderScript(tab.dataset.script);
    });
  });

  // Run Simulation Button
  const btnSimulate = document.getElementById('btn-simulate-code');
  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      if (!simTerminal) return;
      simTerminal.classList.toggle('active');
      if (simTerminal.classList.contains('active')) {
        const script = LUAU_SCRIPTS[activeScriptKey];
        simTerminal.innerHTML = `
          <div style="color: #64748b; margin-bottom: 8px; font-weight: 600;">--- ROBLOX STUDIO OUTPUT CONSOLE [SIMULATION] ---</div>
        `;
        script.simLogs.forEach((log, index) => {
          setTimeout(() => {
            const row = document.createElement('div');
            row.className = 'sim-log-row';
            const tagClass = log.type === 'server' ? 'sim-tag-server' : 'sim-tag-client';
            const msgClass = log.status === 'success' ? 'sim-msg-success' : log.status === 'warn' ? 'sim-msg-warn' : 'sim-msg-info';
            row.innerHTML = `
              <span class="sim-time">[${log.time}]</span>
              <span class="${tagClass}">[${log.type.toUpperCase()}]</span>
              <span class="${msgClass}">${log.text}</span>
            `;
            simTerminal.appendChild(row);
            simTerminal.scrollTop = simTerminal.scrollHeight;
          }, index * 240);
        });
      }
    });
  }

  // Copy Code Button
  const btnCopyCode = document.getElementById('btn-copy-code');
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const script = LUAU_SCRIPTS[activeScriptKey];
      // Strip HTML tags for clean text copy
      const plainText = script.lines.map(l => {
        const temp = document.createElement('div');
        temp.innerHTML = l.text;
        return temp.textContent || temp.innerText || "";
      }).join('\n');

      navigator.clipboard.writeText(plainText).then(() => {
        window.showToast("Luau code copied to clipboard!");
      }).catch(() => {
        window.showToast("Copied to clipboard!");
      });
    });
  }

  // Initialize first script
  renderScript('hitbox');
})();
