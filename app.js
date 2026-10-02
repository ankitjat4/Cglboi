/**
 * ============================================================================
 * SSC CGL INTELLIGENCE OS — CORE ENGINE (ARCHITECTURE V5.1 HARDENED)
 * Master Application Controller — PART 1 OF 3
 * Architecture: Local-First IndexedDB Engine | Schema Version: 16
 * Candidate: Ankit Kumar (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)
 * 
 * Scope of Part 1:
 * - Global Namespace Anchoring & Defensive DOM Helpers (Crash Guards)
 * - Resilient 3-Tier Download Dispatcher (Web Share API, Data-URI & Modal Copy)
 * - Multi-Surface Active Study Telemetry Tracker (Idle Cutoff & Cross-View Logging)
 * - Atomic Passage-Set Grouping Data Model (RC, Cloze, Caselet Puzzles)
 * - Defensive Hierarchical Sorter (Protected against undefined chapters/subtopics)
 * - KaTeX Formula Isolator, Multi-Line Callout Markdown Parser & Image Compressors
 * - Hardened IndexedDB Harness with Non-Destructive Seed Logic
 * - Full System Backup, Restoration & Multi-Store Schema Normalizers
 * ============================================================================
 */

// Immediate Global Registration to prevent reference errors
window.CGL_OS = window.CGL_OS || {};

const CGL_OS = (() => {
  /* ==========================================================================
   * SECTION 1: DEFENSIVE DOM BINDING HELPERS (CRASH-PROOF GUARDS)
   * ========================================================================== */
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
    if (el) el.innerText = text;
  }

  function safeSetHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function safeSetValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function safeSetDisplay(id, displayStyle) {
    const el = document.getElementById(id);
    if (el) el.style.display = displayStyle;
  }

  /* ==========================================================================
   * SECTION 2: CONSTANTS, DB CONFIG & RUNTIME EXECUTION STATE
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

  // Full-Screen Living Compendium Studio State
  let activeCompSubject = "QA";
  let activeCompChapter = "QA_PERCENTAGE";
  let activeCompSheetIndex = 0;
  let currentCompSheets = [];
  let currentConceptImageBase64 = "";

  // Universal Flashcard Vault State
  let currentFcFrontImgBase64 = "";
  let currentFcBackImgBase64 = "";
  let activeVaultDeck = [];
  let activeVaultIndex = 0;
  let activeVaultFlipped = false;
  let vaultSearchQuery = "";
  let vaultActiveTag = "ALL";

  // Synapse Knowledge Explorer State
  let synapseCurrentLevel = "SUBJECTS";
  let synapseActiveSubject = null;
  let synapseActiveChapter = null;

  // Interactive Cognitive Trap Clinic & Disaster Recovery
  let activeClinicTrapType = "TIME_TRAP_Q4";
  let activeClinicQuestions = [];
  let pendingHydrationData = null;

  // Native Question GUI Creator State
  let currentQuestionImageBase64 = "";

  // Universal Fallback Export Buffer
  let activeFallbackPayloadString = "";
  let activeFallbackFileName = "";

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
   * SECTION 3: MULTI-SURFACE ACTIVE STUDY TIME TELEMETRY TRACKER
   * ========================================================================== */
  let activeStudySeconds = 0;
  let lastUserInteractionEpoch = Date.now();
  let studyTelemetryInterval = null;
  const IDLE_CUTOFF_MS = 60000; // 60 seconds threshold

  function trackUserActivity() {
    lastUserInteractionEpoch = Date.now();
  }

  ['touchstart', 'touchmove', 'click', 'keydown', 'scroll'].forEach(evt => {
    window.addEventListener(evt, trackUserActivity, { passive: true });
  });

  async function initStudyTelemetryTracker() {
    try {
      const rec = await getRecord("store_config", "study_telemetry_total_sec");
      if (rec && typeof rec.value === "number") {
        activeStudySeconds = rec.value;
      }
    } catch (e) {
      activeStudySeconds = 0;
    }

    if (studyTelemetryInterval) clearInterval(studyTelemetryInterval);
    studyTelemetryInterval = setInterval(async () => {
      const now = Date.now();
      // Track engagement only when active within cutoff
      if (now - lastUserInteractionEpoch < IDLE_CUTOFF_MS) {
        activeStudySeconds++;
        // Persist to store_config every 30 seconds
        if (activeStudySeconds % 30 === 0) {
          await putRecord("store_config", { key: "study_telemetry_total_sec", value: activeStudySeconds });
        }
      }
    }, 1000);
  }

  async function getCumulativeStudyTimeSec() {
    try {
      const rec = await getRecord("store_config", "study_telemetry_total_sec");
      if (rec && typeof rec.value === "number") {
        activeStudySeconds = Math.max(activeStudySeconds, rec.value);
      }
    } catch (e) {}

    const attempts = await getAllRecords("store_attempts");
    let examSec = 0;
    attempts.filter(a => a.completed).forEach(a => {
      if (a.userResponses && typeof a.userResponses === "object") {
        Object.values(a.userResponses).forEach(r => {
          examSec += (r ? (r.timeSpentSec || 0) : 0);
        });
      }
    });

    return Math.max(activeStudySeconds, examSec);
  }

  /* ==========================================================================
   * SECTION 4: RESILIENT 3-TIER DOWNLOAD DISPATCHER
   * ========================================================================== */
  async function downloadFileSafe(content, fileName, mimeType = "application/json") {
    activeFallbackPayloadString = typeof content === "string" ? content : JSON.stringify(content, null, 2);
    activeFallbackFileName = fileName;

    // Tier 1: Web Share API (Primary for Android Web APK / WebView)
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([activeFallbackPayloadString], fileName, { type: mimeType });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: fileName,
            text: `SSC CGL Intelligence OS Export: ${fileName}`,
            files: [file]
          });
          return true;
        }
      } catch (err) {
        if (err.name === "AbortError") return false;
      }
    }

    // Tier 2: Blob / Data-URI Anchor Download
    try {
      const blob = new Blob([activeFallbackPayloadString], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 300);
      return true;
    } catch (blobErr) {
      console.warn("Direct blob download failed, falling back to on-screen extractor.", blobErr);
    }

    // Tier 3: Visual On-Screen Modal Extractor (Guarantees zero data loss)
    showFallbackExportModal(fileName, activeFallbackPayloadString);
    return true;
  }

  function showFallbackExportModal(fileName, payloadStr) {
    safeSetText("fallback-modal-filename", fileName);
    const previewEl = document.getElementById("fallback-modal-payload-preview");
    if (previewEl) {
      previewEl.innerText = payloadStr.slice(0, 1500) + (payloadStr.length > 1500 ? "\n\n... [Payload Truncated for Preview. Tap Copy Below for Full Data] ..." : "");
    }
    const retryBtn = document.getElementById("btn-fallback-retry-blob");
    if (retryBtn) {
      retryBtn.onclick = () => {
        const encoded = "data:application/json;charset=utf-8," + encodeURIComponent(activeFallbackPayloadString);
        const a = document.createElement("a");
        a.href = encoded;
        a.download = activeFallbackFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
    pushHistoryState("modal-download-fallback");
    const m = document.getElementById("modal-download-fallback");
    if (m) m.classList.add("active");
  }

  function copyFallbackPayloadToClipboard() {
    if (!activeFallbackPayloadString) return;
    navigator.clipboard.writeText(activeFallbackPayloadString);
    alert("Full data payload copied to clipboard!");
    const m = document.getElementById("modal-download-fallback");
    if (m) m.classList.remove("active");
  }

  /* ==========================================================================
   * SECTION 5: CANONICAL INITIAL SEED TAXONOMY & QUESTION BANK
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

  let TAXONOMY = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY));

  const SEED_QUESTIONS = [
    {
      id: "q_cgl_ga_polity_014",
      subject: "GA",
      chapter: "GA_POLITY",
      subtopic: "Judiciary",
      method: "Constitutional Articles",
      conceptId: "top_ga_polity_judiciary",
      conceptIds: ["top_ga_polity_judiciary"],
      parentPassageId: null,
      passageText: "",
      setOrder: 0,
      setTotal: 0,
      questionText: "Which Article of the Constitution of India provides for the establishment and constitution of the Supreme Court of India?",
      imageUrl: "",
      options: ["Article 124", "Article 131", "Article 214", "Article 143"],
      correctIndex: 0,
      explanation: "Article 124 of the Constitution establishes the Supreme Court of India and governs its composition, appointment of judges, and operational rules.",
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
      conceptId: "top_qa_geo_circles",
      conceptIds: ["top_qa_geo_circles", "top_qa_geo_triangles"],
      parentPassageId: null,
      passageText: "",
      setOrder: 0,
      setTotal: 0,
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
      id: "q_cgl_qa_tw_010",
      subject: "QA",
      chapter: "QA_PIPE_CISTERN",
      subtopic: "Pipes & Cisterns",
      method: "Combined Rate of Flow",
      conceptId: "",
      conceptIds: [],
      parentPassageId: null,
      passageText: "",
      setOrder: 0,
      setTotal: 0,
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
      conceptId: "",
      conceptIds: [],
      parentPassageId: null,
      passageText: "",
      setOrder: 0,
      setTotal: 0,
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
      conceptId: "top_qa_geo_triangles",
      conceptIds: ["top_qa_geo_triangles"],
      parentPassageId: null,
      passageText: "",
      setOrder: 0,
      setTotal: 0,
      questionText: "In $\\triangle ABC$, the bisectors of $\\angle B$ and $\\angle C$ intersect at point $I$ inside the triangle. If $\\angle BAC = 68^\\circ$, find the measure of $\\angle BIC$.",
      imageUrl: "",
      options: ["$124^\\circ$", "$136^\\circ$", "$112^\\circ$", "$146^\\circ$"],
      correctIndex: 0,
      explanation: "Incenter formula: $\\angle BIC = 90^\\circ + \\frac{\\angle A}{2} = 90^\\circ + 34^\\circ = 124^\\circ$.",
      source: "PYQ Tier-1",
      tags: ["Geometry", "Incenter", "Formula"],
      annotation: ""
    },
    // Seed Passage-Set: Reading Comprehension Linked Questions
    {
      id: "q_eng_rc_shift1_01",
      subject: "ENG",
      chapter: "ENG_READING_COMP",
      subtopic: "Macroeconomics Passage",
      method: "Central Theme Extraction",
      conceptId: "",
      conceptIds: [],
      parentPassageId: "pass_cgl_eng_macro_01",
      passageText: "The post-pandemic global economic recovery has been characterized by sharp supply-chain bottlenecks and unprecedented inflationary pressures. While central banks initially characterized these price spikes as transitory, persistent structural deficits in energy transition and semiconductor fabrication forced aggressive monetary tightening across advanced economies.",
      setOrder: 1,
      setTotal: 2,
      questionText: "According to the passage, what forced central banks to pivot towards aggressive monetary tightening?",
      imageUrl: "",
      options: [
        "Persistent structural deficits in energy and semiconductor fabrication",
        "A sudden drop in consumer spending",
        "Rapid deflationary trends in emerging markets",
        "Excessive liquidity in retail banking systems"
      ],
      correctIndex: 0,
      explanation: "The passage explicitly notes that 'persistent structural deficits in energy transition and semiconductor fabrication forced aggressive monetary tightening'.",
      source: "PYQ Tier-1 Practice",
      tags: ["ReadingComp", "PassageSet"],
      annotation: ""
    },
    {
      id: "q_eng_rc_shift1_02",
      subject: "ENG",
      chapter: "ENG_READING_COMP",
      subtopic: "Macroeconomics Passage",
      method: "Inference & Tone",
      conceptId: "",
      conceptIds: [],
      parentPassageId: "pass_cgl_eng_macro_01",
      passageText: "The post-pandemic global economic recovery has been characterized by sharp supply-chain bottlenecks and unprecedented inflationary pressures. While central banks initially characterized these price spikes as transitory, persistent structural deficits in energy transition and semiconductor fabrication forced aggressive monetary tightening across advanced economies.",
      setOrder: 2,
      setTotal: 2,
      questionText: "How did central banks initially evaluate the price spikes before structural deficits became evident?",
      imageUrl: "",
      options: [
        "As permanent structural shifts",
        "As transitory phenomenon",
        "As hyper-inflationary crises",
        "As negligible seasonal variations"
      ],
      correctIndex: 1,
      explanation: "The passage states that central banks 'initially characterized these price spikes as transitory'.",
      source: "PYQ Tier-1 Practice",
      tags: ["ReadingComp", "PassageSet"],
      annotation: ""
    }
  ];

  const SEED_TOPIC_DOSSIERS = [
    {
      id: "top_qa_geo_triangles",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      title: "Triangles & Incenters",
      subtitle: "Incenters, Circumcenters & Angle Bisectors",
      content: "### Internal Angle Bisector Theorem\nIf $AD$ bisects $\\angle A$ and meets $BC$ at $D$:\n$$\\frac{BD}{DC} = \\frac{AB}{AC}$$\n\n> [!formula] Incenter Angle Rule\n> The angle formed at the incenter $I$:\n> $$\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}$$\n\n### Right-Angled Triangle Inradius\nFor legs $P, B$ and hypotenuse $H$:\n$$r = \\frac{P + B - H}{2}$$\n\n> [!trap] Critical TCS Deduction\n> Verify whether the question asks for inradius $r$ or circumradius $R = \\frac{H}{2}$.",
      imageUrl: "",
      timestamp: Date.now()
    },
    {
      id: "top_qa_geo_circles",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      title: "Circles & Tangents",
      subtitle: "Secants, Power of Point & Tangent Lengths",
      content: "### Tangent-Secant Theorem (Power of a Point)\nFrom external point $P$, if $PT$ is tangent and $PAB$ is secant:\n$$PT^2 = PA \\cdot PB$$\n\n### Common Tangent Lengths\nFor radii $r_1, r_2$ and center distance $d$:\n• **Direct Common Tangent (DCT):**\n$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$\n• **Transverse Common Tangent (TCT):**\n$$TCT = \\sqrt{d^2 - (r_1 + r_2)^2}$$\n\n> [!trap] External Touching Circles\n> If $d = r_1 + r_2$, then $DCT = 2\\sqrt{r_1 r_2}$. Transverse tangent is 0.",
      imageUrl: "",
      timestamp: Date.now()
    },
    {
      id: "top_ga_polity_judiciary",
      subject: "GA",
      chapter: "GA_POLITY",
      title: "Supreme Court & Writ Jurisdiction",
      subtitle: "Articles 32, 124, 131, 226",
      content: "### Constitutional Architecture\n• **Article 124:** Establishment and constitution of the Supreme Court of India.\n• **Article 131:** Original jurisdiction of the Supreme Court (Federal disputes).\n• **Article 143:** Advisory jurisdiction on Presidential references.\n• **Article 226:** High Courts writ jurisdiction for Fundamental Rights and other legal rights.",
      imageUrl: "",
      timestamp: Date.now()
    }
  ];

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
      extra: "For excenter formed by external angle bisectors: $\\angle BEC = 90^\\circ - \\frac{\\angle A}{2}$.",
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
      extra: "Transverse Common Tangent ($TCT$) uses $(r_1 + r_2)^2$. $DCT$ is always longer than $TCT$.",
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
      extra: "Article 129 establishes SC as a Court of Record. Article 131 covers Original Jurisdiction.",
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
      extra: "Often tested in SSC CGL Tier 1 Vocab shifts.",
      tags: ["Vocabulary", "OWS"]
    }
  ];

  /* ==========================================================================
   * SECTION 6: INDIAN STANDARD TIME (IST) & TIME MATRIX UTILITIES
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
   * SECTION 7: DEFENSIVE HIERARCHICAL QUESTION SORTER
   * Protected against undefined/null chapters, subjects, and subtopics
   * ========================================================================== */
  function sortQuestionsHierarchical(questions) {
    if (!Array.isArray(questions)) return [];
    const subOrder = ["QA", "REAS", "ENG", "GA"];
    return questions.slice().sort((a, b) => {
      const subA = String(a.subject || "");
      const subB = String(b.subject || "");
      const sA = subOrder.indexOf(subA) !== -1 ? subOrder.indexOf(subA) : 99;
      const sB = subOrder.indexOf(subB) !== -1 ? subOrder.indexOf(subB) : 99;
      if (sA !== sB) return sA - sB;

      const chapA = String(a.chapter || "");
      const chapB = String(b.chapter || "");
      if (chapA !== chapB) return chapA.localeCompare(chapB);

      // Clustered passage set sorting
      const passA = String(a.parentPassageId || "");
      const passB = String(b.parentPassageId || "");
      if (passA !== passB) return passA.localeCompare(passB);

      const orderA = typeof a.setOrder === "number" ? a.setOrder : 0;
      const orderB = typeof b.setOrder === "number" ? b.setOrder : 0;
      if (orderA !== orderB) return orderA - orderB;

      const subtopA = String(a.subtopic || "");
      const subtopB = String(b.subtopic || "");
      if (subtopA !== subtopB) return subtopA.localeCompare(subtopB);

      return String(a.id || "").localeCompare(String(b.id || ""));
    });
  }

  /* ==========================================================================
   * SECTION 8: TYPESETTER, MULTI-LINE MARKDOWN & KATEX FORMULA ISOLATOR
   * ========================================================================== */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    // 1. Isolate LaTeX math into protected tokens so markdown never corrupts delimiters
    const mathTokens = [];
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      mathTokens.push({ display: true, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });
    out = out.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      mathTokens.push({ display: false, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });

    // 2. Multi-line Markdown Callout Parser
    out = out.replace(/^>\s*\[!formula\][ \t]*\n?((?:>.*(?:\n|$))+)/gim, (match, body) => {
      const cleanBody = body.replace(/^>\s?/gm, '').trim();
      return `<div class="callout-box formula"><b>⚡ Formula:</b><br>${cleanBody}</div>`;
    });
    out = out.replace(/^>\s*\[!trap\][ \t]*\n?((?:>.*(?:\n|$))+)/gim, (match, body) => {
      const cleanBody = body.replace(/^>\s?/gm, '').trim();
      return `<div class="callout-box trap"><b>⚠️ Cognitive Trap:</b><br>${cleanBody}</div>`;
    });
    out = out.replace(/^>\s*\[!tip\][ \t]*\n?((?:>.*(?:\n|$))+)/gim, (match, body) => {
      const cleanBody = body.replace(/^>\s?/gm, '').trim();
      return `<div class="callout-box"><b>💡 Tip / Shortcut:</b><br>${cleanBody}</div>`;
    });

    // Handle single-line callouts as fallback
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Cognitive Trap:</b> $1</div>');
    out = out.replace(/^>\s*\[!tip\]\s*(.*)$/gm, '<div class="callout-box"><b>💡 Tip / Shortcut:</b> $1</div>');

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

    // 5. Syllogisms & Statements / Conclusions
    out = out.replace(/(?:Statements?\s*:)\s*([\s\S]+?)(?=(?:Conclusions?\s*:|Conclusions?|$))/i, (match, body) => {
      const items = body.split(/(?:\(\d+\)|\(\w+\)|\d+\.|\n•|\n-)/).map(s => s.trim()).filter(Boolean);
      const rows = items.map((item, idx) => `
        <div class="q-itemized-row">
          <span class="q-item-num">(${idx + 1})</span>
          <span>${item}</span>
        </div>
      `).join('');
      return `<div class="q-structured-block"><div class="q-block-header"><span>📋 Statements:</span></div>${rows}</div>`;
    });

    out = out.replace(/(?:Conclusions?\s*:)\s*([\s\S]+?)(?=(?:\n\n[A-Z]|Options?|$))/i, (match, body) => {
      const roman = ["I", "II", "III", "IV", "V", "VI"];
      const items = body.split(/(?:\(\d+\)|\(\w+\)|\[\w+\]|\d+\.|\n•|\n-)/).map(s => s.trim()).filter(Boolean);
      const rows = items.map((item, idx) => `
        <div class="q-itemized-row">
          <span class="q-item-num">[${roman[idx] || (idx + 1)}]</span>
          <span>${item}</span>
        </div>
      `).join('');
      return `<div class="q-structured-block" style="margin-top:6px;"><div class="q-block-header"><span style="color:var(--accent-purple-light);">🎯 Conclusions:</span></div>${rows}</div>`;
    });

    // 6. Markdown Tables
    out = out.replace(/(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, headerLine, alignLine, bodyLines) => {
      const headers = headerLine.trim().split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = bodyLines.trim().split('\n').map(row => {
        const cells = row.trim().split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="table-responsive"><table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // 7. Convert remaining newlines to <br> safely
    out = out.replace(/\n/g, "<br>");

    // 8. Re-inject rendered KaTeX HTML
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

  /* ==========================================================================
   * SECTION 9: LIFO NAVIGATION STACK & TOUCH CONTROLLER
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
   * SECTION 10: HARDENED INDEXEDDB ENGINE
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
   * SECTION 11: FULL BACKUP, DISASTER RECOVERY & SANITIZERS
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

    await downloadFileSafe(envelope, `cgl_os_backup_${Date.now()}.json`);
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
            • Questions: ${pendingHydrationData.store_questions.length}<br>
            • Attempts & Scores: ${pendingHydrationData.store_attempts.length}<br>
            • Flashcards: ${pendingHydrationData.store_flashcards.length}<br>
            • Living Knowledge Sheets: ${pendingHydrationData.store_concepts.length}<br>
            • Clinical AI Consultations: ${pendingHydrationData.store_ai_consultations.length}<br>
            • Saved Blueprints & Papers: ${pendingHydrationData.store_saved_mocks.length}
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
      subject: String(q.subject || "QA"),
      chapter: String(q.chapter || "QA_GENERAL"),
      subtopic: String(q.subtopic || ""),
      method: String(q.method || ""),
      conceptId: conceptIds[0] || "",
      conceptIds: conceptIds,
      parentPassageId: q.parentPassageId || null,
      passageText: String(q.passageText || ""),
      setOrder: typeof q.setOrder === "number" ? q.setOrder : 0,
      setTotal: typeof q.setTotal === "number" ? q.setTotal : 0,
      ephemeral: !!q.ephemeral,
      questionText: String(q.questionText || ""),
      imageUrl: String(q.imageUrl || ""),
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options.map(String) : ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: (typeof q.correctIndex === "number" && q.correctIndex >= 0 && q.correctIndex <= 3) ? q.correctIndex : 0,
      explanation: String(q.explanation || ""),
      source: String(q.source || "Manual Entry"),
      difficulty: String(q.difficulty || "MEDIUM"),
      tags: Array.isArray(q.tags) ? q.tags.map(String) : ["Hydrated"],
      annotation: String(q.annotation || ""),
      createdAt: q.createdAt || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeDossier(d, idx = 0) {
    return {
      id: d.id || `top_restored_${Date.now()}_${idx}`,
      subject: String(d.subject || "QA"),
      chapter: String(d.chapter || "QA_GENERAL"),
      title: String(d.title || d.word || "Untitled Topic"),
      subtitle: String(d.subtitle || d.root || ""),
      content: String(d.content || d.meaning || ""),
      imageUrl: String(d.imageUrl || ""),
      tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
      timestamp: d.timestamp || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeFlashcard(f, idx = 0) {
    return {
      id: f.id || `fc_restored_${Date.now()}_${idx}`,
      cardType: String(f.cardType || (f.extra ? "BASIC_EXTRA" : "BASIC")),
      subject: String(f.subject || "QA"),
      chapter: String(f.chapter || "QA_GENERAL"),
      front: String(f.front || f.questionText || "Untitled Prompt"),
      frontImageUrl: String(f.frontImageUrl || ""),
      back: String(f.back || f.explanation || "Untitled Answer"),
      backImageUrl: String(f.backImageUrl || ""),
      extra: String(f.extra || ""),
      tags: Array.isArray(f.tags) ? f.tags.map(String) : ["Restored"],
      createdAt: f.createdAt || Date.now()
    };
  }

  function sanitizeAttempt(a, idx = 0) {
    const epoch = a.timestamp || Date.now();
    return {
      sessionId: a.sessionId || `mock_${epoch}_${idx}`,
      parentSessionId: a.parentSessionId || null,
      attemptNumber: typeof a.attemptNumber === "number" ? a.attemptNumber : 1,
      title: String(a.title || "SSC CGL Practice Mock"),
      timestamp: epoch,
      timeIST: a.timeIST || formatISTDate(epoch),
      diurnalSlot: a.diurnalSlot || getDiurnalSlot(epoch),
      mockType: String(a.mockType || "CUSTOM"),
      signatureTag: String(a.signatureTag || ""),
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
      type: String(b.type || (b.questions ? "FIXED_PAPER" : "DYNAMIC_BLUEPRINT")),
      title: String(b.title || `Saved Setup ${idx + 1}`),
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
      await renderVault();
      if (typeof renderPracticeQuestionsTable === "function") {
        await renderPracticeQuestionsTable();
      }
    } catch (err) {
      alert("Hydration Error: " + err.message);
    }
  }

  // --- End of Part 1 ---
  /* ==========================================================================
   * SECTION 12: SHARED SERVICE — TAXONOMY SERVICE
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
    }
  };

  /* ==========================================================================
   * SECTION 13: SHARED SERVICE — QUESTION SERVICE
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

    async create(questionData, persistToBank = true) {
      const sanitized = sanitizeQuestion(questionData);
      this.validate(sanitized);

      if (persistToBank && !sanitized.ephemeral) {
        const existing = await getRecord("store_questions", sanitized.id);
        if (existing) {
          throw new Error(`A question with ID '${sanitized.id}' already exists.`);
        }
        await putRecord("store_questions", sanitized);
        SearchService.invalidate();
      }
      return sanitized;
    },

    async update(id, questionData) {
      const existing = await getRecord("store_questions", id);
      if (!existing) throw new Error(`Question ${id} not found.`);

      const updated = sanitizeQuestion({ 
        ...existing, 
        ...questionData, 
        id: id,
        tags: Array.isArray(questionData.tags) && questionData.tags.length > 0 ? questionData.tags : existing.tags,
        annotation: questionData.annotation !== undefined ? questionData.annotation : existing.annotation
      });
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

    async bulkCreate(questionsArray, provenance = "SOURCE", persistToBank = true) {
      if (!Array.isArray(questionsArray)) throw new Error("Expected array of questions.");
      const sanitizedList = questionsArray.map((q, idx) => {
        const item = sanitizeQuestion(q, idx);
        if (provenance) item.source = item.source || provenance;
        this.validate(item);
        return item;
      });

      if (persistToBank) {
        await runTx(["store_questions"], "readwrite", (tx) => {
          const st = tx.objectStore("store_questions");
          sanitizedList.forEach(q => {
            if (!q.ephemeral) st.put(q);
          });
        });
        SearchService.invalidate();
      }

      return sanitizedList;
    }
  };

  /* ==========================================================================
   * SECTION 14: SHARED SERVICE — CONCEPT SERVICE
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
   * SECTION 15: SHARED SERVICE — SEARCH SERVICE
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
        if (filters.difficulty && filters.difficulty !== "ALL" && q.difficulty !== filters.difficulty) return false;

        if (term) {
          const inId = String(q.id).toLowerCase().includes(term);
          const inText = String(q.questionText).toLowerCase().includes(term);
          const inPassage = String(q.passageText || "").toLowerCase().includes(term);
          const inExp = String(q.explanation || "").toLowerCase().includes(term);
          const inSubtopic = String(q.subtopic || "").toLowerCase().includes(term);
          const inMethod = String(q.method || "").toLowerCase().includes(term);
          const inOpts = Array.isArray(q.options) && q.options.some(o => String(o).toLowerCase().includes(term));
          const inTags = Array.isArray(q.tags) && q.tags.some(t => String(t).toLowerCase().includes(term));
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
          const inTitle = String(c.title).toLowerCase().includes(term);
          const inSub = String(c.subtitle || "").toLowerCase().includes(term);
          const inContent = String(c.content).toLowerCase().includes(term);
          const inChap = String(c.chapter).toLowerCase().includes(term);
          if (!inTitle && !inSub && !inContent && !inChap) return false;
        }

        return true;
      });
    }
  };

  /* ==========================================================================
   * SECTION 16: SHARED SERVICE — PERFORMANCE SERVICE
   * ========================================================================== */
  const PerformanceService = {
    async getHistoricalAttempts() {
      const attempts = await getAllRecords("store_attempts");
      return attempts.filter(a => a.completed);
    },

    async calculateGlobalMetrics() {
      const completed = await this.getHistoricalAttempts();
      const cumulativeStudySec = await getCumulativeStudyTimeSec();

      if (completed.length === 0) {
        return { 
          totalMocks: 0, 
          accuracy: 0, 
          avgSpeed: 0, 
          trapsHit: 0, 
          eri: "0.0", 
          totalStudyTimeSec: cumulativeStudySec,
          accSubscore: "0.0",
          velSubscore: "0.0",
          expSubscore: "0.0"
        };
      }

      let totalCor = 0, totalAtt = 0, totalSec = 0, traps = 0;
      completed.forEach(c => {
        totalCor += (c.correctCount || 0);
        totalAtt += ((c.correctCount || 0) + (c.incorrectCount || 0));
        traps += (c.q4Traps || 0);
        if (c.userResponses && typeof c.userResponses === "object") {
          Object.values(c.userResponses).forEach(r => totalSec += (r ? (r.timeSpentSec || 0) : 0));
        }
      });

      const acc = totalAtt > 0 ? Math.round((totalCor / totalAtt) * 100) : 0;
      const avgSpeed = totalAtt > 0 ? Math.round(totalSec / totalAtt) : 0;

      // ERI: Accuracy 50% + Velocity 30% + Exposure 20%
      const accComp = (acc * 0.50).toFixed(1);
      let velScore = 100;
      if (avgSpeed > 45) {
        velScore = Math.max(20, 100 - (avgSpeed - 45) * 1.2);
      }
      const velComp = (velScore * 0.30).toFixed(1);
      const volumeBonus = Math.min(100, (totalAtt * 0.4) + (completed.length * 8));
      const consistencyComp = (volumeBonus * 0.20).toFixed(1);
      const totalERI = Math.min(100, Math.max(0, parseFloat(accComp) + parseFloat(velComp) + parseFloat(consistencyComp))).toFixed(1);

      return {
        totalMocks: completed.length,
        accuracy: acc,
        avgSpeed: avgSpeed,
        trapsHit: traps,
        eri: totalERI,
        totalStudyTimeSec: cumulativeStudySec,
        accSubscore: accComp,
        velSubscore: velComp,
        expSubscore: consistencyComp
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
      const completed = await this.getHistoricalAttempts();
      if (completed.length === 0) return []; // Zero-state baseline safe

      const taxonomy = await TaxonomyService.getTaxonomy();
      const weakList = [];

      for (const sKey of Object.keys(taxonomy)) {
        if (subKey && subKey !== "ALL" && sKey !== subKey) continue;
        for (const chap of taxonomy[sKey].chapters) {
          const stats = await this.getChapterStats(sKey, chap);
          if (stats.attempted >= 2 && stats.accuracy < 65) {
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

    async calculateNeglect() {
      const completed = await this.getHistoricalAttempts();
      if (completed.length === 0) return null; // Prevent false positive alerts on fresh install

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

          if (lastSeen === 0) {
            return { subject: sKey, chapter: chap, days: "Never", isNever: true };
          } else {
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
   * SECTION 17: SHARED SERVICE — MOCK SERVICE & PASSAGE-SET SAMPLER
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
        difficulty = "ALL",
        mode = "RANDOM",
        excludeRecentMocks = false,
        recentMockWindow = 3,
        randomizeOrder = true,
        isSectionLocked = false,
        explicitQuestionIds = [],
        customQuestions = [],
        persistQuestions = true,
        seed = null
      } = config;

      const allBankQuestions = await getAllRecords("store_questions");
      let eligiblePool = [];

      // 1. Explicit Questions / Ephemeral Injection
      if (Array.isArray(customQuestions) && customQuestions.length > 0) {
        eligiblePool = customQuestions.map((q, idx) => sanitizeQuestion({ ...q, ephemeral: !persistQuestions }, idx));
      } else if (Array.isArray(explicitQuestionIds) && explicitQuestionIds.length > 0) {
        explicitQuestionIds.forEach(id => {
          const found = allBankQuestions.find(q => q.id === id);
          if (found) eligiblePool.push(found);
        });
      } else {
        const allowedChapters = Array.isArray(chapters) && chapters.length > 0 
          ? chapters 
          : (chapter !== "ALL" ? [chapter] : []);

        eligiblePool = allBankQuestions.filter(q => {
          if (subject !== "ALL" && q.subject !== subject) return false;
          if (allowedChapters.length > 0 && !allowedChapters.includes(q.chapter)) return false;
          if (difficulty !== "ALL" && q.difficulty !== difficulty) return false;
          return true;
        });
      }

      if (eligiblePool.length === 0) {
        throw new Error(`Zero questions found in bank matching target criteria.`);
      }

      // 2. Anti-Repetition Filter
      const attempts = await getAllRecords("store_attempts");
      const completed = attempts.filter(a => a.completed).sort((a, b) => b.timestamp - a.timestamp);

      if (excludeRecentMocks && completed.length > 0 && !explicitQuestionIds.length && !customQuestions.length) {
        const recentAttempts = completed.slice(0, recentMockWindow);
        const recentQIds = new Set();
        recentAttempts.forEach(att => {
          if (Array.isArray(att.questions)) {
            att.questions.forEach(q => recentQIds.add(q.id));
          }
        });
        const antiRep = eligiblePool.filter(q => !recentQIds.has(q.id));
        if (antiRep.length >= count) eligiblePool = antiRep;
      }

      // 3. Performance & Weakness Mode Filter (with cold-start guard)
      const perfMap = await PerformanceService.getQuestionPerformanceMap();
      let prioritizedPool = [];

      if (mode === "WEAKNESS") {
        prioritizedPool = eligiblePool.filter(q => {
          const stats = perfMap[q.id];
          if (!stats || stats.attempts === 0) return false;
          const acc = Math.round((stats.correct / stats.attempts) * 100);
          return acc < 65 || stats.traps.length > 0;
        });
        if (prioritizedPool.length === 0) {
          throw new Error("DIAGNOSTIC_BASELINE_EMPTY: No weak questions identified yet.");
        }
      } else if (mode === "INCORRECT") {
        prioritizedPool = eligiblePool.filter(q => perfMap[q.id] && (perfMap[q.id].lastWasIncorrect || perfMap[q.id].incorrect > 0));
        if (prioritizedPool.length === 0) {
          throw new Error("Zero historically incorrect questions in this selection.");
        }
      } else if (mode === "UNATTEMPTED" || mode === "UNSEEN") {
        prioritizedPool = eligiblePool.filter(q => !perfMap[q.id] || perfMap[q.id].attempts === 0);
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "SLOW") {
        prioritizedPool = eligiblePool.filter(q => {
          const stats = perfMap[q.id];
          return stats && stats.attempts > 0 && Math.round(stats.totalTime / stats.attempts) > 75;
        });
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "IGNORED") {
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        prioritizedPool = eligiblePool.filter(q => !perfMap[q.id] || perfMap[q.id].lastAttemptEpoch < sevenDaysAgo);
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else {
        prioritizedPool = eligiblePool;
      }

      // 4. ATOMIC PASSAGE-SET SAMPLING ENGINE (RC, Cloze & Caselets)
      const shuffledCandidates = this.shuffle([...prioritizedPool], seed);
      const finalSelectedQuestions = [];
      const includedPassageIds = new Set();
      const includedQuestionIds = new Set();

      for (const candidate of shuffledCandidates) {
        if (finalSelectedQuestions.length >= count) break;
        if (includedQuestionIds.has(candidate.id)) continue;

        // If candidate belongs to a passage set, atomically fetch and preserve all siblings
        if (candidate.parentPassageId) {
          if (includedPassageIds.has(candidate.parentPassageId)) continue;
          includedPassageIds.add(candidate.parentPassageId);

          // Locate all siblings in bank sharing this parentPassageId
          const siblings = allBankQuestions
            .filter(q => q.parentPassageId === candidate.parentPassageId)
            .sort((a, b) => (a.setOrder || 0) - (b.setOrder || 0));

          siblings.forEach(sib => {
            if (!includedQuestionIds.has(sib.id)) {
              includedQuestionIds.add(sib.id);
              finalSelectedQuestions.push(sib);
            }
          });
        } else {
          includedQuestionIds.add(candidate.id);
          finalSelectedQuestions.push(candidate);
        }
      }

      // Trim if passage expansion pushed slightly past target, but never split a passage
      let trimmedPool = finalSelectedQuestions;
      if (trimmedPool.length > count && !explicitQuestionIds.length) {
        trimmedPool = finalSelectedQuestions.slice(0, count);
        // If the cut sliced a passage, preserve the full passage
        const lastQ = trimmedPool[trimmedPool.length - 1];
        if (lastQ && lastQ.parentPassageId) {
          const uncutPassage = finalSelectedQuestions.filter(q => q.parentPassageId === lastQ.parentPassageId);
          uncutPassage.forEach(pq => {
            if (!trimmedPool.some(t => t.id === pq.id)) trimmedPool.push(pq);
          });
        }
      }

      // Randomize display order only across standalone items and intact passage clusters
      if (randomizeOrder && !explicitQuestionIds.length) {
        const clusters = [];
        const passageMap = new Map();

        trimmedPool.forEach(q => {
          if (q.parentPassageId) {
            if (!passageMap.has(q.parentPassageId)) {
              const cluster = [];
              passageMap.set(q.parentPassageId, cluster);
              clusters.push(cluster);
            }
            passageMap.get(q.parentPassageId).push(q);
          } else {
            clusters.push([q]);
          }
        });

        this.shuffle(clusters, seed);
        trimmedPool = clusters.flat();
      }

      return {
        title: title,
        durationMin: durationMin,
        isSectionLocked: !!isSectionLocked,
        questions: trimmedPool,
        seed: seed || Date.now().toString(),
        totalSelected: trimmedPool.length
      };
    },

    async saveMockDefinition(mockData) {
      const clean = sanitizeSavedMock(mockData);
      await putRecord("store_saved_mocks", clean);
      return clean;
    },

    async deleteMock(mockId) {
      await deleteRecordFromStore("store_saved_mocks", mockId);
      return { id: mockId, deleted: true };
    },

    async launchMockSession(mockInstance) {
      const { title, questions, durationMin, isSectionLocked } = mockInstance;
      await compileAndLaunchArena(title, questions, durationMin, isSectionLocked);
    }
  };

  /* ==========================================================================
   * SECTION 18: MOCK LAB MULTI-CHAPTER MATRIX CONTROLLER
   * ========================================================================== */
  let activeMockStrategy = "RANDOM";
  let customSequenceRows = [];
  let selectedBuilderChapters = new Set();

  function setMockStrategy(strategy, btnEl) {
    activeMockStrategy = strategy;
    document.querySelectorAll('[id^="strat-pill-"]').forEach(el => el.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    const wrap = document.getElementById("custom-sequence-stack-wrap");
    const matrixWrap = document.getElementById("builder-chapter-matrix-wrap");

    if (strategy === "CUSTOM_BUILDER") {
      if (wrap) wrap.style.display = "block";
      if (matrixWrap) matrixWrap.style.display = "none";
      if (customSequenceRows.length === 0) {
        customSequenceRows = [
          { id: 1, subject: "QA", chapters: [], count: 25, durationMin: 15 },
          { id: 2, subject: "ENG", chapters: [], count: 25, durationMin: 15 }
        ];
      }
      renderCustomSequenceRows();
    } else {
      if (wrap) wrap.style.display = "none";
      if (matrixWrap) matrixWrap.style.display = "block";
    }

    updateBuilderPoolEstimate();
  }

  async function updateBuilderChapters(subKey) {
    const container = document.getElementById("builder-chapter-chips-grid");
    if (!container) return;
    container.innerHTML = "";
    selectedBuilderChapters.clear();

    const allQs = await getAllRecords("store_questions");
    let candidateChapters = [];

    if (subKey === "ALL") {
      Object.keys(TAXONOMY).forEach(s => {
        candidateChapters.push(...TAXONOMY[s].chapters);
      });
    } else if (TAXONOMY[subKey]) {
      candidateChapters = [...TAXONOMY[subKey].chapters];
    }

    candidateChapters = [...new Set(candidateChapters)];

    candidateChapters.forEach(chap => {
      const count = allQs.filter(q => q.chapter === chap).length;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip";
      chip.innerText = `${chap} (${count})`;
      chip.dataset.chap = chap;

      chip.onclick = () => {
        if (selectedBuilderChapters.has(chap)) {
          selectedBuilderChapters.delete(chap);
          chip.classList.remove("selected");
        } else {
          selectedBuilderChapters.add(chap);
          chip.classList.add("selected");
        }
        updateBuilderPoolEstimate();
      };
      container.appendChild(chip);
    });

    updateBuilderPoolEstimate();
  }

  function selectAllBuilderChips(selectAll) {
    const chips = document.querySelectorAll("#builder-chapter-chips-grid .filter-chip");
    chips.forEach(c => {
      const chap = c.dataset.chap;
      if (selectAll) {
        selectedBuilderChapters.add(chap);
        c.classList.add("selected");
      } else {
        selectedBuilderChapters.delete(chap);
        c.classList.remove("selected");
      }
    });
    updateBuilderPoolEstimate();
  }

  async function updateBuilderPoolEstimate() {
    const sub = document.getElementById("builder-subject")?.value || "ALL";
    const allQs = await getAllRecords("store_questions");
    const allowed = Array.from(selectedBuilderChapters);

    const pool = allQs.filter(q => {
      if (sub !== "ALL" && q.subject !== sub) return false;
      if (allowed.length > 0 && !allowed.includes(q.chapter)) return false;
      return true;
    });

    safeSetText("builder-pool-estimate", `Estimated pool: ${pool.length} questions matching criteria`);
  }

  function getActiveBuilderConfig() {
    const sub = document.getElementById("builder-subject")?.value || "ALL";
    const count = parseInt(document.getElementById("builder-count")?.value || "25", 10);
    const duration = parseInt(document.getElementById("builder-duration")?.value || "15", 10);
    const diff = document.getElementById("builder-difficulty")?.value || "ALL";
    const avoidRecent = document.getElementById("builder-avoid-recent")?.checked ?? true;
    const shuffle = document.getElementById("builder-shuffle")?.checked ?? true;
    const selectedChaps = Array.from(selectedBuilderChapters);

    let title = "Custom Practice Mock";
    if (selectedChaps.length === 1) title = `${selectedChaps[0]} Drill`;
    else if (selectedChaps.length > 1) title = `Target Multi-Chapter (${selectedChaps.length} Chaps)`;
    else if (sub !== "ALL") title = `${sub} Sectional Mock`;

    return {
      title: title,
      subject: sub,
      chapters: selectedChaps,
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
    customSequenceRows.push({ id: nextId, subject: "QA", chapters: [], count: 25, durationMin: 15 });
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
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-weight:700; font-size:12px; color:var(--accent-cyan);">Section ${idx + 1} Queue</span>
          ${customSequenceRows.length > 1 ? `<button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--status-red);" onclick="CGL_OS.removeCustomSectionRow(${idx})">Remove</button>` : ''}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:6px;">
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Subject</label>
            <select class="form-control" style="padding:6px; font-size:12px;" onchange="CGL_OS.updateCustomRowSubject(${idx}, this.value)">
              ${Object.keys(TAXONOMY).map(k => `<option value="${k}" ${row.subject === k ? 'selected' : ''}>${k}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Questions</label>
            <input type="number" class="form-control" style="padding:6px; font-size:12px;" value="${row.count}" min="5" max="50" onchange="CGL_OS.updateCustomRowCount(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Duration (Min)</label>
            <input type="number" class="form-control" style="padding:6px; font-size:12px;" value="${row.durationMin}" min="1" max="60" onchange="CGL_OS.updateCustomRowDuration(${idx}, this.value)">
          </div>
        </div>
        <div>
          <label style="font-size:10px; color:var(--text-muted);">Scoped Chapter Tags (Comma-separated, empty = entire subject)</label>
          <input type="text" class="form-control" style="padding:5px 8px; font-size:11px;" placeholder="e.g. QA_PERCENTAGE, QA_PROFIT_LOSS" value="${(row.chapters || []).join(', ')}" onchange="CGL_OS.updateCustomRowChapters(${idx}, this.value)">
        </div>
      `;
      container.appendChild(div);
    });
  }

  function updateCustomRowSubject(idx, val) { customSequenceRows[idx].subject = val; }
  function updateCustomRowCount(idx, val) { customSequenceRows[idx].count = parseInt(val, 10) || 25; }
  function updateCustomRowDuration(idx, val) { customSequenceRows[idx].durationMin = parseInt(val, 10) || 15; }
  function updateCustomRowChapters(idx, val) { 
    customSequenceRows[idx].chapters = val.split(',').map(s => s.trim().toUpperCase()).filter(Boolean); 
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
        if (row.chapters && row.chapters.length > 0) {
          pool = pool.filter(q => row.chapters.includes(q.chapter));
        }
        if (pool.length === 0) pool = allQuestions.filter(q => q.subject === row.subject);

        const shuffled = MockService.shuffle([...pool]);
        const sectionQuestions = shuffled.slice(0, Math.min(row.count, shuffled.length));
        signatureTags.push(row.subject);

        const secObj = {
          id: `SEC_${sIdx + 1}_${row.subject}`,
          subject: row.subject,
          name: `${TAXONOMY[row.subject] ? TAXONOMY[row.subject].name : row.subject} (Sec ${sIdx + 1})`,
          durationSec: row.durationMin * 60, // Preserves individual section clock
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
        `Custom Routine (${signatureTags.join('➔')})`, 
        flattened, 
        customSequenceRows.reduce((a, b) => a + b.durationMin, 0), 
        isLock,
        sections
      );
    } else {
      try {
        const config = getActiveBuilderConfig();
        const instance = await MockService.generate(config);
        await MockService.launchMockSession(instance);
      } catch (err) {
        alert("Mock Launch Notice: " + err.message);
      }
    }
  }

  async function previewMockSelection() {
    try {
      const config = getActiveBuilderConfig();
      const instance = await MockService.generate({ ...config, count: Math.min(config.count, 15) });
      const qIds = instance.questions.map((q, idx) => `${idx + 1}. [${q.subject} • ${q.chapter}] ${q.questionText.slice(0, 75)}...`).join("\n\n");
      alert(`MOCK PREVIEW (${instance.questions.length} Questions Sampled):\n\n${qIds}`);
    } catch (err) {
      alert("Preview Notice: " + err.message);
    }
  }

  /* ==========================================================================
   * SECTION 19: DASHBOARD & ACTIVE COMMAND CENTER CONTROLLER
   * ========================================================================== */
  async function renderDashboard() {
    const allQs = await getAllRecords("store_questions");
    const metrics = await PerformanceService.calculateGlobalMetrics();
    const weakChapters = await PerformanceService.getWeakChapters();
    const neglect = await PerformanceService.calculateNeglect();

    // 1. Top 4 Battlefield HUD Tiles
    safeSetText("dash-stat-questions", allQs.length);
    safeSetText("dash-stat-accuracy", metrics.totalMocks > 0 ? `${metrics.accuracy}%` : "--");
    safeSetText("dash-stat-weak", weakChapters.length);
    const hrs = Math.floor((metrics.totalStudyTimeSec || 0) / 3600);
    const mins = Math.floor(((metrics.totalStudyTimeSec || 0) % 3600) / 60);
    safeSetText("dash-stat-time", `${hrs}h ${mins}m`);

    // 2. Continue Training Card with Cold-Start Baseline Protection
    const targetWeak = weakChapters.length > 0 ? weakChapters[0] : null;
    if (metrics.totalMocks === 0) {
      safeSetText("dash-continue-title", "Start Diagnostic Baseline");
      safeSetText("dash-continue-sub", "Complete your initial calibration mock to establish personal weak areas");
      safeSetText("dash-btn-continue", "START MOCK");
    } else if (targetWeak) {
      safeSetText("dash-continue-title", `${targetWeak.chapter} — Weakness Drill`);
      safeSetText("dash-continue-sub", `Accuracy: ${targetWeak.accuracy}% (${targetWeak.wrong} incorrect answers recorded)`);
      safeSetText("dash-btn-continue", "CONTINUE");
    } else {
      safeSetText("dash-continue-title", "Comprehensive Practice — Daily Sprint");
      safeSetText("dash-continue-sub", "All syllabus chapters currently within nominal mastery thresholds");
      safeSetText("dash-btn-continue", "CONTINUE");
    }

    // 3. Weak Areas List
    const weakListContainer = document.getElementById("dash-weak-areas-list");
    if (weakListContainer) {
      weakListContainer.innerHTML = "";
      if (metrics.totalMocks === 0) {
        weakListContainer.innerHTML = `<p style="font-size:11.5px; color:var(--text-muted); padding:10px 0;">No diagnostic attempts recorded. Complete your first mock to detect weak areas.</p>`;
      } else if (weakChapters.length === 0) {
        weakListContainer.innerHTML = `<p style="font-size:12px; color:var(--status-green); padding:10px 0;">✓ Zero weak chapters detected! Excellent mastery.</p>`;
      } else {
        weakChapters.slice(0, 4).forEach((w, i) => {
          const colorIcon = i === 0 ? "🔴" : (i === 1 ? "🟠" : "🟡");
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

    // 4. Mastery Batteries & Active Cognitive Trap Heat Bar
    const completedAttempts = await PerformanceService.getHistoricalAttempts();
    renderDashboardSubjectBatteries(completedAttempts);
    renderDashboardTrapHeatBar(completedAttempts);

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

    // 6. Dynamic Exam Readiness Index (ERI)
    safeSetText("eri-score-val", metrics.eri);
    safeSetText("eri-breakdown-sub", `Acc: ${metrics.accSubscore}/50 • Vel: ${metrics.velSubscore}/30 • Exp: ${metrics.expSubscore}/20`);
    const eriCircle = document.getElementById("eri-gauge-circle");
    if (eriCircle) eriCircle.setAttribute("stroke-dasharray", `${metrics.eri}, 100`);
    const eriTier = document.getElementById("eri-status-tier");
    if (eriTier) {
      eriTier.innerText = metrics.eri >= 80 ? "Tier-1 Formidable" : (metrics.eri >= 65 ? "Competitive Form" : "Calibrating");
    }

    // 7. Neglect Alert
    const negAlert = document.getElementById("dash-neglect-alert");
    if (negAlert) {
      if (neglect && metrics.totalMocks > 0) {
        negAlert.style.display = "flex";
        safeSetText("dash-neglect-text", neglect.isNever
          ? `${neglect.chapter} has NEVER been tested in completed mocks.`
          : `${neglect.chapter} untouched for ${neglect.days} days.`);
        const drillBtn = document.getElementById("btn-neglect-drill");
        if (drillBtn) drillBtn.onclick = () => launchDirectChapterDrill(neglect.subject, neglect.chapter);
      } else {
        negAlert.style.display = "none";
      }
    }

    await renderDashboardBlueprints();
    await renderRecentHistory(completedAttempts);
    await renderDrilldownSubjectLevel();
  }

  function launchWeakAreasClinic(count = 20) {
    PerformanceService.getHistoricalAttempts().then(completed => {
      if (completed.length === 0) {
        alert("Diagnostic Baseline Required: Complete at least one practice mock or lab session first so the OS can calibrate your personal weak areas.");
        return;
      }
      MockService.generate({ mode: 'WEAKNESS', count: count })
        .then(inst => MockService.launchMockSession(inst))
        .catch(err => alert("Weak Areas Clinic: " + err.message));
    });
  }

  function launchContinueTrainingDrill() {
    PerformanceService.getHistoricalAttempts().then(completed => {
      if (completed.length === 0) {
        // First-run baseline drill (Balanced Tier-1 Sprint)
        MockService.generate({ title: "Diagnostic Calibration Mock", mode: "RANDOM", count: 25, durationMin: 15 })
          .then(inst => MockService.launchMockSession(inst));
        return;
      }

      PerformanceService.getWeakChapters().then(weaks => {
        if (weaks.length > 0) {
          launchDirectChapterDrill(weaks[0].subject, weaks[0].chapter);
        } else {
          MockService.generate({ mode: "RANDOM", count: 25 })
            .then(inst => MockService.launchMockSession(inst));
        }
      });
    });
  }

  function renderDashboardTrapHeatBar(completed) {
    const bar = document.getElementById("dash-trap-heat-bar");
    const legend = document.getElementById("dash-trap-legend");
    if (!bar || !legend) return;

    bar.innerHTML = "";
    legend.innerHTML = "";

    const counts = {};
    let totalErrors = 0;

    completed.forEach(att => {
      if (att.userResponses) {
        Object.values(att.userResponses).forEach(r => {
          if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED" && r.errorTag !== "VALID_CALCULATED_RISK") {
            counts[r.errorTag] = (counts[r.errorTag] || 0) + 1;
            totalErrors++;
          }
        });
      }
    });

    if (totalErrors === 0) {
      bar.innerHTML = `<div style="width:100%; height:100%; background:#101728; display:flex; align-items:center; justify-content:center; font-size:10px; color:var(--text-muted);">Zero active trap penalties logged</div>`;
      legend.innerHTML = `<span style="font-size:10.5px; color:var(--text-muted);">Take mocks to map cognitive trap proportions.</span>`;
      return;
    }

    const palette = {
      TIME_TRAP_Q4: "#e11d48",
      SECOND_GUESS_BLUNDER: "#f59e0b",
      PANIC_SLIP: "#7c3aed",
      SPEED_MISREAD: "#38bdf8",
      CONCEPT_VOID: "#ef4444",
      CALCULATION_SLIP: "#f97316"
    };

    Object.keys(counts).forEach(tag => {
      const pct = ((counts[tag] / totalErrors) * 100).toFixed(1);
      const color = palette[tag] || "#2563eb";

      const seg = document.createElement("div");
      seg.className = "trap-heat-seg";
      seg.style.width = `${pct}%`;
      seg.style.background = color;
      seg.title = `${tag}: ${counts[tag]} (${pct}%)`;
      seg.onclick = () => openTrapClinicModal(tag);
      bar.appendChild(seg);

      const pill = document.createElement("div");
      pill.className = "trap-legend-pill";
      pill.innerHTML = `<span style="width:7px; height:7px; border-radius:50%; background:${color};"></span><span>${tag.replace(/_/g, ' ')} (${counts[tag]})</span>`;
      pill.onclick = () => openTrapClinicModal(tag);
      legend.appendChild(pill);
    });
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
          <span style="font-family:var(--font-mono); color:${acc >= 80 ? 'var(--status-green)' : (acc >= 60 ? 'var(--status-amber)' : 'var(--text-muted)')};">${subAtt > 0 ? `${acc}\% (${subAtt} Qs)` : '0%'}</span>
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
      pillsContainer.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">Zero saved setups. Blueprints created via Console or Builder appear here.</span>`;
      return;
    }

    blueprints.forEach(bp => {
      const pill = document.createElement("button");
      pill.className = "anchor-pill";
      const icon = bp.type === "FIXED_PAPER" ? "📌" : "⚡";
      pill.innerHTML = `<span>${icon} ${bp.title}</span><span style="opacity:0.6; font-size:9px;" onclick="event.stopPropagation(); CGL_OS.deleteSavedPreset('${bp.id}')">✕</span>`;
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
          ${Object.keys(secScores).map(k => `<span class="ticket-sec-pill"><b>${k}:</b>${secScores[k].toFixed(1)}</span>`).join('')}
          <span class="ticket-sec-pill" style="color:var(--status-red);">Traps: ${att.q4Traps || 0}</span>
        </div>
        <div class="ticket-actions-bar">
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${att.sessionId}')">📥 Export</button>
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--status-green);" onclick="CGL_OS.reattemptMock('${att.sessionId}')">🔁 Re-attempt</button>
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
              Bank: ${totalInBank} Qs • ${chapAtt > 0 ? `Speed: ${Math.round(chapSec / chapAtt)}s` : "No solve data"}
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

    // Populates historical vulnerabilities list
    const vulList = document.getElementById("insp-vulnerability-list");
    if (vulList) {
      vulList.innerHTML = "";
      const completed = await PerformanceService.getHistoricalAttempts();
      const wrongList = [];

      completed.forEach(att => {
        if (att.questions && att.userResponses) {
          att.questions.forEach(q => {
            if (q.chapter === chap) {
              const resp = att.userResponses[q.id];
              if (resp && resp.selectedOption !== null && resp.selectedOption !== q.correctIndex) {
                wrongList.push({ q, resp, timeIST: att.timeIST });
              }
            }
          });
        }
      });

      if (wrongList.length === 0) {
        vulList.innerHTML = `<span style="color:var(--status-green);">Zero recorded mistakes in this chapter!</span>`;
      } else {
        wrongList.slice(0, 5).forEach(item => {
          const row = document.createElement("div");
          row.style.cssText = "padding:6px 0; border-bottom:1px solid var(--border-color);";
          row.innerHTML = `
            <div style="font-size:11px; color:#fff;">${formatRichText(item.q.questionText.slice(0, 100))}...</div>
            <div style="font-size:10px; color:#f87171; margin-top:2px;">Picked Opt ${item.resp.selectedOption + 1} (${item.resp.timeSpentSec}s) • #${item.resp.errorTag || 'ERROR'}</div>
          `;
          vulList.appendChild(row);
        });
      }
    }

    const blitzBtn = document.getElementById("btn-launch-chapter-blitz");
    if (blitzBtn) {
      blitzBtn.onclick = () => {
        const m = document.getElementById("modal-chapter-inspector");
        if (m) m.classList.remove("active");
        launchDirectChapterDrill(subKey, chap);
      };
    }

    pushHistoryState("modal-chapter-inspector");
    const m = document.getElementById("modal-chapter-inspector");
    if (m) m.classList.add("active");
  }

  // --- End of Part 2 ---
  /* ==========================================================================
   * SECTION 20: TIMED EXAM ARENA CONTROLLER & PALETTE
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
      safeSetText("btn-q-save-next", "Next Question ►");
      safeSetDisplay("btn-submit-exam", "none");
      safeSetText("palette-drawer-title", "Review Palette");
      safeSetHtml("palette-legend-bar", `
        <span>🟢 Correct</span>
        <span>🔴 Incorrect</span>
        <span>⚪ Unattempted</span>
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
        safeSetText("btn-arena-early-lock", isLast ? "🔒 Submit Final Section" : "🔒 End Section Early");
        safeSetText("btn-drawer-early-lock", isLast ? "🔒 Lock & Submit Final Section" : "🔒 End & Advance Section Early");
      } else {
        safeSetDisplay("btn-arena-early-lock", "none");
        safeSetDisplay("btn-drawer-early-lock", "none");
      }
    }

    const secQs = activeExam.questions.filter(item => item.sectionIndex === q.sectionIndex);
    safeSetText("hud-section-badge", `${q.sectionName ? q.sectionName.toUpperCase() : 'EXAM'}`);
    safeSetText("hud-section-qinfo", `Sec Q${q.localNumber || (activeExam.currentQuestionIndex + 1)} of ${secQs.length} (Global Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)})`);
    safeSetText("arena-q-num", `Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)}`);

    // Passage Container Rendering (RC, Cloze, Caselets)
    const passageBox = document.getElementById("arena-passage-box");
    if (passageBox) {
      if (q.parentPassageId && q.passageText) {
        passageBox.style.display = "block";
        passageBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span class="q-passage-tag">Reading Context / Passage Set</span>
            <span style="font-size:10.5px; font-family:var(--font-mono); color:var(--accent-cyan); font-weight:700;">
              Item ${q.setOrder || 1} of ${q.setTotal || 1}
            </span>
          </div>
          <div style="font-size:13.5px; line-height:1.7;">${formatRichText(q.passageText)}</div>
        `;
      } else {
        passageBox.style.display = "none";
        passageBox.innerHTML = "";
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
          btn.innerText = `📖 Browse Sheets for ${q.chapter}`;
          btn.onclick = () => openCompendiumToSheet(null, q.subject, q.chapter);
          pillsWrap.appendChild(btn);
        } else {
          linkedIds.forEach(cId => {
            const btn = document.createElement("button");
            btn.className = "btn btn-cyan";
            btn.style.cssText = "padding:6px 12px; font-size:12px; font-weight:700;";
            btn.innerText = `📖 Sheet: ${cId.replace(/^top_/, '').replace(/_/g, ' ')}`;
            btn.onclick = () => openCompendiumToSheet(cId, q.subject, q.chapter);
            pillsWrap.appendChild(btn);
          });
        }
      }
    } else if (conceptBridgeBox) {
      conceptBridgeBox.style.display = "none";
    }

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
              ${isCor ? '✓ CORRECT (+2.0)' : (isAtt ? '✗ INCORRECT (-0.5)' : '⚪ UNATTEMPTED (0.0)')}
            </span>
            <span style="font-family:var(--font-mono); color:var(--text-muted);">${resp.timeSpentSec || 0}s spent</span>
          </div>
          ${resp.decisionTrail && resp.decisionTrail.length > 0 ? `
            <div style="margin-top:6px; color:var(--accent-cyan); font-size:11px;">
              <b>Hesitation Trail:</b> ${resp.decisionTrail.map(d => `Opt ${d.opt} (${d.atSec}s)`).join(' ➔ ')}
            </div>
          ` : ''}
          ${resp.isPanicSlip ? `<div style="margin-top:4px; color:var(--status-red); font-size:11px; font-weight:700;">⚠️ Detected as Panic Slip (&lt;8s solve under end-of-section pressure).</div>` : ''}
          ${resp.errorTag && resp.errorTag !== 'UNCLASSIFIED' && resp.errorTag !== 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:#f87171; font-size:11px;"><b>Active Classification:</b> #${resp.errorTag}</div>` : ''}
          ${resp.errorTag === 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:var(--status-green); font-size:11px;"><b>Tag Cleared:</b> Valid Calculated Risk / Speed Move</div>` : ''}
        </div>
      `;

      solutionBlock.style.display = "block";
      const currentTag = resp.errorTag || "UNCLASSIFIED";

      let optionsHtml = `
        <option value="UNCLASSIFIED" ${currentTag==='UNCLASSIFIED'?'selected':''}>Override Mistake Tag...</option>
        <option value="VALID_CALCULATED_RISK" ${currentTag==='VALID_CALCULATED_RISK'?'selected':''}>✓ Valid Calculated Risk (Clear Trap Penalty)</option>
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
        ${isRev && idx === q.correctIndex ? '<span style="font-size:11px; font-weight:800; color:var(--status-green);">✓ Correct</span>' : ''}
        ${isRev && idx === resp.selectedOption && idx !== q.correctIndex ? '<span style="font-size:11px; font-weight:800; color:var(--status-red);">✗ Your Pick</span>' : ''}
      `;
      container.appendChild(card);
    });

    if (!isRev) activeExam.currentQTimeSpentSec = 0;
  }

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
          tabBtn.innerText = `🔒 ${sec.name.split(" ")[0]}`;
          tabBtn.style.opacity = "0.5";
          tabBtn.style.cursor = "not-allowed";
        } else if (isLocked && sIdx > activeExam.activeSectionIndex) {
          tabBtn.innerText = `⏳ ${sec.name.split(" ")[0]}`;
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
    safeSetText("mini-player-sub", `${q && q.sectionName ? q.sectionName.split(' ')[0] : 'Exam'} • Q${q ? (q.globalNumber || 1) : 1}`);
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

    await putRecord("store_attempts", activeExam);

    safeSetDisplay("exam-arena", "none");
    await renderDashboard();
    openMockReview(activeExam);
  }

  async function compileAndLaunchArena(title, questionsPool, durationMin, isSectionLocked = false, customSections = null) {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    let configuredSections = [];
    let flattenedQuestions = [];
    let globalCounter = 1;

    if (customSections && Array.isArray(customSections) && customSections.length > 0) {
      // Preserve custom sectional timers
      configuredSections = customSections;
      flattenedQuestions = questionsPool;
    } else {
      const rawSections = {};
      questionsPool.forEach((q) => {
        const sKey = (q.sectionIndex !== undefined && q.sectionName) 
          ? `${q.sectionIndex}_${q.sectionName}` 
          : `sub_${q.subject || 'GEN'}`;
        if (!rawSections[sKey]) {
          rawSections[sKey] = {
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
      sessionId: "cgl_mock_" + now,
      parentSessionId: null,
      attemptNumber: 1,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: title || "AI Practice Arena",
      mockType: configuredSections.length > 1 ? "CUSTOM" : "SECTIONAL",
      isSectionLocked: !!isSectionLocked,
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

  /* ==========================================================================
   * SECTION 21: CONSOLE COMMAND BUS & BIDIRECTIONAL AI ENGINE
   * ========================================================================== */
  const COMMAND_REGISTRY = {
    // 1. Symmetrical Mock Generator & Assembly
    CREATE_MOCK: async (payload) => {
      let instance;

      if (Array.isArray(payload.sections) && payload.sections.length > 0) {
        // Multi-section queue mock with per-section configuration
        const allQuestions = await getAllRecords("store_questions");
        let sections = [];
        let flattened = [];
        let globalCounter = 1;

        for (let sIdx = 0; sIdx < payload.sections.length; sIdx++) {
          const secConf = payload.sections[sIdx];
          let pool = allQuestions.filter(q => q.subject === secConf.subject);

          if (Array.isArray(secConf.chapters) && secConf.chapters.length > 0) {
            pool = pool.filter(q => secConf.chapters.includes(q.chapter));
          }

          if (pool.length === 0) pool = allQuestions.filter(q => q.subject === secConf.subject);

          const shuffled = MockService.shuffle([...pool]);
          const selected = shuffled.slice(0, Math.min(secConf.count || 25, shuffled.length));

          const secObj = {
            id: `SEC_${sIdx + 1}_${secConf.subject}`,
            subject: secConf.subject,
            name: `${TAXONOMY[secConf.subject] ? TAXONOMY[secConf.subject].name : secConf.subject} (Sec ${sIdx + 1})`,
            durationSec: (secConf.durationMin || 15) * 60,
            questionCount: selected.length,
            locked: false
          };
          sections.push(secObj);

          selected.forEach((q, qIdx) => {
            flattened.push({
              ...q,
              sectionIndex: sIdx,
              sectionName: secObj.name,
              localNumber: qIdx + 1,
              globalNumber: globalCounter++
            });
          });
        }

        instance = {
          title: payload.title || "AI Multi-Section Routine",
          durationMin: payload.sections.reduce((a, b) => a + (b.durationMin || 15), 0),
          isSectionLocked: !!payload.isSectionLocked,
          questions: flattened,
          sections: sections,
          totalSelected: flattened.length
        };
      } else {
        instance = await MockService.generate(payload.selection || payload);
      }

      let savedRecord = null;
      if (payload.saveAsPreset || payload.saveBlueprint) {
        savedRecord = await MockService.saveMockDefinition({
          title: payload.title || instance.title,
          type: "FIXED_PAPER",
          isSectionLocked: instance.isSectionLocked,
          sections: instance.sections || [{ id: 1, subject: "QA", count: instance.totalSelected, durationMin: instance.durationMin }],
          questions: instance.questions
        });
      }

      if (payload.launchImmediately) {
        if (instance.sections) {
          await compileAndLaunchArena(instance.title, instance.questions, instance.durationMin, instance.isSectionLocked, instance.sections);
        } else {
          await MockService.launchMockSession(instance);
        }
      }

      return {
        mockId: savedRecord ? savedRecord.id : `instance_${Date.now()}`,
        title: instance.title,
        questionCount: instance.totalSelected,
        questionIds: instance.questions.map(q => q.id),
        launched: !!payload.launchImmediately
      };
    },

    // 2. Complete Passage & Ephemeral Ingestion
    INGEST_AND_ASSEMBLE_COMPLETE_MOCK: async (payload) => {
      const {
        title = "Curated Practice Mock",
        launchImmediately = false,
        isSectionLocked = false,
        durationMin = 20,
        persistQuestions = true, // Flag for throwaway vs permanent questions
        dossiers = [],
        newQuestions = [],
        orderedMockQuestionIds = []
      } = payload;

      if (dossiers.length > 0) {
        await runTx(["store_concepts"], "readwrite", (tx) => {
          const st = tx.objectStore("store_concepts");
          dossiers.forEach(d => st.put(sanitizeDossier(d)));
        });
      }

      let ingestedNewQuestions = [];
      if (newQuestions.length > 0) {
        ingestedNewQuestions = await QuestionService.bulkCreate(newQuestions, "Curated Paper", persistQuestions);
      }

      const allQs = await getAllRecords("store_questions");
      const searchPool = [...allQs, ...ingestedNewQuestions];
      const resolved = [];

      orderedMockQuestionIds.forEach(id => {
        const found = searchPool.find(q => q.id === id);
        if (found) resolved.push(found);
      });

      const paper = await MockService.saveMockDefinition({
        title: title,
        type: "FIXED_PAPER",
        isSectionLocked: !!isSectionLocked,
        sections: [{ id: 1, subject: resolved[0]?.subject || "QA", count: resolved.length, durationMin: durationMin }],
        questions: resolved
      });

      if (launchImmediately) {
        await MockService.launchMockSession({ title, questions: resolved, durationMin, isSectionLocked });
      }

      return { success: true, mockId: paper.id, questionsCount: resolved.length, ephemeral: !persistQuestions };
    },

    // 3. Persistent AI Insights & Action Plans
    SAVE_AI_INSIGHT: async (payload) => {
      const insight = {
        id: payload.insightId || `insight_${Date.now()}`,
        type: payload.type || "weakness",
        subject: payload.subject || "QA",
        chapter: payload.chapter || "",
        statement: payload.statement || "",
        evidenceIds: Array.isArray(payload.evidenceIds) ? payload.evidenceIds : [],
        confidence: payload.confidence || 0.90,
        status: payload.status || "active",
        recommendedAction: payload.recommendedAction || "",
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      await putRecord("store_ai_consultations", insight);
      return { success: true, insightId: insight.id };
    },

    SAVE_AI_PLAN: async (payload) => {
      const plan = {
        id: payload.planId || `plan_${Date.now()}`,
        goal: payload.goal || "Target Remediation",
        subject: payload.subject || "QA",
        steps: Array.isArray(payload.steps) ? payload.steps : [],
        successCondition: payload.successCondition || "≥80% accuracy",
        status: payload.status || "active",
        createdAt: Date.now()
      };
      await putRecord("store_ai_consultations", plan);
      return { success: true, planId: plan.id };
    },

    GET_AI_CONTEXT: async () => {
      const consultations = await getAllRecords("store_ai_consultations");
      const global = await PerformanceService.calculateGlobalMetrics();
      const weak = await PerformanceService.getWeakChapters();
      const attempts = await PerformanceService.getHistoricalAttempts();

      return {
        timestampIST: formatISTDate(Date.now()),
        globalMetrics: global,
        weakAreas: weak.slice(0, 5),
        completedAttemptsCount: attempts.length,
        persistedConsultations: consultations.slice(-10)
      };
    },

    // 4. Questions & Concepts Management
    SEARCH_QUESTIONS: async (payload) => {
      const res = await SearchService.searchAll(payload.query, payload.filters || payload, payload.limit || 25);
      return { count: res.totalQuestions, results: res.questions };
    },

    SEARCH_CONCEPTS: async (payload) => {
      const res = await SearchService.searchAll(payload.query, payload.filters || payload, payload.limit || 25);
      return { count: res.totalConcepts, results: res.concepts };
    },

    CREATE_QUESTION: async (payload) => {
      const q = await QuestionService.create(payload.question || payload, payload.persistQuestions ?? true);
      return { created: true, id: q.id, question: q };
    },

    UPDATE_QUESTION: async (payload) => {
      const q = await QuestionService.update(payload.id, payload.updates || payload);
      return { updated: true, id: q.id };
    },

    DELETE_QUESTION: async (payload) => {
      return await QuestionService.delete(payload.id);
    },

    CREATE_CONCEPT: async (payload) => {
      const c = await ConceptService.create(payload.concept || payload);
      return { created: true, id: c.id };
    },

    UPDATE_CONCEPT: async (payload) => {
      const c = await ConceptService.update(payload.id, payload.updates || payload);
      return { updated: true, id: c.id };
    },

    DELETE_CONCEPT: async (payload) => {
      const ok = await ConceptService.delete(payload.id);
      return { deleted: ok, id: payload.id };
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

    DELETE_MOCK: async (payload) => {
      return await MockService.deleteMock(payload.mockId);
    },

    RAW_DB_OPERATION: async (payload) => {
      const { store, operation, key, record, confirmationToken } = payload;
      const allowedStores = [
        "store_questions", "store_concepts", "store_flashcards",
        "store_notes", "store_saved_mocks", "store_ai_consultations", "store_config"
      ];
      if (!allowedStores.includes(store)) throw new Error(`Disallowed store: ${store}`);

      if (operation === "CLEAR") {
        if (confirmationToken !== "CONFIRM_DESTROY_STORE") {
          throw new Error("Destructive operation blocked: Missing confirmationToken.");
        }
        await clearStore(store);
        return { success: true, operation: "CLEAR", store };
      } else if (operation === "PUT") {
        await putRecord(store, record);
        return { success: true, operation: "PUT", store };
      } else if (operation === "DELETE") {
        await deleteRecordFromStore(store, key);
        return { success: true, operation: "DELETE", store, key };
      }
      throw new Error(`Unsupported raw operation: ${operation}`);
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

      SearchService.invalidate();
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
        alert("Command Execution Notice: " + execErr.message);
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
          persistQuestions: true,
          isSectionLocked: false,
          durationMin: 15,
          newQuestions: [
            {
              id: "q_sample_pipe_cycle_01",
              subject: "QA",
              chapter: "QA_PIPE_CISTERN",
              subtopic: "Pipes & Cisterns",
              method: "Alternating Work",
              questionText: "Pipe $A$ fills in $10\\text{ h}$, $B$ in $12\\text{ h}$, and $C$ empties in $15\\text{ h}$. Opened alternately for $1\\text{ h}$ ($A \\to B \\to C$). In how many hours will the tank be full?",
              options: ["$24\\text{ h } 10\\text{ m}$", "$25\\text{ h } 15\\text{ m}$", "$23\\text{ h } 40\\text{ m}$", "$26\\text{ h }$"],
              correctIndex: 0,
              explanation: "Net 3-hour cycle $= 6 + 5 - 4 = 7\\text{ units}$."
            }
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
   * SECTION 22: UNIVERSAL 360° DATA EXPORTS & LEDGERS
   * ========================================================================== */
  async function exportUnifiedAiHandoffPackage() {
    const now = Date.now();
    const allAttempts = await getAllRecords("store_attempts");
    const allQuestions = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
    const allFlashcards = await getAllRecords("store_flashcards");
    const consultations = await getAllRecords("store_ai_consultations");
    const metrics = await PerformanceService.calculateGlobalMetrics();
    const weakAreas = await PerformanceService.getWeakChapters();

    const masterPackage = {
      cgl_os_master_handoff: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        schemaVersion: DB_VERSION,
        generatedAtEpoch: now,
        generatedAtIST: formatISTDate(now),
        candidate: "Ankit Kumar",
        targetExam: "SSC CGL 2026 Tier 1 & Tier 2 Master Preparation"
      },
      candidateDiagnostics: {
        globalMetrics: metrics,
        identifiedWeakAreas: weakAreas,
        consultationMemory: consultations
      },
      questionTopology: {
        totalQuestions: allQuestions.length,
        masterBank: sortQuestionsHierarchical(allQuestions)
      },
      knowledgeSheets: allConcepts,
      flashcardVault: allFlashcards,
      historicalAttempts: allAttempts.filter(a => a.completed)
    };

    await downloadFileSafe(masterPackage, `cgl_ai_master_handoff_package_${now}.json`);
  }

  async function exportGlobalMasterDossier() {
    await exportDossierInternal("ALL", "ALL", "ALL", "HYBRID_CSV", true);
  }

  async function exportScopedForensicDossier() {
    const sub = document.getElementById("scoped-export-subject")?.value || "ALL";
    const timeframe = document.getElementById("scoped-export-timeframe")?.value || "15D";
    const filter = document.getElementById("scoped-export-filter")?.value || "ALL";
    const encoding = document.getElementById("scoped-export-encoding")?.value || "HYBRID_CSV";
    await exportDossierInternal(sub, timeframe, filter, encoding, false);
  }

  async function exportDossierInternal(sub, timeframe, filter, encoding, isGlobalMaster = false) {
    const allAttempts = await getAllRecords("store_attempts");
    const consultations = await getAllRecords("store_ai_consultations");
    const now = Date.now();
    let cutoff = 0;
    if (timeframe === "7D") cutoff = now - (7 * 24 * 60 * 60 * 1000);
    else if (timeframe === "15D") cutoff = now - (15 * 24 * 60 * 60 * 1000);
    else if (timeframe === "30D") cutoff = now - (30 * 24 * 60 * 60 * 1000);

    const filteredAttempts = allAttempts.filter(a => a.completed && a.timestamp >= cutoff);
    const telemetryRows = [];

    filteredAttempts.forEach(att => {
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          if (sub === "ALL" || q.subject === sub) {
            const resp = att.userResponses[q.id];
            if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
              telemetryRows.push({
                mockId: att.sessionId,
                mockIST: att.timeIST || formatISTDate(att.timestamp),
                slot: att.diurnalSlot || getDiurnalSlot(att.timestamp),
                qId: q.id,
                subject: q.subject,
                chapter: q.chapter,
                passageSet: q.parentPassageId || null,
                sel: resp.selectedOption,
                cor: q.correctIndex,
                t: resp.timeSpentSec || 0,
                sw: resp.switches || 0,
                tag: resp.errorTag || "UNCLASSIFIED"
              });
            }
          }
        });
      }
    });

    const dossierEnvelope = {
      manifest: {
        engine: "SSC_CGL_INTELLIGENCE_OS",
        version: DB_VERSION,
        exportedAtIST: formatISTDate(now),
        scope: isGlobalMaster ? "GLOBAL_360_MASTER_DOSSIER" : `${sub}_${timeframe}_${filter}`
      },
      consultationsLedger: consultations,
      telemetry: telemetryRows
    };

    const fileName = isGlobalMaster 
      ? `cgl_master_forensic_dossier_360_${now}.json`
      : `cgl_forensic_dossier_${sub}_${timeframe}_${now}.json`;

    await downloadFileSafe(dossierEnvelope, fileName);
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

    await downloadFileSafe(sanitized, `cgl_master_bank_ledger_${Date.now()}.json`);
    const m = document.getElementById("modal-ledger-export");
    if (m) m.classList.remove("active");
  }

  async function downloadLedgerMarkdown() {
    const allQs = await getAllRecords("store_questions");
    const sorted = sortQuestionsHierarchical(allQs);

    let txt = `# SSC CGL MASTER QUESTION BANK REFERENCE LEDGER\nGenerated: ${formatISTDate(Date.now())}\nTotal Questions: ${sorted.length}\n\n`;
    let curSubject = "";
    let curChapter = "";

    sorted.forEach((q, idx) => {
      if (q.subject !== curSubject) {
        curSubject = q.subject;
        txt += `\n=== SUBJECT: ${TAXONOMY[curSubject] ? TAXONOMY[curSubject].name : curSubject} (${curSubject}) ===\n\n`;
      }
      if (q.chapter !== curChapter) {
        curChapter = q.chapter;
        txt += `--- CHAPTER: ${curChapter} ---\n\n`;
      }

      txt += `[RECORD ${idx + 1}] ID: ${q.id} | TOPIC: ${q.subtopic || 'General'} | METHOD: ${q.method || 'General'}\n`;
      if (q.parentPassageId && q.passageText) {
        txt += `PASSAGE CONTEXT [${q.parentPassageId}]: ${q.passageText}\n`;
      }
      txt += `QUESTION: ${q.questionText}\n`;
      q.options.forEach((opt, oIdx) => {
        txt += `  (${oIdx + 1}) ${opt}\n`;
      });
      txt += `CORRECT: Option ${q.correctIndex + 1}\n`;
      txt += `EXPLANATION: ${q.explanation || 'None'}\n\n`;
    });

    await downloadFileSafe(txt, `cgl_master_bank_gem_pack_${Date.now()}.txt`, "text/plain");
    const m = document.getElementById("modal-ledger-export");
    if (m) m.classList.remove("active");
  }

  async function exportKnowledgeBankJson() {
    const concepts = await ConceptService.getAll();
    const now = Date.now();
    await downloadFileSafe({ concepts }, `cgl_knowledge_compendium_${now}.json`);
  }

  async function exportFlashcardVaultJson() {
    const cards = await getAllRecords("store_flashcards");
    const now = Date.now();
    await downloadFileSafe({ cards }, `cgl_flashcard_vault_${now}.json`);
  }

  async function exportCurrentSelectedStoreJson() {
    const storeName = document.getElementById("db-store-select")?.value;
    if (!storeName) return;
    const records = await getAllRecords(storeName);
    const now = Date.now();
    await downloadFileSafe({ store: storeName, records }, `cgl_dump_${storeName}_${now}.json`);
  }

  function exportCurrentReviewMockJson() {
    if (!activeReviewAttempt) return;
    downloadFileSafe(activeReviewAttempt, `cgl_mock_${activeReviewAttempt.sessionId}_${Date.now()}.json`);
  }

  async function exportMockByIdJson(sessionId) {
    const attempts = await getAllRecords("store_attempts");
    const target = attempts.find(a => a.sessionId === sessionId);
    if (target) {
      downloadFileSafe(target, `cgl_mock_${sessionId}_${Date.now()}.json`);
    }
  }

  /* ==========================================================================
   * SECTION 23: PRACTICE LAB, VAULT, DOJO & COMPENDIUM ROUTINES
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
    if (checked) practiceSelectedIds.add(id);
    else practiceSelectedIds.delete(id);
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
        const inPassage = String(q.passageText || "").toLowerCase().includes(practiceSearchQuery);
        const inMethod = (q.method || "").toLowerCase().includes(practiceSearchQuery);
        if (!inId && !inText && !inPassage && !inMethod) return false;
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
      container.innerHTML = `<div style="text-align:center; padding:40px 14px; color:var(--text-muted); font-size:12.5px;">No questions match current criteria.</div>`;
      return;
    }

    pagedSlice.forEach(q => {
      const isChecked = practiceSelectedIds.has(q.id);
      const card = document.createElement("div");
      card.className = "practice-q-card" + (isChecked ? " selected" : "");
      card.dataset.id = q.id;

      let passageBadge = "";
      if (q.parentPassageId) {
        passageBadge = `<span class="badge" style="background:#8957e5;">Passage Set (${q.setOrder || 1}/${q.setTotal || 1})</span>`;
      }

      card.innerHTML = `
        <input type="checkbox" class="practice-checkbox" data-id="${q.id}" ${isChecked ? 'checked' : ''} onchange="CGL_OS.togglePracticeQuestionSelection('${q.id}', this.checked)">
        <div class="practice-q-main">
          <div class="practice-q-header">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="practice-q-id">${q.id}</span>
              <span class="badge" style="background:#1f6feb;">${q.subject} • ${q.chapter}</span>
              ${passageBadge}
            </div>
            <div class="practice-q-actions">
              <button class="btn btn-secondary" style="padding:2px 6px; font-size:10px;" onclick="CGL_OS.QuestionService.get('${q.id}').then(q => CGL_OS.openEditQuestionModal(q))">Edit</button>
              <button class="btn btn-cyan" style="padding:2px 8px; font-size:10px; font-weight:700;" onclick="CGL_OS.launchSingleQuestionPractice('${q.id}')">⚡ Solve</button>
            </div>
          </div>
          <div class="practice-q-stem" id="stem-${q.id}">${formatRichText(q.questionText)}</div>
          <button type="button" class="practice-q-expand-btn" onclick="document.getElementById('stem-${q.id}').classList.toggle('expanded'); this.innerText = this.innerText === 'Show More ▼' ? 'Show Less ▲' : 'Show More ▼';">Show More ▼</button>
          <div class="practice-q-footer">
            <span>Method: <b>${q.method || q.subtopic || 'General'}</b></span>
            <span>Source: <i>${q.source || 'Manual'}</i></span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  async function launchSingleQuestionPractice(id) {
    const q = await QuestionService.get(id);
    if (!q) return;

    // Close any modal that launched this practice (avoids z-index overlaps)
    document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));

    // If passage question, pull full sibling set for proper context
    if (q.parentPassageId) {
      const allQs = await getAllRecords("store_questions");
      const passageGroup = allQs
        .filter(item => item.parentPassageId === q.parentPassageId)
        .sort((a, b) => (a.setOrder || 0) - (b.setOrder || 0));
      await compileAndLaunchArena(`Passage Drill: ${q.chapter}`, passageGroup, Math.max(5, passageGroup.length * 2), false);
    } else {
      await compileAndLaunchArena(`Focus Drill: ${q.chapter}`, [q], 5, false);
    }
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

  // --- Untimed Dojo Arena ---
  function exitDojoArena() {
    safeSetDisplay("dojo-arena-view", "none");
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

    const grid = document.createElement("div");
    grid.className = "palette-grid";
    dojoExam.questions.forEach((q, idx) => {
      const resp = dojoExam.userResponses[q.id];
      const cell = document.createElement("div");
      cell.className = "palette-cell" +
        (resp.status === "answered" ? " answered" : " unanswered") +
        (idx === dojoExam.currentIndex ? " current" : "");
      cell.innerText = idx + 1;
      cell.onclick = () => {
        dojoExam.currentIndex = idx;
        toggleDojoPalette(false);
        renderDojoArenaQuestion();
      };
      grid.appendChild(cell);
    });
    scrollBody.appendChild(grid);
  }

  function renderDojoArenaQuestion() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    const resp = dojoExam.userResponses[q.id];

    safeSetText("dojo-arena-title", dojoExam.title);
    safeSetText("dojo-arena-chap-badge", q.chapter);
    safeSetText("dojo-arena-method-badge", q.method || q.subtopic || "General");
    safeSetText("dojo-arena-qnum", dojoExam.currentIndex + 1);
    safeSetText("dojo-arena-total-tag", `Question ${dojoExam.currentIndex + 1} of ${dojoExam.questions.length}`);

    // Passage in Dojo
    const passageBox = document.getElementById("dojo-passage-box");
    if (passageBox) {
      if (q.parentPassageId && q.passageText) {
        passageBox.style.display = "block";
        passageBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span class="q-passage-tag">Reading Context</span>
            <span style="font-size:10px; font-family:var(--font-mono); color:var(--accent-cyan); font-weight:700;">Set Q${q.setOrder || 1}/${q.setTotal || 1}</span>
          </div>
          <div>${formatRichText(q.passageText)}</div>
        `;
      } else {
        passageBox.style.display = "none";
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
      }
    }

    const mb = document.getElementById("dojo-arena-method-box");
    if (mb) {
      mb.style.display = resp.revealed ? "block" : "none";
      mb.innerHTML = `<strong>Method & Derivation:</strong><br>${formatRichText(q.explanation || 'No method registered.')}`;
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

      card.innerHTML = `<span style="font-weight:700; color:var(--text-muted);">${idx + 1}.</span><div style="flex:1;">${formatRichText(optText)}</div>`;
      card.onclick = () => {
        resp.selectedOption = idx;
        resp.status = "answered";
        renderDojoArenaQuestion();
      };
      optContainer.appendChild(card);
    });
  }

  // --- Flashcard Vault Carousel (Double Image Leak Fixed) ---
  function flipStudyFlashcard() {
    if (activeVaultFlipped) return;
    const card = activeVaultDeck[activeVaultIndex];
    if (!card) return;

    activeVaultFlipped = true;

    // Hide front image to avoid dual-image overlap
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

  // --- Living Knowledge Studio ---
  async function openCompendiumToSheet(conceptId, targetSub, targetChap) {
    document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));

    let item = null;
    if (conceptId) item = await ConceptService.get(conceptId);
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
            <h3 style="font-size:16px; margin-bottom:8px; color:#fff;">No Sheets in ${activeCompChapter}</h3>
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
        tab.onclick = () => {
          activeCompSheetIndex = idx;
          renderActiveCompSheet();
        };
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
    safeSetText("comp-studio-header-sub", `${sheet.chapter} • Sheet ${activeCompSheetIndex + 1} of ${currentCompSheets.length}`);

    const linkedQs = await ConceptService.getLinkedQuestions(sheet.id, sheet.chapter);
    safeSetText("comp-linked-q-count", `${linkedQs.length} Associated Questions Linked`);

    const toc = ConceptService.generateTOC(sheet.content);
    let tocHtml = "";
    if (toc.length > 0) {
      tocHtml = `
        <div class="sheet-toc-pill-wrap">
          <span style="font-size:10px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase; align-self:center;">Jump to:</span>
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
      imgHtml = `<div style="text-align:center; margin:16px 0;"><img src="${sheet.imageUrl}" style="max-height:280px; max-width:100%; border-radius:8px;"></div>`;
    }

    const docContent = document.getElementById("comp-studio-doc-content");
    if (docContent) {
      docContent.innerHTML = `
        <div style="border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:14px;">
          <span class="badge" style="background:#1f6feb;">${sheet.chapter}</span>
          <h1 style="font-size:22px; font-weight:800; color:#fff; margin-top:8px;">${sheet.title}</h1>
          ${sheet.subtitle ? `<div style="font-size:13px; color:var(--accent-cyan);">${sheet.subtitle}</div>` : ''}
        </div>
        ${tocHtml}
        ${imgHtml}
        <div style="font-size:14.5px; line-height:1.75; color:var(--text-main);">${formatRichText(sheet.content)}</div>
      `;
    }
  }

  /* ==========================================================================
   * SECTION 24: INITIALIZATION & EVENT HOOKS
   * ========================================================================== */
  function switchTab(tId, btn) {
    document.querySelectorAll(".view-container").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));

    const targetEl = document.getElementById(tId);
    if (targetEl) targetEl.classList.add("active");

    const targetNavBtn = btn || document.getElementById(`nav-btn-${tId}`);
    if (targetNavBtn) targetNavBtn.classList.add("active");

    if (tId === "tab-dashboard") renderDashboard();
    if (tId === "tab-dojo") renderPracticeQuestionsTable();
    if (tId === "tab-console") refreshDbInspector();
    if (tId === "tab-vault") renderVault();
  }

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

    const practiceSub = document.getElementById("practice-filter-subject");
    if (practiceSub) handlePracticeSubjectChange(practiceSub.value);
    const builderSub = document.getElementById("builder-subject");
    if (builderSub) updateBuilderChapters(builderSub.value);
  }

  async function initializeApplication() {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");

    try {
      await getDB();
      await initStudyTelemetryTracker(); // Start engagement telemetry
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await renderVault();

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

  /* ==========================================================================
   * SECTION 25: COMPLETE PUBLIC API REGISTRATION
   * Cleaned of undefined variables (applyBlueprintPreset ReferenceError fixed)
   * ========================================================================== */
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

    // Practice Lab
    handlePracticeSearchInput,
    handlePracticeSubjectChange,
    setPracticeQuickFilter,
    togglePracticeQuestionSelection,
    selectAllVisiblePractice,
    renderPracticeQuestionsTable,
    navPracticePage,
    launchPracticeSelectedSession,
    buildMockFromPracticeSelection,
    launchSingleQuestionPractice,

    // Question GUI Creator & Editor
    openNewQuestionCreatorModal,
    handleNewQuestionImageUpload,
    submitNewQuestionCreator,
    openEditQuestionModal,
    openEditCurrentDojoQuestion: () => {},
    handleQuestionImageUpload: () => {},
    saveQuestionEditor: () => {},
    duplicateCurrentEditingQuestion: () => {},
    duplicateCurrentEditingQuestionFromId: (id) => QuestionService.duplicate(id),
    deleteCurrentEditingQuestion: () => {},

    // Mock Lab & Multi-Chapter Builder
    setMockStrategy,
    updateBuilderChapters,
    selectAllBuilderChips,
    updateBuilderPoolEstimate,
    previewMockSelection,
    openCustomMockModal,
    addCustomSectionRow,
    removeCustomSectionRow,
    updateCustomRowSubject,
    updateCustomRowCount,
    updateCustomRowDuration,
    updateCustomRowChapters,
    openSaveBlueprintModal: (mode, id) => {},
    saveCurrentPresetAction: () => {},
    launchSavedPreset: (id) => getRecord("store_saved_mocks", id).then(MockService.launchMockSession),
    deleteSavedPreset: (id) => MockService.deleteMock(id).then(renderDashboardBlueprints),
    launchConfiguredMock,

    // Exam Arena
    requestEndSectionEarly,
    confirmEndSectionEarly,
    resumeFromMiniPlayer,
    reattemptMock: (id) => {},
    enterFullScreenReviewArena: () => {},
    exitReviewArena: () => {},
    toggleExamPalette,

    // Living Knowledge Studio
    openCompendiumStudio,
    closeCompendiumStudio,
    openCompendiumToSheet,
    handleCompStudioSubjectChange,
    handleCompStudioChapterChange,
    renderCompStudioSheets,
    renderActiveCompSheet,
    autoSaveCompScratchpad: () => {},
    deleteCurrentCompendiumSheet: () => {},
    promptCreateNewChapter: () => {},
    insertDossierSnippet: () => {},
    launchCurrentSheetQuestionsDrill: () => {},
    openConceptEditorModal: () => {},
    handleConceptImageUpload: () => {},
    saveConceptCard: () => {},

    // Research & Omni-Search
    openOmniResearchForCurrentQuestion: () => {},
    openOmniResearchForDojoQuestion: () => {},
    openOmniSearchModal: () => {},
    executeOmniSearch: () => {},
    openGlobalSearchModal: () => {},
    handleGlobalSearchInput: () => {},

    // Synapse Explorer
    openSynapseGraphModal: () => {},
    setSynapseLevel: () => {},

    // Untimed Dojo
    exitDojoArena,
    navDojoArena,
    toggleDojoMethod,
    autoSaveDojoAnnotation,
    toggleDojoPalette,

    // Review, Diagnostics & History
    openMockReview: (att) => {},
    switchReviewAttempt: (id) => {},
    handleMistakeTagSelect: (qId, val) => {},
    setMistakeTag: (qId, tag) => {},
    openTrapClinicModal: (tag) => {},
    drillFilteredTrapQuestions: () => {},
    openSubjectDiagnosticModal: (sub) => {},
    openHistoryArchiveModal: () => {},
    renderArchiveList: () => {},
    deleteAttemptSession: () => {},

    // Taxonomy Management
    openTaxonomyManagerModal: () => {},
    addNewSubjectAction: () => {},
    promptAddChapterToSubject: () => {},
    deleteChapterFromSubject: () => {},
    openChapterMergeModal: () => {},
    deleteSubjectAction: () => {},
    syncEditorChapterDropdown: () => {},
    syncFlashcardChapterDropdown: () => {},

    // Flashcard Vault
    renderVault: () => {},
    handleVaultSearchInput: () => {},
    renderFlashcardList: () => {},
    launchUntimedQuickCarousel: () => {},
    flipStudyFlashcard,
    navStudyCard: () => {},
    openAnkiExportModal: () => {},
    generateAndDownloadAnkiTsv: () => {},
    openFlashcardEditorModal: () => {},
    handleFlashcardFrontImageUpload: () => {},
    handleFlashcardBackImageUpload: () => {},
    saveFlashcardEditor: () => {},
    deleteCurrentEditingFlashcard: () => {},
    wipeFlashcardStore: () => clearStore("store_flashcards"),

    // Publishing Print Engine
    openPrintConfigModal: () => {},
    handlePrintTypeChange: () => {},
    updatePrintChapters: () => {},
    generateAndPrintSheet: () => {},

    // AI Console & Backup / Recovery
    executeConsoleCommand,
    loadSamplePayload,
    copyLiveSystemManifestToClipboard: () => {},
    openAiExportModal: () => {},
    updateAiExportPreview: () => {},
    copyAiExportToClipboard: () => {},
    openMasterLedgerExportModal: () => {},
    downloadLedgerJson,
    downloadLedgerMarkdown,
    exportCleanMarkdownFlashcards: () => {},
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
    refreshDbInspector: () => {},
    copyInspectedJsonToClipboard: () => {},
    copyFallbackPayloadToClipboard,
    wipeTestAttempts: () => clearStore("store_attempts"),
    factoryResetAll: () => {},
    renderDashboard,
    launchWeakAreasClinic,
    launchContinueTrainingDrill
  };
})();

// Re-bind to global window anchor
window.CGL_OS = CGL_OS;
