/**
 * SSC CGL Intelligence OS - Core Engine
 * Master Application Controller (Part 1 of 2)
 * Schema Version: 13 | Dual-Temporal IST + Clone-Safe Persistence + Dynamic Sections
 */

// Global window anchor registration
window.CGL_OS = null;

const CGL_OS = (() => {
  const DB_NAME = "cgl_os_db";
  const DB_VERSION = 13;
  let db = null;
  let dbInitPromise = null;

  // Active Runtime Execution State
  let activeExam = null;
  let examTimerInterval = null;
  let questionTimerInterval = null;
  let dojoExam = null;
  let activeReviewAttempt = null;

  // Full-Screen Living Compendium Studio State
  let activeCompSubject = "QA";
  let activeCompChapter = "QA_GEOMETRY";
  let activeCompSheetIndex = 0;
  let currentCompSheets = [];
  let currentConceptImageBase64 = "";

  // Two-Sided Image Flashcard Editor State
  let currentFcFrontImgBase64 = "";
  let currentFcBackImgBase64 = "";

  // Responsive Synapse DOM Tree State
  let synapseExpandedNodes = new Set(["root", "sub_QA", "sub_REAS", "sub_ENG", "sub_GA"]);

  // Disaster Recovery Hydration State
  let pendingHydrationData = null;

  // Custom Mistake Tags State
  let customMistakeTags = [
    "CALCULATION_SLIP",
    "READING_TRAP",
    "FORMULA_AMNESIA",
    "CONCEPT_VOID",
    "RUSHED_PANIC",
    "TIME_TRAP_Q4",
    "SECOND_GUESS_BLUNDER"
  ];

  // Default Invariable Taxonomy Baseline
  const DEFAULT_TAXONOMY = {
    QA: {
      name: "Quantitative Aptitude",
      weight: 25,
      chapters: [
        "QA_NUM_SYS", "QA_PERCENTAGE", "QA_PROFIT_LOSS", "QA_SI_CI",
        "QA_RATIO_PROP", "QA_TIME_WORK", "QA_SPEED_DIST", "QA_ALGEBRA",
        "QA_GEOMETRY", "QA_MENSURATION", "QA_TRIGONOMETRY"
      ]
    },
    REAS: {
      name: "General Intelligence & Reasoning",
      weight: 25,
      chapters: [
        "REAS_ANALOGY", "REAS_SERIES", "REAS_CODING", "REAS_BLOOD_REL",
        "REAS_SYLLOGISM", "REAS_ORDER_RANK", "REAS_FIGURES", "REAS_DICE_CUBE"
      ]
    },
    ENG: {
      name: "English Comprehension",
      weight: 25,
      chapters: [
        "ENG_SYN_ANT", "ENG_OWS", "ENG_IDIOMS", "ENG_SPOTTING",
        "ENG_IMPROVE", "ENG_ACTIVE_PASS", "ENG_DIRECT_INDR", "ENG_CLOZE_TEST",
        "ENG_READING_COMP"
      ]
    },
    GA: {
      name: "General Awareness",
      weight: 25,
      chapters: [
        "GA_POLITY", "GA_HISTORY_MOD", "GA_HISTORY_ANC", "GA_GEOGRAPHY_IN",
        "GA_ECONOMY", "GA_PHYSICS", "GA_CHEMISTRY", "GA_BIOLOGY", "GA_CA_ANNUAL"
      ]
    }
  };

  let TAXONOMY = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY));

  // Foundational Question Bank
  const SEED_QUESTIONS = [
    {
      id: "q_cgl_ga_polity_014",
      subject: "GA",
      chapter: "GA_POLITY",
      subtopic: "Judiciary",
      method: "Constitutional Articles",
      conceptId: "top_ga_polity_judiciary",
      questionText: "Which Article of the Constitution of India provides for the establishment and constitution of the Supreme Court of India?",
      imageUrl: "",
      options: ["Article 124", "Article 131", "Article 214", "Article 143"],
      correctIndex: 0,
      explanation: "Article 124 of the Constitution establishes the Supreme Court of India and governs its composition, appointment of judges, and operational rules.",
      tags: ["Polity", "SupremeCourt"],
      annotation: ""
    },
    {
      id: "q_cgl_qa_geom_011",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      subtopic: "Circles",
      method: "Cyclic Quadrilateral Angles",
      conceptId: "top_qa_geo_circles",
      questionText: "In a cyclic quadrilateral $ABCD$, opposite angles $\\angle A$ and $\\angle C$ satisfy $\\angle A = (2x + 10)^\\circ$ and $\\angle C = (3x + 20)^\\circ$. What is the measure of $\\angle A$?",
      imageUrl: "",
      options: ["$60^\\circ$", "$70^\\circ$", "$80^\\circ$", "$75^\\circ$"],
      correctIndex: 1,
      explanation: "Opposite angles sum to $180^\\circ$: $(2x + 10) + (3x + 20) = 180 \\implies 5x + 30 = 180 \\implies 5x = 150 \\implies x = 30^\\circ$. Therefore, $\\angle A = 2(30) + 10 = 70^\\circ$.",
      tags: ["Geometry", "CyclicQuadrilateral"],
      annotation: ""
    },
    {
      id: "q_cgl_qa_tw_010",
      subject: "QA",
      chapter: "QA_TIME_WORK",
      subtopic: "Pipes & Cisterns",
      method: "Combined Rate of Flow",
      conceptId: "",
      questionText: "Pipe $A$ fills a tank in $12\\text{ hours}$ and Pipe $B$ fills it in $18\\text{ hours}$. If both are opened simultaneously, in how many hours will the tank be full?",
      imageUrl: "",
      options: ["$7.2\\text{ hours}$", "$7.5\\text{ hours}$", "$8.0\\text{ hours}$", "$6.8\\text{ hours}$"],
      correctIndex: 0,
      explanation: "Combined rate $= \\frac{1}{12} + \\frac{1}{18} = \\frac{5}{36}\\text{ tank/hour}$. Total time $= \\frac{36}{5} = 7.2\\text{ hours}$.",
      tags: ["TimeAndWork", "Pipes"],
      annotation: ""
    },
    {
      id: "q_cgl_reas_analogy_012",
      subject: "REAS",
      chapter: "REAS_ANALOGY",
      subtopic: "Number Analogy",
      method: "n(n + 1) Product Form",
      conceptId: "",
      questionText: "Select the related number: **$14 : 210 :: 18 : \\underline{\\quad ? \\quad}$**",
      imageUrl: "",
      options: ["$324$", "$342$", "$360$", "$306$"],
      correctIndex: 1,
      explanation: "Pattern: $n : n(n + 1)$. Here, $14 \\times 15 = 210$. Similarly, $18 \\times 19 = 342$.",
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
      questionText: "In $\\triangle ABC$, the bisectors of $\\angle B$ and $\\angle C$ intersect at point $I$ inside the triangle. If $\\angle BAC = 68^\\circ$, find the measure of $\\angle BIC$.",
      imageUrl: "",
      options: ["$124^\\circ$", "$136^\\circ$", "$112^\\circ$", "$146^\\circ$"],
      correctIndex: 0,
      explanation: "Incenter formula: $\\angle BIC = 90^\\circ + \\frac{\\angle A}{2} = 90^\\circ + 34^\\circ = 124^\\circ$.",
      tags: ["Geometry", "Incenter"],
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

  // Pre-Seeded Blueprints
  const SEED_SAVED_MOCKS = [
    {
      id: "bp_tier1_standard",
      type: "DYNAMIC_BLUEPRINT",
      title: "Tier 1 Standard Full Mock",
      isSectionLocked: true,
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
      sections: [
        { id: 1, subject: "QA", count: 25, durationMin: 15 }
      ],
      questions: null
    }
  ];

  // Pre-Seeded SM-2 Flashcards with Two-Sided Image Support
  const SEED_FLASHCARDS = [
    {
      id: "fc_qa_geo_001",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      front: "In $\\triangle ABC$ with incenter $I$, what is the formula for $\\angle BIC$ in terms of vertex angle $\\angle A$?",
      frontImageUrl: "",
      back: "$$\\angle BIC = 90^\\circ + \\frac{\\angle A}{2}$$",
      backImageUrl: "",
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now() - 1000,
      lastAttempted: Date.now(),
      tags: ["Formula", "Incenter", "Geometry"]
    },
    {
      id: "fc_qa_geo_002",
      subject: "QA",
      chapter: "QA_GEOMETRY",
      front: "What is the length formula for a Direct Common Tangent ($DCT$) between two circles of radii $r_1, r_2$ and center separation $d$?",
      frontImageUrl: "",
      back: "$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$",
      backImageUrl: "",
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now() - 1000,
      lastAttempted: Date.now(),
      tags: ["Formula", "Circles", "Geometry"]
    },
    {
      id: "fc_ga_pol_001",
      subject: "GA",
      chapter: "GA_POLITY",
      front: "Which Article establishes and constitutes the Supreme Court of India?",
      frontImageUrl: "",
      back: "**Article 124** of the Constitution of India.",
      backImageUrl: "",
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now() - 1000,
      lastAttempted: Date.now(),
      tags: ["Polity", "Articles", "Judiciary"]
    },
    {
      id: "fc_eng_ows_001",
      subject: "ENG",
      chapter: "ENG_OWS",
      front: "One-Word Substitution: *'A person who is unable to pay their debts.'*",
      frontImageUrl: "",
      back: "**Insolvent** (or Bankrupt).",
      backImageUrl: "",
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now() - 1000,
      lastAttempted: Date.now(),
      tags: ["Vocabulary", "OWS"]
    }
  ];

  /* -------------------------------------------------------------
   * 1. DUAL-TEMPORAL & INDIAN STANDARD TIME (IST) UTILITIES
   * ------------------------------------------------------------- */
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

  /* -------------------------------------------------------------
   * 2. FORMATTING & COMPRESSION UTILITIES
   * ------------------------------------------------------------- */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Trapping Point:</b> $1</div>');
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
    out = out.replace(/^>\s*\[!tip\]\s*(.*)$/gm, '<div class="callout-box"><b>💡 Tip:</b> $1</div>');

    out = out.replace(/^### (.*$)/gim, '<h3 style="font-size:15px; font-weight:700; color:var(--accent-cyan); margin:10px 0 4px 0;">$1</h3>');
    out = out.replace(/^## (.*$)/gim, '<h2 style="font-size:17px; font-weight:800; color:#fff; margin:12px 0 6px 0;">$1</h2>');
    out = out.replace(/^# (.*$)/gim, '<h1 style="font-size:19px; font-weight:800; color:#fff; margin:14px 0 8px 0;">$1</h1>');
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    out = out.replace(/(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, headerLine, alignLine, bodyLines) => {
      const headers = headerLine.trim().split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = bodyLines.trim().split('\n').map(row => {
        const cells = row.trim().split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    if (window.katex) {
      out = out.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => {
        try { return katex.renderToString(f, { displayMode: true, throwOnError: false }); } catch (e) { return m; }
      });
      out = out.replace(/\$([^\$\n]+?)\$/g, (m, f) => {
        try { return katex.renderToString(f, { displayMode: false, throwOnError: false }); } catch (e) { return m; }
      });
    }
    return out.replace(/\n/g, "<br>");
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
          const maxW = 800;
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* -------------------------------------------------------------
   * 3. LIFO NAVIGATION STACK & ANDROID BACK-GESTURE CONTROLLER
   * ------------------------------------------------------------- */
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

  /* -------------------------------------------------------------
   * 4. INDEXEDDB PERSISTENCE ENGINE (SCHEMA V13 UPGRADE)
   * ------------------------------------------------------------- */
  function getDB() {
    if (db) return Promise.resolve(db);
    if (dbInitPromise) return dbInitPromise;

    dbInitPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onblocked = () => {
        console.warn("Database upgrade temporarily blocked by an open connection.");
      };

      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        const stores = [
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

        stores.forEach(s => {
          if (!d.objectStoreNames.contains(s.name)) {
            d.createObjectStore(s.name, { keyPath: s.key });
          }
        });

        // Safe auto-migration from deprecated store_vault if present
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
                  subject: v.subject || "QA",
                  chapter: v.chapter || "QA_GENERAL",
                  front: `Vault Migrated Trap (${v.errorTag || 'UNCLASSIFIED'})`,
                  frontImageUrl: "",
                  back: `Question Reference ID: ${v.questionId}`,
                  backImageUrl: "",
                  interval: v.interval || 1,
                  repetition: v.repetition || 0,
                  easeFactor: v.easeFactor || 2.5,
                  nextReviewDate: v.nextReviewDate || Date.now(),
                  lastAttempted: v.lastAttempted || Date.now(),
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
      const txQ = d.transaction(["store_questions"], "readwrite");
      const stQ = txQ.objectStore("store_questions");
      SEED_QUESTIONS.forEach(q => stQ.put(q));
      await new Promise(r => txQ.oncomplete = r);

      const txC = d.transaction(["store_concepts"], "readwrite");
      const stC = txC.objectStore("store_concepts");
      SEED_TOPIC_DOSSIERS.forEach(t => stC.put(t));
      await new Promise(r => txC.oncomplete = r);

      const txB = d.transaction(["store_saved_mocks"], "readwrite");
      const stB = txB.objectStore("store_saved_mocks");
      SEED_SAVED_MOCKS.forEach(b => stB.put(b));
      await new Promise(r => txB.oncomplete = r);

      const txF = d.transaction(["store_flashcards"], "readwrite");
      const stF = txF.objectStore("store_flashcards");
      SEED_FLASHCARDS.forEach(f => stF.put(f));
      await new Promise(r => txF.oncomplete = r);
    }

    const savedMistakeConfig = await getRecord("store_config", "custom_mistake_tags");
    if (savedMistakeConfig && Array.isArray(savedMistakeConfig.value)) {
      customMistakeTags = [...new Set([...customMistakeTags, ...savedMistakeConfig.value])];
    }

    const savedTaxonomyConfig = await getRecord("store_config", "system_taxonomy");
    if (savedTaxonomyConfig && savedTaxonomyConfig.value && typeof savedTaxonomyConfig.value === "object") {
      TAXONOMY = { ...DEFAULT_TAXONOMY, ...savedTaxonomyConfig.value };
      Object.keys(DEFAULT_TAXONOMY).forEach(sub => {
        if (TAXONOMY[sub] && Array.isArray(TAXONOMY[sub].chapters)) {
          TAXONOMY[sub].chapters = [...new Set([...DEFAULT_TAXONOMY[sub].chapters, ...TAXONOMY[sub].chapters])];
        } else {
          TAXONOMY[sub] = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY[sub]));
        }
      });
    } else {
      TAXONOMY = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY));
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

  // Clone-Safe Persistence Engine (Eliminates DataCloneError Drops)
  async function putRecord(sName, record) {
    try {
      const d = await getDB();
      if (!d.objectStoreNames.contains(sName)) {
        console.error(`Store ${sName} not found in database.`);
        return false;
      }
      const cleanRecord = JSON.parse(JSON.stringify(record));
      return new Promise(res => {
        const tx = d.transaction([sName], "readwrite");
        const req = tx.objectStore(sName).put(cleanRecord);
        req.onsuccess = () => res(true);
        req.onerror = (err) => {
          console.error(`Failed write to ${sName}:`, err);
          res(false);
        };
      });
    } catch (e) {
      console.error(`Exception writing to ${sName}:`, e);
      return false;
    }
  }

  async function deleteRecordFromStore(sName, key) {
    try {
      const d = await getDB();
      if (!d.objectStoreNames.contains(sName)) return false;
      return new Promise(res => {
        const tx = d.transaction([sName], "readwrite");
        const req = tx.objectStore(sName).delete(key);
        req.onsuccess = () => res(true);
        req.onerror = () => res(false);
      });
    } catch (e) { return false; }
  }

  async function clearStore(sName) {
    try {
      const d = await getDB();
      if (!d.objectStoreNames.contains(sName)) return false;
      return new Promise(res => {
        const tx = d.transaction([sName], "readwrite");
        const req = tx.objectStore(sName).clear();
        req.onsuccess = () => res(true);
        req.onerror = () => res(false);
      });
    } catch (e) { return false; }
  }

  /* -------------------------------------------------------------
   * 5. BACKUP, DISASTER RECOVERY & SCHEMA SANITIZERS
   * ------------------------------------------------------------- */
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

    const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_os_backup_${Date.now()}.json`;
    a.click();
  }

  function openBackupRestoreModal() {
    pendingHydrationData = null;
    document.getElementById("restore-backup-file-input").value = "";
    document.getElementById("btn-execute-restore").disabled = true;
    document.getElementById("restore-file-preview-stats").style.display = "none";
    pushHistoryState("modal-backup-restore");
    document.getElementById("modal-backup-restore").classList.add("active");
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
        statsBox.style.display = "block";
        statsBox.innerHTML = `
          <b>Backup File Validated:</b><br>
          • Questions: ${pendingHydrationData.store_questions.length}<br>
          • Attempts & Scores: ${pendingHydrationData.store_attempts.length}<br>
          • Active SM-2 Flashcards: ${pendingHydrationData.store_flashcards.length}<br>
          • Living Document Sheets: ${pendingHydrationData.store_concepts.length}<br>
          • Clinical AI Consultations: ${pendingHydrationData.store_ai_consultations.length}<br>
          • Saved Blueprints & Papers: ${pendingHydrationData.store_saved_mocks.length}
        `;
        document.getElementById("btn-execute-restore").disabled = false;
      } catch (err) {
        alert("Corrupted Backup File: " + err.message);
        document.getElementById("btn-execute-restore").disabled = true;
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

  function sanitizeQuestion(q, idx) {
    return {
      id: q.id || `q_restored_${Date.now()}_${idx}`,
      subject: q.subject || "QA",
      chapter: q.chapter || "QA_GENERAL",
      subtopic: q.subtopic || "",
      method: q.method || "",
      conceptId: q.conceptId || "",
      questionText: q.questionText || "",
      imageUrl: q.imageUrl || "",
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: typeof q.correctIndex === "number" ? q.correctIndex : 0,
      explanation: q.explanation || "",
      tags: Array.isArray(q.tags) ? q.tags : ["Hydrated"],
      annotation: q.annotation || ""
    };
  }

  function sanitizeDossier(d, idx) {
    return {
      id: d.id || `top_restored_${Date.now()}_${idx}`,
      subject: d.subject || "QA",
      chapter: d.chapter || "QA_GENERAL",
      title: d.title || d.word || "Untitled Topic",
      subtitle: d.subtitle || d.root || "",
      content: d.content || d.meaning || "",
      imageUrl: d.imageUrl || "",
      timestamp: d.timestamp || Date.now()
    };
  }

  function sanitizeFlashcard(f, idx) {
    return {
      id: f.id || `fc_restored_${Date.now()}_${idx}`,
      subject: f.subject || "QA",
      chapter: f.chapter || "QA_GENERAL",
      front: f.front || f.questionText || "Untitled Prompt",
      frontImageUrl: f.frontImageUrl || "",
      back: f.back || f.explanation || "Untitled Answer",
      backImageUrl: f.backImageUrl || "",
      interval: typeof f.interval === "number" ? f.interval : 1,
      repetition: typeof f.repetition === "number" ? f.repetition : 0,
      easeFactor: typeof f.easeFactor === "number" ? f.easeFactor : 2.5,
      nextReviewDate: typeof f.nextReviewDate === "number" ? f.nextReviewDate : Date.now(),
      lastAttempted: f.lastAttempted || Date.now(),
      tags: Array.isArray(f.tags) ? f.tags : ["Restored"]
    };
  }

  function sanitizeAttempt(a, idx) {
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

  function sanitizeSavedMock(b, idx) {
    return {
      id: b.id || `preset_${Date.now()}_${idx}`,
      type: b.type || (b.questions ? "FIXED_PAPER" : "DYNAMIC_BLUEPRINT"),
      title: b.title || `Saved Setup ${idx + 1}`,
      isSectionLocked: b.isSectionLocked !== undefined ? b.isSectionLocked : true,
      sections: Array.isArray(b.sections) ? b.sections : [{ id: 1, subject: "QA", count: 25, durationMin: 15 }],
      questions: Array.isArray(b.questions) ? b.questions.map(sanitizeQuestion) : null
    };
  }

  async function executeHydrationRestore() {
    if (!pendingHydrationData) return;
    const mode = document.getElementById("restore-hydration-mode").value;
    const d = await getDB();

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
        if (items.length > 0 && d.objectStoreNames.contains(sName)) {
          const tx = d.transaction([sName], "readwrite");
          const st = tx.objectStore(sName);
          items.forEach(item => st.put(item));
          await new Promise(r => tx.oncomplete = r);
        }
      }

      alert("Disaster Recovery Complete! All records restored safely.");
      document.getElementById("modal-backup-restore").classList.remove("active");
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
      await renderVault();
    } catch (err) {
      alert("Hydration Error: " + err.message);
    }
  }

  /* -------------------------------------------------------------
   * 6. DYNAMIC TAXONOMY & SELECTOR SYNCHRONIZER
   * ------------------------------------------------------------- */
  async function syncAllTaxonomyDropdowns() {
    const saved = await getRecord("store_config", "system_taxonomy");
    if (saved && saved.value && typeof saved.value === "object") {
      TAXONOMY = { ...DEFAULT_TAXONOMY, ...saved.value };
      Object.keys(DEFAULT_TAXONOMY).forEach(sub => {
        if (TAXONOMY[sub] && Array.isArray(TAXONOMY[sub].chapters)) {
          TAXONOMY[sub].chapters = [...new Set([...DEFAULT_TAXONOMY[sub].chapters, ...TAXONOMY[sub].chapters])];
        } else {
          TAXONOMY[sub] = JSON.parse(JSON.stringify(DEFAULT_TAXONOMY[sub]));
        }
      });
    }

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
    populateSelect("edit-fc-subject", false);
    populateSelect("sm2-deck-filter-sub", true);
    populateSelect("scoped-export-subject", true);
  }

  function openTaxonomyManagerModal() {
    renderTaxonomyManagerList();
    pushHistoryState("modal-taxonomy-manager");
    document.getElementById("modal-taxonomy-manager").classList.add("active");
  }

  function renderTaxonomyManagerList() {
    const container = document.getElementById("taxonomy-manager-list");
    if (!container) return;
    container.innerHTML = "";

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
          ${sub.chapters.map(c => `
            <span style="font-size:10px; font-family:var(--font-mono); background:var(--bg-elevated); border:1px solid var(--border-color); padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              ${c}
              <span style="cursor:pointer; color:var(--status-red); opacity:0.7;" onclick="CGL_OS.deleteChapterFromSubject('${subKey}', '${c}')">✕</span>
            </span>
          `).join('')}
        </div>
      `;
      container.appendChild(div);
    });
  }

  async function addNewSubjectAction() {
    const keyInput = document.getElementById("new-sub-key");
    const nameInput = document.getElementById("new-sub-name");
    const key = keyInput.value.trim().toUpperCase().replace(/\s+/g, '_');
    const name = nameInput.value.trim();

    if (!key || !name) {
      alert("Both Key and Full Name are required.");
      return;
    }

    if (TAXONOMY[key]) {
      alert(`Subject ${key} already exists.`);
      return;
    }

    TAXONOMY[key] = {
      name: name,
      weight: 25,
      chapters: [`${key}_GENERAL`]
    };

    await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
    keyInput.value = "";
    nameInput.value = "";
    renderTaxonomyManagerList();
    await syncAllTaxonomyDropdowns();
    await renderDashboard();
    await updateDojoChapters();
  }

  async function promptAddChapterToSubject(subKey) {
    const chap = prompt(`Enter chapter tag for ${subKey} (e.g. ${subKey}_TOPIC):`);
    if (!chap || !chap.trim()) return;
    const formatted = chap.trim().toUpperCase().replace(/\s+/g, '_');

    if (!TAXONOMY[subKey].chapters.includes(formatted)) {
      TAXONOMY[subKey].chapters.push(formatted);
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
      renderTaxonomyManagerList();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
    }
  }

  async function deleteChapterFromSubject(subKey, chap) {
    if (confirm(`Remove chapter ${chap} from ${subKey}?`)) {
      TAXONOMY[subKey].chapters = TAXONOMY[subKey].chapters.filter(c => c !== chap);
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
      renderTaxonomyManagerList();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
    }
  }

  async function deleteSubjectAction(subKey) {
    if (confirm(`Permanently remove subject ${subKey} and all its taxonomy mappings?`)) {
      delete TAXONOMY[subKey];
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
      renderTaxonomyManagerList();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
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

  /* -------------------------------------------------------------
   * 7. RESPONSIVE SYNAPSE TREE ENGINE (DOM-BASED HIERARCHY)
   * ------------------------------------------------------------- */
  async function openSynapseGraphModal() {
    pushNavLayer("modal-synapse-tree", () => {
      document.getElementById("modal-synapse-tree").classList.remove("active");
    });
    document.getElementById("modal-synapse-tree").classList.add("active");
    await renderSynapseDomTree();
  }

  async function renderSynapseDomTree() {
    const rootContainer = document.getElementById("synapse-dom-tree-root");
    if (!rootContainer) return;
    rootContainer.innerHTML = "";

    const allQuestions = await getAllRecords("store_questions");
    const allConcepts = await getAllRecords("store_concepts");
    const allFlashcards = await getAllRecords("store_flashcards");

    Object.keys(TAXONOMY).forEach(subKey => {
      const sub = TAXONOMY[subKey];
      const subNodeId = `sub_${subKey}`;
      const isSubExpanded = synapseExpandedNodes.has(subNodeId);

      const subNodeWrap = document.createElement("div");
      subNodeWrap.className = "tree-node-item";

      const subRow = document.createElement("div");
      subRow.className = "tree-node-row subject-row";
      subRow.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-mono); color:var(--accent-cyan); font-weight:800;">${isSubExpanded ? "▼" : "▶"}</span>
          <b style="color:#fff; font-size:13px;">${sub.name} (${subKey})</b>
        </div>
        <span class="badge" style="background:#1f6feb;">${sub.chapters.length} Chapters</span>
      `;
      subRow.onclick = () => toggleSynapseNode(subNodeId);
      subNodeWrap.appendChild(subRow);

      if (isSubExpanded) {
        const qChaps = allQuestions.filter(q => q.subject === subKey).map(q => q.chapter);
        const cChaps = allConcepts.filter(c => c.subject === subKey).map(c => c.chapter);
        const fChaps = allFlashcards.filter(f => f.subject === subKey).map(f => f.chapter);
        const mergedChaps = [...new Set([...sub.chapters, ...qChaps, ...cChaps, ...fChaps])];

        mergedChaps.forEach(chap => {
          const chapNodeId = `chap_${chap}`;
          const isChapExpanded = synapseExpandedNodes.has(chapNodeId);
          const chapCards = allFlashcards.filter(f => f.chapter === chap);
          const chapSheets = allConcepts.filter(c => c.subject === subKey && c.chapter === chap);
          const chapQs = allQuestions.filter(q => q.chapter === chap);

          const chapNodeWrap = document.createElement("div");
          chapNodeWrap.className = "tree-node-item";

          const chapRow = document.createElement("div");
          chapRow.className = "tree-node-row chapter-row";
          chapRow.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-family:var(--font-mono); color:var(--text-muted); font-size:11px;">${isChapExpanded ? "▼" : "▶"}</span>
              <span style="font-family:var(--font-mono); font-weight:700; color:#fff; font-size:12px;">${chap}</span>
              ${chapCards.length > 0 ? `<span class="badge" style="background:#8957e5;">${chapCards.length} Cards</span>` : ''}
              <span class="badge" style="background:#151a24; color:var(--text-muted);">${chapQs.length} Qs</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px; color:var(--accent-cyan);" onclick="event.stopPropagation(); CGL_OS.launchSynapseChapterBlitz('${subKey}', '${chap}')">⚡ 5-Q Blitz</button>
            </div>
          `;
          chapRow.onclick = () => toggleSynapseNode(chapNodeId);
          chapNodeWrap.appendChild(chapRow);

          if (isChapExpanded) {
            if (chapSheets.length === 0 && chapCards.length === 0) {
              const emptyRow = document.createElement("div");
              emptyRow.style.fontSize = "11px";
              emptyRow.style.color = "var(--text-muted)";
              emptyRow.style.padding = "6px 12px";
              emptyRow.innerText = "No sheets or cards logged in this chapter yet.";
              chapNodeWrap.appendChild(emptyRow);
            }

            chapSheets.forEach(sheet => {
              const sheetRow = document.createElement("div");
              sheetRow.className = "tree-node-row sheet-row";
              sheetRow.style.marginTop = "4px";
              sheetRow.innerHTML = `
                <div style="display:flex; align-items:center; gap:6px; overflow:hidden;">
                  <span style="font-size:13px;">📖</span>
                  <span style="color:#fff; font-size:12px; font-weight:600; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${sheet.title}</span>
                </div>
                <div style="display:flex; gap:4px; flex-shrink:0;">
                  <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.openCompendiumToSheet('${sheet.id}', '${subKey}', '${chap}')">Read</button>
                  <button class="btn btn-cyan" style="padding:2px 8px; font-size:10px;" onclick="CGL_OS.launchDirectSheetDrill('${sheet.id}', '${subKey}', '${chap}')">Drill</button>
                </div>
              `;
              chapNodeWrap.appendChild(sheetRow);
            });
          }
          subNodeWrap.appendChild(chapNodeWrap);
        });
      }
      rootContainer.appendChild(subNodeWrap);
    });
  }

  function toggleSynapseNode(nodeId) {
    if (synapseExpandedNodes.has(nodeId)) {
      synapseExpandedNodes.delete(nodeId);
    } else {
      synapseExpandedNodes.add(nodeId);
    }
    renderSynapseDomTree();
  }

  function expandAllSynapseNodes() {
    Object.keys(TAXONOMY).forEach(subKey => {
      synapseExpandedNodes.add(`sub_${subKey}`);
      TAXONOMY[subKey].chapters.forEach(c => synapseExpandedNodes.add(`chap_${c}`));
    });
    renderSynapseDomTree();
  }

  function collapseAllSynapseNodes() {
    synapseExpandedNodes.clear();
    renderSynapseDomTree();
  }

  function launchSynapseChapterBlitz(subKey, chap) {
    document.getElementById("modal-synapse-tree").classList.remove("active");
    launchConfiguredMockDirect(subKey, chap, 5, 5);
  }

  /* -------------------------------------------------------------
   * 8. BI-DIRECTIONAL CONCEPT ROUTER & LIVING STUDIO
   * ------------------------------------------------------------- */
  async function openCompendiumToSheet(conceptId, targetSub, targetChap) {
    const openModals = document.querySelectorAll(".modal-overlay.active");
    openModals.forEach(m => m.classList.remove("active"));

    let item = null;
    if (conceptId) {
      item = await getRecord("store_concepts", conceptId);
    }

    if (!item && targetChap) {
      const allConcepts = await getAllRecords("store_concepts");
      item = allConcepts.find(c => c.chapter === targetChap);
    }

    activeCompSubject = item ? item.subject : (targetSub || "QA");
    activeCompChapter = item ? item.chapter : (targetChap || "QA_GEOMETRY");

    pushNavLayer("compendium-fullscreen-view", () => {
      document.getElementById("compendium-fullscreen-view").style.display = "none";
    });
    document.getElementById("compendium-fullscreen-view").style.display = "flex";

    const subSelect = document.getElementById("comp-studio-subject-select");
    if (subSelect) subSelect.value = activeCompSubject;

    const chapSelect = document.getElementById("comp-studio-chapter-select");
    chapSelect.innerHTML = "";

    const allDossiers = await getAllRecords("store_concepts");
    const canonChaps = (TAXONOMY[activeCompSubject] && Array.isArray(TAXONOMY[activeCompSubject].chapters)) 
      ? TAXONOMY[activeCompSubject].chapters 
      : [];
    const existingChaps = [...new Set(allDossiers.filter(d => d.subject === activeCompSubject).map(d => d.chapter))];
    const combined = [...new Set([...canonChaps, ...existingChaps])];

    combined.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      chapSelect.appendChild(opt);
    });

    if (combined.includes(activeCompChapter)) {
      chapSelect.value = activeCompChapter;
    } else if (combined.length > 0) {
      activeCompChapter = combined[0];
      chapSelect.value = activeCompChapter;
    }

    await renderCompStudioSheets();

    if (item) {
      const sheetIdx = currentCompSheets.findIndex(s => s.id === item.id);
      if (sheetIdx !== -1) {
        activeCompSheetIndex = sheetIdx;
        renderActiveCompSheet();
      }
    }
  }

  function jumpToConceptFromReview(conceptId) {
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    openCompendiumToSheet(conceptId, q.subject, q.chapter);
  }

  function jumpToConceptFromDojo() {
    if (!dojoExam) return;
    const q = dojoExam.questions[dojoExam.currentIndex];
    openCompendiumToSheet(q.conceptId, q.subject, q.chapter);
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
    document.getElementById("omni-research-query-sub").innerText = `${q.subject} • ${q.chapter}`;
    document.getElementById("omni-research-prompt-preview").innerText = q.questionText.slice(0, 160) + "...";

    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(queryText + " SSC CGL")}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q.questionText.slice(0, 100) + " " + queryText)}`;

    let wolframQuery = queryText;
    const mathMatch = q.questionText.match(/\$([^\$]+)\$/);
    if (mathMatch && mathMatch[1]) {
      wolframQuery = mathMatch[1].replace(/\\text\{.*?\}/g, "").replace(/\\/g, "");
    }
    const wolframUrl = `https://www.wolframalpha.com/input?i=${encodeURIComponent(wolframQuery)}`;

    document.getElementById("omni-link-wiki").href = wikiUrl;
    document.getElementById("omni-link-google").href = googleUrl;
    document.getElementById("omni-link-wolfram").href = wolframUrl;

    pushHistoryState("modal-omni-research");
    document.getElementById("modal-omni-research").classList.add("active");
  }

  async function launchDirectSheetDrill(conceptId, subject, chapter) {
    document.getElementById("modal-synapse-tree").classList.remove("active");
    const allQs = await getAllRecords("store_questions");
    let linked = allQs.filter(q => q.conceptId === conceptId);

    if (linked.length === 0) {
      linked = allQs.filter(q => q.chapter === chapter);
    }

    if (linked.length > 0) {
      compileAndLaunchArena(`Drill: ${chapter}`, linked.slice(0, 10), 10);
    } else {
      alert(`No questions found in bank for ${chapter}.`);
    }
  }

  async function launchCurrentSheetQuestionsDrill() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    closeCompendiumStudio();
    const allQs = await getAllRecords("store_questions");
    let linked = allQs.filter(q => q.conceptId === sheet.id || (q.chapter === sheet.chapter && q.subtopic === sheet.title));

    if (linked.length === 0) {
      linked = allQs.filter(q => q.chapter === sheet.chapter);
    }

    if (linked.length === 0) {
      alert(`No questions in bank for ${sheet.chapter}.`);
      return;
    }

    compileAndLaunchArena(`Sheet Drill: ${sheet.title}`, linked.slice(0, 10), Math.max(5, Math.round(linked.slice(0, 10).length * 1.5)));
  }

  async function openCompendiumStudio() {
    pushNavLayer("compendium-fullscreen-view", () => {
      document.getElementById("compendium-fullscreen-view").style.display = "none";
    });
    document.getElementById("compendium-fullscreen-view").style.display = "flex";
    await handleCompStudioSubjectChange(activeCompSubject || "QA");
  }

  function closeCompendiumStudio() {
    document.getElementById("compendium-fullscreen-view").style.display = "none";
  }

  async function handleCompStudioSubjectChange(sub) {
    activeCompSubject = sub;
    const chapSelect = document.getElementById("comp-studio-chapter-select");
    chapSelect.innerHTML = "";

    const allDossiers = await getAllRecords("store_concepts");
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
    const allDossiers = await getAllRecords("store_concepts");
    currentCompSheets = allDossiers.filter(d => d.subject === activeCompSubject && d.chapter === activeCompChapter);

    const tabsBar = document.getElementById("comp-studio-sheet-tabs");
    const docContent = document.getElementById("comp-studio-doc-content");
    tabsBar.innerHTML = "";
    docContent.innerHTML = "";

    if (currentCompSheets.length === 0) {
      docContent.innerHTML = `
        <div style="text-align:center; padding:50px 14px; color:var(--text-muted);">
          <h3 style="font-size:16px; margin-bottom:8px; color:#fff;">No Topic Sheets in ${activeCompChapter}</h3>
          <p style="font-size:12px; margin-bottom:14px;">This chapter is currently empty. Create your first scrollable sheet.</p>
          <button class="btn" onclick="CGL_OS.openConceptEditorModal(true)">+ Create First Sheet</button>
        </div>
      `;
      document.getElementById("comp-studio-scratchpad").value = "";
      document.getElementById("comp-linked-q-count").innerText = "0 Questions Linked";
      return;
    }

    if (activeCompSheetIndex >= currentCompSheets.length) activeCompSheetIndex = 0;

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

    await renderActiveCompSheet();
  }

  async function renderActiveCompSheet() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    document.querySelectorAll(".comp-sheet-tab").forEach((t, i) => {
      t.classList.toggle("active", i === activeCompSheetIndex);
    });

    document.getElementById("comp-studio-header-title").innerText = sheet.title;
    document.getElementById("comp-studio-header-sub").innerText = `${sheet.chapter} • Sheet ${activeCompSheetIndex + 1} of ${currentCompSheets.length}`;

    const allQs = await getAllRecords("store_questions");
    const linkedCount = allQs.filter(q => q.conceptId === sheet.id || (q.chapter === sheet.chapter && q.subtopic === sheet.title)).length;
    document.getElementById("comp-linked-q-count").innerText = `${linkedCount} Associated Questions Linked`;

    let imgHtml = "";
    if (sheet.imageUrl && sheet.imageUrl.trim().length > 0) {
      imgHtml = `<div style="text-align:center; margin:16px 0;"><img src="${sheet.imageUrl}" style="max-height:280px; max-width:100%; border-radius:8px; border:1px solid var(--border-color);"></div>`;
    }

    const docContent = document.getElementById("comp-studio-doc-content");
    docContent.innerHTML = `
      <div style="border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge" style="background:#1f6feb;">${sheet.chapter}</span>
          <span style="font-size:11px; color:var(--text-muted);">${formatISTDate(sheet.timestamp || Date.now())}</span>
        </div>
        <h1 style="font-size:22px; font-weight:800; color:#fff; margin-top:8px;">${sheet.title}</h1>
        ${sheet.subtitle ? `<div style="font-size:13px; color:var(--accent-cyan); font-family:var(--font-mono); margin-top:2px;">${sheet.subtitle}</div>` : ''}
      </div>
      ${imgHtml}
      <div style="font-size:14.5px; line-height:1.75; color:var(--text-main);">${formatRichText(sheet.content)}</div>
    `;

    const noteKey = `scratch_${sheet.id}`;
    const savedNote = await getRecord("store_notes", noteKey);
    document.getElementById("comp-studio-scratchpad").value = savedNote ? savedNote.content : "";
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
    st.style.display = "inline";
    setTimeout(() => { st.style.display = "none"; }, 1500);
  }

  async function deleteCurrentCompendiumSheet() {
    if (!currentCompSheets || currentCompSheets.length === 0) return;
    const curr = currentCompSheets[activeCompSheetIndex];
    if (confirm(`Permanently delete living sheet: "${curr.title}"?`)) {
      await deleteRecordFromStore("store_concepts", curr.id);
      await renderCompStudioSheets();
    }
  }

  async function promptCreateNewChapter() {
    const chapName = prompt(`Enter new chapter tag for ${activeCompSubject} (e.g. ${activeCompSubject}_NEW_TOPIC):`);
    if (!chapName || !chapName.trim()) return;
    const formatted = chapName.trim().toUpperCase().replace(/\s+/g, '_');

    if (!TAXONOMY[activeCompSubject].chapters.includes(formatted)) {
      TAXONOMY[activeCompSubject].chapters.push(formatted);
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
    }

    await handleCompStudioSubjectChange(activeCompSubject);
    document.getElementById("comp-studio-chapter-select").value = formatted;
    await handleCompStudioChapterChange(formatted);
  }

  function openOmniSearchModal() {
    pushHistoryState("modal-comp-omni-search");
    document.getElementById("modal-comp-omni-search").classList.add("active");
    document.getElementById("comp-omni-search-input").value = "";
    document.getElementById("comp-omni-results-list").innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">Type keywords above to query across all living sheets.</p>`;
    setTimeout(() => document.getElementById("comp-omni-search-input").focus(), 150);
  }

  async function executeOmniSearch(keyword) {
    const list = document.getElementById("comp-omni-results-list");
    const term = keyword.trim().toLowerCase();
    if (!term) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">Type keywords above to query across all living sheets.</p>`;
      return;
    }

    const allDossiers = await getAllRecords("store_concepts");
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
          <span class="badge" style="background:#1f6feb;">${res.subject} • ${res.chapter}</span>
        </div>
        <b style="font-size:14px; color:#fff;">${res.title}</b>
        <div style="font-size:11px; color:var(--accent-cyan); font-family:var(--font-mono); margin-bottom:4px;">${res.subtitle || ''}</div>
        <div style="font-size:12px; color:var(--text-muted); max-height:40px; overflow:hidden; text-overflow:ellipsis;">${res.content.slice(0, 100)}...</div>
      `;
      div.addEventListener("click", () => {
        document.getElementById("modal-comp-omni-search").classList.remove("active");
        openCompendiumToSheet(res.id, res.subject, res.chapter);
      });
      list.appendChild(div);
    });
  }

  function insertDossierSnippet(type) {
    const textarea = document.getElementById("concept-edit-body");
    let snippet = "";
    if (type === "FORMULA") snippet = "\n> [!formula] Key Identity\n> $$a^2 + b^2 = c^2$$\n";
    if (type === "TRAP") snippet = "\n> [!trap] Critical TCS Deduction\n> Verify whether radius or diameter is specified.\n";
    if (type === "TABLE") snippet = "\n| Condition | Method | Shortcut |\n| :--- | :--- | :--- |\n| Case 1 | Direct Tangent | $2\\sqrt{r_1 r_2}$ |\n";
    textarea.value += snippet;
    textarea.focus();
  }

  function openConceptEditorModal(isNew = true) {
    currentConceptImageBase64 = "";
    document.getElementById("concept-editor-title").innerText = isNew ? "Add Topic Sheet" : "Edit Topic Sheet";

    if (isNew || currentCompSheets.length === 0) {
      document.getElementById("concept-edit-id").value = "top_" + Date.now();
      document.getElementById("concept-edit-subject").value = activeCompSubject || "QA";
      document.getElementById("concept-edit-chapter").value = activeCompChapter || "QA_GEOMETRY";
      document.getElementById("concept-edit-title").value = "";
      document.getElementById("concept-edit-sub").value = "";
      document.getElementById("concept-edit-body").value = "";
      document.getElementById("concept-edit-img-url").value = "";
      document.getElementById("concept-edit-img-file").value = "";
    } else {
      const curr = currentCompSheets[activeCompSheetIndex];
      document.getElementById("concept-edit-id").value = curr.id;
      document.getElementById("concept-edit-subject").value = curr.subject;
      document.getElementById("concept-edit-chapter").value = curr.chapter;
      document.getElementById("concept-edit-title").value = curr.title;
      document.getElementById("concept-edit-sub").value = curr.subtitle || "";
      document.getElementById("concept-edit-body").value = curr.content;
      document.getElementById("concept-edit-img-url").value = curr.imageUrl || "";
      document.getElementById("concept-edit-img-file").value = "";
    }

    pushHistoryState("modal-concept-editor");
    document.getElementById("modal-concept-editor").classList.add("active");
  }

  async function handleConceptImageUpload(input) {
    if (input.files && input.files[0]) {
      currentConceptImageBase64 = await compressImageFile(input.files[0]);
    }
  }

  async function saveConceptCard() {
    const id = document.getElementById("concept-edit-id").value;
    const subject = document.getElementById("concept-edit-subject").value;
    const chapter = document.getElementById("concept-edit-chapter").value.trim().toUpperCase();
    const title = document.getElementById("concept-edit-title").value.trim();
    const subtitle = document.getElementById("concept-edit-sub").value.trim();
    const content = document.getElementById("concept-edit-body").value.trim();
    const urlInput = document.getElementById("concept-edit-img-url").value.trim();

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

    await putRecord("store_concepts", obj);
    document.getElementById("modal-concept-editor").classList.remove("active");
    openCompendiumToSheet(id, subject, chapter);
  }

  /* -------------------------------------------------------------
   * 9. MULTI-SUBJECT CUSTOM MOCK BUILDER & SAVED PRESETS
   * ------------------------------------------------------------- */
  let customSequenceRows = [];

  function openCustomMockModal() {
    if (customSequenceRows.length === 0) {
      customSequenceRows = [
        { id: 1, subject: "QA", count: 25, durationMin: 15 },
        { id: 2, subject: "ENG", count: 25, durationMin: 15 }
      ];
    }
    renderCustomSequenceRows();
    pushHistoryState("modal-mock-builder");
    document.getElementById("modal-mock-builder").classList.add("active");
  }

  function addCustomSectionRow() {
    const nextId = customSequenceRows.length + 1;
    customSequenceRows.push({ id: nextId, subject: "QA", count: 25, durationMin: 15 });
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
          <span style="font-weight:700; font-size:12px; color:var(--accent-cyan);">Section ${idx + 1}</span>
          ${customSequenceRows.length > 1 ? `<button class="btn btn-secondary" style="padding:2px 6px; font-size:10px; color:var(--status-red);" onclick="CGL_OS.removeCustomSectionRow(${idx})">Remove</button>` : ''}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Subject</label>
            <select class="form-control" style="padding:6px; font-size:12px;" onchange="CGL_OS.updateCustomRowSubject(${idx}, this.value)">
              ${Object.keys(TAXONOMY).map(k => `<option value="${k}" ${row.subject === k ? 'selected' : ''}>${k}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Qs</label>
            <input type="number" class="form-control" style="padding:6px; font-size:12px;" value="${row.count}" min="5" max="50" onchange="CGL_OS.updateCustomRowCount(${idx}, this.value)">
          </div>
          <div>
            <label style="font-size:10px; color:var(--text-muted);">Mins</label>
            <input type="number" class="form-control" style="padding:6px; font-size:12px;" value="${row.durationMin}" min="1" max="60" onchange="CGL_OS.updateCustomRowDuration(${idx}, this.value)">
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  function updateCustomRowSubject(idx, val) { customSequenceRows[idx].subject = val; }
  function updateCustomRowCount(idx, val) { customSequenceRows[idx].count = parseInt(val) || 25; }
  function updateCustomRowDuration(idx, val) { customSequenceRows[idx].durationMin = parseInt(val) || 15; }

  function applyBlueprintPreset(val) {
    const wrap = document.getElementById("custom-sequence-stack-wrap");
    if (val === "CUSTOM_BUILDER") {
      wrap.style.display = "block";
    } else if (val === "TIER1_FULL") {
      wrap.style.display = "none";
      customSequenceRows = [
        { id: 1, subject: "REAS", count: 25, durationMin: 15 },
        { id: 2, subject: "GA", count: 25, durationMin: 15 },
        { id: 3, subject: "QA", count: 25, durationMin: 15 },
        { id: 4, subject: "ENG", count: 25, durationMin: 15 }
      ];
    } else if (val === "TIER2_SEC1") {
      wrap.style.display = "none";
      customSequenceRows = [
        { id: 1, subject: "QA", count: 30, durationMin: 30 },
        { id: 2, subject: "REAS", count: 30, durationMin: 30 }
      ];
    } else if (val === "QA_BLITZ") {
      wrap.style.display = "none";
      customSequenceRows = [
        { id: 1, subject: "QA", count: 15, durationMin: 10 }
      ];
    }
  }

  function openSaveBlueprintModal(mode = "DYNAMIC_BLUEPRINT", targetId = "") {
    document.getElementById("save-preset-mode").value = mode;
    document.getElementById("save-preset-target-id").value = targetId;

    const titleInput = document.getElementById("blueprint-title-input");
    const modalTitle = document.getElementById("save-preset-modal-title");

    if (mode === "FIXED_PAPER") {
      modalTitle.innerText = "Freeze Mock as Fixed Paper";
      titleInput.placeholder = "e.g. CGL 2024 Tier 1 Replica (Exact Questions)";
    } else {
      modalTitle.innerText = "Save Dynamic Blueprint Ruleset";
      titleInput.placeholder = "e.g. Speed Blitz Alpha (QA + REAS)";
    }

    titleInput.value = "";
    pushHistoryState("modal-save-blueprint");
    document.getElementById("modal-save-blueprint").classList.add("active");
  }

  async function saveCurrentPresetAction() {
    const mode = document.getElementById("save-preset-mode").value;
    const targetId = document.getElementById("save-preset-target-id").value;
    const title = document.getElementById("blueprint-title-input").value.trim();

    if (!title) {
      alert("Title is required.");
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
      const isLock = document.getElementById("builder-sectional-lock").value === "YES";
      record = {
        id: "bp_" + Date.now(),
        type: "DYNAMIC_BLUEPRINT",
        title: title,
        isSectionLocked: isLock,
        sections: JSON.parse(JSON.stringify(customSequenceRows)),
        questions: null
      };
    }

    await putRecord("store_saved_mocks", record);
    document.getElementById("modal-save-blueprint").classList.remove("active");
    alert(`Saved "${title}" (${mode === "FIXED_PAPER" ? "Fixed Question Paper" : "Dynamic Blueprint"}) to Dashboard.`);
    await renderDashboardBlueprints();
  }

  async function renderDashboardBlueprints() {
    const pillsContainer = document.getElementById("dash-blueprints-pills");
    pillsContainer.innerHTML = "";
    const blueprints = await getAllRecords("store_saved_mocks");

    if (blueprints.length === 0) {
      pillsContainer.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">No saved setups. Save blueprints or freeze past test papers to launch them here.</span>`;
      return;
    }

    blueprints.forEach(bp => {
      const pill = document.createElement("button");
      pill.className = "anchor-pill";
      pill.style.display = "inline-flex";
      pill.style.alignItems = "center";
      pill.style.gap = "6px";
      const icon = bp.type === "FIXED_PAPER" ? "📌" : "⚡";
      pill.innerHTML = `<span>${icon} ${bp.title}</span><span style="opacity:0.6; font-size:9px;" onclick="event.stopPropagation(); CGL_OS.deleteSavedPreset('${bp.id}')">✕</span>`;
      pill.addEventListener("click", () => launchSavedPreset(bp.id));
      pillsContainer.appendChild(pill);
    });
  }

  async function launchSavedPreset(id) {
    const preset = await getRecord("store_saved_mocks", id);
    if (!preset) return;

    if (preset.type === "FIXED_PAPER" && preset.questions && preset.questions.length > 0) {
      const parsedSections = preset.sections && preset.sections.length > 0 
        ? JSON.parse(JSON.stringify(preset.sections)).map(s => ({ ...s, locked: false }))
        : [{ id: "SEC_1", name: "Paper Arena", durationSec: 900, locked: false }];

      const now = Date.now();
      activeExam = {
        sessionId: "fixed_mock_" + now,
        parentSessionId: null,
        attemptNumber: 1,
        timestamp: now,
        timeIST: formatISTDate(now),
        diurnalSlot: getDiurnalSlot(now),
        title: preset.title,
        mockType: "CUSTOM",
        signatureTag: "FIXED_PAPER",
        isSectionLocked: !!preset.isSectionLocked,
        sections: parsedSections,
        activeSectionIndex: 0,
        currentQuestionIndex: 0,
        questions: preset.questions.map((q, idx) => ({ 
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
      document.getElementById("exam-arena").style.display = "flex";
      renderActiveExamQuestion();
      startExamTimers();
    } else {
      customSequenceRows = preset.sections;
      document.getElementById("builder-sectional-lock").value = preset.isSectionLocked ? "YES" : "NO";
      await launchConfiguredMock();
    }
  }

  async function deleteSavedPreset(id) {
    if (confirm("Delete this saved mock setup?")) {
      await deleteRecordFromStore("store_saved_mocks", id);
      await renderDashboardBlueprints();
    }
  }

  async function launchConfiguredMock() {
    const modal = document.getElementById("modal-mock-builder");
    if (modal) modal.classList.remove("active");

    const preset = document.getElementById("builder-blueprint-preset").value;
    const isLock = document.getElementById("builder-sectional-lock").value === "YES";
    const allQuestions = await getAllRecords("store_questions");

    let sections = [];
    let flattened = [];
    let signatureTags = [];
    let globalCounter = 1;

    customSequenceRows.forEach((row, sIdx) => {
      let pool = allQuestions.filter(q => q.subject === row.subject);
      if (pool.length === 0) pool = allQuestions;
      const sectionQuestions = pool.slice(0, row.count);
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
    });

    if (flattened.length === 0) {
      alert("Database question pool empty for configured routine.");
      return;
    }

    const isStandardTier1 = preset === "TIER1_FULL";
    const isSingleSectional = customSequenceRows.length === 1;
    const now = Date.now();

    activeExam = {
      sessionId: "mock_" + now,
      parentSessionId: null,
      attemptNumber: 1,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: isStandardTier1 ? "SSC CGL Tier 1 Full Mock" : (isSingleSectional ? `${customSequenceRows[0].subject} Sectional Mock` : `Custom Routine (${signatureTags.join('➔')})`),
      mockType: isStandardTier1 ? "TIER_1" : (isSingleSectional ? "SECTIONAL" : "CUSTOM"),
      signatureTag: `CUSTOM_${signatureTags.join('_')}`,
      isSectionLocked: isLock,
      sections: sections,
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      questions: flattened,
      sectionRemainingSec: sections[0].durationSec,
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
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }
  /* -------------------------------------------------------------
   * 10. TIMED EXAM ARENA & STAGE 2 FULL-SCREEN REVIEW
   * ------------------------------------------------------------- */
  function startExamTimers() {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    if (activeExam && activeExam.isReviewMode) {
      document.getElementById("hud-countdown").innerText = "REVIEW";
      document.getElementById("hud-countdown").className = "hud-timer";
      return;
    }

    examTimerInterval = setInterval(() => {
      if (!activeExam || activeExam.isPaused || activeExam.isReviewMode) return;

      activeExam.sectionRemainingSec--;
      const m = Math.floor(activeExam.sectionRemainingSec / 60);
      const s = activeExam.sectionRemainingSec % 60;
      const clockEl = document.getElementById("hud-countdown");
      clockEl.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      if (activeExam.sectionRemainingSec < 180) clockEl.className = "hud-timer crimson";
      else if (activeExam.sectionRemainingSec < 300) clockEl.className = "hud-timer amber";
      else clockEl.className = "hud-timer";

      if (activeExam.sectionRemainingSec <= 0) {
        handleSectionLockTransition(true);
      }
    }, 1000);

    questionTimerInterval = setInterval(() => {
      if (!activeExam || activeExam.isPaused || activeExam.isReviewMode) return;
      activeExam.currentQTimeSpentSec++;
      const m = Math.floor(activeExam.currentQTimeSpentSec / 60);
      const s = activeExam.currentQTimeSpentSec % 60;
      document.getElementById("arena-q-timer").innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      document.getElementById("hud-pacing-status").innerText = `${activeExam.currentQTimeSpentSec}s on Q`;

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

    document.getElementById("lock-confirm-msg").innerHTML = `
      You have <b>${m}m ${s}s</b> remaining in <b>${curSec.name}</b>.<br><br>
      Locking early will permanently seal this section. You cannot return to it.
    `;
    document.getElementById("modal-section-lock-confirm").classList.add("active");
  }

  function confirmEndSectionEarly() {
    document.getElementById("modal-section-lock-confirm").classList.remove("active");
    handleSectionLockTransition(false);
  }

  function handleSectionLockTransition(isAutoExpired) {
    if (!activeExam) return;
    activeExam.sections[activeExam.activeSectionIndex].locked = true;

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
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3500);
  }

  function renderActiveExamQuestion() {
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const resp = activeExam.userResponses[q.id] || {};
    const isRev = !!activeExam.isReviewMode;

    const pauseBtn = document.getElementById("btn-arena-pause");
    const exitRevBtn = document.getElementById("btn-arena-exit-review");
    const lockBtn = document.getElementById("btn-arena-early-lock");
    const drawerLockBtn = document.getElementById("btn-drawer-early-lock");
    const revBtn = document.getElementById("btn-q-review");
    const saveNextBtn = document.getElementById("btn-q-save-next");
    const telemBanner = document.getElementById("arena-review-telemetry-banner");
    const solutionBlock = document.getElementById("arena-review-solution-block");
    const conceptBridgeBox = document.getElementById("arena-concept-bridge-box");
    const researchBtn = document.getElementById("btn-arena-research");
    const panicFlag = document.getElementById("hud-panic-flag");

    researchBtn.style.display = "inline-flex";

    if (isRev) {
      pauseBtn.style.display = "none";
      exitRevBtn.style.display = "inline-flex";
      lockBtn.style.display = "none";
      drawerLockBtn.style.display = "none";
      revBtn.style.display = "none";
      saveNextBtn.innerText = "Next Question ►";
      document.getElementById("btn-submit-exam").style.display = "none";
      document.getElementById("palette-drawer-title").innerText = "Review Palette";
      document.getElementById("palette-legend-bar").innerHTML = `
        <span>🟢 Correct</span>
        <span>🔴 Incorrect</span>
        <span>⚪ Unattempted</span>
      `;
      panicFlag.style.display = resp.isPanicSlip ? "inline-block" : "none";

      // CLOCK SYNC FIX: Synchronize live timers with the question's recorded dwell time
      const spent = resp.timeSpentSec || 0;
      const mSpent = Math.floor(spent / 60);
      const sSpent = spent % 60;
      document.getElementById("arena-q-timer").innerText = `${String(mSpent).padStart(2, '0')}:${String(sSpent).padStart(2, '0')}`;
      document.getElementById("hud-pacing-status").innerText = `${spent}s on Q`;

    } else {
      pauseBtn.style.display = "inline-flex";
      exitRevBtn.style.display = "none";
      revBtn.style.display = "inline-flex";
      saveNextBtn.innerText = "Save & Next";
      document.getElementById("btn-submit-exam").style.display = "block";
      document.getElementById("palette-drawer-title").innerText = "Question Palette";
      panicFlag.style.display = "none";

      if (activeExam.isSectionLocked) {
        lockBtn.style.display = "inline-flex";
        drawerLockBtn.style.display = "block";
        const isLast = activeExam.activeSectionIndex === activeExam.sections.length - 1;
        lockBtn.innerText = isLast ? "🔒 Submit Final Section" : "🔒 End Section Early";
        drawerLockBtn.innerText = isLast ? "🔒 Lock & Submit Final Section" : "🔒 End & Advance Section Early";
      } else {
        lockBtn.style.display = "none";
        drawerLockBtn.style.display = "none";
      }
    }

    const secQs = activeExam.questions.filter(item => item.sectionIndex === q.sectionIndex);
    document.getElementById("hud-section-badge").innerText = `${q.sectionName ? q.sectionName.toUpperCase() : 'EXAM'}`;
    document.getElementById("hud-section-qinfo").innerText = `Sec Q${q.localNumber || (activeExam.currentQuestionIndex + 1)} of ${secQs.length} (Global Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)})`;
    document.getElementById("arena-q-num").innerText = `Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)}`;
    document.getElementById("arena-q-text").innerHTML = formatRichText(q.questionText);

    if (!isRev) {
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
    if (q.imageUrl && q.imageUrl.trim().length > 0) {
      imgBox.style.display = "block";
      imgBox.innerHTML = `<img src="${q.imageUrl}" alt="Question Diagram">`;
    } else {
      imgBox.style.display = "none";
      imgBox.innerHTML = "";
    }

    // Bi-Directional Concept Bridge Button in Review Mode
    if (isRev) {
      conceptBridgeBox.style.display = "block";
      const bridgeBtn = document.getElementById("btn-jump-to-concept");
      if (q.conceptId && q.conceptId.trim().length > 0) {
        bridgeBtn.innerText = "📖 Jump to Underlying Theorem Sheet";
        bridgeBtn.onclick = () => jumpToConceptFromReview(q.conceptId);
      } else {
        bridgeBtn.innerText = `📖 Browse Living Sheets for ${q.chapter}`;
        bridgeBtn.onclick = () => openCompendiumToSheet(null, q.subject, q.chapter);
      }
    } else {
      conceptBridgeBox.style.display = "none";
    }

    // Review Mode Telemetry Banner
    if (isRev) {
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
          ${resp.isPanicSlip ? `<div style="margin-top:4px; color:var(--status-red); font-size:11px; font-weight:700;">⚠️ Detected as Panic Slip (&lt;12s solve in final minutes).</div>` : ''}
          ${resp.errorTag && resp.errorTag !== 'UNCLASSIFIED' ? `<div style="margin-top:4px; color:#f87171; font-size:11px;"><b>Trap Classification:</b> #${resp.errorTag}</div>` : ''}
        </div>
      `;

      // Solution & Mistake Tag Dropdown
      solutionBlock.style.display = "block";
      const currentTag = resp.errorTag || "UNCLASSIFIED";

      let optionsHtml = `<option value="UNCLASSIFIED" ${currentTag==='UNCLASSIFIED'?'selected':''}>Tag Mistake Type...</option>`;
      customMistakeTags.forEach(t => {
        optionsHtml += `<option value="${t}" ${currentTag===t?'selected':''}>${t.replace(/_/g, ' ')}</option>`;
      });
      optionsHtml += `<option value="__NEW_TAG__">+ Create New Tag...</option>`;

      solutionBlock.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:700; color:var(--accent-cyan); font-size:13px;">Method & Detailed Solution</span>
          ${!isCor && isAtt ? `
            <select onchange="CGL_OS.handleMistakeTagSelect('${q.id}', this.value)" style="background:#151a24; color:#fff; border:1px solid #da3633; font-size:11px; padding:3px 6px; border-radius:4px;">
              ${optionsHtml}
            </select>
          ` : ''}
        </div>
        <div style="font-size:13.5px; line-height:1.6;">${formatRichText(q.explanation || 'No method registered.')}</div>
      `;
    } else {
      telemBanner.style.display = "none";
      solutionBlock.style.display = "none";
    }

    const container = document.getElementById("arena-options-container");
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

  document.getElementById("btn-q-save-next").addEventListener("click", () => {
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

  document.getElementById("btn-q-prev").addEventListener("click", () => {
    const prevIdx = activeExam.currentQuestionIndex - 1;
    if (prevIdx >= 0) {
      if (activeExam.isReviewMode || !activeExam.isSectionLocked || activeExam.questions[prevIdx].sectionIndex === activeExam.activeSectionIndex) {
        activeExam.currentQuestionIndex = prevIdx;
        renderActiveExamQuestion();
      }
    }
  });

  document.getElementById("btn-q-review").addEventListener("click", () => {
    if (activeExam.isReviewMode) return;
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
    const drawer = document.getElementById("exam-palette-drawer");
    const overlay = document.getElementById("exam-drawer-overlay");
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
    grid.innerHTML = "";

    const tabsWrap = document.getElementById("exam-palette-section-tabs");
    tabsWrap.innerHTML = "";

    const isRev = !!activeExam.isReviewMode;

    activeExam.sections.forEach((sec, sIdx) => {
      const tabBtn = document.createElement("button");
      tabBtn.className = "anchor-pill" + (sIdx === activeExam.activeSectionIndex ? " active" : "");
      
      if (!isRev && activeExam.isSectionLocked && sec.locked) {
        tabBtn.innerText = `🔒 ${sec.name.split(" ")[0]}`;
        tabBtn.style.opacity = "0.5";
        tabBtn.style.cursor = "not-allowed";
      } else {
        tabBtn.innerText = sec.name.split(" ")[0];
        tabBtn.addEventListener("click", () => {
          if (!isRev && activeExam.isSectionLocked) {
            if (sIdx !== activeExam.activeSectionIndex) {
              alert("Sectional lock is active! Sections must be completed sequentially.");
            }
            return;
          }
          activeExam.activeSectionIndex = sIdx;
          renderExamPaletteGrid(sIdx);
        });
      }
      tabsWrap.appendChild(tabBtn);
    });

    const targetSec = filterSectionIndex !== null ? filterSectionIndex : (!isRev && activeExam.isSectionLocked ? activeExam.activeSectionIndex : null);
    const displayedQs = targetSec !== null ? activeExam.questions.filter(q => q.sectionIndex === targetSec) : activeExam.questions;

    if (!isRev) {
      let ans = 0, marked = 0, unans = 0;
      activeExam.questions.forEach(q => {
        const resp = activeExam.userResponses[q.id];
        if (resp.status === "answered") ans++;
        else if (resp.status === "marked") marked++;
        else unans++;
      });
      document.getElementById("exam-count-ans").innerText = ans;
      document.getElementById("exam-count-marked").innerText = marked;
      document.getElementById("exam-count-unans").innerText = unans;
    }

    displayedQs.forEach(q => {
      const resp = activeExam.userResponses[q.id] || {};
      const isSecLocked = !isRev && activeExam.sections[q.sectionIndex] && activeExam.sections[q.sectionIndex].locked;

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
        activeExam.currentQuestionIndex = activeExam.questions.findIndex(item => item.id === q.id);
        toggleExamPalette(false);
        renderActiveExamQuestion();
      });

      grid.appendChild(cell);
    });
  }

  document.getElementById("btn-arena-pause").addEventListener("click", async () => {
    if (!activeExam || activeExam.isReviewMode) return;
    activeExam.isPaused = true;
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);
    await putRecord("store_active_session", { id: "current_session", session: activeExam });

    const shield = document.getElementById("pause-shield");
    shield.style.setProperty("display", "flex", "important");
  });

  document.getElementById("btn-resume-exam").addEventListener("click", () => {
    const shield = document.getElementById("pause-shield");
    shield.style.setProperty("display", "none", "important");
    if (activeExam) {
      activeExam.isPaused = false;
      startExamTimers();
    }
  });

  document.getElementById("btn-minimize-exam").addEventListener("click", async () => {
    const shield = document.getElementById("pause-shield");
    shield.style.setProperty("display", "none", "important");
    document.getElementById("exam-arena").style.display = "none";
    updateMiniPlayerDock();
  });

  document.getElementById("btn-exit-exam").addEventListener("click", async () => {
    if (confirm("Abandon active mock test? Current unsubmitted progress will be lost.")) {
      const shield = document.getElementById("pause-shield");
      shield.style.setProperty("display", "none", "important");
      document.getElementById("exam-arena").style.display = "none";
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
    const q = activeExam.questions[activeExam.currentQuestionIndex];
    const m = Math.floor(activeExam.sectionRemainingSec / 60);
    const s = activeExam.sectionRemainingSec % 60;
    let ansCount = 0;
    Object.values(activeExam.userResponses).forEach(r => { if (r.status === "answered") ansCount++; });

    document.getElementById("mini-player-title").innerText = activeExam.title;
    document.getElementById("mini-player-sub").innerText = `${q && q.sectionName ? q.sectionName.split(' ')[0] : 'Exam'} • Q${q ? (q.globalNumber || 1) : 1}`;
    document.getElementById("mini-player-time").innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    document.getElementById("mini-player-ans").innerText = `${ansCount}/${activeExam.questions.length} Ans`;

    dock.style.display = "flex";
  }

  function hideMiniPlayer() {
    document.getElementById("mini-player-dock").style.display = "none";
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
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }

  document.getElementById("btn-submit-exam").addEventListener("click", () => {
    if (confirm("Confirm final submission of full mock test?")) {
      toggleExamPalette(false);
      submitExamSession();
    }
  });

  // SUBMISSION ENGINE WITH COGNITIVE TRAP AUTO-CLASSIFICATION & CLONE-SAFE WRITES
  async function submitExamSession() {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    let correct = 0, incorrect = 0, traps = 0, totalMarks = 0;
    let penaltyDrag = 0, switchDelta = 0;

    for (const q of activeExam.questions) {
      const resp = activeExam.userResponses[q.id];
      if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
        const isCorrect = resp.selectedOption === q.correctIndex;
        
        if (resp.timeSpentSec < 12 && activeExam.sectionRemainingSec < 180) {
          resp.isPanicSlip = true;
        }

        if (isCorrect) {
          totalMarks += 2.0;
          correct++;
          if (resp.initialOption !== null && resp.initialOption !== q.correctIndex) {
            switchDelta++;
          }
        } else {
          totalMarks -= 0.5;
          penaltyDrag += 0.5;
          incorrect++;

          if (resp.initialOption === q.correctIndex) {
            switchDelta--;
          }

          if (resp.timeSpentSec > 90) traps++;

          // COGNITIVE TRAP AUTO-CLASSIFICATION
          if (!resp.errorTag || resp.errorTag === "UNCLASSIFIED") {
            if (resp.isPanicSlip) {
              resp.errorTag = "PANIC_SLIP";
            } else if (resp.switches > 0 && resp.initialOption === q.correctIndex) {
              resp.errorTag = "SECOND_GUESS_BLUNDER";
            } else if (resp.timeSpentSec > 90) {
              resp.errorTag = "TIME_TRAP_Q4";
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

    // Clone-Safe Write
    const isSaved = await putRecord("store_attempts", activeExam);
    if (!isSaved) {
      console.warn("Retrying attempt persistence with sanitized payload...");
      await putRecord("store_attempts", sanitizeAttempt(activeExam, 0));
    }

    document.getElementById("exam-arena").style.display = "none";
    await renderDashboard();
    openMockReview(activeExam);
  }

  // THREADED REATTEMPT CONTROLLER
  async function reattemptMock(sessionId) {
    const attempts = await getAllRecords("store_attempts");
    const target = attempts.find(a => a.sessionId === sessionId);
    if (!target) return;

    const modalReview = document.getElementById("modal-mock-review");
    if (modalReview) modalReview.classList.remove("active");
    const modalArchive = document.getElementById("modal-history-archive");
    if (modalArchive) modalArchive.classList.remove("active");

    // Count existing attempts in thread
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
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }

  function enterFullScreenReviewArena() {
    if (!activeReviewAttempt) return;
    document.getElementById("modal-mock-review").classList.remove("active");

    activeExam = {
      ...JSON.parse(JSON.stringify(activeReviewAttempt)),
      isReviewMode: true,
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      currentQTimeSpentSec: 0,
      isPaused: false
    };

    pushNavLayer("exam-arena", () => {
      document.getElementById("exam-arena").style.display = "none";
    });
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }

  function exitReviewArena() {
    document.getElementById("exam-arena").style.display = "none";
    activeExam = null;
    if (activeReviewAttempt) {
      openMockReview(activeReviewAttempt);
    }
  }

  /* -------------------------------------------------------------
   * 11. UNTIMED DOJO ARENA ENGINE
   * ------------------------------------------------------------- */
  async function updateDojoChapters() {
    const sub = document.getElementById("dojo-nav-subject").value;
    const chapSelect = document.getElementById("dojo-nav-chapter");
    chapSelect.innerHTML = `<option value="ALL">Entire ${sub} (All Chapters)</option>`;

    const definedChaps = (TAXONOMY[sub] && Array.isArray(TAXONOMY[sub].chapters)) 
      ? TAXONOMY[sub].chapters 
      : [];

    const allQs = await getAllRecords("store_questions");
    const qChaps = allQs.filter(q => q.subject === sub).map(q => q.chapter);

    const allConcepts = await getAllRecords("store_concepts");
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
    const sub = document.getElementById("dojo-nav-subject").value;
    const chap = document.getElementById("dojo-nav-chapter").value;
    const methodSelect = document.getElementById("dojo-nav-method");
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
    const sub = document.getElementById("dojo-nav-subject").value;
    const chap = document.getElementById("dojo-nav-chapter").value;
    const method = document.getElementById("dojo-nav-method").value;

    const allQs = await getAllRecords("store_questions");
    let pool = allQs.filter(q => q.subject === sub);
    if (chap !== "ALL") pool = pool.filter(q => q.chapter === chap);
    if (method !== "ALL") pool = pool.filter(q => q.method === method);

    if (pool.length === 0) {
      alert("No questions found matching this selection.");
      return;
    }

    pool.sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      if (a.chapter !== b.chapter) return a.chapter.localeCompare(b.chapter);
      return (a.subtopic || "").localeCompare(b.subtopic || "");
    });

    const allDossiers = await getAllRecords("store_concepts");
    const matchedDossier = allDossiers.find(c => c.chapter === chap || (method !== "ALL" && c.title === method));

    dojoExam = {
      subject: sub,
      chapter: chap,
      method: method,
      title: chap === "ALL" ? `${sub} • Entire Subject Dojo` : (method !== "ALL" ? `${chap} • ${method}` : `${chap} Dojo`),
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
      document.getElementById("dojo-arena-view").style.display = "none";
    });
    document.getElementById("dojo-arena-view").style.display = "flex";
    renderDojoArenaQuestion();
  }

  function exitDojoArena() {
    document.getElementById("dojo-arena-view").style.display = "none";
  }

  function renderDojoArenaQuestion() {
    const q = dojoExam.questions[dojoExam.currentIndex];
    const resp = dojoExam.userResponses[q.id];

    document.getElementById("dojo-arena-title").innerText = dojoExam.title;
    document.getElementById("dojo-arena-chap-badge").innerText = q.chapter;
    document.getElementById("dojo-arena-method-badge").innerText = q.method || q.subtopic || "General";
    document.getElementById("dojo-arena-qnum").innerText = q.dojoSequentialNum;
    document.getElementById("dojo-arena-total-tag").innerText = `Question ${q.dojoSequentialNum} of ${dojoExam.questions.length}`;
    document.getElementById("dojo-arena-qtext").innerHTML = formatRichText(q.questionText);

    const imgBox = document.getElementById("dojo-image-container");
    if (q.imageUrl && q.imageUrl.trim().length > 0) {
      imgBox.style.display = "block";
      imgBox.innerHTML = `<img src="${q.imageUrl}" alt="Diagram">`;
    } else {
      imgBox.style.display = "none";
      imgBox.innerHTML = "";
    }

    const theoryBanner = document.getElementById("dojo-theory-banner");
    if (dojoExam.formulaBrief) {
      theoryBanner.style.display = "block";
      theoryBanner.innerHTML = `<strong>Concept Brief:</strong> ${formatRichText(dojoExam.formulaBrief)}`;
    } else {
      theoryBanner.style.display = "none";
    }

    const fb = document.getElementById("dojo-arena-feedback");
    fb.style.display = "none";

    const mb = document.getElementById("dojo-arena-method-box");
    mb.style.display = resp.revealed ? "block" : "none";
    mb.innerHTML = `<strong>Solution & Method:</strong><br>${formatRichText(q.explanation || 'No method registered.')}`;

    document.getElementById("dojo-arena-annotation").value = q.annotation || "";

    const optContainer = document.getElementById("dojo-arena-options");
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

        fb.style.display = "block";
        if (idx === q.correctIndex) {
          fb.style.background = "rgba(35, 134, 54, 0.22)";
          fb.style.color = "var(--status-green)";
          fb.innerText = "✓ Correct Answer!";
        } else {
          fb.style.background = "rgba(218, 54, 51, 0.22)";
          fb.style.color = "var(--status-red)";
          fb.innerText = `✗ Incorrect. Correct is Option ${q.correctIndex + 1}.`;
        }
        renderDojoArenaQuestion();
      });

      optContainer.appendChild(card);
    });
  }

  function navDojoArena(step) {
    const next = dojoExam.currentIndex + step;
    if (next >= 0 && next < dojoExam.questions.length) {
      dojoExam.currentIndex = next;
      renderDojoArenaQuestion();
    }
  }

  function toggleDojoMethod() {
    const q = dojoExam.questions[dojoExam.currentIndex];
    const resp = dojoExam.userResponses[q.id];
    resp.revealed = !resp.revealed;
    const mb = document.getElementById("dojo-arena-method-box");
    mb.style.display = resp.revealed ? "block" : "none";
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
    scrollBody.innerHTML = "";
    document.getElementById("dojo-palette-count-badge").innerText = `${dojoExam.questions.length} Qs`;

    const grouped = {};
    dojoExam.questions.forEach((q, idx) => {
      const ch = q.chapter || "GENERAL";
      if (!grouped[ch]) grouped[ch] = [];
      grouped[ch].push({ q, idx });
    });

    Object.keys(grouped).forEach(chapterKey => {
      const items = grouped[chapterKey];

      const header = document.createElement("div");
      header.style.padding = "6px 0";
      header.style.fontSize = "11px";
      header.style.fontWeight = "700";
      header.style.color = "var(--accent-cyan)";
      header.innerHTML = `<span>${chapterKey} (${items.length} Qs)</span>`;
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

  /* -------------------------------------------------------------
   * 12. STAGE 1 COCKPIT & HIGH-FIDELITY SECTIONAL BREAKDOWN
   * ------------------------------------------------------------- */
  async function openMockReview(attemptOrId) {
    let att = typeof attemptOrId === "string" 
      ? (await getAllRecords("store_attempts")).find(a => a.sessionId === attemptOrId)
      : attemptOrId;

    if (!att) return;
    activeReviewAttempt = att;

    // Auto-dismiss History Archive modal to prevent z-index layering conflicts
    const archiveModal = document.getElementById("modal-history-archive");
    if (archiveModal && archiveModal.classList.contains("active")) {
      archiveModal.classList.remove("active");
    }

    document.getElementById("review-modal-title").innerText = `${att.title}${att.attemptNumber > 1 ? ` (Attempt ${att.attemptNumber})` : ''}`;
    document.getElementById("review-modal-date").innerText = att.timeIST || formatISTDate(att.timestamp);
    document.getElementById("rev-score").innerText = (att.finalScore || 0).toFixed(2);

    const totalAtt = (att.correctCount || 0) + (att.incorrectCount || 0);
    document.getElementById("rev-acc").innerText = totalAtt > 0 ? `${Math.round((att.correctCount / totalAtt) * 100)}%` : "0%";
    document.getElementById("rev-cor").innerText = att.correctCount || 0;
    document.getElementById("rev-inc").innerText = att.incorrectCount || 0;

    document.getElementById("rev-penalty").innerText = `-${(att.penaltyDrag || 0).toFixed(2)}`;
    document.getElementById("rev-switch-delta").innerText = `${att.switchDelta > 0 ? '+' : ''}${att.switchDelta || 0} Net`;
    document.getElementById("rev-traps").innerText = att.q4Traps || 0;

    document.getElementById("btn-review-reattempt").onclick = () => reattemptMock(att.sessionId);
    document.getElementById("btn-review-save-fixed").onclick = () => openSaveBlueprintModal("FIXED_PAPER", att.sessionId);

    // THREADED ATTEMPT ITERATION SWITCHER
    const rootId = att.parentSessionId || att.sessionId;
    const allAttempts = await getAllRecords("store_attempts");
    const thread = allAttempts.filter(a => a.sessionId === rootId || a.parentSessionId === rootId);

    const switchWrap = document.getElementById("rev-attempt-switcher-wrap");
    const switchSelect = document.getElementById("rev-attempt-select");

    if (thread.length > 1) {
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
    } else {
      switchWrap.style.display = "none";
    }

    // HIGH-FIDELITY SECTIONAL BREAKDOWN
    const secGrid = document.getElementById("rev-sectional-breakdown-grid");
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
          <span>Split (🟢/🔴/⚪):</span> <b>${s.cor} / ${s.inc} / ${s.unans}</b>
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

    const tagPills = document.getElementById("rev-mistake-tags-pills");
    tagPills.innerHTML = "";
    const tagCounts = {};
    if (att.userResponses) {
      Object.values(att.userResponses).forEach(r => {
        if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED") {
          tagCounts[r.errorTag] = (tagCounts[r.errorTag] || 0) + 1;
        }
      });
    }

    if (Object.keys(tagCounts).length === 0) {
      tagPills.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">No tagged errors registered for this attempt.</span>`;
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

    pushNavLayer("modal-mock-review", () => {
      document.getElementById("modal-mock-review").classList.remove("active");
    });
    document.getElementById("modal-mock-review").classList.add("active");
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
      await putRecord("store_attempts", activeReviewAttempt);
    }
    renderDashboard();
  }

  /* -------------------------------------------------------------
   * 13. INTERACTIVE SUBJECT DIAGNOSTIC MODAL
   * ------------------------------------------------------------- */
  async function openSubjectDiagnosticModal(subKey) {
    const sub = TAXONOMY[subKey];
    if (!sub) return;

    document.getElementById("diag-subject-name").innerText = `${sub.name} (${subKey})`;
    document.getElementById("diag-subject-sub").innerText = `Complete Syllabus & Chapter Analysis`;

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
    document.getElementById("diag-subject-acc").innerText = subAtt > 0 ? `${acc}%` : "--";
    document.getElementById("diag-subject-counts").innerText = `${subAtt} Solved • ${subCor} Correct`;

    const gauge = document.getElementById("diag-acc-gauge");
    gauge.setAttribute("stroke-dasharray", `${acc}, 100`);
    if (acc >= 80) gauge.style.stroke = "var(--status-green-border)";
    else if (acc >= 65) gauge.style.stroke = "var(--status-amber)";
    else gauge.style.stroke = "var(--status-red)";

    const chapList = document.getElementById("diag-chapter-coverage-list");
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

    document.getElementById("btn-launch-subject-blitz").onclick = () => {
      document.getElementById("modal-subject-diagnostic").classList.remove("active");
      launchConfiguredMockDirect(subKey, "ALL", 10, 8);
    };

    pushHistoryState("modal-subject-diagnostic");
    document.getElementById("modal-subject-diagnostic").classList.add("active");
  }

  async function launchConfiguredMockDirect(sub, chap, count, durMin) {
    const allQuestions = await getAllRecords("store_questions");
    let pool = chap === "ALL" 
      ? allQuestions.filter(q => q.subject === sub) 
      : allQuestions.filter(q => q.chapter === chap);

    if (pool.length === 0) {
      alert("No questions found in bank for this selection.");
      return;
    }

    const selectedQs = pool.slice(0, count);
    const now = Date.now();

    activeExam = {
      sessionId: "blitz_" + now,
      parentSessionId: null,
      attemptNumber: 1,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: `${chap === 'ALL' ? sub : chap} Blitz Drill`,
      mockType: "CUSTOM",
      isSectionLocked: false,
      sections: [{
        id: "SEC_" + (chap === 'ALL' ? sub : chap),
        name: (chap === 'ALL' ? sub : chap),
        durationSec: durMin * 60,
        questions: selectedQs,
        locked: false
      }],
      activeSectionIndex: 0,
      currentQuestionIndex: 0,
      questions: selectedQs.map((q, idx) => ({ ...q, sectionIndex: 0, sectionName: chap, localNumber: idx + 1, globalNumber: idx + 1 })),
      sectionRemainingSec: durMin * 60,
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
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }

  /* -------------------------------------------------------------
   * 14. MULTI-TIER AI EXPORTS & HIERARCHICAL MASTER LEDGER
   * ------------------------------------------------------------- */
  function openAiExportModal() {
    if (!activeReviewAttempt) return;
    pushHistoryState("modal-ai-export");
    document.getElementById("modal-ai-export").classList.add("active");
    updateAiExportPreview();
  }

  async function updateAiExportPreview() {
    const mode = document.getElementById("ai-export-mode").value;
    const att = activeReviewAttempt;
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
            chapter: q.chapter,
            conceptId: q.conceptId || "",
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
        `• Generated at: ${formatISTDate(Date.now())}\n` +
        `• Completed Standard Mocks: ${allAtt.length}\n` +
        `• Active SM-2 Flashcards: ${flashcards.length}\n` +
        `• Flashcard Pipeline: Due: ${flashcards.filter(f => f.nextReviewDate <= Date.now()).length} | Mastered: ${flashcards.filter(f => f.repetition >= 3).length}\n`;
    }

    document.getElementById("ai-export-preview").value = payload;
  }

  function copyAiExportToClipboard() {
    const text = document.getElementById("ai-export-preview").value;
    navigator.clipboard.writeText(text);
    alert("Payload copied! Paste into chat with Gemini to diagnose vulnerabilities and generate remedies.");
    document.getElementById("modal-ai-export").classList.remove("active");
  }

  function openMasterLedgerExportModal() {
    pushHistoryState("modal-ledger-export");
    document.getElementById("modal-ledger-export").classList.add("active");
  }

  // HIERARCHICAL SORTING HELPER: Subject -> Chapter -> Subtopic -> ID
  function sortQuestionsHierarchical(questions) {
    const subOrder = ["QA", "REAS", "ENG", "GA"];
    return questions.slice().sort((a, b) => {
      const sA = subOrder.indexOf(a.subject) !== -1 ? subOrder.indexOf(a.subject) : 99;
      const sB = subOrder.indexOf(b.subject) !== -1 ? subOrder.indexOf(b.subject) : 99;
      if (sA !== sB) return sA - sB;
      if (a.chapter !== b.chapter) return a.chapter.localeCompare(b.chapter);
      if ((a.subtopic || "") !== (b.subtopic || "")) return (a.subtopic || "").localeCompare(b.subtopic || "");
      return a.id.localeCompare(b.id);
    });
  }

  async function downloadLedgerJson() {
    const includeImages = document.getElementById("ledger-include-images").checked;
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

    const blob = new Blob([JSON.stringify(sanitized, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_master_bank_ledger_${Date.now()}.json`;
    a.click();
    document.getElementById("modal-ledger-export").classList.remove("active");
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

      txt += `[RECORD ${idx + 1}] ID: ${q.id} | TOPIC: ${q.subtopic || 'General'} | METHOD: ${q.method || 'General'} | CONCEPT_REF: ${q.conceptId || 'None'}\n`;
      txt += `QUESTION: ${q.questionText}\n`;
      q.options.forEach((opt, oIdx) => {
        txt += `  (${oIdx + 1}) ${opt}\n`;
      });
      txt += `CORRECT OPTION: ${q.correctIndex + 1}\n`;
      txt += `EXPLANATION: ${q.explanation || 'None'}\n\n`;
    });

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_master_bank_gem_pack_${Date.now()}.txt`;
    a.click();
    document.getElementById("modal-ledger-export").classList.remove("active");
  }

  async function exportCleanMarkdownFlashcards() {
    const flashcards = await getAllRecords("store_flashcards");
    let md = `# SSC CGL Flashcard Deck Export\nGenerated on: ${formatISTDate(Date.now())}\nTotal Cards: ${flashcards.length}\n\n`;

    flashcards.forEach(f => {
      md += `### [${f.subject} • ${f.chapter}] ${f.id}\n`;
      md += `**Prompt (Front):**\n${f.front}\n\n`;
      md += `**Answer (Back):**\n${f.back}\n\n`;
      md += `*Interval: ${f.interval}d | Reps: ${f.repetition} | EF: ${f.easeFactor}*\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `CGL_Flashcards_${Date.now()}.md`;
    a.click();
  }

  async function copyLiveSystemManifestToClipboard() {
    const questions = await getAllRecords("store_questions");
    const attempts = await getAllRecords("store_attempts");
    const flashcards = await getAllRecords("store_flashcards");
    const concepts = await getAllRecords("store_concepts");
    const consultations = await getAllRecords("store_ai_consultations");

    const manifest = `# SSC CGL Intelligence OS - Live Runtime Introspection Manifest
Generated at: ${formatISTDate(Date.now())}
Target Candidate: Ankit (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)

## 1. Live Telemetry Metrics
- Master Question Pool: ${questions.length}
- Completed Mocks: ${attempts.filter(a => a.completed).length}
- Active SM-2 Flashcards: ${flashcards.length} (Due Today: ${flashcards.filter(f => f.nextReviewDate <= Date.now()).length})
- Living Knowledge Sheets: ${concepts.length}
- Clinical Consultations Logged: ${consultations.length}

## 2. Active System Taxonomy & Chapters
${JSON.stringify(TAXONOMY, null, 2)}

## 3. Supported JSON Action Contracts
- EXECUTE_AI_CONSULTATION_BUNDLE
- INGEST_AND_LAUNCH_MOCK
- AI_PRESCRIBE_REMEDY
- BATCH_INGEST_FLASHCARDS
- BATCH_INGEST_COMPENDIUM
- REQUEST_HISTORICAL_DUMP
- SAVE_MOCK_PRESET
- MODIFY_TAXONOMY
- RAW_DB_OPERATION
`;
    navigator.clipboard.writeText(manifest);
    alert("Live AI Introspection Manifest copied to clipboard! Paste it into your coaching chat.");
  }

  /* -------------------------------------------------------------
   * 15. ONE-TAP GLOBAL 360° MASTER DOSSIER & SCOPED EXTRACTOR
   * ------------------------------------------------------------- */
  async function exportGlobalMasterDossier() {
    await exportDossierInternal("ALL", "ALL", "ALL", "HYBRID_CSV", true);
  }

  async function exportScopedForensicDossier() {
    const sub = document.getElementById("scoped-export-subject").value;
    const timeframe = document.getElementById("scoped-export-timeframe").value;
    const filter = document.getElementById("scoped-export-filter").value;
    const encoding = document.getElementById("scoped-export-encoding").value;
    await exportDossierInternal(sub, timeframe, filter, encoding, false);
  }

  async function exportDossierInternal(sub, timeframe, filter, encoding, isGlobalMaster = false) {
    const allAttempts = await getAllRecords("store_attempts");
    const allQuestions = await getAllRecords("store_questions");
    const allFlashcards = await getAllRecords("store_flashcards");
    const consultations = await getAllRecords("store_ai_consultations");

    const now = Date.now();
    let cutoff = 0;
    if (timeframe === "7D") cutoff = now - (7 * 24 * 60 * 60 * 1000);
    else if (timeframe === "15D") cutoff = now - (15 * 24 * 60 * 60 * 1000);
    else if (timeframe === "30D") cutoff = now - (30 * 24 * 60 * 60 * 1000);

    const filteredAttempts = allAttempts.filter(a => a.completed && a.timestamp >= cutoff);

    // Build Chronological Question Exposures & Spacing History with Defensive IST Fallbacks
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

    // Compile Telemetry Slice
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
        encoding: encoding,
        decoderInstructions: "CSV rows correspond to individual question attempts. Columns: mockId,mockIST,slot,qId,subject,chapter,sel,cor,t,sw,panic,tag. Check decisionTrails for chronological hesitation path.",
        supportedActionContracts: [
          "EXECUTE_AI_CONSULTATION_BUNDLE",
          "INGEST_AND_LAUNCH_MOCK",
          "AI_PRESCRIBE_REMEDY",
          "BATCH_INGEST_FLASHCARDS",
          "BATCH_INGEST_COMPENDIUM",
          "REQUEST_HISTORICAL_DUMP"
        ]
      },
      cumulativeClinicalNarrative: consultations.length > 0 ? consultations[consultations.length - 1].cumulativeNarrative || "Baseline initialized." : "No prior consultations logged.",
      recentConsultationLogs: consultations.slice(-5),
      candidateProfile: {
        target: "SSC CGL 2026 Tier 1 & Tier 2 Master Preparation",
        scopedAttemptsEvaluated: filteredAttempts.length,
        scopedTelemetryCount: telemetryRows.length,
        flashcardQueue: {
          totalCards: scopedFlashcards.length,
          dueToday: scopedFlashcards.filter(f => f.nextReviewDate <= now).length,
          mastered: scopedFlashcards.filter(f => f.repetition >= 3).length
        }
      },
      questionExposuresAndSpacing: exposureMap,
      telemetryData: telemetryPayload,
      decisionTrails: decisionTrails
    };

    const blob = new Blob([JSON.stringify(dossierEnvelope, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = isGlobalMaster 
      ? `cgl_master_forensic_dossier_360_${now}.json`
      : `cgl_forensic_dossier_${sub}_${timeframe}_${now}.json`;
    a.click();
  }

  /* -------------------------------------------------------------
   * 16. DASHBOARD RENDER ENGINE (THREADED ACCORDIONS & METRICS)
   * ------------------------------------------------------------- */
  async function renderDashboard() {
    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);
    const flashcards = await getAllRecords("store_flashcards");

    document.getElementById("kpi-total-mocks").innerText = completed.length;

    const circleGauge = document.getElementById("gauge-acc-circle");

    let accPercent = 0;
    let avgSpeed = 0;
    let traps = 0;

    if (completed.length === 0) {
      document.getElementById("kpi-global-acc").innerText = "--";
      document.getElementById("kpi-avg-speed").innerText = "--";
      document.getElementById("kpi-traps-hit").innerText = "0";
      if (circleGauge) {
        circleGauge.setAttribute("stroke-dasharray", "0, 100");
        circleGauge.style.stroke = "var(--border-color)";
      }
    } else {
      let totalCor = 0, totalAtt = 0, totalSec = 0;
      completed.forEach(c => {
        totalCor += (c.correctCount || 0);
        totalAtt += ((c.correctCount || 0) + (c.incorrectCount || 0));
        traps += (c.q4Traps || 0);
        if (c.userResponses && typeof c.userResponses === "object") {
          Object.values(c.userResponses).forEach(r => totalSec += (r ? (r.timeSpentSec || 0) : 0));
        }
      });

      accPercent = totalAtt > 0 ? Math.round((totalCor / totalAtt) * 100) : 0;
      avgSpeed = totalAtt > 0 ? Math.round(totalSec / totalAtt) : 0;

      document.getElementById("kpi-global-acc").innerText = `${accPercent}%`;
      document.getElementById("kpi-avg-speed").innerText = `${avgSpeed}s`;
      document.getElementById("kpi-traps-hit").innerText = traps;

      if (circleGauge) {
        circleGauge.setAttribute("stroke-dasharray", `${accPercent}, 100`);
        if (accPercent >= 80) circleGauge.style.stroke = "var(--status-green-border)";
        else if (accPercent >= 65) circleGauge.style.stroke = "var(--status-amber)";
        else circleGauge.style.stroke = "var(--status-red)";
      }

      const speedEl = document.getElementById("kpi-speed-benchmark");
      if (avgSpeed <= 45) speedEl.innerHTML = `<span style="color:var(--status-green);">⚡ Elite Speed Zone (≤45s)</span>`;
      else if (avgSpeed <= 60) speedEl.innerHTML = `<span style="color:var(--status-amber);">Pacing Acceptable (46-60s)</span>`;
      else speedEl.innerHTML = `<span style="color:var(--status-red);">⚠️ Drag Alert (>60s / Q)</span>`;
    }

    calculateAndRenderERI(accPercent, avgSpeed, flashcards, completed.length);
    checkAndRenderNeglectIndex(completed);
    renderCognitiveTrapHeatStrip(completed);

    try { renderDashboardSubjectBatteries(completed); } catch (e) { console.error("Batteries error:", e); }
    try { renderRecentHistory(completed); } catch (e) { console.error("Recent history error:", e); }
    try { await renderDashboardBlueprints(); } catch (e) { console.error("Blueprints error:", e); }
    try { await renderDrilldownSubjectLevel(); } catch (e) { console.error("Drilldown error:", e); }
  }

  function calculateAndRenderERI(accPercent, avgSpeed, flashcards, completedCount) {
    if (completedCount === 0) {
      document.getElementById("eri-score-val").innerText = "--";
      document.getElementById("eri-status-tier").innerText = "Calibrating";
      return;
    }

    const accComponent = accPercent * 0.40;
    
    let velScore = 100;
    if (avgSpeed > 45) velScore = Math.max(0, 100 - (avgSpeed - 45) * 2.5);
    const velComponent = velScore * 0.30;

    let retentionScore = 100;
    if (flashcards.length > 0) {
      const dueCount = flashcards.filter(f => f.nextReviewDate <= Date.now()).length;
      retentionScore = Math.max(0, 100 - (dueCount * 3));
    }
    const retentionComponent = retentionScore * 0.30;

    const eri = Math.min(100, Math.max(0, accComponent + velComponent + retentionComponent)).toFixed(1);
    document.getElementById("eri-score-val").innerText = eri;

    const circle = document.getElementById("eri-gauge-circle");
    if (circle) circle.setAttribute("stroke-dasharray", `${eri}, 100`);

    const tierBadge = document.getElementById("eri-status-tier");
    if (tierBadge && circle) {
      if (eri >= 85) {
        tierBadge.innerText = "Tier-1 Formidable";
        tierBadge.style.color = "var(--status-green)";
        circle.style.stroke = "var(--status-green-border)";
      } else if (eri >= 70) {
        tierBadge.innerText = "Competitive Form";
        tierBadge.style.color = "var(--accent-cyan)";
        circle.style.stroke = "var(--accent-cyan)";
      } else {
        tierBadge.innerText = "Vulnerable";
        tierBadge.style.color = "var(--status-red)";
        circle.style.stroke = "var(--status-red)";
      }
    }
  }

  function checkAndRenderNeglectIndex(completed) {
    const alertBox = document.getElementById("dash-neglect-alert");
    if (!alertBox) return;

    if (completed.length === 0) {
      alertBox.style.display = "none";
      return;
    }

    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    let neglectedChap = null;
    let maxNeglectTime = 0;
    let hasNeverAttempted = false;

    for (const subKey of Object.keys(TAXONOMY)) {
      for (const chap of TAXONOMY[subKey].chapters) {
        let lastAttemptTime = 0;

        for (const att of completed) {
          if (att.questions && Array.isArray(att.questions)) {
            if (att.questions.some(q => q.chapter === chap)) {
              if (att.timestamp > lastAttemptTime) {
                lastAttemptTime = att.timestamp;
              }
            }
          }
        }

        if (lastAttemptTime === 0) {
          neglectedChap = { subKey, chap, days: "Never", never: true };
          hasNeverAttempted = true;
          break;
        } else {
          const diff = now - lastAttemptTime;
          if (diff > sevenDaysMs && diff > maxNeglectTime) {
            maxNeglectTime = diff;
            neglectedChap = { 
              subKey, 
              chap, 
              days: Math.floor(diff / (24 * 60 * 60 * 1000)), 
              never: false 
            };
          }
        }
      }
      if (hasNeverAttempted) break;
    }

    if (neglectedChap) {
      alertBox.style.display = "flex";
      const desc = neglectedChap.never 
        ? `${neglectedChap.chap} has NEVER been tested in completed mocks.` 
        : `${neglectedChap.chap} untouched for ${neglectedChap.days} days.`;
      document.getElementById("dash-neglect-text").innerText = desc;
      document.getElementById("btn-neglect-drill").onclick = () => {
        launchConfiguredMockDirect(neglectedChap.subKey, neglectedChap.chap, 5, 5);
      };
    } else {
      alertBox.style.display = "none";
    }
  }

  function renderCognitiveTrapHeatStrip(completed) {
    const bar = document.getElementById("dash-trap-heat-bar");
    const legend = document.getElementById("dash-trap-legend");
    bar.innerHTML = "";
    legend.innerHTML = "";

    const tagCounts = {};
    let totalTagged = 0;

    completed.forEach(att => {
      if (att.userResponses) {
        Object.values(att.userResponses).forEach(r => {
          if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED") {
            tagCounts[r.errorTag] = (tagCounts[r.errorTag] || 0) + 1;
            totalTagged++;
          }
        });
      }
    });

    if (totalTagged === 0) {
      bar.innerHTML = `<div class="trap-heat-seg" style="width:100%; background:var(--status-green);"></div>`;
      legend.innerHTML = `<span style="color:var(--status-green);">Zero active cognitive traps logged!</span>`;
      return;
    }

    const colors = {
      CALCULATION_SLIP: "#da3633",
      READING_TRAP: "#d29922",
      FORMULA_AMNESIA: "#8957e5",
      CONCEPT_VOID: "#38bdf8",
      RUSHED_PANIC: "#f43f5e",
      TIME_TRAP_Q4: "#e11d48",
      SECOND_GUESS_BLUNDER: "#a855f7"
    };

    Object.keys(tagCounts).forEach(tag => {
      const percent = Math.round((tagCounts[tag] / totalTagged) * 100);
      const segColor = colors[tag] || "#388bfd";

      const seg = document.createElement("div");
      seg.className = "trap-heat-seg";
      seg.style.width = `${percent}%`;
      seg.style.background = segColor;
      seg.title = `${tag}: ${tagCounts[tag]} (${percent}%)`;
      bar.appendChild(seg);

      const legItem = document.createElement("span");
      legItem.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${segColor}; margin-right:4px;"></span>${tag.replace(/_/g, ' ')} (${percent}%)`;
      legend.appendChild(legItem);
    });
  }

  function renderDashboardSubjectBatteries(completed) {
    const container = document.getElementById("dash-subject-batteries");
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

  // RECENT HISTORY RENDERER: Numerically sorted with Ticket-Card layout
  function renderRecentHistory(completed) {
    const container = document.getElementById("mock-history-container");
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
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.openSaveBlueprintModal('FIXED_PAPER', '${att.sessionId}')">📌 Freeze Paper</button>
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--status-green);" onclick="CGL_OS.reattemptMock('${att.sessionId}')">🔁 Re-attempt</button>
          <button class="btn btn-secondary" style="padding:4px 10px; font-size:11px;" onclick="CGL_OS.openMockReview('${att.sessionId}')">Inspect Solutions</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function openHistoryArchiveModal() {
    pushNavLayer("modal-history-archive", () => {
      document.getElementById("modal-history-archive").classList.remove("active");
    });
    document.getElementById("modal-history-archive").classList.add("active");
    renderArchiveList("ALL");
  }

  // MASTER HISTORY ARCHIVE: Chronologically Sorted with Threaded Accordions & Clean Buttons
  async function renderArchiveList(filterType) {
    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);
    const container = document.getElementById("archive-list-container");
    container.innerHTML = "";

    // Chronological numerical sort (Latest first)
    let list = completed.slice().sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (filterType !== "ALL") {
      list = list.filter(a => a.mockType === filterType);
    }

    if (list.length === 0) {
      container.innerHTML = `<p style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">No tests found in this category.</p>`;
      return;
    }

    // Group into threads
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
            <b>Attempt ${iter.attemptNumber || 1}</b> • <span style="color:var(--text-muted);">${iter.timeIST ? iter.timeIST.split(',')[1] : ''}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; color:var(--accent-cyan);">${(iter.finalScore || 0).toFixed(1)} pts</span>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.openMockReview('${iter.sessionId}')">Inspect</button>
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

      // Dedicated Action Bar to prevent button overflow
      const footerBar = document.createElement("div");
      footerBar.className = "ticket-actions-bar";
      footerBar.style.padding = "8px 12px";
      footerBar.innerHTML = `
        <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.openSaveBlueprintModal('FIXED_PAPER', '${latest.sessionId}')">📌 Freeze Paper</button>
        <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--status-green);" onclick="CGL_OS.reattemptMock('${latest.sessionId}')">🔁 Re-attempt</button>
        <button class="btn btn-secondary" style="padding:4px 10px; font-size:11px;" onclick="CGL_OS.openMockReview('${latest.sessionId}')">Inspect Latest</button>
      `;
      div.appendChild(footerBar);

      container.appendChild(div);
    });
  }

  async function renderDrilldownSubjectLevel() {
    document.getElementById("drilldown-breadcrumb").innerText = "Global";
    document.getElementById("drill-level-tag").innerText = "LEVEL: SUBJECT";

    const list = document.getElementById("drilldown-list");
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
    document.getElementById("drilldown-breadcrumb").innerHTML = `<span onclick="CGL_OS.renderDashboard()">Global</span> &gt; <b>${subKey}</b>`;
    document.getElementById("drill-level-tag").innerText = "LEVEL: CHAPTERS";

    const list = document.getElementById("drilldown-list");
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
    document.getElementById("insp-chapter-title").innerText = chap;
    document.getElementById("insp-subject-title").innerText = TAXONOMY[subKey] ? TAXONOMY[subKey].name : subKey;

    const acc = attCount > 0 ? Math.round((corCount / attCount) * 100) : 0;
    const avgSpeed = attCount > 0 ? Math.round(secCount / attCount) : 0;
    document.getElementById("insp-acc").innerText = attCount > 0 ? `${acc}%` : "--";
    document.getElementById("insp-speed").innerText = attCount > 0 ? `${avgSpeed}s` : "--";

    const nc = attCount > 0 ? Math.max(0, (1 - (attCount / 50))).toFixed(2) : "1.00";
    document.getElementById("insp-nc").innerText = nc;

    document.getElementById("btn-launch-chapter-blitz").onclick = () => {
      document.getElementById("modal-chapter-inspector").classList.remove("active");
      launchConfiguredMockDirect(subKey, chap, 5, 5);
    };

    pushHistoryState("modal-chapter-inspector");
    document.getElementById("modal-chapter-inspector").classList.add("active");
  }

  /* -------------------------------------------------------------
   * 17. ANKI SM-2 FLASHCARD ENGINE WITH TWO-SIDED IMAGES
   * ------------------------------------------------------------- */
  let activeStudyDeck = [];
  let activeStudyIndex = 0;
  let activeStudyFlipped = false;

  function calculateSM2(card, quality) {
    let { interval = 1, repetition = 0, easeFactor = 2.5 } = card;

    if (quality < 3) {
      repetition = 0;
      interval = 1;
    } else {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = quality === 4 ? 4 : 2;
      } else {
        if (quality === 2) interval = Math.max(1, Math.round(interval * 1.2));
        else if (quality === 3) interval = Math.round(interval * easeFactor);
        else if (quality === 4) interval = Math.round(interval * easeFactor * 1.3);
      }
      repetition++;
    }

    const qFactor = quality + 1;
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - qFactor) * (0.08 + (5 - qFactor) * 0.02)));

    const now = Date.now();
    const nextReviewDate = now + (interval * 24 * 60 * 60 * 1000);

    return {
      ...card,
      interval,
      repetition,
      easeFactor: parseFloat(easeFactor.toFixed(2)),
      nextReviewDate,
      lastAttempted: now
    };
  }

  async function renderVault() {
    await renderFlashcardList();
  }

  async function renderFlashcardList() {
    const flashcards = await getAllRecords("store_flashcards");
    const container = document.getElementById("flashcard-list-container");
    if (!container) return;
    container.innerHTML = "";

    const now = Date.now();
    let dueCount = 0;
    let learningCount = 0;
    let masteredCount = 0;

    flashcards.forEach(f => {
      if (f.nextReviewDate <= now) dueCount++;
      if (f.repetition >= 3 && f.interval >= 14) masteredCount++;
      else learningCount++;
    });

    document.getElementById("sm2-due-badge").innerText = `${dueCount} Due`;
    document.getElementById("sm2-btn-count").innerText = dueCount;
    document.getElementById("sm2-count-due").innerText = dueCount;
    document.getElementById("sm2-count-learning").innerText = learningCount;
    document.getElementById("sm2-count-mastered").innerText = masteredCount;

    const filterSub = document.getElementById("sm2-deck-filter-sub") ? document.getElementById("sm2-deck-filter-sub").value : "ALL";
    const filteredCards = flashcards.filter(f => filterSub === "ALL" || f.subject === filterSub);

    if (filteredCards.length === 0) {
      container.innerHTML = `<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:16px;">Deck is clear. Zero cards in this selection.</div>`;
      return;
    }

    filteredCards.sort((a, b) => a.nextReviewDate - b.nextReviewDate);

    filteredCards.slice(0, 30).forEach(f => {
      const isDue = f.nextReviewDate <= now;
      const daysUntil = Math.ceil((f.nextReviewDate - now) / (24 * 60 * 60 * 1000));
      const dueStatusText = isDue 
        ? `<b style="color:var(--status-red);">⚡ DUE NOW</b>` 
        : `<span style="color:var(--text-muted);">Due in ${daysUntil}d (Int: ${f.interval}d)</span>`;

      const div = document.createElement("div");
      div.className = "card";
      div.style.borderColor = isDue ? "var(--status-red)" : "var(--border-color)";
      div.style.marginBottom = "8px";

      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div>
            <span class="badge" style="background:#151a24; color:var(--accent-purple-light);">${f.subject}</span>
            <span class="badge" style="background:#151a24; color:var(--accent-cyan); margin-left:4px;">${f.chapter}</span>
          </div>
          <div style="font-size:10px; font-family:var(--font-mono);">${dueStatusText}</div>
        </div>
        <div style="font-size:13.5px; line-height:1.5; margin:6px 0; color:#fff;">${formatRichText(f.front)}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:6px;">EF: ${f.easeFactor} • Reps: ${f.repetition} • Last: ${formatISTDate(f.lastAttempted)}</div>
        <div style="display:flex; justify-content:flex-end; gap:6px;">
          <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.openFlashcardEditorModal(false, '${f.id}')">Edit</button>
        </div>
      `;
      container.appendChild(div);
    });
  }

  async function launchFlashcardDueSprint() {
    const flashcards = await getAllRecords("store_flashcards");
    const now = Date.now();
    const filterSub = document.getElementById("sm2-deck-filter-sub") ? document.getElementById("sm2-deck-filter-sub").value : "ALL";

    let dueCards = flashcards.filter(f => (filterSub === "ALL" || f.subject === filterSub) && f.nextReviewDate <= now);
    if (dueCards.length === 0) {
      dueCards = flashcards.filter(f => filterSub === "ALL" || f.subject === filterSub);
    }

    if (dueCards.length === 0) {
      alert("Flashcard deck is completely empty! Add cards or import an AI consultation payload.");
      return;
    }

    activeStudyDeck = dueCards;
    activeStudyIndex = 0;
    activeStudyFlipped = false;

    pushNavLayer("modal-flashcard-study", () => {
      document.getElementById("modal-flashcard-study").classList.remove("active");
    });
    document.getElementById("modal-flashcard-study").classList.add("active");
    renderCurrentStudyFlashcard();
  }

  function renderCurrentStudyFlashcard() {
    const card = activeStudyDeck[activeStudyIndex];
    if (!card) return;

    activeStudyFlipped = false;
    document.getElementById("fc-study-progress").innerText = `Card ${activeStudyIndex + 1} of ${activeStudyDeck.length}`;
    document.getElementById("fc-card-chapter").innerText = `${card.subject} • ${card.chapter}`;
    document.getElementById("fc-card-interval-tag").innerText = `Int: ${card.interval}d | Reps: ${card.repetition}`;
    document.getElementById("fc-card-body").innerHTML = formatRichText(card.front);

    const fBox = document.getElementById("fc-card-front-img-box");
    if (card.frontImageUrl && card.frontImageUrl.trim().length > 0) {
      fBox.style.display = "block";
      fBox.innerHTML = `<img src="${card.frontImageUrl}" alt="Front Diagram">`;
    } else {
      fBox.style.display = "none";
      fBox.innerHTML = "";
    }

    const bBox = document.getElementById("fc-card-back-img-box");
    bBox.style.display = "none";
    bBox.innerHTML = "";

    document.getElementById("fc-card-cue").innerText = "Tap card to flip answer";
    document.getElementById("fc-study-actions").style.display = "none";
  }

  function flipStudyFlashcard() {
    if (activeStudyFlipped) return;
    const card = activeStudyDeck[activeStudyIndex];
    if (!card) return;

    activeStudyFlipped = true;

    const bBox = document.getElementById("fc-card-back-img-box");
    if (card.backImageUrl && card.backImageUrl.trim().length > 0) {
      bBox.style.display = "block";
      bBox.innerHTML = `<img src="${card.backImageUrl}" alt="Back Visual Proof">`;
    } else {
      bBox.style.display = "none";
      bBox.innerHTML = "";
    }

    document.getElementById("fc-card-body").innerHTML = `
      <div style="color:var(--text-muted); font-size:12px; margin-bottom:8px;">${formatRichText(card.front)}</div>
      <hr style="border:0; border-top:1px solid var(--border-color); margin:8px 0;">
      <div style="font-weight:700; color:#fff;">${formatRichText(card.back)}</div>
    `;
    document.getElementById("fc-card-cue").innerText = "Select recall rating below:";
    document.getElementById("fc-study-actions").style.display = "block";
  }

  async function gradeStudyFlashcard(quality) {
    const card = activeStudyDeck[activeStudyIndex];
    if (!card) return;

    const updated = calculateSM2(card, quality);
    await putRecord("store_flashcards", updated);

    activeStudyIndex++;
    if (activeStudyIndex < activeStudyDeck.length) {
      renderCurrentStudyFlashcard();
    } else {
      alert("Daily Spaced Recall Sprint Complete! All due cards reviewed.");
      document.getElementById("modal-flashcard-study").classList.remove("active");
      renderVault();
    }
  }

  async function openFlashcardEditorModal(isNew = true, cardId = null) {
    currentFcFrontImgBase64 = "";
    currentFcBackImgBase64 = "";

    if (isNew) {
      document.getElementById("flashcard-editor-title").innerText = "Add New Flashcard";
      document.getElementById("edit-fc-id").value = "fc_" + Date.now();
      document.getElementById("edit-fc-subject").value = "QA";
      document.getElementById("edit-fc-chapter").value = "QA_GEOMETRY";
      document.getElementById("edit-fc-front").value = "";
      document.getElementById("edit-fc-front-img-url").value = "";
      document.getElementById("edit-fc-front-img-file").value = "";
      document.getElementById("edit-fc-back").value = "";
      document.getElementById("edit-fc-back-img-url").value = "";
      document.getElementById("edit-fc-back-img-file").value = "";
      document.getElementById("edit-fc-tags").value = "";
      document.getElementById("btn-delete-fc").style.display = "none";
    } else {
      const card = await getRecord("store_flashcards", cardId);
      if (!card) return;
      document.getElementById("flashcard-editor-title").innerText = "Edit Flashcard";
      document.getElementById("edit-fc-id").value = card.id;
      document.getElementById("edit-fc-subject").value = card.subject;
      document.getElementById("edit-fc-chapter").value = card.chapter;
      document.getElementById("edit-fc-front").value = card.front;
      document.getElementById("edit-fc-front-img-url").value = card.frontImageUrl || "";
      document.getElementById("edit-fc-front-img-file").value = "";
      document.getElementById("edit-fc-back").value = card.back;
      document.getElementById("edit-fc-back-img-url").value = card.backImageUrl || "";
      document.getElementById("edit-fc-back-img-file").value = "";
      document.getElementById("edit-fc-tags").value = Array.isArray(card.tags) ? card.tags.join(', ') : "";
      document.getElementById("btn-delete-fc").style.display = "block";
    }

    pushHistoryState("modal-flashcard-editor");
    document.getElementById("modal-flashcard-editor").classList.add("active");
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
    const id = document.getElementById("edit-fc-id").value;
    const subject = document.getElementById("edit-fc-subject").value;
    const chapter = document.getElementById("edit-fc-chapter").value.trim().toUpperCase();
    const front = document.getElementById("edit-fc-front").value.trim();
    const back = document.getElementById("edit-fc-back").value.trim();
    const frontUrl = document.getElementById("edit-fc-front-img-url").value.trim();
    const backUrl = document.getElementById("edit-fc-back-img-url").value.trim();
    const tagsRaw = document.getElementById("edit-fc-tags").value.trim();

    if (!front || !back || !chapter) {
      alert("Front Prompt, Back Answer, and Chapter are required.");
      return;
    }

    const existing = await getRecord("store_flashcards", id);
    const cardObj = {
      id: id,
      subject: subject,
      chapter: chapter,
      front: front,
      frontImageUrl: currentFcFrontImgBase64 || frontUrl || (existing ? existing.frontImageUrl : ""),
      back: back,
      backImageUrl: currentFcBackImgBase64 || backUrl || (existing ? existing.backImageUrl : ""),
      interval: existing ? existing.interval : 1,
      repetition: existing ? existing.repetition : 0,
      easeFactor: existing ? existing.easeFactor : 2.5,
      nextReviewDate: existing ? existing.nextReviewDate : Date.now(),
      lastAttempted: Date.now(),
      tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()) : ["Manual"]
    };

    await putRecord("store_flashcards", cardObj);
    document.getElementById("modal-flashcard-editor").classList.remove("active");
    renderVault();
  }

  async function deleteCurrentEditingFlashcard() {
    const id = document.getElementById("edit-fc-id").value;
    if (confirm("Permanently delete this flashcard?")) {
      await deleteRecordFromStore("store_flashcards", id);
      document.getElementById("modal-flashcard-editor").classList.remove("active");
      renderVault();
    }
  }

  async function wipeFlashcardStore() {
    if (confirm("Permanently wipe all flashcards from the SM-2 engine?")) {
      await clearStore("store_flashcards");
      alert("Flashcard deck wiped.");
      renderVault();
    }
  }

  /* -------------------------------------------------------------
   * 18. QUESTION GUI EDITOR
   * ------------------------------------------------------------- */
  let currentQuestionImageBase64 = "";

  function openEditQuestionModal(qData) {
    const isNew = !qData;
    currentQuestionImageBase64 = "";
    document.getElementById("editor-title").innerText = isNew ? "Add New Question" : "Edit Question";
    document.getElementById("edit-q-id").value = isNew ? "q_cgl_" + Date.now() : qData.id;
    document.getElementById("edit-q-subject").value = isNew ? "QA" : qData.subject;
    document.getElementById("edit-q-chapter").value = isNew ? "QA_GEOMETRY" : qData.chapter;
    document.getElementById("edit-q-subtopic").value = isNew ? "" : (qData.subtopic || "");
    document.getElementById("edit-q-method").value = isNew ? "" : (qData.method || "");
    document.getElementById("edit-q-concept-id").value = isNew ? "" : (qData.conceptId || "");
    document.getElementById("edit-q-text").value = isNew ? "" : qData.questionText;
    document.getElementById("edit-q-img-url").value = isNew ? "" : (qData.imageUrl || "");
    document.getElementById("edit-q-img-file").value = "";

    document.getElementById("edit-opt-0").value = isNew ? "" : (qData.options[0] || "");
    document.getElementById("edit-opt-1").value = isNew ? "" : (qData.options[1] || "");
    document.getElementById("edit-opt-2").value = isNew ? "" : (qData.options[2] || "");
    document.getElementById("edit-opt-3").value = isNew ? "" : (qData.options[3] || "");

    document.getElementById("edit-q-correct").value = isNew ? "0" : qData.correctIndex;
    document.getElementById("edit-q-explanation").value = isNew ? "" : (qData.explanation || "");

    document.getElementById("btn-delete-q").style.display = isNew ? "none" : "block";
    pushHistoryState("modal-question-editor");
    document.getElementById("modal-question-editor").classList.add("active");
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
    const id = document.getElementById("edit-q-id").value;
    const urlInput = document.getElementById("edit-q-img-url").value.trim();

    const qObj = {
      id: id,
      subject: document.getElementById("edit-q-subject").value,
      chapter: document.getElementById("edit-q-chapter").value.trim().toUpperCase(),
      subtopic: document.getElementById("edit-q-subtopic").value.trim(),
      method: document.getElementById("edit-q-method").value.trim(),
      conceptId: document.getElementById("edit-q-concept-id").value.trim(),
      questionText: document.getElementById("edit-q-text").value.trim(),
      imageUrl: currentQuestionImageBase64 || urlInput,
      options: [
        document.getElementById("edit-opt-0").value.trim(),
        document.getElementById("edit-opt-1").value.trim(),
        document.getElementById("edit-opt-2").value.trim(),
        document.getElementById("edit-opt-3").value.trim()
      ],
      correctIndex: parseInt(document.getElementById("edit-q-correct").value),
      explanation: document.getElementById("edit-q-explanation").value.trim(),
      tags: ["UserSaved"],
      annotation: ""
    };

    await putRecord("store_questions", qObj);
    document.getElementById("modal-question-editor").classList.remove("active");
    if (dojoExam) {
      dojoExam.questions[dojoExam.currentIndex] = qObj;
      renderDojoArenaQuestion();
    }
    refreshDbInspector();
  }

  async function deleteCurrentEditingQuestion() {
    const id = document.getElementById("edit-q-id").value;
    if (confirm(`Delete question ${id}?`)) {
      await deleteRecordFromStore("store_questions", id);
      document.getElementById("modal-question-editor").classList.remove("active");
      if (dojoExam) {
        dojoExam.questions = dojoExam.questions.filter(q => q.id !== id);
        if (dojoExam.currentIndex >= dojoExam.questions.length) dojoExam.currentIndex = 0;
        renderDojoArenaQuestion();
      }
      refreshDbInspector();
    }
  }

  /* -------------------------------------------------------------
   * 19. HARDENED COMMAND BUS & MULTI-SECTION ARENA ENGINE
   * ------------------------------------------------------------- */
  async function executeConsoleCommand() {
    const raw = document.getElementById("console-payload").value.trim();
    let cmd;
    try {
      cmd = JSON.parse(raw);
    } catch (err) {
      alert("Invalid JSON Syntax: " + err.message);
      return;
    }

    try {
      const database = await getDB();
      if (!database) throw new Error("IndexedDB instance unavailable.");

      if (cmd.action === "EXECUTE_AI_CONSULTATION_BUNDLE") {
        const { consultationDossier, actions = [] } = cmd.payload || {};
        if (consultationDossier) {
          const now = Date.now();
          consultationDossier.id = consultationDossier.consultationId || `consult_${now}`;
          consultationDossier.timestamp = now;
          consultationDossier.timeIST = formatISTDate(now);
          await putRecord("store_ai_consultations", consultationDossier);
        }

        for (const act of actions) {
          if (act.action === "BATCH_INGEST_FLASHCARDS") {
            const cards = (act.payload.cards || []).map(sanitizeFlashcard);
            const txF = database.transaction(["store_flashcards"], "readwrite");
            const stF = txF.objectStore("store_flashcards");
            cards.forEach(c => stF.put(c));
            await new Promise(r => txF.oncomplete = r);
            renderVault();
          } else if (act.action === "BATCH_INGEST_COMPENDIUM") {
            const dossiers = (act.payload.dossiers || []).map(sanitizeDossier);
            const txC = database.transaction(["store_concepts"], "readwrite");
            const stC = txC.objectStore("store_concepts");
            dossiers.forEach(d => stC.put(d));
            await new Promise(r => txC.oncomplete = r);
          } else if (act.action === "INGEST_AND_LAUNCH_MOCK") {
            const questions = (act.payload.questions || []).map(sanitizeQuestion);
            if (questions.length > 0) {
              const txQ = database.transaction(["store_questions"], "readwrite");
              const stQ = txQ.objectStore("store_questions");
              questions.forEach(q => stQ.put(q));
              await new Promise(r => txQ.oncomplete = r);
              compileAndLaunchArena(act.payload.title || "AI Remedial Test", questions, act.payload.durationMin || 15);
            }
          }
        }
        alert("AI Consultation Bundle Executed Successfully! Clinical record saved.");

      } else if (cmd.action === "REQUEST_HISTORICAL_DUMP") {
        const { targetSubject, timeframeDays = 30 } = cmd.payload || {};
        const cutoff = Date.now() - (timeframeDays * 24 * 60 * 60 * 1000);
        const allAttempts = await getAllRecords("store_attempts");
        const dump = allAttempts.filter(a => a.completed && a.timestamp >= cutoff).map(a => ({
          sessionId: a.sessionId,
          timeIST: a.timeIST || formatISTDate(a.timestamp),
          diurnalSlot: a.diurnalSlot || getDiurnalSlot(a.timestamp),
          score: a.finalScore,
          questions: a.questions.filter(q => !targetSubject || q.subject === targetSubject).map(q => ({
            id: q.id,
            chapter: q.chapter,
            resp: a.userResponses[q.id]
          }))
        }));

        document.getElementById("console-payload").value = JSON.stringify({
          action: "HISTORICAL_DUMP_RESPONSE",
          payload: { targetSubject, timeframeDays, dump }
        }, null, 2);
        alert(`Historical dump compiled (${dump.length} attempts)! Payload placed in console.`);
        return;

      } else if (cmd.action === "INGEST_AND_LAUNCH_MOCK") {
        const questions = (cmd.payload.questions || []).map(sanitizeQuestion);
        if (questions.length === 0) {
          alert("No questions found in payload to launch mock.");
          return;
        }

        const tx = database.transaction(["store_questions"], "readwrite");
        const st = tx.objectStore("store_questions");
        questions.forEach(q => st.put(q));
        await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });

        compileAndLaunchArena(
          cmd.payload.title || "AI Practice Mock",
          questions,
          cmd.payload.durationMin || 15
        );

      } else if (cmd.action === "AI_PRESCRIBE_REMEDY") {
        const qIds = cmd.payload.questionIds || [];
        const newQuestions = (cmd.payload.newQuestions || []).map(sanitizeQuestion);

        if (newQuestions.length > 0) {
          const tx = database.transaction(["store_questions"], "readwrite");
          const st = tx.objectStore("store_questions");
          newQuestions.forEach(q => st.put(q));
          await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
        }

        const allQs = await getAllRecords("store_questions");
        let remedialPool = allQs.filter(q => qIds.includes(q.id));
        if (newQuestions.length > 0) {
          remedialPool = [...remedialPool, ...newQuestions];
        }

        if (remedialPool.length === 0) {
          alert("Could not compile remedy pool. No matching questions found in bank.");
          return;
        }

        compileAndLaunchArena(
          cmd.payload.title || "AI Prescribed Remedial Blitz",
          remedialPool,
          cmd.payload.durationMin || 10
        );

      } else if (cmd.action === "BATCH_INGEST_FLASHCARDS") {
        const cards = (cmd.payload.cards || []).map(sanitizeFlashcard);
        const txF = database.transaction(["store_flashcards"], "readwrite");
        const stF = txF.objectStore("store_flashcards");
        cards.forEach(c => stF.put(c));
        await new Promise(r => txF.oncomplete = r);
        alert(`Ingested ${cards.length} flashcards into SM-2 engine.`);
        renderVault();

      } else if (cmd.action === "BATCH_INGEST_QUESTIONS") {
        const list = (cmd.payload.questions || []).map(sanitizeQuestion);
        const tx = database.transaction(["store_questions"], "readwrite");
        const st = tx.objectStore("store_questions");
        list.forEach(q => st.put(q));
        await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
        alert(`Ingested ${list.length} questions successfully into bank.`);

      } else if (cmd.action === "BATCH_INGEST_COMPENDIUM") {
        const dossiers = (cmd.payload.dossiers || []).map(sanitizeDossier);
        const txC = database.transaction(["store_concepts"], "readwrite");
        const stC = txC.objectStore("store_concepts");
        dossiers.forEach(d => stC.put(d));
        await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
        alert(`Ingested ${dossiers.length} topic dossiers successfully.`);

      } else if (cmd.action === "SAVE_MOCK_PRESET") {
        const preset = sanitizeSavedMock(cmd.payload, Date.now());
        await putRecord("store_saved_mocks", preset);
        alert(`Saved mock setup: "${preset.title}".`);
        await renderDashboardBlueprints();

      } else if (cmd.action === "MODIFY_TAXONOMY") {
        const { operation, subject, chapter } = cmd.payload;
        if (operation === "ADD_CHAPTER" && TAXONOMY[subject]) {
          if (!TAXONOMY[subject].chapters.includes(chapter)) {
            TAXONOMY[subject].chapters.push(chapter);
          }
        } else if (operation === "DELETE_CHAPTER" && TAXONOMY[subject]) {
          TAXONOMY[subject].chapters = TAXONOMY[subject].chapters.filter(c => c !== chapter);
        }
        await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
        alert(`Taxonomy updated: ${operation} on ${chapter}`);
        await syncAllTaxonomyDropdowns();

      } else if (cmd.action === "RAW_DB_OPERATION") {
        const { store, operation, key, record } = cmd.payload;
        if (operation === "PUT") await putRecord(store, record);
        else if (operation === "DELETE") await deleteRecordFromStore(store, key);
        else if (operation === "CLEAR") await clearStore(store);
        alert(`Executed ${operation} on ${store}`);

      } else {
        alert("Unknown Command Action: " + (cmd.action || "undefined"));
      }

      refreshDbInspector();
      renderDashboard();
    } catch (err) {
      alert("Command Execution Error: " + err.message);
    }
  }

  // MULTI-SECTION AWARE ARENA LAUNCHER (Eliminates Single-Section Flattening)
  async function compileAndLaunchArena(title, questionsPool, durationMin) {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

    // Detect if questions contain multiple distinct sections or subject partitions
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
    let configuredSections = [];
    let flattenedQuestions = [];
    let globalCounter = 1;

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
      isSectionLocked: false,
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

    // Release focus from background textareas on mobile
    if (document.activeElement) document.activeElement.blur();

    pushNavLayer("exam-arena", () => {
      const pauseBtn = document.getElementById("btn-arena-pause");
      if (pauseBtn) pauseBtn.click();
    });
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
  }

  function loadSamplePayload(type) {
    if (type === "REMEDY") {
      const sample = {
        action: "AI_PRESCRIBE_REMEDY",
        payload: {
          title: "Geometry & Time-Work Remedial Blitz",
          durationMin: 10,
          questionIds: ["q_cgl_qa_geom_011", "q_cgl_qa_tw_010", "q_qa_geom_002"],
          newQuestions: []
        }
      };
      document.getElementById("console-payload").value = JSON.stringify(sample, null, 2);
    }
  }

  /* -------------------------------------------------------------
   * 20. DIRECT DATABASE STUDIO (MODAL-BASED FULL INSPECTOR)
   * ------------------------------------------------------------- */
  async function refreshDbInspector() {
    const storeName = document.getElementById("db-store-select").value;
    const records = await getAllRecords(storeName);
    const list = document.getElementById("db-inspector-list");
    list.innerHTML = "";

    records.forEach(rec => {
      const key = rec.id || rec.sessionId || rec.questionId || rec.key;
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "6px 0";
      row.style.borderBottom = "1px solid var(--border-color)";
      row.innerHTML = `
        <span style="font-family:var(--font-mono); font-size:11.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:70%;">${key}</span>
        <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.editDbRecordModal('${storeName}', '${key}')">Inspect</button>
      `;
      list.appendChild(row);
    });
  }

  // DEDICATED JSON INSPECTOR MODAL (ELIMINATES ALERT TRUNCATION)
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
      document.getElementById("db-inspect-modal-title").innerText = `${sName} Record`;
      document.getElementById("db-inspect-modal-key").innerText = `KEY: ${key}`;
      document.getElementById("db-inspect-code-content").innerText = activeInspectedJsonString;

      pushNavLayer("modal-db-inspector-viewer", () => {
        document.getElementById("modal-db-inspector-viewer").classList.remove("active");
      });
      document.getElementById("modal-db-inspector-viewer").classList.add("active");
    }
  }

  function copyInspectedJsonToClipboard() {
    if (!activeInspectedJsonString) return;
    navigator.clipboard.writeText(activeInspectedJsonString);
    alert("Record JSON copied to clipboard!");
  }

  async function wipeTestAttempts() {
    if (confirm("Permanently clear standard mock test history?")) {
      await clearStore("store_attempts");
      alert("Standard test history cleared.");
      renderDashboard();
      refreshDbInspector();
    }
  }

  async function factoryResetAll() {
    if (confirm("WARNING: Complete factory reset will wipe all data and re-seed defaults!")) {
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
      await syncAllTaxonomyDropdowns();
      renderDashboard();
      refreshDbInspector();
    }
  }

  /* -------------------------------------------------------------
   * 21. UNIVERSAL TOUCH GESTURES (VIEWPORT & HARDWARE SHIELD)
   * ------------------------------------------------------------- */
  function initGestureControllers() {
    const attachSwipeHandler = (elementId, onLeftSwipe, onRightSwipe) => {
      const el = document.getElementById(elementId);
      if (!el) return;
      let startX = 0, startY = 0;

      el.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      el.addEventListener("touchend", (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;

        if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 35) {
          if (navigator.vibrate) navigator.vibrate(15);
          if (deltaX < 0) onLeftSwipe();
          else onRightSwipe();
        }
      }, { passive: true });
    };

    attachSwipeHandler("arena-body", () => document.getElementById("btn-q-save-next").click(), () => document.getElementById("btn-q-prev").click());
    attachSwipeHandler("dojo-arena-body", () => navDojoArena(1), () => navDojoArena(-1));
    attachSwipeHandler("comp-studio-canvas", () => navCompStudioSheet(1), () => navCompStudioSheet(-1));

    const viewportRoot = document.getElementById("app-viewport-root");
    let rootStartX = 0, rootStartY = 0;
    const tabSequence = ["tab-dashboard", "tab-dojo", "tab-console", "tab-vault"];

    viewportRoot.addEventListener("touchstart", (e) => {
      rootStartX = e.touches[0].clientX;
      rootStartY = e.touches[0].clientY;
    }, { passive: true });

    viewportRoot.addEventListener("touchend", (e) => {
      const arenaView = document.getElementById("exam-arena");
      const dojoView = document.getElementById("dojo-arena-view");
      const compView = document.getElementById("compendium-fullscreen-view");
      const openModals = document.querySelectorAll(".modal-overlay.active");
      if (arenaView.style.display === "flex" || dojoView.style.display === "flex" || compView.style.display === "flex" || openModals.length > 0) {
        return;
      }

      const target = e.target;
      if (target.closest("textarea") || target.closest(".palette-scroll-body") || target.closest("#dash-blueprints-pills") || target.closest(".synapse-tree-container")) {
        return;
      }

      const deltaX = e.changedTouches[0].clientX - rootStartX;
      const deltaY = e.changedTouches[0].clientY - rootStartY;

      if (Math.abs(deltaX) > 70 && Math.abs(deltaY) < 35) {
        const activeTabEl = document.querySelector(".view-container.active");
        if (!activeTabEl) return;
        const currentIdx = tabSequence.indexOf(activeTabEl.id);
        if (currentIdx === -1) return;

        if (deltaX < 0 && currentIdx < tabSequence.length - 1) {
          switchTab(tabSequence[currentIdx + 1], document.getElementById(`nav-btn-${tabSequence[currentIdx + 1]}`));
        } else if (deltaX > 0 && currentIdx > 0) {
          switchTab(tabSequence[currentIdx - 1], document.getElementById(`nav-btn-${tabSequence[currentIdx - 1]}`));
        }
      }
    }, { passive: true });

    window.addEventListener("popstate", () => {
      if (navStack.length > 0) {
        popNavLayer();
      } else {
        const arenaView = document.getElementById("exam-arena");
        if (arenaView && arenaView.style.display === "flex") {
          if (activeExam && activeExam.isReviewMode) exitReviewArena();
          else document.getElementById("btn-arena-pause").click();
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
  }

  /* -------------------------------------------------------------
   * 22. SELECTIVE PRINT ENGINE
   * ------------------------------------------------------------- */
  async function openPrintConfigModal() {
    await updatePrintChapters();
    await populatePrintMockDropdown();
    pushHistoryState("modal-print-config");
    document.getElementById("modal-print-config").classList.add("active");
  }

  async function populatePrintMockDropdown() {
    const attempts = await getAllRecords("store_attempts");
    const select = document.getElementById("print-mock-select");
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
    document.getElementById("print-sub-wrap").style.display = isQ ? "block" : "none";
    document.getElementById("print-chap-wrap").style.display = isQ ? "block" : "none";
    document.getElementById("print-mock-select-wrap").style.display = isMock ? "block" : "none";
  }

  async function updatePrintChapters() {
    const sub = document.getElementById("print-subject").value;
    const chapSelect = document.getElementById("print-chapter");
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

  async function generateAndPrintSheet() {
    document.getElementById("modal-print-config").classList.remove("active");
    const pType = document.getElementById("print-type").value;
    const sub = document.getElementById("print-subject").value;
    const chap = document.getElementById("print-chapter").value;
    const incAns = document.getElementById("print-include-ans").value === "YES";

    const root = document.getElementById("print-sheet-root");
    root.innerHTML = "";

    if (pType === "QUESTIONS") {
      const allQs = await getAllRecords("store_questions");
      let pool = sub === "ALL" ? allQs : allQs.filter(q => q.subject === sub);
      if (chap !== "ALL") pool = pool.filter(q => q.chapter === chap);

      root.innerHTML = `<h2 style="font-size:16px; margin-bottom:12px; column-span:all;">SSC CGL Practice Spool (${sub} - ${chap})</h2>`;
      pool.forEach((q, idx) => {
        const item = document.createElement("div");
        item.className = "print-question";
        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';
        item.innerHTML = `
          <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
          ${q.options.map((opt, i) => `(${i + 1})${formatRichText(opt)} &nbsp;`).join(' ')}
          ${incAns ? `<div style="font-size:10px; margin-top:4px;"><b>Answer:</b> Option ${q.correctIndex + 1} \vert{} <i>${q.explanation || ''}</i></div>` : ''}
        `;
        root.appendChild(item);
      });
    } else if (pType === "PAST_MOCK") {
      const mockId = document.getElementById("print-mock-select").value;
      const attempts = await getAllRecords("store_attempts");
      const targetMock = attempts.find(a => a.sessionId === mockId);
      if (!targetMock) return;

      root.innerHTML = `<h2 style="font-size:16px; margin-bottom:12px; column-span:all;">${targetMock.title} - Score: ${targetMock.finalScore.toFixed(2)} (${targetMock.timeIST || formatISTDate(targetMock.timestamp)})</h2>`;
      targetMock.questions.forEach((q, idx) => {
        const resp = targetMock.userResponses && targetMock.userResponses[q.id] ? targetMock.userResponses[q.id] : {};
        const item = document.createElement("div");
        item.className = "print-question";
        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';
        item.innerHTML = `
          <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
          ${q.options.map((opt, i) => `(${i + 1})${formatRichText(opt)} &nbsp;`).join(' ')}
          ${incAns ? `<div style="font-size:10px; margin-top:4px;"><b>Selected:</b> Option ${resp.selectedOption !== null && resp.selectedOption !== undefined ? resp.selectedOption + 1 : 'None'} | <b>Correct:</b> Option ${q.correctIndex + 1} \vert{} <i>${q.explanation || ''}</i></div>` : ''}
        `;
        root.appendChild(item);
      });
    } else if (pType === "COMPENDIUM") {
      const dossiers = await getAllRecords("store_concepts");
      let pool = sub === "ALL" ? dossiers : dossiers.filter(d => d.subject === sub);
      if (chap !== "ALL") pool = pool.filter(d => d.chapter === chap);

      root.innerHTML = `<h2 style="font-size:16px; margin-bottom:12px; column-span:all;">SSC CGL Knowledge Compendium (${sub} - ${chap})</h2>`;
      pool.forEach((t, idx) => {
        const item = document.createElement("div");
        item.className = "print-question";
        let img = t.imageUrl ? `<br><img src="${t.imageUrl}" style="max-height:120px; max-width:100%;">` : '';
        item.innerHTML = `
          <strong>${idx + 1}. ${t.title} [${t.chapter}]</strong> ${t.subtitle ? `<i>(${t.subtitle})</i>` : ''}<br>
          ${formatRichText(t.content)}${img}
        `;
        root.appendChild(item);
      });
    } else if (pType === "FLASHCARDS") {
      const flashcards = await getAllRecords("store_flashcards");
      let pool = sub === "ALL" ? flashcards : flashcards.filter(f => f.subject === sub);
      root.innerHTML = `<h2 style="font-size:16px; margin-bottom:12px; column-span:all;">SSC CGL SM-2 Flashcard Revision Sheet</h2>`;
      pool.forEach((f, idx) => {
        const item = document.createElement("div");
        item.className = "print-question";
        let fImg = f.frontImageUrl ? `<br><img src="${f.frontImageUrl}" style="max-height:100px; max-width:100%;">` : '';
        let bImg = f.backImageUrl ? `<br><img src="${f.backImageUrl}" style="max-height:100px; max-width:100%;">` : '';
        item.innerHTML = `
          <strong>Card ${idx + 1}. [${f.subject} • ${f.chapter}]</strong><br>
          <b>Prompt:</b> ${formatRichText(f.front)}${fImg}<br>
          <div style="font-size:11px; margin-top:4px;"><b>Answer:</b> ${formatRichText(f.back)}${bImg}</div>
        `;
        root.appendChild(item);
      });
    }

    window.print();
  }

  /* -------------------------------------------------------------
   * 23. NAVIGATION, TAB SWITCHING & SYSTEM BOOT
   * ------------------------------------------------------------- */
  function switchTab(tId, btn) {
    document.querySelectorAll(".view-container").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));

    const targetEl = document.getElementById(tId);
    if (targetEl) targetEl.classList.add("active");

    const targetNavBtn = btn || document.getElementById(`nav-btn-${tId}`);
    if (targetNavBtn) targetNavBtn.classList.add("active");

    if (tId === "tab-dashboard") renderDashboard();
    if (tId === "tab-dojo") updateDojoChapters();
    if (tId === "tab-console") refreshDbInspector();
    if (tId === "tab-vault") renderVault();
  }

  async function initializeApplication() {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");

    try {
      await getDB();
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
      console.error("Application bootstrap notice:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApplication);
  } else {
    initializeApplication();
  }

  return {
    switchTab,
    openCustomMockModal,
    addCustomSectionRow,
    removeCustomSectionRow,
    updateCustomRowSubject,
    updateCustomRowCount,
    updateCustomRowDuration,
    applyBlueprintPreset,
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
    openCompendiumToSheet,
    jumpToConceptFromReview,
    jumpToConceptFromDojo,
    openOmniResearchForCurrentQuestion,
    openOmniResearchForDojoQuestion,
    launchCurrentSheetQuestionsDrill,
    openSynapseGraphModal,
    toggleSynapseNode,
    expandAllSynapseNodes,
    collapseAllSynapseNodes,
    launchSynapseChapterBlitz,
    launchDirectSheetDrill,
    updateDojoChapters,
    updateDojoMethods,
    launchFilteredDojo,
    exitDojoArena,
    navDojoArena,
    toggleDojoMethod,
    autoSaveDojoAnnotation,
    toggleDojoPalette,
    toggleExamPalette,
    openCompendiumStudio,
    closeCompendiumStudio,
    handleCompStudioSubjectChange,
    handleCompStudioChapterChange,
    navCompStudioSheet,
    autoSaveCompScratchpad,
    deleteCurrentCompendiumSheet,
    promptCreateNewChapter,
    openOmniSearchModal,
    executeOmniSearch,
    openSubjectDiagnosticModal,
    insertDossierSnippet,
    openConceptEditorModal,
    handleConceptImageUpload,
    saveConceptCard,
    openPrintConfigModal,
    handlePrintTypeChange,
    updatePrintChapters,
    generateAndPrintSheet,
    openEditQuestionModal,
    openEditCurrentDojoQuestion,
    handleQuestionImageUpload,
    saveQuestionEditor,
    deleteCurrentEditingQuestion,
    openMockReview,
    switchReviewAttempt,
    handleMistakeTagSelect,
    setMistakeTag,
    openTaxonomyManagerModal,
    addNewSubjectAction,
    promptAddChapterToSubject,
    deleteChapterFromSubject,
    deleteSubjectAction,
    syncEditorChapterDropdown,
    syncFlashcardChapterDropdown,
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
    copyLiveSystemManifestToClipboard,
    openHistoryArchiveModal,
    renderArchiveList,
    executeConsoleCommand,
    loadSamplePayload,
    refreshDbInspector,
    editDbRecordModal,
    copyInspectedJsonToClipboard,
    wipeTestAttempts,
    wipeFlashcardStore,
    factoryResetAll,
    renderDashboard,
    renderVault,
    renderFlashcardList,
    launchFlashcardDueSprint,
    flipStudyFlashcard,
    gradeStudyFlashcard,
    openFlashcardEditorModal,
    handleFlashcardFrontImageUpload,
    handleFlashcardBackImageUpload,
    saveFlashcardEditor,
    deleteCurrentEditingFlashcard,
    exportGlobalMasterDossier,
    exportScopedForensicDossier,
    exportFullBackup,
    pushNavLayer,
    popNavLayer
  };
})();

// Re-bind to global window object
window.CGL_OS = CGL_OS;
