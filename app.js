/**
 * ============================================================================
 * SSC CGL INTELLIGENCE OS — CORE ENGINE (ARCHITECTURE V5.0)
 * Master Application Controller — PART 1 OF 3
 * Architecture: Local-First IndexedDB Engine | Schema Version: 15
 * Candidate: Ankit Kumar (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)
 * 
 * Scope of Part 1:
 * - Runtime State & Global Anchors
 * - Full Seed Data & Canonical Taxonomy Baseline (22 Arithmetic Chapters)
 * - IST Dual-Temporal Engine & Math Typesetter (KaTeX Token Isolator)
 * - Hardened IndexedDB Harness & Non-Destructive seedData()
 * - Full Disaster Recovery Backup & Normalization Engine
 * - Shared Services: TaxonomyService, QuestionService, ConceptService, SearchService
 * - Taxonomy Management UI & Safe Chapter Merge Tool
 * - Question Editor UI: Manual Add, Edit, Image Upload & Duplicate
 * ============================================================================
 */

// Global window anchor registration
window.CGL_OS = null;

const CGL_OS = (() => {
  /* ==========================================================================
   * 1. CONSTANTS, SCHEMAS & RUNTIME EXECUTION STATE
   * ========================================================================== */
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
  let activeCompChapter = "QA_PERCENTAGE";
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

  // Synapse Knowledge Graph & Progressive Explorer State
  let synapseTreeBuilt = false;
  let synapseCurrentLevel = "SUBJECTS"; // 'SUBJECTS' | 'CHAPTERS' | 'CONCEPTS'
  let synapseActiveSubject = null;
  let synapseActiveChapter = null;

  // Interactive Cognitive Trap Clinic State
  let activeClinicTrapType = "TIME_TRAP_Q4";
  let activeClinicQuestions = [];

  // Disaster Recovery Hydration State
  let pendingHydrationData = null;

  // Question GUI Editor State
  let currentQuestionImageBase64 = "";

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

  /**
   * CANONICAL INITIAL TAXONOMY SEED
   * Includes the complete 22-chapter Arithmetic hierarchy.
   * CRITICAL ARCHITECTURAL GUARANTEE:
   * Used strictly as a fallback on a blank database. Once written to store_config,
   * the database record is 100% authoritative. The app NEVER re-injects deleted chapters.
   */
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

  // Foundational Pre-Seeded Question Bank
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
   * 2. DUAL-TEMPORAL & INDIAN STANDARD TIME (IST) UTILITIES
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
   * 3. UNIVERSAL SSC CGL TYPESETTER & KATEX ISOLATION ENGINE
   * ========================================================================== */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    // 1. Isolate LaTeX math into tokens so Markdown & <br> cannot corrupt equation delimiters
    const mathTokens = [];
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      mathTokens.push({ display: true, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });
    out = out.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      mathTokens.push({ display: false, formula: formula.trim() });
      return `___CGL_MATH_${mathTokens.length - 1}___`;
    });

    // 2. Callout Blocks
    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Trapping Point:</b> $1</div>');
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
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
      return `<div class="table-responsive"><table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // 8. Convert newlines to <br> ONLY in normal text (math tokens are preserved safely)
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
   * 4. LIFO NAVIGATION STACK & ANDROID GESTURE CONTROLLER
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
   * 5. HARDENED INDEXEDDB ENGINE (NON-DESTRUCTIVE RE-SEEDING)
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
   * CRITICAL BUGFIX IN SEEDDATA:
   * Do NOT re-merge DEFAULT_TAXONOMY into savedTaxonomyConfig.
   * If store_config.system_taxonomy already exists, it is the 100% authoritative master!
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

    // Authoritative Taxonomy Check: Respect user deletions!
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
   * 6. FULL BACKUP, DISASTER RECOVERY & SANITIZERS
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
          • Flashcards: ${pendingHydrationData.store_flashcards.length}<br>
          • Living Knowledge Sheets: ${pendingHydrationData.store_concepts.length}<br>
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
      conceptId: conceptIds[0] || "",
      conceptIds: conceptIds,
      questionText: q.questionText || "",
      imageUrl: q.imageUrl || "",
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: (typeof q.correctIndex === "number" && q.correctIndex >= 0 && q.correctIndex <= 3) ? q.correctIndex : 0,
      explanation: q.explanation || "",
      source: q.source || "Manual Entry",
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
      SearchService.invalidate();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await updateDojoChapters();
      await renderVault();
    } catch (err) {
      alert("Hydration Error: " + err.message);
    }
  }

  /* ==========================================================================
   * 7. SHARED SERVICE — TAXONOMY SERVICE
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

      // 1. Rename in taxonomy
      const idx = TAXONOMY[subKey].chapters.indexOf(oldChap);
      TAXONOMY[subKey].chapters[idx] = cleanNew;
      await this.saveTaxonomy();

      // 2. Reassign all questions and concepts matching oldChap to cleanNew in IndexedDB
      await this.reassignChapterContent(subKey, oldChap, cleanNew);
    },

    /**
     * Non-destructive Chapter Deletion:
     * Removes the chapter from taxonomy. Content is PRESERVED and marked as UNASSIGNED
     * if not explicitly merged, guaranteeing zero question or concept loss.
     */
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

    /**
     * Chapter Merge Tool: Moves all questions and concepts from source to target
     * and safely deletes the obsolete taxonomy entry.
     */
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
   * 8. SHARED SERVICE — QUESTION SERVICE
   * Full CRUD, Validation, Duplication & Provenance Tracking
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
   * 9. SHARED SERVICE — CONCEPT SERVICE (LIVING KNOWLEDGE STUDIO)
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

    /**
     * Parses Markdown headings (## and ###) to generate in-sheet
     * jump-links for smooth intra-sheet reading navigation.
     */
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
   * 10. SHARED SERVICE — SEARCH SERVICE
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

        if (term) {
          const inId = q.id.toLowerCase().includes(term);
          const inText = q.questionText.toLowerCase().includes(term);
          const inExp = (q.explanation || "").toLowerCase().includes(term);
          const inSubtopic = (q.subtopic || "").toLowerCase().includes(term);
          const inMethod = (q.method || "").toLowerCase().includes(term);
          const inOpts = Array.isArray(q.options) && q.options.some(o => o.toLowerCase().includes(term));
          const inTags = Array.isArray(q.tags) && q.tags.some(t => t.toLowerCase().includes(term));
          if (!inId && !inText && !inExp && !inSubtopic && !inMethod && !inOpts && !inTags) return false;
        }

        return true;
      });
    },

    filterConcepts(pool, term, filters) {
      return pool.filter(c => {
        if (filters.subject && filters.subject !== "ALL" && c.subject !== filters.subject) return false;
        if (filters.chapter && filters.chapter !== "ALL" && c.chapter !== filters.chapter) return false;

        if (term) {
          const inTitle = c.title.toLowerCase().includes(term);
          const inSub = (c.subtitle || "").toLowerCase().includes(term);
          const inContent = c.content.toLowerCase().includes(term);
          const inChap = c.chapter.toLowerCase().includes(term);
          if (!inTitle && !inSub && !inContent && !inChap) return false;
        }

        return true;
      });
    }
  };

  /* ==========================================================================
   * 11. DYNAMIC TAXONOMY & SELECTOR SYNCHRONIZER UI
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
                <span title="Merge or Reassign Chapter" style="cursor:pointer; color:var(--accent-cyan); font-weight:bold;" onclick="CGL_OS.openChapterMergeModal('${subKey}', '${c}')">⇄</span>
                <span title="Delete Chapter" style="cursor:pointer; color:var(--status-red); opacity:0.7;" onclick="CGL_OS.deleteChapterFromSubject('${subKey}', '${c}')">✕</span>
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
    const key = keyInput.value.trim().toUpperCase().replace(/\s+/g, '_');
    const name = nameInput.value.trim();

    if (!key || !name) {
      alert("Both Key and Full Name are required.");
      return;
    }

    try {
      await TaxonomyService.addSubject(key, name);
      keyInput.value = "";
      nameInput.value = "";
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

  /* ==========================================================================
   * 12. QUESTION GUI EDITOR CONTROLLERS (ADD, EDIT, DUPLICATE, UPLOAD)
   * ========================================================================== */
  function openEditQuestionModal(qData = null, presetSub = null, presetChap = null) {
    const isNew = !qData;
    currentQuestionImageBase64 = "";

    document.getElementById("editor-title").innerText = isNew ? "Add New Question" : "Edit Question";
    document.getElementById("edit-q-id").value = isNew 
      ? QuestionService.generateId(presetSub || "QA") 
      : qData.id;

    const subSelect = document.getElementById("edit-q-subject");
    if (subSelect) {
      subSelect.value = isNew ? (presetSub || "QA") : qData.subject;
    }

    const chapInput = document.getElementById("edit-q-chapter");
    if (chapInput) {
      chapInput.value = isNew 
        ? (presetChap || (TAXONOMY[presetSub || "QA"]?.chapters[0] || "QA_PERCENTAGE")) 
        : qData.chapter;
    }

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

    const delBtn = document.getElementById("btn-delete-q");
    if (delBtn) delBtn.style.display = isNew ? "none" : "block";

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
    const id = document.getElementById("edit-q-id").value.trim();
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
      correctIndex: parseInt(document.getElementById("edit-q-correct").value, 10),
      explanation: document.getElementById("edit-q-explanation").value.trim(),
      source: "Manual Entry",
      tags: ["UserSaved"],
      annotation: ""
    };

    try {
      const existing = await QuestionService.get(id);
      if (existing) {
        await QuestionService.update(id, qObj);
      } else {
        await QuestionService.create(qObj);
      }

      document.getElementById("modal-question-editor").classList.remove("active");
      if (dojoExam && dojoExam.questions[dojoExam.currentIndex]?.id === id) {
        dojoExam.questions[dojoExam.currentIndex] = qObj;
        renderDojoArenaQuestion();
      }
      await renderDashboard();
      alert(`Question ${id} saved successfully.`);
    } catch (err) {
      alert("Validation Error: " + err.message);
    }
  }

  async function duplicateCurrentEditingQuestion() {
    const id = document.getElementById("edit-q-id").value.trim();
    if (!id) return;
    try {
      const clone = await QuestionService.duplicate(id);
      document.getElementById("modal-question-editor").classList.remove("active");
      alert(`Duplicated as new question: ${clone.id}`);
      openEditQuestionModal(clone);
    } catch (err) {
      alert("Duplicate failed: " + err.message);
    }
  }

  async function deleteCurrentEditingQuestion() {
    const id = document.getElementById("edit-q-id").value.trim();
    if (confirm(`Permanently delete question ${id}? (Attempts referencing this question remain preserved)`)) {
      await QuestionService.delete(id);
      document.getElementById("modal-question-editor").classList.remove("active");
      if (dojoExam) {
        dojoExam.questions = dojoExam.questions.filter(q => q.id !== id);
        if (dojoExam.currentIndex >= dojoExam.questions.length) dojoExam.currentIndex = 0;
        if (dojoExam.questions.length > 0) renderDojoArenaQuestion();
        else exitDojoArena();
      }
      await renderDashboard();
      alert(`Question ${id} removed.`);
    }
  }

  // --- End of Part 1 ---
  /* ==========================================================================
   * SECTION 13: SHARED SERVICE — PERFORMANCE SERVICE
   * Telemetry Aggregation, Question/Chapter Vulnerabilities & Neglect Metrics
   * ========================================================================== */
  const PerformanceService = {
    async getHistoricalAttempts() {
      const attempts = await getAllRecords("store_attempts");
      return attempts.filter(a => a.completed);
    },

    async calculateGlobalMetrics() {
      const completed = await this.getHistoricalAttempts();
      if (completed.length === 0) {
        return { totalMocks: 0, accuracy: 0, avgSpeed: 0, trapsHit: 0, eri: "0.0", neglectAlert: null };
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

      // ERI: Accuracy 50% + Velocity 30% + Consistency Volume 20%
      const accComp = acc * 0.50;
      let velScore = 100;
      if (avgSpeed > 45) {
        velScore = Math.max(20, 100 - (avgSpeed - 45) * 1.2);
      }
      const velComp = velScore * 0.30;
      const volumeBonus = Math.min(100, completed.length * 12.5);
      const consistencyComp = volumeBonus * 0.20;
      const totalERI = Math.min(100, Math.max(10, accComp + velComp + consistencyComp)).toFixed(1);

      return {
        totalMocks: completed.length,
        accuracy: acc,
        avgSpeed: avgSpeed,
        trapsHit: traps,
        eri: totalERI
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
        isWeak: attempted >= 5 && accuracy < 60
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
   * SECTION 14: SHARED SERVICE — MOCK SERVICE & QUESTION SELECTION ENGINE
   * Fisher-Yates Randomizer, Pattern Balancing, Weakness Weights & Blueprint Manager
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
        method = "ALL",
        mode = "RANDOM", // 'RANDOM' | 'WEAKNESS' | 'INCORRECT' | 'UNATTEMPTED' | 'SLOW' | 'PATTERN_COVERAGE'
        excludeRecentMocks = false,
        recentMockWindow = 3,
        randomizeOrder = true,
        patternBalanced = false,
        isSectionLocked = false,
        explicitQuestionIds = [],
        customQuestions = [],
        seed = null
      } = config;

      const allBankQuestions = await getAllRecords("store_questions");
      let eligiblePool = [];

      if (Array.isArray(explicitQuestionIds) && explicitQuestionIds.length > 0) {
        explicitQuestionIds.forEach(id => {
          const found = allBankQuestions.find(q => q.id === id);
          if (found) eligiblePool.push(found);
        });
      } else if (Array.isArray(customQuestions) && customQuestions.length > 0) {
        eligiblePool = customQuestions.map(sanitizeQuestion);
      } else {
        eligiblePool = allBankQuestions.filter(q => {
          if (subject && subject !== "ALL" && q.subject !== subject) return false;
          if (chapter && chapter !== "ALL" && q.chapter !== chapter) return false;
          if (method && method !== "ALL" && q.method !== method) return false;
          return true;
        });
      }

      if (eligiblePool.length === 0) {
        throw new Error(`Zero eligible questions match the scope (${subject} • ${chapter} • ${method}).`);
      }

      const attempts = await getAllRecords("store_attempts");
      const completed = attempts.filter(a => a.completed).sort((a, b) => b.timestamp - a.timestamp);

      if (excludeRecentMocks && completed.length > 0) {
        const recentAttempts = completed.slice(0, recentMockWindow);
        const recentQIds = new Set();
        recentAttempts.forEach(att => {
          if (Array.isArray(att.questions)) {
            att.questions.forEach(q => recentQIds.add(q.id));
          }
        });

        const antiRepetitionPool = eligiblePool.filter(q => !recentQIds.has(q.id));
        if (antiRepetitionPool.length >= count) {
          eligiblePool = antiRepetitionPool;
        }
      }

      const perfMap = await PerformanceService.getQuestionPerformanceMap();
      let prioritizedPool = [];

      if (mode === "UNATTEMPTED") {
        prioritizedPool = eligiblePool.filter(q => !perfMap[q.id] || perfMap[q.id].attempts === 0);
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "INCORRECT") {
        prioritizedPool = eligiblePool.filter(q => perfMap[q.id] && (perfMap[q.id].lastWasIncorrect || perfMap[q.id].incorrect > 0));
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "WEAKNESS") {
        prioritizedPool = eligiblePool.filter(q => {
          const stats = perfMap[q.id];
          if (!stats || stats.attempts === 0) return false;
          const acc = Math.round((stats.correct / stats.attempts) * 100);
          return acc < 65 || stats.traps.length > 0;
        });
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "SLOW") {
        prioritizedPool = eligiblePool.filter(q => {
          const stats = perfMap[q.id];
          return stats && stats.attempts > 0 && Math.round(stats.totalTime / stats.attempts) > 75;
        });
        if (prioritizedPool.length === 0) prioritizedPool = eligiblePool;
      } else if (mode === "PATTERN_COVERAGE" || patternBalanced) {
        const patternGroups = {};
        eligiblePool.forEach(q => {
          const pKey = q.method || q.subtopic || "General";
          if (!patternGroups[pKey]) patternGroups[pKey] = [];
          patternGroups[pKey].push(q);
        });

        const balancedSelection = [];
        const groupKeys = Object.keys(patternGroups);
        let gIdx = 0;
        groupKeys.forEach(k => this.shuffle(patternGroups[k], seed));

        while (balancedSelection.length < count && groupKeys.some(k => patternGroups[k].length > 0)) {
          const currentKey = groupKeys[gIdx % groupKeys.length];
          if (patternGroups[currentKey].length > 0) {
            balancedSelection.push(patternGroups[currentKey].pop());
          }
          gIdx++;
        }
        prioritizedPool = balancedSelection;
      } else {
        prioritizedPool = eligiblePool;
      }

      const shuffledSelection = this.shuffle([...prioritizedPool], seed);
      const finalSelectedQuestions = shuffledSelection.slice(0, Math.min(count, shuffledSelection.length));

      if (randomizeOrder) {
        this.shuffle(finalSelectedQuestions, seed);
      }

      return {
        title: title,
        durationMin: durationMin,
        isSectionLocked: !!isSectionLocked,
        questions: finalSelectedQuestions,
        seed: seed || Date.now().toString(),
        totalSelected: finalSelectedQuestions.length
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
      const { title, questions, durationMin, isSectionLocked } = mockInstance;
      await compileAndLaunchArena(title, questions, durationMin, isSectionLocked);
    }
  };

  /* ==========================================================================
   * SECTION 15: CUSTOM MOCK BUILDER & SAVED PRESET CONTROLLERS
   * ========================================================================== */
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
        selectionRule: { mode: "BALANCED" },
        sections: JSON.parse(JSON.stringify(customSequenceRows)),
        questions: null
      };
    }

    await MockService.saveMockDefinition(record);
    document.getElementById("modal-save-blueprint").classList.remove("active");
    alert(`Saved "${title}" (${mode === "FIXED_PAPER" ? "Fixed Question Paper" : "Dynamic Blueprint"}) to Dashboard.`);
    await renderDashboardBlueprints();
  }

  async function launchSavedPreset(id) {
    const preset = await getRecord("store_saved_mocks", id);
    if (!preset) return;

    if (preset.type === "FIXED_PAPER" && preset.questions && preset.questions.length > 0) {
      await MockService.launchMockSession(preset);
    } else {
      customSequenceRows = preset.sections || customSequenceRows;
      document.getElementById("builder-sectional-lock").value = preset.isSectionLocked ? "YES" : "NO";
      await launchConfiguredMock();
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

    const isLock = document.getElementById("builder-sectional-lock").value === "YES";
    const allQuestions = await getAllRecords("store_questions");

    let sections = [];
    let flattened = [];
    let signatureTags = [];
    let globalCounter = 1;

    for (let sIdx = 0; sIdx < customSequenceRows.length; sIdx++) {
      const row = customSequenceRows[sIdx];
      let pool = allQuestions.filter(q => q.subject === row.subject);
      if (pool.length === 0) pool = allQuestions;

      // Genuine Fisher-Yates random selection for custom builder
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

    if (flattened.length === 0) {
      alert("Database question pool empty for configured routine.");
      return;
    }

    const isStandardTier1 = customSequenceRows.length === 4;
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
   * SECTION 16: TIMED EXAM ARENA CONTROLLER
   * ========================================================================== */
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
    if (!toast) return;
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

    if (researchBtn) researchBtn.style.display = "inline-flex";

    if (isRev) {
      if (pauseBtn) pauseBtn.style.display = "none";
      if (exitRevBtn) exitRevBtn.style.display = "inline-flex";
      if (lockBtn) lockBtn.style.display = "none";
      if (drawerLockBtn) drawerLockBtn.style.display = "none";
      if (revBtn) revBtn.style.display = "none";
      if (saveNextBtn) saveNextBtn.innerText = "Next Question ►";
      document.getElementById("btn-submit-exam").style.display = "none";
      document.getElementById("palette-drawer-title").innerText = "Review Palette";
      document.getElementById("palette-legend-bar").innerHTML = `
        <span>🟢 Correct</span>
        <span>🔴 Incorrect</span>
        <span>⚪ Unattempted</span>
      `;
      if (panicFlag) panicFlag.style.display = resp.isPanicSlip ? "inline-block" : "none";

      const spent = resp.timeSpentSec || 0;
      const mSpent = Math.floor(spent / 60);
      const sSpent = spent % 60;
      document.getElementById("arena-q-timer").innerText = `${String(mSpent).padStart(2, '0')}:${String(sSpent).padStart(2, '0')}`;
      document.getElementById("hud-pacing-status").innerText = `${spent}s on Q`;
    } else {
      if (pauseBtn) pauseBtn.style.display = "inline-flex";
      if (exitRevBtn) exitRevBtn.style.display = "none";
      if (revBtn) revBtn.style.display = "inline-flex";
      if (saveNextBtn) saveNextBtn.innerText = "Save & Next";
      document.getElementById("btn-submit-exam").style.display = "block";
      document.getElementById("palette-drawer-title").innerText = "Question Palette";
      if (panicFlag) panicFlag.style.display = "none";

      if (activeExam.isSectionLocked) {
        if (lockBtn) lockBtn.style.display = "inline-flex";
        if (drawerLockBtn) drawerLockBtn.style.display = "block";
        const isLast = activeExam.activeSectionIndex === activeExam.sections.length - 1;
        if (lockBtn) lockBtn.innerText = isLast ? "🔒 Submit Final Section" : "🔒 End Section Early";
        if (drawerLockBtn) drawerLockBtn.innerText = isLast ? "🔒 Lock & Submit Final Section" : "🔒 End & Advance Section Early";
      } else {
        if (lockBtn) lockBtn.style.display = "none";
        if (drawerLockBtn) drawerLockBtn.style.display = "none";
      }
    }

    const secQs = activeExam.questions.filter(item => item.sectionIndex === q.sectionIndex);
    document.getElementById("hud-section-badge").innerText = `${q.sectionName ? q.sectionName.toUpperCase() : 'EXAM'}`;
    document.getElementById("hud-section-qinfo").innerText = `Sec Q${q.localNumber || (activeExam.currentQuestionIndex + 1)} of ${secQs.length} (Global Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)})`;
    document.getElementById("arena-q-num").innerText = `Q${q.globalNumber || (activeExam.currentQuestionIndex + 1)}`;
    document.getElementById("arena-q-text").innerHTML = formatRichText(q.questionText);

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
    if (q.imageUrl && q.imageUrl.trim().length > 0) {
      imgBox.style.display = "block";
      imgBox.innerHTML = `<img src="${q.imageUrl}" alt="Question Diagram">`;
    } else {
      imgBox.style.display = "none";
      imgBox.innerHTML = "";
    }

    // Dynamic Multi-Concept Linked Knowledge Pills in Review Mode
    if (isRev && conceptBridgeBox) {
      conceptBridgeBox.style.display = "block";
      const pillsWrap = document.getElementById("arena-concept-pills-wrap");
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
    } else if (conceptBridgeBox) {
      conceptBridgeBox.style.display = "none";
    }

    // Telemetry & Decision Trail Banner in Review Mode
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
      if (telemBanner) telemBanner.style.display = "none";
      if (solutionBlock) solutionBlock.style.display = "none";
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

  // Question Navigation Listeners
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

  // Arena Pause & Minimize Controllers
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

  /* ==========================================================================
   * SECTION 17: AI CONSOLE COMMAND BUS (V2) & MACHINE-READABLE REGISTRY
   * ========================================================================== */
  const COMMAND_REGISTRY = {
    // 1. Symmetrical Mock Creation (Driven by shared MockService)
    CREATE_MOCK: async (payload) => {
      const instance = await MockService.generate(payload.selection || payload);
      let savedRecord = null;
      if (payload.saveAsPreset || payload.saveBlueprint) {
        savedRecord = await MockService.saveMockDefinition({
          title: payload.title || instance.title,
          type: payload.selection ? "DYNAMIC_BLUEPRINT" : "FIXED_PAPER",
          selectionRule: payload.selection || null,
          isSectionLocked: instance.isSectionLocked,
          sections: [{ id: 1, subject: payload.selection ? payload.selection.subject : "QA", count: instance.totalSelected, durationMin: instance.durationMin }],
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
        questionIds: instance.questions.map(q => q.id),
        launched: !!payload.launchImmediately
      };
    },

    // 2. Safe Read & Telemetry Extraction Commands
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

    // 3. Question CRUD via Shared QuestionService
    CREATE_QUESTION: async (payload) => {
      const q = await QuestionService.create(payload.question || payload);
      return { created: true, id: q.id, question: q };
    },

    UPDATE_QUESTION: async (payload) => {
      const q = await QuestionService.update(payload.id, payload.updates || payload);
      return { updated: true, id: q.id };
    },

    DELETE_QUESTION: async (payload) => {
      return await QuestionService.delete(payload.id);
    },

    DELETE_MOCK: async (payload) => {
      return await MockService.deleteMock(payload.mockId);
    },

    // 4. Safe Taxonomy Operations
    ADD_CHAPTER: async (payload) => {
      const chap = await TaxonomyService.addChapter(payload.subject, payload.chapter);
      return { success: true, chapter: chap };
    },

    MERGE_CHAPTERS: async (payload) => {
      await TaxonomyService.mergeChapters(payload.subject, payload.sourceChapter, payload.targetChapter);
      return { success: true, merged: `${payload.sourceChapter} ➔ ${payload.targetChapter}` };
    },

    // 5. Protected Raw DB Directive (Requires confirmation token for CLEAR)
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
        return { success: true, operation: "CLEAR", store };
      } else if (operation === "PUT") {
        await putRecord(store, record);
        return { success: true, operation: "PUT", store };
      } else if (operation === "DELETE") {
        await deleteRecordFromStore(store, key);
        return { success: true, operation: "DELETE", store, key };
      }
      throw new Error(`Unsupported raw operation: ${operation}`);
    },

    // 6. Complete Compatibility with Existing Console Command Actions
    BATCH_INGEST_QUESTIONS: async (payload) => {
      const count = await QuestionService.bulkCreate(payload.questions, "Ingested Bank");
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
        orderedMockQuestionIds = []
      } = payload;

      if (dossiers.length > 0) {
        await runTx(["store_concepts"], "readwrite", (tx) => {
          const st = tx.objectStore("store_concepts");
          dossiers.forEach(d => st.put(sanitizeDossier(d)));
        });
      }
      if (newQuestions.length > 0) {
        await QuestionService.bulkCreate(newQuestions, "Curated Paper");
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
      orderedMockQuestionIds.forEach(id => {
        const found = allQs.find(q => q.id === id);
        if (found) resolved.push(found);
      });

      const paper = await MockService.saveMockDefinition({
        title: title,
        type: "FIXED_PAPER",
        isSectionLocked: !!isSectionLocked,
        sections: [{ id: 1, subject: "QA", count: resolved.length, durationMin: durationMin }],
        questions: resolved
      });

      if (launchImmediately) {
        await MockService.launchMockSession({ title, questions: resolved, durationMin, isSectionLocked });
      }

      return { success: true, mockId: paper.id, questionsCount: resolved.length };
    },

    CREATE_AND_SAVE_FIXED_MOCK: async (payload) => {
      const {
        title = "Curated Mock Paper",
        isSectionLocked = true,
        launchImmediately = false,
        durationMin = 15,
        existingQuestionIds = [],
        newQuestions = []
      } = payload;

      if (newQuestions.length > 0) {
        await QuestionService.bulkCreate(newQuestions, "Curated Paper");
      }

      const allQs = await getAllRecords("store_questions");
      const combinedPool = [];

      existingQuestionIds.forEach(targetId => {
        const found = allQs.find(q => q.id === targetId);
        if (found) combinedPool.push(found);
      });

      newQuestions.forEach(q => {
        const sanitized = sanitizeQuestion(q);
        if (!combinedPool.some(item => item.id === sanitized.id)) {
          combinedPool.push(sanitized);
        }
      });

      const paper = await MockService.saveMockDefinition({
        title: title,
        type: "FIXED_PAPER",
        isSectionLocked: !!isSectionLocked,
        sections: [{ id: 1, subject: "QA", count: combinedPool.length, durationMin: durationMin }],
        questions: combinedPool
      });

      if (launchImmediately) {
        await MockService.launchMockSession({ title, questions: combinedPool, durationMin, isSectionLocked });
      }

      return { success: true, mockId: paper.id, questionsCount: combinedPool.length };
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
      const questions = (payload.questions || []).map(sanitizeQuestion);
      await QuestionService.bulkCreate(questions, "Ingest & Launch");
      await compileAndLaunchArena(payload.title || "AI Practice Mock", questions, payload.durationMin || 15, !!payload.isSectionLocked);
      return { success: true, launched: true, questionCount: questions.length };
    },

    AI_PRESCRIBE_REMEDY: async (payload) => {
      const qIds = payload.questionIds || [];
      const newQuestions = (payload.newQuestions || []).map(sanitizeQuestion);
      if (newQuestions.length > 0) {
        await QuestionService.bulkCreate(newQuestions, "Remedial Question");
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
    const raw = document.getElementById("console-payload").value.trim();
    const consoleOutput = document.getElementById("console-output-box");
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
        document.getElementById("console-payload").value = formattedJson;
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
      document.getElementById("console-payload").value = JSON.stringify(sample, null, 2);
    }
  }

  // --- End of Part 2 ---
  /* ==========================================================================
   * SECTION 18: UNTIMED DOJO PRACTICE & METHOD CLINIC
   * Active Recall, Method Breakdown & Dynamic Multi-Concept Pills
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

    // Dynamic Multi-Concept Linked Knowledge Pills in Dojo Sectional Banner
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

  /* ==========================================================================
   * SECTION 19: STAGE 1 REVIEW COCKPIT & SECTIONAL FIDELITY
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

  /* ==========================================================================
   * SECTION 20: COGNITIVE TRAP CLINIC & SUBJECT DIAGNOSTICS
   * ========================================================================== */
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
      activeClinicQuestions.forEach((item) => {
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

  async function drillFilteredTrapQuestions() {
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

    await compileAndLaunchArena(`Trap Drill: #${activeClinicTrapType}`, uniquePool, Math.max(5, uniquePool.length * 2), false);
  }

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

  /* ==========================================================================
   * SECTION 21: PUBLISHING-GRADE TYPESET PRINT BOOK ENGINE
   * ========================================================================== */
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

    if (pType === "COMPENDIUM") {
      const dossiers = await ConceptService.getAll();
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

  /* ==========================================================================
   * SECTION 22: DATA EXPORT MATRIX (UNIVERSAL TELEMETRY EXTRACTION)
   * ========================================================================== */
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_knowledge_compendium_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
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

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cgl_flashcard_vault_${now}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

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

  async function exportUnifiedAiHandoffPackage() {
    const now = Date.now();
    const allAttempts = await getAllRecords("store_attempts");
    const allQuestions = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
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

  /* ==========================================================================
   * SECTION 23: DIRECT DATABASE STUDIO & RECOVERY OPERATIONS
   * ========================================================================== */
  async function refreshDbInspector() {
    const storeSelect = document.getElementById("db-store-select");
    if (!storeSelect) return;
    const storeName = storeSelect.value;
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
    if (confirm("Permanently clear mock test history? (Question bank and Living Sheets remain 100% intact)")) {
      await clearStore("store_attempts");
      alert("Test history cleared.");
      renderDashboard();
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
      renderDashboard();
      refreshDbInspector();
    }
  }

  /* ==========================================================================
   * SECTION 24: GLOBAL RESEARCH & OMNI SEARCH DRAWERS
   * ========================================================================== */
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

  /* ==========================================================================
   * SECTION 25: LIVING KNOWLEDGE STUDIO CONCEPT CARD AUTHORING
   * ========================================================================== */
  function openConceptEditorModal(isNew = true) {
    currentConceptImageBase64 = "";
    document.getElementById("concept-editor-title").innerText = isNew ? "Add Topic Sheet" : "Edit Topic Sheet";

    if (isNew || currentCompSheets.length === 0) {
      document.getElementById("concept-edit-id").value = "top_" + Date.now();
      document.getElementById("concept-edit-subject").value = activeCompSubject || "QA";
      document.getElementById("concept-edit-chapter").value = activeCompChapter || "QA_PERCENTAGE";
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

    const existing = await ConceptService.get(id);
    if (existing) {
      await ConceptService.update(id, obj);
    } else {
      await ConceptService.create(obj);
    }

    document.getElementById("modal-concept-editor").classList.remove("active");
    openCompendiumToSheet(id, subject, chapter);
  }

  async function deleteCurrentCompendiumSheet() {
    if (!currentCompSheets || currentCompSheets.length === 0) return;
    const curr = currentCompSheets[activeCompSheetIndex];
    if (confirm(`Permanently delete living sheet: "${curr.title}"?`)) {
      await ConceptService.delete(curr.id);
      await renderCompStudioSheets();
    }
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

  async function promptCreateNewChapter() {
    const chapName = prompt(`Enter new chapter tag for ${activeCompSubject} (e.g. ${activeCompSubject}_NEW_TOPIC):`);
    if (!chapName || !chapName.trim()) return;

    try {
      const formatted = await TaxonomyService.addChapter(activeCompSubject, chapName);
      await handleCompStudioSubjectChange(activeCompSubject);
      document.getElementById("comp-studio-chapter-select").value = formatted;
      await handleCompStudioChapterChange(formatted);
    } catch (err) {
      alert(err.message);
    }
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
      document.getElementById("compendium-fullscreen-view").style.display = "none";
    });
    document.getElementById("compendium-fullscreen-view").style.display = "flex";
    handleCompStudioSubjectChange(activeCompSubject || "QA");
  }

  function closeCompendiumStudio() {
    document.getElementById("compendium-fullscreen-view").style.display = "none";
  }

  /* ==========================================================================
   * SECTION 26: FLASHCARD VAULT AUTHORING (ANKI EXPORT ORIENTED)
   * ========================================================================== */
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
    await renderVault();
  }

  function toggleVaultCardAccordion(id) {
    const tile = document.getElementById(`vault-tile-${id}`);
    if (tile) tile.classList.toggle("open");
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

  async function openFlashcardEditorModal(isNew = true, cardId = null) {
    currentFcFrontImgBase64 = "";
    currentFcBackImgBase64 = "";

    if (isNew) {
      document.getElementById("flashcard-editor-title").innerText = "Add New Card to Vault";
      document.getElementById("edit-fc-id").value = "fc_" + Date.now();
      document.getElementById("edit-fc-subject").value = "QA";
      document.getElementById("edit-fc-chapter").value = "QA_PERCENTAGE";
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
    document.getElementById("modal-flashcard-editor").classList.remove("active");
    renderVault();
  }

  async function deleteCurrentEditingFlashcard(id = null) {
    const targetId = id || document.getElementById("edit-fc-id").value;
    if (confirm("Permanently delete this card from the vault?")) {
      await deleteRecordFromStore("store_flashcards", targetId);
      const modal = document.getElementById("modal-flashcard-editor");
      if (modal) modal.classList.remove("active");
      renderVault();
    }
  }

  /* ==========================================================================
   * SECTION 27: AI EXPORT & LEDGER EXTRACTION HELPERS
   * ========================================================================== */
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
    alert("Payload copied! Paste into chat with Gemini to diagnose vulnerabilities.");
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
- CREATE_MOCK (Dynamic selection / explicit question IDs / AI generated)
- SEARCH_QUESTIONS
- SEARCH_CONCEPTS
- CREATE_QUESTION
- UPDATE_QUESTION
- DELETE_QUESTION
- INGEST_AND_ASSEMBLE_COMPLETE_MOCK
- CREATE_AND_SAVE_FIXED_MOCK
- EXECUTE_AI_CONSULTATION_BUNDLE
- INGEST_AND_LAUNCH_MOCK
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
   * SECTION 28: NAVIGATION, TAB SWITCHING & SYSTEM INITIALIZATION
   * ========================================================================== */
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

        if (Math.abs(deltaX) > 65 && Math.abs(deltaY) < 30) {
          if (navigator.vibrate) navigator.vibrate(15);
          if (deltaX < 0) onLeftSwipe();
          else onRightSwipe();
        }
      }, { passive: true });
    };

    // Swipe attached ONLY to Arena body
    attachSwipeHandler("arena-body", () => document.getElementById("btn-q-save-next").click(), () => document.getElementById("btn-q-prev").click());

    // CRITICAL: Knowledge Studio canvas swipe handler is omitted to prevent vertical reading interruptions!

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
      console.error("CGL_OS bootstrap notice:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApplication);
  } else {
    initializeApplication();
  }

  /* ==========================================================================
   * SECTION 29: COMPLETE PUBLIC API REGISTRATION
   * ========================================================================== */
  return {
    // Services
    TaxonomyService,
    QuestionService,
    ConceptService,
    SearchService,
    MockService,
    PerformanceService,

    // Navigation & Tabs
    switchTab,
    pushNavLayer,
    popNavLayer,

    // Mock Builder & Execution
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

    // Living Knowledge Studio
    openCompendiumStudio,
    closeCompendiumStudio,
    openCompendiumToSheet,
    handleCompStudioSubjectChange,
    handleCompStudioChapterChange,
    navCompStudioSheet,
    autoSaveCompScratchpad,
    deleteCurrentCompendiumSheet,
    promptCreateNewChapter,
    openConceptEditorModal,
    handleConceptImageUpload,
    saveConceptCard,
    insertDossierSnippet,
    launchCurrentSheetQuestionsDrill,

    // Research & Links
    openOmniResearchForCurrentQuestion,
    openOmniResearchForDojoQuestion,
    triggerOmniResearchDrawer,
    jumpToConceptFromReview,
    jumpToConceptFromDojo,
    openOmniSearchModal,
    executeOmniSearch,

    // Synapse Explorer
    openSynapseGraphModal,
    renderSynapseExplorer,
    setSynapseLevel,
    launchDirectChapterDrill,
    launchDirectSheetDrill,

    // Untimed Dojo
    updateDojoChapters,
    updateDojoMethods,
    launchFilteredDojo,
    exitDojoArena,
    navDojoArena,
    toggleDojoMethod,
    autoSaveDojoAnnotation,
    toggleDojoPalette,
    toggleExamPalette,

    // Question GUI Editor
    openEditQuestionModal,
    openEditCurrentDojoQuestion,
    handleQuestionImageUpload,
    saveQuestionEditor,
    duplicateCurrentEditingQuestion,
    deleteCurrentEditingQuestion,

    // Review & Diagnostics
    openMockReview,
    switchReviewAttempt,
    handleMistakeTagSelect,
    setMistakeTag,
    openTrapClinicModal,
    drillFilteredTrapQuestions,
    openSubjectDiagnosticModal,
    openHistoryArchiveModal,
    renderArchiveList,

    // Taxonomy Management
    openTaxonomyManagerModal,
    renderTaxonomyManagerList,
    addNewSubjectAction,
    promptAddChapterToSubject,
    deleteChapterFromSubject,
    openChapterMergeModal,
    deleteSubjectAction,
    syncEditorChapterDropdown,
    syncFlashcardChapterDropdown,

    // Flashcard Vault & Anki
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

    // Publishing Print Engine
    openPrintConfigModal,
    populatePrintMockDropdown,
    handlePrintTypeChange,
    updatePrintChapters,
    generateAndPrintSheet,

    // AI Console & Backup / Recovery
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
    exportUnifiedAiHandoffPackage,
    refreshDbInspector,
    editDbRecordModal,
    copyInspectedJsonToClipboard,
    wipeTestAttempts,
    factoryResetAll,
    renderDashboard
  };
})();

// Re-bind to global window object
window.CGL_OS = CGL_OS;
