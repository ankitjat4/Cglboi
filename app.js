/**
 * SSC CGL Intelligence OS - Core Engine
 * Master Application Controller (Part 1 of 2)
 * Schema Version: 15 | Multi-Concept Knowledge Engine & Tactical Architecture
 */

// Global window anchor registration
window.CGL_OS = null;

const CGL_OS = (() => {
  const DB_NAME = "cgl_os_db";
  const DB_VERSION = 15;
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

  // Universal Anki Forge & Scalable Vault State (Tab 4)
  let currentFcFrontImgBase64 = "";
  let currentFcBackImgBase64 = "";
  let activeVaultDeck = [];
  let activeVaultIndex = 0;
  let activeVaultFlipped = false;
  let vaultSearchQuery = "";
  let vaultActiveTag = "ALL";

  // Synapse Knowledge Graph State (Synchronous Zero-Flicker)
  let synapseTreeBuilt = false;

  // Interactive Cognitive Trap Clinic State
  let activeClinicTrapType = "TIME_TRAP_Q4";
  let activeClinicQuestions = [];

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
    "SECOND_GUESS_BLUNDER",
    "SPEED_MISREAD",
    "VALID_CALCULATED_RISK"
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

  // Foundational Question Bank with Multi-Concept Array Binding
  const SEED_QUESTIONS = [
    {
      id: "q_cgl_ga_polity_014",
      subject: "GA",
      chapter: "GA_POLITY",
      subtopic: "Judiciary",
      method: "Constitutional Articles",
      conceptId: "top_ga_polity_judiciary",
      conceptIds: ["top_ga_polity_judiciary"],
      questionText: "Which Article of the Constitution of India provides for the establishment and constitution of the Supreme Court of India?",
      imageUrl: "",
      options: ["Article 124", "Article 131", "Article 214", "Article 143"],
      correctIndex: 0,
      explanation: "Article 124 of the Constitution establishes the Supreme Court of India and governs its composition, appointment of judges, and operational rules.",
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
      questionText: "In a cyclic quadrilateral $ABCD$, opposite angles $\\angle A$ and $\\angle C$ satisfy $\\angle A = (2x + 10)^\\circ$ and $\\angle C = (3x + 20)^\\circ$. What is the measure of $\\angle A$?",
      imageUrl: "",
      options: ["$60^\\circ$", "$70^\\circ$", "$80^\\circ$", "$75^\\circ$"],
      correctIndex: 1,
      explanation: "Opposite angles sum to $180^\\circ$: $(2x + 10) + (3x + 20) = 180 \\implies 5x + 30 = 180 \\implies 5x = 150 \\implies x = 30^\\circ$. Therefore, $\\angle A = 2(30) + 10 = 70^\\circ$.",
      tags: ["Geometry", "CyclicQuadrilateral", "Formula"],
      annotation: ""
    },
    {
      id: "q_cgl_qa_tw_010",
      subject: "QA",
      chapter: "QA_TIME_WORK",
      subtopic: "Pipes & Cisterns",
      method: "Combined Rate of Flow",
      conceptId: "",
      conceptIds: [],
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
      conceptIds: [],
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
      conceptIds: ["top_qa_geo_triangles"],
      questionText: "In $\\triangle ABC$, the bisectors of $\\angle B$ and $\\angle C$ intersect at point $I$ inside the triangle. If $\\angle BAC = 68^\\circ$, find the measure of $\\angle BIC$.",
      imageUrl: "",
      options: ["$124^\\circ$", "$136^\\circ$", "$112^\\circ$", "$146^\\circ$"],
      correctIndex: 0,
      explanation: "Incenter formula: $\\angle BIC = 90^\\circ + \\frac{\\angle A}{2} = 90^\\circ + 34^\\circ = 124^\\circ$.",
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
   * 2. UNIVERSAL SSC CGL TYPESETTER & FORMATTING ENGINE
   * ------------------------------------------------------------- */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    // 1. Isolate LaTeX math into tokens so Markdown & <br> cannot corrupt it
    const mathTokens = [];
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      mathTokens.push({ display: true, formula });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });
    out = out.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      mathTokens.push({ display: false, formula });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });

    // 2. Callout Blocks
    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Trapping Point:</b> $1</div>');
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
    out = out.replace(/^>\s*\[!tip\]\s*(.*)$/gm, '<div class="callout-box"><b>💡 Tip:</b> $1</div>');

    // 3. Headers & Bold
    out = out.replace(/^### (.*$)/gim, '<h3 style="font-size:15px; font-weight:700; color:var(--accent-cyan); margin:10px 0 4px 0;">$1</h3>');
    out = out.replace(/^## (.*$)/gim, '<h2 style="font-size:17px; font-weight:800; color:#fff; margin:12px 0 6px 0;">$1</h2>');
    out = out.replace(/^# (.*$)/gim, '<h1 style="font-size:19px; font-weight:800; color:#fff; margin:14px 0 8px 0;">$1</h1>');
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 4. Passages & Cloze Context Box
    out = out.replace(/(?:Passage|Directions?\s*\([^)]+\)|Read the following passage[^:]*:)\s*([\s\S]+?)(?=(?:Q\.\s*|Question\s*\d*:|Statement|Statements|Conclusion|\n\n[A-Z]|$))/i, (match, body) => {
      return `<div class="q-passage-container"><span class="q-passage-tag">Passage / Reading Context</span>${body.trim()}</div>`;
    });

    // 5. Assertions & Reasons
    out = out.replace(/(?:Assertion\s*\(?A\)?|Assertion\s*:)\s*([^\n]+)/gi, '<div class="q-assertion-box"><b>[A] Assertion:</b> $1</div>');
    out = out.replace(/(?:Reason\s*\(?R\)?|Reason\s*:)\s*([^\n]+)/gi, '<div class="q-reason-box"><b>[R] Reason:</b> $1</div>');

    // 6. Syllogisms & Statements / Conclusions
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

    // 7. Markdown Table Conversion
    out = out.replace(/(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, headerLine, alignLine, bodyLines) => {
      const headers = headerLine.trim().split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = bodyLines.trim().split('\n').map(row => {
        const cells = row.trim().split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    // 8. Convert newlines to <br> ONLY in normal text (math tokens are safe)
    out = out.replace(/\n/g, "<br>");

    // 9. Render and re-inject KaTeX HTML untouched
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

  // Translates KaTeX delimiters ($...$) to Anki-Native MathJax (\(...\) and \[...\])
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
   * 3. LIFO NAVIGATION STACK & ANDROID GESTURE CONTROLLER
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
   * 4. HARDENED INDEXEDDB ENGINE & UNIFIED TRANSACTION HARNESS
   * ------------------------------------------------------------- */
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

        // Migration from legacy store_vault to store_flashcards
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

  // Clone-Safe Persistence Engine
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

  /* -------------------------------------------------------------
   * 5. BACKUP, RECOVERY & CANONICAL MULTI-CONCEPT SANITIZERS
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
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
          • Universal Flashcards: ${pendingHydrationData.store_flashcards.length}<br>
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

  // CANONICAL MULTI-CONCEPT SANITIZER (1 Question -> N Concept Sheets)
  function sanitizeQuestion(q, idx) {
    let conceptIds = [];
    if (Array.isArray(q.conceptIds)) {
      conceptIds = q.conceptIds.map(s => String(s).trim()).filter(Boolean);
    } else if (q.conceptId && typeof q.conceptId === "string" && q.conceptId.trim().length > 0) {
      conceptIds = [q.conceptId.trim()];
    }

    return {
      id: q.id || `q_restored_${Date.now()}_${idx}`,
      subject: q.subject || "QA",
      chapter: q.chapter || "QA_GENERAL",
      subtopic: q.subtopic || "",
      method: q.method || "",
      conceptId: conceptIds[0] || "", // Backward-compatible single string
      conceptIds: conceptIds,         // Canonical multi-link array
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
      cardType: f.cardType || (f.extra ? "BASIC_EXTRA" : "BASIC"),
      subject: f.subject || "QA",
      chapter: f.chapter || "QA_GENERAL",
      front: f.front || f.questionText || "Untitled Prompt",
      frontImageUrl: f.frontImageUrl || "",
      back: f.back || f.explanation || "Untitled Answer",
      backImageUrl: f.backImageUrl || "",
      extra: f.extra || "",
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
      document.getElementById("modal-backup-restore").classList.remove("active");
      synapseTreeBuilt = false;
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
    populateSelect("vault-deck-filter-sub", true);
    populateSelect("scoped-export-subject", true);
    populateSelect("anki-export-subject", true);
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
    synapseTreeBuilt = false;
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
      synapseTreeBuilt = false;
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
      synapseTreeBuilt = false;
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
      synapseTreeBuilt = false;
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
   * 7. SYNAPSE KNOWLEDGE GRAPH (SYNCHRONOUS ZERO-FLICKER ENGINE)
   * ------------------------------------------------------------- */
  async function openSynapseGraphModal() {
    pushNavLayer("modal-synapse-tree", () => {
      document.getElementById("modal-synapse-tree").classList.remove("active");
    });
    document.getElementById("modal-synapse-tree").classList.add("active");

    if (!synapseTreeBuilt) {
      await renderSynapseDomTree();
      synapseTreeBuilt = true;
    }
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
      const subBranchId = `syn-sub-branch-${subKey}`;

      const subNodeWrap = document.createElement("div");
      subNodeWrap.className = "tree-node-item";

      const subRow = document.createElement("div");
      subRow.className = "tree-node-row subject-row";
      subRow.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span id="arrow-sub-${subKey}" style="font-family:var(--font-mono); color:var(--accent-cyan); font-weight:800;">▼</span>
          <b style="color:#fff; font-size:13px;">${sub.name} (${subKey})</b>
        </div>
        <span class="badge" style="background:#1f6feb;">${sub.chapters.length} Chapters</span>
      `;
      subRow.onclick = () => toggleSynapseBranch(subBranchId, `arrow-sub-${subKey}`);
      subNodeWrap.appendChild(subRow);

      const subBranchWrap = document.createElement("div");
      subBranchWrap.className = "synapse-branch-container open";
      subBranchWrap.id = subBranchId;

      const qChaps = allQuestions.filter(q => q.subject === subKey).map(q => q.chapter);
      const cChaps = allConcepts.filter(c => c.subject === subKey).map(c => c.chapter);
      const fChaps = allFlashcards.filter(f => f.subject === subKey).map(f => f.chapter);
      const mergedChaps = [...new Set([...sub.chapters, ...qChaps, ...cChaps, ...fChaps])];

      mergedChaps.forEach(chap => {
        const chapBranchId = `syn-chap-branch-${chap}`;
        const chapCards = allFlashcards.filter(f => f.chapter === chap);
        const chapSheets = allConcepts.filter(c => c.subject === subKey && c.chapter === chap);
        const chapQs = allQuestions.filter(q => q.chapter === chap);

        const chapNodeWrap = document.createElement("div");
        chapNodeWrap.className = "tree-node-item";

        const chapRow = document.createElement("div");
        chapRow.className = "tree-node-row chapter-row";
        chapRow.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span id="arrow-chap-${chap}" style="font-family:var(--font-mono); color:var(--text-muted); font-size:11px;">▶</span>
            <span style="font-family:var(--font-mono); font-weight:700; color:#fff; font-size:12px;">${chap}</span>
            ${chapCards.length > 0 ? `<span class="badge" style="background:#8957e5;">${chapCards.length} Vault Cards</span>` : ''}
            <span class="badge" style="background:#151a24; color:var(--text-muted);">${chapQs.length} Qs</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:10px; color:var(--accent-cyan);" onclick="event.stopPropagation(); CGL_OS.launchSynapseChapterBlitz('${subKey}', '${chap}')">⚡ 5-Q Blitz</button>
          </div>
        `;
        chapRow.onclick = () => toggleSynapseBranch(chapBranchId, `arrow-chap-${chap}`);
        chapNodeWrap.appendChild(chapRow);

        const chapBranchWrap = document.createElement("div");
        chapBranchWrap.className = "synapse-branch-container";
        chapBranchWrap.id = chapBranchId;

        if (chapSheets.length === 0 && chapCards.length === 0) {
          const emptyRow = document.createElement("div");
          emptyRow.style.fontSize = "11px";
          emptyRow.style.color = "var(--text-muted)";
          emptyRow.style.padding = "6px 12px";
          emptyRow.innerText = "No sheets or cards logged in this chapter yet.";
          chapBranchWrap.appendChild(emptyRow);
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
          chapBranchWrap.appendChild(sheetRow);
        });

        chapNodeWrap.appendChild(chapBranchWrap);
        subBranchWrap.appendChild(chapNodeWrap);
      });

      subNodeWrap.appendChild(subBranchWrap);
      rootContainer.appendChild(subNodeWrap);
    });
  }

  // Pure Synchronous DOM Toggling (Zero Repaint Flicker)
  function toggleSynapseBranch(branchId, arrowId) {
    const el = document.getElementById(branchId);
    if (!el) return;
    const isOpen = el.classList.toggle("open");
    const arrow = document.getElementById(arrowId);
    if (arrow) arrow.innerText = isOpen ? "▼" : "▶";
  }

  function expandAllSynapseNodes() {
    document.querySelectorAll(".synapse-branch-container").forEach(el => el.classList.add("open"));
    document.querySelectorAll('[id^="arrow-"]').forEach(a => a.innerText = "▼");
  }

  function collapseAllSynapseNodes() {
    document.querySelectorAll(".synapse-branch-container").forEach(el => el.classList.remove("open"));
    document.querySelectorAll('[id^="arrow-"]').forEach(a => a.innerText = "▶");
  }

  function launchSynapseChapterBlitz(subKey, chap) {
    document.getElementById("modal-synapse-tree").classList.remove("active");
    launchConfiguredMockDirect(subKey, chap, 5, 5);
  }

  /* -------------------------------------------------------------
   * 8. BI-DIRECTIONAL CONCEPT ROUTER & LIVING KNOWLEDGE STUDIO
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
    const targetCId = (q.conceptIds && q.conceptIds.length > 0) ? q.conceptIds[0] : q.conceptId;
    openCompendiumToSheet(targetCId, q.subject, q.chapter);
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

  // Multi-Concept Drill Launcher
  async function launchDirectSheetDrill(conceptId, subject, chapter) {
    document.getElementById("modal-synapse-tree").classList.remove("active");
    const allQs = await getAllRecords("store_questions");
    let linked = allQs.filter(q => (q.conceptIds && q.conceptIds.includes(conceptId)) || q.conceptId === conceptId);

    if (linked.length === 0) {
      linked = allQs.filter(q => q.chapter === chapter);
    }

    if (linked.length > 0) {
      compileAndLaunchArena(`Drill: ${chapter}`, linked.slice(0, 10), 10, false);
    } else {
      alert(`No questions found in bank for ${chapter}.`);
    }
  }

  async function launchCurrentSheetQuestionsDrill() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    closeCompendiumStudio();
    const allQs = await getAllRecords("store_questions");
    let linked = allQs.filter(q => 
      (q.conceptIds && q.conceptIds.includes(sheet.id)) ||
      q.conceptId === sheet.id ||
      (q.chapter === sheet.chapter && q.subtopic === sheet.title)
    );

    if (linked.length === 0) {
      linked = allQs.filter(q => q.chapter === sheet.chapter);
    }

    if (linked.length === 0) {
      alert(`No questions in bank for ${sheet.chapter}.`);
      return;
    }

    compileAndLaunchArena(`Sheet Drill: ${sheet.title}`, linked.slice(0, 10), Math.max(5, Math.round(linked.slice(0, 10).length * 1.5)), false);
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

  // Multi-Concept Associative Counter
  async function renderActiveCompSheet() {
    const sheet = currentCompSheets[activeCompSheetIndex];
    if (!sheet) return;

    document.querySelectorAll(".comp-sheet-tab").forEach((t, i) => {
      t.classList.toggle("active", i === activeCompSheetIndex);
    });

    document.getElementById("comp-studio-header-title").innerText = sheet.title;
    document.getElementById("comp-studio-header-sub").innerText = `${sheet.chapter} • Sheet ${activeCompSheetIndex + 1} of ${currentCompSheets.length}`;

    const allQs = await getAllRecords("store_questions");
    const linkedCount = allQs.filter(q => 
      (q.conceptIds && q.conceptIds.includes(sheet.id)) ||
      q.conceptId === sheet.id ||
      (q.chapter === sheet.chapter && q.subtopic === sheet.title)
    ).length;
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
      synapseTreeBuilt = false;
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

    synapseTreeBuilt = false;
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
    synapseTreeBuilt = false;
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

    // Multi-Concept Dynamic Bridges in Review Mode
    if (isRev) {
      conceptBridgeBox.style.display = "block";
      const pillsWrap = document.getElementById("arena-concept-pills-wrap");
      pillsWrap.innerHTML = "";

      const linkedIds = (q.conceptIds && q.conceptIds.length > 0)
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
    } else {
      conceptBridgeBox.style.display = "none";
    }

    // Telemetry & Hesitation Trail Banner in Review Mode
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
          ${resp.isPanicSlip ? `<div style="margin-top:4px; color:var(--status-red); font-size:11px; font-weight:700;">⚠️ Detected as Panic Slip (&lt;8s solve under end-of-section pressure).</div>` : ''}
          ${resp.errorTag && resp.errorTag !== 'UNCLASSIFIED' && resp.errorTag !== 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:#f87171; font-size:11px;"><b>Active Classification:</b> #${resp.errorTag}</div>` : ''}
          ${resp.errorTag === 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:var(--status-green); font-size:11px;"><b>Tag Cleared:</b> Valid Calculated Risk / Speed Move</div>` : ''}
        </div>
      `;

      solutionBlock.style.display = "block";
      const currentTag = resp.errorTag || "UNCLASSIFIED";

      let optionsHtml = `
        <option value="UNCLASSIFIED" ${currentTag==='UNCLASSIFIED'?'selected':''}>Select / Override Mistake Tag...</option>
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

  // Navigation Buttons
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
    if (document.activeElement) document.activeElement.blur();
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
    const isLocked = activeExam.isSectionLocked && !isRev;

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
      document.getElementById("exam-count-ans").innerText = ans;
      document.getElementById("exam-count-marked").innerText = marked;
      document.getElementById("exam-count-unans").innerText = unans;
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

  // Zero-Ghost Touch Bindings for Arena Pause
  const pauseBtnEl = document.getElementById("btn-arena-pause");
  if (pauseBtnEl) {
    pauseBtnEl.addEventListener("pointerdown", async (e) => {
      e.preventDefault();
      if (!activeExam || activeExam.isReviewMode) return;
      activeExam.isPaused = true;
      clearInterval(examTimerInterval);
      clearInterval(questionTimerInterval);
      await putRecord("store_active_session", { id: "current_session", session: activeExam });

      const shield = document.getElementById("pause-shield");
      shield.style.setProperty("display", "flex", "important");
    });
  }

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

  // SUBMISSION ENGINE: High-Fidelity Heuristics (Distinguishes Instant Recall from Panic)
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
   * 11. UNTIMED DOJO ARENA ENGINE (MULTI-CONCEPT EQUIPPED)
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

    // Dynamic Multi-Concept Pills in Dojo Sectional Banner
    const dojoPillsWrap = document.getElementById("dojo-concept-pills-wrap");
    if (dojoPillsWrap) {
      dojoPillsWrap.innerHTML = "";
      const linkedIds = (q.conceptIds && q.conceptIds.length > 0)
        ? q.conceptIds
        : (q.conceptId ? [q.conceptId] : []);

      linkedIds.forEach(cId => {
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary";
        btn.style.cssText = "padding:2px 8px; font-size:11px; color:var(--accent-cyan);";
        btn.innerText = `📖 ${cId.replace(/^top_/, '').replace(/_/g, ' ')}`;
        btn.onclick = () => openCompendiumToSheet(cId, q.subject, q.chapter);
        dojoPillsWrap.appendChild(btn);
      });

      if (linkedIds.length === 0) {
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary";
        btn.style.cssText = "padding:2px 8px; font-size:11px;";
        btn.innerText = "📖 Sheet";
        btn.onclick = () => openCompendiumToSheet(null, q.subject, q.chapter);
        dojoPillsWrap.appendChild(btn);
      }
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
          fb.style.background = "rgba(16, 185, 129, 0.22)";
          fb.style.color = "var(--status-green)";
          fb.innerText = "✓ Correct Answer!";
        } else {
          fb.style.background = "rgba(244, 63, 94, 0.22)";
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

    // Threaded Attempt Iteration Switcher
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

    // High-Fidelity Sectional Breakdown
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
      if (tag === "VALID_CALCULATED_RISK" || tag === "UNCLASSIFIED") {
        activeReviewAttempt.userResponses[qId].isPanicSlip = false;
      }
      await putRecord("store_attempts", activeReviewAttempt);
    }
    renderDashboard();
    openMockReview(activeReviewAttempt);
  }

  /* -------------------------------------------------------------
   * 13. COGNITIVE TRAP CLINIC MODAL & REVERSE LOOKUP
   * ------------------------------------------------------------- */
  async function openTrapClinicModal(trapType) {
    activeClinicTrapType = trapType;
    document.getElementById("trap-clinic-title").innerText = `Trap Clinic: #${trapType.replace(/_/g, ' ')}`;

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

    document.getElementById("trap-clinic-summary-badge").innerText = `${activeClinicQuestions.length} Vulnerabilities Registered`;

    const list = document.getElementById("trap-clinic-question-list");
    list.innerHTML = "";

    if (activeClinicQuestions.length === 0) {
      list.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-muted); font-size:12px;">Zero recorded errors matching #${trapType}. Excellent mastery!</p>`;
    } else {
      activeClinicQuestions.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "12px";
        div.style.marginBottom = "8px";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span class="badge" style="background:#1f6feb;">${item.question.subject} • ${item.question.chapter}</span>
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
      document.getElementById("modal-trap-clinic").classList.remove("active");
    });
    document.getElementById("modal-trap-clinic").classList.add("active");
  }

  function drillFilteredTrapQuestions() {
    if (activeClinicQuestions.length === 0) {
      alert("No trap questions available to drill.");
      return;
    }
    document.getElementById("modal-trap-clinic").classList.remove("active");
    const uniquePool = [];
    activeClinicQuestions.forEach(item => {
      if (!uniquePool.some(q => q.id === item.question.id)) {
        uniquePool.push(item.question);
      }
    });

    compileAndLaunchArena(`Trap Drill: #${activeClinicTrapType}`, uniquePool, Math.max(5, uniquePool.length * 2), false);
  }

  /* -------------------------------------------------------------
   * 14. INTERACTIVE SUBJECT DIAGNOSTIC MODAL
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
   * 15. MULTI-TIER AI EXPORTS & HIERARCHICAL MASTER LEDGER
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
        `• Generated at: ${formatISTDate(Date.now())}\n` +
        `• Completed Standard Mocks: ${allAtt.length}\n` +
        `• Vault Flashcards Registered: ${flashcards.length}\n`;
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
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

      txt += `[RECORD ${idx + 1}] ID: ${q.id} | TOPIC: ${q.subtopic || 'General'} | METHOD: ${q.method || 'General'} | CONCEPTS: ${(q.conceptIds || [q.conceptId]).filter(Boolean).join(', ') || 'None'}\n`;
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    document.getElementById("modal-ledger-export").classList.remove("active");
  }

  async function exportCleanMarkdownFlashcards() {
    const flashcards = await getAllRecords("store_flashcards");
    let md = `# SSC CGL Flashcard Vault Export\nGenerated on: ${formatISTDate(Date.now())}\nTotal Cards: ${flashcards.length}\n\n`;

    flashcards.forEach(f => {
      md += `### [${f.subject} • ${f.chapter}] ${f.id} (${f.cardType || 'BASIC'})\n`;
      md += `**Prompt (Front):**\n${f.front}\n\n`;
      md += `**Answer (Back):**\n${f.back}\n\n`;
      if (f.extra) md += `**Extra Notes:**\n${f.extra}\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `CGL_Flashcards_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
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
- Card Vault Inventory: ${flashcards.length}
- Living Knowledge Sheets: ${concepts.length}
- Clinical Consultations Logged: ${consultations.length}

## 2. Active System Taxonomy & Chapters
${JSON.stringify(TAXONOMY, null, 2)}

## 3. Supported JSON Action Contracts
- INGEST_AND_ASSEMBLE_COMPLETE_MOCK (Single coordinated paper + sheets + question ingest)
- CREATE_AND_SAVE_FIXED_MOCK (Resolve existing question IDs + save fixed preset)
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
   * 16. ONE-TAP GLOBAL 360° MASTER DOSSIER & SCOPED EXTRACTOR
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
        encoding: encoding,
        decoderInstructions: "CSV rows correspond to individual question attempts. Columns: mockId,mockIST,slot,qId,subject,chapter,sel,cor,t,sw,panic,tag. Check decisionTrails for hesitation paths."
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

    const blob = new Blob([JSON.stringify(dossierEnvelope, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = isGlobalMaster 
      ? `cgl_master_forensic_dossier_360_${now}.json`
      : `cgl_forensic_dossier_${sub}_${timeframe}_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  /* -------------------------------------------------------------
   * 17. DASHBOARD RENDER ENGINE & DYNAMIC ERI CALCULATION
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

  // DYNAMIC ERI: Acc 50% + Vel 30% + Exp 20%
  function calculateAndRenderERI(accPercent, avgSpeed, flashcards, completedCount) {
    const scoreVal = document.getElementById("eri-score-val");
    const statusTier = document.getElementById("eri-status-tier");
    const breakdownSub = document.getElementById("eri-breakdown-sub");
    const circle = document.getElementById("eri-gauge-circle");

    if (completedCount === 0) {
      if (scoreVal) scoreVal.innerText = "--";
      if (statusTier) statusTier.innerText = "Calibrating";
      if (breakdownSub) breakdownSub.innerText = "Complete your first mock to calibrate readiness";
      return;
    }

    const accComp = (accPercent * 0.50);

    let velScore = 100;
    if (avgSpeed > 45) {
      velScore = Math.max(20, 100 - (avgSpeed - 45) * 1.2);
    }
    const velComp = (velScore * 0.30);

    const mockVolumeBonus = Math.min(100, completedCount * 12.5);
    const consistencyComp = (mockVolumeBonus * 0.20);

    const totalERI = Math.min(100, Math.max(10, accComp + velComp + consistencyComp)).toFixed(1);

    if (scoreVal) scoreVal.innerText = totalERI;

    if (breakdownSub) {
      breakdownSub.innerHTML = `
        Acc: <b style="color:#fff;">${accComp.toFixed(1)}/50</b> (${accPercent}%) &nbsp;•&nbsp; 
        Vel: <b style="color:#fff;">${velComp.toFixed(1)}/30</b> (${avgSpeed}s) &nbsp;•&nbsp; 
        Exp: <b style="color:#fff;">${consistencyComp.toFixed(1)}/20</b> (${completedCount} Mocks)
      `;
    }

    if (circle) circle.setAttribute("stroke-dasharray", `${totalERI}, 100`);

    if (statusTier && circle) {
      if (totalERI >= 80) {
        statusTier.innerText = "Tier-1 Formidable";
        statusTier.style.color = "var(--status-green)";
        circle.style.stroke = "var(--status-green-border)";
      } else if (totalERI >= 65) {
        statusTier.innerText = "Competitive Form";
        statusTier.style.color = "var(--accent-cyan)";
        circle.style.stroke = "var(--accent-cyan)";
      } else if (totalERI >= 50) {
        statusTier.innerText = "Developing Pace";
        statusTier.style.color = "var(--status-amber)";
        circle.style.stroke = "var(--status-amber)";
      } else {
        statusTier.innerText = "Vulnerable";
        statusTier.style.color = "var(--status-red)";
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
          if (r && r.errorTag && r.errorTag !== "UNCLASSIFIED" && r.errorTag !== "VALID_CALCULATED_RISK") {
            tagCounts[r.errorTag] = (tagCounts[r.errorTag] || 0) + 1;
            totalTagged++;
          }
        });
      }
    });

    if (totalTagged === 0) {
      bar.innerHTML = `<div class="trap-heat-seg" style="width:100%; background:var(--status-green);"></div>`;
      legend.innerHTML = `<span style="color:var(--status-green); font-size:11px;">Zero active cognitive traps logged!</span>`;
      return;
    }

    const colors = {
      CALCULATION_SLIP: "#da3633",
      READING_TRAP: "#d29922",
      FORMULA_AMNESIA: "#8957e5",
      CONCEPT_VOID: "#38bdf8",
      RUSHED_PANIC: "#f43f5e",
      TIME_TRAP_Q4: "#e11d48",
      SECOND_GUESS_BLUNDER: "#a855f7",
      SPEED_MISREAD: "#fb923c"
    };

    Object.keys(tagCounts).forEach(tag => {
      const percent = Math.round((tagCounts[tag] / totalTagged) * 100);
      const segColor = colors[tag] || "#388bfd";

      const seg = document.createElement("div");
      seg.className = "trap-heat-seg";
      seg.style.width = `${percent}%`;
      seg.style.background = segColor;
      seg.title = `Click to drill #${tag} (${tagCounts[tag]} errors)`;
      seg.onclick = () => openTrapClinicModal(tag);
      bar.appendChild(seg);

      const legItem = document.createElement("span");
      legItem.className = "trap-legend-pill";
      legItem.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${segColor};"></span>${tag.replace(/_/g, ' ')} (${percent}%)`;
      legItem.onclick = () => openTrapClinicModal(tag);
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
          <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${att.sessionId}')">📥 Export Mock</button>
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

  async function renderArchiveList(filterType) {
    const attempts = await getAllRecords("store_attempts");
    const completed = attempts.filter(a => a.completed);
    const container = document.getElementById("archive-list-container");
    container.innerHTML = "";

    let list = completed.slice().sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (filterType !== "ALL") {
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
            <b>Attempt ${iter.attemptNumber || 1}</b> • <span style="color:var(--text-muted);">${iter.timeIST ? iter.timeIST.split(',')[1] : ''}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; color:var(--accent-cyan);">${(iter.finalScore || 0).toFixed(1)} pts</span>
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${iter.sessionId}')">📥 Export</button>
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

      const footerBar = document.createElement("div");
      footerBar.className = "ticket-actions-bar";
      footerBar.style.padding = "8px 12px";
      footerBar.innerHTML = `
        <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px; color:var(--accent-cyan);" onclick="CGL_OS.exportMockByIdJson('${latest.sessionId}')">📥 Export Mock (.json)</button>
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
   * 18. SCALABLE COMPACT FLASHCARD VAULT (TAB 4)
   * ------------------------------------------------------------- */
  async function renderVault() {
    await renderVaultTagPills();
    await renderFlashcardList();
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
        renderFlashcardList();
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
    renderFlashcardList();
  }

  async function renderFlashcardList() {
    const flashcards = await getAllRecords("store_flashcards");
    const container = document.getElementById("flashcard-list-container");
    if (!container) return;
    container.innerHTML = "";

    let diagramCount = 0;
    let extraCount = 0;

    flashcards.forEach(f => {
      if ((f.frontImageUrl && f.frontImageUrl.length > 0) || (f.backImageUrl && f.backImageUrl.length > 0)) diagramCount++;
      if (f.extra && f.extra.trim().length > 0) extraCount++;
    });

    document.getElementById("vault-count-total").innerText = flashcards.length;
    document.getElementById("vault-count-diagrams").innerText = diagramCount;
    document.getElementById("vault-count-extra").innerText = extraCount;

    const filterSub = document.getElementById("vault-deck-filter-sub") ? document.getElementById("vault-deck-filter-sub").value : "ALL";

    let filtered = flashcards.filter(f => {
      const matchSub = (filterSub === "ALL" || f.subject === filterSub);
      const matchTag = (vaultActiveTag === "ALL" || (Array.isArray(f.tags) && f.tags.includes(vaultActiveTag)));
      const matchSearch = (!vaultSearchQuery || 
        f.front.toLowerCase().includes(vaultSearchQuery) || 
        f.back.toLowerCase().includes(vaultSearchQuery) || 
        (f.extra && f.extra.toLowerCase().includes(vaultSearchQuery)) || 
        f.chapter.toLowerCase().includes(vaultSearchQuery)
      );
      return matchSub && matchTag && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:16px;">Zero cards match active filters or search terms.</div>`;
      return;
    }

    filtered.forEach(f => {
      const tile = document.createElement("div");
      tile.className = "vault-compact-tile";
      tile.id = `vault-tile-${f.id}`;

      tile.innerHTML = `
        <div class="vault-compact-header" onclick="CGL_OS.toggleVaultCardAccordion('${f.id}')">
          <div style="overflow:hidden; padding-right:8px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
              <span class="badge" style="background:#151a24; color:var(--accent-cyan); font-size:10px;">${f.subject} • ${f.chapter}</span>
              <span class="anki-type-tag">${f.cardType || 'BASIC'}</span>
            </div>
            <div style="font-size:12.5px; font-weight:600; color:#fff; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">
              ${f.front.replace(/\$+/g, '').slice(0, 75)}...
            </div>
          </div>
          <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);" id="arrow-tile-${f.id}">▼</span>
        </div>

        <div class="vault-compact-drawer">
          <div style="font-size:14px; line-height:1.6; color:#fff; margin-bottom:8px;">
            <b>Prompt (Front):</b><br>${formatRichText(f.front)}
          </div>
          ${f.frontImageUrl ? `<div class="fc-img-box"><img src="${f.frontImageUrl}" alt="Front Image"></div>` : ''}
          <div style="font-size:13.5px; line-height:1.6; color:var(--accent-cyan); margin-bottom:8px;">
            <b>Solution (Back):</b><br>${formatRichText(f.back)}
          </div>
          ${f.backImageUrl ? `<div class="fc-img-box"><img src="${f.backImageUrl}" alt="Back Proof"></div>` : ''}
          ${f.extra ? `<div class="callout-box" style="margin-top:6px; font-size:12px;"><b>Extra Derivation:</b><br>${formatRichText(f.extra)}</div>` : ''}
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
            <div style="font-size:10.5px; color:var(--text-muted);">
              ${(f.tags || []).map(t => `#${t}`).join(' ')}
            </div>
            <button class="btn btn-secondary" style="padding:3px 10px; font-size:11px;" onclick="CGL_OS.openFlashcardEditorModal(false, '${f.id}')">Edit Card</button>
          </div>
        </div>
      `;
      container.appendChild(tile);
    });
  }

  function toggleVaultCardAccordion(id) {
    const tile = document.getElementById(`vault-tile-${id}`);
    if (!tile) return;
    const isOpen = tile.classList.toggle("open");
    const arrow = document.getElementById(`arrow-tile-${id}`);
    if (arrow) arrow.innerText = isOpen ? "▲" : "▼";
  }

  async function launchUntimedQuickCarousel() {
    const flashcards = await getAllRecords("store_flashcards");
    const filterSub = document.getElementById("vault-deck-filter-sub") ? document.getElementById("vault-deck-filter-sub").value : "ALL";
    const filtered = flashcards.filter(f => filterSub === "ALL" || f.subject === filterSub);

    if (filtered.length === 0) {
      alert("No cards in vault matching this selection.");
      return;
    }

    activeVaultDeck = filtered;
    activeVaultIndex = 0;
    activeVaultFlipped = false;

    pushNavLayer("modal-flashcard-study", () => {
      document.getElementById("modal-flashcard-study").classList.remove("active");
    });
    document.getElementById("modal-flashcard-study").classList.add("active");
    renderCurrentVaultCard();
  }

  function renderCurrentVaultCard() {
    const card = activeVaultDeck[activeVaultIndex];
    if (!card) return;

    activeVaultFlipped = false;
    document.getElementById("fc-study-progress").innerText = `Card ${activeVaultIndex + 1} of ${activeVaultDeck.length}`;
    document.getElementById("fc-card-chapter").innerText = `${card.subject} • ${card.chapter}`;
    document.getElementById("fc-card-type-tag").innerText = card.cardType || (card.extra ? 'BASIC_EXTRA' : 'BASIC');
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
  }

  function flipStudyFlashcard() {
    if (activeVaultFlipped) return;
    const card = activeVaultDeck[activeVaultIndex];
    if (!card) return;

    activeVaultFlipped = true;

    const bBox = document.getElementById("fc-card-back-img-box");
    if (card.backImageUrl && card.backImageUrl.trim().length > 0) {
      bBox.style.display = "block";
      bBox.innerHTML = `<img src="${card.backImageUrl}" alt="Back Proof">`;
    } else {
      bBox.style.display = "none";
      bBox.innerHTML = "";
    }

    let extraHtml = "";
    if (card.extra && card.extra.trim().length > 0) {
      extraHtml = `<div class="callout-box" style="margin-top:10px; font-size:12px;"><b>Extra Derivation:</b><br>${formatRichText(card.extra)}</div>`;
    }

    document.getElementById("fc-card-body").innerHTML = `
      <div style="color:var(--text-muted); font-size:12px; margin-bottom:8px;">${formatRichText(card.front)}</div>
      <hr style="border:0; border-top:1px solid var(--border-color); margin:8px 0;">
      <div style="font-weight:700; color:#fff;">${formatRichText(card.back)}</div>
      ${extraHtml}
    `;
    document.getElementById("fc-card-cue").innerText = "Revealed. Use arrows below to navigate.";
  }

  function navStudyCard(step) {
    activeVaultIndex += step;
    if (activeVaultIndex < 0) activeVaultIndex = activeVaultDeck.length - 1;
    if (activeVaultIndex >= activeVaultDeck.length) activeVaultIndex = 0;
    renderCurrentVaultCard();
  }

  function openAnkiExportModal() {
    pushHistoryState("modal-anki-export");
    document.getElementById("modal-anki-export").classList.add("active");
  }

  // NATIVE ANKI EXPORTER ENGINE
  async function generateAndDownloadAnkiTsv() {
    const sub = document.getElementById("anki-export-subject").value;
    const fieldMapping = document.getElementById("anki-export-fields").value;
    const deckName = document.getElementById("anki-export-deck-name").value.trim() || "SSC CGL 2026";
    const convertMath = document.getElementById("anki-convert-mathjax").checked;
    const includeImages = document.getElementById("anki-include-data-images").checked;

    const allCards = await getAllRecords("store_flashcards");
    let pool = sub === "ALL" ? allCards : allCards.filter(c => c.subject === sub);

    if (pool.length === 0) {
      alert("No cards found in vault matching export scope.");
      return;
    }

    let tsv = "";
    tsv += `#separator:Tab\n`;
    tsv += `#html:true\n`;
    tsv += `#deck:${deckName}\n`;
    tsv += `#notetype:CGL-Master-Card\n`;

    if (fieldMapping === "THREE_FIELD") {
      tsv += `#columns:Front\tBack\tExtra\tTags\n`;
    } else {
      tsv += `#columns:Front\tBack\tTags\n`;
    }

    pool.forEach(c => {
      let frontText = convertMath ? convertKatexToAnkiMathJax(c.front) : c.front;
      let backText = convertMath ? convertKatexToAnkiMathJax(c.back) : c.back;
      let extraText = c.extra ? (convertMath ? convertKatexToAnkiMathJax(c.extra) : c.extra) : "";

      frontText = frontText.replace(/\n/g, "<br>").replace(/\t/g, " ");
      backText = backText.replace(/\n/g, "<br>").replace(/\t/g, " ");
      extraText = extraText.replace(/\n/g, "<br>").replace(/\t/g, " ");

      if (includeImages) {
        if (c.frontImageUrl && c.frontImageUrl.length > 0) {
          frontText += `<br><img src="${c.frontImageUrl}">`;
        }
        if (c.backImageUrl && c.backImageUrl.length > 0) {
          backText += `<br><img src="${c.backImageUrl}">`;
        }
      }

      const tags = (Array.isArray(c.tags) ? c.tags : []).join(' ') + ` ${c.subject} ${c.chapter}`;

      if (fieldMapping === "THREE_FIELD") {
        tsv += `${frontText}\t${backText}\t${extraText}\t${tags}\n`;
      } else {
        if (extraText) backText += `<br><hr>${extraText}`;
        tsv += `${frontText}\t${backText}\t${tags}\n`;
      }
    });

    const blob = new Blob([tsv], { type: "text/tab-separated-values;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Anki_${sub}_Deck_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);

    document.getElementById("modal-anki-export").classList.remove("active");
    alert(`Exported ${pool.length} cards! Direct import into AnkiDroid or Desktop is ready.`);
  }

  async function openFlashcardEditorModal(isNew = true, cardId = null) {
    currentFcFrontImgBase64 = "";
    currentFcBackImgBase64 = "";

    if (isNew) {
      document.getElementById("flashcard-editor-title").innerText = "Add New Card to Vault";
      document.getElementById("edit-fc-id").value = "fc_" + Date.now();
      document.getElementById("edit-fc-subject").value = "QA";
      document.getElementById("edit-fc-chapter").value = "QA_GEOMETRY";
      document.getElementById("edit-fc-type").value = "BASIC_EXTRA";
      document.getElementById("edit-fc-front").value = "";
      document.getElementById("edit-fc-front-img-url").value = "";
      document.getElementById("edit-fc-front-img-file").value = "";
      document.getElementById("edit-fc-back").value = "";
      document.getElementById("edit-fc-back-img-url").value = "";
      document.getElementById("edit-fc-back-img-file").value = "";
      document.getElementById("edit-fc-extra").value = "";
      document.getElementById("edit-fc-tags").value = "";
      document.getElementById("btn-delete-fc").style.display = "none";
    } else {
      const card = await getRecord("store_flashcards", cardId);
      if (!card) return;
      document.getElementById("flashcard-editor-title").innerText = "Edit Vault Card";
      document.getElementById("edit-fc-id").value = card.id;
      document.getElementById("edit-fc-subject").value = card.subject;
      document.getElementById("edit-fc-chapter").value = card.chapter;
      document.getElementById("edit-fc-type").value = card.cardType || (card.extra ? "BASIC_EXTRA" : "BASIC");
      document.getElementById("edit-fc-front").value = card.front;
      document.getElementById("edit-fc-front-img-url").value = card.frontImageUrl || "";
      document.getElementById("edit-fc-front-img-file").value = "";
      document.getElementById("edit-fc-back").value = card.back;
      document.getElementById("edit-fc-back-img-url").value = card.backImageUrl || "";
      document.getElementById("edit-fc-back-img-file").value = "";
      document.getElementById("edit-fc-extra").value = card.extra || "";
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
    const cardType = document.getElementById("edit-fc-type").value;
    const front = document.getElementById("edit-fc-front").value.trim();
    const back = document.getElementById("edit-fc-back").value.trim();
    const extra = document.getElementById("edit-fc-extra").value.trim();
    const frontUrl = document.getElementById("edit-fc-front-img-url").value.trim();
    const backUrl = document.getElementById("edit-fc-back-img-url").value.trim();
    const tagsRaw = document.getElementById("edit-fc-tags").value.trim();

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
    synapseTreeBuilt = false;
    document.getElementById("modal-flashcard-editor").classList.remove("active");
    renderVault();
  }

  async function deleteCurrentEditingFlashcard() {
    const id = document.getElementById("edit-fc-id").value;
    if (confirm("Permanently delete this card from the vault?")) {
      await deleteRecordFromStore("store_flashcards", id);
      synapseTreeBuilt = false;
      document.getElementById("modal-flashcard-editor").classList.remove("active");
      renderVault();
    }
  }

  async function wipeFlashcardStore() {
    if (confirm("Permanently wipe all cards from the Vault?")) {
      await clearStore("store_flashcards");
      synapseTreeBuilt = false;
      alert("Card vault wiped.");
      renderVault();
    }
  }

  /* -------------------------------------------------------------
   * 19. QUESTION GUI EDITOR (MULTI-CONCEPT EQUIPPED)
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

    const cIds = (qData && qData.conceptIds && qData.conceptIds.length > 0)
      ? qData.conceptIds.join(", ")
      : (qData && qData.conceptId ? qData.conceptId : "");
    document.getElementById("edit-q-concept-ids").value = isNew ? "" : cIds;

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

    const rawConceptIds = document.getElementById("edit-q-concept-ids").value.trim();
    const parsedConceptIds = rawConceptIds.split(",").map(s => s.trim()).filter(Boolean);

    const qObj = {
      id: id,
      subject: document.getElementById("edit-q-subject").value,
      chapter: document.getElementById("edit-q-chapter").value.trim().toUpperCase(),
      subtopic: document.getElementById("edit-q-subtopic").value.trim(),
      method: document.getElementById("edit-q-method").value.trim(),
      conceptId: parsedConceptIds[0] || "",
      conceptIds: parsedConceptIds,
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
    synapseTreeBuilt = false;
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
      synapseTreeBuilt = false;
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
   * 20. HARDENED COMMAND BUS & CURATED PAPER PIPELINE
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
      // 1. Unified Curated Ingestion Pipeline (PDF -> New Sheets + Ingest Qs + Link Old Qs + Assemble Mock)
      if (cmd.action === "INGEST_AND_ASSEMBLE_COMPLETE_MOCK") {
        const {
          title = "Curated Practice Mock",
          launchImmediately = false,
          isSectionLocked = false,
          durationMin = 20,
          dossiers = [],
          newQuestions = [],
          linkExistingQuestions = [],
          orderedMockQuestionIds = []
        } = cmd.payload || {};

        await runTx(["store_concepts", "store_questions", "store_saved_mocks"], "readwrite", async (tx) => {
          const stC = tx.objectStore("store_concepts");
          dossiers.forEach(d => stC.put(sanitizeDossier(d)));

          const stQ = tx.objectStore("store_questions");
          newQuestions.forEach(q => stQ.put(sanitizeQuestion(q)));
        });

        // Link pre-existing questions to newly added sheets (Supports single or multiple IDs)
        if (linkExistingQuestions.length > 0) {
          for (const link of linkExistingQuestions) {
            const oldQ = await getRecord("store_questions", link.questionId);
            if (oldQ) {
              const newCIds = Array.isArray(link.assignConceptIds)
                ? link.assignConceptIds
                : (link.assignConceptId ? [link.assignConceptId] : []);
              
              oldQ.conceptIds = [...new Set([...(oldQ.conceptIds || []), ...newCIds])];
              oldQ.conceptId = oldQ.conceptIds[0] || "";
              await putRecord("store_questions", oldQ);
            }
          }
        }

        const allQuestions = await getAllRecords("store_questions");
        const resolvedQuestions = [];
        orderedMockQuestionIds.forEach(targetId => {
          const found = allQuestions.find(q => q.id === targetId);
          if (found) resolvedQuestions.push(found);
        });

        if (resolvedQuestions.length === 0) {
          alert("Could not assemble mock. None of the specified question IDs were resolved.");
          return;
        }

        const presetRecord = {
          id: "paper_" + Date.now(),
          type: "FIXED_PAPER",
          title: title,
          isSectionLocked: !!isSectionLocked,
          sections: [{ id: "SEC_1", name: title, durationSec: durationMin * 60, locked: false }],
          questions: resolvedQuestions
        };
        await putRecord("store_saved_mocks", presetRecord);

        synapseTreeBuilt = false;
        alert(`Success! Ingested ${dossiers.length} sheets, ${newQuestions.length} questions, linked ${linkExistingQuestions.length} pre-existing questions, and created fixed paper "${title}".`);
        await renderDashboardBlueprints();

        if (launchImmediately) {
          compileAndLaunchArena(title, resolvedQuestions, durationMin, isSectionLocked);
        }

      // 2. Curated Paper Generator (Resolve existing IDs + Ingest authoring + Pin preset)
      } else if (cmd.action === "CREATE_AND_SAVE_FIXED_MOCK") {
        const {
          title = "Curated Mock Paper",
          isSectionLocked = true,
          launchImmediately = false,
          durationMin = 15,
          existingQuestionIds = [],
          newQuestions = []
        } = cmd.payload || {};

        if (newQuestions.length > 0) {
          await runTx(["store_questions"], "readwrite", (tx) => {
            const stQ = tx.objectStore("store_questions");
            newQuestions.forEach(q => stQ.put(sanitizeQuestion(q)));
          });
        }

        const allQuestions = await getAllRecords("store_questions");
        const combinedPool = [];

        existingQuestionIds.forEach(targetId => {
          const found = allQuestions.find(q => q.id === targetId);
          if (found) combinedPool.push(found);
        });

        newQuestions.forEach(q => {
          const sanitized = sanitizeQuestion(q);
          if (!combinedPool.some(item => item.id === sanitized.id)) {
            combinedPool.push(sanitized);
          }
        });

        if (combinedPool.length === 0) {
          alert("No valid questions assembled for curated mock.");
          return;
        }

        const presetRecord = {
          id: "paper_" + Date.now(),
          type: "FIXED_PAPER",
          title: title,
          isSectionLocked: !!isSectionLocked,
          sections: [{ id: "SEC_1", name: title, durationSec: durationMin * 60, locked: false }],
          questions: combinedPool
        };
        await putRecord("store_saved_mocks", presetRecord);

        alert(`Saved curated mock: "${title}" (${combinedPool.length} questions) to Dashboard.`);
        await renderDashboardBlueprints();

        if (launchImmediately) {
          compileAndLaunchArena(title, combinedPool, durationMin, isSectionLocked);
        }

      // 3. Clinical AI Consultation Bundle Execution
      } else if (cmd.action === "EXECUTE_AI_CONSULTATION_BUNDLE") {
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
            await runTx(["store_flashcards"], "readwrite", (tx) => {
              const stF = tx.objectStore("store_flashcards");
              cards.forEach(c => stF.put(c));
            });
            renderVault();
          } else if (act.action === "BATCH_INGEST_COMPENDIUM") {
            const dossiers = (act.payload.dossiers || []).map(sanitizeDossier);
            await runTx(["store_concepts"], "readwrite", (tx) => {
              const stC = tx.objectStore("store_concepts");
              dossiers.forEach(d => stC.put(d));
            });
          } else if (act.action === "INGEST_AND_LAUNCH_MOCK") {
            const questions = (act.payload.questions || []).map(sanitizeQuestion);
            if (questions.length > 0) {
              await runTx(["store_questions"], "readwrite", (tx) => {
                const stQ = tx.objectStore("store_questions");
                questions.forEach(q => stQ.put(q));
              });
              compileAndLaunchArena(act.payload.title || "AI Remedial Test", questions, act.payload.durationMin || 15, !!act.payload.isSectionLocked);
            }
          }
        }
        synapseTreeBuilt = false;
        alert("AI Consultation Bundle Executed Successfully! Clinical record saved.");

      // 4. Headless Parametric Historical Query
      } else if (cmd.action === "REQUEST_HISTORICAL_DUMP") {
        const { targetSubject, timeframeDays = 30 } = cmd.payload || {};
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

        document.getElementById("console-payload").value = JSON.stringify({
          action: "HISTORICAL_DUMP_RESPONSE",
          payload: { targetSubject, timeframeDays, count: dump.length, dump }
        }, null, 2);
        alert(`Historical dump compiled (${dump.length} attempts)! Result placed in console.`);
        return;

      // 5. Ingest & Launch Standalone Mock
      } else if (cmd.action === "INGEST_AND_LAUNCH_MOCK") {
        const questions = (cmd.payload.questions || []).map(sanitizeQuestion);
        if (questions.length === 0) {
          alert("No questions found in payload to launch mock.");
          return;
        }

        await runTx(["store_questions"], "readwrite", (tx) => {
          const st = tx.objectStore("store_questions");
          questions.forEach(q => st.put(q));
        });

        compileAndLaunchArena(
          cmd.payload.title || "AI Practice Mock",
          questions,
          cmd.payload.durationMin || 15,
          !!cmd.payload.isSectionLocked
        );

      // 6. Prescribe Remedial Blitz
      } else if (cmd.action === "AI_PRESCRIBE_REMEDY") {
        const qIds = cmd.payload.questionIds || [];
        const newQuestions = (cmd.payload.newQuestions || []).map(sanitizeQuestion);

        if (newQuestions.length > 0) {
          await runTx(["store_questions"], "readwrite", (tx) => {
            const st = tx.objectStore("store_questions");
            newQuestions.forEach(q => st.put(q));
          });
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
          cmd.payload.durationMin || 10,
          false
        );

      // 7. Universal Flashcard Batch Ingestion
      } else if (cmd.action === "BATCH_INGEST_FLASHCARDS") {
        const cards = (cmd.payload.cards || []).map(sanitizeFlashcard);
        await runTx(["store_flashcards"], "readwrite", (tx) => {
          const stF = tx.objectStore("store_flashcards");
          cards.forEach(c => stF.put(c));
        });
        synapseTreeBuilt = false;
        alert(`Ingested ${cards.length} flashcards into Vault.`);
        renderVault();

      // 8. Bulk Question Bank Ingestion
      } else if (cmd.action === "BATCH_INGEST_QUESTIONS") {
        const list = (cmd.payload.questions || []).map(sanitizeQuestion);
        await runTx(["store_questions"], "readwrite", (tx) => {
          const st = tx.objectStore("store_questions");
          list.forEach(q => st.put(q));
        });
        synapseTreeBuilt = false;
        alert(`Ingested ${list.length} questions successfully into bank.`);

      // 9. Batch Compendium Sheet Ingestion
      } else if (cmd.action === "BATCH_INGEST_COMPENDIUM") {
        const dossiers = (cmd.payload.dossiers || []).map(sanitizeDossier);
        await runTx(["store_concepts"], "readwrite", (tx) => {
          const stC = tx.objectStore("store_concepts");
          dossiers.forEach(d => stC.put(d));
        });
        synapseTreeBuilt = false;
        alert(`Ingested ${dossiers.length} topic dossiers successfully.`);

      // 10. Save Mock Preset
      } else if (cmd.action === "SAVE_MOCK_PRESET") {
        const preset = sanitizeSavedMock(cmd.payload, Date.now());
        await putRecord("store_saved_mocks", preset);
        alert(`Saved mock setup: "${preset.title}".`);
        await renderDashboardBlueprints();

      // 11. Taxonomy Mutation
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
        synapseTreeBuilt = false;
        alert(`Taxonomy updated: ${operation} on ${chapter}`);
        await syncAllTaxonomyDropdowns();

      // 12. Raw DB Directives
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

  // MULTI-SECTION AWARE ARENA COMPILER (STRICT SECTION LOCKING ENFORCED)
  async function compileAndLaunchArena(title, questionsPool, durationMin, isSectionLocked = false) {
    clearInterval(examTimerInterval);
    clearInterval(questionTimerInterval);

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
    document.getElementById("exam-arena").style.display = "flex";
    renderActiveExamQuestion();
    startExamTimers();
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
          dossiers: [
            {
              id: "top_geo_tangents_advanced",
              subject: "QA",
              chapter: "QA_GEOMETRY",
              title: "Direct & Transverse Tangent Lengths",
              subtitle: "Formulas and Center Distance Conditions",
              content: "### Direct Common Tangent (DCT)\n$$DCT = \\sqrt{d^2 - (r_1 - r_2)^2}$$\n\n### Transverse Common Tangent (TCT)\n$$TCT = \\sqrt{d^2 - (r_1 + r_2)^2}$$\n\n> [!trap] External Touching Circles\n> If $d = r_1 + r_2$, then $DCT = 2\\sqrt{r_1 r_2}$. Transverse tangent is 0."
            }
          ],
          newQuestions: [
            {
              id: "q_sample_pipe_cycle_01",
              subject: "QA",
              chapter: "QA_TIME_WORK",
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
      document.getElementById("console-payload").value = JSON.stringify(sample, null, 2);
    }
  }

  /* -------------------------------------------------------------
   * 21. DIRECT DATABASE STUDIO (MODAL INSPECTOR VIEWER)
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
      synapseTreeBuilt = false;
      await syncAllTaxonomyDropdowns();
      renderDashboard();
      refreshDbInspector();
    }
  }

  /* -------------------------------------------------------------
   * 22. UNIVERSAL MODULAR DATA EXTRACTION MATRIX
   * ------------------------------------------------------------- */
  
  // 1. Export Current Active Review Mock Session
  function exportCurrentReviewMockJson() {
    if (!activeReviewAttempt) {
      alert("No active mock review loaded.");
      return;
    }
    exportSpecificMockJson(activeReviewAttempt);
  }

  // 2. Export Any Mock Session by ID
  async function exportMockByIdJson(sessionId) {
    const attempts = await getAllRecords("store_attempts");
    const target = attempts.find(a => a.sessionId === sessionId);
    if (!target) {
      alert(`Mock session ${sessionId} not found.`);
      return;
    }
    exportSpecificMockJson(target);
  }

  function exportSpecificMockJson(mockObj) {
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_mock_${mockObj.sessionId}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // 3. Dedicated Knowledge Compendium Sheets JSON Exporter
  async function exportKnowledgeBankJson() {
    const concepts = await getAllRecords("store_concepts");
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_knowledge_compendium_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // 4. Dedicated Card Vault JSON Exporter
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_flashcard_vault_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // 5. Direct Selected Store Table JSON Exporter (Database Studio)
  async function exportCurrentSelectedStoreJson() {
    const storeName = document.getElementById("db-store-select").value;
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_dump_${storeName}_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // 6. Complete 360° AI Master Diagnostic Handoff Package
  async function exportUnifiedAiHandoffPackage() {
    const now = Date.now();
    const allAttempts = await getAllRecords("store_attempts");
    const allQuestions = await getAllRecords("store_questions");
    const allConcepts = await getAllRecords("store_concepts");
    const allFlashcards = await getAllRecords("store_flashcards");
    const consultations = await getAllRecords("store_ai_consultations");
    const completedAttempts = allAttempts.filter(a => a.completed);

    const telemetryRows = [];
    const decisionTrails = {};
    const exposureMap = {};

    completedAttempts.sort((a, b) => a.timestamp - b.timestamp).forEach(att => {
      if (att.questions && Array.isArray(att.questions) && att.userResponses) {
        att.questions.forEach(q => {
          const resp = att.userResponses[q.id];
          if (resp && resp.selectedOption !== null && resp.selectedOption !== undefined) {
            if (!exposureMap[q.id]) {
              exposureMap[q.id] = {
                totalExposures: 0,
                firstSeenIST: att.timeIST || formatISTDate(att.timestamp),
                lastSeenIST: att.timeIST || formatISTDate(att.timestamp),
                history: []
              };
            }
            exposureMap[q.id].totalExposures++;
            exposureMap[q.id].lastSeenIST = att.timeIST || formatISTDate(att.timestamp);
            exposureMap[q.id].history.push({
              mockId: att.sessionId,
              dateIST: att.timeIST || formatISTDate(att.timestamp),
              t: resp.timeSpentSec || 0,
              correct: resp.selectedOption === q.correctIndex ? 1 : 0
            });

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
        });
      }
    });

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
      performanceTelemetry: {
        totalEvaluatedAttempts: completedAttempts.length,
        totalResponseLogs: telemetryRows.length,
        telemetryRows: telemetryRows,
        decisionTrails: decisionTrails,
        questionExposureMap: exposureMap
      },
      knowledgeCompendium: allConcepts,
      masterQuestionBank: sortQuestionsHierarchical(allQuestions),
      flashcardVault: allFlashcards,
      recentConsultations: consultations.slice(-5)
    };

    const blob = new Blob([JSON.stringify(masterPackage, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_ai_master_handoff_package_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  /* -------------------------------------------------------------
   * 23. UNIVERSAL TOUCH GESTURES (VIEWPORT & HARDWARE SHIELD)
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
   * 24. PUBLISHING-GRADE TYPESET PRINT BOOK ENGINE
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
    const ansMode = document.getElementById("print-include-ans").value;

    const root = document.getElementById("print-sheet-root");
    root.innerHTML = "";

    const timestampIST = formatISTDate(Date.now());

    // 1. Typeset Formula Book & Knowledge Compendium
    if (pType === "COMPENDIUM") {
      const dossiers = await getAllRecords("store_concepts");
      let pool = sub === "ALL" ? dossiers : dossiers.filter(d => d.subject === sub);
      if (chap !== "ALL") pool = pool.filter(d => d.chapter === chap);

      pool.sort((a, b) => {
        if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
        return a.chapter.localeCompare(b.chapter);
      });

      const tocMap = {};
      pool.forEach(item => {
        if (!tocMap[item.subject]) tocMap[item.subject] = {};
        if (!tocMap[item.subject][item.chapter]) tocMap[item.subject][item.chapter] = [];
        tocMap[item.subject][item.chapter].push(item.title);
      });

      let tocHtml = `<div class="print-toc-container"><div class="print-toc-heading">Table of Contents</div>`;
      let secCounter = 1;
      Object.keys(tocMap).forEach(s => {
        const subName = TAXONOMY[s] ? TAXONOMY[s].name : s;
        tocHtml += `<div style="font-weight:bold; margin-top:8px; font-size:11pt;">${secCounter++}. ${subName} (${s})</div>`;
        Object.keys(tocMap[s]).forEach(c => {
          tocHtml += `<div style="padding-left:14px; font-weight:600; color:#333; margin-top:3px;">• ${c}</div>`;
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

    // 2. Standard Practice Paper (Dual-Column with Optional Appendix)
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

        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';
        content += `
          <div class="print-question">
            <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
            <div style="margin-top:4px;">
              ${q.options.map((opt, i) => `(${i + 1})${formatRichText(opt)} &nbsp; `).join('')}
            </div>
            ${ansMode === "INLINE" ? `<div style="font-size:9pt; margin-top:6px; color:#222; background:#f4f4f4; padding:4px;"><b>Correct: Option ${q.correctIndex + 1}</b><br><i>${formatRichText(q.explanation || '')}</i></div>` : ''}
          </div>
        `;
      });

      content += `</div>`;

      // Appendix: Blind Practice Mode Keys
      if (ansMode === "APPENDIX") {
        content += `
          <div class="print-appendix">
            <h2 style="font-size:16pt; font-weight:900; margin-bottom:12px; text-transform:uppercase;">Appendix: Answer Keys & Step-by-Step Solutions</h2>
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; margin-bottom:18px; font-size:10pt;">
              ${pool.map((q, idx) => `<div><b>Q${idx + 1}:</b> Opt${q.correctIndex + 1}</div>`).join('')}
            </div>
            <hr style="margin-bottom:14px;">
            ${pool.map((q, idx) => `
              <div style="font-size:9.5pt; margin-bottom:10px; page-break-inside:avoid; break-inside:avoid;">
                <b>Q${idx + 1} Explanation:</b>${formatRichText(q.explanation || 'No method registered.')}
              </div>
            `).join('')}
          </div>
        `;
      }

      root.innerHTML = content;

    // 3. Past Completed Mock Audit
    } else if (pType === "PAST_MOCK") {
      const mockId = document.getElementById("print-mock-select").value;
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
        let img = q.imageUrl ? `<br><img src="${q.imageUrl}" style="max-height:120px; max-width:100%;">` : '';

        content += `
          <div class="print-question">
            <strong>Q${idx + 1}.</strong> ${formatRichText(q.questionText)}${img}<br>
            <div style="margin-top:4px;">
              ${q.options.map((opt, i) => `(${i + 1})${formatRichText(opt)} &nbsp; `).join('')}
            </div>
            <div style="font-size:9pt; margin-top:6px; background:#f4f4f4; padding:6px; border-left:3px solid ${isCor ? '#238636' : '#da3633'};">
              <b>Your Pick:</b> Option ${resp.selectedOption !== null && resp.selectedOption !== undefined ? resp.selectedOption + 1 : 'None'} (${isCor ? '✓ Correct' : '✗ Incorrect'}) | <b>Time:</b> ${resp.timeSpentSec || 0}s<br>
              <b>Key:</b> Option ${q.correctIndex + 1} | <i>${formatRichText(q.explanation || '')}</i>
            </div>
          </div>
        `;
      });

      content += `</div>`;
      root.innerHTML = content;

    // 4. Flashcard Vault Summary Sheet
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
            <strong>Card ${idx + 1}. [${f.subject} • ${f.chapter}]</strong> (${f.cardType || 'BASIC'})<br>
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

  /* -------------------------------------------------------------
   * 25. NAVIGATION, TAB SWITCHING & SYSTEM BOOT
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
    toggleSynapseBranch,
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
    openTrapClinicModal,
    drillFilteredTrapQuestions,
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
    exportGlobalMasterDossier,
    exportScopedForensicDossier,
    exportFullBackup,
    exportCurrentReviewMockJson,
    exportMockByIdJson,
    exportKnowledgeBankJson,
    exportFlashcardVaultJson,
    exportCurrentSelectedStoreJson,
    exportUnifiedAiHandoffPackage,
    pushNavLayer,
    popNavLayer
  };
})();

// Re-bind to global window object
window.CGL_OS = CGL_OS;
 
