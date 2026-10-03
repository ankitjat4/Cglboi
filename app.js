/**
 * ============================================================================
 * SSC CGL INTELLIGENCE OS â€” CORE ENGINE (ARCHITECTURE V5.1)
 * Master Application Controller â€” PART 1 OF 4
 * Architecture: Mobile-First WebAPK / Local-First PWA | IndexedDB Engine (v15)
 * Candidate: Ankit Kumar (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)
 * ============================================================================
 */

// Immediate Global Registration to prevent reference errors across script lifecycles
window.CGL_OS = window.CGL_OS || {};

const CGL_OS = (() => {
    /* ==========================================================================
   * SECTION 1: PURE-ASCII CONTEXTUAL AUTO-HEALER & DOM SWEEPER
   * ========================================================================== */
  function cleanMojibake(str) {
    if (!str || typeof str !== 'string') return str;
    let s = str;

    // 1. Contextual Action Healers (immune to corrupted quotes/spaces/bytes)
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\u0027\u00A5\uFFFD\s]*Export/g, '\uD83D\uDCE5 Export'); // 📥 Export
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\u0027\u00A5\uFFFD\s]*Re-attempt/g, '\uD83D\uDD01 Re-attempt'); // 🔁 Re-attempt
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\u0027\uFFFD\s]*(Submit Final Section)/g, '\uD83D\uDD12 $1'); // 🔒 Submit Final Section
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\u0027\uFFFD\s]*(End Section Early)/g, '\uD83D\uDD12 $1'); // 🔒 End Section Early
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\u0027\uFFFD\s]*(Lock &amp; Submit|Lock & Submit|End &amp; Advance|End & Advance)/g, '\uD83D\uDD12 $1'); // 🔒 Lock ...
    s = s.replace(/[\u00E2\u008F\u00B3\uFFFD\s]*English/g, (m) => m.includes('\u00E2') ? '\u23F3 English' : m); // ⏳ English
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\uFFFD\s]*Solve/g, '\u26A1 Solve'); // ⚡ Solve
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\uFFFD\s]*Drill/g, (m) => (m.includes('\u00F0') || m.includes('\u00E2')) ? '\u26A1 Drill' : m); // ⚡ Drill
    s = s.replace(/[\u00F0\u00E2\u00C2\u0178\u201D\u2019\uFFFD\s]*(Browse Sheets|Sheet:)/g, '\uD83D\uDCD6 $1'); // 📖 Browse Sheets / Sheet:
    s = s.replace(/[\u00E2\u201C\u2713\uFFFD\s]*CORRECT/g, '\u2713 CORRECT'); // ✓ CORRECT
    s = s.replace(/[\u00E2\u2014\u2717\uFFFD\s]*INCORRECT/g, '\u2717 INCORRECT'); // ✗ INCORRECT
    s = s.replace(/[\u00E2\u26AA\uFFFD\s]*UNATTEMPTED/g, '\u26AA UNATTEMPTED'); // ⚪ UNATTEMPTED
    s = s.replace(/[\u00E2\u201C\u2713\uFFFD\s]*(Valid Calculated Risk)/g, '\u2713 $1'); // ✓ Valid Calculated Risk
    s = s.replace(/[\u00E2\u201C\u2713\uFFFD\s]*(Zero weak chapters)/g, '\u2713 $1'); // ✓ Zero weak chapters

    // 2. Direct Pure-ASCII Symbol Equivalents
    s = s.replace(/\u00E2\u0161\u00A1/g, '\u26A1'); // ⚡
    s = s.replace(/\u00E2\u2021\u201E/g, '\u21C4'); // ⇄
    s = s.replace(/\u00E2\u0153\u2022/g, '\u2715'); // ✕
    s = s.replace(/\u00E2\u2013\u00BC/g, '\u25BC'); // ▼
    s = s.replace(/\u00E2\u2013\u00B2/g, '\u25B2'); // ▲
    s = s.replace(/\u00C2\u20AC\u00A2|\u00E2\u20AC\u00A2|\u00E2\u00A0\u00A2/g, '\u2022'); // •
    s = s.replace(/\u00E2\u017E\u201D/g, '\u2794'); // ➔
    s = s.replace(/\u00E2\u20AC\u201D/g, '\u2014'); // —
    s = s.replace(/\u00C2\u0161/g, '');             // Âš artifact

    // 3. Fallback Isolated Corrupt Sequences
    s = s.replace(/\u00F0\u0178[\u201D\u2019\u0027]{1,3}/g, '\uD83D\uDD12'); // 🔒
    s = s.replace(/\u00F0\u0178\u0094\u0092|\u00F0\u0178\u201D\u0092/g, '\uD83D\uDD12'); // 🔒
    s = s.replace(/\u00F0\u0178\u0178\u00A2/g, '\uD83D\uDFE2'); // 🟢
    s = s.replace(/\u00F0\u0178\u201D\u00B4/g, '\uD83D\uDD34'); // 🔴
    s = s.replace(/\u00F0\u0178\u0178\u00A1/g, '\uD83D\uDFE1'); // 🟡
    s = s.replace(/\u00F0\u0178\u0178\u00A0/g, '\uD83D\uDFE0'); // 🟠
    s = s.replace(/\u00F0\u0178\u0178\u00A3/g, '\uD83D\uDFE3'); // 🟣
    s = s.replace(/\u00F0\u0178\u201C\u0152/g, '\uD83D\uDCCC'); // 📌
    s = s.replace(/\u00F0\u0178\u201C\u2013/g, '\uD83D\uDCD6'); // 📖
    s = s.replace(/\u00F0\u0178\u201D\uFFFD/g, '\uD83D\uDD01'); // 🔁
    s = s.replace(/\u00F0\u0178\u2014\u2018/g, '\uD83D\uDDD1'); // 🗑
    s = s.replace(/\u00E2\u008F\u00B3|\u00E2\u00A0\u00B3/g, '\u23F3'); // ⏳
    s = s.replace(/\u00E2\u0161\u00AA/g, '\u26AA'); // ⚪

    return s;
  }

  // Active DOM Node Sanitizer
  function sweepMojibake(rootNode) {
    if (!rootNode) return;
    const walker = document.createTreeWalker(rootNode, 4 /* SHOW_TEXT */, null, false);
    let textNode;
    while ((textNode = walker.nextNode())) {
      if (textNode.nodeValue && /[\u00F0\u00E2\u00C2]/.test(textNode.nodeValue)) {
        const fixed = cleanMojibake(textNode.nodeValue);
        if (fixed !== textNode.nodeValue) textNode.nodeValue = fixed;
      }
    }
  }

  // Persistent Mutation Observer + Active DOM Sweep
  if (typeof window !== 'undefined' && window.MutationObserver) {
    const mojibakeObserver = new MutationObserver(mutations => {
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type === 'characterData' && m.target) {
          if (/[\u00F0\u00E2\u00C2]/.test(m.target.nodeValue)) {
            const fixed = cleanMojibake(m.target.nodeValue);
            if (fixed !== m.target.nodeValue) m.target.nodeValue = fixed;
          }
        } else if (m.type === 'childList') {
          for (let j = 0; j < m.addedNodes.length; j++) {
            sweepMojibake(m.addedNodes[j]);
          }
        }
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      mojibakeObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
      sweepMojibake(document.body);
      setInterval(() => sweepMojibake(document.body), 1500);
    });
  }

  function safeBind(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener(event, handler);
      return true;
    }
    return false;
  }

  function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = (text === undefined || text === null) ? "" : cleanMojibake(String(text));
  }

  function safeSetHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = (html === undefined || html === null) ? "" : cleanMojibake(String(html));
  }

  function safeSetValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = (val === undefined || val === null) ? "" : val;
  }

  function safeSetDisplay(id, displayStyle) {
    const el = document.getElementById(id);
    if (el) el.style.display = displayStyle;
  }

  function safeGetElement(id) {
    return document.getElementById(id);
  }

  /* ==========================================================================
   * SECTION 2: RESILIENT 3-TIER DOWNLOAD PIPELINE (WEBAPK / WEBVIEW SHIELD)
   * Tier 1: Native Web Share API (navigator.share with File payload)
   * Tier 2: Base64 Data URI programmatic download link
   * Tier 3: On-screen copy modal buffer with 1-click clipboard transfer
   * ========================================================================== */
  let fallbackDownloadPayload = "";

  async function downloadFileResilient(filename, mimeType, contentString) {
    // TIER 1: Native Web Share API (Preferred for Android WebAPKs / Chrome PWAs)
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([contentString], filename, { type: mimeType });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: filename,
            text: `SSC CGL Intelligence OS Data Export: ${filename}`
          });
          return { method: "SHARE_API", success: true };
        }
      } catch (shareErr) {
        if (shareErr.name !== "AbortError") {
          console.warn("Native Web Share failed, falling back to Data URI:", shareErr);
        } else {
          return { method: "SHARE_ABORTED", success: false };
        }
      }
    }

    // TIER 2: Base64 Data URI Programmatic Download Link
    try {
      const base64Encoded = btoa(unescape(encodeURIComponent(contentString)));
      const dataUri = `data:${mimeType};base64,${base64Encoded}`;
      const anchor = document.createElement("a");
      anchor.href = dataUri;
      anchor.download = filename;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return { method: "DATA_URI", success: true };
    } catch (uriErr) {
      console.warn("Base64 Data URI download failed, opening Tier 3 buffer:", uriErr);
    }

    // TIER 3: On-Screen Textarea Modal Buffer
    fallbackDownloadPayload = contentString;
    safeSetText("download-fallback-title", `File: ${filename}`);
    safeSetValue("download-fallback-text", contentString);
    const modal = document.getElementById("modal-download-fallback");
    if (modal) {
      modal.classList.add("active");
      pushHistoryState("modal-download-fallback");
    }
    return { method: "MODAL_FALLBACK", success: true };
  }

  function copyDownloadFallbackToClipboard() {
    const textarea = document.getElementById("download-fallback-text");
    if (!textarea) return;
    textarea.select();
    navigator.clipboard.writeText(textarea.value)
      .then(() => alert("Export payload copied directly to clipboard!"))
      .catch(() => alert("Select all and copy manually from text box."));
  }

  /* ==========================================================================
   * SECTION 3: UNIVERSAL ENGAGEMENT & ACTIVE STUDY TIME TELEMETRY TRACKER
   * Accumulates live active study time across Dojo, Practice Lab, Living
   * Compendium, and Vault with a strict 60-second idle cutoff.
   * ========================================================================== */
  let activeStudyTimeSeconds = 0;
  let lastUserInteractionEpoch = Date.now();
  let universalEngagementInterval = null;
  const IDLE_CUTOFF_MS = 60000; // 60 seconds

  function initUniversalEngagementTracker() {
    const registerInteraction = () => {
      lastUserInteractionEpoch = Date.now();
    };

    window.addEventListener("pointerdown", registerInteraction, { passive: true });
    window.addEventListener("keydown", registerInteraction, { passive: true });
    window.addEventListener("scroll", registerInteraction, { passive: true });

    if (universalEngagementInterval) clearInterval(universalEngagementInterval);

    universalEngagementInterval = setInterval(async () => {
      const now = Date.now();
      // Only count active time if an active mock is NOT already ticking its own clock
      const isExamRunning = activeExam && !activeExam.isPaused && !activeExam.isReviewMode;
      if (!isExamRunning && (now - lastUserInteractionEpoch < IDLE_CUTOFF_MS)) {
        activeStudyTimeSeconds++;
        // Periodic sync to IndexedDB store_config every 30 seconds
        if (activeStudyTimeSeconds % 30 === 0) {
          await persistEngagementTelemetry();
        }
      }
    }, 1000);
  }

  async function persistEngagementTelemetry() {
    try {
      const currentStored = await getRecord("store_config", "telemetry_active_study_time_sec");
      const baseSec = currentStored && typeof currentStored.value === "number" ? currentStored.value : 0;
      await putRecord("store_config", {
        key: "telemetry_active_study_time_sec",
        value: baseSec + 30
      });
    } catch (e) {
      // Non-blocking telemetry sync
    }
  }

  /* ==========================================================================
   * SECTION 4: CONSTANTS, DB CONFIG & RUNTIME EXECUTION STATE
   * ========================================================================== */
  const DB_NAME = "cgl_os_db";
  const DB_VERSION = 16;
  let db = null;
  let dbInitPromise = null;

  // Active Timed Exam & Review Arena State
  let activeExam = null;
  let examTimerInterval = null;
  let questionTimerInterval = null;
  let dojoExam = null;
  let activeReviewAttempt = null;

  // Practice Lab / Question Control Center State & Pagination
  let practiceSearchQuery = "";
  let practiceSelectedIds = new Set();
  let practiceActiveQuickFilter = "ALL";
  let practiceCurrentPage = 1;
  const PRACTICE_PAGE_SIZE = 25;

  // Granular Multi-Chapter Matrix State in Mock Lab
  let mockLabSelectedMatrixChapters = new Set();

  // Full-Screen Living Compendium Studio State
  let activeCompSubject = "QA";
  let activeCompChapter = "QA_PERCENTAGE";
  let activeCompSheetIndex = 0;
  let currentCompSheets = [];
  let currentConceptImageBase64 = "";

  // Universal Flashcard Vault State (Tab 4)
  let currentFcFrontImgBase64 = "";
  let currentFcBackImgBase64 = "";
  let activeVaultDeck = [];
  let activeVaultIndex = 0;
  let activeVaultFlipped = false;
  let vaultSearchQuery = "";
  let vaultActiveTag = "ALL";

  // Synapse Knowledge Explorer State
  let synapseTreeBuilt = false;
  let synapseCurrentLevel = "SUBJECTS";
  let synapseActiveSubject = null;
  let synapseActiveChapter = null;

  // Interactive Cognitive Trap Clinic & Disaster Recovery
  let activeClinicTrapType = "TIME_TRAP_Q4";
  let activeClinicQuestions = [];
  let pendingHydrationData = null;

  // Native Question GUI Creator State
  let currentQuestionImageBase64 = "";

  // Standard Cognitive Trap Classifications
  let customMistakeTags = [
    "CALCULATION_SLIP",
    "READING_TRAP",
    "FORMULA_AMNESIA",
    "CONCEPT_VOID",
    "RUSHED_PANIC",
    "TIME_TRAP_Q4",
    "SECOND_GUESS_BLUNDER",
    "SPEED_MISREAD",
    "VALID_CALCULATED_RISK"
  ];

  /* ==========================================================================
   * SECTION 5: CANONICAL INITIAL TAXONOMY SEED & ATOMIC PASSAGE BANK
   * ========================================================================== */
  const DEFAULT_TAXONOMY = {
    QA: {
      name: "Quantitative Aptitude",
      order: 1,
      chapters: [
        "QA_PERCENTAGE",
        "QA_PROFIT_LOSS",
        "QA_DISCOUNT",
        "QA_SI_CI",
        "QA_SI_CI_INSTALLMENT",
        "QA_RATIO_PROP",
        "QA_AGE",
        "QA_PARTNERSHIP",
        "QA_AVERAGE",
        "QA_MIXTURE_ALLIGATION",
        "QA_TIME_WORK",
        "QA_WORK_WAGES",
        "QA_PIPE_CISTERN",
        "QA_SPEED_DIST",
        "QA_BOAT_STREAM",
        "QA_RACE",
        "QA_NUM_SYS",
        "QA_SEQUENCE_SERIES",
        "QA_SIMPLIFICATION",
        "QA_SURDS_INDICES",
        "QA_LCM_HCF",
        "QA_ALGEBRA",
        "QA_GEOMETRY",
        "QA_MENSURATION",
        "QA_TRIGONOMETRY"
      ]
    },
    REAS: {
      name: "General Intelligence & Reasoning",
      order: 2,
      chapters: [
        "REAS_ANALOGY",
        "REAS_SERIES",
        "REAS_CODING",
        "REAS_BLOOD_REL",
        "REAS_SYLLOGISM",
        "REAS_ORDER_RANK",
        "REAS_FIGURES",
        "REAS_DICE_CUBE",
        "REAS_CLOCK_CALENDAR",
        "REAS_VENN",
        "REAS_DIRECTION"
      ]
    },
    ENG: {
      name: "English Comprehension",
      order: 3,
      chapters: [
        "ENG_SYN_ANT",
        "ENG_OWS",
        "ENG_IDIOMS",
        "ENG_SPOTTING",
        "ENG_IMPROVE",
        "ENG_ACTIVE_PASS",
        "ENG_DIRECT_INDR",
        "ENG_CLOZE_TEST",
        "ENG_READING_COMP",
        "ENG_PARAJUMBLES"
      ]
    },
    GA: {
      name: "General Awareness",
      order: 4,
      chapters: [
        "GA_POLITY",
        "GA_HISTORY_MOD",
        "GA_HISTORY_ANC",
        "GA_HISTORY_MED",
        "GA_GEOGRAPHY_IN",
        "GA_GEOGRAPHY_WORLD",
        "GA_ECONOMY",
        "GA_PHYSICS",
        "GA_CHEMISTRY",
        "GA_BIOLOGY",
        "GA_STATIC_GK",
        "GA_CA_ANNUAL"
      ]
    }
  };

  // Authoritative Runtime Taxonomy Cache
  let TAXONOMY = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY));

  // Foundational Pre-Seeded Question Bank with Passage-Set Schema
  const SEED_QUESTIONS = [
    {
      id: "q_cgl_ga_polity_014",
      subject: "GA",
      chapter: "GA_POLITY",
      subtopic: "Judiciary",
      method: "Constitutional Articles",
      parentPassageId: null,
      passageText: "",
      setOrder: 1,
      setTotal: 1,
      conceptId: "top_ga_polity_judiciary",
      conceptIds: ["top_ga_polity_judiciary"],
      questionText: "Which Article of the Constitution of India provides for the establishment and constitution of the Supreme Court of India?",
      imageUrl: "",
      options: ["Article 124", "Article 131", "Article 214", "Article 143"],
      correctIndex: 0,
      explanation: "Article 124 establishes the Supreme Court of India, detailing its composition, appointment of judges, and jurisdictional authority.",
      source: "PYQ Tier-1",
      tags: ["Polity", "SupremeCourt", "Articles"],
      annotation: ""
    },
    {
      id: "q_cgl_qa_geom_011",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      subtopic: "Circles",
      method: "Cyclic Quadrilateral Angles",
      parentPassageId: null,
      passageText: "",
      setOrder: 1,
      setTotal: 1,
      conceptId: "top_qa_geo_circles",
      conceptIds: ["top_qa_geo_circles", "top_qa_geo_triangles"],
      questionText: "In a cyclic quadrilateral $ABCD$, opposite angles $\\angle A$ and $\\angle C$ satisfy $\\angle A = (2x + 10)^\\circ$ and $\\angle C = (3x + 20)^\\circ$. What is the measure of $\\angle A$?",
      imageUrl: "",
      options: ["$60^\\circ$", "$70^\\circ$", "$80^\\circ$", "$75^\\circ$"],
      correctIndex: 1,
      explanation: "Opposite angles sum to $180^\\circ$: $(2x + 10) + (3x + 20) = 180 \\implies 5x + 30 = 180 \\implies 5x = 150 \\implies x = 30^\\circ$. Therefore, $\\angle A = 2(30) + 10 = 70^\\circ$.",
      source: "PYQ Tier-1",
      tags: ["Geometry", "CyclicQuadrilateral", "Formula"],
      annotation: ""
    },
    {
      id: "q_cgl_eng_rc_001",
      subject: "ENG",
      chapter: "ENG_READING_COMP",
      subtopic: "Central Idea & Theme",
      method: "Inference & Fact Extraction",
      parentPassageId: "psg_cgl_rc_demo",
      passageText: "The Indian monsoon is not merely a weather pattern; it is the economic pulse of the subcontinent. Over 50 percent of India's arable land depends entirely on rainfed irrigation. A normal monsoon cushions rural demand, restrains food inflation, and stabilizes fiscal balances. However, climate variability has intensified erratic precipitation events, resulting in localized droughts juxtaposed with urban cloudbursts, severely straining reservoir replenishment infrastructure.",
      setOrder: 1,
      setTotal: 2,
      conceptId: "",
      conceptIds: [],
      questionText: "According to the passage, what is the primary macroeconomic hazard of erratic monsoon precipitation?",
      imageUrl: "",
      options: [
        "Uncontrollable urban industrial migration",
        "Food inflation spikes and fiscal balance instability",
        "Total shutdown of dryland irrigation systems",
        "Permanent depletion of continental groundwater tables"
      ],
      correctIndex: 1,
      explanation: "The text directly states that normal monsoons restrain food inflation and stabilize fiscal balances; erratic monsoons compromise these cushions.",
      source: "PYQ Tier-1 Mock Archetype",
      tags: ["RC", "Inference", "PassageSet"],
      annotation: ""
    },
    {
      id: "q_cgl_eng_rc_002",
      subject: "ENG",
      chapter: "ENG_READING_COMP",
      subtopic: "Vocabulary in Context",
      method: "Contextual Synonym",
      parentPassageId: "psg_cgl_rc_demo",
      passageText: "The Indian monsoon is not merely a weather pattern; it is the economic pulse of the subcontinent. Over 50 percent of India's arable land depends entirely on rainfed irrigation. A normal monsoon cushions rural demand, restrains food inflation, and stabilizes fiscal balances. However, climate variability has intensified erratic precipitation events, resulting in localized droughts juxtaposed with urban cloudbursts, severely straining reservoir replenishment infrastructure.",
      setOrder: 2,
      setTotal: 2,
      conceptId: "",
      conceptIds: [],
      questionText: "What does the word **'juxtaposed'** most nearly mean in the context of the passage?",
      imageUrl: "",
      options: [
        "Replaced consecutively in time",
        "Placed closely together to show contrast",
        "Suppressed by overarching meteorological forces",
        "Dispersed uniformly across geographical territories"
      ],
      correctIndex: 1,
      explanation: "Juxtaposed means placing contrasting elements side-by-side (here, localized droughts side-by-side with urban cloudbursts).",
      source: "PYQ Tier-1 Mock Archetype",
      tags: ["RC", "Vocabulary", "PassageSet"],
      annotation: ""
    },
    {
      id: "q_cgl_qa_tw_010",
      subject: "QA",
      chapter: "QA_PIPE_CISTERN",
      subtopic: "Pipes & Cisterns",
      method: "Combined Rate of Flow",
      parentPassageId: null,
      passageText: "",
      setOrder: 1,
      setTotal: 1,
      conceptId: "",
      conceptIds: [],
      questionText: "Pipe $A$ fills a tank in $12\\text{ hours}$ and Pipe $B$ fills it in $18\\text{ hours}$. If both are opened simultaneously, in how many hours will the tank be full?",
      imageUrl: "",
      options: ["$7.2\\text{ hours}$", "$7.5\\text{ hours}$", "$8.0\\text{ hours}$", "$6.8\\text{ hours}$"],
      correctIndex: 0,
      explanation: "Combined rate $= \\frac{1}{12} + \\frac{1}{18} = \\frac{5}{36}\\text{ tank/hour}$. Total time $= \\frac{36}{5} = 7.2\\text{ hours}$.",
      source: "PYQ Tier-1",
      tags: ["Pipes", "CombinedRate"],
      annotation: ""
    },
    {
      id: "q_cgl_reas_analogy_012",
      subject: "REAS",
      chapter: "REAS_ANALOGY",
      subtopic: "Number Analogy",
      method: "n(n + 1) Product Form",
      parentPassageId: null,
      passageText: "",
      setOrder: 1,
      setTotal: 1,
      conceptId: "",
      conceptIds: [],
      questionText: "Select the related number: **$14 : 210 :: 18 : \\underline{\\quad ? \\quad}$**",
      imageUrl: "",
      options: ["$324$", "$342$", "$360$", "$306$"],
      correctIndex: 1,
      explanation: "Pattern: $n : n(n + 1)$. Here, $14 \\times 15 = 210$. Similarly, $18 \\times 19 = 342$.",
      source: "PYQ Tier-1",
      tags: ["Reasoning", "Analogy"],
      annotation: ""
    },
    {
      id: "q_qa_geom_002",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      subtopic: "Triangles & Incenters",
      method: "Internal Angle Bisector Angle",
      parentPassageId: null,
      passageText: "",
      setOrder: 1,
      setTotal: 1,
      conceptId: "top_qa_geo_triangles",
      conceptIds: ["top_qa_geo_triangles"],
      questionText: "In $\\triangle ABC$, the bisectors of $\\angle B$ and $\\angle C$ intersect at point $I$ inside the triangle. If $\\angle BAC = 68^\\circ$, find the measure of $\\angle BIC$.",
      imageUrl: "",
      options: ["$124^\\circ$", "$136^\\circ$", "$112^\\circ$", "$146^\\circ$"],
      correctIndex: 0,
      explanation: "Incenter formula: $\\angle BIC = 90^\\circ + \\frac{\\angle A}{2} = 90^\\circ + 34^\\circ = 124^\\circ$.",
      source: "PYQ Tier-1",
      tags: ["Geometry", "Incenter", "Formula"],
      annotation: ""
    }
  ];

  // Pre-Seeded Topic Dossiers
  const SEED_TOPIC_DOSSIERS = [
    {
      id: "top_qa_geo_triangles",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      title: "Triangles & Incenters",
      subtitle: "Incenters, Circumcenters & Angle Bisectors",
      content: "### Internal Angle Bisector Theorem\nIf $AD$ bisects $\\angle A$ and meets $BC$ at $D$:\n$$\\frac{BD}{DC} = \\frac{AB}{AC}$$\n\n> [!formula]\n> **Incenter Angle Rule:**\n> The angle formed at the incenter $I$ satisfies:\n> $$\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}$$\n\n### Right-Angled Triangle Inradius\nFor legs $P, B$ and hypotenuse $H$:\n$$r = \\frac{P + B - H}{2}$$\n\n> [!trap]\n> **Critical TCS Trap:**\n> Always verify whether the problem asks for inradius $r$ or circumradius $R = \\frac{H}{2}$.",
      imageUrl: "",
      timestamp: Date.now()
    },
    {
      id: "top_qa_geo_circles",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      title: "Circles & Tangents",
      subtitle: "Secants, Power of Point & Tangent Lengths",
      content: "### Tangent-Secant Theorem (Power of a Point)\nFrom external point $P$, if $PT$ is tangent and $PAB$ is secant:\n$$PT^2 = PA \\cdot PB$$\n\n### Common Tangent Lengths\nFor radii $r_1, r_2$ and center separation $d$:\nâ€¢ **Direct Common Tangent (DCT):**\n$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$\nâ€¢ **Transverse Common Tangent (TCT):**\n$$TCT = \\sqrt{d^2 - (r_1 + r_2)^2}$$\n\n> [!trap]\n> **Externally Touching Circles:**\n> When $d = r_1 + r_2$, the transverse tangent drops to $0$ and $DCT = 2\\sqrt{r_1 r_2}$.",
      imageUrl: "",
      timestamp: Date.now()
    },
    {
      id: "top_ga_polity_judiciary",
      subject: "GA",
      chapter: "GA_POLITY",
      title: "Supreme Court & Writ Jurisdiction",
      subtitle: "Articles 32, 124, 131, 226",
      content: "### Constitutional Architecture\nâ€¢ **Article 124:** Establishment and constitution of the Supreme Court of India.\nâ€¢ **Article 131:** Original jurisdiction of the Supreme Court (Federal inter-state disputes).\nâ€¢ **Article 143:** Advisory jurisdiction on Presidential references.\nâ€¢ **Article 226:** High Courts writ jurisdiction for Fundamental and statutory rights.",
      imageUrl: "",
      timestamp: Date.now()
    }
  ];

  // Pre-Seeded Saved Mock Blueprints
  const SEED_SAVED_MOCKS = [
    {
      id: "bp_tier1_standard",
      type: "DYNAMIC_BLUEPRINT",
      title: "Tier 1 Standard Full Mock",
      isSectionLocked: true,
      selectionRule: { mode: "BALANCED", count: 100 },
      sections: [
        { id: 1, subject: "REAS", count: 25, durationMin: 15 },
        { id: 2, subject: "GA", count: 25, durationMin: 15 },
        { id: 3, subject: "QA", count: 25, durationMin: 15 },
        { id: 4, subject: "ENG", count: 25, durationMin: 15 }
      ],
      questions: null
    },
    {
      id: "bp_qa_speed_blitz",
      type: "DYNAMIC_BLUEPRINT",
      title: "QA Speed Blitz (25 Qs - 15 Mins)",
      isSectionLocked: false,
      selectionRule: { subject: "QA", mode: "RANDOM", count: 25 },
      sections: [
        { id: 1, subject: "QA", count: 25, durationMin: 15 }
      ],
      questions: null
    }
  ];

  // Pre-Seeded Flashcards
  const SEED_FLASHCARDS = [
    {
      id: "fc_qa_geo_001",
      cardType: "BASIC_EXTRA",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      front: "In $\\triangle ABC$ with incenter $I$, what is the formula for $\\angle BIC$ in terms of vertex angle $\\angle A$?",
      frontImageUrl: "",
      back: "$$\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}$$",
      backImageUrl: "",
      extra: "For excenter formed by external bisectors: $\\angle BEC = 90^\\circ - \\frac{\\angle A}{2}$.",
      tags: ["Formula", "Incenter", "Geometry"]
    },
    {
      id: "fc_qa_geo_002",
      cardType: "BASIC_EXTRA",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      front: "What is the length formula for a Direct Common Tangent ($DCT$) between two circles of radii $r_1, r_2$ and center separation $d$?",
      frontImageUrl: "",
      back: "$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$",
      backImageUrl: "",
      extra: "Transverse Common Tangent ($TCT$) uses $(r_1 + r_2)^2$. $DCT$ is always strictly longer than $TCT$.",
      tags: ["Formula", "Circles", "Geometry"]
    },
    {
      id: "fc_ga_pol_001",
      cardType: "BASIC",
      subject: "GA",
      chapter: "GA_POLITY",
      front: "Which Article establishes and constitutes the Supreme Court of India?",
      frontImageUrl: "",
      back: "**Article 124** of the Constitution of India.",
      backImageUrl: "",
      extra: "Article 129 establishes SC as Court of Record. Article 131 defines Original Jurisdiction.",
      tags: ["Polity", "Articles", "Judiciary"]
    },
    {
      id: "fc_eng_ows_001",
      cardType: "CLOZE",
      subject: "ENG",
      chapter: "ENG_OWS",
      front: "A person who is unable to pay their debts is officially termed {{c1::insolvent}} or bankrupt.",
      frontImageUrl: "",
      back: "Synonym: Indigent, Bankrupt. Antonym: Solvent, Affluent.",
      backImageUrl: "",
      extra: "High-frequency in SSC CGL Tier 1 shifts.",
      tags: ["Vocabulary", "OWS"]
    }
  ];

  /* ==========================================================================
   * SECTION 6: DUAL-TEMPORAL & INDIAN STANDARD TIME (IST) UTILITIES
   * ========================================================================== */
  function formatISTDate(epochMs = Date.now()) {
    try {
      const d = new Date(epochMs);
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(d) + " IST";
    } catch (e) {
      return new Date(epochMs).toISOString();
    }
  }

  function getDiurnalSlot(epochMs = Date.now()) {
    try {
      const d = new Date(epochMs);
      const hours = parseInt(new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false
      }).format(d), 10);
      if (hours >= 4 && hours < 8) return "EARLY_MORNING";
      if (hours >= 8 && hours < 12) return "MORNING";
      if (hours >= 12 && hours < 17) return "AFTERNOON";
      if (hours >= 17 && hours < 21) return "EVENING";
      return "NIGHT";
    } catch (e) {
      return "DAY";
    }
  }

  function calcGapDays(timeRecent, timePrior) {
    if (!timePrior || timePrior === 0) return 0;
    return parseFloat((Math.abs(timeRecent - timePrior) / (1000 * 60 * 60 * 24)).toFixed(1));
  }

  /* ==========================================================================
   * SECTION 7: TYPESETTER, MULTI-LINE CALLOUTS & KATEX ISOLATION
   * ========================================================================== */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    // 1. Isolate LaTeX math into protected tokens so markdown and <br> cannot corrupt equations
    const mathTokens = [];
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      mathTokens.push({ display: true, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });
    out = out.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      mathTokens.push({ display: false, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });

    // 2. Multi-Line Callout Blocks (Support multi-line [!trap], [!formula], [!tip])
    out = out.replace(/(?:^|\n)>\s*\[!trap\]([^\n]*(?:\n>[^\n]*)*)/gi, (match, body) => {
      const cleanBody = body.replace(/^\s*>\s?/gm, "").trim();
      return `<div class="callout-box trap"><b>âš ï¸ Cognitive Trap:</b><br>${cleanBody}</div>`;
    });
    out = out.replace(/(?:^|\n)>\s*\[!formula\]([^\n]*(?:\n>[^\n]*)*)/gi, (match, body) => {
      const cleanBody = body.replace(/^\s*>\s?/gm, "").trim();
      return `<div class="callout-box formula"><b>âš¡ Formula / Identity:</b><br>${cleanBody}</div>`;
    });
    out = out.replace(/(?:^|\n)>\s*\[!tip\]([^\n]*(?:\n>[^\n]*)*)/gi, (match, body) => {
      const cleanBody = body.replace(/^\s*>\s?/gm, "").trim();
      return `<div class="callout-box"><b>ðŸ’¡ Tactical Tip:</b><br>${cleanBody}</div>`;
    });

    // 3. Headings with Anchors for Sheet TOC Generation
    out = out.replace(/^### (.*$)/gim, (match, title) => {
      const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h3 id="sec-${anchor}" class="comp-heading-h3" style="font-size:15px; font-weight:700; color:var(--accent-cyan); margin:12px 0 4px 0;">${title}</h3>`;
    });
    out = out.replace(/^## (.*$)/gim, (match, title) => {
      const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h2 id="sec-${anchor}" class="comp-heading-h2" style="font-size:17px; font-weight:800; color:#fff; margin:14px 0 6px 0;">${title}</h2>`;
    });
    out = out.replace(/^# (.*$)/gim, '<h1 class="comp-heading-h1" style="font-size:19px; font-weight:800; color:#fff; margin:16px 0 8px 0;">$1</h1>');
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 4. Assertions & Reasons
    out = out.replace(/(?:Assertion\s*\(?A\)?|Assertion\s*:)\s*([^\n]+)/gi, '<div class="q-assertion-box"><b>[A] Assertion:</b> $1</div>');
    out = out.replace(/(?:Reason\s*\(?R\)?|Reason\s*:)\s*([^\n]+)/gi, '<div class="q-reason-box"><b>[R] Reason:</b> $1</div>');

    // 5. Syllogisms & Structured Item Rows
    out = out.replace(/(?:Statements?\s*:)\s*([\s\S]+?)(?=(?:Conclusions?\s*:|Conclusions?|$))/i, (match, body) => {
      const items = body.split(/(?:\(\d+\)|\(\w+\)|\d+\.|\nâ€¢|\n-)/).map(s => s.trim()).filter(Boolean);
      const rows = items.map((item, idx) => `
        <div class="q-itemized-row">
          <span class="q-item-num">(${idx + 1})</span>
          <span>${item}</span>
        </div>
      `).join('');
      return `<div class="q-structured-block"><div class="q-block-header"><span>ðŸ“‹ Statements:</span></div>${rows}</div>`;
    });

    out = out.replace(/(?:Conclusions?\s*:)\s*([\s\S]+?)(?=(?:\n\n[A-Z]|Options?|$))/i, (match, body) => {
      const roman = ["I", "II", "III", "IV", "V", "VI"];
      const items = body.split(/(?:\(\d+\)|\(\w+\)|\[\w+\]|\d+\.|\nâ€¢|\n-)/).map(s => s.trim()).filter(Boolean);
      const rows = items.map((item, idx) => `
        <div class="q-itemized-row">
          <span class="q-item-num">[${roman[idx] || (idx + 1)}]</span>
          <span>${item}</span>
        </div>
      `).join('');
      return `<div class="q-structured-block" style="margin-top:6px;"><div class="q-block-header"><span style="color:var(--accent-purple-light);">ðŸŽ¯ Conclusions:</span></div>${rows}</div>`;
    });

    // 6. Responsive Markdown Tables
    out = out.replace(/(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, headerLine, alignLine, bodyLines) => {
      const headers = headerLine.trim().split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = bodyLines.trim().split('\n').map(row => {
        const cells = row.trim().split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="table-responsive"><table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // 7. Convert regular linebreaks to <br> outside math tokens
    out = out.replace(/\n/g, "<br>");

    // 8. Re-inject KaTeX math tokens safely
    out = out.replace(/___CGL_MATH_(\d+)___/g, (match, index) => {
      const item = mathTokens[Number(index)];
      if (!item) return "";
      if (window.katex) {
        try {
          return katex.renderToString(item.formula, {
            displayMode: item.display,
            throwOnError: false
          });
        } catch (err) {
          return item.display ? `$$${item.formula}$$` : `$${item.formula}$`;
        }
      }
      return item.display ? `$$${item.formula}$$` : `$${item.formula}$`;
    });

    return out;
  }

  function convertKatexToAnkiMathJax(str) {
    if (!str) return "";
    let out = String(str);
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, "\\[$1\\]");
    out = out.replace(/\$([^\$\n]+?)\$/g, "\\($1\\)");
    return out;
  }

  function compressImageFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxW = 900;
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.80));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // --- End of Part 1 of 4 ---
  /* ==========================================================================
   * SECTION 8: LIFO NAVIGATION STACK & MODAL LAYER ROUTER
   * ========================================================================== */
  const navStack = [];

  function pushNavLayer(layerId, closeFn) {
    const idx = navStack.findIndex(l => l.id === layerId);
    if (idx !== -1) navStack.splice(idx, 1);
    navStack.push({ id: layerId, close: closeFn });
    history.pushState({ layerId: layerId, depth: navStack.length }, "");
  }

  function popNavLayer() {
    if (navStack.length > 0) {
      const top = navStack.pop();
      if (top && typeof top.close === "function") {
        top.close();
      }
    }
  }

  function pushHistoryState(name) {
    pushNavLayer(name, () => {
      const el = document.getElementById(name);
      if (el) {
        if (el.classList.contains("modal-overlay")) el.classList.remove("active");
        else el.style.display = "none";
      }
    });
  }

  /* ==========================================================================
   * SECTION 9: HARDENED INDEXEDDB ENGINE (NON-DESTRUCTIVE RE-SEEDING)
   * ========================================================================== */
  function getDB() {
    if (db) return Promise.resolve(db);
    if (dbInitPromise) return dbInitPromise;

    dbInitPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onblocked = () => {
        console.warn("Database upgrade temporarily blocked. Closing pending connection.");
        if (db) { db.close(); db = null; }
      };

      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        const canonicalStores = [
          { name: "store_questions", key: "id" },
          { name: "store_attempts", key: "sessionId" },
          { name: "store_flashcards", key: "id" },
          { name: "store_concepts", key: "id" },
          { name: "store_notes", key: "id" },
          { name: "store_saved_mocks", key: "id" },
          { name: "store_ai_consultations", key: "id" },
          { name: "store_active_session", key: "id" },
          { name: "store_config", key: "key" }
        ];

        canonicalStores.forEach(s => {
          if (!d.objectStoreNames.contains(s.name)) {
            d.createObjectStore(s.name, { keyPath: s.key });
          }
        });

        // Migration from legacy store_vault to store_flashcards if present
        if (d.objectStoreNames.contains("store_vault") && d.objectStoreNames.contains("store_flashcards")) {
          try {
            const tx = e.target.transaction;
            const vaultStore = tx.objectStore("store_vault");
            const flashcardStore = tx.objectStore("store_flashcards");
            const getAllReq = vaultStore.getAll();
            getAllReq.onsuccess = () => {
              const records = getAllReq.result || [];
              records.forEach(v => {
                flashcardStore.put({
                  id: `fc_migrated_${v.questionId}`,
                  cardType: "BASIC_EXTRA",
                  subject: v.subject || "QA",
                  chapter: v.chapter || "QA_GENERAL",
                  front: `Vault Migrated Trap (${v.errorTag || 'UNCLASSIFIED'})`,
                  frontImageUrl: "",
                  back: `Question Reference ID: ${v.questionId}`,
                  backImageUrl: "",
                  extra: `Migrated error record: ${v.errorTag || 'UNCLASSIFIED'}`,
                  tags: ["MigratedVault", v.errorTag || "UNCLASSIFIED"]
                });
              });
            };
          } catch (migErr) {
            console.warn("Migration notice:", migErr);
          }
        }
      };

      req.onsuccess = async (e) => {
        db = e.target.result;
        db.onversionchange = () => {
          if (db) { db.close(); db = null; dbInitPromise = null; }
        };
        try {
          await seedData(db);
        } catch (err) {
          console.warn("Bootstrap notice:", err);
        }
        resolve(db);
      };

      req.onerror = () => {
        dbInitPromise = null;
        reject(req.error);
      };
    });

    return dbInitPromise;
  }

  // Unified Transaction Harness
  async function runTx(storeNames, mode, callback) {
    const database = await getDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(storeNames, mode);
      tx.oncomplete = () => resolve(true);
      tx.onerror = (e) => {
        console.error("runTx transaction error:", tx.error || e);
        reject(tx.error || e);
      };
      tx.onabort = (e) => {
        console.error("runTx transaction aborted:", tx.error || e);
        reject(tx.error || e);
      };
      try {
        callback(tx);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * SEED DATA ARCHITECTURAL GUARANTEE:
   * Do NOT re-merge DEFAULT_TAXONOMY into savedTaxonomyConfig.
   * If store_config.system_taxonomy already exists, it is the 100% authoritative master.
   * User deletions and modifications are strictly preserved.
   */
  async function seedData(database) {
    const d = database || await getDB();

    const existingCount = await new Promise((res) => {
      try {
        const tx = d.transaction(["store_questions"], "readonly");
        const countReq = tx.objectStore("store_questions").count();
        countReq.onsuccess = () => res(countReq.result || 0);
        countReq.onerror = () => res(0);
      } catch (e) { res(0); }
    });

    if (existingCount === 0) {
      await runTx(["store_questions", "store_concepts", "store_saved_mocks", "store_flashcards"], "readwrite", (tx) => {
        const stQ = tx.objectStore("store_questions");
        SEED_QUESTIONS.forEach(q => stQ.put(q));

        const stC = tx.objectStore("store_concepts");
        SEED_TOPIC_DOSSIERS.forEach(t => stC.put(t));

        const stB = tx.objectStore("store_saved_mocks");
        SEED_SAVED_MOCKS.forEach(b => stB.put(b));

        const stF = tx.objectStore("store_flashcards");
        SEED_FLASHCARDS.forEach(f => stF.put(f));
      });
    }

    const savedMistakeConfig = await getRecord("store_config", "custom_mistake_tags");
    if (savedMistakeConfig && Array.isArray(savedMistakeConfig.value)) {
      customMistakeTags = [...new Set([...customMistakeTags, ...savedMistakeConfig.value])];
    } else {
      await putRecord("store_config", { key: "custom_mistake_tags", value: customMistakeTags });
    }

    // Authoritative Taxonomy Check: Respect user deletions and modifications
    const savedTaxonomyConfig = await getRecord("store_config", "system_taxonomy");
    if (savedTaxonomyConfig && savedTaxonomyConfig.value && typeof savedTaxonomyConfig.value === "object") {
      TAXONOMY = savedTaxonomyConfig.value;
    } else {
      TAXONOMY = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY));
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
    }
  }

  async function getAllRecords(sName) {
    try {
      const d = await getDB();
      if (!d.objectStoreNames.contains(sName)) return [];
      return new Promise(res => {
        const tx = d.transaction([sName], "readonly");
        const req = tx.objectStore(sName).getAll();
        req.onsuccess = () => res(req.result || []);
        req.onerror = () => res([]);
      });
    } catch (e) { return []; }
  }

  async function getRecord(sName, key) {
    try {
      const d = await getDB();
      if (!d.objectStoreNames.contains(sName)) return null;
      return new Promise(res => {
        const tx = d.transaction([sName], "readonly");
        const req = tx.objectStore(sName).get(key);
        req.onsuccess = () => res(req.result || null);
        req.onerror = () => res(null);
      });
    } catch (e) { return null; }
  }

  async function putRecord(sName, record) {
    try {
      const cleanRecord = JSON.parse(JSON.stringify(record));
      return await runTx([sName], "readwrite", (tx) => {
        tx.objectStore(sName).put(cleanRecord);
      });
    } catch (e) {
      console.error(`Exception writing to ${sName}:`, e);
      return false;
    }
  }

  async function deleteRecordFromStore(sName, key) {
    try {
      return await runTx([sName], "readwrite", (tx) => {
        tx.objectStore(sName).delete(key);
      });
    } catch (e) { return false; }
  }

  async function clearStore(sName) {
    try {
      return await runTx([sName], "readwrite", (tx) => {
        tx.objectStore(sName).clear();
      });
    } catch (e) { return false; }
  }

  /* ==========================================================================
   * SECTION 10: FULL BACKUP, DISASTER RECOVERY & SANITIZERS
   * ========================================================================== */
  async function exportFullBackup() {
    const envelope = {
      cgl_os_envelope: {
        magic_header: "CGL_INTELLIGENCE_OS_BACKUP",
        engine_version: DB_VERSION,
        exported_at: Date.now(),
        exported_ist: formatISTDate(Date.now()),
        exported_date: new Date().toISOString()
      },
      stores: {
        store_questions: await getAllRecords("store_questions"),
        store_attempts: await getAllRecords("store_attempts"),
        store_flashcards: await getAllRecords("store_flashcards"),
        store_concepts: await getAllRecords("store_concepts"),
        store_notes: await getAllRecords("store_notes"),
        store_saved_mocks: await getAllRecords("store_saved_mocks"),
        store_ai_consultations: await getAllRecords("store_ai_consultations"),
        store_config: await getAllRecords("store_config")
      }
    };

    const filename = `cgl_os_backup_${Date.now()}.json`;
    await downloadFileResilient(filename, "application/json", JSON.stringify(envelope, null, 2));
  }

  function openBackupRestoreModal() {
    pendingHydrationData = null;
    safeSetValue("restore-backup-file-input", "");
    const execBtn = document.getElementById("btn-execute-restore");
    if (execBtn) execBtn.disabled = true;
    safeSetDisplay("restore-file-preview-stats", "none");
    pushHistoryState("modal-backup-restore");
    const m = document.getElementById("modal-backup-restore");
    if (m) m.classList.add("active");
  }

  function handleBackupFileSelect(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        pendingHydrationData = normalizeBackupStructure(parsed);

        const statsBox = document.getElementById("restore-file-preview-stats");
        if (statsBox) {
          statsBox.style.display = "block";
          statsBox.innerHTML = `
            <b>Backup File Validated:</b><br>
            â€¢ Questions: ${pendingHydrationData.store_questions.length}<br>
            â€¢ Attempts & Scores: ${pendingHydrationData.store_attempts.length}<br>
            â€¢ Flashcards: ${pendingHydrationData.store_flashcards.length}<br>
            â€¢ Living Knowledge Sheets: ${pendingHydrationData.store_concepts.length}<br>
            â€¢ Clinical AI Consultations: ${pendingHydrationData.store_ai_consultations.length}<br>
            â€¢ Saved Blueprints & Papers: ${pendingHydrationData.store_saved_mocks.length}
          `;
        }
        const execBtn = document.getElementById("btn-execute-restore");
        if (execBtn) execBtn.disabled = false;
      } catch (err) {
        alert("Corrupted Backup File: " + err.message);
        const execBtn = document.getElementById("btn-execute-restore");
        if (execBtn) execBtn.disabled = true;
      }
    };
    reader.readAsText(file);
  }

  function normalizeBackupStructure(raw) {
    let stores = {};
    if (raw.cgl_os_envelope && raw.stores) {
      stores = raw.stores;
    } else {
      stores.store_questions = raw.questions || raw.store_questions || [];
      stores.store_attempts = raw.attempts || raw.store_attempts || [];
      stores.store_flashcards = raw.flashcards || raw.store_flashcards || raw.vault || [];
      stores.store_concepts = raw.concepts || raw.formulas || raw.store_concepts || [];
      stores.store_notes = raw.notes || raw.store_notes || [];
      stores.store_saved_mocks = raw.savedMocks || raw.store_saved_mocks || [];
      stores.store_ai_consultations = raw.consultations || raw.store_ai_consultations || [];
      stores.store_config = raw.config || raw.store_config || [];
    }

    stores.store_questions = (stores.store_questions || []).map(sanitizeQuestion);
    stores.store_concepts = (stores.store_concepts || []).map(sanitizeDossier);
    stores.store_flashcards = (stores.store_flashcards || []).map(sanitizeFlashcard);
    stores.store_attempts = (stores.store_attempts || []).map(sanitizeAttempt);
    stores.store_saved_mocks = (stores.store_saved_mocks || []).map(sanitizeSavedMock);
    stores.store_ai_consultations = stores.store_ai_consultations || [];
    stores.store_notes = stores.store_notes || [];
    stores.store_config = stores.store_config || [];

    return stores;
  }

  function sanitizeQuestion(q, idx = 0) {
    let conceptIds = [];
    if (Array.isArray(q.conceptIds)) {
      conceptIds = q.conceptIds.map(s => String(s).trim()).filter(Boolean);
    } else if (q.conceptId && typeof q.conceptId === "string" && q.conceptId.trim().length > 0) {
      conceptIds = [q.conceptId.trim()];
    }

    return {
      id: q.id || `q_manual_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 5)}`,
      subject: q.subject || "QA",
      chapter: q.chapter || "QA_GENERAL",
      subtopic: q.subtopic || "",
      method: q.method || "",
      // Atomic Passage-Set Grouping Schema
      parentPassageId: q.parentPassageId || null,
      passageText: q.passageText || "",
      setOrder: typeof q.setOrder === "number" ? q.setOrder : 1,
      setTotal: typeof q.setTotal === "number" ? q.setTotal : 1,
      conceptId: conceptIds[0] || "",
      conceptIds: conceptIds,
      questionText: q.questionText || "",
      imageUrl: q.imageUrl || "",
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: (typeof q.correctIndex === "number" && q.correctIndex >= 0 && q.correctIndex <= 3) ? q.correctIndex : 0,
      explanation: q.explanation || "",
      source: q.source || "Manual Entry",
      difficulty: q.difficulty || "MEDIUM",
      tags: Array.isArray(q.tags) ? q.tags : ["Hydrated"],
      annotation: q.annotation || "",
      createdAt: q.createdAt || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeDossier(d, idx = 0) {
    return {
      id: d.id || `top_restored_${Date.now()}_${idx}`,
      subject: d.subject || "QA",
      chapter: d.chapter || "QA_GENERAL",
      title: d.title || d.word || "Untitled Topic",
      subtitle: d.subtitle || d.root || "",
      content: d.content || d.meaning || "",
      imageUrl: d.imageUrl || "",
      tags: Array.isArray(d.tags) ? d.tags : [],
      timestamp: d.timestamp || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeFlashcard(f, idx = 0) {
    return {
      id: f.id || `fc_restored_${Date.now()}_${idx}`,
      cardType: f.cardType || (f.extra ? "BASIC_EXTRA" : "BASIC"),
      subject: f.subject || "QA",
      chapter: f.chapter || "QA_GENERAL",
      front: f.front || f.questionText || "Untitled Prompt",
      frontImageUrl: f.frontImageUrl || "",
      back: f.back || f.explanation || "Untitled Answer",
      backImageUrl: f.backImageUrl || "",
      extra: f.extra || "",
      tags: Array.isArray(f.tags) ? f.tags : ["Restored"],
      createdAt: f.createdAt || Date.now()
    };
  }

  function sanitizeAttempt(a, idx = 0) {
    const epoch = a.timestamp || Date.now();
    return {
      sessionId: a.sessionId || `mock_${epoch}_${idx}`,
      parentSessionId: a.parentSessionId || null,
      attemptNumber: typeof a.attemptNumber === "number" ? a.attemptNumber : 1,
      title: a.title || "SSC CGL Practice Mock",
      timestamp: epoch,
      timeIST: a.timeIST || formatISTDate(epoch),
      diurnalSlot: a.diurnalSlot || getDiurnalSlot(epoch),
      mockType: a.mockType || "CUSTOM",
      signatureTag: a.signatureTag || "",
      finalScore: typeof a.finalScore === "number" ? a.finalScore : 0,
      correctCount: typeof a.correctCount === "number" ? a.correctCount : 0,
      incorrectCount: typeof a.incorrectCount === "number" ? a.incorrectCount : 0,
      q4Traps: typeof a.q4Traps === "number" ? a.q4Traps : 0,
      penaltyDrag: typeof a.penaltyDrag === "number" ? a.penaltyDrag : 0,
      switchDelta: typeof a.switchDelta === "number" ? a.switchDelta : 0,
      completed: a.completed !== undefined ? a.completed : true,
      isSectionLocked: !!a.isSectionLocked,
      questions: Array.isArray(a.questions) ? a.questions.map(sanitizeQuestion) : [],
      userResponses: (a.userResponses && typeof a.userResponses === "object") ? a.userResponses : {},
      sections: Array.isArray(a.sections) ? a.sections : []
    };
  }

  function sanitizeSavedMock(b, idx = 0) {
    return {
      id: b.id || `preset_${Date.now()}_${idx}`,
      type: b.type || (b.questions ? "FIXED_PAPER" : "DYNAMIC_BLUEPRINT"),
      title: b.title || `Saved Setup ${idx + 1}`,
      isSectionLocked: b.isSectionLocked !== undefined ? b.isSectionLocked : true,
      selectionRule: b.selectionRule || null,
      sections: Array.isArray(b.sections) ? b.sections : [{ id: 1, subject: "QA", count: 25, durationMin: 15 }],
      questions: Array.isArray(b.questions) ? b.questions.map(sanitizeQuestion) : null,
      createdAt: b.createdAt || Date.now(),
      updatedAt: Date.now()
    };
  }

  async function executeHydrationRestore() {
    if (!pendingHydrationData) return;
    const modeEl = document.getElementById("restore-hydration-mode");
    const mode = modeEl ? modeEl.value : "SAFE_MERGE";

    try {
      const storeKeys = [
        "store_questions", "store_attempts", "store_flashcards", 
        "store_concepts", "store_notes", "store_saved_mocks", 
        "store_ai_consultations", "store_config"
      ];

      if (mode === "WIPE_REPLACE") {
        for (const sName of storeKeys) {
          await clearStore(sName);
        }
      }

      for (const sName of storeKeys) {
        const items = pendingHydrationData[sName] || [];
        if (items.length > 0) {
          await runTx([sName], "readwrite", (tx) => {
            const st = tx.objectStore(sName);
            items.forEach(item => st.put(item));
          });
        }
      }

      alert("Disaster Recovery Complete! All records restored safely.");
      const modal = document.getElementById("modal-backup-restore");
      if (modal) modal.classList.remove("active");
      SearchService.invalidate();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
      await renderVault();
      if (typeof renderPracticeQuestionsTable === "function") {
        await renderPracticeQuestionsTable();
      }
    } catch (err) {
      alert("Hydration Error: " + err.message);
    }
  }

  /* ==========================================================================
   * SECTION 11: SHARED SERVICE â€” TAXONOMY SERVICE
   * Full User-Driven Taxonomy Control, Reassignment & Safe Chapter Merging
   * ========================================================================== */
  const TaxonomyService = {
    async getTaxonomy() {
      const rec = await getRecord("store_config", "system_taxonomy");
      if (rec && rec.value && typeof rec.value === "object") {
        TAXONOMY = rec.value;
      }
      return TAXONOMY;
    },

    async saveTaxonomy() {
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
      SearchService.invalidate();
      await syncAllTaxonomyDropdowns();
    },

    async addSubject(key, name) {
      const cleanKey = String(key).trim().toUpperCase().replace(/\s+/g, '_');
      const cleanName = String(name).trim();
      if (!cleanKey || !cleanName) throw new Error("Both Key and Full Name are required.");
      if (TAXONOMY[cleanKey]) throw new Error(`Subject ${cleanKey} already exists.`);

      const maxOrder = Math.max(0, ...Object.values(TAXONOMY).map(s => s.order || 0));
      TAXONOMY[cleanKey] = {
        name: cleanName,
        order: maxOrder + 1,
        chapters: [`${cleanKey}_GENERAL`]
      };
      await this.saveTaxonomy();
      return TAXONOMY[cleanKey];
    },

    async renameSubject(key, newName) {
      if (!TAXONOMY[key]) throw new Error(`Subject ${key} not found.`);
      TAXONOMY[key].name = String(newName).trim();
      await this.saveTaxonomy();
    },

    async deleteSubject(key) {
      if (!TAXONOMY[key]) throw new Error(`Subject ${key} not found.`);
      const allQs = await getAllRecords("store_questions");
      const qCount = allQs.filter(q => q.subject === key).length;
      const allConcepts = await getAllRecords("store_concepts");
      const cCount = allConcepts.filter(c => c.subject === key).length;

      if (qCount > 0 || cCount > 0) {
        throw new Error(`Cannot delete subject ${key}. It contains ${qCount} questions and ${cCount} sheets. Reassign them first.`);
      }

      delete TAXONOMY[key];
      await this.saveTaxonomy();
    },

    async addChapter(subKey, chapterName) {
      if (!TAXONOMY[subKey]) throw new Error(`Subject ${subKey} does not exist.`);
      const cleanChap = String(chapterName).trim().toUpperCase().replace(/\s+/g, '_');
      if (!cleanChap) throw new Error("Chapter name cannot be empty.");
      if (TAXONOMY[subKey].chapters.includes(cleanChap)) {
        throw new Error(`Chapter ${cleanChap} already exists in ${subKey}.`);
      }

      TAXONOMY[subKey].chapters.push(cleanChap);
      await this.saveTaxonomy();
      return cleanChap;
    },

    async renameChapter(subKey, oldChap, newChap) {
      if (!TAXONOMY[subKey]) throw new Error(`Subject ${subKey} does not exist.`);
      const cleanNew = String(newChap).trim().toUpperCase().replace(/\s+/g, '_');
      if (!cleanNew) throw new Error("New chapter name cannot be empty.");
      if (!TAXONOMY[subKey].chapters.includes(oldChap)) throw new Error(`Chapter ${oldChap} does not exist.`);

      const idx = TAXONOMY[subKey].chapters.indexOf(oldChap);
      TAXONOMY[subKey].chapters[idx] = cleanNew;
      await this.saveTaxonomy();

      await this.reassignChapterContent(subKey, oldChap, cleanNew);
    },

    async deleteChapter(subKey, chap, action = "PRESERVE_UNASSIGNED", targetChap = null) {
      if (!TAXONOMY[subKey]) throw new Error(`Subject ${subKey} does not exist.`);
      TAXONOMY[subKey].chapters = TAXONOMY[subKey].chapters.filter(c => c !== chap);
      await this.saveTaxonomy();

      if (action === "MERGE" && targetChap) {
        await this.reassignChapterContent(subKey, chap, targetChap);
      } else if (action === "PRESERVE_UNASSIGNED") {
        const unassignedChap = `${subKey}_UNASSIGNED`;
        if (!TAXONOMY[subKey].chapters.includes(unassignedChap)) {
          TAXONOMY[subKey].chapters.push(unassignedChap);
          await this.saveTaxonomy();
        }
        await this.reassignChapterContent(subKey, chap, unassignedChap);
      }
    },

    async mergeChapters(subKey, sourceChap, targetChap) {
      if (!TAXONOMY[subKey]) throw new Error(`Subject ${subKey} does not exist.`);
      if (!TAXONOMY[subKey].chapters.includes(targetChap)) {
        throw new Error(`Target chapter ${targetChap} does not exist in ${subKey}.`);
      }

      await this.reassignChapterContent(subKey, sourceChap, targetChap);
      TAXONOMY[subKey].chapters = TAXONOMY[subKey].chapters.filter(c => c !== sourceChap);
      await this.saveTaxonomy();
    },

    async reassignChapterContent(subKey, fromChap, toChap) {
      const allQs = await getAllRecords("store_questions");
      const affectedQs = allQs.filter(q => q.subject === subKey && q.chapter === fromChap);
      for (const q of affectedQs) {
        q.chapter = toChap;
        q.updatedAt = Date.now();
        await putRecord("store_questions", q);
      }

      const allConcepts = await getAllRecords("store_concepts");
      const affectedConcepts = allConcepts.filter(c => c.subject === subKey && c.chapter === fromChap);
      for (const c of affectedConcepts) {
        c.chapter = toChap;
        c.updatedAt = Date.now();
        await putRecord("store_concepts", c);
      }

      SearchService.invalidate();
    },

    async getOrphanedContent() {
      const allQs = await getAllRecords("store_questions");
      const allConcepts = await getAllRecords("store_concepts");
      const knownTaxonomy = await this.getTaxonomy();

      const orphans = { questions: [], concepts: [] };

      allQs.forEach(q => {
        if (!knownTaxonomy[q.subject] || !knownTaxonomy[q.subject].chapters.includes(q.chapter)) {
          orphans.questions.push(q);
        }
      });

      allConcepts.forEach(c => {
        if (!knownTaxonomy[c.subject] || !knownTaxonomy[c.subject].chapters.includes(c.chapter)) {
          orphans.concepts.push(c);
        }
      });

      return orphans;
    }
  };

  /* ==========================================================================
   * SECTION 12: SHARED SERVICE â€” QUESTION SERVICE
   * Full CRUD, Validation, Duplication & Atomic Passage-Set Grouping
   * ========================================================================== */
  const QuestionService = {
    generateId(subject = "QA") {
      const prefix = String(subject).toLowerCase();
      return `q_manual_${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    },

    validate(q) {
      if (!q.questionText || !String(q.questionText).trim()) {
        throw new Error("Question text cannot be empty.");
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error("Questions must contain exactly 4 options.");
      }
      if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex > 3) {
        throw new Error("A valid correct answer option (1-4) must be designated.");
      }
      if (!q.subject || !q.chapter) {
        throw new Error("Subject and Chapter tags are mandatory.");
      }
      return true;
    },

    async get(id) {
      return await getRecord("store_questions", id);
    },

    async getByPassageId(parentPassageId) {
      if (!parentPassageId) return [];
      const all = await getAllRecords("store_questions");
      return all
        .filter(q => q.parentPassageId === parentPassageId)
        .sort((a, b) => (a.setOrder || 1) - (b.setOrder || 1));
    },

    async create(questionData) {
      const sanitized = sanitizeQuestion(questionData);
      this.validate(sanitized);

      const existing = await getRecord("store_questions", sanitized.id);
      if (existing) {
        throw new Error(`A question with ID '${sanitized.id}' already exists.`);
      }

      await putRecord("store_questions", sanitized);
      SearchService.invalidate();
      return sanitized;
    },

    async update(id, questionData) {
      const existing = await getRecord("store_questions", id);
      if (!existing) throw new Error(`Question ${id} not found.`);

      const updated = sanitizeQuestion({ ...existing, ...questionData, id: id });
      this.validate(updated);

      await putRecord("store_questions", updated);
      SearchService.invalidate();
      return updated;
    },

    async delete(id) {
      const existing = await getRecord("store_questions", id);
      if (!existing) throw new Error(`Question ${id} not found.`);

      await deleteRecordFromStore("store_questions", id);
      SearchService.invalidate();
      return { id: id, deleted: true };
    },

    async duplicate(id) {
      const source = await getRecord("store_questions", id);
      if (!source) throw new Error(`Question ${id} not found.`);

      const clone = JSON.parse(JSON.stringify(source));
      clone.id = this.generateId(clone.subject);
      clone.source = `${source.source || 'Original'} (Variant)`;
      clone.annotation = `Cloned from ${id} on ${formatISTDate(Date.now())}`;
      clone.createdAt = Date.now();
      clone.updatedAt = Date.now();

      await putRecord("store_questions", clone);
      SearchService.invalidate();
      return clone;
    },

    async bulkCreate(questionsArray, provenance = "SOURCE") {
      if (!Array.isArray(questionsArray)) throw new Error("Expected array of questions.");
      const sanitizedList = questionsArray.map((q, idx) => {
        const item = sanitizeQuestion(q, idx);
        if (provenance) item.source = item.source || provenance;
        this.validate(item);
        return item;
      });

      await runTx(["store_questions"], "readwrite", (tx) => {
        const st = tx.objectStore("store_questions");
        sanitizedList.forEach(q => st.put(q));
      });

      SearchService.invalidate();
      return sanitizedList.length;
    }
  };

  /* ==========================================================================
   * SECTION 13: SHARED SERVICE â€” CONCEPT SERVICE (LIVING KNOWLEDGE STUDIO)
   * Sheet CRUD, In-Sheet TOC Generator & Question Discovery
   * ========================================================================== */
  const ConceptService = {
    async get(id) {
      return await getRecord("store_concepts", id);
    },

    async getAll() {
      return await getAllRecords("store_concepts");
    },

    async create(conceptData) {
      const sanitized = sanitizeDossier(conceptData);
      if (!sanitized.title.trim() || !sanitized.content.trim()) {
        throw new Error("Title and Markdown content are mandatory.");
      }
      await putRecord("store_concepts", sanitized);
      SearchService.invalidate();
      return sanitized;
    },

    async update(id, conceptData) {
      const existing = await getRecord("store_concepts", id);
      if (!existing) throw new Error(`Concept sheet ${id} not found.`);

      const updated = sanitizeDossier({ ...existing, ...conceptData, id: id });
      await putRecord("store_concepts", updated);
      SearchService.invalidate();
      return updated;
    },

    async delete(id) {
      await deleteRecordFromStore("store_concepts", id);
      SearchService.invalidate();
      return true;
    },

    async duplicate(id) {
      const source = await getRecord("store_concepts", id);
      if (!source) throw new Error(`Sheet ${id} not found.`);

      const clone = JSON.parse(JSON.stringify(source));
      clone.id = `top_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      clone.title = `${source.title} (Copy)`;
      clone.timestamp = Date.now();

      await putRecord("store_concepts", clone);
      SearchService.invalidate();
      return clone;
    },

    async getLinkedQuestions(conceptId, chapterFallback = null) {
      const allQs = await getAllRecords("store_questions");
      let linked = allQs.filter(q => 
        (Array.isArray(q.conceptIds) && q.conceptIds.includes(conceptId)) ||
        q.conceptId === conceptId
      );

      if (linked.length === 0 && chapterFallback) {
        linked = allQs.filter(q => q.chapter === chapterFallback);
      }
      return linked;
    },

    generateTOC(content) {
      if (!content) return [];
      const lines = content.split('\n');
      const toc = [];
      lines.forEach(line => {
        const h3 = line.match(/^###\s+(.+)$/);
        const h2 = line.match(/^##\s+(.+)$/);
        if (h3) {
          toc.push({ level: 3, title: h3[1].trim(), anchor: 'sec-' + h3[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') });
        } else if (h2) {
          toc.push({ level: 2, title: h2[1].trim(), anchor: 'sec-' + h2[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') });
        }
      });
      return toc;
    }
  };

  /* ==========================================================================
   * SECTION 14: SHARED SERVICE â€” SEARCH SERVICE
   * In-Memory Unified Search Engine across Questions, Sheets & Taxonomy
   * ========================================================================== */
  const SearchService = {
    cache: {
      questions: null,
      concepts: null,
      lastIndexed: 0
    },

    invalidate() {
      this.cache.questions = null;
      this.cache.concepts = null;
      this.cache.lastIndexed = 0;
    },

    async warmCache() {
      if (!this.cache.questions) {
        this.cache.questions = await getAllRecords("store_questions");
      }
      if (!this.cache.concepts) {
        this.cache.concepts = await getAllRecords("store_concepts");
      }
      this.cache.lastIndexed = Date.now();
    },

    async searchAll(queryStr, filters = {}, limit = 50) {
      await this.warmCache();
      const term = String(queryStr || "").trim().toLowerCase();

      const matchedQuestions = this.filterQuestions(this.cache.questions, term, filters).slice(0, limit);
      const matchedConcepts = this.filterConcepts(this.cache.concepts, term, filters).slice(0, limit);

      return {
        query: queryStr,
        totalQuestions: matchedQuestions.length,
        totalConcepts: matchedConcepts.length,
        questions: matchedQuestions,
        concepts: matchedConcepts
      };
    },

    filterQuestions(pool, term, filters) {
      return pool.filter(q => {
        if (filters.subject && filters.subject !== "ALL" && q.subject !== filters.subject) return false;
        if (filters.chapter && filters.chapter !== "ALL" && q.chapter !== filters.chapter) return false;
        if (filters.method && filters.method !== "ALL" && q.method !== filters.method) return false;
        if (filters.source && filters.source !== "ALL" && q.source !== filters.source) return false;
        if (filters.difficulty && filters.difficulty !== "ALL" && q.difficulty !== filters.difficulty) return false;

        if (term) {
          const inId = (q.id || "").toLowerCase().includes(term);
          const inText = (q.questionText || "").toLowerCase().includes(term);
          const inPassage = (q.passageText || "").toLowerCase().includes(term);
          const inExp = (q.explanation || "").toLowerCase().includes(term);
          const inSubtopic = (q.subtopic || "").toLowerCase().includes(term);
          const inMethod = (q.method || "").toLowerCase().includes(term);
          const inOpts = Array.isArray(q.options) && q.options.some(o => (o || "").toLowerCase().includes(term));
          const inTags = Array.isArray(q.tags) && q.tags.some(t => (t || "").toLowerCase().includes(term));
          if (!inId && !inText && !inPassage && !inExp && !inSubtopic && !inMethod && !inOpts && !inTags) return false;
        }

        return true;
      });
    },

    filterConcepts(pool, term, filters) {
      return pool.filter(c => {
        if (filters.subject && filters.subject !== "ALL" && c.subject !== filters.subject) return false;
        if (filters.chapter && filters.chapter !== "ALL" && c.chapter !== filters.chapter) return false;

        if (term) {
          const inTitle = (c.title || "").toLowerCase().includes(term);
          const inSub = (c.subtitle || "").toLowerCase().includes(term);
          const inContent = (c.content || "").toLowerCase().includes(term);
          const inChap = (c.chapter || "").toLowerCase().includes(term);
          if (!inTitle && !inSub && !inContent && !inChap) return false;
        }

        return true;
      });
    }
  };

  /* ==========================================================================
   * SECTION 15: DYNAMIC TAXONOMY & SELECTOR SYNCHRONIZER UI
   * ========================================================================== */
  async function syncAllTaxonomyDropdowns() {
    await TaxonomyService.getTaxonomy();
    const subKeys = Object.keys(TAXONOMY);

    const populateSelect = (elementId, includeAll = false) => {
      const el = document.getElementById(elementId);
      if (!el) return;
      const currentVal = el.value;
      el.innerHTML = "";

      if (includeAll) {
        const optAll = document.createElement("option");
        optAll.value = "ALL";
        optAll.innerText = "All Subjects";
        el.appendChild(optAll);
      }

      subKeys.forEach(k => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.innerText = `${TAXONOMY[k].name} (${k})`;
        el.appendChild(opt);
      });

      if (subKeys.includes(currentVal) || (includeAll && currentVal === "ALL")) {
        el.value = currentVal;
      } else if (subKeys.length > 0) {
        el.value = subKeys[0];
      }
    };

    populateSelect("dojo-nav-subject", false);
    populateSelect("comp-studio-subject-select", false);
    populateSelect("print-subject", true);
    populateSelect("concept-edit-subject", false);
    populateSelect("edit-q-subject", false);
    populateSelect("new-q-subject", false);
    populateSelect("edit-fc-subject", false);
    populateSelect("vault-deck-filter-sub", true);
    populateSelect("scoped-export-subject", true);
    populateSelect("anki-export-subject", true);
    populateSelect("practice-filter-subject", true);
    populateSelect("builder-subject", true);
    populateSelect("global-search-filter-sub", true);

    const dojoSub = document.getElementById("dojo-nav-subject");
    if (dojoSub) updateDojoChapters();
    const practiceSub = document.getElementById("practice-filter-subject");
    if (practiceSub) handlePracticeSubjectChange(practiceSub.value);
    const builderSub = document.getElementById("builder-subject");
    if (builderSub) updateBuilderChapters(builderSub.value);
    const newQSub = document.getElementById("new-q-subject");
    if (newQSub) syncNewQuestionChapterSelect(newQSub.value);
  }

  function openTaxonomyManagerModal() {
    renderTaxonomyManagerList();
    pushHistoryState("modal-taxonomy-manager");
    const m = document.getElementById("modal-taxonomy-manager");
    if (m) m.classList.add("active");
  }

  async function renderTaxonomyManagerList() {
    const container = document.getElementById("taxonomy-manager-list");
    if (!container) return;
    container.innerHTML = "";

    const allQs = await getAllRecords("store_questions");
    const allConcepts = await getAllRecords("store_concepts");

    Object.keys(TAXONOMY).forEach(subKey => {
      const sub = TAXONOMY[subKey];
      const div = document.createElement("div");
      div.className = "card";
      div.style.padding = "10px";
      div.style.marginBottom = "8px";

      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div>
            <b style="color:#fff; font-size:13px;">${sub.name}</b>
            <span class="badge" style="background:#1f6feb; margin-left:6px;">${subKey}</span>
          </div>
          <div style="display:flex; gap:4px;">
            <button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--accent-cyan);" onclick="CGL_OS.promptAddChapterToSubject('${subKey}')">+ Chapter</button>
            <button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--status-red);" onclick="CGL_OS.deleteSubjectAction('${subKey}')">Delete</button>
          </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:4px;">
          ${sub.chapters.map(c => {
            const qCount = allQs.filter(q => q.subject === subKey && q.chapter === c).length;
            const cCount = allConcepts.filter(t => t.subject === subKey && t.chapter === c).length;
            return `
              <span style="font-size:10.5px; font-family:var(--font-mono); background:var(--bg-elevated); border:1px solid var(--border-color); padding:3px 8px; border-radius:5px; display:inline-flex; align-items:center; gap:6px;">
                <span>${c} <small style="color:var(--accent-cyan);">(${qCount}Q/${cCount}S)</small></span>
                <span title="Merge or Reassign Chapter" style="cursor:pointer; color:var(--accent-cyan); font-weight:bold;" onclick="CGL_OS.openChapterMergeModal('${subKey}', '${c}')">â‡„</span>
                <span title="Delete Chapter" style="cursor:pointer; color:var(--status-red); opacity:0.7;" onclick="CGL_OS.deleteChapterFromSubject('${subKey}', '${c}')">âœ•</span>
              </span>
            `;
          }).join('')}
        </div>
      `;
      container.appendChild(div);
    });
  }

  async function addNewSubjectAction() {
    const keyInput = document.getElementById("new-sub-key");
    const nameInput = document.getElementById("new-sub-name");
    const key = keyInput ? keyInput.value.trim().toUpperCase().replace(/\s+/g, '_') : "";
    const name = nameInput ? nameInput.value.trim() : "";

    if (!key || !name) {
      alert("Both Key and Full Name are required.");
      return;
    }

    try {
      await TaxonomyService.addSubject(key, name);
      if (keyInput) keyInput.value = "";
      if (nameInput) nameInput.value = "";
      renderTaxonomyManagerList();
      await renderDashboard();
      await updateDojoChapters();
    } catch (err) {
      alert(err.message);
    }
  }

  async function promptAddChapterToSubject(subKey) {
    const chap = prompt(`Enter chapter tag for ${subKey} (e.g. ${subKey}_TOPIC):`);
    if (!chap || !chap.trim()) return;

    try {
      await TaxonomyService.addChapter(subKey, chap);
      renderTaxonomyManagerList();
      await renderDashboard();
      await updateDojoChapters();
    } catch (err) {
      alert(err.message);
    }
  }

  async function deleteChapterFromSubject(subKey, chap) {
    const allQs = await getAllRecords("store_questions");
    const qCount = allQs.filter(q => q.subject === subKey && q.chapter === chap).length;
    const allConcepts = await getAllRecords("store_concepts");
    const cCount = allConcepts.filter(c => c.subject === subKey && c.chapter === chap).length;

    if (qCount > 0 || cCount > 0) {
      const choice = confirm(`Chapter ${chap} contains ${qCount} questions and ${cCount} sheets.\n\nClick OK to preserve all content under ${subKey}_UNASSIGNED and remove the taxonomy entry.\nClick Cancel to keep the chapter.`);
      if (!choice) return;
      await TaxonomyService.deleteChapter(subKey, chap, "PRESERVE_UNASSIGNED");
    } else {
      if (confirm(`Remove empty chapter ${chap} from ${subKey}?`)) {
        await TaxonomyService.deleteChapter(subKey, chap, "PRESERVE_UNASSIGNED");
      }
    }

    renderTaxonomyManagerList();
    await renderDashboard();
    await updateDojoChapters();
  }

  async function openChapterMergeModal(subKey, sourceChap) {
    const targetChap = prompt(`Merge chapter ${sourceChap} into another chapter in ${subKey}.\nEnter exact TARGET chapter name:`);
    if (!targetChap || !targetChap.trim()) return;

    try {
      await TaxonomyService.mergeChapters(subKey, sourceChap, targetChap.trim().toUpperCase());
      alert(`Merged all questions and sheets from ${sourceChap} into ${targetChap.trim().toUpperCase()}.`);
      renderTaxonomyManagerList();
      await renderDashboard();
      await updateDojoChapters();
    } catch (err) {
      alert("Merge error: " + err.message);
    }
  }

  async function deleteSubjectAction(subKey) {
    try {
      if (confirm(`Permanently remove subject ${subKey}?`)) {
        await TaxonomyService.deleteSubject(subKey);
        renderTaxonomyManagerList();
        await renderDashboard();
        await updateDojoChapters();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  function syncEditorChapterDropdown(subKey) {
    const chapInput = document.getElementById("concept-edit-chapter");
    if (chapInput && TAXONOMY[subKey] && TAXONOMY[subKey].chapters.length > 0) {
      chapInput.value = TAXONOMY[subKey].chapters[0];
    }
  }

  function syncFlashcardChapterDropdown(subKey) {
    const chapInput = document.getElementById("edit-fc-chapter");
    if (chapInput && TAXONOMY[subKey] && TAXONOMY[subKey].chapters.length > 0) {
      chapInput.value = TAXONOMY[subKey].chapters[0];
    }
  }

  function syncNewQuestionChapterSelect(subKey) {
    const sel = document.getElementById("new-q-chapter");
    if (!sel || !TAXONOMY[subKey]) return;
    sel.innerHTML = "";
    TAXONOMY[subKey].chapters.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      sel.appendChild(opt);
    });
  }

  /* ==========================================================================
   * SECTION 16: NATIVE QUESTION GUI CREATOR & EDITOR CONTROLLERS
   * (Passage Grouping Support, Tag & Annotation Preservation Fixed)
   * ========================================================================== */
  function openNewQuestionCreatorModal(presetSub = null, presetChap = null) {
    currentQuestionImageBase64 = "";
    const sub = presetSub || (document.getElementById("practice-filter-subject")?.value !== "ALL" ? document.getElementById("practice-filter-subject")?.value : "QA");
    safeSetValue("new-q-subject", sub);
    syncNewQuestionChapterSelect(sub);
    if (presetChap) safeSetValue("new-q-chapter", presetChap);

    safeSetValue("new-q-subtopic", "");
    safeSetValue("new-q-method", "");
    safeSetValue("new-q-difficulty", "MEDIUM");
    safeSetValue("new-q-parent-passage-id", "");
    safeSetValue("new-q-set-order", "");
    safeSetValue("new-q-set-total", "");
    safeSetValue("new-q-passage-text", "");
    safeSetValue("new-q-text", "");
    safeSetValue("new-q-img-url", "");
    safeSetValue("new-q-img-file", "");
    safeSetDisplay("new-q-img-preview-box", "none");
    safeSetValue("new-q-opt-0", "");
    safeSetValue("new-q-opt-1", "");
    safeSetValue("new-q-opt-2", "");
    safeSetValue("new-q-opt-3", "");
    safeSetValue("new-q-correct", "0");
    safeSetValue("new-q-source", "Manual Entry");
    safeSetValue("new-q-explanation", "");
    safeSetValue("new-q-tags", "");
    safeSetValue("new-q-concepts", "");

    pushHistoryState("modal-new-question-creator");
    const m = document.getElementById("modal-new-question-creator");
    if (m) m.classList.add("active");
  }

  async function handleNewQuestionImageUpload(input) {
    if (input.files && input.files[0]) {
      currentQuestionImageBase64 = await compressImageFile(input.files[0]);
      const pBox = document.getElementById("new-q-img-preview-box");
      if (pBox) {
        pBox.style.display = "block";
        pBox.innerHTML = `<img src="${currentQuestionImageBase64}" style="max-height:120px; border-radius:6px; border:1px solid var(--border-color);">`;
      }
    }
  }

  async function submitNewQuestionCreator(keepOpen = false) {
    const sub = document.getElementById("new-q-subject")?.value || "QA";
    const chap = document.getElementById("new-q-chapter")?.value || "QA_PERCENTAGE";
    const text = document.getElementById("new-q-text")?.value.trim() || "";
    const opt0 = document.getElementById("new-q-opt-0")?.value.trim() || "";
    const opt1 = document.getElementById("new-q-opt-1")?.value.trim() || "";
    const opt2 = document.getElementById("new-q-opt-2")?.value.trim() || "";
    const opt3 = document.getElementById("new-q-opt-3")?.value.trim() || "";
    const correctIdx = parseInt(document.getElementById("new-q-correct")?.value || "0", 10);
    const rawConcepts = document.getElementById("new-q-concepts")?.value.trim() || "";
    const parsedConcepts = rawConcepts.split(",").map(s => s.trim()).filter(Boolean);

    const parentPassageId = document.getElementById("new-q-parent-passage-id")?.value.trim() || null;
    const passageText = document.getElementById("new-q-passage-text")?.value.trim() || "";
    const setOrder = parseInt(document.getElementById("new-q-set-order")?.value || "1", 10) || 1;
    const setTotal = parseInt(document.getElementById("new-q-set-total")?.value || "1", 10) || 1;

    if (!text || !opt0 || !opt1 || !opt2 || !opt3) {
      alert("Question stem and all 4 options are mandatory.");
      return;
    }

    const qObj = {
      id: QuestionService.generateId(sub),
      subject: sub,
      chapter: chap,
      subtopic: document.getElementById("new-q-subtopic")?.value.trim() || "",
      method: document.getElementById("new-q-method")?.value.trim() || "",
      difficulty: document.getElementById("new-q-difficulty")?.value || "MEDIUM",
      parentPassageId: parentPassageId,
      passageText: passageText,
      setOrder: setOrder,
      setTotal: setTotal,
      conceptId: parsedConcepts[0] || "",
      conceptIds: parsedConcepts,
      questionText: text,
      imageUrl: currentQuestionImageBase64 || document.getElementById("new-q-img-url")?.value.trim() || "",
      options: [opt0, opt1, opt2, opt3],
      correctIndex: correctIdx,
      explanation: document.getElementById("new-q-explanation")?.value.trim() || "",
      source: document.getElementById("new-q-source")?.value.trim() || "Manual Entry",
      tags: (document.getElementById("new-q-tags")?.value || "").split(",").map(s => s.trim()).filter(Boolean),
      annotation: ""
    };

    try {
      await QuestionService.create(qObj);
      alert(`Question created successfully: ${qObj.id}`);
      await renderDashboard();
      if (typeof renderPracticeQuestionsTable === "function") {
        await renderPracticeQuestionsTable();
      }

      if (keepOpen) {
        safeSetValue("new-q-text", "");
        safeSetValue("new-q-img-url", "");
        safeSetValue("new-q-img-file", "");
        safeSetDisplay("new-q-img-preview-box", "none");
        currentQuestionImageBase64 = "";
        safeSetValue("new-q-opt-0", "");
        safeSetValue("new-q-opt-1", "");
        safeSetValue("new-q-opt-2", "");
        safeSetValue("new-q-opt-3", "");
        safeSetValue("new-q-explanation", "");
        // If part of passage set, increment setOrder
        if (parentPassageId) {
          safeSetValue("new-q-set-order", setOrder + 1);
        }
      } else {
        const m = document.getElementById("modal-new-question-creator");
        if (m) m.classList.remove("active");
      }
    } catch (err) {
      alert("Creation Error: " + err.message);
    }
  }

  function openEditQuestionModal(qData = null, presetSub = null, presetChap = null) {
    if (!qData) {
      openNewQuestionCreatorModal(presetSub, presetChap);
      return;
    }

    currentQuestionImageBase64 = "";
    safeSetText("editor-title", `Edit Question (${qData.id})`);
    safeSetValue("edit-q-id", qData.id);

    const subSelect = document.getElementById("edit-q-subject");
    if (subSelect) subSelect.value = qData.subject;

    safeSetValue("edit-q-chapter", qData.chapter);
    safeSetValue("edit-q-subtopic", qData.subtopic || "");
    safeSetValue("edit-q-method", qData.method || "");
    safeSetValue("edit-q-source", qData.source || "Manual Entry");

    safeSetValue("edit-q-parent-passage-id", qData.parentPassageId || "");
    safeSetValue("edit-q-set-order", qData.setOrder || "1");
    safeSetValue("edit-q-set-total", qData.setTotal || "1");
    safeSetValue("edit-q-passage-text", qData.passageText || "");

    const cIds = (Array.isArray(qData.conceptIds) && qData.conceptIds.length > 0)
      ? qData.conceptIds.join(", ")
      : (qData.conceptId || "");
    safeSetValue("edit-q-concept-ids", cIds);

    safeSetValue("edit-q-text", qData.questionText);
    safeSetValue("edit-q-img-url", qData.imageUrl || "");
    safeSetValue("edit-q-img-file", "");

    safeSetValue("edit-opt-0", qData.options[0] || "");
    safeSetValue("edit-opt-1", qData.options[1] || "");
    safeSetValue("edit-opt-2", qData.options[2] || "");
    safeSetValue("edit-opt-3", qData.options[3] || "");

    safeSetValue("edit-q-correct", qData.correctIndex || 0);
    safeSetValue("edit-q-explanation", qData.explanation || "");

    safeSetDisplay("btn-delete-q", "block");
    safeSetDisplay("btn-dup-q", "block");

    pushHistoryState("modal-question-editor");
    const m = document.getElementById("modal-question-editor");
    if (m) m.classList.add("active");
  }

  function openEditCurrentDojoQuestion() {
    if (!dojoExam) return;
    openEditQuestionModal(dojoExam.questions[dojoExam.currentIndex]);
  }

  async function handleQuestionImageUpload(input) {
    if (input.files && input.files[0]) {
      currentQuestionImageBase64 = await compressImageFile(input.files[0]);
    }
  }

  async function saveQuestionEditor() {
    const id = document.getElementById("edit-q-id")?.value.trim() || "";
    const urlInput = document.getElementById("edit-q-img-url")?.value.trim() || "";
    const rawConceptIds = document.getElementById("edit-q-concept-ids")?.value.trim() || "";
    const parsedConceptIds = rawConceptIds.split(",").map(s => s.trim()).filter(Boolean);

    const existing = await QuestionService.get(id);

    const qObj = {
      id: id,
      subject: document.getElementById("edit-q-subject")?.value || (existing ? existing.subject : "QA"),
      chapter: (document.getElementById("edit-q-chapter")?.value || (existing ? existing.chapter : "QA_PERCENTAGE")).trim().toUpperCase(),
      subtopic: document.getElementById("edit-q-subtopic")?.value.trim() || "",
      method: document.getElementById("edit-q-method")?.value.trim() || "",
      parentPassageId: document.getElementById("edit-q-parent-passage-id")?.value.trim() || null,
      passageText: document.getElementById("edit-q-passage-text")?.value.trim() || "",
      setOrder: parseInt(document.getElementById("edit-q-set-order")?.value || "1", 10) || 1,
      setTotal: parseInt(document.getElementById("edit-q-set-total")?.value || "1", 10) || 1,
      conceptId: parsedConceptIds[0] || "",
      conceptIds: parsedConceptIds,
      questionText: document.getElementById("edit-q-text")?.value.trim() || "",
      imageUrl: currentQuestionImageBase64 || urlInput || (existing ? existing.imageUrl : ""),
      options: [
        document.getElementById("edit-opt-0")?.value.trim() || "",
        document.getElementById("edit-opt-1")?.value.trim() || "",
        document.getElementById("edit-opt-2")?.value.trim() || "",
        document.getElementById("edit-opt-3")?.value.trim() || ""
      ],
      correctIndex: parseInt(document.getElementById("edit-q-correct")?.value || "0", 10),
      explanation: document.getElementById("edit-q-explanation")?.value.trim() || "",
      source: document.getElementById("edit-q-source")?.value.trim() || (existing ? existing.source : "Manual Entry"),
      difficulty: existing ? (existing.difficulty || "MEDIUM") : "MEDIUM",
      // CRITICAL FIX: Preserve existing tags and user annotation
      tags: existing && Array.isArray(existing.tags) && existing.tags.length > 0 ? existing.tags : ["UserSaved"],
      annotation: existing ? (existing.annotation || "") : ""
    };

    try {
      await QuestionService.update(id, qObj);
      const m = document.getElementById("modal-question-editor");
      if (m) m.classList.remove("active");

      if (dojoExam && dojoExam.questions[dojoExam.currentIndex]?.id === id) {
        dojoExam.questions[dojoExam.currentIndex] = qObj;
        renderDojoArenaQuestion();
      }
      await renderDashboard();
      if (typeof renderPracticeQuestionsTable === "function") {
        await renderPracticeQuestionsTable();
      }
      alert(`Question ${id} updated successfully.`);
    } catch (err) {
      alert("Save Error: " + err.message);
    }
  }

  async function duplicateCurrentEditingQuestion() {
    const id = document.getElementById("edit-q-id")?.value.trim();
    if (!id) return;
    try {
      const clone = await QuestionService.duplicate(id);
      const m = document.getElementById("modal-question-editor");
      if (m) m.classList.remove("active");
      alert(`Duplicated as new question: ${clone.id}`);
      openEditQuestionModal(clone);
    } catch (err) {
      alert("Duplicate failed: " + err.message);
    }
  }

  async function deleteCurrentEditingQuestion() {
    const id = document.getElementById("edit-q-id")?.value.trim();
    if (!id) return;
    if (confirm(`Permanently delete question ${id}? (Historical attempts referencing this question remain preserved)`)) {
      await QuestionService.delete(id);
      const m = document.getElementById("modal-question-editor");
      if (m) m.classList.remove("active");

      if (dojoExam) {
        dojoExam.questions = dojoExam.questions.filter(q => q.id !== id);
        if (dojoExam.currentIndex >= dojoExam.questions.length) dojoExam.currentIndex = 0;
        if (dojoExam.questions.length > 0) renderDojoArenaQuestion();
        else exitDojoArena();
      }
      await renderDashboard();
      if (typeof renderPracticeQuestionsTable === "function") {
        await renderPracticeQuestionsTable();
      }
      alert(`Question ${id} removed.`);
    }
  }

  /* ==========================================================================
   * SECTION 17: SHARED SERVICE â€” PERFORMANCE SERVICE
   * Telemetry Aggregation, Cold-Start Guards & Dynamic ERI Telemetry
   * ========================================================================== */
  const PerformanceService = {
    async getHistoricalAttempts() {
      const attempts = await getAllRecords("store_attempts");
      return attempts.filter(a => a.completed);
    },

    async calculateGlobalMetrics() {
      const completed = await this.getHistoricalAttempts();

      // Retrieve universal active engagement time from store_config
      const storedEngagement = await getRecord("store_config", "telemetry_active_study_time_sec");
      const universalStudyTimeSec = (storedEngagement && typeof storedEngagement.value === "number" ? storedEngagement.value : 0) + activeStudyTimeSeconds;

      if (completed.length === 0) {
        return {
          totalMocks: 0,
          accuracy: 0,
          avgSpeed: 0,
          trapsHit: 0,
          eri: "0.0",
          accComp: 0,
          velComp: 0,
          consistencyComp: 0,
          totalStudyTimeSec: universalStudyTimeSec,
          neglectAlert: null
        };
      }

      let totalCor = 0, totalAtt = 0, totalMockSec = 0, traps = 0;
      completed.forEach(c => {
        totalCor += (c.correctCount || 0);
        totalAtt += ((c.correctCount || 0) + (c.incorrectCount || 0));
        traps += (c.q4Traps || 0);
        if (c.userResponses && typeof c.userResponses === "object") {
          Object.values(c.userResponses).forEach(r => {
            totalMockSec += (r ? (r.timeSpentSec || 0) : 0);
          });
        }
      });

      const acc = totalAtt > 0 ? Math.round((totalCor / totalAtt) * 100) : 0;
      const avgSpeed = totalAtt > 0 ? Math.round(totalMockSec / totalAtt) : 0;

      // ERI Components: Accuracy (50%) + Velocity (30%) + Consistency Volume (20%)
      const accComp = parseFloat((acc * 0.50).toFixed(1));
      let velScore = 100;
      if (avgSpeed > 45) {
        velScore = Math.max(20, 100 - (avgSpeed - 45) * 1.2);
      }
      const velComp = parseFloat((velScore * 0.30).toFixed(1));
      const volumeBonus = Math.min(100, completed.length * 12.5);
      const consistencyComp = parseFloat((volumeBonus * 0.20).toFixed(1));
      const totalERI = Math.min(100, Math.max(10, accComp + velComp + consistencyComp)).toFixed(1);

      return {
        totalMocks: completed.length,
        accuracy: acc,
        avgSpeed: avgSpeed,
        trapsHit: traps,
        eri: totalERI,
        accComp: accComp,
        velComp: velComp,
        consistencyComp: consistencyComp,
        totalStudyTimeSec: totalMockSec + universalStudyTimeSec
      };
    },

    async getChapterStats(subKey, chapter) {
      const completed = await this.getHistoricalAttempts();
      let attempted = 0, correct = 0, totalTimeSec = 0, wrongCount = 0;

      completed.forEach(att => {
        if (Array.isArray(att.questions) && att.userResponses) {
          att.questions.forEach(q => {
            if (q.subject === subKey && q.chapter === chapter) {
              const resp = att.userResponses[q.id];
              if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
                attempted++;
                totalTimeSec += (resp.timeSpentSec || 0);
                if (resp.selectedOption === q.correctIndex) {
                  correct++;
                } else {
                  wrongCount++;
                }
              }
            }
          });
        }
      });

      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      const avgSpeed = attempted > 0 ? Math.round(totalTimeSec / attempted) : 0;

      return {
        subject: subKey,
        chapter: chapter,
        attempted: attempted,
        correct: correct,
        wrong: wrongCount,
        accuracy: accuracy,
        avgSpeed: avgSpeed,
        isWeak: attempted >= 3 && accuracy < 60
      };
    },

    async getWeakChapters(subKey = null) {
      const taxonomy = await TaxonomyService.getTaxonomy();
      const weakList = [];

      for (const sKey of Object.keys(taxonomy)) {
        if (subKey && subKey !== "ALL" && sKey !== subKey) continue;
        for (const chap of taxonomy[sKey].chapters) {
          const stats = await this.getChapterStats(sKey, chap);
          if (stats.attempted > 0 && stats.accuracy < 65) {
            weakList.push(stats);
          }
        }
      }
      return weakList.sort((a, b) => a.accuracy - b.accuracy);
    },

    async getQuestionPerformanceMap() {
      const completed = await this.getHistoricalAttempts();
      const map = {};

      completed.forEach(att => {
        if (Array.isArray(att.questions) && att.userResponses) {
          att.questions.forEach(q => {
            const resp = att.userResponses[q.id];
            if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
              if (!map[q.id]) {
                map[q.id] = {
                  attempts: 0,
                  correct: 0,
                  incorrect: 0,
                  totalTime: 0,
                  lastAttemptEpoch: 0,
                  lastWasIncorrect: false,
                  traps: []
                };
              }
              const stats = map[q.id];
              stats.attempts++;
              stats.totalTime += (resp.timeSpentSec || 0);
              stats.lastAttemptEpoch = Math.max(stats.lastAttemptEpoch, att.timestamp);

              if (resp.selectedOption === q.correctIndex) {
                stats.correct++;
                stats.lastWasIncorrect = false;
              } else {
                stats.incorrect++;
                stats.lastWasIncorrect = true;
                if (resp.errorTag && resp.errorTag !== "UNCLASSIFIED") {
                  stats.traps.push(resp.errorTag);
                }
              }
            }
          });
        }
      });
      return map;
    },

    /**
     * COLD-START NEGLECT GUARD:
     * Returns null immediately if zero completed test sessions exist.
     * Evaluates neglect ONLY against chapters that have been seen historically,
     * preventing false-positive neglect alarms on fresh profiles.
     */
    async calculateNeglect() {
      const completed = await this.getHistoricalAttempts();
      if (completed.length === 0) return null;

      const taxonomy = await TaxonomyService.getTaxonomy();
      const now = Date.now();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      let worstChapter = null;
      let maxNeglectMs = 0;

      for (const sKey of Object.keys(taxonomy)) {
        for (const chap of taxonomy[sKey].chapters) {
          let lastSeen = 0;
          for (const att of completed) {
            if (Array.isArray(att.questions) && att.questions.some(q => q.chapter === chap)) {
              lastSeen = Math.max(lastSeen, att.timestamp);
            }
          }

          // Guard against unattempted chapters triggering false positive alarms
          if (lastSeen > 0) {
            const diff = now - lastSeen;
            if (diff > sevenDaysMs && diff > maxNeglectMs) {
              maxNeglectMs = diff;
              worstChapter = {
                subject: sKey,
                chapter: chap,
                days: Math.floor(diff / (24 * 60 * 60 * 1000)),
                isNever: false
              };
            }
          }
        }
      }
      return worstChapter;
    }
  };

  /* ==========================================================================
   * SECTION 18: SHARED SERVICE â€” MOCK SERVICE & ATOMIC GROUP SAMPLING
   * Atomic Passage Clustering, Ephemeral Session Support & Fisher-Yates Shuffle
   * ========================================================================== */
  const MockService = {
    shuffle(array, seed = null) {
      let m = array.length, t, i;
      let randomFn = Math.random;

      if (seed && typeof seed === "string") {
        let hash = 0;
        for (let j = 0; j < seed.length; j++) {
          hash = (hash << 5) - hash + seed.charCodeAt(j);
          hash |= 0;
        }
        randomFn = () => {
          hash = (hash * 9301 + 49297) % 233280;
          return Math.abs(hash / 233280);
        };
      }

      while (m) {
        i = Math.floor(randomFn() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
    async generate(config) {
      const {
        title = "SSC CGL Practice Mock",
        count = 25,
        durationMin = 15,
        subject = "ALL",
        chapter = "ALL",
        chapters = [],
        method = "ALL",
        difficulty = "ALL",
        mode = "RANDOM",
        excludeRecentMocks = false,
        recentMockWindow = 3,
        randomizeOrder = true,
        patternBalanced = false,
        isSectionLocked = false,
        ephemeral = false,
        persistQuestions = true,
        explicitQuestionIds = [],
        customQuestions = [],
        sections = null,
        seed = null
      } = config;

      const isEphemeralMock = (ephemeral === true || persistQuestions === false);
      const isLocked = (isSectionLocked === true || isSectionLocked === "YES");
      const allBankQuestions = await getAllRecords("store_questions");
      const attempts = await getAllRecords("store_attempts");
      const completed = attempts.filter(a => a.completed).sort((a, b) => b.timestamp - a.timestamp);
      const perfMap = await PerformanceService.getQuestionPerformanceMap();

      // 1. Resolve Section Partitioning
      let sectionConfigs = [];
      if (Array.isArray(sections) && sections.length > 0) {
        sectionConfigs = sections.map((s, idx) => ({
          id: s.id || `SEC_${idx + 1}_${s.subject || 'GEN'}`,
          subject: s.subject || "QA",
          name: s.name || `${TAXONOMY[s.subject]?.name || s.subject || 'Section'} (Part ${idx + 1})`,
          count: parseInt(s.count, 10) || Math.round(count / sections.length),
          durationMin: parseInt(s.durationMin, 10) || Math.round(durationMin / sections.length),
          explicitQuestionIds: Array.isArray(s.explicitQuestionIds) ? s.explicitQuestionIds : [],
          customQuestions: Array.isArray(s.customQuestions) ? s.customQuestions : [],
          chapter: s.chapter || "ALL",
          chapters: Array.isArray(s.chapters) ? s.chapters : [],
          mode: s.mode || mode,
          difficulty: s.difficulty || difficulty
        }));
      } else if (subject === "ALL" && (count === 100 || count >= 80)) {
        // Standard Tier-1 4-Section Queue
        const tier1Subs = ["REAS", "GA", "QA", "ENG"];
        const secDuration = Math.round(durationMin / tier1Subs.length);
        const secCount = Math.round(count / tier1Subs.length);
        sectionConfigs = tier1Subs.map((subKey, idx) => ({
          id: `SEC_${idx + 1}_${subKey}`,
          subject: subKey,
          name: `${TAXONOMY[subKey]?.name || subKey}`,
          count: secCount,
          durationMin: secDuration,
          explicitQuestionIds: [],
          customQuestions: [],
          chapter: "ALL",
          chapters: [],
          mode: mode,
          difficulty: difficulty
        }));
      } else {
        // Single Section Queue
        sectionConfigs = [{
          id: "SEC_1",
          subject: subject === "ALL" ? "QA" : subject,
          name: title,
          count: count,
          durationMin: durationMin,
          explicitQuestionIds: Array.isArray(explicitQuestionIds) ? explicitQuestionIds : [],
          customQuestions: Array.isArray(customQuestions) ? customQuestions : [],
          chapter: chapter,
          chapters: chapters,
          mode: mode,
          difficulty: difficulty
        }];
      }

      // Distribute top-level explicit IDs and custom questions across multi-section queues
      if (sectionConfigs.length > 1) {
        if (Array.isArray(explicitQuestionIds) && explicitQuestionIds.length > 0) {
          explicitQuestionIds.forEach(id => {
            const found = allBankQuestions.find(q => q.id === id);
            if (found) {
              const targetSec = sectionConfigs.find(s => s.subject === found.subject) || sectionConfigs[0];
              if (!targetSec.explicitQuestionIds.includes(id)) {
                targetSec.explicitQuestionIds.push(id);
              }
            }
          });
        }
        if (Array.isArray(customQuestions) && customQuestions.length > 0) {
          customQuestions.forEach(cq => {
            const targetSec = sectionConfigs.find(s => s.subject === cq.subject) || sectionConfigs[0];
            targetSec.customQuestions.push(cq);
          });
        }
      }

      const allFinalQuestions = [];
      const configuredSections = [];
      let globalCounter = 1;
      const sessionGlobalUsedIds = new Set();

      // 2. Process Each Section Queue Additively
      for (let sIdx = 0; sIdx < sectionConfigs.length; sIdx++) {
        const secCfg = sectionConfigs[sIdx];
        const secQuestions = [];
        const secUsedIds = new Set();
        const secTarget = Math.max(secCfg.count, secCfg.explicitQuestionIds.length + secCfg.customQuestions.length);

        // Stage A: Explicit Bank Question IDs
        for (const id of secCfg.explicitQuestionIds) {
          if (secQuestions.length >= secTarget) break;
          const found = allBankQuestions.find(q => q.id === id);
          if (found && !sessionGlobalUsedIds.has(found.id) && !secUsedIds.has(found.id)) {
            secQuestions.push({ ...found });
            secUsedIds.add(found.id);
            sessionGlobalUsedIds.add(found.id);
          }
        }

        // Stage B: Inline Questions (Handling Ephemeral vs. Bank Ingestion)
        for (const rawCustom of secCfg.customQuestions) {
          if (secQuestions.length >= secTarget) break;
          const item = sanitizeQuestion(rawCustom);
          const shouldPersist = (item.ephemeral === false || item.persist === true) && !isEphemeralMock;

          if (shouldPersist) {
            await putRecord("store_questions", item);
            SearchService.invalidate();
          } else {
            item.ephemeral = true;
          }

          if (!sessionGlobalUsedIds.has(item.id) && !secUsedIds.has(item.id)) {
            secQuestions.push(item);
            secUsedIds.add(item.id);
            sessionGlobalUsedIds.add(item.id);
          }
        }

        // Stage C: Additive Backfill from Question Bank
        const needed = secTarget - secQuestions.length;
        if (needed > 0) {
          const targetChapters = (secCfg.chapters && secCfg.chapters.length > 0)
            ? secCfg.chapters
            : (secCfg.chapter !== "ALL" ? [secCfg.chapter] : []);

          let candidatePool = allBankQuestions.filter(q => {
            if (secCfg.subject !== "ALL" && q.subject !== secCfg.subject) return false;
            if (targetChapters.length > 0 && !targetChapters.includes(q.chapter)) return false;
            if (secCfg.difficulty !== "ALL" && q.difficulty !== secCfg.difficulty) return false;
            if (sessionGlobalUsedIds.has(q.id) || secUsedIds.has(q.id)) return false;
            return true;
          });

          if (excludeRecentMocks && completed.length > 0) {
            const recentQIds = new Set();
            completed.slice(0, recentMockWindow).forEach(att => {
              (att.questions || []).forEach(q => recentQIds.add(q.id));
            });
            const filteredPool = candidatePool.filter(q => !recentQIds.has(q.id));
            if (filteredPool.length >= needed) {
              candidatePool = filteredPool;
            }
          }

          let prioritized = candidatePool;
          if (secCfg.mode === "UNATTEMPTED" || secCfg.mode === "UNSEEN") {
            const p = candidatePool.filter(q => !perfMap[q.id] || perfMap[q.id].attempts === 0);
            if (p.length > 0) prioritized = p;
          } else if (secCfg.mode === "INCORRECT") {
            const p = candidatePool.filter(q => perfMap[q.id] && (perfMap[q.id].lastWasIncorrect || perfMap[q.id].incorrect > 0));
            if (p.length > 0) prioritized = p;
          } else if (secCfg.mode === "WEAKNESS") {
            const p = candidatePool.filter(q => {
              const st = perfMap[q.id];
              return st && st.attempts > 0 && (Math.round((st.correct / st.attempts) * 100) < 65 || st.traps.length > 0);
            });
            if (p.length > 0) prioritized = p;
          }

          const shuffledCandidates = this.shuffle([...prioritized], seed);

          // Atomic Passage Set Ingestion with Quota Clamping (Eliminates Overshoot)
          for (const q of shuffledCandidates) {
            if (secQuestions.length >= secTarget) break;
            if (sessionGlobalUsedIds.has(q.id) || secUsedIds.has(q.id)) continue;

            if (q.parentPassageId) {
              const siblings = allBankQuestions
                .filter(item => item.parentPassageId === q.parentPassageId)
                .sort((a, b) => (a.setOrder || 1) - (b.setOrder || 1));
              const unadded = siblings.filter(s => !sessionGlobalUsedIds.has(s.id) && !secUsedIds.has(s.id));

              if (secQuestions.length + unadded.length <= secTarget || secQuestions.length === 0) {
                for (const sib of unadded) {
                  if (secQuestions.length < secTarget) {
                    secQuestions.push({ ...sib });
                    secUsedIds.add(sib.id);
                    sessionGlobalUsedIds.add(sib.id);
                  }
                }
              }
            } else {
              secQuestions.push({ ...q });
              secUsedIds.add(q.id);
              sessionGlobalUsedIds.add(q.id);
            }
          }

          // Dynamic Exhaustive Subject Drain (Eliminates Undershoot)
          if (secQuestions.length < secTarget) {
            const fallbackBank = allBankQuestions.filter(q => {
              if (secCfg.subject !== "ALL" && q.subject !== secCfg.subject) return false;
              return !sessionGlobalUsedIds.has(q.id) && !secUsedIds.has(q.id);
            });
            const shuffledFallback = this.shuffle([...fallbackBank], seed);
            for (const fq of shuffledFallback) {
              if (secQuestions.length >= secTarget) break;
              secQuestions.push({ ...fq });
              secUsedIds.add(fq.id);
              sessionGlobalUsedIds.add(fq.id);
            }
          }

          // Universal Emergency Cross-Subject Drain (Guarantees Exact Target)
          if (secQuestions.length < secTarget) {
            const emergencyBank = allBankQuestions.filter(q => !sessionGlobalUsedIds.has(q.id) && !secUsedIds.has(q.id));
            const shuffledEmergency = this.shuffle([...emergencyBank], seed);
            for (const eq of shuffledEmergency) {
              if (secQuestions.length >= secTarget) break;
              secQuestions.push({ ...eq });
              secUsedIds.add(eq.id);
              sessionGlobalUsedIds.add(eq.id);
            }
          }
        }

        // Stage D: Atomic Passage Contiguity Shuffling
        let finalSectionList = secQuestions;
        if (randomizeOrder) {
          const blocks = [];
          const seenPassages = new Set();
          secQuestions.forEach(q => {
            if (q.parentPassageId) {
              if (!seenPassages.has(q.parentPassageId)) {
                seenPassages.add(q.parentPassageId);
                const s = secQuestions.filter(item => item.parentPassageId === q.parentPassageId);
                blocks.push(s);
              }
            } else {
              blocks.push([q]);
            }
          });
          this.shuffle(blocks, seed);
          finalSectionList = [];
          blocks.forEach(b => finalSectionList.push(...b));
        }

        // Tag Section Metadata
        finalSectionList.forEach((q, lIdx) => {
          q.sectionIndex = sIdx;
          q.sectionName = secCfg.name;
          q.localNumber = lIdx + 1;
          q.globalNumber = globalCounter++;
          allFinalQuestions.push(q);
        });

        configuredSections.push({
          id: secCfg.id,
          subject: secCfg.subject,
          name: secCfg.name,
          durationSec: secCfg.durationMin * 60,
          questionCount: finalSectionList.length,
          locked: false
        });
      }

      return {
        title: title,
        durationMin: durationMin,
        isSectionLocked: isLocked,
        isEphemeral: isEphemeralMock,
        sections: configuredSections,
        questions: allFinalQuestions,
        seed: seed || Date.now().toString(),
        totalSelected: allFinalQuestions.length
      };
    },

    async saveMockDefinition(mockData) {
      const clean = sanitizeSavedMock(mockData);
      await putRecord("store_saved_mocks", clean);
      return clean;
    },

    async deleteMock(mockId) {
      const existing = await getRecord("store_saved_mocks", mockId);
      if (!existing) throw new Error(`Saved mock ${mockId} not found.`);

      await deleteRecordFromStore("store_saved_mocks", mockId);
      return { id: mockId, deleted: true };
    },

    async launchMockSession(mockInstance) {
      const { title, questions, durationMin, isSectionLocked, sections, isEphemeral } = mockInstance;
      await compileAndLaunchArena(title, questions, durationMin, isSectionLocked, sections, isEphemeral);
    }
  };

  /* ==========================================================================
   * SECTION 19: MOCK LAB / BUILDER CONTROLLERS & MULTI-CHAPTER MATRIX
   * Granular Chip Matrix Selection & Independent Sectional Clocks
   * ========================================================================== */
  let activeMockStrategy = "RANDOM";
  let customSequenceRows = [];

  function setMockStrategy(strategy, btnEl) {
    activeMockStrategy = strategy;
    document.querySelectorAll('[id^="strat-pill-"]').forEach(el => el.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    const wrap = document.getElementById("custom-sequence-stack-wrap");
    if (strategy === "CUSTOM_BUILDER") {
      if (wrap) wrap.style.display = "block";
      if (customSequenceRows.length === 0) {
        customSequenceRows = [
          { id: 1, subject: "QA", chapter: "ALL", count: 25, durationMin: 15 },
          { id: 2, subject: "ENG", chapter: "ALL", count: 25, durationMin: 15 }
        ];
      }
      renderCustomSequenceRows();
    } else {
      if (wrap) wrap.style.display = "none";
    }

    updateBuilderPoolEstimate();
  }

  function updateBuilderChapters(subKey) {
    const sel = document.getElementById("builder-chapter");
    if (sel) {
      sel.innerHTML = `<option value="ALL">All Chapters (Use Matrix Below)</option>`;
    }

    // Retain mockLabSelectedMatrixChapters so multi-subject selections persist across Custom sections
    const chipsWrap = document.getElementById("builder-chapter-chips-wrap");
    if (chipsWrap) chipsWrap.innerHTML = "";

    const availableChapters = [];
    if (subKey === "ALL") {
      Object.keys(TAXONOMY).forEach(k => {
        if (Array.isArray(TAXONOMY[k].chapters)) {
          TAXONOMY[k].chapters.forEach(c => availableChapters.push(c));
        }
      });
    } else {
      const sub = TAXONOMY[subKey];
      if (sub && Array.isArray(sub.chapters)) {
        sub.chapters.forEach(c => {
          availableChapters.push(c);
          if (sel) {
            const opt = document.createElement("option");
            opt.value = c;
            opt.innerText = c;
            sel.appendChild(opt);
          }
        });
      }
    }

    if (chipsWrap) {
      availableChapters.forEach(chap => {
        const chip = document.createElement("div");
        chip.className = "matrix-chip" + (mockLabSelectedMatrixChapters.has(chap) ? " selected" : "");
        chip.innerText = chap;
        chip.onclick = () => handleBuilderChapterChipToggle(chap, chip);
        chipsWrap.appendChild(chip);
      });
    }

    updateBuilderPoolEstimate();
    if (activeMockStrategy === "CUSTOM_BUILDER") {
      renderCustomSequenceRows();
    }
  }

  function handleBuilderChapterSelectChange(val) {
    if (val !== "ALL") {
      mockLabSelectedMatrixChapters.clear();
      mockLabSelectedMatrixChapters.add(val);
      syncBuilderMatrixChipsDisplay();
    }
    updateBuilderPoolEstimate();
  }

  function handleBuilderChapterChipToggle(chap, chipEl) {
    if (mockLabSelectedMatrixChapters.has(chap)) {
      mockLabSelectedMatrixChapters.delete(chap);
      chipEl.classList.remove("selected");
    } else {
      mockLabSelectedMatrixChapters.add(chap);
      chipEl.classList.add("selected");
    }
    updateBuilderPoolEstimate();
  }

  function toggleAllBuilderMatrixChips(selectAll) {
    const chips = document.querySelectorAll("#builder-chapter-chips-wrap .matrix-chip");
    chips.forEach(chip => {
      const chap = chip.innerText.trim();
      if (selectAll) {
        mockLabSelectedMatrixChapters.add(chap);
        chip.classList.add("selected");
      } else {
        mockLabSelectedMatrixChapters.delete(chap);
        chip.classList.remove("selected");
      }
    });
    updateBuilderPoolEstimate();
  }

  function syncBuilderMatrixChipsDisplay() {
    const chips = document.querySelectorAll("#builder-chapter-chips-wrap .matrix-chip");
    chips.forEach(chip => {
      chip.classList.toggle("selected", mockLabSelectedMatrixChapters.has(chip.innerText.trim()));
    });
  }

  async function updateBuilderPoolEstimate() {
    const sub = document.getElementById("builder-subject")?.value || "ALL";
    const allQs = await getAllRecords("store_questions");

    const pool = allQs.filter(q => {
      if (sub !== "ALL" && q.subject !== sub) return false;
      if (mockLabSelectedMatrixChapters.size > 0 && !mockLabSelectedMatrixChapters.has(q.chapter)) return false;
      return true;
    });

    safeSetText("builder-pool-estimate", `Estimated pool: ${pool.length} questions`);
  }

  async function previewMockSelection() {
    try {
      const config = getActiveBuilderConfig();
      const instance = await MockService.generate({ ...config, count: Math.min(config.count, 15) });
      const qIds = instance.questions.map((q, idx) => `${idx + 1}. [${q.subject} â€¢ ${q.chapter}] ${q.questionText.slice(0, 75)}...`).join("\n\n");
      alert(`MOCK PREVIEW (${instance.questions.length} Questions Sampled):\n\n${qIds}`);
    } catch (err) {
      alert("Preview Error: " + err.message);
    }
  }

  function getActiveBuilderConfig() {
    const sub = document.getElementById("builder-subject")?.value || "ALL";
    const count = parseInt(document.getElementById("builder-count")?.value || "25", 10);
    const duration = parseInt(document.getElementById("builder-duration")?.value || "15", 10);
    const diff = document.getElementById("builder-difficulty")?.value || "ALL";
    const avoidRecent = document.getElementById("builder-avoid-recent")?.checked ?? true;
    const shuffle = document.getElementById("builder-shuffle")?.checked ?? true;

    const chosenChapters = Array.from(mockLabSelectedMatrixChapters);

    return {
      title: chosenChapters.length > 0 
        ? `${chosenChapters.slice(0, 2).join(' & ')} Practice Mock` 
        : (sub !== "ALL" ? `${sub} Sectional Mock` : `Targeted ${activeMockStrategy} Mock`),
      subject: sub,
      chapter: "ALL",
      chapters: chosenChapters,
      count: count,
      durationMin: duration,
      difficulty: diff,
      mode: activeMockStrategy,
      excludeRecentMocks: avoidRecent,
      randomizeOrder: shuffle,
      isSectionLocked: false
    };
  }

  function openCustomMockModal() {
    setMockStrategy("RANDOM", document.getElementById("strat-pill-random"));
    updateBuilderChapters("ALL");
    pushHistoryState("modal-mock-builder");
    const m = document.getElementById("modal-mock-builder");
    if (m) m.classList.add("active");
  }

  function addCustomSectionRow() {
    const nextId = customSequenceRows.length + 1;
    customSequenceRows.push({ id: nextId, subject: "QA", chapter: "ALL", count: 25, durationMin: 15 });
    renderCustomSequenceRows();
  }

  function removeCustomSectionRow(idx) {
    if (customSequenceRows.length > 1) {
      customSequenceRows.splice(idx, 1);
      renderCustomSequenceRows();
    }
  }

  function renderCustomSequenceRows() {
    const container = document.getElementById("custom-sequence-rows-container");
    if (!container) return;
    container.innerHTML = "";

    customSequenceRows.forEach((row, idx) => {
      const div = document.createElement("div");
      div.style.background = "var(--bg-elevated)";
      div.style.border = "1px solid var(--border-color)";
      div.style.borderRadius = "8px";
      div.style.padding = "10px";
      div.style.marginBottom = "8px";

      const subChapters = TAXONOMY[row.subject] ? TAXONOMY[row.subject].chapters : [];
      
      // Calculate active matrix chips matching this section's subject
      const activeMatrixForSub = Array.from(mockLabSelectedMatrixChapters).filter(c => subChapters.includes(c));
      const matrixBadge = activeMatrixForSub.length > 0 
        ? `<span style="font-size:10px; color:var(--accent-cyan); font-weight:700;">[Matrix: ${activeMatrixForSub.length} chapter(s) active]</span>` 
        : `<span style="font-size:10px; color:var(--text-muted);">[Matrix: All chapters]</span>`;

      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:12px; color:var(--accent-cyan);">Section ${idx + 1}</span>
            ${matrixBadge}
          </div>
          ${customSequenceRows.length > 1 ? `<button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--status-red);" onclick="CGL_OS.removeCustomSectionRow(${idx})">Remove</button>` : ''}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:6px;">
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Subject</label>
            <select class="form-control" style="padding:6px; font-size:11px;" onchange="CGL_OS.updateCustomRowSubject(${idx}, this.value)">
              ${Object.keys(TAXONOMY).map(k => `<option value="${k}" ${row.subject === k ? 'selected' : ''}>${k}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Chapter</label>
            <select class="form-control" style="padding:6px; font-size:11px;" onchange="CGL_OS.updateCustomRowChapter(${idx}, this.value)">
              <option value="ALL">All (Use Matrix)</option>
              ${subChapters.map(c => `<option value="${c}" ${row.chapter === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Qs</label>
            <input type="number" class="form-control" style="padding:6px; font-size:11px;" value="${row.count}" min="5" max="50" onchange="CGL_OS.updateCustomRowCount(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Mins</label>
            <input type="number" class="form-control" style="padding:6px; font-size:11px;" value="${row.durationMin}" min="1" max="60" onchange="CGL_OS.updateCustomRowDuration(${idx}, this.value)">
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  function updateCustomRowSubject(idx, val) {
    customSequenceRows[idx].subject = val;
    customSequenceRows[idx].chapter = "ALL";
    renderCustomSequenceRows();
  }
  function updateCustomRowChapter(idx, val) { customSequenceRows[idx].chapter = val; }
  function updateCustomRowCount(idx, val) { customSequenceRows[idx].count = parseInt(val, 10) || 25; }
  function updateCustomRowDuration(idx, val) { customSequenceRows[idx].durationMin = parseInt(val, 10) || 15; }

  function openSaveBlueprintModal(mode = "DYNAMIC_BLUEPRINT", targetId = "") {
    safeSetValue("save-preset-mode", mode);
    safeSetValue("save-preset-target-id", targetId);
    safeSetText("save-preset-modal-title", mode === "FIXED_PAPER" ? "Freeze Mock as Fixed Paper" : "Save Mock Blueprint");
    safeSetValue("blueprint-title-input", "");

    pushHistoryState("modal-save-blueprint");
    const m = document.getElementById("modal-save-blueprint");
    if (m) m.classList.add("active");
  }

  async function saveCurrentPresetAction() {
    const mode = document.getElementById("save-preset-mode")?.value || "DYNAMIC_BLUEPRINT";
    const targetId = document.getElementById("save-preset-target-id")?.value || "";
    const title = document.getElementById("blueprint-title-input")?.value.trim() || "";

    if (!title) {
      alert("Blueprint title is required.");
      return;
    }

    let record;
    if (mode === "FIXED_PAPER") {
      const attempts = await getAllRecords("store_attempts");
      const target = attempts.find(a => a.sessionId === targetId);
      if (!target || !target.questions || target.questions.length === 0) {
        alert("Unable to locate questions for fixed paper.");
        return;
      }

      record = {
        id: "paper_" + Date.now(),
        type: "FIXED_PAPER",
        title: title,
        isSectionLocked: !!target.isSectionLocked,
        sections: target.sections ? JSON.parse(JSON.stringify(target.sections)) : [],
        questions: JSON.parse(JSON.stringify(target.questions))
      };
    } else {
      const isLock = document.getElementById("builder-sectional-lock")?.value === "YES";
      record = {
        id: "bp_" + Date.now(),
        type: "DYNAMIC_BLUEPRINT",
        title: title,
        isSectionLocked: isLock,
        selectionRule: getActiveBuilderConfig(),
        sections: JSON.parse(JSON.stringify(customSequenceRows)),
        questions: null
      };
    }

    await MockService.saveMockDefinition(record);
    const m = document.getElementById("modal-save-blueprint");
    if (m) m.classList.remove("active");
    alert(`Saved "${title}" (${mode === "FIXED_PAPER" ? "Fixed Question Paper" : "Dynamic Blueprint"}) to Dashboard.`);
    await renderDashboardBlueprints();
  }

  async function launchSavedPreset(id) {
    const preset = await getRecord("store_saved_mocks", id);
    if (!preset) return;

    if (preset.type === "FIXED_PAPER" && preset.questions && preset.questions.length > 0) {
      await MockService.launchMockSession(preset);
    } else {
      const rule = preset.selectionRule || { title: preset.title, count: 25, mode: "RANDOM" };
      const instance = await MockService.generate(rule);
      await MockService.launchMockSession(instance);
    }
  }

  async function deleteSavedPreset(id) {
    if (confirm("Delete this saved mock setup? (Underlying question records will NOT be deleted)")) {
      await MockService.deleteMock(id);
      await renderDashboardBlueprints();
    }
  }

  async function launchConfiguredMock() {
    const modal = document.getElementById("modal-mock-builder");
    if (modal) modal.classList.remove("active");

    if (activeMockStrategy === "CUSTOM_BUILDER") {
      const isLock = document.getElementById("builder-sectional-lock")?.value === "YES";
      const allQuestions = await getAllRecords("store_questions");

      let sections = [];
      let flattened = [];
      let signatureTags = [];
      let globalCounter = 1;

      for (let sIdx = 0; sIdx < customSequenceRows.length; sIdx++) {
        const row = customSequenceRows[sIdx];
        let pool = allQuestions.filter(q => q.subject === row.subject);
        
        // Scope pool by active matrix chips matching this section's subject
        const matrixChapsForSub = Array.from(mockLabSelectedMatrixChapters).filter(c => {
          return TAXONOMY[row.subject] && TAXONOMY[row.subject].chapters.includes(c);
        });

        if (row.chapter && row.chapter !== "ALL") {
          pool = pool.filter(q => q.chapter === row.chapter);
        } else if (matrixChapsForSub.length > 0) {
          pool = pool.filter(q => matrixChapsForSub.includes(q.chapter));
        }

        if (pool.length === 0) pool = allQuestions.filter(q => q.subject === row.subject);
        if (pool.length === 0) pool = allQuestions;

        const shuffled = MockService.shuffle([...pool]);
        const sectionQuestions = shuffled.slice(0, Math.min(row.count, shuffled.length));
        signatureTags.push(row.subject);

        const secObj = {
          id: `SEC_${sIdx + 1}_${row.subject}`,
          subject: row.subject,
          name: `${TAXONOMY[row.subject] ? TAXONOMY[row.subject].name : row.subject} (Sec ${sIdx + 1})`,
          durationSec: row.durationMin * 60,
          questionCount: sectionQuestions.length,
          locked: false
        };
        sections.push(secObj);

        sectionQuestions.forEach((q, qIdx) => {
          flattened.push({
            ...q,
            sectionIndex: sIdx,
            sectionName: secObj.name,
            localNumber: qIdx + 1,
            globalNumber: globalCounter++
          });
        });
      }

      await compileAndLaunchArena(
        `Custom Routine (${signatureTags.join('âž”')})`,
        flattened,
        customSequenceRows.reduce((a, b) => a + b.durationMin, 0),
        isLock,
        sections
      );
    } else {
      const config = getActiveBuilderConfig();
      const instance = await MockService.generate(config);
      await MockService.launchMockSession(instance);
    }
  }

  async function launchConfiguredMockDirect(sub, chap, count, durMin) {
    const instance = await MockService.generate({
      title: `${chap === 'ALL' ? sub : chap} Blitz Drill`,
      subject: sub,
      chapter: chap,
      count: count,
      durationMin: durMin,
      mode: "RANDOM"
    });
    await MockService.launchMockSession(instance);
  }

  /* ==========================================================================
   * SECTION 20: TIMED EXAM ARENA CONTROLLER & PALETTE
   * Independent Sectional Clocks & Pinned Passage Container
   * ========================================================================== */
  function startExamTimers() {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    if (activeExam && activeExam.isReviewMode) {
      safeSetText("hud-countdown", "REVIEW");
      const cEl = document.getElementById("hud-countdown");
      if (cEl) cEl.className = "hud-timer";
      return;
    }

    examTimerInterval = setInterval(() => {
      if (!activeExam || activeExam.isPaused || activeExam.isReviewMode) return;

      activeExam.sectionRemainingSec--;
      const m = Math.floor(activeExam.sectionRemainingSec / 60);
      const s = activeExam.sectionRemainingSec % 60;
      const clockEl = document.getElementById("hud-countdown");
      if (clockEl) {
        clockEl.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (activeExam.sectionRemainingSec < 180) clockEl.className = "hud-timer crimson";
        else if (activeExam.sectionRemainingSec < 300) clockEl.className = "hud-timer amber";
        else clockEl.className = "hud-timer";
      }

      if (activeExam.sectionRemainingSec <= 0) {
        handleSectionLockTransition(true);
      }
    }, 1000);

    questionTimerInterval = setInterval(() => {
      if (!activeExam || activeExam.isPaused || activeExam.isReviewMode) return;
      activeExam.currentQTimeSpentSec++;
      const m = Math.floor(activeExam.currentQTimeSpentSec / 60);
      const s = activeExam.currentQTimeSpentSec % 60;
      safeSetText("arena-q-timer", `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      safeSetText("hud-pacing-status", `${activeExam.currentQTimeSpentSec}s on Q`);

      const curQ = activeExam.questions[activeExam.currentQuestionIndex];
      if (curQ && activeExam.userResponses[curQ.id]) {
        activeExam.userResponses[curQ.id].timeSpentSec++;
      }
    }, 1000);
  }

  function requestEndSectionEarly() {
    if (!activeExam || activeExam.isReviewMode) return;
    const curSec = activeExam.sections[activeExam.activeSectionIndex];
    const m = Math.floor(activeExam.sectionRemainingSec / 60);
    const s = activeExam.sectionRemainingSec % 60;

    safeSetHtml("lock-confirm-msg", `
      You have <b>${m}m ${s}s</b> remaining in <b>${curSec ? curSec.name : 'this section'}</b>.<br><br>
      Locking early will permanently seal this section. You cannot return to it.
    `);
    const modal = document.getElementById("modal-section-lock-confirm");
    if (modal) modal.classList.add("active");
  }

  function confirmEndSectionEarly() {
    const modal = document.getElementById("modal-section-lock-confirm");
    if (modal) modal.classList.remove("active");
    handleSectionLockTransition(false);
  }

  function handleSectionLockTransition(isAutoExpired) {
    if (!activeExam) return;
    if (activeExam.sections[activeExam.activeSectionIndex]) {
      activeExam.sections[activeExam.activeSectionIndex].locked = true;
    }

    if (activeExam.activeSectionIndex < activeExam.sections.length - 1) {
      activeExam.activeSectionIndex++;
      const nextSec = activeExam.sections[activeExam.activeSectionIndex];
      activeExam.sectionRemainingSec = nextSec.durationSec;
      const nextIdx = activeExam.questions.findIndex(q => q.sectionIndex === activeExam.activeSectionIndex);
      if (nextIdx !== -1) activeExam.currentQuestionIndex = nextIdx;

      showSectionToast(isAutoExpired 
        ? `Section time expired! Locked and transitioned to: ${nextSec.name}` 
        : `Section locked early! Transitioned to: ${nextSec.name}`);

      renderActiveExamQuestion();
    } else {
      submitExamSession();
    }
  }

  function showSectionToast(msg) {
    const toast = document.getElementById("arena-lock-toast");
    if (!toast) return;
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3500);
  }

  function renderActiveExamQuestion() {
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const resp = activeExam.userResponses[q.id] || {};
    const isRev = !!activeExam.isReviewMode;

    safeSetDisplay("btn-arena-research", "inline-flex");

    if (isRev) {
      safeSetDisplay("btn-arena-pause", "none");
      safeSetDisplay("btn-arena-exit-review", "inline-flex");
      safeSetDisplay("btn-arena-early-lock", "none");
      safeSetDisplay("btn-drawer-early-lock", "none");
      safeSetDisplay("btn-q-review", "none");
      safeSetText("btn-q-save-next", "Next Question â–º");
      safeSetDisplay("btn-submit-exam", "none");
      safeSetText("palette-drawer-title", "Review Palette");
      safeSetHtml("palette-legend-bar", `
        <span>ðŸŸ¢ Correct</span>
        <span>ðŸ”´ Incorrect</span>
        <span>âšª Unattempted</span>
      `);
      safeSetDisplay("hud-panic-flag", resp.isPanicSlip ? "inline-block" : "none");

      const spent = resp.timeSpentSec || 0;
      const mSpent = Math.floor(spent / 60);
      const sSpent = spent % 60;
      safeSetText("arena-q-timer", `${String(mSpent).padStart(2, '0')}:${String(sSpent).padStart(2, '0')}`);
      safeSetText("hud-pacing-status", `${spent}s on Q`);
    } else {
      safeSetDisplay("btn-arena-pause", "inline-flex");
      safeSetDisplay("btn-arena-exit-review", "none");
      safeSetDisplay("btn-q-review", "inline-flex");
      safeSetText("btn-q-save-next", "Save & Next");
      safeSetDisplay("btn-submit-exam", "block");
      safeSetText("palette-drawer-title", "Question Palette");
      safeSetDisplay("hud-panic-flag", "none");

      if (activeExam.isSectionLocked) {
        safeSetDisplay("btn-arena-early-lock", "inline-flex");
        safeSetDisplay("btn-drawer-early-lock", "block");
        const isLast = activeExam.activeSectionIndex === activeExam.sections.length - 1;
        safeSetText("btn-arena-early-lock", isLast ? "ðŸ”’ Submit Final Section" : "ðŸ”’ End Section Early");
        safeSetText("btn-drawer-early-lock", isLast ? "ðŸ”’ Lock & Submit Final Section" : "ðŸ”’ End & Advance Section Early");
      } else {
        safeSetDisplay("btn-arena-early-lock", "none");
        safeSetDisplay("btn-drawer-early-lock", "none");
      }
    }

    const secQs = activeExam.questions.filter(item => item.sectionIndex === q.sectionIndex);
    safeSetText("hud-section-badge", `${q.sectionName ? q.sectionName.toUpperCase() : 'EXAM'}`);
    safeSetText("hud-section-qinfo", `Sec Q${q.localNumber || (activeExam.currentQuestionIndex + 1)} of ${secQs.length} (Global Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)})`);
    safeSetText("arena-q-num", `Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)}`);

    // Pinned Reading Comprehension / Cloze / Caselet Container
    const passageContainer = document.getElementById("arena-passage-container");
    if (passageContainer) {
      if (q.passageText && q.passageText.trim().length > 0) {
        passageContainer.style.display = "block";
        safeSetText("arena-passage-tag", `${q.chapter.replace(/^ENG_/, '').replace(/^QA_/, '')} CONTEXT`);
        safeSetText("arena-passage-set-badge", `SET Q ${q.setOrder || 1}/${q.setTotal || 1}`);
        safeSetHtml("arena-passage-body", formatRichText(q.passageText));
      } else {
        passageContainer.style.display = "none";
      }
    }

    safeSetHtml("arena-q-text", formatRichText(q.questionText));

    const revBtn = document.getElementById("btn-q-review");
    if (!isRev && revBtn) {
      if (resp.status === "marked") {
        revBtn.style.color = "#fff";
        revBtn.style.background = "var(--accent-purple)";
        revBtn.innerText = "Unmark Review";
      } else {
        revBtn.style.color = "var(--accent-purple)";
        revBtn.style.background = "var(--bg-elevated)";
        revBtn.innerText = "Mark Review";
      }
    }

    const imgBox = document.getElementById("arena-image-container");
    if (imgBox) {
      if (q.imageUrl && q.imageUrl.trim().length > 0) {
        imgBox.style.display = "block";
        imgBox.innerHTML = `<img src="${q.imageUrl}" alt="Question Diagram">`;
      } else {
        imgBox.style.display = "none";
        imgBox.innerHTML = "";
      }
    }

    // Dynamic Multi-Concept Linked Knowledge Pills in Review Mode
    const conceptBridgeBox = document.getElementById("arena-concept-bridge-box");
    if (isRev && conceptBridgeBox) {
      conceptBridgeBox.style.display = "block";
      const pillsWrap = document.getElementById("arena-concept-pills-wrap");
      if (pillsWrap) {
        pillsWrap.innerHTML = "";
        const linkedIds = (Array.isArray(q.conceptIds) && q.conceptIds.length > 0)
          ? q.conceptIds
          : (q.conceptId ? [q.conceptId] : []);

        if (linkedIds.length === 0) {
          const btn = document.createElement("button");
          btn.className = "btn btn-cyan";
          btn.style.cssText = "padding:6px 12px; font-size:12px; font-weight:700;";
          btn.innerText = `ðŸ“– Browse Sheets for ${q.chapter}`;
          btn.onclick = () => openCompendiumToSheet(null, q.subject, q.chapter);
          pillsWrap.appendChild(btn);
        } else {
          linkedIds.forEach(cId => {
            const btn = document.createElement("button");
            btn.className = "btn btn-cyan";
            btn.style.cssText = "padding:6px 12px; font-size:12px; font-weight:700;";
            btn.innerText = `ðŸ“– Sheet: ${cId.replace(/^top_/, '').replace(/_/g, ' ')}`;
            btn.onclick = () => openCompendiumToSheet(cId, q.subject, q.chapter);
            pillsWrap.appendChild(btn);
          });
        }
      }
    } else if (conceptBridgeBox) {
      conceptBridgeBox.style.display = "none";
    }

    // Telemetry & Hesitation Decision Trail Banner
    const telemBanner = document.getElementById("arena-review-telemetry-banner");
    const solutionBlock = document.getElementById("arena-review-solution-block");

    if (isRev && telemBanner && solutionBlock) {
      const isAtt = resp.selectedOption !== null && resp.selectedOption !== undefined;
      const isCor = isAtt && resp.selectedOption === q.correctIndex;
      telemBanner.style.display = "block";
      telemBanner.innerHTML = `
        <div style="background:var(--bg-elevated); border:1px solid ${isCor ? 'var(--status-green)' : (isAtt ? 'var(--status-red)' : 'var(--border-color)')}; border-radius:8px; padding:10px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:800; color:${isCor ? 'var(--status-green)' : (isAtt ? 'var(--status-red)' : 'var(--text-muted)')};">
              ${isCor ? 'âœ“ CORRECT (+2.0)' : (isAtt ? 'âœ— INCORRECT (-0.5)' : 'âšª UNATTEMPTED (0.0)')}
            </span>
            <span style="font-family:var(--font-mono); color:var(--text-muted);">${resp.timeSpentSec || 0}s spent</span>
          </div>
          ${resp.decisionTrail && resp.decisionTrail.length > 0 ? `
            <div style="margin-top:6px; color:var(--accent-cyan); font-size:11px;">
              <b>Hesitation Trail:</b> ${resp.decisionTrail.map(d => `Opt ${d.opt} (${d.atSec}s)`).join(' âž” ')}
            </div>
          ` : ''}
          ${resp.isPanicSlip ? `<div style="margin-top:4px; color:var(--status-red); font-size:11px; font-weight:700;">âš ï¸ Detected as Panic Slip (&lt;8s solve under end-of-section pressure).</div>` : ''}
          ${resp.errorTag && resp.errorTag !== 'UNCLASSIFIED' && resp.errorTag !== 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:#f87171; font-size:11px;"><b>Active Classification:</b> #${resp.errorTag}</div>` : ''}
          ${resp.errorTag === 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:var(--status-green); font-size:11px;"><b>Tag Cleared:</b> Valid Calculated Risk / Speed Move</div>` : ''}
        </div>
      `;

      solutionBlock.style.display = "block";
      const currentTag = resp.errorTag || "UNCLASSIFIED";

      let optionsHtml = `
        <option value="UNCLASSIFIED" ${currentTag==='UNCLASSIFIED'?'selected':''}>Override Mistake Tag...</option>
        <option value="VALID_CALCULATED_RISK" ${currentTag==='VALID_CALCULATED_RISK'?'selected':''}>âœ“ Valid Calculated Risk (Clear Trap Penalty)</option>
      `;
      customMistakeTags.forEach(t => {
        if (t !== "VALID_CALCULATED_RISK") {
          optionsHtml += `<option value="${t}" ${currentTag===t?'selected':''}>${t.replace(/_/g, ' ')}</option>`;
        }
      });
      optionsHtml += `<option value="__NEW_TAG__">+ Create New Custom Tag...</option>`;

      solutionBlock.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
          <span style="font-weight:700; color:var(--accent-cyan); font-size:13px;">Method & Detailed Solution</span>
          ${isAtt ? `
            <select onchange="CGL_OS.handleMistakeTagSelect('${q.id}', this.value)" style="background:#151a24; color:#fff; border:1px solid #da3633; font-size:11px; padding:4px 8px; border-radius:4px;">
              ${optionsHtml}
            </select>
          ` : ''}
        </div>
        <div style="font-size:13.5px; line-height:1.6;">${formatRichText(q.explanation || 'No method registered.')}</div>
      `;
    } else {
      if (telemBanner) telemBanner.style.display = "none";
      if (solutionBlock) solutionBlock.style.display = "none";
    }

    const container = document.getElementById("arena-options-container");
    if (!container) return;
    container.innerHTML = "";

    q.options.forEach((optText, idx) => {
      const card = document.createElement("div");
      card.className = "opt-card";

      if (isRev) {
        if (idx === q.correctIndex) card.classList.add("correct-peek");
        else if (idx === resp.selectedOption) card.classList.add("wrong-peek");
      } else {
        if (resp.selectedOption === idx) card.classList.add("selected");
        if (resp.struck && resp.struck.includes(idx)) card.classList.add("struck-through");

        card.addEventListener("click", () => {
          if (resp.struck && resp.struck.includes(idx)) return;
          if (navigator.vibrate) navigator.vibrate(15);

          if (resp.initialOption === null) resp.initialOption = idx;
          if (resp.selectedOption !== null && resp.selectedOption !== idx) resp.switches++;

          resp.selectedOption = idx;
          if (!resp.decisionTrail) resp.decisionTrail = [];
          resp.decisionTrail.push({ opt: idx + 1, atSec: activeExam.currentQTimeSpentSec });
          if (resp.status !== "marked") resp.status = "answered";
          renderActiveExamQuestion();
        });

        let timer;
        card.addEventListener("touchstart", () => {
          timer = setTimeout(() => {
            if (navigator.vibrate) navigator.vibrate([25, 40]);
            if (!resp.struck) resp.struck = [];
            if (resp.struck.includes(idx)) {
              resp.struck = resp.struck.filter(i => i !== idx);
            } else {
              resp.struck.push(idx);
              if (resp.selectedOption === idx) {
                resp.selectedOption = null;
                if (resp.status === "answered") resp.status = "unanswered";
              }
            }
            renderActiveExamQuestion();
          }, 550);
        });
        card.addEventListener("touchend", () => clearTimeout(timer));
      }

      card.innerHTML = `
        <span style="font-weight:700; color:var(--text-muted); font-size:13px;">${idx + 1}.</span>
        <div style="flex:1;">${formatRichText(optText)}</div>
        ${isRev && idx === q.correctIndex ? '<span style="font-size:11px; font-weight:800; color:var(--status-green);">âœ“ Correct</span>' : ''}
        ${isRev && idx === resp.selectedOption && idx !== q.correctIndex ? '<span style="font-size:11px; font-weight:800; color:var(--status-red);">âœ— Your Pick</span>' : ''}
      `;
      container.appendChild(card);
    });

    if (!isRev) activeExam.currentQTimeSpentSec = 0;
  }

  // Safe Navigation Event Bindings
  safeBind("btn-q-save-next", "click", () => {
    if (!activeExam) return;
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const resp = activeExam.userResponses[q.id];

    if (!activeExam.isReviewMode && resp.selectedOption !== null && resp.status !== "marked") {
      resp.status = "answered";
    }

    const nextIdx = activeExam.currentQuestionIndex + 1;
    if (nextIdx < activeExam.questions.length) {
      if (activeExam.isReviewMode || !activeExam.isSectionLocked || activeExam.questions[nextIdx].sectionIndex === activeExam.activeSectionIndex) {
        activeExam.currentQuestionIndex = nextIdx;
        renderActiveExamQuestion();
        return;
      }
    }
    toggleExamPalette(true);
  });

  safeBind("btn-q-prev", "click", () => {
    if (!activeExam) return;
    const prevIdx = activeExam.currentQuestionIndex - 1;
    if (prevIdx >= 0) {
      if (activeExam.isReviewMode || !activeExam.isSectionLocked || activeExam.questions[prevIdx].sectionIndex === activeExam.activeSectionIndex) {
        activeExam.currentQuestionIndex = prevIdx;
        renderActiveExamQuestion();
      }
    }
  });

  safeBind("btn-q-review", "click", () => {
    if (!activeExam || activeExam.isReviewMode) return;
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const resp = activeExam.userResponses[q.id];
    if (resp.status === "marked") {
      resp.status = resp.selectedOption !== null ? "answered" : "unanswered";
    } else {
      resp.status = "marked";
    }
    renderActiveExamQuestion();
  });

  function toggleExamPalette(forceOpen = null) {
    if (document.activeElement) document.activeElement.blur();
    const drawer = document.getElementById("exam-palette-drawer");
    const overlay = document.getElementById("exam-drawer-overlay");
    if (!drawer || !overlay) return;

    const isOpen = drawer.classList.contains("open");
    const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

    if (shouldOpen) {
      renderExamPaletteGrid();
      drawer.classList.add("open");
      overlay.classList.add("active");
    } else {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    }
  }

  function renderExamPaletteGrid(filterSectionIndex = null) {
    const grid = document.getElementById("exam-palette-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const tabsWrap = document.getElementById("exam-palette-section-tabs");
    if (tabsWrap) tabsWrap.innerHTML = "";

    const isRev = !!activeExam.isReviewMode;
    const isLocked = activeExam.isSectionLocked && !isRev;

    if (tabsWrap) {
      activeExam.sections.forEach((sec, sIdx) => {
        const tabBtn = document.createElement("button");
        tabBtn.className = "anchor-pill" + (sIdx === activeExam.activeSectionIndex ? " active" : "");
        
        if (isLocked && sec.locked) {
          tabBtn.innerText = `ðŸ”’ ${sec.name.split(" ")[0]}`;
          tabBtn.style.opacity = "0.5";
          tabBtn.style.cursor = "not-allowed";
        } else if (isLocked && sIdx > activeExam.activeSectionIndex) {
          tabBtn.innerText = `â³ ${sec.name.split(" ")[0]}`;
          tabBtn.style.opacity = "0.6";
        } else {
          tabBtn.innerText = sec.name.split(" ")[0];
          tabBtn.addEventListener("click", () => {
            if (isLocked && sIdx !== activeExam.activeSectionIndex) {
              alert("Sectional lock is active! Sections must be completed sequentially.");
              return;
            }
            activeExam.activeSectionIndex = sIdx;
            renderExamPaletteGrid(sIdx);
          });
        }
        tabsWrap.appendChild(tabBtn);
      });
    }

    const targetSec = filterSectionIndex !== null 
      ? filterSectionIndex 
      : (isLocked ? activeExam.activeSectionIndex : null);
      
    const displayedQs = targetSec !== null 
      ? activeExam.questions.filter(q => q.sectionIndex === targetSec) 
      : activeExam.questions;

    if (!isRev) {
      let ans = 0, marked = 0, unans = 0;
      activeExam.questions.forEach(q => {
        const resp = activeExam.userResponses[q.id];
        if (resp.status === "answered") ans++;
        else if (resp.status === "marked") marked++;
        else unans++;
      });
      safeSetText("exam-count-ans", ans);
      safeSetText("exam-count-marked", marked);
      safeSetText("exam-count-unans", unans);
    }

    displayedQs.forEach(q => {
      const resp = activeExam.userResponses[q.id] || {};
      const isSecLocked = isLocked && activeExam.sections[q.sectionIndex] && activeExam.sections[q.sectionIndex].locked;

      const cell = document.createElement("div");
      cell.className = "palette-cell";

      if (isRev) {
        const isAtt = resp.selectedOption !== null && resp.selectedOption !== undefined;
        const isCor = isAtt && resp.selectedOption === q.correctIndex;
        if (isCor) cell.classList.add("rev-correct");
        else if (isAtt) cell.classList.add("rev-incorrect");
        else cell.classList.add("rev-unanswered");
      } else {
        if (isSecLocked) cell.classList.add("locked-cell");
        else if (resp.status === "answered") cell.classList.add("answered");
        else if (resp.status === "marked") cell.classList.add("marked");
        else cell.classList.add("unanswered");
      }

      if (activeExam.questions[activeExam.currentQuestionIndex].id === q.id) {
        cell.classList.add("current");
      }

      cell.innerText = q.globalNumber || (activeExam.questions.findIndex(item => item.id === q.id) + 1);

      cell.addEventListener("click", () => {
        if (isSecLocked) {
          alert("This section is sealed and locked!");
          return;
        }
        if (isLocked && q.sectionIndex !== activeExam.activeSectionIndex) {
          alert("Cannot access future sections until current section is locked!");
          return;
        }
        activeExam.currentQuestionIndex = activeExam.questions.findIndex(item => item.id === q.id);
        toggleExamPalette(false);
        renderActiveExamQuestion();
      });

      grid.appendChild(cell);
    });
  }

  // Safe Arena Pause & Minimize Bindings
  safeBind("btn-arena-pause", "pointerdown", async (e) => {
    e.preventDefault();
    if (!activeExam || activeExam.isReviewMode) return;
    activeExam.isPaused = true;
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);
    await putRecord("store_active_session", { id: "current_session", session: activeExam });

    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "flex", "important");
  });

  safeBind("btn-resume-exam", "click", () => {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");
    if (activeExam) {
      activeExam.isPaused = false;
      startExamTimers();
    }
  });

  safeBind("btn-minimize-exam", "click", async () => {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");
    safeSetDisplay("exam-arena", "none");
    updateMiniPlayerDock();
  });

  safeBind("btn-exit-exam", "click", async () => {
    if (confirm("Abandon active mock test? Current unsubmitted progress will be lost.")) {
      const shield = document.getElementById("pause-shield");
      if (shield) shield.style.setProperty("display", "none", "important");
      safeSetDisplay("exam-arena", "none");
      clearInterval(examTimerInterval);
      clearInterval(questionTimerInterval);
      await deleteRecordFromStore("store_active_session", "current_session");
      activeExam = null;
      hideMiniPlayer();
      renderDashboard();
    }
  });

  function updateMiniPlayerDock() {
    if (!activeExam || activeExam.isReviewMode) {
      hideMiniPlayer();
      return;
    }
    const dock = document.getElementById("mini-player-dock");
    if (!dock) return;

    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const m = Math.floor(activeExam.sectionRemainingSec / 60);
    const s = activeExam.sectionRemainingSec % 60;
    let ansCount = 0;
    Object.values(activeExam.userResponses).forEach(r => { if (r.status === "answered") ansCount++; });

    safeSetText("mini-player-title", activeExam.title);
    safeSetText("mini-player-sub", `${q && q.sectionName ? q.sectionName.split(' ')[0] : 'Exam'} â€¢ Q${q ? (q.globalNumber || 1) : 1}`);
    safeSetText("mini-player-time", `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    safeSetText("mini-player-ans", `${ansCount}/${activeExam.questions.length} Ans`);

    dock.style.display = "flex";
  }

  function hideMiniPlayer() {
    safeSetDisplay("mini-player-dock", "none");
  }

  async function resumeFromMiniPlayer() {
    if (!activeExam) {
      const saved = await getRecord("store_active_session", "current_session");
      if (saved && saved.session) activeExam = saved.session;
    }
    if (!activeExam) return;

    hideMiniPlayer();
    activeExam.isPaused = false;
    pushNavLayer("exam-arena", () => {
      const pauseBtn = document.getElementById("btn-arena-pause");
      if (pauseBtn) pauseBtn.click();
    });
    safeSetDisplay("exam-arena", "flex");
    renderActiveExamQuestion();
    startExamTimers();
  }

  safeBind("btn-submit-exam", "click", () => {
    if (confirm("Confirm final submission of full mock test?")) {
      toggleExamPalette(false);
      submitExamSession();
    }
  });

  /**
   * TEST SUBMISSION ENGINE & EPHEMERAL QUESTION ISOLATION:
   * Ephemeral test questions attach strictly to the active mock session
   * and persist in store_attempts without polluting store_questions.
   */
  async function submitExamSession() {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    let correct = 0, incorrect = 0, traps = 0, totalMarks = 0;
    let penaltyDrag = 0, switchDelta = 0;

    for (const q of activeExam.questions) {
      const resp = activeExam.userResponses[q.id];
      if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
        const isCorrect = resp.selectedOption === q.correctIndex;
        
        if (!isCorrect && resp.timeSpentSec <= 8 && activeExam.sectionRemainingSec < 90) {
          resp.isPanicSlip = true;
        } else {
          resp.isPanicSlip = false;
        }

        if (isCorrect) {
          totalMarks += 2.0;
          correct++;
          if (resp.initialOption !== null && resp.initialOption !== q.correctIndex) {
            switchDelta++;
          }
          if (resp.timeSpentSec <= 10) {
            resp.errorTag = "SPEED_MASTERY";
          }
        } else {
          totalMarks -= 0.5;
          penaltyDrag += 0.5;
          incorrect++;

          if (resp.initialOption === q.correctIndex) {
            switchDelta--;
          }

          if (resp.timeSpentSec > 90) traps++;

          if (!resp.errorTag || resp.errorTag === "UNCLASSIFIED") {
            if (resp.isPanicSlip) {
              resp.errorTag = "PANIC_SLIP";
            } else if (resp.switches > 0 && resp.initialOption === q.correctIndex) {
              resp.errorTag = "SECOND_GUESS_BLUNDER";
            } else if (resp.timeSpentSec > 90) {
              resp.errorTag = "TIME_TRAP_Q4";
            } else if (resp.timeSpentSec <= 12) {
              resp.errorTag = "SPEED_MISREAD";
            } else {
              resp.errorTag = "CONCEPT_VOID";
            }
          }
        }
      }
    }

    const now = Date.now();
    activeExam.completed = true;
    activeExam.timestamp = now;
    activeExam.timeIST = formatISTDate(now);
    activeExam.diurnalSlot = getDiurnalSlot(now);
    activeExam.finalScore = totalMarks;
    activeExam.correctCount = correct;
    activeExam.incorrectCount = incorrect;
    activeExam.q4Traps = traps;
    activeExam.penaltyDrag = penaltyDrag;
    activeExam.switchDelta = switchDelta;

    await deleteRecordFromStore("store_active_session", "current_session");
    hideMiniPlayer();

    // Persist full session (including ephemeral questions) to store_attempts
    await putRecord("store_attempts", activeExam);

    safeSetDisplay("exam-arena", "none");
    await renderDashboard();
    openMockReview(activeExam);
  }

  async function reattemptMock(sessionId) {
    const attempts = await getAllRecords("store_attempts");
    const target = attempts.find(a => a.sessionId === sessionId);
    if (!target) return;

    const modalReview = document.getElementById("modal-mock-review");
    if (modalReview) modalReview.classList.remove("active");
    const modalArchive = document.getElementById("modal-history-archive");
    if (modalArchive) modalArchive.classList.remove("active");

    const rootId = target.parentSessionId || target.sessionId;
    const threadAttempts = attempts.filter(a => a.sessionId === rootId || a.parentSessionId === rootId);
    const nextAttemptNumber = threadAttempts.length + 1;

    const parsedSections = target.sections && target.sections.length > 0 
      ? JSON.parse(JSON.stringify(target.sections)).map(s => ({ ...s, locked: false })) 
      : [{ id: "SEC_1", name: "Section 1", durationSec: 900, locked: false }];

    const now = Date.now();
    activeExam = {
      sessionId: "mock_re_" + now,
      parentSessionId: rootId,
      attemptNumber: nextAttemptNumber,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: `${target.title.replace(/^Re-attempt:\s*/i, '')}`,
      mockType: target.mockType || "CUSTOM",
      signatureTag: target.signatureTag || "",
      isSectionLocked: !!target.isSectionLocked,
      isEphemeral: !!target.isEphemeral,
      sections: parsedSections,
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      questions: target.questions.map((q, idx) => ({ 
        ...q, 
        sectionIndex: (typeof q.sectionIndex === "number" && q.sectionIndex >= 0 && q.sectionIndex < parsedSections.length) ? q.sectionIndex : 0,
        globalNumber: idx + 1 
      })),
      sectionRemainingSec: parsedSections[0].durationSec || 900,
      currentQTimeSpentSec: 0,
      userResponses: {},
      isPaused: false,
      isReviewMode: false
    };

    activeExam.questions.forEach(q => {
      activeExam.userResponses[q.id] = {
        selectedOption: null,
        initialOption: null,
        status: "unanswered",
        switches: 0,
        decisionTrail: [],
        timeSpentSec: 0,
        struck: []
      };
    });

    await putRecord("store_active_session", { id: "current_session", session: activeExam });
    hideMiniPlayer();

    if (document.activeElement) document.activeElement.blur();
    pushNavLayer("exam-arena", () => {
      const pauseBtn = document.getElementById("btn-arena-pause");
      if (pauseBtn) pauseBtn.click();
    });
    safeSetDisplay("exam-arena", "flex");
    renderActiveExamQuestion();
    startExamTimers();
  }

  function enterFullScreenReviewArena() {
    if (!activeReviewAttempt) return;
    const m = document.getElementById("modal-mock-review");
    if (m) m.classList.remove("active");

    activeExam = {
      ...JSON.parse(JSON.stringify(activeReviewAttempt)),
      isReviewMode: true,
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      currentQTimeSpentSec: 0,
      isPaused: false
    };

    pushNavLayer("exam-arena", () => {
      safeSetDisplay("exam-arena", "none");
    });
    safeSetDisplay("exam-arena", "flex");
    renderActiveExamQuestion();
    startExamTimers();
  }

  function exitReviewArena() {
    safeSetDisplay("exam-arena", "none");
    activeExam = null;
    if (activeReviewAttempt) {
      openMockReview(activeReviewAttempt);
    }
  }

  /**
   * INDEPENDENT SECTIONAL CLOCK INTEGRITY:
   * Preserves explicitly configured section durations. Divides total time
   * evenly only if section-specific durations were not assigned.
   */
  async function compileAndLaunchArena(title, questionsPool, durationMin, isSectionLocked = false, customSections = null, isEphemeral = false) {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    const lockActive = (isSectionLocked === true || isSectionLocked === "YES");
    let configuredSections = [];
    let flattenedQuestions = [];
    let globalCounter = 1;

    if (Array.isArray(customSections) && customSections.length > 0) {
      configuredSections = customSections.map((sec, sIdx) => ({
        id: sec.id || `SEC_${sIdx + 1}`,
        subject: sec.subject || "QA",
        name: sec.name || `${TAXONOMY[sec.subject]?.name || sec.subject} (Part ${sIdx + 1})`,
        durationSec: sec.durationSec || (sec.durationMin ? sec.durationMin * 60 : Math.round((durationMin * 60) / customSections.length)),
        questionCount: sec.questionCount || 0,
        locked: false
      }));

      flattenedQuestions = questionsPool.map((q, idx) => ({
        ...q,
        sectionIndex: typeof q.sectionIndex === "number" ? q.sectionIndex : 0,
        sectionName: q.sectionName || (configuredSections[q.sectionIndex || 0]?.name || title),
        localNumber: q.localNumber || (idx + 1),
        globalNumber: q.globalNumber || (idx + 1)
      }));
    } else {
      const rawSections = {};
      questionsPool.forEach((q) => {
        const sKey = (q.sectionIndex !== undefined && q.sectionName) 
          ? `${q.sectionIndex}_${q.sectionName}` 
          : `sub_${q.subject || 'GEN'}`;
        if (!rawSections[sKey]) {
          rawSections[sKey] = {
            subject: q.subject || "QA",
            name: q.sectionName || (TAXONOMY[q.subject] ? TAXONOMY[q.subject].name : q.subject || "Section"),
            questions: []
          };
        }
        rawSections[sKey].questions.push(q);
      });

      const secKeys = Object.keys(rawSections);

      if (secKeys.length > 1) {
        const secDuration = Math.round((durationMin * 60) / secKeys.length);
        secKeys.forEach((sKey, sIdx) => {
          const secData = rawSections[sKey];
          const secObj = {
            id: `SEC_${sIdx + 1}`,
            subject: secData.subject,
            name: secData.name,
            durationSec: secDuration,
            questionCount: secData.questions.length,
            locked: false
          };
          configuredSections.push(secObj);

          secData.questions.forEach((q, lIdx) => {
            flattenedQuestions.push({
              ...q,
              sectionIndex: sIdx,
              sectionName: secData.name,
              localNumber: lIdx + 1,
              globalNumber: globalCounter++
            });
          });
        });
      } else {
        configuredSections = [{
          id: "SEC_1",
          subject: questionsPool[0]?.subject || "QA",
          name: title || "Diagnostic Arena",
          durationSec: durationMin * 60,
          questionCount: questionsPool.length,
          locked: false
        }];
        flattenedQuestions = questionsPool.map((q, idx) => ({
          ...q,
          sectionIndex: 0,
          sectionName: title || "Diagnostic Arena",
          localNumber: idx + 1,
          globalNumber: idx + 1
        }));
      }
    }

    const now = Date.now();
    activeExam = {
      sessionId: "ai_mock_" + now,
      parentSessionId: null,
      attemptNumber: 1,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: title || "AI Practice Arena",
      mockType: configuredSections.length > 1 ? "CUSTOM" : "SECTIONAL",
      isSectionLocked: lockActive,
      isEphemeral: !!isEphemeral,
      sections: configuredSections,
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      questions: flattenedQuestions,
      sectionRemainingSec: configuredSections[0].durationSec,
      currentQTimeSpentSec: 0,
      userResponses: {},
      isPaused: false,
      isReviewMode: false
    };

    activeExam.questions.forEach(q => {
      activeExam.userResponses[q.id] = {
        selectedOption: null,
        initialOption: null,
        status: "unanswered",
        switches: 0,
        decisionTrail: [],
        timeSpentSec: 0,
        struck: []
      };
    });

    await putRecord("store_active_session", { id: "current_session", session: activeExam });
    hideMiniPlayer();

    if (document.activeElement) document.activeElement.blur();
    pushNavLayer("exam-arena", () => {
      const pauseBtn = document.getElementById("btn-arena-pause");
      if (pauseBtn) pauseBtn.click();
    });
    safeSetDisplay("exam-arena", "flex");
    renderActiveExamQuestion();
    startExamTimers();
  }

  // --- End of Part 3 of 4 --


  /* ==========================================================================
   * SECTION 21: CONSOLE COMMAND BUS (V2) & BIDIRECTIONAL AI PERSISTENT MEMORY
   * Dynamic Subject Scoping, Concept CRUD & Search Cache Invalidation
   * ========================================================================== */
  const COMMAND_REGISTRY = {
    // 1. Symmetrical Mock Creation (Dynamic, Explicit IDs, or Ephemeral Generation)
    CREATE_MOCK: async (payload) => {
      const isEphemeral = (payload.ephemeral === true || payload.persistQuestions === false);
      const isLocked = (payload.isSectionLocked === true || payload.isSectionLocked === "YES");
      const config = {
        ...(payload.selection || payload),
        isSectionLocked: isLocked,
        ephemeral: isEphemeral,
        persistQuestions: !isEphemeral
      };
      const instance = await MockService.generate(config);

      let savedRecord = null;
      if (!isEphemeral && (payload.saveAsPreset || payload.saveBlueprint)) {
        savedRecord = await MockService.saveMockDefinition({
          title: payload.title || instance.title,
          type: payload.selection ? "DYNAMIC_BLUEPRINT" : "FIXED_PAPER",
          selectionRule: payload.selection || null,
          isSectionLocked: instance.isSectionLocked,
          sections: instance.sections,
          questions: instance.questions
        });
      }

      if (payload.launchImmediately) {
        await MockService.launchMockSession(instance);
      }

      return {
        mockId: savedRecord ? savedRecord.id : `instance_${Date.now()}`,
        title: instance.title,
        questionCount: instance.totalSelected,
        isSectionLocked: instance.isSectionLocked,
        sectionsCount: instance.sections ? instance.sections.length : 1,
        isEphemeral: isEphemeral,
        questionIds: instance.questions.map(q => q.id),
        launched: !!payload.launchImmediately
      };
    },

    // 1B. Full AI Database Introspection Suite
    GET_SYSTEM_STATS: async () => {
      const allQs = await getAllRecords("store_questions");
      const allAttempts = await getAllRecords("store_attempts");
      const allFlashcards = await getAllRecords("store_flashcards");
      const allConcepts = await ConceptService.getAll();
      const allPresets = await getAllRecords("store_saved_mocks");
      const allConsultations = await getAllRecords("store_ai_consultations");

      const bySubject = {};
      const byChapter = {};
      allQs.forEach(q => {
        const s = q.subject || "UNKNOWN";
        const c = q.chapter || "UNKNOWN";
        bySubject[s] = (bySubject[s] || 0) + 1;
        byChapter[c] = (byChapter[c] || 0) + 1;
      });

      return {
        totalQuestions: allQs.length,
        questionsBySubject: bySubject,
        questionsByChapter: byChapter,
        completedMocksCount: allAttempts.filter(a => a.completed).length,
        totalAttemptsCount: allAttempts.length,
        cardVaultCount: allFlashcards.length,
        livingSheetsCount: allConcepts.length,
        savedMocksCount: allPresets.length,
        consultationsCount: allConsultations.length,
        schemaVersion: DB_VERSION,
        taxonomy: TAXONOMY
      };
    },

    FETCH_QUESTIONS: async (payload) => {
      const allQs = await getAllRecords("store_questions");
      const { ids, subject, chapter, difficulty, limit = 50, offset = 0, idsOnly = false } = payload || {};

      let filtered = allQs;
      if (Array.isArray(ids) && ids.length > 0) {
        const idSet = new Set(ids);
        filtered = allQs.filter(q => idSet.has(q.id));
      } else {
        if (subject && subject !== "ALL") filtered = filtered.filter(q => q.subject === subject);
        if (chapter && chapter !== "ALL") filtered = filtered.filter(q => q.chapter === chapter);
        if (difficulty && difficulty !== "ALL") filtered = filtered.filter(q => q.difficulty === difficulty);
      }

      const totalMatching = filtered.length;
      const numLimit = (limit === "ALL" || limit === -1) ? totalMatching : parseInt(limit, 10);
      const sliced = filtered.slice(offset, offset + numLimit);

      return {
        totalMatching: totalMatching,
        returnedCount: sliced.length,
        offset: offset,
        questions: idsOnly ? sliced.map(q => q.id) : sliced
      };
    },

    FETCH_STORE_RECORDS: async (payload) => {
      const { store, keys, limit = 50, offset = 0 } = payload || {};
      if (!store) throw new Error("A valid store name is required.");
      const records = await getAllRecords(store);

      let filtered = records;
      if (Array.isArray(keys) && keys.length > 0) {
        const keySet = new Set(keys);
        filtered = records.filter(r => keySet.has(r.id || r.sessionId || r.key));
      }

      const totalRecords = filtered.length;
      const numLimit = (limit === "ALL" || limit === -1) ? totalRecords : parseInt(limit, 10);
      const sliced = filtered.slice(offset, offset + numLimit);

      return {
        store: store,
        totalRecords: totalRecords,
        returnedCount: sliced.length,
        records: sliced
      };
    },

    VERIFY_QUESTION_EXISTS: async (payload) => {
      const { ids = [] } = payload || {};
      const allQs = await getAllRecords("store_questions");
      const existingSet = new Set(allQs.map(q => q.id));
      const found = ids.filter(id => existingSet.has(id));
      const missing = ids.filter(id => !existingSet.has(id));
      return { totalQueried: ids.length, foundCount: found.length, missingCount: missing.length, found, missing };
    },

    // 2. Safe Read & Telemetry Queries
    SEARCH_QUESTIONS: async (payload) => {
      const res = await SearchService.searchAll(payload.query, payload.filters || payload, payload.limit || 25);
      return { count: res.totalQuestions, results: res.questions };
    },

    SEARCH_CONCEPTS: async (payload) => {
      const res = await SearchService.searchAll(payload.query, payload.filters || payload, payload.limit || 25);
      return { count: res.totalConcepts, results: res.concepts };
    },

    GET_TAXONOMY: async () => {
      return await TaxonomyService.getTaxonomy();
    },

    GET_PERFORMANCE: async (payload) => {
      if (payload && payload.subject && payload.chapter) {
        return await PerformanceService.getChapterStats(payload.subject, payload.chapter);
      }
      return await PerformanceService.calculateGlobalMetrics();
    },

    GET_WEAK_CHAPTERS: async (payload) => {
      return await PerformanceService.getWeakChapters(payload ? payload.subject : null);
    },

    GET_MOCK: async (payload) => {
      return await getRecord("store_saved_mocks", payload.mockId);
    },

    LIST_MOCKS: async () => {
      return await getAllRecords("store_saved_mocks");
    },

    // 3. Question CRUD
    CREATE_QUESTION: async (payload) => {
      const q = await QuestionService.create(payload.question || payload);
      SearchService.invalidate();
      return { created: true, id: q.id, question: q };
    },

    UPDATE_QUESTION: async (payload) => {
      const q = await QuestionService.update(payload.id, payload.updates || payload);
      SearchService.invalidate();
      return { updated: true, id: q.id };
    },

    DELETE_QUESTION: async (payload) => {
      const res = await QuestionService.delete(payload.id);
      SearchService.invalidate();
      return res;
    },

    DELETE_MOCK: async (payload) => {
      return await MockService.deleteMock(payload.mockId);
    },

    // 4. Living Knowledge Sheet (Concept) CRUD
    CREATE_CONCEPT: async (payload) => {
      const c = await ConceptService.create(payload.concept || payload);
      SearchService.invalidate();
      return { created: true, id: c.id, concept: c };
    },

    UPDATE_CONCEPT: async (payload) => {
      const c = await ConceptService.update(payload.id, payload.updates || payload);
      SearchService.invalidate();
      return { updated: true, id: c.id };
    },

    DELETE_CONCEPT: async (payload) => {
      const res = await ConceptService.delete(payload.id);
      SearchService.invalidate();
      return { deleted: true, id: payload.id };
    },

    // 5. Safe Taxonomy Operations
    ADD_CHAPTER: async (payload) => {
      const chap = await TaxonomyService.addChapter(payload.subject, payload.chapter);
      return { success: true, chapter: chap };
    },

    MERGE_CHAPTERS: async (payload) => {
      await TaxonomyService.mergeChapters(payload.subject, payload.sourceChapter, payload.targetChapter);
      return { success: true, merged: `${payload.sourceChapter} âž” ${payload.targetChapter}` };
    },

    // 6. Bidirectional AI Memory Storage & Retrieval
    SAVE_AI_INSIGHT: async (payload) => {
      const insight = {
        id: payload.insightId || `insight_${Date.now()}`,
        type: payload.type || "weakness",
        subject: payload.subject || "QA",
        chapter: payload.chapter || "",
        concept: payload.concept || "",
        statement: payload.statement || "",
        evidenceIds: Array.isArray(payload.evidence) ? payload.evidence : [],
        confidence: payload.confidence || 0.85,
        status: payload.status || "active",
        recommendedAction: payload.recommendedAction || "",
        createdAt: payload.createdAt || Date.now(),
        updatedAt: Date.now()
      };
      await putRecord("store_ai_consultations", insight);
      return { success: true, insightId: insight.id };
    },

    SAVE_AI_PLAN: async (payload) => {
      const plan = {
        id: payload.planId || `plan_${Date.now()}`,
        goal: payload.goal || "Remediation",
        subject: payload.subject || "QA",
        steps: Array.isArray(payload.steps) ? payload.steps : [],
        successCondition: payload.successCondition || "â‰¥80% accuracy",
        status: payload.status || "active",
        createdAt: Date.now()
      };
      await putRecord("store_ai_consultations", plan);
      return { success: true, planId: plan.id };
    },

    GET_AI_CONTEXT: async () => {
      const allConsultations = await getAllRecords("store_ai_consultations");
      const attempts = await getAllRecords("store_attempts");
      const global = await PerformanceService.calculateGlobalMetrics();
      const weak = await PerformanceService.getWeakChapters();

      return {
        timestampIST: formatISTDate(Date.now()),
        globalMetrics: global,
        weakAreas: weak.slice(0, 5),
        recentCompletedAttemptsCount: attempts.filter(a => a.completed).length,
        persistedAiConsultations: allConsultations.slice(-10)
      };
    },

    // 7. Protected Raw DB Directive
    RAW_DB_OPERATION: async (payload) => {
      const { store, operation, key, record, confirmationToken } = payload;
      const allowedStores = [
        "store_questions", "store_concepts", "store_flashcards",
        "store_notes", "store_saved_mocks", "store_ai_consultations", "store_config"
      ];
      if (!allowedStores.includes(store)) throw new Error(`Disallowed store: ${store}`);

      if (operation === "CLEAR") {
        if (confirmationToken !== "CONFIRM_DESTROY_STORE") {
          throw new Error("Destructive operation blocked: Missing valid confirmationToken.");
        }
        await clearStore(store);
        SearchService.invalidate();
        return { success: true, operation: "CLEAR", store };
      } else if (operation === "PUT") {
        await putRecord(store, record);
        SearchService.invalidate();
        return { success: true, operation: "PUT", store };
      } else if (operation === "DELETE") {
        await deleteRecordFromStore(store, key);
        SearchService.invalidate();
        return { success: true, operation: "DELETE", store, key };
      }
      throw new Error(`Unsupported raw operation: ${operation}`);
    },

    // 8. Batch Ingestion Handlers with Search Invalidation
    BATCH_INGEST_QUESTIONS: async (payload) => {
      const count = await QuestionService.bulkCreate(payload.questions, "Ingested Bank");
      SearchService.invalidate();
      return { success: true, count: count };
    },

    BATCH_INGEST_COMPENDIUM: async (payload) => {
      const dossiers = (payload.dossiers || []).map(sanitizeDossier);
      await runTx(["store_concepts"], "readwrite", (tx) => {
        const stC = tx.objectStore("store_concepts");
        dossiers.forEach(d => stC.put(d));
      });
      SearchService.invalidate();
      return { success: true, count: dossiers.length };
    },

    BATCH_INGEST_FLASHCARDS: async (payload) => {
      const cards = (payload.cards || []).map(sanitizeFlashcard);
      await runTx(["store_flashcards"], "readwrite", (tx) => {
        const stF = tx.objectStore("store_flashcards");
        cards.forEach(c => stF.put(c));
      });
      return { success: true, count: cards.length };
    },

    INGEST_AND_ASSEMBLE_COMPLETE_MOCK: async (payload) => {
      const {
        title = "Curated Practice Mock",
        launchImmediately = false,
        isSectionLocked = false,
        durationMin = 20,
        dossiers = [],
        newQuestions = [],
        linkExistingQuestions = [],
        orderedMockQuestionIds = [],
        sections = null
      } = payload;

      const isLocked = (isSectionLocked === true || isSectionLocked === "YES");

      if (dossiers.length > 0) {
        await runTx(["store_concepts"], "readwrite", (tx) => {
          const st = tx.objectStore("store_concepts");
          dossiers.forEach(d => st.put(sanitizeDossier(d)));
        });
      }
      if (newQuestions.length > 0) {
        for (const nq of newQuestions) {
          const item = sanitizeQuestion(nq);
          if (item.ephemeral !== true && item.persist !== false) {
            await putRecord("store_questions", item);
          }
        }
      }
      if (linkExistingQuestions.length > 0) {
        for (const link of linkExistingQuestions) {
          const oldQ = await QuestionService.get(link.questionId);
          if (oldQ) {
            const newCIds = Array.isArray(link.assignConceptIds) ? link.assignConceptIds : [link.assignConceptId];
            oldQ.conceptIds = [...new Set([...(oldQ.conceptIds || []), ...newCIds])];
            oldQ.conceptId = oldQ.conceptIds[0] || "";
            await putRecord("store_questions", oldQ);
          }
        }
      }

      const allQs = await getAllRecords("store_questions");
      const resolved = [];
      const addedIds = new Set();

      // Resolve from explicit IDs
      orderedMockQuestionIds.forEach(id => {
        const found = allQs.find(q => q.id === id);
        if (found && !addedIds.has(found.id)) {
          resolved.push({ ...found });
          addedIds.add(found.id);
        }
      });

      // Append new questions
      newQuestions.forEach(nq => {
        const item = sanitizeQuestion(nq);
        if (!addedIds.has(item.id)) {
          resolved.push(item);
          addedIds.add(item.id);
        }
      });

      // Build Discrete Sections for Timers & Locking
      let resolvedSections = sections;
      if (!resolvedSections || resolvedSections.length === 0) {
        const rawSecMap = {};
        resolved.forEach(q => {
          const sub = q.subject || "QA";
          if (!rawSecMap[sub]) rawSecMap[sub] = [];
          rawSecMap[sub].push(q);
        });

        const subKeys = Object.keys(rawSecMap);
        const secDuration = Math.round(durationMin / Math.max(1, subKeys.length));
        resolvedSections = subKeys.map((sKey, idx) => ({
          id: `SEC_${idx + 1}_${sKey}`,
          subject: sKey,
          name: `${TAXONOMY[sKey]?.name || sKey}`,
          count: rawSecMap[sKey].length,
          durationMin: secDuration
        }));
      }

      const paper = await MockService.saveMockDefinition({
        title: title,
        type: "FIXED_PAPER",
        isSectionLocked: isLocked,
        sections: resolvedSections,
        questions: resolved
      });

      SearchService.invalidate();

      if (launchImmediately) {
        await compileAndLaunchArena(title, resolved, durationMin, isLocked, resolvedSections, false);
      }

      return {
        success: true,
        mockId: paper.id,
        questionsCount: resolved.length,
        isSectionLocked: isLocked,
        sectionsCount: resolvedSections.length
      };
    },

    EXECUTE_AI_CONSULTATION_BUNDLE: async (payload) => {
      const { consultationDossier, actions = [] } = payload;
      if (consultationDossier) {
        const now = Date.now();
        consultationDossier.id = consultationDossier.consultationId || `consult_${now}`;
        consultationDossier.timestamp = now;
        consultationDossier.timeIST = formatISTDate(now);
        await putRecord("store_ai_consultations", consultationDossier);
      }

      for (const act of actions) {
        const handler = COMMAND_REGISTRY[act.action];
        if (handler) {
          await handler(act.payload || {});
        }
      }
      SearchService.invalidate();
      return { success: true, actionsExecuted: actions.length };
    },

    REQUEST_HISTORICAL_DUMP: async (payload) => {
      const { targetSubject, timeframeDays = 30 } = payload;
      const cutoff = timeframeDays > 0 ? Date.now() - (timeframeDays * 24 * 60 * 60 * 1000) : 0;
      const allAttempts = await getAllRecords("store_attempts");
      const dump = allAttempts.filter(a => a.completed && a.timestamp >= cutoff).map(a => ({
        sessionId: a.sessionId,
        timeIST: a.timeIST || formatISTDate(a.timestamp),
        diurnalSlot: a.diurnalSlot || getDiurnalSlot(a.timestamp),
        score: a.finalScore,
        questions: (a.questions || []).filter(q => !targetSubject || q.subject === targetSubject).map(q => ({
          id: q.id,
          chapter: q.chapter,
          resp: a.userResponses[q.id]
        }))
      }));
      return { targetSubject, timeframeDays, count: dump.length, dump };
    },

    INGEST_AND_LAUNCH_MOCK: async (payload) => {
      const isEphemeral = (payload.ephemeral === true || payload.persistQuestions === false);
      const isLocked = (payload.isSectionLocked === true || payload.isSectionLocked === "YES");
      const rawQuestions = Array.isArray(payload.questions) ? payload.questions : [];
      const questions = [];

      for (const q of rawQuestions) {
        const item = sanitizeQuestion(q);
        const itemEphemeral = item.ephemeral === true || isEphemeral;
        if (!itemEphemeral) {
          await putRecord("store_questions", item);
        } else {
          item.ephemeral = true;
        }
        questions.push(item);
      }

      if (!isEphemeral) SearchService.invalidate();

      // Resolve Multi-Section Wiring
      let resolvedSections = payload.sections;
      if (!resolvedSections || resolvedSections.length === 0) {
        const rawSecMap = {};
        questions.forEach(q => {
          const sub = q.subject || "QA";
          if (!rawSecMap[sub]) rawSecMap[sub] = [];
          rawSecMap[sub].push(q);
        });

        const subKeys = Object.keys(rawSecMap);
        const secDuration = Math.round((payload.durationMin || 15) / Math.max(1, subKeys.length));
        resolvedSections = subKeys.map((sKey, idx) => ({
          id: `SEC_${idx + 1}_${sKey}`,
          subject: sKey,
          name: `${TAXONOMY[sKey]?.name || sKey}`,
          count: rawSecMap[sKey].length,
          durationMin: secDuration
        }));
      }

      await compileAndLaunchArena(payload.title || "AI Practice Mock", questions, payload.durationMin || 15, isLocked, resolvedSections, isEphemeral);
      return {
        success: true,
        launched: true,
        isEphemeral: isEphemeral,
        isSectionLocked: isLocked,
        sectionsCount: resolvedSections.length,
        questionCount: questions.length
      };
    },


    AI_PRESCRIBE_REMEDY: async (payload) => {
      const qIds = payload.questionIds || [];
      const newQuestions = (payload.newQuestions || []).map(sanitizeQuestion);
      if (newQuestions.length > 0) {
        await QuestionService.bulkCreate(newQuestions, "Remedial Question");
        SearchService.invalidate();
      }
      const allQs = await getAllRecords("store_questions");
      let remedialPool = allQs.filter(q => qIds.includes(q.id));
      if (newQuestions.length > 0) remedialPool = [...remedialPool, ...newQuestions];

      await compileAndLaunchArena(payload.title || "AI Prescribed Remedial Blitz", remedialPool, payload.durationMin || 10, false);
      return { success: true, remedialLaunched: true, count: remedialPool.length };
    },

    SAVE_MOCK_PRESET: async (payload) => {
      const preset = sanitizeSavedMock(payload, Date.now());
      await MockService.saveMockDefinition(preset);
      return { success: true, savedPreset: preset.title };
    },

    MODIFY_TAXONOMY: async (payload) => {
      const { operation, subject, chapter } = payload;
      if (operation === "ADD_CHAPTER") {
        await TaxonomyService.addChapter(subject, chapter);
      } else if (operation === "DELETE_CHAPTER") {
        await TaxonomyService.deleteChapter(subject, chapter, "PRESERVE_UNASSIGNED");
      }
      return { success: true, operation, subject, chapter };
    }
  };

  async function executeConsoleCommand() {
    const rawInput = document.getElementById("console-payload");
    const consoleOutput = document.getElementById("console-output-box");
    if (!rawInput) return;
    const raw = rawInput.value.trim();
    let cmd;

    try {
      cmd = JSON.parse(raw);
    } catch (err) {
      alert("Invalid JSON Syntax: " + err.message);
      return;
    }

    try {
      const handler = COMMAND_REGISTRY[cmd.action];
      if (!handler) {
        throw new Error(`Unrecognized command action: ${cmd.action}`);
      }

      const result = await handler(cmd.payload || {});
      const responsePayload = {
        status: "SUCCESS",
        action: cmd.action,
        timestampIST: formatISTDate(Date.now()),
        data: result
      };

      const formattedJson = JSON.stringify(responsePayload, null, 2);
      if (consoleOutput) {
        consoleOutput.innerText = formattedJson;
        consoleOutput.style.display = "block";
      } else {
        rawInput.value = formattedJson;
      }

      await renderDashboard();
      await syncAllTaxonomyDropdowns();
    } catch (execErr) {
      const errPayload = {
        status: "ERROR",
        action: cmd ? cmd.action : "UNKNOWN",
        timestampIST: formatISTDate(Date.now()),
        error: execErr.message
      };
      const formattedErr = JSON.stringify(errPayload, null, 2);
      if (consoleOutput) {
        consoleOutput.innerText = formattedErr;
        consoleOutput.style.display = "block";
      } else {
        alert("Command Execution Error: " + execErr.message);
      }
    }
  }

  function loadSamplePayload(type) {
    if (type === "COMPLETE_BUNDLE") {
      const sample = {
        action: "INGEST_AND_ASSEMBLE_COMPLETE_MOCK",
        payload: {
          title: "Tier 1 Specialist: Circle Tangents & Alternating Work",
          launchImmediately: true,
          isSectionLocked: false,
          durationMin: 15,
          subject: "QA",
          dossiers: [
            {
              id: "top_geo_tangents_advanced",
              subject: "QA",
              chapter: "QA_GEOMETRY",
              title: "Direct & Transverse Tangent Lengths",
              subtitle: "Formulas and Center Distance Conditions",
              content: "### Direct Common Tangent (DCT)\n$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$\n\n### Transverse Common Tangent (TCT)\n$$TCT = \\sqrt{d^2 - (r_1 + r_2)^2}$$\n\n> [!trap]\n> **External Touching Circles:**\n> If $d = r_1 + r_2$, then $DCT = 2\\sqrt{r_1 r_2}$. Transverse tangent is 0."
            }
          ],
          newQuestions: [
            {
              id: "q_sample_pipe_cycle_01",
              subject: "QA",
              chapter: "QA_PIPE_CISTERN",
              subtopic: "Pipes & Cisterns",
              method: "Alternating Work",
              conceptId: "top_geo_tangents_advanced",
              conceptIds: ["top_geo_tangents_advanced"],
              questionText: "Pipe $A$ fills in $10\\text{ h}$, $B$ in $12\\text{ h}$, and $C$ empties in $15\\text{ h}$. Opened alternately for $1\\text{ h}$ ($A \\to B \\to C$). In how many hours will the tank be full?",
              options: ["$24\\text{ h } 10\\text{ m}$", "$25\\text{ h } 15\\text{ m}$", "$23\\text{ h } 40\\text{ m}$", "$26\\text{ h }$"],
              correctIndex: 0,
              explanation: "Net 3-hour cycle $= 6 + 5 - 4 = 7\\text{ units}$. Work completes before the final drain cycle."
            }
          ],
          linkExistingQuestions: [
            { questionId: "q_cgl_qa_geom_011", assignConceptIds: ["top_geo_tangents_advanced"] }
          ],
          orderedMockQuestionIds: [
            "q_sample_pipe_cycle_01",
            "q_cgl_qa_geom_011",
            "q_cgl_qa_tw_010"
          ]
        }
      };
      safeSetValue("console-payload", JSON.stringify(sample, null, 2));
    }
  }

  /* ==========================================================================
   * SECTION 22: PRACTICE LAB CONTROLLER & STEM EXPANSION TOGGLE
   * ========================================================================== */
  function handlePracticeSearchInput(val) {
    practiceSearchQuery = String(val || "").trim().toLowerCase();
    practiceCurrentPage = 1;
    renderPracticeQuestionsTable();
  }

  function handlePracticeSubjectChange(subKey) {
    const chapSelect = document.getElementById("practice-filter-chapter");
    if (!chapSelect) return;
    chapSelect.innerHTML = `<option value="ALL">All Chapters</option>`;

    if (subKey !== "ALL" && TAXONOMY[subKey] && Array.isArray(TAXONOMY[subKey].chapters)) {
      TAXONOMY[subKey].chapters.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.innerText = c;
        chapSelect.appendChild(opt);
      });
    }
    practiceCurrentPage = 1;
    renderPracticeQuestionsTable();
  }

  function setPracticeQuickFilter(filterType, btnEl) {
    practiceActiveQuickFilter = filterType;
    document.querySelectorAll('[id^="pill-filter-"]').forEach(el => el.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    practiceCurrentPage = 1;
    renderPracticeQuestionsTable();
  }

  function togglePracticeQuestionSelection(id, checked) {
    if (checked) {
      practiceSelectedIds.add(id);
    } else {
      practiceSelectedIds.delete(id);
    }
    updatePracticeSelectionUI();
  }

  function selectAllVisiblePractice(selectAll) {
    const checkboxes = document.querySelectorAll(".practice-checkbox");
    checkboxes.forEach(cb => {
      cb.checked = selectAll;
      if (selectAll) practiceSelectedIds.add(cb.dataset.id);
      else practiceSelectedIds.delete(cb.dataset.id);
    });
    updatePracticeSelectionUI();
  }

  function updatePracticeSelectionUI() {
    safeSetText("practice-selected-count", `${practiceSelectedIds.size} Selected`);
    const cards = document.querySelectorAll(".practice-q-card");
    cards.forEach(c => {
      const qId = c.dataset.id;
      c.classList.toggle("selected", practiceSelectedIds.has(qId));
    });
  }

  function navPracticePage(direction) {
    practiceCurrentPage += direction;
    renderPracticeQuestionsTable();
  }

  function togglePracticeStemExpansion(stemId) {
    const stemEl = document.getElementById(stemId);
    if (!stemEl) return;
    const isExpanded = stemEl.classList.toggle("expanded");
    const toggleBtn = document.getElementById(`toggle-${stemId}`);
    if (toggleBtn) {
      toggleBtn.innerText = isExpanded ? "[ Collapse â–² ]" : "[ Read Full Stem â–¼ ]";
    }
  }

  async function renderPracticeQuestionsTable() {
    const container = document.getElementById("practice-question-rows");
    if (!container) return;

    const sub = document.getElementById("practice-filter-subject")?.value || "ALL";
    const chap = document.getElementById("practice-filter-chapter")?.value || "ALL";
    const diff = document.getElementById("practice-filter-difficulty")?.value || "ALL";
    const perf = document.getElementById("practice-filter-performance")?.value || "ALL";

    const allQs = await getAllRecords("store_questions");
    const perfMap = await PerformanceService.getQuestionPerformanceMap();
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

    const filtered = allQs.filter(q => {
      if (sub !== "ALL" && q.subject !== sub) return false;
      if (chap !== "ALL" && q.chapter !== chap) return false;
      if (diff !== "ALL" && q.difficulty !== diff) return false;

      const pStats = perfMap[q.id];
      const attempts = pStats ? pStats.attempts : 0;
      const acc = attempts > 0 ? Math.round((pStats.correct / attempts) * 100) : 0;

      // Dropdown performance filter
      if (perf === "WEAK" && (attempts === 0 || acc >= 60)) return false;
      if (perf === "WRONG" && (!pStats || pStats.incorrect === 0)) return false;
      if (perf === "UNSEEN" && attempts > 0) return false;
      if (perf === "SLOW" && (!pStats || Math.round(pStats.totalTime / attempts) <= 75)) return false;
      if (perf === "STRONG" && (attempts === 0 || acc < 80)) return false;

      // Quick filter pills
      if (practiceActiveQuickFilter === "WEAK" && (attempts === 0 || acc >= 60)) return false;
      if (practiceActiveQuickFilter === "WRONG" && (!pStats || pStats.incorrect === 0)) return false;
      if (practiceActiveQuickFilter === "UNSEEN" && attempts > 0) return false;
      if (practiceActiveQuickFilter === "IGNORED" && pStats && pStats.lastAttemptEpoch >= sevenDaysAgo) return false;
      if (practiceActiveQuickFilter === "WITH_SHEET" && (!q.conceptId && (!Array.isArray(q.conceptIds) || q.conceptIds.length === 0))) return false;

      // Text search query
      if (practiceSearchQuery) {
        const inId = q.id.toLowerCase().includes(practiceSearchQuery);
        const inText = q.questionText.toLowerCase().includes(practiceSearchQuery);
        const inPassage = (q.passageText || "").toLowerCase().includes(practiceSearchQuery);
        const inMethod = (q.method || "").toLowerCase().includes(practiceSearchQuery);
        const inSubtopic = (q.subtopic || "").toLowerCase().includes(practiceSearchQuery);
        const inTags = Array.isArray(q.tags) && q.tags.some(t => t.toLowerCase().includes(practiceSearchQuery));
        if (!inId && !inText && !inPassage && !inMethod && !inSubtopic && !inTags) return false;
      }

      return true;
    });

    safeSetText("practice-filtered-count", filtered.length);

    const totalPages = Math.ceil(filtered.length / PRACTICE_PAGE_SIZE) || 1;
    if (practiceCurrentPage < 1) practiceCurrentPage = 1;
    if (practiceCurrentPage > totalPages) practiceCurrentPage = totalPages;

    safeSetText("practice-page-info", `Page ${practiceCurrentPage} of ${totalPages}`);
    const prevBtn = document.getElementById("btn-practice-prev-page");
    if (prevBtn) prevBtn.disabled = practiceCurrentPage <= 1;
    const nextBtn = document.getElementById("btn-practice-next-page");
    if (nextBtn) nextBtn.disabled = practiceCurrentPage >= totalPages;

    const pagedSlice = filtered.slice((practiceCurrentPage - 1) * PRACTICE_PAGE_SIZE, practiceCurrentPage * PRACTICE_PAGE_SIZE);
    container.innerHTML = "";

    if (pagedSlice.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:40px 14px; color:var(--text-muted); font-size:12.5px;">No questions match current criteria. Adjust filters or author a new question.</div>`;
      return;
    }

    pagedSlice.forEach((q, idx) => {
      const pStats = perfMap[q.id];
      const attempts = pStats ? pStats.attempts : 0;
      const acc = attempts > 0 ? Math.round((pStats.correct / attempts) * 100) : 0;
      let statusBadge = `<span class="badge" style="background:#151a24; color:var(--text-muted);">Unseen</span>`;
      if (attempts > 0) {
        if (acc >= 80) statusBadge = `<span class="badge" style="background:rgba(16,185,129,0.2); color:var(--status-green);">ðŸŸ¢ ${acc}% (${attempts}A)</span>`;
        else if (acc >= 60) statusBadge = `<span class="badge" style="background:rgba(245,158,11,0.2); color:var(--status-amber);">ðŸŸ¡ ${acc}% (${attempts}A)</span>`;
        else statusBadge = `<span class="badge" style="background:rgba(244,63,94,0.2); color:var(--status-red);">ðŸ”´ ${acc}% (${attempts}A)</span>`;
      }

      const isChecked = practiceSelectedIds.has(q.id);
      const stemDomId = `practice-stem-${practiceCurrentPage}-${idx}`;
      const card = document.createElement("div");
      card.className = "practice-q-card" + (isChecked ? " selected" : "");
      card.dataset.id = q.id;

      card.innerHTML = `
        <input type="checkbox" class="practice-checkbox" data-id="${q.id}" ${isChecked ? 'checked' : ''} onchange="CGL_OS.togglePracticeQuestionSelection('${q.id}', this.checked)">
        <div class="practice-q-main">
          <div class="practice-q-header">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="practice-q-id">${q.id}</span>
              <span class="badge" style="background:#1f6feb;">${q.subject} â€¢ ${q.chapter}</span>
              ${q.parentPassageId ? `<span class="q-passage-set-badge">SET ${q.setOrder || 1}/${q.setTotal || 1}</span>` : ''}
              ${statusBadge}
            </div>
            <div class="practice-q-actions">
              <button class="btn btn-secondary" style="padding:2px 6px; font-size:10px;" onclick="CGL_OS.QuestionService.get('${q.id}').then(q => CGL_OS.openEditQuestionModal(q))">Edit</button>
              <button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--accent-cyan);" onclick="CGL_OS.duplicateCurrentEditingQuestionFromId('${q.id}')">Clone</button>
              <button class="btn btn-cyan" style="padding:2px 8px; font-size:10px; font-weight:700;" onclick="CGL_OS.launchSingleQuestionPractice('${q.id}')">âš¡ Solve</button>
            </div>
          </div>
          <div id="${stemDomId}" class="practice-q-stem">${formatRichText(q.questionText)}</div>
          <span id="toggle-${stemDomId}" class="practice-q-stem-toggle" onclick="CGL_OS.togglePracticeStemExpansion('${stemDomId}')">[ Read Full Stem â–¼ ]</span>
          <div class="practice-q-footer">
            <span>Method: <b>${q.method || q.subtopic || 'General'}</b></span>
            <span>Source: <i>${q.source || 'Manual'}</i></span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  async function duplicateCurrentEditingQuestionFromId(id) {
    try {
      const clone = await QuestionService.duplicate(id);
      alert(`Cloned as ${clone.id}.`);
      openEditQuestionModal(clone);
    } catch (err) {
      alert("Clone Error: " + err.message);
    }
  }

  async function launchSingleQuestionPractice(id) {
    // GLOBAL SEARCH Z-INDEX TRAP RESOLUTION: Dismiss search modal if active
    const searchModal = document.getElementById("modal-global-search");
    if (searchModal && searchModal.classList.contains("active")) {
      searchModal.classList.remove("active");
    }

    const q = await QuestionService.get(id);
    if (!q) return;

    let pool = [q];
    // If question belongs to a passage set, bundle siblings automatically
    if (q.parentPassageId) {
      const siblings = await QuestionService.getByPassageId(q.parentPassageId);
      if (siblings.length > 0) pool = siblings;
    }

    await compileAndLaunchArena(`Focus Drill: ${q.chapter}`, pool, Math.max(5, pool.length * 2), false);
  }

  async function launchPracticeSelectedSession() {
    if (practiceSelectedIds.size === 0) {
      alert("Select at least one question from the list to practice.");
      return;
    }
    const allQs = await getAllRecords("store_questions");
    const selected = allQs.filter(q => practiceSelectedIds.has(q.id));
    await compileAndLaunchArena(`Custom Drill (${selected.length} Qs)`, selected, Math.max(5, Math.round(selected.length * 1.5)), false);
  }
    async function getCurrentlyFilteredPracticeQuestions() {
    const sub = document.getElementById("practice-filter-subject")?.value || "ALL";
    const chap = document.getElementById("practice-filter-chapter")?.value || "ALL";
    const diff = document.getElementById("practice-filter-difficulty")?.value || "ALL";
    const perf = document.getElementById("practice-filter-performance")?.value || "ALL";

    const allQs = await getAllRecords("store_questions");
    const perfMap = await PerformanceService.getQuestionPerformanceMap();
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

    return allQs.filter(q => {
      if (sub !== "ALL" && q.subject !== sub) return false;
      if (chap !== "ALL" && q.chapter !== chap) return false;
      if (diff !== "ALL" && q.difficulty !== diff) return false;

      const pStats = perfMap[q.id];
      const attempts = pStats ? pStats.attempts : 0;
      const acc = attempts > 0 ? Math.round((pStats.correct / attempts) * 100) : 0;

      if (perf === "WEAK" && (attempts === 0 || acc >= 60)) return false;
      if (perf === "WRONG" && (!pStats || pStats.incorrect === 0)) return false;
      if (perf === "UNSEEN" && attempts > 0) return false;
      if (perf === "SLOW" && (!pStats || Math.round(pStats.totalTime / attempts) <= 75)) return false;
      if (perf === "STRONG" && (attempts === 0 || acc < 80)) return false;

      if (practiceActiveQuickFilter === "WEAK" && (attempts === 0 || acc >= 60)) return false;
      if (practiceActiveQuickFilter === "WRONG" && (!pStats || pStats.incorrect === 0)) return false;
      if (practiceActiveQuickFilter === "UNSEEN" && attempts > 0) return false;
      if (practiceActiveQuickFilter === "IGNORED" && pStats && pStats.lastAttemptEpoch >= sevenDaysAgo) return false;
      if (practiceActiveQuickFilter === "WITH_SHEET" && (!q.conceptId && (!Array.isArray(q.conceptIds) || q.conceptIds.length === 0))) return false;

      if (practiceSearchQuery) {
        const inId = q.id.toLowerCase().includes(practiceSearchQuery);
        const inText = q.questionText.toLowerCase().includes(practiceSearchQuery);
        const inPassage = (q.passageText || "").toLowerCase().includes(practiceSearchQuery);
        const inMethod = (q.method || "").toLowerCase().includes(practiceSearchQuery);
        const inSubtopic = (q.subtopic || "").toLowerCase().includes(practiceSearchQuery);
        const inTags = Array.isArray(q.tags) && q.tags.some(t => t.toLowerCase().includes(practiceSearchQuery));
        if (!inId && !inText && !inPassage && !inMethod && !inSubtopic && !inTags) return false;
      }

      return true;
    });
  }

  async function launchSeeQuestions() {
    let pool = [];
    const allQs = await getAllRecords("store_questions");

    if (practiceSelectedIds.size > 0) {
      pool = allQs.filter(q => practiceSelectedIds.has(q.id));
    } else {
      pool = await getCurrentlyFilteredPracticeQuestions();
    }

    if (pool.length === 0) {
      alert("No questions match the current criteria to display.");
      return;
    }

    // Launch in Untimed Study View: solutions, methods, and options are freely navigable
    const now = Date.now();
    activeReviewAttempt = {
      sessionId: "study_view_" + now,
      title: `Study View (${pool.length} Qs)`,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      mockType: "STUDY_VIEW",
      finalScore: 0,
      correctCount: pool.length,
      incorrectCount: 0,
      q4Traps: 0,
      penaltyDrag: 0,
      switchDelta: 0,
      completed: true,
      isSectionLocked: false,
      questions: pool.map((q, idx) => ({ ...q, sectionIndex: 0, sectionName: q.chapter, globalNumber: idx + 1 })),
      userResponses: {},
      sections: [{ id: "SEC_1", name: "Question Explorer", durationSec: 0, questionCount: pool.length, locked: false }]
    };

    pool.forEach(q => {
      activeReviewAttempt.userResponses[q.id] = {
        selectedOption: null,
        initialOption: null,
        status: "unanswered",
        timeSpentSec: 0,
        errorTag: "UNCLASSIFIED"
      };
    });

    enterFullScreenReviewArena();
  }

  async function buildMockFromPracticeSelection() {
    if (practiceSelectedIds.size === 0) {
      alert("Select at least one question to build a mock paper.");
      return;
    }
    const allQs = await getAllRecords("store_questions");
    const selected = allQs.filter(q => practiceSelectedIds.has(q.id));
    const title = prompt("Enter title for this Custom Fixed Mock Paper:", `Curated Practice (${selected.length} Qs)`);
    if (!title || !title.trim()) return;

    const paper = await MockService.saveMockDefinition({
      title: title.trim(),
      type: "FIXED_PAPER",
      isSectionLocked: false,
      sections: [{ id: 1, subject: selected[0]?.subject || "QA", count: selected.length, durationMin: Math.max(5, Math.round(selected.length * 1.5)) }],
      questions: selected
    });

    alert(`Saved fixed mock "${paper.title}" to Dashboard!`);
    await renderDashboard();
  }

  /* ==========================================================================
   * SECTION 23: UNTIMED DOJO PRACTICE & METHOD CLINIC
   * Pinned Passage Container Support Included
   * ========================================================================== */
  async function updateDojoChapters() {
    const sub = document.getElementById("dojo-nav-subject") ? document.getElementById("dojo-nav-subject").value : "QA";
    const chapSelect = document.getElementById("dojo-nav-chapter");
    if (!chapSelect) return;
    chapSelect.innerHTML = `<option value="ALL">Entire ${sub} (All Chapters)</option>`;

    const definedChaps = (TAXONOMY[sub] && Array.isArray(TAXONOMY[sub].chapters)) 
      ? TAXONOMY[sub].chapters 
      : [];

    const allQs = await getAllRecords("store_questions");
    const qChaps = allQs.filter(q => q.subject === sub).map(q => q.chapter);
    const allConcepts = await ConceptService.getAll();
    const cChaps = allConcepts.filter(c => c.subject === sub).map(c => c.chapter);

    const mergedChapters = [...new Set([...definedChaps, ...qChaps, ...cChaps])];
    mergedChapters.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      chapSelect.appendChild(opt);
    });

    updateDojoMethods();
  }

  async function updateDojoMethods() {
    const sub = document.getElementById("dojo-nav-subject") ? document.getElementById("dojo-nav-subject").value : "QA";
    const chap = document.getElementById("dojo-nav-chapter") ? document.getElementById("dojo-nav-chapter").value : "ALL";
    const methodSelect = document.getElementById("dojo-nav-method");
    if (!methodSelect) return;
    methodSelect.innerHTML = `<option value="ALL">All Methods & Types in Scope</option>`;

    const allQs = await getAllRecords("store_questions");
    let pool = allQs.filter(q => q.subject === sub);
    if (chap !== "ALL") pool = pool.filter(q => q.chapter === chap);

    const methods = [...new Set(pool.filter(q => q.method).map(q => q.method))];
    methods.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.innerText = m;
      methodSelect.appendChild(opt);
    });
  }

  async function launchFilteredDojo() {
    const sub = document.getElementById("dojo-nav-subject")?.value || "QA";
    const chap = document.getElementById("dojo-nav-chapter")?.value || "ALL";
    const method = document.getElementById("dojo-nav-method")?.value || "ALL";

    const allQs = await getAllRecords("store_questions");
    let pool = allQs.filter(q => q.subject === sub);
    if (chap !== "ALL") pool = pool.filter(q => q.chapter === chap);
    if (method !== "ALL") pool = pool.filter(q => q.method === method);

    if (pool.length === 0) {
      alert("No questions found matching this selection.");
      return;
    }

    pool = MockService.shuffle([...pool]);

    const allDossiers = await ConceptService.getAll();
    const matchedDossier = allDossiers.find(c => c.chapter === chap || (method !== "ALL" && c.title === method));

    dojoExam = {
      subject: sub,
      chapter: chap,
      method: method,
      title: chap === "ALL" ? `${sub} â€¢ Entire Subject Dojo` : (method !== "ALL" ? `${chap} â€¢ ${method}` : `${chap} Dojo`),
      formulaBrief: matchedDossier ? matchedDossier.content : null,
      questions: pool,
      currentIndex: 0,
      userResponses: {}
    };

    dojoExam.questions.forEach((q, idx) => {
      q.dojoSequentialNum = idx + 1;
      dojoExam.userResponses[q.id] = {
        selectedOption: null,
        status: "unanswered",
        revealed: false
      };
    });

    pushNavLayer("dojo-arena-view", () => {
      safeSetDisplay("dojo-arena-view", "none");
    });
    safeSetDisplay("dojo-arena-view", "flex");
    renderDojoArenaQuestion();
  }

  function exitDojoArena() {
    safeSetDisplay("dojo-arena-view", "none");
  }

  function renderDojoArenaQuestion() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    const resp = dojoExam.userResponses[q.id];

    safeSetText("dojo-arena-title", dojoExam.title);
    safeSetText("dojo-arena-chap-badge", q.chapter);
    safeSetText("dojo-arena-method-badge", q.method || q.subtopic || "General");
    safeSetText("dojo-arena-qnum", q.dojoSequentialNum);
    safeSetText("dojo-arena-total-tag", `Question ${q.dojoSequentialNum} of ${dojoExam.questions.length}`);

    // Pinned Reading Comprehension / Cloze Container in Dojo
    const dojoPassageBox = document.getElementById("dojo-passage-container");
    if (dojoPassageBox) {
      if (q.passageText && q.passageText.trim().length > 0) {
        dojoPassageBox.style.display = "block";
        safeSetText("dojo-passage-tag", `${q.chapter.replace(/^ENG_/, '').replace(/^QA_/, '')} CONTEXT`);
        safeSetText("dojo-passage-set-badge", `SET Q ${q.setOrder || 1}/${q.setTotal || 1}`);
        safeSetHtml("dojo-passage-body", formatRichText(q.passageText));
      } else {
        dojoPassageBox.style.display = "none";
      }
    }

    safeSetHtml("dojo-arena-qtext", formatRichText(q.questionText));

    const imgBox = document.getElementById("dojo-image-container");
    if (imgBox) {
      if (q.imageUrl && q.imageUrl.trim().length > 0) {
        imgBox.style.display = "block";
        imgBox.innerHTML = `<img src="${q.imageUrl}" alt="Diagram">`;
      } else {
        imgBox.style.display = "none";
        imgBox.innerHTML = "";
      }
    }

    const dojoPillsWrap = document.getElementById("dojo-concept-pills-wrap");
    if (dojoPillsWrap) {
      dojoPillsWrap.innerHTML = "";
      const linkedIds = (Array.isArray(q.conceptIds) && q.conceptIds.length > 0)
        ? q.conceptIds
        : (q.conceptId ? [q.conceptId] : []);

      linkedIds.forEach(cId => {
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary";
        btn.style.cssText = "padding:2px 8px; font-size:11px; color:var(--accent-cyan);";
        btn.innerText = `ðŸ“– ${cId.replace(/^top_/, '').replace(/_/g, ' ')}`;
        btn.onclick = () => openCompendiumToSheet(cId, q.subject, q.chapter);
        dojoPillsWrap.appendChild(btn);
      });
    }

    const theoryBanner = document.getElementById("dojo-theory-banner");
    if (theoryBanner) {
      if (dojoExam.formulaBrief) {
        theoryBanner.style.display = "block";
        theoryBanner.innerHTML = `<strong>Concept Brief:</strong> ${formatRichText(dojoExam.formulaBrief)}`;
      } else {
        theoryBanner.style.display = "none";
      }
    }

    safeSetDisplay("dojo-arena-feedback", "none");

    const mb = document.getElementById("dojo-arena-method-box");
    if (mb) {
      mb.style.display = resp.revealed ? "block" : "none";
      mb.innerHTML = `<strong>Solution & Method:</strong><br>${formatRichText(q.explanation || 'No method registered.')}`;
    }

    safeSetValue("dojo-arena-annotation", q.annotation || "");

    const optContainer = document.getElementById("dojo-arena-options");
    if (!optContainer) return;
    optContainer.innerHTML = "";

    q.options.forEach((optText, idx) => {
      const card = document.createElement("div");
      card.className = "opt-card" + (resp.selectedOption === idx ? " selected" : "");

      if (resp.selectedOption !== null) {
        if (idx === q.correctIndex) card.classList.add("correct-peek");
        else if (resp.selectedOption === idx) card.classList.add("wrong-peek");
      }

      card.innerHTML = `
        <span style="font-weight:700; color:var(--text-muted); font-size:13px;">${idx + 1}.</span>
        <div style="flex:1;">${formatRichText(optText)}</div>
      `;

      card.addEventListener("click", () => {
        resp.selectedOption = idx;
        resp.status = "answered";
        if (navigator.vibrate) navigator.vibrate(idx === q.correctIndex ? 25 : [40, 40]);

        const fb = document.getElementById("dojo-arena-feedback");
        if (fb) {
          fb.style.display = "block";
          if (idx === q.correctIndex) {
            fb.style.background = "rgba(16, 185, 129, 0.22)";
            fb.style.color = "var(--status-green)";
            fb.innerText = "âœ“ Correct Answer!";
          } else {
            fb.style.background = "rgba(244, 63, 94, 0.22)";
            fb.style.color = "var(--status-red)";
            fb.innerText = `âœ— Incorrect. Correct is Option ${q.correctIndex + 1}.`;
          }
        }
        renderDojoArenaQuestion();
      });

      optContainer.appendChild(card);
    });
  }

  function navDojoArena(step) {
    if (!dojoExam) return;
    const next = dojoExam.currentIndex + step;
    if (next >= 0 && next < dojoExam.questions.length) {
      dojoExam.currentIndex = next;
      renderDojoArenaQuestion();
    }
  }

  function toggleDojoMethod() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    const resp = dojoExam.userResponses[q.id];
    resp.revealed = !resp.revealed;
    const mb = document.getElementById("dojo-arena-method-box");
    if (mb) mb.style.display = resp.revealed ? "block" : "none";
  }

  async function autoSaveDojoAnnotation(val) {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    q.annotation = val;
    await putRecord("store_questions", q);
  }

  function toggleDojoPalette(open) {
    const drawer = document.getElementById("dojo-palette-drawer");
    const overlay = document.getElementById("dojo-drawer-overlay");
    if (!drawer || !overlay) return;

    if (open) {
      renderDojoPaletteGrid();
      drawer.classList.add("open");
      overlay.classList.add("active");
    } else {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    }
  }

  function renderDojoPaletteGrid() {
    const scrollBody = document.getElementById("dojo-palette-scroll-body");
    if (!scrollBody || !dojoExam) return;
    scrollBody.innerHTML = "";
    safeSetText("dojo-palette-count-badge", `${dojoExam.questions.length} Qs`);

    const grouped = {};
    dojoExam.questions.forEach((q, idx) => {
      const ch = q.chapter || "GENERAL";
      if (!grouped[ch]) grouped[ch] = [];
      grouped[ch].push({ q, idx });
    });

    Object.keys(grouped).forEach(chapterKey => {
      const items = grouped[chapterKey];
      const header = document.createElement("div");
      header.style.cssText = "padding:6px 0; font-size:11px; font-weight:700; color:var(--accent-cyan);";
      header.innerText = `${chapterKey} (${items.length} Qs)`;
      scrollBody.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "palette-grid";

      items.forEach(item => {
        const resp = dojoExam.userResponses[item.q.id];
        const cell = document.createElement("div");
        cell.className = "palette-cell" +
          (resp.status === "answered" ? " answered" : " unanswered") +
          (item.idx === dojoExam.currentIndex ? " current" : "");

        cell.innerText = item.q.dojoSequentialNum;
        cell.addEventListener("click", () => {
          dojoExam.currentIndex = item.idx;
          toggleDojoPalette(false);
          renderDojoArenaQuestion();
        });

        grid.appendChild(cell);
      });

      scrollBody.appendChild(grid);
    });
  }

  /* ==========================================================================
   * SECTION 24: REVIEW COCKPIT, STAGE 1 REVIEW & HISTORICAL MISTAKE BIOPSY
   * ========================================================================== */
  async function openMockReview(attemptOrId) {
    let att = typeof attemptOrId === "string" 
      ? (await getAllRecords("store_attempts")).find(a => a.sessionId === attemptOrId)
      : attemptOrId;

    if (!att) return;
    activeReviewAttempt = att;

    const archiveModal = document.getElementById("modal-history-archive");
    if (archiveModal && archiveModal.classList.contains("active")) {
      archiveModal.classList.remove("active");
    }

    safeSetText("review-modal-title", `${att.title}${att.attemptNumber > 1 ? ` (Attempt ${att.attemptNumber})` : ''}`);
    safeSetText("review-modal-date", att.timeIST || formatISTDate(att.timestamp));
    safeSetText("rev-score", (att.finalScore || 0).toFixed(2));

    const totalAtt = (att.correctCount || 0) + (att.incorrectCount || 0);
    safeSetText("rev-acc", totalAtt > 0 ? `${Math.round((att.correctCount / totalAtt) * 100)}%` : "0%");
    safeSetText("rev-cor", att.correctCount || 0);
    safeSetText("rev-inc", att.incorrectCount || 0);
    safeSetText("rev-penalty", `-${(att.penaltyDrag || 0).toFixed(2)}`);
    safeSetText("rev-switch-delta", `${att.switchDelta > 0 ? '+' : ''}${att.switchDelta || 0} Net`);
    safeSetText("rev-traps", att.q4Traps || 0);

    const reattemptBtn = document.getElementById("btn-review-reattempt");
    if (reattemptBtn) reattemptBtn.onclick = () => reattemptMock(att.sessionId);
    const saveFixedBtn = document.getElementById("btn-review-save-fixed");
    if (saveFixedBtn) saveFixedBtn.onclick = () => openSaveBlueprintModal("FIXED_PAPER", att.sessionId);

    // Threaded Attempt Iteration Switcher
    const rootId = att.parentSessionId || att.sessionId;
    const allAttempts = await getAllRecords("store_attempts");
    const thread = allAttempts.filter(a => a.sessionId === rootId || a.parentSessionId === rootId);

    const switchWrap = document.getElementById("rev-attempt-switcher-wrap");
    const switchSelect = document.getElementById("rev-attempt-select");

    if (thread.length > 1 && switchWrap && switchSelect) {
      switchWrap.style.display = "flex";
      switchSelect.innerHTML = "";
      thread.sort((a, b) => (a.attemptNumber || 1) - (b.attemptNumber || 1));
      thread.forEach(iter => {
        const opt = document.createElement("option");
        opt.value = iter.sessionId;
        opt.innerText = `Attempt ${iter.attemptNumber || 1}: ${(iter.finalScore || 0).toFixed(1)} pts (${iter.timeIST ? iter.timeIST.split(',')[0] : 'Past'})`;
        if (iter.sessionId === att.sessionId) opt.selected = true;
        switchSelect.appendChild(opt);
      });
    } else if (switchWrap) {
      switchWrap.style.display = "none";
    }

    // High-Fidelity Sectional Breakdown
    const secGrid = document.getElementById("rev-sectional-breakdown-grid");
    if (secGrid) {
      secGrid.innerHTML = "";
      const secScores = {};

      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          const secName = q.subject || "GEN";
          if (!secScores[secName]) {
            secScores[secName] = { score: 0, cor: 0, inc: 0, unans: 0, att: 0, penalty: 0, totalTimeSec: 0 };
          }
          const resp = att.userResponses[q.id];
          secScores[secName].totalTimeSec += (resp ? (resp.timeSpentSec || 0) : 0);

          if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
            secScores[secName].att++;
            if (resp.selectedOption === q.correctIndex) {
              secScores[secName].score += 2.0;
              secScores[secName].cor++;
            } else {
              secScores[secName].score -= 0.5;
              secScores[secName].penalty += 0.5;
              secScores[secName].inc++;
            }
          } else {
            secScores[secName].unans++;
          }
        });
      }

      Object.keys(secScores).forEach(sKey => {
        const s = secScores[sKey];
        const mDwell = Math.floor(s.totalTimeSec / 60);
        const sDwell = s.totalTimeSec % 60;
        const acc = s.att > 0 ? Math.round((s.cor / s.att) * 100) : 0;

        const card = document.createElement("div");
        card.className = "sec-fidelity-card";
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px; margin-bottom:6px;">
            <b style="color:var(--accent-cyan); font-size:12px;">${TAXONOMY[sKey] ? TAXONOMY[sKey].name.split(' ')[0] : sKey}</b>
            <span style="font-weight:800; font-size:13px; color:#fff;">${s.score.toFixed(1)} pts</span>
          </div>
          <div class="sec-fidelity-metric-row">
            <span>Accuracy:</span> <b style="color:${acc >= 80 ? 'var(--status-green)' : (acc >= 60 ? 'var(--status-amber)' : 'var(--status-red)')};">${acc}%</b>
          </div>
          <div class="sec-fidelity-metric-row">
            <span>Split (ðŸŸ¢/ðŸ”´/âšª):</span> <b>${s.cor} / ${s.inc} / ${s.unans}</b>
          </div>
          <div class="sec-fidelity-metric-row">
            <span>Penalty Drag:</span> <b style="color:#f87171;">-${s.penalty.toFixed(1)}</b>
          </div>
          <div class="sec-fidelity-metric-row">
            <span>Section Dwell:</span> <b style="font-family:var(--font-mono);">${String(mDwell).padStart(2, '0')}:${String(sDwell).padStart(2, '0')}</b>
          </div>
        `;
        secGrid.appendChild(card);
      });
    }

    const tagPills = document.getElementById("rev-mistake-tags-pills");
    if (tagPills) {
      tagPills.innerHTML = "";
      const tagCounts = {};
      if (att.userResponses) {
        Object.values(att.userResponses).forEach(r => {
          if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED" && r.errorTag !== "VALID_CALCULATED_RISK") {
            tagCounts[r.errorTag] = (tagCounts[r.errorTag] || 0) + 1;
          }
        });
      }

      if (Object.keys(tagCounts).length === 0) {
        tagPills.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">Zero active trap penalties logged for this attempt.</span>`;
      } else {
        Object.keys(tagCounts).forEach(tag => {
          const span = document.createElement("span");
          span.className = "badge";
          span.style.background = "#5a1e1e";
          span.style.color = "#f87171";
          span.innerText = `${tag.replace(/_/g, ' ')}: ${tagCounts[tag]}`;
          tagPills.appendChild(span);
        });
      }
    }

    pushNavLayer("modal-mock-review", () => {
      const m = document.getElementById("modal-mock-review");
      if (m) m.classList.remove("active");
    });
    const m = document.getElementById("modal-mock-review");
    if (m) m.classList.add("active");
  }

  function switchReviewAttempt(targetSessionId) {
    openMockReview(targetSessionId);
  }

  async function handleMistakeTagSelect(qId, val) {
    if (val === "__NEW_TAG__") {
      const raw = prompt("Enter new custom mistake tag (e.g., RUSHED_PANIC):");
      if (!raw || !raw.trim()) return;
      const formatted = raw.trim().toUpperCase().replace(/\s+/g, '_');
      if (!customMistakeTags.includes(formatted)) {
        customMistakeTags.push(formatted);
        await putRecord("store_config", { key: "custom_mistake_tags", value: customMistakeTags });
      }
      await setMistakeTag(qId, formatted);
    } else {
      await setMistakeTag(qId, val);
    }
  }

  async function setMistakeTag(qId, tag) {
    if (!activeReviewAttempt || !activeReviewAttempt.userResponses) return;
    if (activeReviewAttempt.userResponses[qId]) {
      activeReviewAttempt.userResponses[qId].errorTag = tag;
      if (tag === "VALID_CALCULATED_RISK" || tag === "UNCLASSIFIED") {
        activeReviewAttempt.userResponses[qId].isPanicSlip = false;
      }
      await putRecord("store_attempts", activeReviewAttempt);
    }
    await renderDashboard();
    openMockReview(activeReviewAttempt);
  }

  async function openTrapClinicModal(trapType) {
    activeClinicTrapType = trapType;
    safeSetText("trap-clinic-title", `Trap Clinic: #${trapType.replace(/_/g, ' ')}`);

    const allAttempts = await getAllRecords("store_attempts");
    const completed = allAttempts.filter(a => a.completed);
    activeClinicQuestions = [];

    completed.forEach(att => {
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          const resp = att.userResponses[q.id];
          if (resp && resp.errorTag === trapType) {
            activeClinicQuestions.push({
              mockTitle: att.title,
              mockDate: att.timeIST || formatISTDate(att.timestamp),
              question: q,
              response: resp
            });
          }
        });
      }
    });

    safeSetText("trap-clinic-summary-badge", `${activeClinicQuestions.length} Vulnerabilities Registered`);

    const list = document.getElementById("trap-clinic-question-list");
    if (!list) return;
    list.innerHTML = "";

    if (activeClinicQuestions.length === 0) {
      list.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-muted); font-size:12px;">Zero recorded errors matching #${trapType}. Excellent mastery!</p>`;
    } else {
      activeClinicQuestions.forEach((item) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "12px";
        div.style.marginBottom = "8px";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span class="badge" style="background:#1f6feb;">${item.question.subject} â€¢ ${item.question.chapter}</span>
            <span style="font-family:var(--font-mono); font-size:11px; color:#f87171;">${item.response.timeSpentSec || 0}s spent</span>
          </div>
          <div style="font-size:13px; color:#fff; line-height:1.5; margin:6px 0;">${formatRichText(item.question.questionText)}</div>
          <div style="font-size:11.5px; color:var(--text-muted); line-height:1.4;">
            <b>Solution Key:</b> Option ${item.question.correctIndex + 1} | <i>${item.question.explanation || 'No derivation registered.'}</i>
          </div>
        `;
        list.appendChild(div);
      });
    }

    pushNavLayer("modal-trap-clinic", () => {
      const m = document.getElementById("modal-trap-clinic");
      if (m) m.classList.remove("active");
    });
    const m = document.getElementById("modal-trap-clinic");
    if (m) m.classList.add("active");
  }

  async function drillFilteredTrapQuestions() {
    if (activeClinicQuestions.length === 0) {
      alert("No trap questions available to drill.");
      return;
    }
    const modal = document.getElementById("modal-trap-clinic");
    if (modal) modal.classList.remove("active");

    const uniquePool = [];
    activeClinicQuestions.forEach(item => {
      if (!uniquePool.some(q => q.id === item.question.id)) {
        uniquePool.push(item.question);
      }
    });

    await compileAndLaunchArena(`Trap Drill: #${activeClinicTrapType}`, uniquePool, Math.max(5, uniquePool.length * 2), false);
  }

  async function openSubjectDiagnosticModal(subKey) {
    const sub = TAXONOMY[subKey];
    if (!sub) return;

    safeSetText("diag-subject-name", `${sub.name} (${subKey})`);
    safeSetText("diag-subject-sub", `Complete Syllabus & Chapter Analysis`);

    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);

    let subAtt = 0, subCor = 0;
    completed.forEach(c => {
      if (c.questions && Array.isArray(c.questions)) {
        c.questions.forEach(q => {
          if (q.subject === subKey) {
            const resp = (c.userResponses && typeof c.userResponses === "object") ? c.userResponses[q.id] : null;
            if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
              subAtt++;
              if (resp.selectedOption === q.correctIndex) subCor++;
            }
          }
        });
      }
    });

    const acc = subAtt > 0 ? Math.round((subCor / subAtt) * 100) : 0;
    safeSetText("diag-subject-acc", subAtt > 0 ? `${acc}%` : "--");
    safeSetText("diag-subject-counts", `${subAtt} Solved â€¢ ${subCor} Correct`);

    const gauge = document.getElementById("diag-acc-gauge");
    if (gauge) {
      gauge.setAttribute("stroke-dasharray", `${acc}, 100`);
      gauge.style.stroke = acc >= 80 ? "var(--status-green-border)" : (acc >= 65 ? "var(--status-amber)" : "var(--status-red)");
    }

    const chapList = document.getElementById("diag-chapter-coverage-list");
    if (chapList) {
      chapList.innerHTML = "";
      sub.chapters.forEach(chap => {
        let cAtt = 0, cCor = 0;
        completed.forEach(c => {
          if (c.questions && Array.isArray(c.questions)) {
            c.questions.forEach(q => {
              if (q.chapter === chap) {
                const resp = (c.userResponses && typeof c.userResponses === "object") ? c.userResponses[q.id] : null;
                if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
                  cAtt++;
                  if (resp.selectedOption === q.correctIndex) cCor++;
                }
              }
            });
          }
        });

        const cAcc = cAtt > 0 ? Math.round((cCor / cAtt) * 100) : 0;
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "8px 10px";
        div.style.marginBottom = "6px";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-weight:700; font-family:var(--font-mono); font-size:12px;">${chap}</span>
            <span class="badge" style="background:${cAtt > 0 ? '#1b4d2e' : '#151a24'}; color:${cAtt > 0 ? '#4ade80' : '#8b949e'};">
              ${cAtt > 0 ? `${cAcc}% (${cAtt} Qs)` : '0 Qs'}
            </span>
          </div>
          <div class="battery-bar-container" style="height:6px;">
            <div class="battery-bar-fill" style="width:${cAcc}%; background:${cAcc >= 80 ? 'var(--status-green)' : (cAcc >= 60 ? 'var(--status-amber)' : 'var(--accent-blue)')};"></div>
          </div>
        `;
        chapList.appendChild(div);
      });
    }

    const blitzBtn = document.getElementById("btn-launch-subject-blitz");
    if (blitzBtn) {
      blitzBtn.onclick = () => {
        const m = document.getElementById("modal-subject-diagnostic");
        if (m) m.classList.remove("active");
        launchConfiguredMockDirect(subKey, "ALL", 10, 8);
      };
    }

    pushHistoryState("modal-subject-diagnostic");
    const m = document.getElementById("modal-subject-diagnostic");
    if (m) m.classList.add("active");
  }

  function openHistoryArchiveModal() {
    pushNavLayer("modal-history-archive", () => {
      const m = document.getElementById("modal-history-archive");
      if (m) m.classList.remove("active");
    });
    const m = document.getElementById("modal-history-archive");
    if (m) m.classList.add("active");
    renderArchiveList("ALL");
  }

  async function renderArchiveList(filterType) {
    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);
    const container = document.getElementById("archive-list-container");
    if (!container) return;
    container.innerHTML = "";

    let list = completed.slice().sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    // CRITICAL FILTER FIX: Accommodate historical papers saved as Tier-1
    if (filterType === "TIER_1") {
      list = list.filter(a => a.mockType === "TIER_1" || (a.questions && a.questions.length >= 100) || /tier[\s_-]?1/i.test(a.title || ""));
    } else if (filterType !== "ALL") {
      list = list.filter(a => a.mockType === filterType);
    }

    if (list.length === 0) {
      container.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No tests found in this category.</p>`;
      return;
    }

    const threads = {};
    list.forEach(att => {
      const rootId = att.parentSessionId || att.sessionId;
      if (!threads[rootId]) threads[rootId] = [];
      threads[rootId].push(att);
    });

    Object.keys(threads).forEach(rootId => {
      const threadAttempts = threads[rootId].sort((a, b) => (a.attemptNumber || 1) - (b.attemptNumber || 1));
      const latest = threadAttempts[threadAttempts.length - 1];

      const div = document.createElement("div");
      div.className = "attempt-thread-group";

      const header = document.createElement("div");
      header.className = "attempt-thread-header";
      header.innerHTML = `
        <div>
          <div style="display:flex; align-items:center; gap:6px;">
            <b style="font-size:13.5px; color:#fff;">${latest.title}</b>
            ${threadAttempts.length > 1 ? `<span class="badge" style="background:#8957e5; font-size:10px;">${threadAttempts.length} Attempts</span>` : ''}
            <span class="badge-slot slot-${(latest.diurnalSlot || 'morning').toLowerCase()}">${latest.diurnalSlot || 'DAY'}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Latest: ${latest.timeIST || formatISTDate(latest.timestamp)}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:15px; font-weight:800; color:var(--accent-cyan);">${(latest.finalScore || 0).toFixed(2)} pts</span>
        </div>
      `;

      const subList = document.createElement("div");
      subList.style.display = threadAttempts.length > 1 ? "none" : "block";

      threadAttempts.forEach(iter => {
        const row = document.createElement("div");
        row.className = "attempt-sub-row";
        row.innerHTML = `
          <div>
            <b>Attempt ${iter.attemptNumber || 1}</b> â€¢ <span style="color:var(--text-muted);">${iter.timeIST ? iter.timeIST.split(',')[1] : ''}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; color:var(--accent-cyan);">${(iter.finalScore || 0).toFixed(1)} pts</span>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${iter.sessionId}')">ðŸ“¥ Export</button>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.openMockReview('${iter.sessionId}')">Inspect</button>
            <button class="btn btn-danger" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.deleteAttemptSession('${iter.sessionId}')">ðŸ—‘</button>
          </div>
        `;
        subList.appendChild(row);
      });

      if (threadAttempts.length > 1) {
        header.onclick = () => {
          const isOpen = subList.style.display === "block";
          subList.style.display = isOpen ? "none" : "block";
          header.classList.toggle("open", !isOpen);
        };
      }

      div.appendChild(header);
      div.appendChild(subList);
      container.appendChild(div);
    });
  }

  async function deleteAttemptSession(sessionId) {
    if (confirm("Delete this completed attempt record? Derived performance statistics will recalculate immediately. (Question bank remains intact)")) {
      await deleteRecordFromStore("store_attempts", sessionId);
      await renderDashboard();
      renderArchiveList("ALL");
      alert("Attempt record deleted and statistics updated.");
    }
  }

  /* ==========================================================================
   * SECTION 25: LIVING KNOWLEDGE STUDIO CONTROLLER & IN-SHEET TOC
   * ========================================================================== */
  async function openCompendiumToSheet(conceptId, targetSub, targetChap) {
    const openModals = document.querySelectorAll(".modal-overlay.active");
    openModals.forEach(m => m.classList.remove("active"));

    let item = null;
    if (conceptId) {
      item = await ConceptService.get(conceptId);
    }
    if (!item && targetChap) {
      const all = await ConceptService.getAll();
      item = all.find(c => c.chapter === targetChap);
    }

    activeCompSubject = item ? item.subject : (targetSub || "QA");
    activeCompChapter = item ? item.chapter : (targetChap || "QA_PERCENTAGE");

    pushNavLayer("compendium-fullscreen-view", () => {
      safeSetDisplay("compendium-fullscreen-view", "none");
    });
    safeSetDisplay("compendium-fullscreen-view", "flex");

    const subSelect = document.getElementById("comp-studio-subject-select");
    if (subSelect) subSelect.value = activeCompSubject;

    await handleCompStudioSubjectChange(activeCompSubject);
    if (item) {
      const sheetIdx = currentCompSheets.findIndex(s => s.id === item.id);
      if (sheetIdx !== -1) {
        activeCompSheetIndex = sheetIdx;
        renderActiveCompSheet();
      }
    }
  }

  async function handleCompStudioSubjectChange(sub) {
    activeCompSubject = sub;
    const chapSelect = document.getElementById("comp-studio-chapter-select");
    if (!chapSelect) return;
    chapSelect.innerHTML = "";

    const allDossiers = await ConceptService.getAll();
    const canonChaps = (TAXONOMY[sub] && Array.isArray(TAXONOMY[sub].chapters)) ? TAXONOMY[sub].chapters : [];
    const existingChaps = [...new Set(allDossiers.filter(d => d.subject === sub).map(d => d.chapter))];
    const combined = [...new Set([...canonChaps, ...existingChaps])];

    combined.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      chapSelect.appendChild(opt);
    });

    if (combined.length > 0) {
      activeCompChapter = combined[0];
      chapSelect.value = activeCompChapter;
    }
    await renderCompStudioSheets();
  }

  async function handleCompStudioChapterChange(chap) {
    activeCompChapter = chap;
    activeCompSheetIndex = 0;
    await renderCompStudioSheets();
  }

  async function renderCompStudioSheets() {
    const allDossiers = await ConceptService.getAll();
    currentCompSheets = allDossiers.filter(d => d.subject === activeCompSubject && d.chapter === activeCompChapter);

    const tabsBar = document.getElementById("comp-studio-sheet-tabs");
    const docContent = document.getElementById("comp-studio-doc-content");
    if (tabsBar) tabsBar.innerHTML = "";
    if (docContent) docContent.innerHTML = "";

    if (currentCompSheets.length === 0) {
      if (docContent) {
        docContent.innerHTML = `
          <div style="text-align:center; padding:50px 14px; color:var(--text-muted);">
            <h3 style="font-size:16px; margin-bottom:8px; color:#fff;">No Topic Sheets in ${activeCompChapter}</h3>
            <p style="font-size:12px; margin-bottom:14px;">This chapter has no living sheets yet. Author your first sheet below.</p>
            <button class="btn" onclick="CGL_OS.openConceptEditorModal(true)">+ Create First Sheet</button>
          </div>
        `;
      }
      safeSetText("comp-linked-q-count", "0 Questions Linked");
      return;
    }

    if (activeCompSheetIndex >= currentCompSheets.length) activeCompSheetIndex = 0;

    if (tabsBar) {
      currentCompSheets.forEach((sheet, idx) => {
        const tab = document.createElement("button");
        tab.className = "comp-sheet-tab" + (idx === activeCompSheetIndex ? " active" : "");
        tab.innerText = sheet.title || `Sheet ${idx + 1}`;
        tab.addEventListener("click", () => {
          activeCompSheetIndex = idx;
          renderActiveCompSheet();
        });
        tabsBar.appendChild(tab);
      });
    }

    await renderActiveCompSheet();
  }

  async function renderActiveCompSheet() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    document.querySelectorAll(".comp-sheet-tab").forEach((t, i) => {
      t.classList.toggle("active", i === activeCompSheetIndex);
    });

    safeSetText("comp-studio-header-title", sheet.title);
    safeSetText("comp-studio-header-sub", `${sheet.chapter} â€¢ Sheet ${activeCompSheetIndex + 1} of ${currentCompSheets.length}`);

    const linkedQs = await ConceptService.getLinkedQuestions(sheet.id, sheet.chapter);
    safeSetText("comp-linked-q-count", `${linkedQs.length} Associated Questions Linked`);

    const toc = ConceptService.generateTOC(sheet.content);
    let tocHtml = "";
    if (toc.length > 0) {
      tocHtml = `
        <div class="sheet-toc-pill-wrap">
          <span style="font-size:10px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.8px; align-self:center;">Jump to:</span>
          ${toc.map(item => `
            <a href="#${item.anchor}" class="anchor-pill" onclick="document.getElementById('${item.anchor}').scrollIntoView({behavior:'smooth'}); return false;">
              ${item.title}
            </a>
          `).join('')}
        </div>
      `;
    }

    let imgHtml = "";
    if (sheet.imageUrl && sheet.imageUrl.trim().length > 0) {
      imgHtml = `<div style="text-align:center; margin:16px 0;"><img src="${sheet.imageUrl}" style="max-height:280px; max-width:100%; border-radius:8px; border:1px solid var(--border-color);"></div>`;
    }

    const docContent = document.getElementById("comp-studio-doc-content");
    if (docContent) {
      docContent.innerHTML = `
        <div style="border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge" style="background:#1f6feb;">${sheet.chapter}</span>
            <span style="font-size:11px; color:var(--text-muted);">${formatISTDate(sheet.timestamp || Date.now())}</span>
          </div>
          <h1 style="font-size:22px; font-weight:800; color:#fff; margin-top:8px;">${sheet.title}</h1>
          ${sheet.subtitle ? `<div style="font-size:13px; color:var(--accent-cyan); font-family:var(--font-mono); margin-top:2px;">${sheet.subtitle}</div>` : ''}
        </div>
        ${tocHtml}
        ${imgHtml}
        <div style="font-size:14.5px; line-height:1.75; color:var(--text-main);">${formatRichText(sheet.content)}</div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:28px; padding-top:14px; border-top:1px solid var(--border-color);">
          <button class="btn btn-secondary" onclick="CGL_OS.navCompStudioSheet(-1)">[ â† ] Previous Sheet</button>
          <span style="font-size:12px; font-weight:700; color:var(--text-muted);">${activeCompSheetIndex + 1} / ${currentCompSheets.length}</span>
          <button class="btn btn-secondary" onclick="CGL_OS.navCompStudioSheet(1)">Next Sheet [ â†’ ]</button>
        </div>
      `;
    }

    const noteKey = `scratch_${sheet.id}`;
    const savedNote = await getRecord("store_notes", noteKey);
    safeSetValue("comp-studio-scratchpad", savedNote ? savedNote.content : "");
  }

  function navCompStudioSheet(step) {
    if (currentCompSheets.length === 0) return;
    activeCompSheetIndex += step;
    if (activeCompSheetIndex < 0) activeCompSheetIndex = currentCompSheets.length - 1;
    if (activeCompSheetIndex >= currentCompSheets.length) activeCompSheetIndex = 0;
    renderActiveCompSheet();
  }

  async function autoSaveCompScratchpad(val) {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;
    await putRecord("store_notes", { id: `scratch_${sheet.id}`, content: val, timestamp: Date.now() });
    const st = document.getElementById("comp-scratchpad-status");
    if (st) {
      st.style.display = "inline";
      setTimeout(() => { st.style.display = "none"; }, 1500);
    }
  }

  async function deleteCurrentCompendiumSheet() {
    if (!currentCompSheets || currentCompSheets.length === 0) return;
    const curr = currentCompSheets[activeCompSheetIndex];
    if (confirm(`Permanently delete living sheet: "${curr.title}"?`)) {
      await ConceptService.delete(curr.id);
      await renderCompStudioSheets();
    }
  }

  async function promptCreateNewChapter() {
    const chapName = prompt(`Enter new chapter tag for ${activeCompSubject} (e.g. ${activeCompSubject}_NEW_TOPIC):`);
    if (!chapName || !chapName.trim()) return;

    try {
      const formatted = await TaxonomyService.addChapter(activeCompSubject, chapName);
      await handleCompStudioSubjectChange(activeCompSubject);
      const cSel = document.getElementById("comp-studio-chapter-select");
      if (cSel) cSel.value = formatted;
      await handleCompStudioChapterChange(formatted);
    } catch (err) {
      alert(err.message);
    }
  }

  function insertDossierSnippet(type) {
    const textarea = document.getElementById("concept-edit-body");
    if (!textarea) return;
    let snippet = "";
    if (type === "FORMULA") snippet = "\n> [!formula]\n> **Core Identity:**\n> $$a^2 + b^2 = c^2$$\n";
    if (type === "TRAP") snippet = "\n> [!trap]\n> **Critical TCS Trap:**\n> Verify whether radius or diameter is specified.\n";
    if (type === "TABLE") snippet = "\n| Condition | Method | Shortcut |\n| :--- | :--- | :--- |\n| Case 1 | Direct Tangent | $2\\sqrt{r_1 r_2}$ |\n";
    textarea.value += snippet;
    textarea.focus();
  }

  async function launchCurrentSheetQuestionsDrill() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    closeCompendiumStudio();
    const linked = await ConceptService.getLinkedQuestions(sheet.id, sheet.chapter);

    if (linked.length === 0) {
      alert(`No questions in bank for ${sheet.chapter}.`);
      return;
    }

    const instance = await MockService.generate({
      title: `Sheet Practice: ${sheet.title}`,
      explicitQuestionIds: linked.map(q => q.id),
      count: Math.min(25, linked.length),
      mode: "RANDOM"
    });
    await MockService.launchMockSession(instance);
  }

  function openCompendiumStudio() {
    pushNavLayer("compendium-fullscreen-view", () => {
      safeSetDisplay("compendium-fullscreen-view", "none");
    });
    safeSetDisplay("compendium-fullscreen-view", "flex");
    handleCompStudioSubjectChange(activeCompSubject || "QA");
  }

  function closeCompendiumStudio() {
    safeSetDisplay("compendium-fullscreen-view", "none");
  }

  function openConceptEditorModal(isNew = true) {
    currentConceptImageBase64 = "";
    safeSetText("concept-editor-title", isNew ? "Add Topic Sheet" : "Edit Topic Sheet");

    if (isNew || currentCompSheets.length === 0) {
      safeSetValue("concept-edit-id", "top_" + Date.now());
      safeSetValue("concept-edit-subject", activeCompSubject || "QA");
      safeSetValue("concept-edit-chapter", activeCompChapter || "QA_PERCENTAGE");
      safeSetValue("concept-edit-title", "");
      safeSetValue("concept-edit-sub", "");
      safeSetValue("concept-edit-body", "");
      safeSetValue("concept-edit-img-url", "");
      safeSetValue("concept-edit-img-file", "");
    } else {
      const curr = currentCompSheets[activeCompSheetIndex];
      safeSetValue("concept-edit-id", curr.id);
      safeSetValue("concept-edit-subject", curr.subject);
      safeSetValue("concept-edit-chapter", curr.chapter);
      safeSetValue("concept-edit-title", curr.title);
      safeSetValue("concept-edit-sub", curr.subtitle || "");
      safeSetValue("concept-edit-body", curr.content);
      safeSetValue("concept-edit-img-url", curr.imageUrl || "");
      safeSetValue("concept-edit-img-file", "");
    }

    pushHistoryState("modal-concept-editor");
    const m = document.getElementById("modal-concept-editor");
    if (m) m.classList.add("active");
  }

  async function handleConceptImageUpload(input) {
    if (input.files && input.files[0]) {
      currentConceptImageBase64 = await compressImageFile(input.files[0]);
    }
  }

  async function saveConceptCard() {
    const id = document.getElementById("concept-edit-id")?.value;
    const subject = document.getElementById("concept-edit-subject")?.value;
    const chapter = document.getElementById("concept-edit-chapter")?.value.trim().toUpperCase();
    const title = document.getElementById("concept-edit-title")?.value.trim();
    const subtitle = document.getElementById("concept-edit-sub")?.value.trim();
    const content = document.getElementById("concept-edit-body")?.value.trim();
    const urlInput = document.getElementById("concept-edit-img-url")?.value.trim();

    if (!title || !content || !chapter) {
      alert("Chapter, Topic Title, and Content are required.");
      return;
    }

    const obj = {
      id: id,
      subject: subject,
      chapter: chapter,
      title: title,
      subtitle: subtitle,
      content: content,
      imageUrl: currentConceptImageBase64 || urlInput,
      timestamp: Date.now()
    };

    const existing = await ConceptService.get(id);
    if (existing) {
      await ConceptService.update(id, obj);
    } else {
      await ConceptService.create(obj);
    }

    const m = document.getElementById("modal-concept-editor");
    if (m) m.classList.remove("active");
    openCompendiumToSheet(id, subject, chapter);
  }

  function openOmniResearchForCurrentQuestion() {
    if (!activeExam) return;
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    triggerOmniResearchDrawer(q);
  }

  function openOmniResearchForDojoQuestion() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    triggerOmniResearchDrawer(q);
  }

  function triggerOmniResearchDrawer(q) {
    if (!q) return;
    const queryText = (q.subtopic || q.method || q.chapter).replace(/_/g, " ");
    safeSetText("omni-research-query-sub", `${q.subject} â€¢ ${q.chapter}`);
    safeSetText("omni-research-prompt-preview", q.questionText.slice(0, 160) + "...");

    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(queryText + " SSC CGL")}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q.questionText.slice(0, 100) + " " + queryText)}`;

    let wolframQuery = queryText;
    const mathMatch = q.questionText.match(/\$([^\$]+)\$/);
    if (mathMatch && mathMatch[1]) {
      wolframQuery = mathMatch[1].replace(/\\text\{.*?\}/g, "").replace(/\\/g, "");
    }
    const wolframUrl = `https://www.wolframalpha.com/input?i=${encodeURIComponent(wolframQuery)}`;

    const wEl = document.getElementById("omni-link-wiki");
    if (wEl) wEl.href = wikiUrl;
    const gEl = document.getElementById("omni-link-google");
    if (gEl) gEl.href = googleUrl;
    const wfEl = document.getElementById("omni-link-wolfram");
    if (wfEl) wfEl.href = wolframUrl;

    pushHistoryState("modal-omni-research");
    const m = document.getElementById("modal-omni-research");
    if (m) m.classList.add("active");
  }

  function jumpToConceptFromReview(conceptId) {
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    openCompendiumToSheet(conceptId, q.subject, q.chapter);
  }

  function jumpToConceptFromDojo() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    const targetCId = (Array.isArray(q.conceptIds) && q.conceptIds.length > 0) ? q.conceptIds[0] : q.conceptId;
    openCompendiumToSheet(targetCId, q.subject, q.chapter);
  }

  function openOmniSearchModal() {
    pushHistoryState("modal-comp-omni-search");
    const m = document.getElementById("modal-comp-omni-search");
    if (m) m.classList.add("active");
    safeSetValue("comp-omni-search-input", "");
    safeSetHtml("comp-omni-results-list", `<p style="color:var(--text-muted); text-align:center; padding:20px;">Type keywords above to query across all living sheets.</p>`);
    setTimeout(() => {
      const inp = document.getElementById("comp-omni-search-input");
      if (inp) inp.focus();
    }, 150);
  }

  async function executeOmniSearch(keyword) {
    const list = document.getElementById("comp-omni-results-list");
    if (!list) return;
    const term = keyword.trim().toLowerCase();
    if (!term) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">Type keywords above to query across all living sheets.</p>`;
      return;
    }

    const allDossiers = await ConceptService.getAll();
    const results = allDossiers.filter(d => 
      (d.title && d.title.toLowerCase().includes(term)) ||
      (d.subtitle && d.subtitle.toLowerCase().includes(term)) ||
      (d.chapter && d.chapter.toLowerCase().includes(term)) ||
      (d.content && d.content.toLowerCase().includes(term))
    );

    list.innerHTML = "";
    if (results.length === 0) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">No matching formulas, traps, or sheets found.</p>`;
      return;
    }

    results.forEach(res => {
      const div = document.createElement("div");
      div.className = "card";
      div.style.padding = "10px";
      div.style.marginBottom = "8px";
      div.style.cursor = "pointer";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span class="badge" style="background:#1f6feb;">${res.subject} â€¢ ${res.chapter}</span>
        </div>
        <b style="font-size:14px; color:#fff;">${res.title}</b>
        <div style="font-size:11px; color:var(--accent-cyan); font-family:var(--font-mono); margin-bottom:4px;">${res.subtitle || ''}</div>
        <div style="font-size:12px; color:var(--text-muted); max-height:40px; overflow:hidden; text-overflow:ellipsis;">${res.content.slice(0, 100)}...</div>
      `;
      div.addEventListener("click", () => {
        const modal = document.getElementById("modal-comp-omni-search");
        if (modal) modal.classList.remove("active");
        openCompendiumToSheet(res.id, res.subject, res.chapter);
      });
      list.appendChild(div);
    });
  }

  /* ==========================================================================
   * SECTION 26: SYNAPSE KNOWLEDGE EXPLORER
   * ========================================================================== */
  async function openSynapseGraphModal() {
    synapseCurrentLevel = "SUBJECTS";
    synapseActiveSubject = null;
    synapseActiveChapter = null;
    renderSynapseExplorer();

    pushNavLayer("modal-synapse-tree", () => {
      const m = document.getElementById("modal-synapse-tree");
      if (m) m.classList.remove("active");
    });
    const m = document.getElementById("modal-synapse-tree");
    if (m) m.classList.add("active");
  }

  async function renderSynapseExplorer() {
    const rootContainer = document.getElementById("synapse-dom-tree-root");
    if (!rootContainer) return;
    rootContainer.innerHTML = "";

    const allQs = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
    const taxonomy = await TaxonomyService.getTaxonomy();

    const breadcrumb = document.createElement("div");
    breadcrumb.style.cssText = "display:flex; align-items:center; gap:8px; font-size:12px; margin-bottom:12px; color:var(--accent-cyan);";
    breadcrumb.innerHTML = `
      <span style="cursor:pointer;" onclick="CGL_OS.setSynapseLevel('SUBJECTS')">All Subjects</span>
      ${synapseActiveSubject ? ` âž” <span style="cursor:pointer;" onclick="CGL_OS.setSynapseLevel('CHAPTERS', '${synapseActiveSubject}')">${synapseActiveSubject}</span>` : ''}
      ${synapseActiveChapter ? ` âž” <b>${synapseActiveChapter}</b>` : ''}
    `;
    rootContainer.appendChild(breadcrumb);

    if (synapseCurrentLevel === "SUBJECTS") {
      const grid = document.createElement("div");
      grid.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:10px;";
      Object.keys(taxonomy).forEach(sKey => {
        const sub = taxonomy[sKey];
        const qCount = allQs.filter(q => q.subject === sKey).length;
        const cCount = allConcepts.filter(c => c.subject === sKey).length;

        const tile = document.createElement("div");
        tile.className = "card";
        tile.style.cssText = "cursor:pointer; padding:14px; margin-bottom:0;";
        tile.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:14px; color:#fff;">${sub.name}</b>
            <span class="badge" style="background:#1f6feb;">${sKey}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:8px;">
            ${sub.chapters.length} Chapters â€¢ ${qCount} Questions â€¢ ${cCount} Sheets
          </div>
        `;
        tile.onclick = () => setSynapseLevel("CHAPTERS", sKey);
        grid.appendChild(tile);
      });
      rootContainer.appendChild(grid);
    } else if (synapseCurrentLevel === "CHAPTERS") {
      const sub = taxonomy[synapseActiveSubject];
      const list = document.createElement("div");

      sub.chapters.forEach(chap => {
        const chapQs = allQs.filter(q => q.subject === synapseActiveSubject && q.chapter === chap);
        const chapSheets = allConcepts.filter(c => c.subject === synapseActiveSubject && c.chapter === chap);

        const row = document.createElement("div");
        row.className = "tree-node-row";
        row.style.marginBottom = "6px";
        row.innerHTML = `
          <div style="overflow:hidden;" onclick="CGL_OS.setSynapseLevel('CONCEPTS', '${synapseActiveSubject}', '${chap}')">
            <b style="color:#fff; font-size:13px;">${chap}</b>
            <div style="font-size:10.5px; color:var(--text-muted);">${chapQs.length} Qs â€¢ ${chapSheets.length} Living Sheets</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.launchDirectChapterDrill('${synapseActiveSubject}', '${chap}')">âš¡ Drill</button>
            <button class="btn btn-cyan" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.setSynapseLevel('CONCEPTS', '${synapseActiveSubject}', '${chap}')">Explore âž”</button>
          </div>
        `;
        list.appendChild(row);
      });
      rootContainer.appendChild(list);
    } else if (synapseCurrentLevel === "CONCEPTS") {
      const chapSheets = allConcepts.filter(c => c.subject === synapseActiveSubject && c.chapter === synapseActiveChapter);
      const chapQs = allQs.filter(q => q.subject === synapseActiveSubject && q.chapter === synapseActiveChapter);

      const header = document.createElement("div");
      header.style.cssText = "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;";
      header.innerHTML = `
        <span style="font-weight:700; color:#fff;">${synapseActiveChapter} Inventory (${chapQs.length} Qs, ${chapSheets.length} Sheets)</span>
        <button class="btn" style="padding:4px 10px; font-size:11px;" onclick="CGL_OS.launchDirectChapterDrill('${synapseActiveSubject}', '${synapseActiveChapter}')">âš¡ Drill Entire Chapter (${chapQs.length} Qs)</button>
      `;
      rootContainer.appendChild(header);

      chapSheets.forEach(sheet => {
        const item = document.createElement("div");
        item.className = "card";
        item.style.padding = "10px";
        item.style.marginBottom = "8px";
        item.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <b style="color:var(--accent-cyan); font-size:13px;">ðŸ“– ${sheet.title}</b>
              <div style="font-size:11px; color:var(--text-muted);">${sheet.subtitle || ''}</div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary" style="padding:3px 8px; font-size:10px;" onclick="CGL_OS.openCompendiumToSheet('${sheet.id}', '${synapseActiveSubject}', '${synapseActiveChapter}')">Read</button>
              <button class="btn btn-cyan" style="padding:3px 8px; font-size:10px;" onclick="CGL_OS.launchDirectSheetDrill('${sheet.id}', '${synapseActiveSubject}', '${synapseActiveChapter}')">Drill</button>
            </div>
          </div>
        `;
        rootContainer.appendChild(item);
      });
    }
  }

  function setSynapseLevel(level, subject = null, chapter = null) {
    synapseCurrentLevel = level;
    if (subject) synapseActiveSubject = subject;
    if (chapter) synapseActiveChapter = chapter;
    renderSynapseExplorer();
  }

  async function launchDirectChapterDrill(subKey, chap) {
    const modal = document.getElementById("modal-synapse-tree");
    if (modal) modal.classList.remove("active");
    const instance = await MockService.generate({
      title: `${chap} Master Drill`,
      subject: subKey,
      chapter: chap,
      count: 25,
      mode: "RANDOM"
    });
    await MockService.launchMockSession(instance);
  }

  async function launchDirectSheetDrill(conceptId, subject, chapter) {
    const modal = document.getElementById("modal-synapse-tree");
    if (modal) modal.classList.remove("active");
    const linkedQs = await ConceptService.getLinkedQuestions(conceptId, chapter);
    if (linkedQs.length === 0) {
      alert(`No questions linked to sheet ${conceptId}.`);
      return;
    }
    const instance = await MockService.generate({
      title: `Sheet Practice: ${conceptId}`,
      explicitQuestionIds: linkedQs.map(q => q.id),
      count: linkedQs.length,
      mode: "RANDOM"
    });
    await MockService.launchMockSession(instance);
  }

  /* ==========================================================================
   * SECTION 27: DASHBOARD & ACTIVE COMMAND CENTER CONTROLLER
   * Live Trap Heat-Bar Render & Dynamic ERI Telemetry Binds
   * ========================================================================== */
  async function renderDashboard() {
    const allQs = await getAllRecords("store_questions");
    const metrics = await PerformanceService.calculateGlobalMetrics();
    const weakChapters = await PerformanceService.getWeakChapters();
    const neglect = await PerformanceService.calculateNeglect();
    const completedAttempts = await PerformanceService.getHistoricalAttempts();

    // 1. Top 4 Battlefield HUD Tiles
    safeSetText("dash-stat-questions", allQs.length);
    safeSetText("dash-stat-accuracy", metrics.totalMocks > 0 ? `${metrics.accuracy}%` : "--");
    safeSetText("dash-stat-weak", weakChapters.length);
    const hrs = Math.floor((metrics.totalStudyTimeSec || 0) / 3600);
    const mins = Math.floor(((metrics.totalStudyTimeSec || 0) % 3600) / 60);
    safeSetText("dash-stat-time", `${hrs}h ${mins}m`);

    // 2. Continue Training Card
    if (completedAttempts.length === 0) {
      safeSetText("dash-continue-title", "Baseline Calibration Needed");
      safeSetText("dash-continue-sub", "Zero completed tests detected. Tap to run diagnostic onboarding mock.");
    } else if (weakChapters.length > 0) {
      const targetWeak = weakChapters[0];
      safeSetText("dash-continue-title", `${targetWeak.chapter} â€” Weakness Drill`);
      safeSetText("dash-continue-sub", `Current accuracy: ${targetWeak.accuracy}% (${targetWeak.wrong} incorrect answers recorded)`);
    } else {
      safeSetText("dash-continue-title", "Comprehensive Practice â€” Daily Sprint");
      safeSetText("dash-continue-sub", "All syllabus chapters currently within nominal accuracy bands");
    }

    // 3. Left Column: Your Weak Areas
    const weakListContainer = document.getElementById("dash-weak-areas-list");
    if (weakListContainer) {
      weakListContainer.innerHTML = "";
      if (completedAttempts.length === 0) {
        weakListContainer.innerHTML = `<p style="font-size:11.5px; color:var(--text-muted); padding:10px 0;">Awaiting baseline diagnostic telemetry.</p>`;
      } else if (weakChapters.length === 0) {
        weakListContainer.innerHTML = `<p style="font-size:12px; color:var(--status-green); padding:10px 0;">âœ“ Zero weak chapters detected! Excellent mastery.</p>`;
      } else {
        weakChapters.slice(0, 4).forEach((w, i) => {
          const colorIcon = i === 0 ? "ðŸ”´" : (i === 1 ? "ðŸŸ " : "ðŸŸ¡");
          const row = document.createElement("div");
          row.className = "weak-item-row";
          row.innerHTML = `
            <span>${colorIcon} <b>${w.chapter}</b></span>
            <span style="font-family:var(--font-mono); color:var(--status-red);">${w.accuracy}% (${w.attempted}Q)</span>
          `;
          weakListContainer.appendChild(row);
        });
      }
    }

    // 4. Right Column: Recent Performance (Subject Mastery Batteries)
    renderDashboardSubjectBatteries(completedAttempts);

    // 5. Classic HUD Dial & KPIs
    safeSetText("kpi-total-mocks", metrics.totalMocks);
    safeSetText("kpi-global-acc", metrics.totalMocks > 0 ? `${metrics.accuracy}%` : "--");
    safeSetText("kpi-avg-speed", metrics.totalMocks > 0 ? `${metrics.avgSpeed}s` : "--");
    safeSetText("kpi-traps-hit", metrics.trapsHit);

    const circleGauge = document.getElementById("gauge-acc-circle");
    if (circleGauge) {
      circleGauge.setAttribute("stroke-dasharray", `${metrics.accuracy}, 100`);
      circleGauge.style.stroke = metrics.accuracy >= 80 ? "var(--status-green-border)" : (metrics.accuracy >= 65 ? "var(--status-amber)" : "var(--status-red)");
    }

    const eriVal = document.getElementById("eri-score-val");
    const eriTier = document.getElementById("eri-status-tier");
    const eriCircle = document.getElementById("eri-gauge-circle");
    if (eriVal) eriVal.innerText = metrics.eri;
    if (eriCircle) eriCircle.setAttribute("stroke-dasharray", `${metrics.eri}, 100`);
    if (eriTier) {
      eriTier.innerText = metrics.eri >= 80 ? "Tier-1 Formidable" : (metrics.eri >= 65 ? "Competitive Form" : "Calibrating");
    }

    // Live Dynamic ERI Breakdown Subtext Spans Binding
    safeSetText("eri-sub-acc", `Acc: ${metrics.accComp}/50`);
    safeSetText("eri-sub-vel", `Vel: ${metrics.velComp}/30`);
    safeSetText("eri-sub-exp", `Exp: ${metrics.consistencyComp}/20`);

    // Render Cognitive Trap Heat Bar & Legend
    renderDashboardTrapHeatBar(completedAttempts);

    // 6. Neglect Warning
    const negAlert = document.getElementById("dash-neglect-alert");
    if (negAlert) {
      if (neglect) {
        negAlert.style.display = "flex";
        safeSetText("dash-neglect-text", neglect.isNever
          ? `${neglect.chapter} has NEVER been tested in completed mocks.`
          : `${neglect.chapter} untouched for ${neglect.days} days.`);
        const drillBtn = document.getElementById("btn-neglect-drill");
        if (drillBtn) {
          drillBtn.onclick = () => launchDirectChapterDrill(neglect.subject, neglect.chapter);
        }
      } else {
        negAlert.style.display = "none";
      }
    }

    await renderDashboardBlueprints();
    await renderRecentHistory(completedAttempts);
    await renderDrilldownSubjectLevel();
  }

  function renderDashboardTrapHeatBar(completed) {
    const heatBar = document.getElementById("dash-trap-heat-bar");
    const legend = document.getElementById("dash-trap-legend");
    if (!heatBar || !legend) return;

    heatBar.innerHTML = "";
    legend.innerHTML = "";

    const trapTally = {};
    let totalTraps = 0;

    completed.forEach(att => {
      if (att.userResponses) {
        Object.values(att.userResponses).forEach(r => {
          if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED" && r.errorTag !== "VALID_CALCULATED_RISK" && r.errorTag !== "SPEED_MASTERY") {
            trapTally[r.errorTag] = (trapTally[r.errorTag] || 0) + 1;
            totalTraps++;
          }
        });
      }
    });

    const trapColors = {
      TIME_TRAP_Q4: "#f43f5e",
      SECOND_GUESS_BLUNDER: "#f59e0b",
      PANIC_SLIP: "#e11d48",
      SPEED_MISREAD: "#ec4899",
      CALCULATION_SLIP: "#38bdf8",
      CONCEPT_VOID: "#8b5cf6",
      FORMULA_AMNESIA: "#a855f7",
      READING_TRAP: "#06b6d4"
    };

    if (totalTraps === 0) {
      heatBar.innerHTML = `<div style="width:100%; height:100%; background:rgba(16,185,129,0.2); display:flex; align-items:center; justify-content:center; font-size:10px; color:var(--status-green);">Zero cognitive trap penalties recorded. Clean execution!</div>`;
      legend.innerHTML = `<span style="font-size:10px; color:var(--status-green);">Clean Decision Trail â€¢ No Traps</span>`;
      return;
    }

    Object.keys(trapTally).forEach(trap => {
      const count = trapTally[trap];
      const pct = ((count / totalTraps) * 100).toFixed(1);
      const color = trapColors[trap] || "#64748b";

      const seg = document.createElement("div");
      seg.className = "trap-heat-seg";
      seg.style.width = `${pct}%`;
      seg.style.backgroundColor = color;
      seg.title = `${trap.replace(/_/g, ' ')}: ${count} (${pct}%)`;
      seg.onclick = () => openTrapClinicModal(trap);
      heatBar.appendChild(seg);

      const leg = document.createElement("div");
      leg.className = "trap-legend-pill";
      leg.innerHTML = `<span style="width:7px; height:7px; border-radius:50%; background:${color};"></span><span>${trap.replace(/_/g, ' ')} (${count})</span>`;
      leg.onclick = () => openTrapClinicModal(trap);
      legend.appendChild(leg);
    });
  }

  async function launchContinueTrainingDrill() {
    const completed = await PerformanceService.getHistoricalAttempts();
    if (completed.length === 0) {
      // COLD-START ROUTER: Display Baseline Calibration Modal
      pushHistoryState("modal-onboarding-baseline");
      const modal = document.getElementById("modal-onboarding-baseline");
      if (modal) modal.classList.add("active");
      return;
    }

    const weaks = await PerformanceService.getWeakChapters();
    if (weaks.length > 0) {
      launchDirectChapterDrill(weaks[0].subject, weaks[0].chapter);
    } else {
      const inst = await MockService.generate({ mode: "RANDOM", count: 25 });
      await MockService.launchMockSession(inst);
    }
  }

  async function launchOnboardingDiagnosticMock() {
    const modal = document.getElementById("modal-onboarding-baseline");
    if (modal) modal.classList.remove("active");

    const inst = await MockService.generate({
      title: "Diagnostic Baseline Mock (12 Qs)",
      count: 12,
      durationMin: 10,
      mode: "RANDOM"
    });
    await MockService.launchMockSession(inst);
  }

  function renderDashboardSubjectBatteries(completed) {
    const container = document.getElementById("dash-subject-batteries");
    if (!container) return;
    container.innerHTML = "";

    Object.keys(TAXONOMY).forEach(subKey => {
      let subAtt = 0, subCor = 0;
      completed.forEach(c => {
        if (c.questions && Array.isArray(c.questions)) {
          c.questions.forEach(q => {
            if (q.subject === subKey) {
              const resp = (c.userResponses && typeof c.userResponses === "object") ? c.userResponses[q.id] : null;
              if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
                subAtt++;
                if (resp.selectedOption === q.correctIndex) subCor++;
              }
            }
          });
        }
      });

      const acc = subAtt > 0 ? Math.round((subCor / subAtt) * 100) : 0;
      const div = document.createElement("div");
      div.style.marginBottom = "8px";
      div.style.cursor = "pointer";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
          <span style="font-weight:700;">${TAXONOMY[subKey].name} (${subKey})</span>
          <span style="font-family:var(--font-mono); color:${acc >= 80 ? 'var(--status-green)' : (acc >= 60 ? 'var(--status-amber)' : 'var(--text-muted)')};">${subAtt > 0 ? `${acc}% (${subAtt} Qs)` : '0%'}</span>
        </div>
        <div class="battery-bar-container">
          <div class="battery-bar-fill" style="width:${acc}%; background:${acc >= 80 ? 'var(--status-green)' : (acc >= 60 ? 'var(--status-amber)' : 'var(--accent-blue)')};"></div>
        </div>
      `;
      div.addEventListener("click", () => openSubjectDiagnosticModal(subKey));
      container.appendChild(div);
    });
  }

  async function renderDashboardBlueprints() {
    const pillsContainer = document.getElementById("dash-blueprints-pills");
    if (!pillsContainer) return;
    pillsContainer.innerHTML = "";
    const blueprints = await getAllRecords("store_saved_mocks");

    if (blueprints.length === 0) {
      pillsContainer.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">Zero saved setups. Blueprints created via Console or Builder will appear here.</span>`;
      return;
    }

    blueprints.forEach(bp => {
      const pill = document.createElement("button");
      pill.className = "anchor-pill";
      const icon = bp.type === "FIXED_PAPER" ? "ðŸ“Œ" : "âš¡";
      pill.innerHTML = `<span>${icon} ${bp.title}</span><span style="opacity:0.6; font-size:9px;" onclick="event.stopPropagation(); CGL_OS.deleteSavedPreset('${bp.id}')">âœ•</span>`;
      pill.onclick = () => launchSavedPreset(bp.id);
      pillsContainer.appendChild(pill);
    });
  }

  async function renderRecentHistory(completed) {
    const container = document.getElementById("mock-history-container");
    if (!container) return;
    if (completed.length === 0) {
      container.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:10px;">No mocks submitted yet. Launch your first mock above.</p>`;
      return;
    }

    container.innerHTML = "";
    const sorted = completed.slice().sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    sorted.slice(0, 3).forEach(att => {
      const secScores = {};
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          const secName = q.subject || "GEN";
          if (!secScores[secName]) secScores[secName] = 0;
          const resp = att.userResponses[q.id];
          if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
            if (resp.selectedOption === q.correctIndex) secScores[secName] += 2.0;
            else secScores[secName] -= 0.5;
          }
        });
      }

      const card = document.createElement("div");
      card.className = "ticket-card";
      card.innerHTML = `
        <div class="ticket-header">
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <b style="font-size:14px; color:#fff;">${att.title || 'SSC CGL Mock'}</b>
              ${att.attemptNumber > 1 ? `<span class="badge" style="background:#8957e5; font-size:9px;">Attempt ${att.attemptNumber}</span>` : ''}
              <span class="badge-slot slot-${(att.diurnalSlot || 'morning').toLowerCase()}">${att.diurnalSlot || 'DAY'}</span>
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${att.timeIST || formatISTDate(att.timestamp)}</div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:16px; font-weight:800; color:var(--accent-cyan);">${(att.finalScore || 0).toFixed(2)} pts</span>
          </div>
        </div>
        <div class="ticket-pills-row">
          ${Object.keys(secScores).map(k => `<span class="ticket-sec-pill"><b>${k}:</b> ${secScores[k].toFixed(1)}</span>`).join('')}
          <span class="ticket-sec-pill" style="color:var(--status-red);">Traps: ${att.q4Traps || 0}</span>
        </div>
        <div class="ticket-actions-bar">
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${att.sessionId}')">ðŸ“¥ Export</button>
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--status-green);" onclick="CGL_OS.reattemptMock('${att.sessionId}')">ðŸ” Re-attempt</button>
          <button class="btn btn-secondary" style="padding:4px 10px; font-size:11px;" onclick="CGL_OS.openMockReview('${att.sessionId}')">Inspect Solutions</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  async function renderDrilldownSubjectLevel() {
    safeSetText("drilldown-breadcrumb", "Global");
    safeSetText("drill-level-tag", "LEVEL: SUBJECT");
    const list = document.getElementById("drilldown-list");
    if (!list) return;
    list.innerHTML = "";

    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);

    Object.keys(TAXONOMY).forEach(subKey => {
      const sub = TAXONOMY[subKey];
      let subAtt = 0, subCor = 0;
      completed.forEach(c => {
        if (c.questions && Array.isArray(c.questions)) {
          c.questions.forEach(q => {
            if (q.subject === subKey) {
              const resp = (c.userResponses && typeof c.userResponses === "object") ? c.userResponses[q.id] : null;
              if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
                subAtt++;
                if (resp.selectedOption === q.correctIndex) subCor++;
              }
            }
          });
        }
      });

      const div = document.createElement("div");
      div.className = "card";
      div.style.padding = "12px";
      div.style.marginBottom = "8px";
      div.style.cursor = "pointer";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700;">${sub.name} (${subKey})</div>
            <div style="font-size:11px; color:var(--text-muted);">${sub.chapters.length} Standard Chapters</div>
          </div>
          <div style="text-align:right;">
            <span class="badge" style="background:#151a24; color:#38bdf8;">
              ${subAtt > 0 ? `Acc: ${Math.round((subCor / subAtt) * 100)}%` : "Unattempted"}
            </span>
          </div>
        </div>
      `;
      div.addEventListener("click", () => renderDrilldownChapterLevel(subKey));
      list.appendChild(div);
    });
  }

  async function renderDrilldownChapterLevel(subKey) {
    const sub = TAXONOMY[subKey];
    safeSetHtml("drilldown-breadcrumb", `<span onclick="CGL_OS.renderDashboard()">Global</span> &gt; <b>${subKey}</b>`);
    safeSetText("drill-level-tag", "LEVEL: CHAPTERS");

    const list = document.getElementById("drilldown-list");
    if (!list) return;
    list.innerHTML = "";

    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);
    const allQuestions = await getAllRecords("store_questions");

    sub.chapters.forEach(chap => {
      let chapAtt = 0, chapCor = 0, chapSec = 0;
      completed.forEach(c => {
        if (c.questions && Array.isArray(c.questions)) {
          c.questions.forEach(q => {
            if (q.chapter === chap) {
              const resp = (c.userResponses && typeof c.userResponses === "object") ? c.userResponses[q.id] : null;
              if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
                chapAtt++;
                chapSec += (resp.timeSpentSec || 0);
                if (resp.selectedOption === q.correctIndex) chapCor++;
              }
            }
          });
        }
      });

      const totalInBank = allQuestions.filter(q => q.chapter === chap).length;
      const div = document.createElement("div");
      div.className = "card";
      div.style.padding = "12px";
      div.style.marginBottom = "8px";
      div.style.cursor = "pointer";

      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-family:var(--font-mono); font-size:13px;">${chap}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
              Bank: ${totalInBank} Qs â€¢ ${chapAtt > 0 ? `Speed: ${Math.round(chapSec / chapAtt)}s` : "No solve data"}
            </div>
          </div>
          <div style="text-align:right;">
            <span class="badge" style="background:${chapAtt > 0 ? '#1b4d2e' : '#151a24'}; color:${chapAtt > 0 ? '#4ade80' : '#8b949e'};">
              ${chapAtt > 0 ? `Acc: ${Math.round((chapCor / chapAtt) * 100)}%` : "Unattempted"}
            </span>
          </div>
        </div>
      `;
      div.addEventListener("click", () => openChapterInspector(subKey, chap, chapAtt, chapCor, chapSec));
      list.appendChild(div);
    });
  }

  async function openChapterInspector(subKey, chap, attCount, corCount, secCount) {
    safeSetText("insp-chapter-title", chap);
    safeSetText("insp-subject-title", TAXONOMY[subKey] ? TAXONOMY[subKey].name : subKey);

    const acc = attCount > 0 ? Math.round((corCount / attCount) * 100) : 0;
    const avgSpeed = attCount > 0 ? Math.round(secCount / attCount) : 0;
    safeSetText("insp-acc", attCount > 0 ? `${acc}%` : "--");
    safeSetText("insp-speed", attCount > 0 ? `${avgSpeed}s` : "--");

    const nc = attCount > 0 ? Math.max(0, (1 - (attCount / 50))).toFixed(2) : "1.00";
    safeSetText("insp-nc", nc);

    const blitzBtn = document.getElementById("btn-launch-chapter-blitz");
    if (blitzBtn) {
      blitzBtn.onclick = () => {
        const m = document.getElementById("modal-chapter-inspector");
        if (m) m.classList.remove("active");
        launchConfiguredMockDirect(subKey, chap, 5, 5);
      };
    }

    // CHAPTER INSPECTOR HISTORICAL VULNERABILITIES POPULATION
    const vulnList = document.getElementById("insp-vulnerability-list");
    if (vulnList) {
      vulnList.innerHTML = "";
      const completed = await PerformanceService.getHistoricalAttempts();
      const errorMap = [];

      completed.forEach(att => {
        if (att.questions && Array.isArray(att.questions) && att.userResponses) {
          att.questions.forEach(q => {
            if (q.chapter === chap) {
              const resp = att.userResponses[q.id];
              if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined && resp.selectedOption !== q.correctIndex) {
                errorMap.push({ q, resp, timeIST: att.timeIST });
              }
            }
          });
        }
      });

      if (errorMap.length === 0) {
        vulnList.innerHTML = `<span style="color:var(--status-green);">Zero recorded mistakes in ${chap}.</span>`;
      } else {
        errorMap.slice(-5).forEach(err => {
          const div = document.createElement("div");
          div.style.padding = "6px 0";
          div.style.borderBottom = "1px solid var(--border-color)";
          div.innerHTML = `
            <div style="display:flex; justify-content:space-between; color:#f87171; font-weight:700;">
              <span>${err.q.id}</span>
              <span>#${err.resp.errorTag || 'UNCLASSIFIED'} (${err.resp.timeSpentSec || 0}s)</span>
            </div>
            <div style="color:var(--text-muted); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${err.q.questionText}
            </div>
          `;
          vulnList.appendChild(div);
        });
      }
    }

    pushHistoryState("modal-chapter-inspector");
    const m = document.getElementById("modal-chapter-inspector");
    if (m) m.classList.add("active");
  }

  /* ==========================================================================
   * SECTION 28: FLASHCARD VAULT & ANKI TSV EXPORT ENGINE
   * Carousel Image Bleed Bug Resolved
   * ========================================================================== */
  async function renderVault() {
    await renderVaultTagPills();
    const flashcards = await getAllRecords("store_flashcards");
    const container = document.getElementById("flashcard-list-container");
    if (!container) return;
    container.innerHTML = "";

    safeSetText("vault-count-total", flashcards.length);
    let diagramCount = 0, extraCount = 0;
    flashcards.forEach(f => {
      if (f.frontImageUrl || f.backImageUrl) diagramCount++;
      if (f.extra && f.extra.trim()) extraCount++;
    });
    safeSetText("vault-count-diagrams", diagramCount);
    safeSetText("vault-count-extra", extraCount);

    const filterSub = document.getElementById("vault-deck-filter-sub")?.value || "ALL";

    const filtered = flashcards.filter(f => {
      if (filterSub !== "ALL" && f.subject !== filterSub) return false;
      if (vaultActiveTag !== "ALL" && (!Array.isArray(f.tags) || !f.tags.includes(vaultActiveTag))) return false;
      if (vaultSearchQuery) {
        const inFront = f.front.toLowerCase().includes(vaultSearchQuery);
        const inBack = f.back.toLowerCase().includes(vaultSearchQuery);
        const inExtra = (f.extra || "").toLowerCase().includes(vaultSearchQuery);
        if (!inFront && !inBack && !inExtra) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:16px;">Zero flashcards match current criteria.</div>`;
      return;
    }

    filtered.forEach(f => {
      const tile = document.createElement("div");
      tile.className = "vault-compact-tile";
      tile.innerHTML = `
        <div class="vault-compact-header" onclick="this.parentElement.classList.toggle('open')">
          <div style="overflow:hidden; padding-right:8px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
              <span class="badge" style="background:#151a24; color:var(--accent-cyan); font-size:10px;">${f.subject} â€¢ ${f.chapter}</span>
              <span class="anki-type-tag">${f.cardType || 'BASIC'}</span>
            </div>
            <div style="font-size:12.5px; font-weight:600; color:#fff; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">
              ${f.front.replace(/\$+/g, '').slice(0, 75)}...
            </div>
          </div>
          <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);">â–¼</span>
        </div>
        <div class="vault-compact-drawer">
          <div style="font-size:14px; line-height:1.6; color:#fff; margin-bottom:8px;"><b>Prompt:</b><br>${formatRichText(f.front)}</div>
          <div style="font-size:13.5px; line-height:1.6; color:var(--accent-cyan); margin-bottom:8px;"><b>Answer:</b><br>${formatRichText(f.back)}</div>
          ${f.extra ? `<div class="callout-box" style="margin-top:6px; font-size:12px;"><b>Notes:</b><br>${formatRichText(f.extra)}</div>` : ''}
          <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:8px;">
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.openFlashcardEditorModal(false, '${f.id}')">Edit</button>
            <button class="btn btn-danger" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.deleteCurrentEditingFlashcard('${f.id}')">Delete</button>
          </div>
        </div>
      `;
      container.appendChild(tile);
    });
  }

  async function renderVaultTagPills() {
    const container = document.getElementById("vault-tag-scroll-pills");
    if (!container) return;
    container.innerHTML = "";

    const flashcards = await getAllRecords("store_flashcards");
    const allTags = new Set();
    flashcards.forEach(f => {
      (f.tags || []).forEach(t => allTags.add(t));
    });

    const createPill = (label, tagVal) => {
      const btn = document.createElement("button");
      btn.className = "anchor-pill" + (vaultActiveTag === tagVal ? " active" : "");
      btn.innerText = label;
      btn.onclick = () => {
        vaultActiveTag = tagVal;
        renderVaultTagPills();
        renderVault();
      };
      return btn;
    };

    container.appendChild(createPill("All Tags", "ALL"));
    allTags.forEach(tag => {
      container.appendChild(createPill(`#${tag}`, tag));
    });
  }

  function handleVaultSearchInput(val) {
    vaultSearchQuery = val.trim().toLowerCase();
    renderVault();
  }

  function renderFlashcardList() {
    renderVault();
  }

  function toggleVaultCardAccordion(id) {
    const tile = document.getElementById(`vault-tile-${id}`);
    if (tile) tile.classList.toggle("open");
  }

  async function launchUntimedQuickCarousel() {
    const flashcards = await getAllRecords("store_flashcards");
    const filterSub = document.getElementById("vault-deck-filter-sub")?.value || "ALL";
    const filtered = flashcards.filter(f => filterSub === "ALL" || f.subject === filterSub);

    if (filtered.length === 0) {
      alert("No cards in vault matching this selection.");
      return;
    }

    activeVaultDeck = filtered;
    activeVaultIndex = 0;
    activeVaultFlipped = false;

    pushNavLayer("modal-flashcard-study", () => {
      const m = document.getElementById("modal-flashcard-study");
      if (m) m.classList.remove("active");
    });
    const m = document.getElementById("modal-flashcard-study");
    if (m) m.classList.add("active");
    renderCurrentVaultCard();
  }

  function renderCurrentVaultCard() {
    const card = activeVaultDeck[activeVaultIndex];
    if (!card) return;

    activeVaultFlipped = false;
    safeSetText("fc-study-progress", `Card ${activeVaultIndex + 1} of ${activeVaultDeck.length}`);
    safeSetText("fc-card-chapter", `${card.subject} â€¢ ${card.chapter}`);
    safeSetText("fc-card-type-tag", card.cardType || (card.extra ? 'BASIC_EXTRA' : 'BASIC'));
    safeSetHtml("fc-card-body", formatRichText(card.front));

    const fBox = document.getElementById("fc-card-front-img-box");
    if (fBox) {
      if (card.frontImageUrl && card.frontImageUrl.trim().length > 0) {
        fBox.style.display = "block";
        fBox.innerHTML = `<img src="${card.frontImageUrl}" alt="Front Diagram">`;
      } else {
        fBox.style.display = "none";
        fBox.innerHTML = "";
      }
    }

    const bBox = document.getElementById("fc-card-back-img-box");
    if (bBox) {
      bBox.style.display = "none";
      bBox.innerHTML = "";
    }

    safeSetText("fc-card-cue", "[ TAP TO REVEAL ]");
  }

  function flipStudyFlashcard() {
    if (activeVaultFlipped) return;
    const card = activeVaultDeck[activeVaultIndex];
    if (!card) return;

    activeVaultFlipped = true;

    // FLASHCARD IMAGE BLEED FIX: Hide front image when back is revealed!
    const fBox = document.getElementById("fc-card-front-img-box");
    if (fBox) fBox.style.display = "none";

    const bBox = document.getElementById("fc-card-back-img-box");
    if (bBox) {
      if (card.backImageUrl && card.backImageUrl.trim().length > 0) {
        bBox.style.display = "block";
        bBox.innerHTML = `<img src="${card.backImageUrl}" alt="Back Proof">`;
      } else {
        bBox.style.display = "none";
        bBox.innerHTML = "";
      }
    }

    let extraHtml = "";
    if (card.extra && card.extra.trim().length > 0) {
      extraHtml = `<div class="callout-box" style="margin-top:10px; font-size:12px;"><b>Notes:</b><br>${formatRichText(card.extra)}</div>`;
    }

    safeSetHtml("fc-card-body", `
      <div style="color:var(--text-muted); font-size:12px; margin-bottom:8px;">${formatRichText(card.front)}</div>
      <hr style="border:0; border-top:1px solid var(--border-color); margin:8px 0;">
      <div style="font-weight:700; color:#fff;">${formatRichText(card.back)}</div>
      ${extraHtml}
    `);
    safeSetText("fc-card-cue", "Revealed. Rate above or navigate below.");
  }

  function navStudyCard(step) {
    if (activeVaultDeck.length === 0) return;
    activeVaultIndex += step;
    if (activeVaultIndex < 0) activeVaultIndex = activeVaultDeck.length - 1;
    if (activeVaultIndex >= activeVaultDeck.length) activeVaultIndex = 0;
    renderCurrentVaultCard();
  }

  function openAnkiExportModal() {
    pushHistoryState("modal-anki-export");
    const m = document.getElementById("modal-anki-export");
    if (m) m.classList.add("active");
  }

  async function generateAndDownloadAnkiTsv() {
    const sub = document.getElementById("anki-export-subject")?.value || "ALL";
    const fieldMapping = document.getElementById("anki-export-fields")?.value || "THREE_FIELD";
    const deckName = document.getElementById("anki-export-deck-name")?.value.trim() || "SSC CGL 2026";
    const convertMath = document.getElementById("anki-convert-mathjax")?.checked ?? true;
    const includeImages = document.getElementById("anki-include-data-images")?.checked ?? true;

    const allCards = await getAllRecords("store_flashcards");
    const pool = sub === "ALL" ? allCards : allCards.filter(c => c.subject === sub);

    if (pool.length === 0) {
      alert("Zero cards match the chosen Anki export criteria.");
      return;
    }

    let tsv = `#separator:Tab\n#html:true\n#deck:${deckName}\n#notetype:CGL-Master-Card\n`;
    tsv += fieldMapping === "THREE_FIELD" ? `#columns:Front\tBack\tExtra\tTags\n` : `#columns:Front\tBack\tTags\n`;

    pool.forEach(c => {
      let frontText = convertMath ? convertKatexToAnkiMathJax(c.front) : c.front;
      let backText = convertMath ? convertKatexToAnkiMathJax(c.back) : c.back;
      let extraText = c.extra ? (convertMath ? convertKatexToAnkiMathJax(c.extra) : c.extra) : "";

      frontText = frontText.replace(/\n/g, "<br>").replace(/\t/g, " ");
      backText = backText.replace(/\n/g, "<br>").replace(/\t/g, " ");
      extraText = extraText.replace(/\n/g, "<br>").replace(/\t/g, " ");

      if (includeImages) {
        if (c.frontImageUrl) frontText += `<br><img src="${c.frontImageUrl}">`;
        if (c.backImageUrl) backText += `<br><img src="${c.backImageUrl}">`;
      }

      const tags = (Array.isArray(c.tags) ? c.tags : []).join(' ') + ` ${c.subject} ${c.chapter}`;
      tsv += fieldMapping === "THREE_FIELD" ? `${frontText}\t${backText}\t${extraText}\t${tags}\n` : `${frontText}\t${backText}<br>${extraText}\t${tags}\n`;
    });

    await downloadFileResilient(`Anki_${sub}_Export_${Date.now()}.txt`, "text/tab-separated-values", tsv);
    const m = document.getElementById("modal-anki-export");
    if (m) m.classList.remove("active");
  }

  async function openFlashcardEditorModal(isNew = true, cardId = null) {
    currentFcFrontImgBase64 = "";
    currentFcBackImgBase64 = "";

    if (isNew) {
      safeSetText("flashcard-editor-title", "Add New Card to Vault");
      safeSetValue("edit-fc-id", "fc_" + Date.now());
      safeSetValue("edit-fc-subject", "QA");
      safeSetValue("edit-fc-chapter", "QA_PERCENTAGE");
      safeSetValue("edit-fc-type", "BASIC_EXTRA");
      safeSetValue("edit-fc-front", "");
      safeSetValue("edit-fc-front-img-url", "");
      safeSetValue("edit-fc-front-img-file", "");
      safeSetValue("edit-fc-back", "");
      safeSetValue("edit-fc-back-img-url", "");
      safeSetValue("edit-fc-back-img-file", "");
      safeSetValue("edit-fc-extra", "");
      safeSetValue("edit-fc-tags", "");
      safeSetDisplay("btn-delete-fc", "none");
    } else {
      const card = await getRecord("store_flashcards", cardId);
      if (!card) return;
      safeSetText("flashcard-editor-title", "Edit Vault Card");
      safeSetValue("edit-fc-id", card.id);
      safeSetValue("edit-fc-subject", card.subject);
      safeSetValue("edit-fc-chapter", card.chapter);
      safeSetValue("edit-fc-type", card.cardType || (card.extra ? "BASIC_EXTRA" : "BASIC"));
      safeSetValue("edit-fc-front", card.front);
      safeSetValue("edit-fc-front-img-url", card.frontImageUrl || "");
      safeSetValue("edit-fc-front-img-file", "");
      safeSetValue("edit-fc-back", card.back);
      safeSetValue("edit-fc-back-img-url", card.backImageUrl || "");
      safeSetValue("edit-fc-back-img-file", "");
      safeSetValue("edit-fc-extra", card.extra || "");
      safeSetValue("edit-fc-tags", Array.isArray(card.tags) ? card.tags.join(', ') : "");
      safeSetDisplay("btn-delete-fc", "block");
    }

    pushHistoryState("modal-flashcard-editor");
    const m = document.getElementById("modal-flashcard-editor");
    if (m) m.classList.add("active");
  }

  async function handleFlashcardFrontImageUpload(input) {
    if (input.files && input.files[0]) {
      currentFcFrontImgBase64 = await compressImageFile(input.files[0]);
    }
  }

  async function handleFlashcardBackImageUpload(input) {
    if (input.files && input.files[0]) {
      currentFcBackImgBase64 = await compressImageFile(input.files[0]);
    }
  }

  async function saveFlashcardEditor() {
    const id = document.getElementById("edit-fc-id")?.value;
    const subject = document.getElementById("edit-fc-subject")?.value;
    const chapter = document.getElementById("edit-fc-chapter")?.value.trim().toUpperCase();
    const cardType = document.getElementById("edit-fc-type")?.value;
    const front = document.getElementById("edit-fc-front")?.value.trim();
    const back = document.getElementById("edit-fc-back")?.value.trim();
    const extra = document.getElementById("edit-fc-extra")?.value.trim();
    const frontUrl = document.getElementById("edit-fc-front-img-url")?.value.trim();
    const backUrl = document.getElementById("edit-fc-back-img-url")?.value.trim();
    const tagsRaw = document.getElementById("edit-fc-tags")?.value.trim();

    if (!front || !back || !chapter) {
      alert("Front Prompt, Back Target Fact, and Chapter are required.");
      return;
    }

    const existing = await getRecord("store_flashcards", id);
    const cardObj = {
      id: id,
      cardType: cardType,
      subject: subject,
      chapter: chapter,
      front: front,
      frontImageUrl: currentFcFrontImgBase64 || frontUrl || (existing ? existing.frontImageUrl : ""),
      back: back,
      backImageUrl: currentFcBackImgBase64 || backUrl || (existing ? existing.backImageUrl : ""),
      extra: extra,
      tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()) : ["Manual"]
    };

    await putRecord("store_flashcards", cardObj);
    const m = document.getElementById("modal-flashcard-editor");
    if (m) m.classList.remove("active");
    renderVault();
  }

  async function deleteCurrentEditingFlashcard(id = null) {
    const targetId = id || document.getElementById("edit-fc-id")?.value;
    if (confirm("Permanently delete this card from the vault?")) {
      await deleteRecordFromStore("store_flashcards", targetId);
      const m = document.getElementById("modal-flashcard-editor");
      if (m) m.classList.remove("active");
      renderVault();
    }
  }

  /* ==========================================================================
   * SECTION 29: PUBLISHING PRINT ENGINE & DATA EXTRACTION MATRIX
   * Resilient 3-Tier Download Pipeline & Crash-Proof Hierarchical Sorter
   * ========================================================================== */
  async function openPrintConfigModal() {
    await updatePrintChapters();
    await populatePrintMockDropdown();
    pushHistoryState("modal-print-config");
    const m = document.getElementById("modal-print-config");
    if (m) m.classList.add("active");
  }

  async function populatePrintMockDropdown() {
    const attempts = await getAllRecords("store_attempts");
    const select = document.getElementById("print-mock-select");
    if (!select) return;
    select.innerHTML = "";
    attempts.forEach(a => {
      const opt = document.createElement("option");
      opt.value = a.sessionId;
      opt.innerText = `${a.title} (${a.timeIST || formatISTDate(a.timestamp)})`;
      select.appendChild(opt);
    });
  }

  function handlePrintTypeChange(type) {
    const isQ = type === "QUESTIONS" || type === "COMPENDIUM";
    const isMock = type === "PAST_MOCK";
    safeSetDisplay("print-sub-wrap", isQ ? "block" : "none");
    safeSetDisplay("print-chap-wrap", isQ ? "block" : "none");
    safeSetDisplay("print-mock-select-wrap", isMock ? "block" : "none");
  }

  async function updatePrintChapters() {
    const sub = document.getElementById("print-subject")?.value || "ALL";
    const chapSelect = document.getElementById("print-chapter");
    if (!chapSelect) return;
    chapSelect.innerHTML = `<option value="ALL">All Chapters</option>`;

    const allQs = await getAllRecords("store_questions");
    const chaps = [...new Set(allQs.filter(q => sub === "ALL" || q.subject === sub).map(q => q.chapter))];

    chaps.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      chapSelect.appendChild(opt);
    });
  }

  /**
   * CRASH-PROOF HIERARCHICAL SORTER:
   * Defensive fallbacks prevent TypeError: Cannot read properties of undefined (reading 'localeCompare')
   */
  function sortQuestionsHierarchical(questions) {
    const subOrder = ["QA", "REAS", "ENG", "GA"];
    return questions.slice().sort((a, b) => {
      const sA = subOrder.indexOf(a.subject || "") !== -1 ? subOrder.indexOf(a.subject || "") : 99;
      const sB = subOrder.indexOf(b.subject || "") !== -1 ? subOrder.indexOf(b.subject || "") : 99;
      if (sA !== sB) return sA - sB;
      const chapA = a.chapter || "";
      const chapB = b.chapter || "";
      if (chapA !== chapB) return chapA.localeCompare(chapB);
      const subA = a.subtopic || "";
      const subB = b.subtopic || "";
      if (subA !== subB) return subA.localeCompare(subB);
      return (a.id || "").localeCompare(b.id || "");
    });
  }

  async function generateAndPrintSheet() {
    const modal = document.getElementById("modal-print-config");
    if (modal) modal.classList.remove("active");
    const pType = document.getElementById("print-type")?.value || "COMPENDIUM";
    const sub = document.getElementById("print-subject")?.value || "ALL";
    const chap = document.getElementById("print-chapter")?.value || "ALL";
    const ansMode = document.getElementById("print-include-ans")?.value || "APPENDIX";

    const root = document.getElementById("print-sheet-root");
    if (!root) return;
    root.innerHTML = "";

    const timestampIST = formatISTDate(Date.now());

    if (pType === "COMPENDIUM") {
      const dossiers = await ConceptService.getAll();
      let pool = sub === "ALL" ? dossiers : dossiers.filter(d => d.subject === sub);
      if (chap !== "ALL") pool = pool.filter(d => d.chapter === chap);

      pool.sort((a, b) => {
        const sA = a.subject || "";
        const sB = b.subject || "";
        if (sA !== sB) return sA.localeCompare(sB);
        return (a.chapter || "").localeCompare(b.chapter || "");
      });

      const tocMap = {};
      pool.forEach(item => {
        const s = item.subject || "QA";
        const c = item.chapter || "GENERAL";
        if (!tocMap[s]) tocMap[s] = {};
        if (!tocMap[s][c]) tocMap[s][c] = [];
        tocMap[s][c].push(item.title);
      });

      let tocHtml = `<div class="print-toc-container"><div class="print-toc-heading">Table of Contents</div>`;
      let secCounter = 1;
      Object.keys(tocMap).forEach(s => {
        const subName = TAXONOMY[s] ? TAXONOMY[s].name : s;
        tocHtml += `<div style="font-weight:bold; margin-top:8px; font-size:11pt;">${secCounter++}. ${subName} (${s})</div>`;
        Object.keys(tocMap[s]).forEach(c => {
          tocHtml += `<div style="padding-left:14px; font-weight:600; color:#333; margin-top:3px;">â€¢ ${c}</div>`;
          tocMap[s][c].forEach(title => {
            tocHtml += `<div class="print-toc-item" style="padding-left:28px;"><span>${title}</span><span style="color:#777;">Engineering Sheet</span></div>`;
          });
        });
      });
      tocHtml += `</div>`;

      let content = `
        <div class="print-book-cover">
          <div class="print-book-title">SSC CGL 2026 Master Preparation Compendium</div>
          <div class="print-book-meta">
            Candidate: Ankit Kumar &nbsp;|&nbsp; Generated: ${timestampIST} &nbsp;|&nbsp; Scope: ${sub} (${chap}) &nbsp;|&nbsp; Total Sheets: ${pool.length}
          </div>
          ${tocHtml}
        </div>
      `;

      let curSub = "";
      let curChap = "";

      pool.forEach(sheet => {
        if (sheet.subject !== curSub) {
          curSub = sheet.subject;
          content += `
            <div class="print-subject-divider">
              <div class="print-subject-title">${TAXONOMY[curSub] ? TAXONOMY[curSub].name : curSub} (${curSub})</div>
            </div>
          `;
        }
        if (sheet.chapter !== curChap) {
          curChap = sheet.chapter;
          content += `<div class="print-chapter-title">Chapter: ${curChap}</div>`;
        }

        let img = sheet.imageUrl ? `<div style="text-align:center; margin:8px 0;"><img src="${sheet.imageUrl}" style="max-height:160px; max-width:85%;"></div>` : '';

        content += `
          <div class="print-comp-entry">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
              <b style="font-size:12pt;">${sheet.title}</b>
              <span style="font-size:9pt; color:#666;">${sheet.chapter}</span>
            </div>
            ${sheet.subtitle ? `<div style="font-size:9.5pt; font-style:italic; color:#444; margin-bottom:6px;">${sheet.subtitle}</div>` : ''}
            <div>${formatRichText(sheet.content)}</div>
            ${img}
          </div>
        `;
      });

      root.innerHTML = content;
    } else if (pType === "QUESTIONS") {
      const allQs = await getAllRecords("store_questions");
      let pool = sub === "ALL" ? allQs : allQs.filter(q => q.subject === sub);
      if (chap !== "ALL") pool = pool.filter(q => q.chapter === chap);

      pool = sortQuestionsHierarchical(pool);

      let content = `
        <div class="print-book-cover">
          <div class="print-book-title">SSC CGL Practice Exam Paper</div>
          <div class="print-book-meta">
            Target: 2026 Tier 1 / Tier 2 &nbsp;|&nbsp; Generated: ${timestampIST} &nbsp;|&nbsp; Total Questions: ${pool.length}
          </div>
        </div>
        <div class="print-dual-col">
      `;

      let curSub = "";
      pool.forEach((q, idx) => {
        if (q.subject !== curSub) {
          curSub = q.subject;
          content += `<div style="column-span:all; font-weight:800; font-size:13pt; border-bottom:1.5pt solid #000; margin:12px 0 8px 0; text-transform:uppercase;">${TAXONOMY[curSub] ? TAXONOMY[curSub].name : curSub}</div>`;
        }

        let passage = q.passageText ? `<div class="q-passage-container" style="font-size:8.5pt; padding:6px; margin-bottom:6px;"><b>Passage:</b> ${formatRichText(q.passageText)}</div>` : '';
        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';
        content += `
          <div class="print-question">
            ${passage}
            <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
            <div style="margin-top:4px;">
              ${q.options.map((opt, i) => `(${i + 1}) ${formatRichText(opt)} &nbsp; `).join('')}
            </div>
            ${ansMode === "INLINE" ? `<div style="font-size:9pt; margin-top:6px; color:#222; background:#f4f4f4; padding:4px;"><b>Correct: Option ${q.correctIndex + 1}</b><br><i>${formatRichText(q.explanation || '')}</i></div>` : ''}
          </div>
        `;
      });

      content += `</div>`;

      if (ansMode === "APPENDIX") {
        content += `
          <div class="print-appendix">
            <h2 style="font-size:16pt; font-weight:900; margin-bottom:12px; text-transform:uppercase;">Appendix: Answer Keys & Step-by-Step Solutions</h2>
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; margin-bottom:18px; font-size:10pt;">
              ${pool.map((q, idx) => `<div><b>Q${idx + 1}:</b> Opt ${q.correctIndex + 1}</div>`).join('')}
            </div>
            <hr style="margin-bottom:14px;">
            ${pool.map((q, idx) => `
              <div style="font-size:9.5pt; margin-bottom:10px; page-break-inside:avoid; break-inside:avoid;">
                <b>Q${idx + 1} Explanation:</b><br>${formatRichText(q.explanation || 'No method registered.')}
              </div>
            `).join('')}
          </div>
        `;
      }

      root.innerHTML = content;
    } else if (pType === "PAST_MOCK") {
      const mockId = document.getElementById("print-mock-select")?.value;
      const attempts = await getAllRecords("store_attempts");
      const targetMock = attempts.find(a => a.sessionId === mockId);
      if (!targetMock) return;

      let content = `
        <div class="print-book-cover">
          <div class="print-book-title">${targetMock.title} (Performance Audit)</div>
          <div class="print-book-meta">
            Attempt Score: ${(targetMock.finalScore || 0).toFixed(2)} pts &nbsp;|&nbsp; Correct: ${targetMock.correctCount} &nbsp;|&nbsp; Incorrect: ${targetMock.incorrectCount} &nbsp;|&nbsp; IST Date: ${targetMock.timeIST || formatISTDate(targetMock.timestamp)}
          </div>
        </div>
        <div class="print-dual-col">
      `;

      targetMock.questions.forEach((q, idx) => {
        const resp = targetMock.userResponses && targetMock.userResponses[q.id] ? targetMock.userResponses[q.id] : {};
        const isCor = resp.selectedOption === q.correctIndex;
        let passage = q.passageText ? `<div class="q-passage-container" style="font-size:8.5pt; padding:6px; margin-bottom:6px;"><b>Passage:</b> ${formatRichText(q.passageText)}</div>` : '';
        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';

        content += `
          <div class="print-question">
            ${passage}
            <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
            <div style="margin-top:4px;">
              ${q.options.map((opt, i) => `(${i + 1}) ${formatRichText(opt)} &nbsp; `).join('')}
            </div>
            <div style="font-size:9pt; margin-top:6px; background:#f4f4f4; padding:6px; border-left:3px solid ${isCor ? '#238636' : '#da3633'};">
              <b>Your Pick:</b> Option ${resp.selectedOption !== null && resp.selectedOption !== undefined ? resp.selectedOption + 1 : 'None'} (${isCor ? 'âœ“ Correct' : 'âœ— Incorrect'}) | <b>Time:</b> ${resp.timeSpentSec || 0}s<br>
              <b>Key:</b> Option ${q.correctIndex + 1} | <i>${formatRichText(q.explanation || '')}</i>
            </div>
          </div>
        `;
      });

      content += `</div>`;
      root.innerHTML = content;
    } else if (pType === "FLASHCARDS") {
      const flashcards = await getAllRecords("store_flashcards");
      let pool = sub === "ALL" ? flashcards : flashcards.filter(f => f.subject === sub);

      let content = `
        <div class="print-book-cover">
          <div class="print-book-title">SSC CGL Flashcard Vault Compendium</div>
          <div class="print-book-meta">
            Scope: ${sub} &nbsp;|&nbsp; Generated: ${timestampIST} &nbsp;|&nbsp; Total Cards: ${pool.length}
          </div>
        </div>
        <div class="print-dual-col">
      `;

      pool.forEach((f, idx) => {
        let fImg = f.frontImageUrl ? `<br><img src="${f.frontImageUrl}" style="max-height:100px; max-width:100%;">` : '';
        let bImg = f.backImageUrl ? `<br><img src="${f.backImageUrl}" style="max-height:100px; max-width:100%;">` : '';

        content += `
          <div class="print-question">
            <strong>Card ${idx + 1}. [${f.subject} â€¢ ${f.chapter}]</strong> (${f.cardType || 'BASIC'})<br>
            <b>Prompt:</b> ${formatRichText(f.front)}${fImg}<br>
            <div style="font-size:9.5pt; margin-top:4px;"><b>Answer:</b> ${formatRichText(f.back)}${bImg}</div>
            ${f.extra ? `<div style="font-size:9pt; color:#444; margin-top:2px;"><b>Extra:</b> ${formatRichText(f.extra)}</div>` : ''}
          </div>
        `;
      });

      content += `</div>`;
      root.innerHTML = content;
    }

    setTimeout(() => {
      window.print();
    }, 250);
  }

  function exportCurrentReviewMockJson() {
    if (!activeReviewAttempt) {
      alert("No active mock review loaded.");
      return;
    }
    exportSpecificMockJson(activeReviewAttempt);
  }

  async function exportMockByIdJson(sessionId) {
    const attempts = await getAllRecords("store_attempts");
    const target = attempts.find(a => a.sessionId === sessionId);
    if (!target) {
      alert(`Mock session ${sessionId} not found.`);
      return;
    }
    exportSpecificMockJson(target);
  }

  async function exportSpecificMockJson(mockObj) {
    const payload = {
      cgl_os_mock_export: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        schemaVersion: DB_VERSION,
        exportedAtEpoch: Date.now(),
        exportedAtIST: formatISTDate(Date.now()),
        sessionId: mockObj.sessionId,
        title: mockObj.title,
        attemptNumber: mockObj.attemptNumber || 1,
        finalScore: mockObj.finalScore,
        accuracyPercent: mockObj.correctCount + mockObj.incorrectCount > 0 
          ? Math.round((mockObj.correctCount / (mockObj.correctCount + mockObj.incorrectCount)) * 100) 
          : 0
      },
      attemptData: mockObj
    };

    await downloadFileResilient(`cgl_mock_${mockObj.sessionId}_${Date.now()}.json`, "application/json", JSON.stringify(payload, null, 2));
  }

  async function exportKnowledgeBankJson() {
    const concepts = await ConceptService.getAll();
    const now = Date.now();
    const payload = {
      cgl_os_knowledge_export: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        schemaVersion: DB_VERSION,
        exportedAtEpoch: now,
        exportedAtIST: formatISTDate(now),
        totalSheets: concepts.length
      },
      concepts: concepts
    };

    await downloadFileResilient(`cgl_knowledge_compendium_${now}.json`, "application/json", JSON.stringify(payload, null, 2));
  }

  async function exportFlashcardVaultJson() {
    const cards = await getAllRecords("store_flashcards");
    const now = Date.now();
    const payload = {
      cgl_os_vault_export: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        schemaVersion: DB_VERSION,
        exportedAtEpoch: now,
        exportedAtIST: formatISTDate(now),
        totalCards: cards.length
      },
      cards: cards
    };

    await downloadFileResilient(`cgl_flashcard_vault_${now}.json`, "application/json", JSON.stringify(payload, null, 2));
  }

  async function exportCurrentSelectedStoreJson() {
    const storeName = document.getElementById("db-store-select")?.value;
    if (!storeName) return;
    const records = await getAllRecords(storeName);
    const now = Date.now();

    const payload = {
      cgl_os_table_dump: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        storeName: storeName,
        schemaVersion: DB_VERSION,
        exportedAtEpoch: now,
        exportedAtIST: formatISTDate(now),
        recordCount: records.length
      },
      records: records
    };

    await downloadFileResilient(`cgl_dump_${storeName}_${now}.json`, "application/json", JSON.stringify(payload, null, 2));
  }

  async function exportScopedForensicDossier() {
    const sub = document.getElementById("scoped-export-subject")?.value || "ALL";
    const timeframe = document.getElementById("scoped-export-timeframe")?.value || "15D";
    const filter = document.getElementById("scoped-export-filter")?.value || "ALL";
    const encoding = document.getElementById("scoped-export-encoding")?.value || "HYBRID_CSV";
    await exportDossierInternal(sub, timeframe, filter, encoding, false);
  }

  async function exportGlobalMasterDossier() {
    await exportDossierInternal("ALL", "ALL", "ALL", "HYBRID_CSV", true);
  }

  async function exportDossierInternal(sub, timeframe, filter, encoding, isGlobalMaster = false) {
    const allAttempts = await getAllRecords("store_attempts");
    const allFlashcards = await getAllRecords("store_flashcards");
    const consultations = await getAllRecords("store_ai_consultations");

    const now = Date.now();
    let cutoff = 0;
    if (timeframe === "7D") cutoff = now - (7 * 24 * 60 * 60 * 1000);
    else if (timeframe === "15D") cutoff = now - (15 * 24 * 60 * 60 * 1000);
    else if (timeframe === "30D") cutoff = now - (30 * 24 * 60 * 60 * 1000);

    const filteredAttempts = allAttempts.filter(a => a.completed && a.timestamp >= cutoff);
    const exposureMap = {};

    allAttempts.filter(a => a.completed).sort((a, b) => a.timestamp - b.timestamp).forEach(att => {
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          if (sub === "ALL" || q.subject === sub) {
            const resp = att.userResponses[q.id];
            if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
              if (!exposureMap[q.id]) {
                exposureMap[q.id] = {
                  totalExposures: 0,
                  firstSeenIST: att.timeIST || formatISTDate(att.timestamp),
                  lastSeenIST: att.timeIST || formatISTDate(att.timestamp),
                  spacingHistory: []
                };
              }
              const hist = exposureMap[q.id];
              const priorEpoch = hist.spacingHistory.length > 0 ? hist.spacingHistory[hist.spacingHistory.length - 1].epochMs : 0;
              hist.totalExposures++;
              hist.lastSeenIST = att.timeIST || formatISTDate(att.timestamp);
              hist.spacingHistory.push({
                attemptNum: hist.totalExposures,
                epochMs: att.timestamp,
                dateIST: att.timeIST || formatISTDate(att.timestamp),
                timeSpentSec: resp.timeSpentSec || 0,
                outcome: resp.selectedOption === q.correctIndex ? 1 : 0,
                gapDays: calcGapDays(att.timestamp, priorEpoch)
              });
            }
          }
        });
      }
    });

    const telemetryRows = [];
    const decisionTrails = {};

    filteredAttempts.forEach(att => {
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          if (sub === "ALL" || q.subject === sub) {
            const resp = att.userResponses[q.id];
            if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
              const isCor = resp.selectedOption === q.correctIndex ? 1 : 0;
              const isTrap = (resp.timeSpentSec > 90 && isCor === 0) || (resp.isPanicSlip) || (resp.switches > 0 && isCor === 0);

              if (filter === "ALL" || (filter === "TRAPS_ONLY" && isTrap) || (filter === "PANIC_ONLY" && resp.isPanicSlip)) {
                telemetryRows.push({
                  mockId: att.sessionId,
                  mockIST: att.timeIST || formatISTDate(att.timestamp),
                  slot: att.diurnalSlot || getDiurnalSlot(att.timestamp),
                  qId: q.id,
                  subject: q.subject,
                  chapter: q.chapter,
                  sel: resp.selectedOption,
                  cor: q.correctIndex,
                  t: resp.timeSpentSec || 0,
                  sw: resp.switches || 0,
                  panic: resp.isPanicSlip ? 1 : 0,
                  tag: resp.errorTag || "UNCLASSIFIED"
                });

                if (resp.decisionTrail && resp.decisionTrail.length > 0) {
                  decisionTrails[`${att.sessionId}_${q.id}`] = resp.decisionTrail;
                }
              }
            }
          }
        });
      }
    });

    const scopedFlashcards = allFlashcards.filter(f => sub === "ALL" || f.subject === sub);
    let telemetryPayload;

    if (encoding === "HYBRID_CSV") {
      let csv = "mockId,mockIST,slot,qId,subject,chapter,sel,cor,t,sw,panic,tag\n";
      telemetryRows.forEach(r => {
        csv += `${r.mockId},${r.mockIST},${r.slot},${r.qId},${r.subject},${r.chapter},${r.sel},${r.cor},${r.t},${r.sw},${r.panic},${r.tag}\n`;
      });
      telemetryPayload = csv;
    } else {
      telemetryPayload = telemetryRows;
    }

    const dossierEnvelope = {
      __os_manifest: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        version: DB_VERSION,
        exportedAtEpoch: now,
        exportedAtIST: formatISTDate(now),
        diurnalSlot: getDiurnalSlot(now),
        exportScope: isGlobalMaster ? "GLOBAL_360_MASTER_DOSSIER" : `${sub}_${timeframe}_${filter}`,
        encoding: encoding
      },
      cumulativeClinicalNarrative: consultations.length > 0 ? consultations[consultations.length - 1].cumulativeNarrative || "Baseline initialized." : "No prior consultations logged.",
      recentConsultationLogs: consultations.slice(-5),
      candidateProfile: {
        target: "SSC CGL 2026 Tier 1 & Tier 2 Master Preparation",
        scopedAttemptsEvaluated: filteredAttempts.length,
        scopedTelemetryCount: telemetryRows.length,
        vaultCardCount: scopedFlashcards.length
      },
      questionExposuresAndSpacing: exposureMap,
      telemetryData: telemetryPayload,
      decisionTrails: decisionTrails
    };

    const filename = isGlobalMaster 
      ? `cgl_master_forensic_dossier_360_${now}.json`
      : `cgl_forensic_dossier_${sub}_${timeframe}_${now}.json`;

    await downloadFileResilient(filename, "application/json", JSON.stringify(dossierEnvelope, null, 2));
  }

  async function exportUnifiedAiHandoffPackage() {
    const now = Date.now();
    const allAttempts = await getAllRecords("store_attempts");
    const allQuestions = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
    const allFlashcards = await getAllRecords("store_flashcards");
    const consultations = await getAllRecords("store_ai_consultations");
    const completedAttempts = allAttempts.filter(a => a.completed);

    const masterPackage = {
      cgl_os_master_handoff: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        schemaVersion: DB_VERSION,
        generatedAtEpoch: now,
        generatedAtIST: formatISTDate(now),
        candidate: "Ankit Kumar",
        targetExam: "SSC CGL 2026 Tier 1 & Tier 2 Master Preparation"
      },
      runtimeManifest: {
        masterQuestionCount: allQuestions.length,
        completedMocksCount: completedAttempts.length,
        cardVaultCount: allFlashcards.length,
        livingSheetsCount: allConcepts.length,
        consultationsCount: consultations.length,
        taxonomy: TAXONOMY
      },
      knowledgeCompendium: allConcepts,
      masterQuestionBank: sortQuestionsHierarchical(allQuestions),
      flashcardVault: allFlashcards,
      recentConsultations: consultations.slice(-10)
    };

    await downloadFileResilient(`cgl_ai_master_handoff_package_${now}.json`, "application/json", JSON.stringify(masterPackage, null, 2));
  }

  async function refreshDbInspector() {
    const storeSelect = document.getElementById("db-store-select");
    if (!storeSelect) return;
    const storeName = storeSelect.value;
    const records = await getAllRecords(storeName);
    const list = document.getElementById("db-inspector-list");
    if (!list) return;
    list.innerHTML = "";

    records.forEach(rec => {
      const key = rec.id || rec.sessionId || rec.questionId || rec.key;
      const row = document.createElement("div");
      row.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border-color);";
      row.innerHTML = `
        <span style="font-family:var(--font-mono); font-size:11.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:70%;">${key}</span>
        <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.editDbRecordModal('${storeName}', '${key}')">Inspect</button>
      `;
      list.appendChild(row);
    });
  }

  let activeInspectedJsonString = "";

  async function editDbRecordModal(sName, key) {
    const rec = await getRecord(sName, key);
    if (!rec) return;

    if (sName === "store_questions") {
      openEditQuestionModal(rec);
    } else if (sName === "store_concepts") {
      openCompendiumToSheet(rec.id, rec.subject, rec.chapter);
    } else if (sName === "store_flashcards") {
      openFlashcardEditorModal(false, rec.id);
    } else {
      activeInspectedJsonString = JSON.stringify(rec, null, 2);
      safeSetText("db-inspect-modal-title", `${sName} Record`);
      safeSetText("db-inspect-modal-key", `KEY: ${key}`);
      safeSetText("db-inspect-code-content", activeInspectedJsonString);

      pushNavLayer("modal-db-inspector-viewer", () => {
        const m = document.getElementById("modal-db-inspector-viewer");
        if (m) m.classList.remove("active");
      });
      const m = document.getElementById("modal-db-inspector-viewer");
      if (m) m.classList.add("active");
    }
  }

  function copyInspectedJsonToClipboard() {
    if (!activeInspectedJsonString) return;
    navigator.clipboard.writeText(activeInspectedJsonString);
    alert("Record JSON copied to clipboard!");
  }

  async function wipeTestAttempts() {
    if (confirm("Permanently clear mock test history? (Question bank and Living Sheets remain 100% intact)")) {
      await clearStore("store_attempts");
      alert("Test history cleared.");
      await renderDashboard();
      refreshDbInspector();
    }
  }

  async function wipeFlashcardStore() {
    if (confirm("Permanently clear all cards from the Vault?")) {
      await clearStore("store_flashcards");
      alert("Card vault wiped.");
      renderVault();
    }
  }

  async function factoryResetAll() {
    if (confirm("WARNING: Complete factory reset will wipe user stores and restore clean defaults! Export Full Backup first!")) {
      const storeKeys = [
        "store_questions", "store_attempts", "store_flashcards", 
        "store_concepts", "store_notes", "store_saved_mocks", 
        "store_ai_consultations", "store_active_session", "store_config"
      ];
      for (const sName of storeKeys) {
        await clearStore(sName);
      }
      await seedData();
      alert("Factory reset complete.");
      SearchService.invalidate();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      refreshDbInspector();
    }
  }

  function openAiExportModal() {
    if (!activeReviewAttempt) return;
    pushHistoryState("modal-ai-export");
    const m = document.getElementById("modal-ai-export");
    if (m) m.classList.add("active");
    updateAiExportPreview();
  }

  async function updateAiExportPreview() {
    const mode = document.getElementById("ai-export-mode")?.value || "LEAN_GEM";
    const att = activeReviewAttempt;
    if (!att) return;
    let payload = "";

    if (mode === "LEAN_GEM") {
      payload = JSON.stringify({
        action: "FEEDBACK_AUDIT",
        mockTitle: att.title,
        attemptNumber: att.attemptNumber || 1,
        timestampIST: att.timeIST,
        diurnalSlot: att.diurnalSlot,
        score: att.finalScore,
        penalty: att.penaltyDrag,
        traps: att.q4Traps,
        telemetry: att.questions.map(q => {
          const r = att.userResponses && att.userResponses[q.id] ? att.userResponses[q.id] : {};
          return {
            id: q.id,
            parentPassageId: q.parentPassageId || null,
            sel: r.selectedOption !== undefined ? r.selectedOption : null,
            cor: q.correctIndex,
            t: r.timeSpentSec || 0,
            trail: (r.decisionTrail || []).map(d => d.opt)
          };
        })
      }, null, 2);
    } else if (mode === "DEEP_AUDIT") {
      payload = JSON.stringify({
        meta: { 
          title: att.title, 
          attemptNumber: att.attemptNumber || 1,
          timestampIST: att.timeIST, 
          diurnalSlot: att.diurnalSlot, 
          finalScore: att.finalScore 
        },
        questions: att.questions.map(q => {
          const r = att.userResponses && att.userResponses[q.id] ? att.userResponses[q.id] : {};
          return {
            id: q.id,
            parentPassageId: q.parentPassageId || null,
            passageText: q.passageText || "",
            chapter: q.chapter,
            conceptId: q.conceptId || "",
            conceptIds: q.conceptIds || (q.conceptId ? [q.conceptId] : []),
            text: q.questionText,
            options: q.options,
            userOption: r.selectedOption !== undefined ? r.selectedOption : null,
            correctIndex: q.correctIndex,
            timeSpentSec: r.timeSpentSec || 0,
            decisionTrail: r.decisionTrail || [],
            explanation: q.explanation
          };
        })
      }, null, 2);
    } else if (mode === "LONGITUDINAL") {
      const allAtt = await getAllRecords("store_attempts");
      const flashcards = await getAllRecords("store_flashcards");
      payload = `# SSC CGL Strategic Telemetry Audit\n` +
        `â€¢ Generated at: ${formatISTDate(Date.now())}\n` +
        `â€¢ Completed Standard Mocks: ${allAtt.length}\n` +
        `â€¢ Vault Flashcards Registered: ${flashcards.length}\n`;
    }

    safeSetValue("ai-export-preview", payload);
  }

  function copyAiExportToClipboard() {
    const text = document.getElementById("ai-export-preview")?.value || "";
    navigator.clipboard.writeText(text);
    alert("Payload copied! Paste into chat with AI coach to diagnose vulnerabilities.");
    const m = document.getElementById("modal-ai-export");
    if (m) m.classList.remove("active");
  }

  function openMasterLedgerExportModal() {
    pushHistoryState("modal-ledger-export");
    const m = document.getElementById("modal-ledger-export");
    if (m) m.classList.add("active");
  }

  async function downloadLedgerJson() {
    const includeImages = document.getElementById("ledger-include-images")?.checked ?? false;
    const allQs = await getAllRecords("store_questions");
    const sorted = sortQuestionsHierarchical(allQs);

    const sanitized = sorted.map(q => {
      if (!includeImages) {
        const copy = { ...q };
        if (copy.imageUrl && copy.imageUrl.startsWith("data:image")) {
          copy.imageUrl = "[BASE64_IMAGE_OMITTED_FOR_LIGHTWEIGHT_LEDGER]";
        }
        return copy;
      }
      return q;
    });

    await downloadFileResilient(`cgl_master_bank_ledger_${Date.now()}.json`, "application/json", JSON.stringify(sanitized, null, 2));
    const m = document.getElementById("modal-ledger-export");
    if (m) m.classList.remove("active");
  }

  async function downloadLedgerMarkdown() {
    const allQs = await getAllRecords("store_questions");
    const sorted = sortQuestionsHierarchical(allQs);

    let txt = `# SSC CGL MASTER QUESTION BANK REFERENCE LEDGER\nGenerated on: ${formatISTDate(Date.now())}\nTotal Questions: ${sorted.length}\n\n`;
    let curSubject = "";
    let curChapter = "";

    sorted.forEach((q, idx) => {
      if (q.subject !== curSubject) {
        curSubject = q.subject;
        txt += `\n=======================================================\n`;
        txt += `=== SUBJECT: ${TAXONOMY[curSubject] ? TAXONOMY[curSubject].name : curSubject} (${curSubject}) ===\n`;
        txt += `=======================================================\n\n`;
      }
      if (q.chapter !== curChapter) {
        curChapter = q.chapter;
        txt += `--- CHAPTER: ${curChapter} ---\n\n`;
      }

      const pInfo = q.parentPassageId ? ` | PASSAGE_SET: ${q.parentPassageId} (${q.setOrder}/${q.setTotal})` : '';
      txt += `[RECORD ${idx + 1}] ID: ${q.id} | TOPIC: ${q.subtopic || 'General'} | METHOD: ${q.method || 'General'}${pInfo} | CONCEPTS: ${(q.conceptIds || [q.conceptId]).filter(Boolean).join(', ') || 'None'}\n`;
      if (q.passageText) txt += `PASSAGE: ${q.passageText}\n`;
      txt += `QUESTION: ${q.questionText}\n`;
      q.options.forEach((opt, oIdx) => {
        txt += `  (${oIdx + 1}) ${opt}\n`;
      });
      txt += `CORRECT OPTION: ${q.correctIndex + 1}\n`;
      txt += `EXPLANATION: ${q.explanation || 'None'}\n\n`;
    });

    await downloadFileResilient(`cgl_master_bank_gem_pack_${Date.now()}.txt`, "text/plain", txt);
    const m = document.getElementById("modal-ledger-export");
    if (m) m.classList.remove("active");
  }

  async function exportCleanMarkdownFlashcards() {
    const flashcards = await getAllRecords("store_flashcards");
    let md = `# SSC CGL Flashcard Vault Export\nGenerated on: ${formatISTDate(Date.now())}\nTotal Cards: ${flashcards.length}\n\n`;

    flashcards.forEach(f => {
      md += `### [${f.subject} â€¢ ${f.chapter}] ${f.id} (${f.cardType || 'BASIC'})\n`;
      md += `**Prompt (Front):**\n${f.front}\n\n`;
      md += `**Answer (Back):**\n${f.back}\n\n`;
      if (f.extra) md += `**Extra Notes:**\n${f.extra}\n\n`;
      md += `---\n\n`;
    });

    await downloadFileResilient(`CGL_Flashcards_${Date.now()}.md`, "text/markdown", md);
  }

  async function copyLiveSystemManifestToClipboard() {
    const questions = await getAllRecords("store_questions");
    const attempts = await getAllRecords("store_attempts");
    const flashcards = await getAllRecords("store_flashcards");
    const concepts = await ConceptService.getAll();
    const consultations = await getAllRecords("store_ai_consultations");

    const manifest = `# SSC CGL Intelligence OS - Live Runtime Introspection Manifest
Generated at: ${formatISTDate(Date.now())}
Target Candidate: Ankit Kumar (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)

## 1. Live Telemetry Metrics
- Master Question Pool: ${questions.length}
- Completed Mocks: ${attempts.filter(a => a.completed).length}
- Card Vault Inventory: ${flashcards.length}
- Living Knowledge Sheets: ${concepts.length}
- Clinical Consultations Logged: ${consultations.length}

## 2. Active System Taxonomy & Chapters
${JSON.stringify(TAXONOMY, null, 2)}

## 3. Supported JSON Action Contracts
- CREATE_MOCK (Supports ephemeral: true, explicit IDs, or inline questions)
- SEARCH_QUESTIONS
- SEARCH_CONCEPTS
- CREATE_QUESTION
- UPDATE_QUESTION
- DELETE_QUESTION
- CREATE_CONCEPT
- UPDATE_CONCEPT
- DELETE_CONCEPT
- SAVE_AI_INSIGHT (Persistent AI finding memory)
- SAVE_AI_PLAN (Multi-step remediation plan)
- GET_AI_CONTEXT (Bidirectional preparation context)
- INGEST_AND_ASSEMBLE_COMPLETE_MOCK (Dynamic subject scoping)
- CREATE_AND_SAVE_FIXED_MOCK
- EXECUTE_AI_CONSULTATION_BUNDLE
- INGEST_AND_LAUNCH_MOCK (Supports ephemeral testing)
- BATCH_INGEST_FLASHCARDS
- BATCH_INGEST_COMPENDIUM
- BATCH_INGEST_QUESTIONS
- REQUEST_HISTORICAL_DUMP
- SAVE_MOCK_PRESET
- MODIFY_TAXONOMY
- RAW_DB_OPERATION
`;
    navigator.clipboard.writeText(manifest);
    alert("Live AI Introspection Manifest copied to clipboard!");
  }

  /* ==========================================================================
   * SECTION 30: GLOBAL SEARCH, GESTURES, BOOTSTRAP & API EXPORT
   * ========================================================================== */
  function openGlobalSearchModal() {
    pushHistoryState("modal-global-search");
    const m = document.getElementById("modal-global-search");
    if (m) m.classList.add("active");
    safeSetValue("global-search-input", "");
    safeSetHtml("global-search-results-list", `<p style="color:var(--text-muted); text-align:center; padding:30px;">Type keywords above to query the complete database.</p>`);
    setTimeout(() => {
      const inp = document.getElementById("global-search-input");
      if (inp) inp.focus();
    }, 150);
  }

  async function handleGlobalSearchInput(val) {
    const list = document.getElementById("global-search-results-list");
    if (!list) return;
    const term = String(val || "").trim();
    if (!term) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:30px;">Type keywords above to query the complete database.</p>`;
      return;
    }

    const subFilter = document.getElementById("global-search-filter-sub")?.value || "ALL";
    const res = await SearchService.searchAll(term, { subject: subFilter }, 40);

    list.innerHTML = "";
    if (res.totalQuestions === 0 && res.totalConcepts === 0) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:30px;">Zero matching items found across questions or sheets.</p>`;
      return;
    }

    if (res.questions.length > 0) {
      const qHead = document.createElement("div");
      qHead.style.cssText = "font-size:11px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase; margin:8px 0 4px 0;";
      qHead.innerText = `// Question Matches (${res.questions.length})`;
      list.appendChild(qHead);

      res.questions.forEach(q => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "10px";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span class="badge" style="background:#1f6feb;">${q.subject} â€¢ ${q.chapter}</span>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.launchSingleQuestionPractice('${q.id}')">âš¡ Solve</button>
          </div>
          <div style="font-size:13px; line-height:1.5; color:#fff;">${formatRichText(q.questionText)}</div>
        `;
        list.appendChild(div);
      });
    }

    if (res.concepts.length > 0) {
      const cHead = document.createElement("div");
      cHead.style.cssText = "font-size:11px; font-weight:800; color:var(--accent-purple-light); text-transform:uppercase; margin:14px 0 4px 0;";
      cHead.innerText = `// Knowledge Sheet Matches (${res.concepts.length})`;
      list.appendChild(cHead);

      res.concepts.forEach(c => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "10px";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <b style="font-size:13.5px; color:#fff;">ðŸ“– ${c.title}</b>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.openCompendiumToSheet('${c.id}', '${c.subject}', '${c.chapter}')">Read Sheet</button>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">${c.subtitle || ''}</div>
        `;
        list.appendChild(div);
      });
    }
  }

  function switchTab(tId, btn) {
    document.querySelectorAll(".view-container").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));

    const targetEl = document.getElementById(tId);
    if (targetEl) targetEl.classList.add("active");

    const targetNavBtn = btn || document.getElementById(`nav-btn-${tId}`);
    if (targetNavBtn) targetNavBtn.classList.add("active");

    if (tId === "tab-dashboard") renderDashboard();
    if (tId === "tab-dojo") {
      updateDojoChapters();
      renderPracticeQuestionsTable();
    }
    if (tId === "tab-console") refreshDbInspector();
    if (tId === "tab-vault") renderVault();
  }

  function initGestureControllers() {
    // 1. Hardware Back-Button & Modal History Pop
    window.addEventListener("popstate", () => {
      if (navStack.length > 0) {
        popNavLayer();
      } else {
        const arenaView = document.getElementById("exam-arena");
        if (arenaView && arenaView.style.display === "flex") {
          if (activeExam && activeExam.isReviewMode) exitReviewArena();
          else document.getElementById("btn-arena-pause")?.click();
          return;
        }

        const compView = document.getElementById("compendium-fullscreen-view");
        if (compView && compView.style.display === "flex") {
          closeCompendiumStudio();
          return;
        }

        const dojoView = document.getElementById("dojo-arena-view");
        if (dojoView && dojoView.style.display === "flex") {
          exitDojoArena();
        }
      }
    });

    // 2. Pure Horizontal Swipe in Mocks (#exam-arena)
    const arenaEl = document.getElementById("exam-arena");
    if (arenaEl) {
      let touchStartX = 0;
      let touchStartY = 0;

      arenaEl.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      arenaEl.addEventListener("touchend", (e) => {
        if (e.changedTouches.length === 1 && activeExam) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;

          // Pure horizontal swipe: horizontal displacement > 55px and 2x vertical movement
          if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > 2.0 * Math.abs(deltaY)) {
            if (deltaX < 0) {
              // Swipe Left -> Next Question
              document.getElementById("btn-q-save-next")?.click();
            } else {
              // Swipe Right -> Previous Question
              document.getElementById("btn-q-prev")?.click();
            }
          }
        }
      }, { passive: true });
    }

    // 3. Pure Horizontal Swipe for Switching Root Navigation Tabs
    const viewportRoot = document.getElementById("app-viewport-root");
    if (viewportRoot) {
      let rootStartX = 0;
      let rootStartY = 0;
      const tabs = ["tab-dashboard", "tab-dojo", "tab-console", "tab-vault"];

      viewportRoot.addEventListener("touchstart", (e) => {
        // Disallow tab swipes if a modal or fullscreen arena is open
        const isModalOpen = document.querySelector(".modal-overlay.active");
        const isArenaOpen = arenaEl && arenaEl.style.display === "flex";
        if (isModalOpen || isArenaOpen) return;

        // Disallow if touch starts inside horizontally scrollable containers
        const target = e.target;
        if (target && target.closest("#dash-blueprints-pills, .comp-tabs-bar, .vault-tag-scroll, .table-responsive, .matrix-chip-grid")) {
          return;
        }

        if (e.touches.length === 1) {
          rootStartX = e.touches[0].clientX;
          rootStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      viewportRoot.addEventListener("touchend", (e) => {
        const isModalOpen = document.querySelector(".modal-overlay.active");
        const isArenaOpen = arenaEl && arenaEl.style.display === "flex";
        if (isModalOpen || isArenaOpen) return;

        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - rootStartX;
          const deltaY = e.changedTouches[0].clientY - rootStartY;

          if (Math.abs(deltaX) > 65 && Math.abs(deltaX) > 2.0 * Math.abs(deltaY)) {
            const activeTabEl = document.querySelector(".view-container.active");
            if (!activeTabEl) return;
            const currentIdx = tabs.indexOf(activeTabEl.id);
            if (currentIdx === -1) return;

            if (deltaX < 0 && currentIdx < tabs.length - 1) {
              // Swipe Left -> Next Tab
              switchTab(tabs[currentIdx + 1]);
            } else if (deltaX > 0 && currentIdx > 0) {
              // Swipe Right -> Previous Tab
              switchTab(tabs[currentIdx - 1]);
            }
          }
        }
      }, { passive: true });
    }
  }


  async function initializeApplication() {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");

    try {
      await getDB();
      initUniversalEngagementTracker();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
      await renderVault();
      initGestureControllers();

      const savedSessionRec = await getRecord("store_active_session", "current_session");
      if (savedSessionRec && savedSessionRec.session && !savedSessionRec.session.completed) {
        activeExam = savedSessionRec.session;
        activeExam.isPaused = true;
        updateMiniPlayerDock();
      }
    } catch (e) {
      console.error("CGL_OS boot notice:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApplication);
  } else {
    initializeApplication();
  }

  // --- Complete Public API Export ---
  return {
    TaxonomyService,
    QuestionService,
    ConceptService,
    SearchService,
    MockService,
    PerformanceService,

    switchTab,
    pushNavLayer,
    popNavLayer,

    handlePracticeSearchInput,
    handlePracticeSubjectChange,
    setPracticeQuickFilter,
    togglePracticeQuestionSelection,
    selectAllVisiblePractice,
    renderPracticeQuestionsTable,
    togglePracticeStemExpansion,
    navPracticePage,
    launchPracticeSelectedSession,
    buildMockFromPracticeSelection,
    launchSingleQuestionPractice,
    launchSeeQuestions,

    openNewQuestionCreatorModal,
    handleNewQuestionImageUpload,
    submitNewQuestionCreator,
    syncNewQuestionChapterSelect,
    openEditQuestionModal,
    openEditCurrentDojoQuestion,
    handleQuestionImageUpload,
    saveQuestionEditor,
    duplicateCurrentEditingQuestion,
    duplicateCurrentEditingQuestionFromId,
    deleteCurrentEditingQuestion,

    setMockStrategy,
    updateBuilderChapters,
    handleBuilderChapterSelectChange,
    handleBuilderChapterChipToggle,
    toggleAllBuilderMatrixChips,
    updateBuilderPoolEstimate,
    previewMockSelection,
    openCustomMockModal,
    addCustomSectionRow,
    removeCustomSectionRow,
    updateCustomRowSubject,
    updateCustomRowChapter,
    updateCustomRowCount,
    updateCustomRowDuration,
    openSaveBlueprintModal,
    saveCurrentPresetAction,
    launchSavedPreset,
    deleteSavedPreset,
    launchConfiguredMock,

    requestEndSectionEarly,
    confirmEndSectionEarly,
    resumeFromMiniPlayer,
    reattemptMock,
    enterFullScreenReviewArena,
    exitReviewArena,
    toggleExamPalette,

    openCompendiumStudio,
    closeCompendiumStudio,
    openCompendiumToSheet,
    handleCompStudioSubjectChange,
    handleCompStudioChapterChange,
    renderCompStudioSheets,
    renderActiveCompSheet,
    navCompStudioSheet,
    autoSaveCompScratchpad,
    deleteCurrentCompendiumSheet,
    promptCreateNewChapter,
    insertDossierSnippet,
    launchCurrentSheetQuestionsDrill,
    openConceptEditorModal,
    handleConceptImageUpload,
    saveConceptCard,

    openOmniResearchForCurrentQuestion,
    openOmniResearchForDojoQuestion,
    triggerOmniResearchDrawer,
    jumpToConceptFromReview,
    jumpToConceptFromDojo,
    openOmniSearchModal,
    executeOmniSearch,
    openGlobalSearchModal,
    handleGlobalSearchInput,

    openSynapseGraphModal,
    renderSynapseExplorer,
    setSynapseLevel,
    launchDirectChapterDrill,
    launchDirectSheetDrill,

    updateDojoChapters,
    updateDojoMethods,
    launchFilteredDojo,
    exitDojoArena,
    navDojoArena,
    toggleDojoMethod,
    autoSaveDojoAnnotation,
    toggleDojoPalette,

    openMockReview,
    switchReviewAttempt,
    handleMistakeTagSelect,
    setMistakeTag,
    openTrapClinicModal,
    drillFilteredTrapQuestions,
    openSubjectDiagnosticModal,
    openHistoryArchiveModal,
    renderArchiveList,
    deleteAttemptSession,

    openTaxonomyManagerModal,
    renderTaxonomyManagerList,
    addNewSubjectAction,
    promptAddChapterToSubject,
    deleteChapterFromSubject,
    openChapterMergeModal,
    deleteSubjectAction,
    syncEditorChapterDropdown,
    syncFlashcardChapterDropdown,

    renderVault,
    renderVaultTagPills,
    handleVaultSearchInput,
    renderFlashcardList,
    toggleVaultCardAccordion,
    launchUntimedQuickCarousel,
    renderCurrentVaultCard,
    flipStudyFlashcard,
    navStudyCard,
    openAnkiExportModal,
    generateAndDownloadAnkiTsv,
    openFlashcardEditorModal,
    handleFlashcardFrontImageUpload,
    handleFlashcardBackImageUpload,
    saveFlashcardEditor,
    deleteCurrentEditingFlashcard,
    wipeFlashcardStore,

    openPrintConfigModal,
    populatePrintMockDropdown,
    handlePrintTypeChange,
    updatePrintChapters,
    generateAndPrintSheet,
    sortQuestionsHierarchical,

    executeConsoleCommand,
    loadSamplePayload,
    copyLiveSystemManifestToClipboard,
    openAiExportModal,
    updateAiExportPreview,
    copyAiExportToClipboard,
    openMasterLedgerExportModal,
    downloadLedgerJson,
    downloadLedgerMarkdown,
    exportCleanMarkdownFlashcards,
    openBackupRestoreModal,
    handleBackupFileSelect,
    executeHydrationRestore,
    exportFullBackup,
    exportCurrentReviewMockJson,
    exportMockByIdJson,
    exportKnowledgeBankJson,
    exportFlashcardVaultJson,
    exportCurrentSelectedStoreJson,
    exportScopedForensicDossier,
    exportGlobalMasterDossier,
    exportUnifiedAiHandoffPackage,
    copyDownloadFallbackToClipboard,
    refreshDbInspector,
    editDbRecordModal,
    copyInspectedJsonToClipboard,
    wipeTestAttempts,
    factoryResetAll,
    renderDashboard,
    launchContinueTrainingDrill,
    launchOnboardingDiagnosticMock
  };
})();

// Re-bind to global window anchor
window.CGL_OS = CGL_OS;
