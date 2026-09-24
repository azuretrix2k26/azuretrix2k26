/**
 * AZURETRIX 2K26 - OFFICIAL CLIENT ENGINE
 * Department of Electrical & Electronics Engineering
 * University College of Engineering Arni (Anna University Chennai)
 * Event Date: 23 NOVEMBER 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. High-Tech EEE Loading Screen Engine
     ========================================================================== */
  const loaderScreen = document.getElementById('loader-screen');
  const loaderProgressFill = document.getElementById('loader-progress-fill');
  const loaderStatusText = document.getElementById('loader-status-text');
  const loaderPercent = document.getElementById('loader-percent');
  const skipLoaderBtn = document.getElementById('skip-loader-btn');

  let loadProgress = 0;
  let loaderDismissed = false;

  const statusMessages = [
    { threshold: 15, text: 'INITIALIZING POWER GRID...' },
    { threshold: 40, text: 'CONNECTING CIRCUIT NODES...' },
    { threshold: 70, text: 'CALIBRATING 50.0 Hz FREQUENCY...' },
    { threshold: 90, text: 'CHARGING CAPACITOR BANKS...' },
    { threshold: 100, text: 'SYSTEM ONLINE & READY!' }
  ];

  function dismissLoader() {
    if (loaderDismissed || !loaderScreen) return;
    loaderDismissed = true;
    loaderScreen.classList.add('fade-out');
    document.body.style.overflow = '';
    // Trigger opening thunder strike!
    setTimeout(() => {
      triggerThunderStrike();
    }, 300);
  }

  // Prevent scroll during loader
  if (loaderScreen && !loaderDismissed) {
    document.body.style.overflow = 'hidden';

    const loadInterval = setInterval(() => {
      loadProgress += Math.floor(Math.random() * 8) + 4;
      if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(loadInterval);
      }

      if (loaderProgressFill) loaderProgressFill.style.width = `${loadProgress}%`;
      if (loaderPercent) loaderPercent.textContent = `${loadProgress}%`;

      // Status text progression
      const currentMsg = statusMessages.find(m => loadProgress <= m.threshold);
      if (currentMsg && loaderStatusText) {
        loaderStatusText.textContent = currentMsg.text;
      }

      if (loadProgress === 100) {
        setTimeout(dismissLoader, 400);
      }
    }, 50);

    if (skipLoaderBtn) {
      skipLoaderBtn.addEventListener('click', () => {
        clearInterval(loadInterval);
        dismissLoader();
      });
    }
  }


  /* ==========================================================================
     2. Event Data Registry (Technical & Non-Technical)
     ========================================================================== */
  const EVENTS_DATA = {
    // --- 5 TECHNICAL EVENTS ---
    'project-expo': {
      id: 'project-expo',
      title: 'Project Expo',
      category: 'TECHNICAL',
      tagline: 'Hardware models, embedded prototypes, and renewable energy systems.',
      teamSize: '1 – 4 Members per Team',
      venue: 'Power Electronics & Machines Laboratory',
      timing: '10:30 AM – 01:00 PM',
      about: 'Project Expo offers a prestigious platform for budding engineers to demonstrate tangible hardware prototypes, embedded innovations, and simulations addressing modern power, energy, and electronics challenges.',
      rules: [
        'A working hardware prototype, embedded demo, or validated simulation model is mandatory.',
        'Themes include: Smart Power Grids, Electric Mobility (EVs), IoT & Embedded Systems, Renewable Energy Harvesting, Automation, and Biomedical Electronics.',
        'Each registered team will be provided with a dedicated laboratory bench with a 230V AC, 50Hz single-phase power outlet.',
        'Presentation time: 7 minutes live demonstration + 3 minutes technical defense with the judging panel.',
        'Judging criteria: Technological Innovation (30%), Practical Viability (25%), Complexity (25%), and Presentation (20%).'
      ],
      coordinators: 'Dr. K. Senthil Kumar (HOD/EEE) | Student Lead: Rajeshwaran G (+91 90427 56321)'
    },

    'tech-takk': {
      id: 'tech-takk',
      title: 'Tech Takk',
      category: 'TECHNICAL',
      tagline: 'Technical paper presentation and technological research orations.',
      teamSize: '1 – 3 Members per Team',
      venue: 'Main Seminar Hall A',
      timing: '10:30 AM – 12:45 PM',
      about: 'Tech Takk challenges participants to research, synthesize, and articulate groundbreaking technological concepts. Present your insights on modern electrical breakthroughs, algorithmic energy optimization, and next-generation power paradigms.',
      rules: [
        'Presentations must follow standard slide format (PPT or PDF, maximum 15 slides).',
        'Key focus areas: High Voltage DC (HVDC), Smart Microgrids, AI/ML in Electrical Systems, Superconducting Materials, Solid-State Transformers, and Green Hydrogen.',
        'Presentation duration: 7 minutes oral dissertation + 3 minutes Q&A with faculty experts.',
        'Hard copy of the abstract / paper (IEEE 2-column format preferred) must be submitted at the registration desk.',
        'Plagiarism in paper submission must not exceed standard university thresholds (under 20%).'
      ],
      coordinators: 'Mr. S. Sathish (AP/EEE) | Student Lead: Vinothini (+91 63828 11745)'
    },

    'electrical-quiz': {
      id: 'electrical-quiz',
      title: 'Electrical Quiz',
      category: 'TECHNICAL',
      tagline: 'High-voltage trivia and fundamental electrical theories gauntlet.',
      teamSize: '2 Members per Team',
      venue: 'Audio-Visual Hall (Digital Center)',
      timing: '11:00 AM – 01:00 PM',
      about: 'A multi-round intellectual challenge curated to probe core electrical engineering concepts, history of electromagnetism, circuit theorems, electrical machines, and modern semiconductor developments.',
      rules: [
        'Round 1 (Written Prelims): 30 objective multiple-choice questions spanning DC/AC circuits, electromagnetic fields, electrical machines, and electronics basics.',
        'Round 2 (Audio-Visual & Identification): Top 6 qualifying teams advance to decipher waveforms, circuit components, and engineering milestones.',
        'Round 3 (High-Voltage Buzzer Arena): Negative marking applies for inaccurate premature buzzers.',
        'Use of programmable calculators, mobile phones, or smartwatches is strictly prohibited during the quiz rounds.',
        'In the event of a tie, sudden-death questions will determine the podium winners.'
      ],
      coordinators: 'Faculty Coordinator (EEE) | Student Lead: Rajeshwaran G (+91 90427 56321)'
    },

    'circuit-connection': {
      id: 'circuit-connection',
      title: 'Circuit Connection',
      category: 'TECHNICAL',
      tagline: 'Breadboard wiring, fault debugging, and oscilloscope verification.',
      teamSize: '2 Members per Team',
      venue: 'Circuits & Devices Laboratory',
      timing: '02:00 PM – 03:45 PM',
      about: 'Put your hands-on laboratory expertise to the test. Teams must troubleshoot flawed circuit schematics, identify defective passive/active components, assemble connections on breadboards, and obtain designated waveform outputs.',
      rules: [
        'Round 1: Schematic debugging and component value calculation using color codes and datasheets.',
        'Round 2: Practical assembly on laboratory breadboards within a strict 30-minute countdown.',
        'Standard test equipment (Cathode-Ray / Digital Storage Oscilloscopes, Function Generators, Regulated DC Supplies) will be provided.',
        'Evaluation is strictly based on wiring neatness, minimal component damage, circuit completion speed, and waveform fidelity.',
        'Strict laboratory safety protocols must be adhered to at all times.'
      ],
      coordinators: 'Mr. S. Sathish (AP/EEE) | Student Helpdesk (+91 63828 11745)'
    },

    'reasoning': {
      id: 'reasoning',
      title: 'Reasoning',
      category: 'TECHNICAL',
      tagline: 'Quantitative logic, analytical deduction, and boolean puzzle solving.',
      teamSize: '1 – 2 Members per Team',
      venue: 'Department Classroom B-102',
      timing: '02:15 PM – 03:30 PM',
      about: 'An intense aptitude and technical logic showdown. Evaluate your mental agility through boolean algebraic problems, algorithmic flow deduction, pattern sequencing, and technical problem-solving puzzles.',
      rules: [
        'Assessment comprises 40 questions covering Data Sufficiency, Logical Puzzles, Digital Logic Gates, and Numerical Aptitude.',
        'Time allotted: 45 minutes.',
        'No external electronic aids or internet-connected devices permitted.',
        'Scoring is based on accuracy, with negative marking for deliberate guesswork.',
        'Decisions of the departmental evaluation committee are final.'
      ],
      coordinators: 'Faculty Coordinator (EEE) | Student Helpdesk (+91 90427 56321)'
    },

    // --- 5 NON-TECHNICAL EVENTS ---
    'ipl-auction': {
      id: 'ipl-auction',
      title: 'IPL Auction',
      category: 'NON-TECHNICAL',
      tagline: 'Virtual cricket franchise bidding, squad strategy, and budget allocation.',
      teamSize: '2 – 4 Members per Team',
      venue: 'Seminar Hall B',
      timing: '02:00 PM – 04:15 PM',
      about: 'Experience the exhilarating pressure of an IPL franchise boardroom! Manage a fixed virtual budget, calculate player ratings, outmaneuver rival bidders, and curate a balanced cricket squad capable of winning the championship.',
      rules: [
        'Round 1: Cricket Trivia Screening Test (Top 8 franchises advance to the auction arena).',
        'Each qualifying franchise is assigned an equal virtual purse (e.g., 100 Crores).',
        'Squad compositions must fulfill mandatory criteria: specified number of batsmen, bowlers, all-rounders, and overseas players.',
        'Exceeding the purse budget results in immediate penalty point deductions.',
        'Winning squad is determined by algorithmic squad strength rating and remaining budget efficiency.'
      ],
      coordinators: 'Student Leads: Rajeshwaran G & Vinothini (+91 90427 56321)'
    },

    'twisted-tiles': {
      id: 'twisted-tiles',
      title: 'Twisted Tiles',
      category: 'NON-TECHNICAL',
      tagline: 'High-speed visual puzzle solving, spatial sequencing, and tile mechanics.',
      teamSize: '1 – 2 Members per Team',
      venue: 'EEE Drawing & Design Hall',
      timing: '02:00 PM – 03:30 PM',
      about: 'A lightning-fast test of pattern recognition, spatial orientation, and visual agility. Rearrange disrupted grids and decode randomized visual tiles to recreate target configurations under intense time pressure.',
      rules: [
        'Round 1 (Time-Trial Grid): Reconstruct a 4x4 scrambled visual mosaic within minimum time.',
        'Round 2 (Dynamic Rotation): Solvers must navigate rotating tile sections and memory recall challenges.',
        'Touches are counted, and time penalties are assessed for illegal slide movements.',
        'Fastest accurate completion wins the round.'
      ],
      coordinators: 'Student Helpdesk (+91 63828 11745)'
    },

    'yes-no': {
      id: 'yes-no',
      title: 'Yes / No',
      category: 'NON-TECHNICAL',
      tagline: 'The rapid-fire interrogative hot-seat where forbidden words trigger elimination.',
      teamSize: '1 Member (Individual Participation)',
      venue: 'Open Amphitheatre / Courtyard',
      timing: '02:30 PM – 04:00 PM',
      about: 'Step into the hot seat! Face an unrelenting barrage of quick-fire questions from the host for 2 full minutes. The catch? You must answer instantaneously without ever saying "Yes", "No", nodding, shaking your head, or pausing beyond 2 seconds.',
      rules: [
        'Single-player hot-seat format.',
        'Saying "Yes", "No", affirmative or negative head nods, or repetitive filler words invokes immediate elimination buzzer.',
        'Participants who survive the preliminary round advance to sudden-death rapid rounds with faster questioning.',
        'Judges reserve sole discretion on pauses exceeding allowed grace periods.'
      ],
      coordinators: 'Student Leads: Vinothini & Team (+91 63828 11745)'
    },

    'battleground': {
      id: 'battleground',
      title: 'Battleground',
      category: 'NON-TECHNICAL',
      tagline: 'Mobile tactical esports tournament testing squad synergy and clutch reflexes.',
      teamSize: '4 Members per Team (Squad)',
      venue: 'Smart Classroom Arena (EEE Block)',
      timing: '02:00 PM – 04:00 PM',
      about: 'Bring your esports squad to the national stage. Navigate tactical maps, coordinate rotations, communicate strategic calls, and outplay rival collegiate squads in official tournament custom rooms.',
      rules: [
        'Mobile devices only (No iPads, tablets, triggers, controllers, or emulators permitted).',
        'Players must use their own registered accounts, devices, and internet connections.',
        'Use of third-party modifications, hacks, or unsportsmanlike conduct results in instant team disqualification.',
        'Scoring combines placement points and kill tally following standard esports championship matrices.'
      ],
      coordinators: 'Student Lead: Rajeshwaran G (+91 90427 56321)'
    },

    'dumb-c': {
      id: 'dumb-c',
      title: 'Dumb-C',
      category: 'NON-TECHNICAL',
      tagline: 'Charades and non-verbal communication deciphering technical & cinema clues.',
      teamSize: '2 – 3 Members per Team',
      venue: 'Main College Auditorium Foyer',
      timing: '02:00 PM – 03:45 PM',
      about: 'The quintessential charades showdown! Team members must silently enact intricate scientific terms, movie names, and popular idioms using only expressive gestures and body language within the time limit.',
      rules: [
        'Strictly zero vocal sounds, lip movements, or lip-syncing allowed by the actor.',
        'No writing in the air or pointing to physical objects in the hall.',
        'Rounds include: Technical Concepts, Cinema & Pop Culture, and Mixed Idioms.',
        'Time per clue: 60 seconds. Bonus points awarded for solving within the first 20 seconds.'
      ],
      coordinators: 'Student Leads: Vinothini & Team (+91 63828 11745)'
    }
  };

  const EVENT_KEYS = Object.keys(EVENTS_DATA);
  let modalEventIndex = 0;


  /* ==========================================================================
     3. Category Tab Switcher for Events Deck
     ========================================================================== */
  const tabBtnTech = document.getElementById('tab-btn-tech');
  const tabBtnNonTech = document.getElementById('tab-btn-nontech');
  const tabBtnAll = document.getElementById('tab-btn-all');
  const deckTech = document.getElementById('deck-technical');
  const deckNonTech = document.getElementById('deck-nontechnical');
  const catButtons = [tabBtnTech, tabBtnNonTech, tabBtnAll];

  function switchCategoryTab(tab) {
    catButtons.forEach(btn => {
      if (btn) btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    if (tab === 'tech') {
      if (deckTech) deckTech.style.display = 'flex';
      if (deckNonTech) deckNonTech.style.display = 'none';
    } else if (tab === 'nontech') {
      if (deckTech) deckTech.style.display = 'none';
      if (deckNonTech) deckNonTech.style.display = 'flex';
    } else {
      if (deckTech) deckTech.style.display = 'flex';
      if (deckNonTech) deckNonTech.style.display = 'flex';
    }
  }

  if (tabBtnTech) tabBtnTech.addEventListener('click', () => switchCategoryTab('tech'));
  if (tabBtnNonTech) tabBtnNonTech.addEventListener('click', () => switchCategoryTab('nontech'));
  if (tabBtnAll) tabBtnAll.addEventListener('click', () => switchCategoryTab('all'));

  // Nav menu TECHNICAL and NON-TECHNICAL links
  const navLinkTech = document.getElementById('nav-link-tech');
  const navLinkNonTech = document.getElementById('nav-link-nontech');
  const mobileLinkTech = document.getElementById('mobile-link-tech');
  const mobileLinkNonTech = document.getElementById('mobile-link-nontech');

  if (navLinkTech) {
    navLinkTech.addEventListener('click', () => switchCategoryTab('tech'));
  }
  if (navLinkNonTech) {
    navLinkNonTech.addEventListener('click', () => switchCategoryTab('nontech'));
  }
  if (mobileLinkTech) {
    mobileLinkTech.addEventListener('click', () => {
      switchCategoryTab('tech');
      closeMobileMenu();
    });
  }
  if (mobileLinkNonTech) {
    mobileLinkNonTech.addEventListener('click', () => {
      switchCategoryTab('nontech');
      closeMobileMenu();
    });
  }

  // Default to Technical on start
  switchCategoryTab('tech');


  /* ==========================================================================
     4. Thunder & Lightning Engine (Realistic Canvas Bolts & Screen Flash)
     ========================================================================== */
  const thunderFlashOverlay = document.getElementById('thunder-flash');
  const canvas = document.getElementById('electrical-canvas');
  let lightningBolts = [];

  function triggerThunderStrike() {
    // 1. Fullscreen Multi-Burst Flash
    if (thunderFlashOverlay) {
      thunderFlashOverlay.classList.remove('flash-strike');
      void thunderFlashOverlay.offsetWidth; // Reflow to restart animation
      thunderFlashOverlay.classList.add('flash-strike');
    }

    // 2. Generate Realistic Branching Lightning Bolt
    if (canvas) {
      const startX = canvas.width * (0.2 + Math.random() * 0.6);
      const startY = 0;
      const endX = startX + (Math.random() - 0.5) * (canvas.width * 0.4);
      const endY = canvas.height * (0.65 + Math.random() * 0.35);

      const bolt = createLightningBolt(startX, startY, endX, endY, 6, 45);
      lightningBolts.push({
        segments: bolt,
        alpha: 1,
        life: 14
      });
    }

    // 3. Synthesize Subtle Thunder Rumble using Web Audio API
    playSynthesizedThunder();

    // 4. Cinematic Background Reaction & Camera Shake
    const cinematicUniverse = document.getElementById('cinematic-bg');
    if (cinematicUniverse) {
      cinematicUniverse.classList.remove('thunder-active');
      void cinematicUniverse.offsetWidth; // Reflow to restart animation
      cinematicUniverse.classList.add('thunder-active');
      setTimeout(() => {
        cinematicUniverse.classList.remove('thunder-active');
      }, 550);
    }

    // 5. Fire Storm Ember Burst
    if (window.spawnThunderEmberBurst) {
      window.spawnThunderEmberBurst();
    }
  }

  function createLightningBolt(x1, y1, x2, y2, depth, maxJitter) {
    if (depth <= 0) {
      return [{ x1, y1, x2, y2 }];
    }

    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * maxJitter;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * (maxJitter * 0.4);

    let segments = [];
    segments = segments.concat(createLightningBolt(x1, y1, midX, midY, depth - 1, maxJitter * 0.65));
    segments = segments.concat(createLightningBolt(midX, midY, x2, y2, depth - 1, maxJitter * 0.65));

    if (depth > 2 && Math.random() > 0.45) {
      const branchAngle = (Math.random() - 0.5) * 0.8;
      const branchLength = (y2 - y1) * 0.35;
      const branchEndX = midX + Math.sin(branchAngle) * branchLength;
      const branchEndY = midY + Math.cos(branchAngle) * branchLength;
      segments = segments.concat(createLightningBolt(midX, midY, branchEndX, branchEndY, depth - 2, maxJitter * 0.4));
    }

    return segments;
  }

  let audioCtx = null;
  function playSynthesizedThunder() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const bufferSize = audioCtx.sampleRate * 0.4;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.12));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.35);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const thunderBtn = document.getElementById('thunder-btn');
  const heroThunderBtn = document.getElementById('hero-thunder-trigger');
  if (thunderBtn) thunderBtn.addEventListener('click', triggerThunderStrike);
  if (heroThunderBtn) heroThunderBtn.addEventListener('click', triggerThunderStrike);

  let nextAutoStrike = Date.now() + 14000;


  /* ==========================================================================
     5. Electrical Background Canvas (Circuit Nodes & Lightning Drawing)
     ========================================================================= */
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    });

    let nodes = [];
    const NODE_COUNT = Math.min(32, Math.floor(width / 45));
    let circuitPulses = [];
    let waveOffset = 0;

    function initNodes() {
      nodes = [];
      circuitPulses = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 2 + 1.2,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }
    initNodes();

    function renderBackground() {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Horizontal AC Sine Wave (Oscilloscope Background Frequency)
      waveOffset += 0.015;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.06)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.38 + Math.sin(x * 0.007 + waveOffset) * 18 + Math.cos(x * 0.003 - waveOffset * 0.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw Circuit Traces & Nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;
        a.pulse += 0.03;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 150, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Randomly spawn travelling packet along this live trace
            if (Math.random() < 0.0012 && circuitPulses.length < 8) {
              circuitPulses.push({
                x1: a.x, y1: a.y,
                x2: b.x, y2: b.y,
                progress: 0,
                speed: 0.018 + Math.random() * 0.015
              });
            }
          }
        }

        // Draw node with glow
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${Math.sin(a.pulse) * 0.35 + 0.6})`;
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Travelling Circuit Energy Packets (Node -> Line -> Node)
      for (let p = circuitPulses.length - 1; p >= 0; p--) {
        const pulse = circuitPulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          circuitPulses.splice(p, 1);
          continue;
        }

        const px = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress;
        const py = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Active Lightning Bolts
      for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        ctx.save();
        ctx.shadowColor = '#0066ff';
        ctx.shadowBlur = 20;

        // Outer Sapphire Blue Electric Aura
        ctx.strokeStyle = `rgba(0, 102, 255, ${bolt.alpha * 0.85})`;
        ctx.lineWidth = bolt.alpha * 7;
        ctx.beginPath();
        bolt.segments.forEach(seg => {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        });
        ctx.stroke();

        // Vivid Electric Cyan Ionized Channel
        ctx.strokeStyle = `rgba(0, 210, 255, ${bolt.alpha * 0.95})`;
        ctx.lineWidth = bolt.alpha * 3.5;
        ctx.stroke();

        // Brilliant Center Core White Spark
        ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha})`;
        ctx.lineWidth = bolt.alpha * 1.5;
        ctx.stroke();

        ctx.restore();

        bolt.life--;
        bolt.alpha = bolt.life / 14;
        if (bolt.life <= 0) {
          lightningBolts.splice(i, 1);
        }
      }

      // Check auto thunder strike
      if (Date.now() > nextAutoStrike) {
        triggerThunderStrike();
        nextAutoStrike = Date.now() + 16000 + Math.random() * 8000;
      }

      requestAnimationFrame(renderBackground);
    }
    renderBackground();
  }


  /* ==========================================================================
     5B. Advanced Multi-Layered Parallax & Depth Tilt Engine
     ========================================================================== */
  const artworkLayer = document.getElementById('parallax-artwork-layer');
  const mistDeepLayer = document.getElementById('mist-deep-layer');
  const mistForeLayer = document.getElementById('mist-fore-layer');
  const torchLight = document.getElementById('torch-ambient-light');

  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let targetScrollY = window.pageYOffset || 0;
  let currentScrollY = targetScrollY;

  // Track mouse coordinates normalized between -1 and 1
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Mobile Gyroscope / Device Orientation Support
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetMouseX = Math.max(-1, Math.min(1, e.gamma / 25));
        targetMouseY = Math.max(-1, Math.min(1, (e.beta - 30) / 30));
      }
    }, { passive: true });
  }

  // Track passive scroll
  window.addEventListener('scroll', () => {
    targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  // 60FPS Smooth Parallax Interpolation Loop
  function updateParallaxFrame() {
    currentMouseX += (targetMouseX - currentMouseX) * 0.055;
    currentMouseY += (targetMouseY - currentMouseY) * 0.055;
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    if (artworkLayer) {
      const shiftX = currentMouseX * -28;
      const shiftY = currentMouseY * -18 + (currentScrollY * -0.12);
      const rotY = currentMouseX * 1.5;
      const rotX = currentMouseY * -1.2;
      artworkLayer.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.05)`;
    }

    if (mistDeepLayer) {
      const mistX = currentMouseX * -45;
      mistDeepLayer.style.setProperty('--mist-deep-x', `${mistX.toFixed(1)}px`);
    }

    if (mistForeLayer) {
      const mistForeX = currentMouseX * -65;
      mistForeLayer.style.setProperty('--mist-fore-x', `${mistForeX.toFixed(1)}px`);
    }

    if (torchLight) {
      const torchX = currentMouseX * -15;
      const torchY = currentMouseY * -10;
      torchLight.style.transform = `translate3d(${torchX.toFixed(1)}px, ${torchY.toFixed(1)}px, 0)`;
    }

    requestAnimationFrame(updateParallaxFrame);
  }
  updateParallaxFrame();


  /* ==========================================================================
     5C. Atmospheric Dual-Flame Floating Embers Canvas Particle Engine
     (Dragon Fire & Brazier Embers + Glacial Electric Blue Sparks)
     ========================================================================== */
  const embersCanvas = document.getElementById('embers-canvas');
  if (embersCanvas) {
    const eCtx = embersCanvas.getContext('2d');
    let eWidth = embersCanvas.width = window.innerWidth;
    let eHeight = embersCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      eWidth = embersCanvas.width = window.innerWidth;
      eHeight = embersCanvas.height = window.innerHeight;
    }, { passive: true });

    const embers = [];
    const MAX_EMBERS = Math.min(55, Math.floor(eWidth / 30));

    let rawMouseX = -9999;
    let rawMouseY = -9999;
    window.addEventListener('mousemove', (e) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
    }, { passive: true });

    class EmberParticle {
      constructor(isBurst = false) {
        this.reset(isBurst);
      }

      reset(isBurst = false) {
        // 65% Dragon & Brazier Embers (Golden-Orange Fire), 35% Glacial EEE Blue Sparks
        this.isFire = Math.random() < 0.65;
        this.radius = Math.random() * 2.2 + 0.9;
        
        if (isBurst) {
          this.x = eWidth * 0.5 + (Math.random() - 0.5) * (eWidth * 0.7);
          this.y = eHeight * 0.4 + (Math.random() - 0.5) * (eHeight * 0.3);
          this.vy = -(Math.random() * 3.5 + 1.5);
          this.vx = (Math.random() - 0.5) * 3;
          this.life = 0;
          this.maxLife = Math.random() * 70 + 40;
        } else {
          if (this.isFire) {
            this.x = Math.random() < 0.6 ? Math.random() * (eWidth * 0.45) : Math.random() * eWidth;
          } else {
            this.x = Math.random() * eWidth;
          }
          this.y = eHeight + Math.random() * 30;
          this.vy = -(Math.random() * 0.85 + 0.45);
          this.vx = (Math.random() - 0.5) * 0.5;
          this.life = 0;
          this.maxLife = Math.random() * 280 + 160;
        }

        this.waveFreq = Math.random() * 0.03 + 0.01;
        this.waveAmp = Math.random() * 1.2 + 0.4;
        this.wavePhase = Math.random() * Math.PI * 2;
        this.maxAlpha = Math.random() * 0.6 + 0.35;
        this.alpha = 0;

        if (this.isFire) {
          const colors = [
            '255, 175, 45',
            '255, 125, 20',
            '251, 191, 36',
            '245, 158, 11',
            '255, 80, 10'
          ];
          this.rgb = colors[Math.floor(Math.random() * colors.length)];
          this.glow = '#f59e0b';
        } else {
          const colors = [
            '0, 210, 255',
            '102, 226, 255',
            '255, 255, 255',
            '180, 240, 255'
          ];
          this.rgb = colors[Math.floor(Math.random() * colors.length)];
          this.glow = '#00d2ff';
        }
      }

      update() {
        this.life++;
        if (this.life >= this.maxLife || this.y < -20 || this.x < -30 || this.x > eWidth + 30) {
          this.reset(false);
          return;
        }

        this.wavePhase += this.waveFreq;
        this.x += Math.sin(this.wavePhase) * this.waveAmp + this.vx;
        this.y += this.vy;

        const dx = this.x - rawMouseX;
        const dy = this.y - rawMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const force = (1 - dist / 110) * 1.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        const progress = this.life / this.maxLife;
        if (progress < 0.15) {
          this.alpha = (progress / 0.15) * this.maxAlpha;
        } else if (progress > 0.7) {
          this.alpha = ((1 - progress) / 0.3) * this.maxAlpha;
        } else {
          this.alpha = this.maxAlpha;
        }
      }

      draw() {
        if (this.alpha <= 0.01) return;
        eCtx.save();
        eCtx.beginPath();
        eCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        eCtx.fillStyle = `rgba(${this.rgb}, ${this.alpha.toFixed(2)})`;
        eCtx.shadowColor = this.glow;
        eCtx.shadowBlur = this.radius * 3.5;
        eCtx.fill();
        eCtx.restore();
      }
    }

    for (let i = 0; i < MAX_EMBERS; i++) {
      const p = new EmberParticle(false);
      p.y = Math.random() * eHeight;
      p.life = Math.floor(Math.random() * p.maxLife * 0.8);
      embers.push(p);
    }

    window.spawnThunderEmberBurst = () => {
      for (let i = 0; i < 18; i++) {
        embers.push(new EmberParticle(true));
      }
      if (embers.length > MAX_EMBERS + 25) {
        embers.splice(0, embers.length - (MAX_EMBERS + 25));
      }
    };

    function renderEmbers() {
      eCtx.clearRect(0, 0, eWidth, eHeight);
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.update();
        p.draw();
      }
      requestAnimationFrame(renderEmbers);
    }
    renderEmbers();
  }


  /* ==========================================================================
     6. Live Countdown Timer (23 NOVEMBER 2026, 09:00:00 IST)
     ========================================================================== */
  const countdownGrid = document.getElementById('countdown-grid');
  if (countdownGrid) {
    const targetDateStr = countdownGrid.getAttribute('data-target') || '2026-11-23T09:00:00+05:30';
    const targetTimestamp = new Date(targetDateStr).getTime();

    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        cdDays.textContent = '00';
        cdHours.textContent = '00';
        cdMinutes.textContent = '00';
        cdSeconds.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      cdDays.textContent = String(days).padStart(2, '0');
      cdHours.textContent = String(hours).padStart(2, '0');
      cdMinutes.textContent = String(minutes).padStart(2, '0');
      cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ==========================================================================
     7. Navigation Bar & Mobile Drawer
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));


  /* ==========================================================================
     8. Card Actions (Register & Modal Triggers)
     ========================================================================== */
  document.querySelectorAll('.spec-reg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.dataset.eventName;
      openRegistrationModalWithEvent(eventName);
    });
  });

  document.querySelectorAll('.spec-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.dataset.eventId;
      openEventDetailsModal(eventId);
    });
  });


  /* ==========================================================================
     9. Event Details Modal
     ========================================================================== */
  const detailsModal = document.getElementById('event-details-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-event-title');
  const modalTagline = document.getElementById('modal-event-tagline');
  const modalCategory = document.getElementById('modal-event-category');
  const modalTeamSize = document.getElementById('modal-event-teamsize');
  const modalAbout = document.getElementById('modal-event-about');
  const modalRules = document.getElementById('modal-event-rules');
  const modalVenue = document.getElementById('modal-event-venue');
  const modalTiming = document.getElementById('modal-event-timing');
  const modalCoordinators = document.getElementById('modal-event-coordinators');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');
  const modalRegisterBtn = document.getElementById('modal-register-btn');

  function openEventDetailsModal(eventId) {
    const data = EVENTS_DATA[eventId];
    if (!data) return;

    modalEventIndex = EVENT_KEYS.indexOf(eventId);

    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalCategory.textContent = data.category;
    modalTeamSize.textContent = data.teamSize;
    modalAbout.textContent = data.about;
    modalVenue.textContent = data.venue;
    modalTiming.textContent = data.timing;
    modalCoordinators.textContent = data.coordinators;

    if (data.category === 'TECHNICAL') {
      modalCategory.className = 'spec-badge badge-tech';
    } else {
      modalCategory.className = 'spec-badge badge-nontech';
    }

    modalRules.innerHTML = '';
    data.rules.forEach(rule => {
      const li = document.createElement('li');
      li.textContent = rule;
      modalRules.appendChild(li);
    });

    openModal(detailsModal);
  }

  function openModal(el) {
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(el) {
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => closeModal(detailsModal));
  if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeModal(detailsModal);
    });
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      modalEventIndex = (modalEventIndex - 1 + EVENT_KEYS.length) % EVENT_KEYS.length;
      openEventDetailsModal(EVENT_KEYS[modalEventIndex]);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      modalEventIndex = (modalEventIndex + 1) % EVENT_KEYS.length;
      openEventDetailsModal(EVENT_KEYS[modalEventIndex]);
    });
  }

  if (modalRegisterBtn) {
    modalRegisterBtn.addEventListener('click', () => {
      closeModal(detailsModal);
      const data = EVENTS_DATA[EVENT_KEYS[modalEventIndex]];
      openRegistrationModalWithEvent(data ? data.title : null);
    });
  }


  /* ==========================================================================
     10. Registration Modal & Digital Pass Generator
     ========================================================================== */
  const regModal = document.getElementById('registration-modal');
  const regModalCloseBtn = document.getElementById('reg-modal-close-btn');
  const regForm = document.getElementById('azuretrix-reg-form');
  const regSuccessCard = document.getElementById('reg-success-card');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  const printPassBtn = document.getElementById('print-pass-btn');

  const regTriggers = [
    document.getElementById('nav-reg-trigger'),
    document.getElementById('mobile-reg-trigger'),
    document.getElementById('hero-register-btn'),
    document.getElementById('open-reg-modal-btn')
  ];

  regTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => openRegistrationModalWithEvent());
    }
  });

  function openRegistrationModalWithEvent(preselectedEventTitle = null) {
    regForm.style.display = 'flex';
    regSuccessCard.style.display = 'none';

    if (preselectedEventTitle) {
      const checkboxes = regForm.querySelectorAll('input[name="events"]');
      checkboxes.forEach(cb => {
        cb.checked = (cb.value.toLowerCase() === preselectedEventTitle.toLowerCase());
      });
    }

    openModal(regModal);
  }

  if (regModalCloseBtn) regModalCloseBtn.addEventListener('click', () => closeModal(regModal));
  if (regModal) {
    regModal.addEventListener('click', (e) => {
      if (e.target === regModal) closeModal(regModal);
    });
  }
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => closeModal(regModal));

  // Form Submit
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const year = document.getElementById('reg-year').value;
      const college = document.getElementById('reg-college').value.trim();
      const department = document.getElementById('reg-dept').value.trim();
      const agree = document.getElementById('reg-agree').checked;

      const selected = [];
      regForm.querySelectorAll('input[name="events"]:checked').forEach(cb => selected.push(cb.value));

      if (!name || !email || !phone || !year || !college || !department) {
        showToast('⚠️ Please fill in all required fields.');
        return;
      }

      if (selected.length === 0) {
        showToast('⚠️ Please select at least one event.');
        return;
      }

      if (!agree) {
        showToast('⚠️ Please acknowledge the No On-Spot Registration declaration.');
        return;
      }

      // Generate Pass ID
      const randomHex = Math.floor(1000 + Math.random() * 9000);
      const passId = `AZX-NOV26-${randomHex}`;

      document.getElementById('pass-id-val').textContent = passId;
      document.getElementById('pass-name-val').textContent = `${name} (${year} - ${department})`;
      document.getElementById('pass-college-val').textContent = college;
      document.getElementById('pass-events-val').textContent = selected.join(', ');

      regForm.style.display = 'none';
      regSuccessCard.style.display = 'block';

      // Trigger celebration thunder!
      triggerThunderStrike();

      showToast(`⚡ Registration Successful! Pass ID: ${passId}`);
    });
  }

  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => window.print());
  }


  /* ==========================================================================
     11. Toast Notification & Escape Key Utility
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');
  function showToast(msg) {
    if (!toastContainer) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.3s';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (detailsModal.classList.contains('open')) closeModal(detailsModal);
      if (regModal.classList.contains('open')) closeModal(regModal);
      if (mobileMenu.classList.contains('open')) closeMobileMenu();
    }
  });

});
