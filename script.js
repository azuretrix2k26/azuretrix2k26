/**
 * AZURETRIX 2K26 - OFFICIAL CLIENT ENGINE
 * Department of Electrical and Electronics Engineering
 * University College of Engineering Arni (Anna University Chennai)
 * Event Date: 23 OCTOBER 2026 | Venue: UCEA
 * Tagline: "Empowering Innovation, Energizing the Future"
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
    { threshold: 20, text: 'INITIALIZING POWER GRID...' },
    { threshold: 45, text: 'SYNCHRONIZING CIRCUIT NODES...' },
    { threshold: 75, text: 'CALIBRATING 50.0 Hz FREQUENCY...' },
    { threshold: 92, text: 'CHARGING CAPACITOR BANKS...' },
    { threshold: 100, text: 'GRID ONLINE & READY!' }
  ];

  function dismissLoader() {
    if (loaderDismissed || !loaderScreen) return;
    loaderDismissed = true;
    loaderScreen.classList.add('fade-out');
    document.body.style.overflow = '';
  }

  // Prevent scroll during loader
  if (loaderScreen && !loaderDismissed) {
    document.body.style.overflow = 'hidden';

    const loadInterval = setInterval(() => {
      loadProgress += Math.floor(Math.random() * 9) + 5;
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
        setTimeout(dismissLoader, 350);
      }
    }, 45);

    if (skipLoaderBtn) {
      skipLoaderBtn.addEventListener('click', () => {
        clearInterval(loadInterval);
        dismissLoader();
      });
    }
  }


  /* ==========================================================================
     2. Minimal Circuit Background Canvas (Fine Traces + Travelling Pulses)
     ========================================================================== */
  const canvas = document.getElementById('circuit-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCircuitGrid();
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Circuit Grid System
    const GRID_SPACING = 70;
    let nodes = [];
    let circuitPaths = [];
    let pulses = [];

    function initCircuitGrid() {
      nodes = [];
      circuitPaths = [];
      pulses = [];

      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (Math.random() < 0.28) {
            nodes.push({
              x: c * GRID_SPACING,
              y: r * GRID_SPACING,
              radius: Math.random() < 0.25 ? 3 : 2,
              activeGlow: 0
            });
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = Math.abs(n1.x - n2.x);
          const dy = Math.abs(n1.y - n2.y);

          if ((dx === 0 && dy <= GRID_SPACING * 2.2) || (dy === 0 && dx <= GRID_SPACING * 2.2)) {
            if (Math.random() < 0.75) {
              circuitPaths.push({
                x1: n1.x,
                y1: n1.y,
                x2: n2.x,
                y2: n2.y,
                length: Math.hypot(n2.x - n1.x, n2.y - n1.y)
              });
            }
          }
        }
      }

      const pulseCount = Math.min(18, Math.floor(circuitPaths.length / 3));
      for (let p = 0; p < pulseCount; p++) {
        spawnPulse();
      }
    }

    function spawnPulse() {
      if (circuitPaths.length === 0) return;
      const path = circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
      pulses.push({
        path: path,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007,
        size: 2.5 + Math.random() * 1.5,
        alpha: 0.6 + Math.random() * 0.35
      });
    }

    initCircuitGrid();

    function renderCircuit() {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Static Circuit Traces (Thin Red Energy Traces)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.08)';
      ctx.beginPath();
      for (let i = 0; i < circuitPaths.length; i++) {
        const p = circuitPaths[i];
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
      }
      ctx.stroke();

      // 2. Draw Circuit Nodes (Glowing Circuit Junctions)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const distToMouse = Math.hypot(n.x - mouseX, n.y - mouseY);

        if (distToMouse < 120) {
          n.activeGlow = Math.min(1, n.activeGlow + 0.1);
        } else {
          n.activeGlow = Math.max(0, n.activeGlow - 0.02);
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + n.activeGlow * 1.5, 0, Math.PI * 2);

        if (n.activeGlow > 0.05) {
          ctx.fillStyle = `rgba(220, 38, 38, ${0.18 + n.activeGlow * 0.5})`;
          ctx.shadowColor = 'rgba(220, 38, 38, 0.45)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(220, 38, 38, 0.12)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Traveling Electrical Pulses (Red Electrical Energy Signals)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          spawnPulse();
          continue;
        }

        const currentX = pulse.path.x1 + (pulse.path.x2 - pulse.path.x1) * pulse.progress;
        const currentY = pulse.path.y1 + (pulse.path.y2 - pulse.path.y1) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${pulse.alpha})`;
        ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(renderCircuit);
    }

    renderCircuit();
  }


  /* ==========================================================================
     3. Event Data Registry (Exact Information from Official Poster)
     ========================================================================== */
  const EVENTS_DATA = {
    // --- 5 TECHNICAL EVENTS ---
    'project-expo': {
      id: 'project-expo',
      title: 'ElectroXpo - Project Expo',
      category: 'TECHNICAL',
      tagline: 'Innovative, technical, and functional hardware/prototype showcase.',
      teamSize: '1 – 3 Participants per Team (Max 3)',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/9D25BUJpeeqb2mnB6',
      about: 'ElectroXpo - Project Expo offers a premier stage for students to showcase innovative, technical, and functional engineering projects. Participants demonstrate their working models or prototypes to judges, explaining the problem statement, objectives, and practical engineering solutions.',
      rules: [
        'Each team can have a maximum of 3 participants.',
        'The project must be technical, innovative, and functional.',
        'Participants must clearly explain the problem statement, objective, and proposed solution.',
        'Participants must demonstrate the working model or prototype to the judges.',
        'All required components, laptop, power adapters, and accessories must be brought by the participants.',
        'Each team will be given a specified time limit for presentation and demonstration.',
        'Participants must be prepared to answer technical questions from the judges.',
        'Projects should be original; plagiarism or copied projects may lead to disqualification.',
        'Evaluation will consider innovation, technical knowledge, working, presentation, practicality, and applications.',
        'The decision of the judges will be final and binding.'
      ],
      coordinators: 'Final Year Coordinators: V. Vasanth & K. Nilavarasan (Contact: 6380147597)'
    },

    'tech-talks': {
      id: 'tech-talks',
      title: 'Tech Talks - Paper Presentation',
      category: 'TECHNICAL',
      tagline: 'Technical paper presentation: original research, methodology & technical defense.',
      teamSize: 'Maximum of 3 Members per Team',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/CH47uMaYucJnEYnh9',
      about: 'Paper Presentation provides a platform to present original technical papers related to engineering themes. Teams present their topic, methodology, key findings, and applications using PowerPoint slides before faculty judges.',
      rules: [
        'Team Formation: Each team can have a maximum of 3 members. A participant may be part of only one team for the event. Each team should nominate one member as the team representative.',
        'Paper Submission: The paper should be original and related to the announced event theme or approved technical topic, submitted within the announced deadline.',
        'Presentation Material: Presentation material should clearly mention the title, team members, department/institution, and contact details where required.',
        'Presentation Rules: Each team must present its paper within the time limit fixed by the organizers.',
        'All three members should participate in the presentation or discussion as directed by the coordinators.',
        'Visual Aids: Presentations should be prepared using suitable visual aids such as PowerPoint slides, diagrams, charts, or illustrations. Participants should explain the topic clearly, confidently, and technically.',
        'Presentation Content: Should include the problem/topic statement, objectives, methodology or working principle, key findings, applications, advantages/limitations, and conclusion, as applicable.',
        'References & Originality: Sources and references used for the paper should be acknowledged. Plagiarism, copied content, or misrepresentation of another person\'s work is not permitted.',
        'Discipline: Participants must report to the venue before their allotted presentation time and follow instructions of the event coordinator and judges.',
        'Mobile phones should be kept on silent mode during other teams\' presentations. Any form of misconduct or disruption may lead to disqualification.',
        'The decision of the judges/event committee will be final.'
      ],
      coordinators: 'Event Coordinator: P Sam (Phone: 8072445991)'
    },

    'electrical-quiz': {
      id: 'electrical-quiz',
      title: 'VoltIQ - Electrical Quiz',
      category: 'TECHNICAL',
      tagline: 'Multi-round technical challenge across electrical, electronics, IoT & technology.',
      teamSize: 'Teams of 2–3 participants',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/p9wSTWrmBbdNZTvz5',
      about: 'VoltIQ - Electrical Quiz is an exhilarating battle of technical acumen and engineering intellect. Spanning multiple competitive rounds, teams test their grasp of fundamental concepts, electrical and electronics engineering, recent technologies, IoT, programming, and general technology.',
      rules: [
        'The quiz will be conducted in teams of 2–3 participants.',
        'Participants must register before the event and report to the venue on time.',
        'The quiz will consist of multiple rounds, such as Round 1, Round 2, and Round 3.',
        'Questions will be based on technical and engineering-related topics, including basic concepts, recent technologies, electronics, electrical engineering, IoT, programming, and general technology.',
        'No mobile phones, smartwatches, calculators, or other electronic devices are allowed during the quiz unless permitted by the organizers.',
        'In the event of a tie, a tie-breaker round will be conducted.',
        'The quiz master\'s decision regarding answers and scoring will be final.',
        'Participants must maintain discipline and fair play throughout the event.',
        'Any form of cheating, discussion with other teams, or misconduct may result in disqualification.',
        'The organizers reserve the right to modify the rules or format if necessary.'
      ],
      coordinators: 'Final Year Coordinators: Nandhini. R & Nilavarasan. K (Contact: 6380147597)'
    },

    'circuit-connection': {
      id: 'circuit-connection',
      title: 'Wire & Fire - Circuit Connection',
      category: 'TECHNICAL',
      tagline: 'Breadboard wiring, fault debugging, and oscilloscope verification.',
      teamSize: '2 Participants per Team',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/cJxiaqEQPj8RHrvx8',
      about: 'Put your hands-on laboratory expertise to the test. Participants must identify the given circuit and complete the connections correctly following the circuit diagram and instructions provided.',
      rules: [
        'Participants must register before the event begins.',
        'Each team can consist of 2 participants.',
        'Participants must report to the venue 15 minutes before the event starts.',
        'The circuit and components will be provided by the organizers.',
        'Participants must identify the given circuit and complete the connections correctly.',
        'Participants are required to follow the circuit diagram/instructions provided by the coordinators.',
        'Participants must handle all electrical and electronic components carefully.',
        'Any intentional damage to components or equipment will lead to disqualification.',
        'Participants are not allowed to use mobile phones or external references during the event.',
        'Only the components provided by the organizers may be used.',
        'The circuit will be tested by the event coordinators after completion.',
        'Time limit: As announced by the event coordinators.',
        'The winner will be decided based on correctness, completion time, and proper circuit operation.',
        'The decision of the judges/coordinators will be final and binding.',
        'Participants must maintain discipline and follow the instructions given by the coordinators.'
      ],
      coordinators: 'Final Year Coordinators: Lokesh. V & Nilavarasan. K (Contact: 6380147597)'
    },

    'reasoning': {
      id: 'reasoning',
      title: 'MindSparK - Reasoning',
      category: 'TECHNICAL',
      tagline: 'Quantitative logic, analytical deduction, and boolean puzzle solving.',
      teamSize: '1 – 2 Participants per Team',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/CQPyEm4K9VABnbbK9',
      about: 'An intellectual reasoning and logical thinking showdown to test your mental agility, pattern sequencing, and technical problem-solving ability under timed conditions.',
      rules: [
        'Participants must register before the event begins.',
        'The event will consist of reasoning and logical thinking-based questions.',
        'Participants must report to the venue 15 minutes before the event starts.',
        'The questions will be provided by the event coordinators.',
        'Participants must answer all questions within the allotted time.',
        'Participants must use only the materials permitted by the organizers.',
        'Mobile phones, calculators, internet access, or external references are not allowed unless specifically permitted by the coordinators.',
        'Any form of malpractice or unfair assistance will lead to disqualification.',
        'Participants must maintain discipline and follow the instructions given by the coordinators.',
        'Answers must be submitted before the end of the allotted time.',
        'The winner will be decided based on accuracy and, where applicable, the time taken to complete the event.',
        'In case of a tie, a tie-breaker round may be conducted.',
        'The decision of the judges/coordinators will be final and binding.'
      ],
      coordinators: 'Final Year Coordinators: Sridhar. E & Nilavarasan. K (Contact: +91 63814 40367)'
    },

    // --- 5 NON-TECHNICAL EVENTS ---
    'ipl-auction': {
      id: 'ipl-auction',
      title: 'IPL Auction',
      category: 'NON-TECHNICAL',
      tagline: 'Virtual cricket franchise bidding, 100 Cr purse, and squad strategy.',
      teamSize: '3 Members per Team',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/nk9uCWPJWWf5om8o9',
      about: 'Step into the franchise boardroom! Each 3-member team represents an IPL franchise equipped with a 100 Crore virtual purse. Strategize player valuations, outbid rival franchises, and construct a balanced 11-player championship squad within budget.',
      rules: [
        'Team Formation: Each team must consist of 3 members.',
        'Franchises: A total of 10 IPL franchise teams will participate in the auction.',
        'Auction Purse: Every team will be provided with a virtual auction purse of 100 Crore.',
        'Auction Process: The auctioneer will announce a player along with their base price. Teams may place bids higher than the current bid amount.',
        'Winning Bid: The highest valid bidder at the end of the bidding process will secure the player. The auctioneer reserves the right to control the bidding process and declare the winning bid.',
        'Squad Composition: Each team must build a squad of 11 players by the end of the auction.',
        'Overseas Limit: A maximum of 4 overseas players can be included in a team\'s squad. Teams are responsible for ensuring that their squad meets all composition requirements.',
        'Budget Rules: No team may bid an amount greater than its remaining budget. Teams must manage their auction purse carefully to complete their squad within the allocated budget. Any bid exceeding the available budget will be considered invalid.',
        'Player Allocation: Once a player is successfully purchased by a team, the player cannot be transferred, exchanged, or sold to another team.',
        'Unsold Players: If no team places a bid for a player, the player will be declared Unsold.',
        'Fair Play & Conduct: All participants must maintain fair play and sportsmanship throughout the event. Any attempt to disrupt the auction process may result in disqualification at the organizers\' discretion.',
        'Final Authority: In the event of any dispute, confusion, or rule interpretation, the auctioneer\'s decision shall be final and binding on all teams.',
        'Note: Teams that fail to complete their 11-player squad within the available budget may face penalties or be considered ineligible, as decided by the organizers.'
      ],
      coordinators: 'Event Coordinator: Sridhar R (Phone: 6383286993)'
    },

    'twisted-tiles': {
      id: 'twisted-tiles',
      title: 'Twisted Tiles - Bioscope',
      category: 'NON-TECHNICAL',
      tagline: 'Bioscope clue identification challenge: decode clues, pictures & videos in teams.',
      teamSize: 'Group Participant (4 members)',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/tJYsGsHNm4jdid3S9',
      about: 'Bioscope is a fun team game where participants identify answers from simple clues, pictures, or videos. It tests their thinking, memory, and teamwork skills. The team with the highest score wins the game.',
      rules: [
        'Participants must be present on time.',
        'Each team must follow the given team size (4 members).',
        'Discuss the clues only within the team.',
        'No mobile phones or outside help are allowed.',
        'Each question has a limited time.',
        'Correct answers will get points.',
        'The team with the highest score wins.',
        'The decision of the organizers will be final.'
      ],
      coordinators: 'Final Year Coordinators: Dhivyadharshini .S (6381162853) & Divya .D (8072943416)'
    },

    'yes-miss': {
      id: 'yes-miss',
      title: 'Yes or Miss',
      category: 'NON-TECHNICAL',
      tagline: 'The rapid-fire interrogative test: identify the correct statement in 10s.',
      teamSize: 'Individual Participant (Solo)',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/SkzmvLM4qeBHRMGx8',
      about: 'The host will read two statements at a time. Out of the two statements, only one statement will be correct. The participant must identify the correct statement within the given time by saying "Statement 1" or "Statement 2".',
      rules: [
        'The host will read two statements at a time.',
        'Out of the two statements, only one statement will be correct.',
        'The participant must identify the correct statement within the given time.',
        'The participant can answer by saying “Statement 1” or “Statement 2.”',
        'Each participant will be given 10 seconds to answer.',
        'If the participant gives the correct answer, one point will be awarded.',
        'If the answer is wrong or not given within the time limit, no point will be awarded.',
        'Participants are not allowed to change their answer after giving it.',
        'No discussion, hints, or help from the audience or other participants is allowed.',
        'The host/judges\' decision will be final.',
        'The participant with the highest score at the end of the game will be declared the winner.'
      ],
      coordinators: 'Final Year Coordinators: R. Yogeshwari (8778193215) & P. Shanmugapriyan (8838424711)'
    },

    'battle-ground': {
      id: 'battle-ground',
      title: 'Free Fire: Battle Ground',
      category: 'NON-TECHNICAL',
      tagline: 'Play Fair • Get Booyah • Be The Winner!',
      teamSize: 'Squad',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/qwuJhBkYwyiirtn1A',
      about: 'Official Free Fire championship. Mode: BR / CR based on the number of participants. Bring your esports squad to the arena, demonstrate clutch combat, and claim the Booyah!',
      rules: [
        'Team Size: Squad.',
        'Mode: BR / CR – Based on the number of participants.',
        'Players must join the match on time.',
        'No hacks, cheats or unfair gameplay.',
        'Respect all players and event coordinators.',
        'Follow the instructions given by the event coordinators.',
        'Any rule violation may lead to disqualification.',
        'The decision of the event coordinators will be final.',
        'Winner Declaration: Whoever gets the Booyah first will be declared the winner.'
      ],
      coordinators: 'Event Coordinators: Veenus Harini R V (8778073667) & Ganesh Kumar G (8015394683)'
    },

    'act-and-guess': {
      id: 'act-and-guess',
      title: 'Dumb C (Act & Guess)',
      category: 'NON-TECHNICAL',
      tagline: 'DUMB C - Act, Guess & Win!',
      teamSize: '2 Members per Team (Duo)',
      venue: 'TBA',
      timing: 'TBA',
      formUrl: 'https://forms.gle/sSPDKn3LPCD1Em1x6',
      about: 'DUMB C is a fun-filled action and guessing game. One participant will enact a given word, movie or concept through actions without speaking, while the teammate guesses the correct answer within time. It is full of fun, entertainment and teamwork!',
      rules: [
        'Each team must have 2 members - one actor, one guesser.',
        'No speaking, writing, or lip-sync while acting.',
        'Only actions and gestures are allowed.',
        'Each team gets 60 seconds per word to guess.',
        '5 words will be given per team.',
        'Highest number of correct guesses wins.',
        'Judge\'s decision will be final.'
      ],
      coordinators: 'Final Year Coordinators: Pragadeeswari P (8072428861) & Sridhar E (6381440367)'
    }
  };

  const EVENT_KEYS = Object.keys(EVENTS_DATA);
  let modalEventIndex = 0;


  /* ==========================================================================
     4. Countdown Timer Engine (Target: 23 October 2026, 09:00:00 IST)
     ========================================================================== */
  const countdownGrid = document.getElementById('countdown-grid');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  if (countdownGrid && cdDays && cdHours && cdMinutes && cdSeconds) {
    const targetDateStr = countdownGrid.dataset.target || '2026-10-23T09:00:00+05:30';
    const targetTime = new Date(targetDateStr).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        cdDays.textContent = '00';
        cdHours.textContent = '00';
        cdMinutes.textContent = '00';
        cdSeconds.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      cdDays.textContent = String(days).padStart(2, '0');
      cdHours.textContent = String(hours).padStart(2, '0');
      cdMinutes.textContent = String(minutes).padStart(2, '0');
      cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ==========================================================================
     5. Navigation & Scroll Effects
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });


  /* ==========================================================================
     6. Event Details Modal Engine
     ========================================================================== */
  const eventDetailsModal = document.getElementById('event-details-modal');
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

  function populateEventDetails(eventObj) {
    if (!eventObj) return;

    if (modalTitle) modalTitle.textContent = eventObj.title;
    if (modalTagline) modalTagline.textContent = eventObj.tagline;
    if (modalCategory) {
      modalCategory.textContent = eventObj.category;
      modalCategory.className = 'badge-cat';
    }
    if (modalTeamSize) modalTeamSize.textContent = eventObj.teamSize;
    if (modalAbout) modalAbout.textContent = eventObj.about;
    if (modalVenue) modalVenue.textContent = eventObj.venue;
    if (modalTiming) modalTiming.textContent = eventObj.timing;
    if (modalCoordinators) modalCoordinators.textContent = eventObj.coordinators;

    if (modalRules) {
      modalRules.innerHTML = '';
      eventObj.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        modalRules.appendChild(li);
      });
    }

    if (modalRegisterBtn) {
      modalRegisterBtn.href = eventObj.formUrl || '#';
      modalRegisterBtn.target = '_blank';
      modalRegisterBtn.rel = 'noopener noreferrer';
    }
  }

  function openEventDetailsModal(eventId) {
    const idx = EVENT_KEYS.indexOf(eventId);
    if (idx !== -1) {
      modalEventIndex = idx;
    }
    const eventObj = EVENTS_DATA[EVENT_KEYS[modalEventIndex]];
    if (eventObj) {
      populateEventDetails(eventObj);
      openModal(eventDetailsModal);
    }
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      modalEventIndex = (modalEventIndex - 1 + EVENT_KEYS.length) % EVENT_KEYS.length;
      populateEventDetails(EVENTS_DATA[EVENT_KEYS[modalEventIndex]]);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      modalEventIndex = (modalEventIndex + 1) % EVENT_KEYS.length;
      populateEventDetails(EVENTS_DATA[EVENT_KEYS[modalEventIndex]]);
    });
  }

  // Bind all "View Rules" buttons
  document.querySelectorAll('.spec-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventId = e.currentTarget.dataset.eventId;
      if (eventId) openEventDetailsModal(eventId);
    });
  });

  function openModal(el) {
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(el) {
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn && eventDetailsModal) {
    modalCloseBtn.addEventListener('click', () => closeModal(eventDetailsModal));
  }

  if (eventDetailsModal) {
    eventDetailsModal.addEventListener('click', (e) => {
      if (e.target === eventDetailsModal) closeModal(eventDetailsModal);
    });
  }


  /* ==========================================================================
     7. Toast Notification System
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ==========================================================================
     8. Select Event Modal Engine (Triggered by Navbar & Hero REGISTER NOW)
     ========================================================================== */
  const selectEventModal = document.getElementById('select-event-modal');
  const selectModalCloseBtn = document.getElementById('select-modal-close-btn');
  const selectModalDoneBtn = document.getElementById('select-modal-done-btn');
  const navRegTrigger = document.getElementById('nav-reg-trigger');
  const mobileRegTrigger = document.getElementById('mobile-reg-trigger');
  const heroRegisterBtn = document.getElementById('hero-register-btn');
  const navRegLink = document.getElementById('nav-reg-link');
  const mobileRegLink = document.getElementById('mobile-reg-link');

  function openSelectEventModal() {
    if (selectEventModal) {
      openModal(selectEventModal);
    }
  }

  if (navRegTrigger) {
    navRegTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openSelectEventModal();
    });
  }

  if (mobileRegTrigger) {
    mobileRegTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      openSelectEventModal();
    });
  }

  if (heroRegisterBtn) {
    heroRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSelectEventModal();
    });
  }

  if (navRegLink) {
    navRegLink.addEventListener('click', (e) => {
      e.preventDefault();
      openSelectEventModal();
    });
  }

  if (mobileRegLink) {
    mobileRegLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      openSelectEventModal();
    });
  }

  if (selectModalCloseBtn && selectEventModal) {
    selectModalCloseBtn.addEventListener('click', () => closeModal(selectEventModal));
  }

  if (selectModalDoneBtn && selectEventModal) {
    selectModalDoneBtn.addEventListener('click', () => closeModal(selectEventModal));
  }

  if (selectEventModal) {
    selectEventModal.addEventListener('click', (e) => {
      if (e.target === selectEventModal) closeModal(selectEventModal);
    });
  }

  // Filter tabs inside the Select Event Modal
  const filterBtns = document.querySelectorAll('.select-filter-btn');
  const eventCards = document.querySelectorAll('.select-event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;
      eventCards.forEach(card => {
        if (filterVal === 'all' || card.dataset.category === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (eventDetailsModal && eventDetailsModal.classList.contains('open')) {
        closeModal(eventDetailsModal);
      }
      if (selectEventModal && selectEventModal.classList.contains('open')) {
        closeModal(selectEventModal);
      }
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

});
