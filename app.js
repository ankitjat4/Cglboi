/**
 * ============================================================================
 * SSC CGL INTELLIGENCE OS — CORE ENGINE (ARCHITECTURE V5.0)
 * Master Application Controller — PART 1 OF 3
 * Architecture: Local-First IndexedDB Engine | Schema Version: 15
 * Candidate: Ankit Kumar (SSC CGL 2026 Tier 1 & Tier 2 Master Preparation)
 * ============================================================================
 */

// Global namespace anchor
window.CGL_OS = null;

const CGL_OS = (() => {
  /* ==========================================================================
   * SECTION 1: CONSTANTS, DB SPECS & RUNTIME STATE
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

  // Living Knowledge Studio State
  let activeCompSubject = "QA";
  let activeCompChapter = "QA_GEOMETRY";
  let activeCompSheetIndex = 0;
  let currentCompSheets = [];
  let currentConceptImageBase64 = "";

  // Universal Anki Forge & Vault State (Tab 4)
  let currentFcFrontImgBase64 = "";
  let currentFcBackImgBase64 = "";
  let activeVaultDeck = [];
  let activeVaultIndex = 0;
  let activeVaultFlipped = false;
  let vaultSearchQuery = "";
  let vaultActiveTag = "ALL";

  // Synapse Knowledge Explorer State
  let synapseCurrentLevel = "SUBJECTS"; // 'SUBJECTS' | 'CHAPTERS' | 'CONCEPTS'
  let synapseActiveSubject = null;
  let synapseActiveChapter = null;

  // Interactive Cognitive Trap Clinic & Disaster Recovery
  let activeClinicTrapType = "TIME_TRAP_Q4";
  let activeClinicQuestions = [];
  let pendingHydrationData = null;

  // Question Editor Dynamic State
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

  // Canonical Seed Taxonomy Baseline (Used ONLY for initial seed on blank database)
  const INITIAL_SEED_TAXONOMY = {
    QA: {
      name: "Quantitative Aptitude",
      order: 1,
      chapters: [
        "QA_PERCENTAGE", "QA_PROFIT_LOSS", "QA_DISCOUNT", "QA_SI_CI",
        "QA_SI_CI_INSTALLMENT", "QA_RATIO_PROP", "QA_AGE", "QA_PARTNERSHIP",
        "QA_AVERAGE", "QA_MIXTURE_ALLIGATION", "QA_TIME_WORK", "QA_WORK_WAGES",
        "QA_PIPE_CISTERN", "QA_SPEED_DIST", "QA_BOAT_STREAM", "QA_RACE",
        "QA_NUM_SYS", "QA_SEQUENCE_SERIES", "QA_SIMPLIFICATION", "QA_SURDS_INDICES",
        "QA_LCM_HCF", "QA_ALGEBRA", "QA_GEOMETRY", "QA_MENSURATION", "QA_TRIGONOMETRY"
      ]
    },
    REAS: {
      name: "General Intelligence & Reasoning",
      order: 2,
      chapters: [
        "REAS_ANALOGY", "REAS_SERIES", "REAS_CODING", "REAS_BLOOD_REL",
        "REAS_SYLLOGISM", "REAS_ORDER_RANK", "REAS_FIGURES", "REAS_DICE_CUBE",
        "REAS_CLOCK_CALENDAR", "REAS_VENN", "REAS_DIRECTION"
      ]
    },
    ENG: {
      name: "English Comprehension",
      order: 3,
      chapters: [
        "ENG_SYN_ANT", "ENG_OWS", "ENG_IDIOMS", "ENG_SPOTTING",
        "ENG_IMPROVE", "ENG_ACTIVE_PASS", "ENG_DIRECT_INDR", "ENG_CLOZE_TEST",
        "ENG_READING_COMP", "ENG_PARAJUMBLES"
      ]
    },
    GA: {
      name: "General Awareness",
      order: 4,
      chapters: [
        "GA_POLITY", "GA_HISTORY_MOD", "GA_HISTORY_ANC", "GA_HISTORY_MED",
        "GA_GEOGRAPHY_IN", "GA_GEOGRAPHY_WORLD", "GA_ECONOMY", "GA_PHYSICS",
        "GA_CHEMISTRY", "GA_BIOLOGY", "GA_STATIC_GK", "GA_CA_ANNUAL"
      ]
    }
  };

  // Runtime Authoritative Taxonomy (Loaded from store_config.system_taxonomy)
  let TAXONOMY = JSON.parse(JSON.stringify(INITIAL_SEED_TAXONOMY));

  /* ==========================================================================
   * SECTION 2: DUAL-TEMPORAL & IST TIME UTILITIES
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
   * SECTION 3: TYPESETTER, KATEX ISOLATION & IMAGE ENGINES
   * ========================================================================== */
  function formatRichText(str) {
    if (!str) return "";
    let out = String(str);

    // 1. Isolate LaTeX formulas into tokens so markdown rules never corrupt equations
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
    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Cognitive Trap:</b> $1</div>');
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
    out = out.replace(/^>\s*\[!tip\]\s*(.*)$/gm, '<div class="callout-box"><b>💡 Recognition Cue:</b> $1</div>');

    // 3. Headings with Anchors for Sheet TOC Generation
    out = out.replace(/^### (.*$)/gim, (match, title) => {
      const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h3 id="sec-${anchor}" class="comp-heading-h3">${title}</h3>`;
    });
    out = out.replace(/^## (.*$)/gim, (match, title) => {
      const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h2 id="sec-${anchor}" class="comp-heading-h2">${title}</h2>`;
    });
    out = out.replace(/^# (.*$)/gim, '<h1 class="comp-heading-h1">$1</h1>');
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 4. Syllogisms, Assertions & Passage Containers
    out = out.replace(/(?:Passage|Directions?\s*\([^)]+\)|Read the following passage[^:]*:)\s*([\s\S]+?)(?=(?:Q\.\s*|Question\s*\d*:|Statement|Statements|Conclusion|\n\n[A-Z]|$))/i, (match, body) => {
      return `<div class="q-passage-container"><span class="q-passage-tag">Passage / Reading Context</span>${body.trim()}</div>`;
    });

    out = out.replace(/(?:Assertion\s*\(?A\)?|Assertion\s*:)\s*([^\n]+)/gi, '<div class="q-assertion-box"><b>[A] Assertion:</b> $1</div>');
    out = out.replace(/(?:Reason\s*\(?R\)?|Reason\s*:)\s*([^\n]+)/gi, '<div class="q-reason-box"><b>[R] Reason:</b> $1</div>');

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

    // 5. Markdown Tables
    out = out.replace(/(\|[^\n]+\|\r?\n)((?:\|:?[-]+:?)+\|)(\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, headerLine, alignLine, bodyLines) => {
      const headers = headerLine.trim().split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = bodyLines.trim().split('\n').map(row => {
        const cells = row.trim().split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="table-responsive"><table class="document-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // 6. Newlines in non-math prose
    out = out.replace(/\n/g, "<br>");

    // 7. Inject validated KaTeX HTML
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
          const maxW = 1000;
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ==========================================================================
   * SECTION 4: LIFO NAVIGATION STACK & ANDROID GESTURE CONTROLLER
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
   * SECTION 5: NON-DESTRUCTIVE INDEXEDDB ENGINE
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
          await bootstrapSystemConfig(db);
        } catch (err) {
          console.warn("System bootstrap notice:", err);
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

  /**
   * Authoritative Bootstrap:
   * CRITICAL ARCHITECTURAL FIX: Never merge DEFAULT_TAXONOMY back into saved taxonomy.
   * If store_config.system_taxonomy exists, it is the 100% authoritative master.
   * Only write INITIAL_SEED_TAXONOMY on a completely fresh, uninitialized database.
   */
  async function bootstrapSystemConfig(database) {
    const savedTaxonomy = await getRecord("store_config", "system_taxonomy");
    if (savedTaxonomy && savedTaxonomy.value && typeof savedTaxonomy.value === "object") {
      TAXONOMY = savedTaxonomy.value;
    } else {
      TAXONOMY = JSON.parse(JSON.stringify(INITIAL_SEED_TAXONOMY));
      await putRecord("store_config", { key: "system_taxonomy", value: TAXONOMY });
    }

    const savedMistakeConfig = await getRecord("store_config", "custom_mistake_tags");
    if (savedMistakeConfig && Array.isArray(savedMistakeConfig.value)) {
      customMistakeTags = [...new Set([...customMistakeTags, ...savedMistakeConfig.value])];
    } else {
      await putRecord("store_config", { key: "custom_mistake_tags", value: customMistakeTags });
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
   * SECTION 6: CANONICAL RECORD SANITIZERS & NORMALIZERS
   * ========================================================================== */
  function sanitizeQuestion(q, idx = 0) {
    let conceptIds = [];
    if (Array.isArray(q.conceptIds)) {
      conceptIds = q.conceptIds.map(s => String(s).trim()).filter(Boolean);
    } else if (q.conceptId && typeof q.conceptId === "string" && q.conceptId.trim().length > 0) {
      conceptIds = [q.conceptId.trim()];
    }

    return {
      id: q.id || `q_manual_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
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
      tags: Array.isArray(q.tags) ? q.tags : ["General"],
      annotation: q.annotation || "",
      createdAt: q.createdAt || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeDossier(d, idx = 0) {
    return {
      id: d.id || `top_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      subject: d.subject || "QA",
      chapter: d.chapter || "QA_GENERAL",
      title: d.title || "Untitled Knowledge Sheet",
      subtitle: d.subtitle || "",
      content: d.content || "",
      imageUrl: d.imageUrl || "",
      tags: Array.isArray(d.tags) ? d.tags : [],
      timestamp: d.timestamp || Date.now(),
      updatedAt: Date.now()
    };
  }

  function sanitizeFlashcard(f, idx = 0) {
    return {
      id: f.id || `fc_${Date.now()}_${idx}`,
      cardType: f.cardType || (f.extra ? "BASIC_EXTRA" : "BASIC"),
      subject: f.subject || "QA",
      chapter: f.chapter || "QA_GENERAL",
      front: f.front || f.questionText || "Untitled Prompt",
      frontImageUrl: f.frontImageUrl || "",
      back: f.back || f.explanation || "Untitled Target Fact",
      backImageUrl: f.backImageUrl || "",
      extra: f.extra || "",
      tags: Array.isArray(f.tags) ? f.tags : ["Vault"],
      createdAt: f.createdAt || Date.now()
    };
  }

  function sanitizeSavedMock(b, idx = 0) {
    return {
      id: b.id || `bp_${Date.now()}_${idx}`,
      type: b.type || (b.questions ? "FIXED_PAPER" : "DYNAMIC_BLUEPRINT"),
      title: b.title || `Saved Mock Setup ${idx + 1}`,
      isSectionLocked: b.isSectionLocked !== undefined ? b.isSectionLocked : true,
      selectionRule: b.selectionRule || null,
      sections: Array.isArray(b.sections) ? b.sections : [{ id: 1, subject: "QA", count: 25, durationMin: 15 }],
      questions: Array.isArray(b.questions) ? b.questions.map(sanitizeQuestion) : null,
      createdAt: b.createdAt || Date.now(),
      updatedAt: Date.now()
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

  /* ==========================================================================
   * SECTION 7: SHARED SERVICE — TAXONOMY SERVICE
   * Full User-Driven Taxonomy CRUD + Safe Chapter Merging & Orphan Handling
   * ========================================================================== */
  const TaxonomyService = {
    async getTaxonomy() {
      const rec = await getRecord("store_config", "system_taxonomy");
      if (rec && rec.value) {
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
      if (!cleanKey || !cleanName) throw new Error("Key and Full Name are required.");
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
      const affectedQs = allQs.filter(q => q.subject === key);
      const allConcepts = await getAllRecords("store_concepts");
      const affectedConcepts = allConcepts.filter(c => c.subject === key);

      if (affectedQs.length > 0 || affectedConcepts.length > 0) {
        throw new Error(`Cannot delete subject ${key}. It contains ${affectedQs.length} questions and ${affectedConcepts.length} sheets. Reassign or delete them first.`);
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

      // 2. Safely reassign all questions and concepts matching oldChap to cleanNew in IndexedDB
      await this.reassignChapterContent(subKey, oldChap, cleanNew);
    },

    /**
     * Non-destructive Chapter Deletion:
     * Removes the chapter from taxonomy. Content is PRESERVED and marked as UNASSIGNED
     * if not reassigned, guaranteeing zero question/sheet loss.
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
   * SECTION 8: SHARED SERVICE — QUESTION SERVICE
   * Complete Question CRUD, Validation, Duplication & Provenance Tracking
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

      // Audit check against saved mock definitions
      const savedMocks = await getAllRecords("store_saved_mocks");
      const referencingMocks = savedMocks.filter(m => 
        m.type === "FIXED_PAPER" && Array.isArray(m.questions) && m.questions.some(q => q.id === id)
      );

      await deleteRecordFromStore("store_questions", id);
      SearchService.invalidate();

      return {
        id: id,
        deleted: true,
        referencingMocksCount: referencingMocks.length
      };
    },

    async duplicate(id) {
      const source = await getRecord("store_questions", id);
      if (!source) throw new Error(`Question ${id} not found to duplicate.`);

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
   * SECTION 9: SHARED SERVICE — CONCEPT SERVICE (LIVING KNOWLEDGE STUDIO)
   * Dossier CRUD, In-Sheet TOC Generator & Bi-Directional Question Discovery
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
     * Parses markdown text for headings (## and ###) to generate in-sheet
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
   * SECTION 10: SHARED SERVICE — SEARCH SERVICE
   * High-Performance In-Memory Query Engine across Questions, Sheets & Blueprints
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

    async searchAll(queryStr, filters = {}, limit = 40) {
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
   * SECTION 11: SHARED SERVICE — PERFORMANCE SERVICE
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
   * SECTION 12: SHARED SERVICE — MOCK SERVICE & QUESTION SELECTION ENGINE
   * Fisher-Yates Randomizer, Pattern Balancing, Weakness Weights & Blueprint Manager
   * ========================================================================== */
  const MockService = {
    /**
     * Unbiased In-Place Fisher-Yates Shuffle
     */
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

    /**
     * Master Selection Engine: Solves the "First-N" & "First-Sheet" bugs.
     * Evaluates the complete eligible pool against selection strategies.
     */
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

      // 1. Resolve Explicit IDs if supplied
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

      // 2. Anti-Repetition Recency Filter
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

      // 3. Apply Performance and Mode Strategies
      const perfMap = await PerformanceService.getQuestionPerformanceMap();
      let prioritizedPool = [];

      if (mode === "UNATTEMPTED") {
        prioritizedPool = eligiblePool.filter(q => !perfMap[q.id] || perfMap[q.id].attempts === 0);
        if (prioritizedPool.length === 0) {
          prioritizedPool = eligiblePool; // Graceful fallback
        }
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
        // Group by method/pattern and select evenly across patterns
        const patternGroups = {};
        eligiblePool.forEach(q => {
          const pKey = q.method || q.subtopic || "General";
          if (!patternGroups[pKey]) patternGroups[pKey] = [];
          patternGroups[pKey].push(q);
        });

        const balancedSelection = [];
        const groupKeys = Object.keys(patternGroups);
        let gIdx = 0;

        // Shuffle within groups first
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

      // 4. Genuine Fisher-Yates Shuffle & Slicing
      const shuffledSelection = this.shuffle([...prioritizedPool], seed);
      const finalSelectedQuestions = shuffledSelection.slice(0, Math.min(count, shuffledSelection.length));

      // 5. Final Display Randomization
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

    /**
     * Persist Mock Blueprint or Fixed Paper
     */
    async saveMockDefinition(mockData) {
      const clean = sanitizeSavedMock(mockData);
      await putRecord("store_saved_mocks", clean);
      return clean;
    },

    /**
     * Delete Mock: Safely removes definition and attempt links without
     * deleting questions from store_questions.
     */
    async deleteMock(mockId) {
      const existing = await getRecord("store_saved_mocks", mockId);
      if (!existing) throw new Error(`Saved mock ${mockId} not found.`);

      await deleteRecordFromStore("store_saved_mocks", mockId);
      return { id: mockId, deleted: true };
    },

    /**
     * Compile and Launch Execution in Timed Arena
     */
    async launchMockSession(mockInstance) {
      const { title, questions, durationMin, isSectionLocked } = mockInstance;
      await compileAndLaunchArena(title, questions, durationMin, isSectionLocked);
    }
  };

  /* ==========================================================================
   * SECTION 13: CONSOLE COMMAND BUS (V2) & MACHINE-READABLE AI DISPATCH
   * Symmetrical Capabilities, Safe Read Queries, Execution Safety Tokens
   * ========================================================================== */
  const COMMAND_REGISTRY = {
    // 1. Symmetrical Mock Creation (Calls same MockService)
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

    // 6. Full Backward Compatibility with Legacy Command Actions
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
    }
  };

  /**
   * Main Console Execution Entrypoint with Machine-Readable JSON Output
   */
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
  /* ==========================================================================
   * SECTION 14: TIMED EXAM ARENA & STAGE 2 REVIEW CONTROLLER
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

    // Hesitation & Decision Trail Telemetry Banner
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
          ${resp.errorTag && resp.errorTag !== 'UNCLASSIFIED' && resp.errorTag !== 'VALID_CALCULATED_RISK' ? `<div style="margin-top:4px; color:#f87171; font-size:11px;"><b>Cognitive Trap:</b> #${resp.errorTag}</div>` : ''}
        </div>
      `;

      solutionBlock.style.display = "block";
      const currentTag = resp.errorTag || "UNCLASSIFIED";

      let optionsHtml = `
        <option value="UNCLASSIFIED" ${currentTag==='UNCLASSIFIED'?'selected':''}>Override Mistake Tag...</option>
        <option value="VALID_CALCULATED_RISK" ${currentTag==='VALID_CALCULATED_RISK'?'selected':''}>✓ Valid Calculated Risk (Clear Penalty)</option>
      `;
      customMistakeTags.forEach(t => {
        if (t !== "VALID_CALCULATED_RISK") {
          optionsHtml += `<option value="${t}" ${currentTag===t?'selected':''}>${t.replace(/_/g, ' ')}</option>`;
        }
      });

      solutionBlock.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
          <span style="font-weight:700; color:var(--accent-cyan); font-size:13px;">Method & Detailed Derivation</span>
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
        }

        if (isCorrect) {
          totalMarks += 2.0;
          correct++;
          if (resp.initialOption !== null && resp.initialOption !== q.correctIndex) switchDelta++;
          if (resp.timeSpentSec <= 10) resp.errorTag = "SPEED_MASTERY";
        } else {
          totalMarks -= 0.5;
          penaltyDrag += 0.5;
          incorrect++;
          if (resp.initialOption === q.correctIndex) switchDelta--;
          if (resp.timeSpentSec > 90) traps++;

          if (!resp.errorTag || resp.errorTag === "UNCLASSIFIED") {
            if (resp.isPanicSlip) resp.errorTag = "PANIC_SLIP";
            else if (resp.switches > 0 && resp.initialOption === q.correctIndex) resp.errorTag = "SECOND_GUESS_BLUNDER";
            else if (resp.timeSpentSec > 90) resp.errorTag = "TIME_TRAP_Q4";
            else if (resp.timeSpentSec <= 12) resp.errorTag = "SPEED_MISREAD";
            else resp.errorTag = "CONCEPT_VOID";
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
      sessionId: "mock_" + now,
      parentSessionId: null,
      attemptNumber: 1,
      timestamp: now,
      timeIST: formatISTDate(now),
      diurnalSlot: getDiurnalSlot(now),
      title: title || "Practice Arena",
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
   * SECTION 15: LIVING KNOWLEDGE STUDIO (GESTURE FIX & IN-SHEET TOC)
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
      document.getElementById("compendium-fullscreen-view").style.display = "none";
    });
    document.getElementById("compendium-fullscreen-view").style.display = "flex";

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
    tabsBar.innerHTML = "";
    docContent.innerHTML = "";

    if (currentCompSheets.length === 0) {
      docContent.innerHTML = `
        <div style="text-align:center; padding:50px 14px; color:var(--text-muted);">
          <h3 style="font-size:16px; margin-bottom:8px; color:#fff;">No Topic Sheets in ${activeCompChapter}</h3>
          <p style="font-size:12px; margin-bottom:14px;">This chapter has no living sheets yet. Author your first sheet below.</p>
          <button class="btn" onclick="CGL_OS.openConceptEditorModal(true)">+ Create First Sheet</button>
        </div>
      `;
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

    // Discovery: Linked Questions Count
    const linkedQs = await ConceptService.getLinkedQuestions(sheet.id, sheet.chapter);
    document.getElementById("comp-linked-q-count").innerText = `${linkedQs.length} Associated Questions Linked`;

    // Dynamic In-Sheet TOC Generator (Ensures Zero Horizontal Interruption)
    const toc = ConceptService.generateTOC(sheet.content);
    let tocHtml = "";
    if (toc.length > 0) {
      tocHtml = `
        <div class="sheet-toc-pill-wrap" style="display:flex; flex-wrap:wrap; gap:6px; background:#0b101d; padding:8px 12px; border-radius:8px; border:1px solid rgba(56, 189, 248, 0.2); margin-bottom:14px;">
          <span style="font-size:10px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.8px; align-self:center;">Jump to:</span>
          ${toc.map(item => `
            <a href="#${item.anchor}" class="anchor-pill" style="font-size:10.5px; padding:3px 9px; text-decoration:none;" onclick="document.getElementById('${item.anchor}').scrollIntoView({behavior:'smooth'}); return false;">
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
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:14px; border-top:1px solid var(--border-color);">
        <button class="btn btn-secondary" onclick="CGL_OS.navCompStudioSheet(-1)">◀ Previous Sheet</button>
        <span style="font-size:11px; font-weight:700; color:var(--text-muted);">Sheet ${activeCompSheetIndex + 1} of ${currentCompSheets.length}</span>
        <button class="btn btn-secondary" onclick="CGL_OS.navCompStudioSheet(1)">Next Sheet ▶</button>
      </div>
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

  /* ==========================================================================
   * SECTION 16: SYNAPSE KNOWLEDGE EXPLORER
   * Progressive Disclosure Navigation: Subject ➔ Chapter ➔ Concepts / Sheets
   * ========================================================================== */
  async function openSynapseGraphModal() {
    synapseCurrentLevel = "SUBJECTS";
    synapseActiveSubject = null;
    synapseActiveChapter = null;
    renderSynapseExplorer();

    pushNavLayer("modal-synapse-tree", () => {
      document.getElementById("modal-synapse-tree").classList.remove("active");
    });
    document.getElementById("modal-synapse-tree").classList.add("active");
  }

  async function renderSynapseExplorer() {
    const rootContainer = document.getElementById("synapse-dom-tree-root");
    if (!rootContainer) return;
    rootContainer.innerHTML = "";

    const allQs = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
    const taxonomy = await TaxonomyService.getTaxonomy();

    // Render Progressive Navigation Breadcrumb
    const breadcrumb = document.createElement("div");
    breadcrumb.style.cssText = "display:flex; align-items:center; gap:8px; font-size:12px; margin-bottom:12px; color:var(--accent-cyan);";
    breadcrumb.innerHTML = `
      <span style="cursor:pointer;" onclick="CGL_OS.setSynapseLevel('SUBJECTS')">All Subjects</span>
      ${synapseActiveSubject ? ` ➔ <span style="cursor:pointer;" onclick="CGL_OS.setSynapseLevel('CHAPTERS', '${synapseActiveSubject}')">${synapseActiveSubject}</span>` : ''}
      ${synapseActiveChapter ? ` ➔ <b>${synapseActiveChapter}</b>` : ''}
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
            ${sub.chapters.length} Chapters • ${qCount} Questions • ${cCount} Sheets
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
            <div style="font-size:10.5px; color:var(--text-muted);">${chapQs.length} Qs • ${chapSheets.length} Living Sheets</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.launchDirectChapterDrill('${synapseActiveSubject}', '${chap}')">⚡ Drill</button>
            <button class="btn btn-cyan" style="padding:2px 8px; font-size:11px;" onclick="CGL_OS.setSynapseLevel('CONCEPTS', '${synapseActiveSubject}', '${chap}')">Explore ➔</button>
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
        <button class="btn" style="padding:4px 10px; font-size:11px;" onclick="CGL_OS.launchDirectChapterDrill('${synapseActiveSubject}', '${synapseActiveChapter}')">⚡ Drill Entire Chapter (${chapQs.length} Qs)</button>
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
              <b style="color:var(--accent-cyan); font-size:13px;">📖 ${sheet.title}</b>
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
    document.getElementById("modal-synapse-tree").classList.remove("active");
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
    document.getElementById("modal-synapse-tree").classList.remove("active");
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
   * SECTION 17: DASHBOARD & ACTIVE PREPARATION COMMAND CENTER
   * ========================================================================== */
  async function renderDashboard() {
    const allQs = await getAllRecords("store_questions");
    const allConcepts = await ConceptService.getAll();
    const metrics = await PerformanceService.calculateGlobalMetrics();
    const neglect = await PerformanceService.calculateNeglect();

    // 1. Dynamic Master KPIs
    document.getElementById("kpi-total-mocks").innerText = metrics.totalMocks;
    document.getElementById("kpi-global-acc").innerText = metrics.totalMocks > 0 ? `${metrics.accuracy}%` : "--";
    document.getElementById("kpi-avg-speed").innerText = metrics.totalMocks > 0 ? `${metrics.avgSpeed}s` : "--";
    document.getElementById("kpi-traps-hit").innerText = metrics.trapsHit;

    const circleGauge = document.getElementById("gauge-acc-circle");
    if (circleGauge) {
      circleGauge.setAttribute("stroke-dasharray", `${metrics.accuracy}, 100`);
      circleGauge.style.stroke = metrics.accuracy >= 80 ? "var(--status-green-border)" : (metrics.accuracy >= 65 ? "var(--status-amber)" : "var(--status-red)");
    }

    // 2. Exam Readiness Index (ERI)
    const eriVal = document.getElementById("eri-score-val");
    const eriTier = document.getElementById("eri-status-tier");
    const eriCircle = document.getElementById("eri-gauge-circle");
    if (eriVal) eriVal.innerText = metrics.eri;
    if (eriCircle) eriCircle.setAttribute("stroke-dasharray", `${metrics.eri}, 100`);
    if (eriTier) {
      eriTier.innerText = metrics.eri >= 80 ? "Tier-1 Formidable" : (metrics.eri >= 65 ? "Competitive Form" : "Calibrating");
    }

    // 3. Neglect Alert Banner
    const negAlert = document.getElementById("dash-neglect-alert");
    if (negAlert) {
      if (neglect) {
        negAlert.style.display = "flex";
        document.getElementById("dash-neglect-text").innerText = neglect.isNever
          ? `${neglect.chapter} has NEVER been tested in completed mocks.`
          : `${neglect.chapter} untouched for ${neglect.days} days.`;
        document.getElementById("btn-neglect-drill").onclick = () => {
          launchDirectChapterDrill(neglect.subject, neglect.chapter);
        };
      } else {
        negAlert.style.display = "none";
      }
    }

    // 4. Saved Mocks Pills
    await renderDashboardBlueprints();
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
      const icon = bp.type === "FIXED_PAPER" ? "📌" : "⚡";
      pill.innerHTML = `<span>${icon} ${bp.title}</span><span style="opacity:0.6; font-size:9px;" onclick="event.stopPropagation(); CGL_OS.deleteSavedPreset('${bp.id}')">✕</span>`;
      pill.onclick = () => launchSavedPreset(bp.id);
      pillsContainer.appendChild(pill);
    });
  }

  async function launchSavedPreset(id) {
    const preset = await getRecord("store_saved_mocks", id);
    if (!preset) return;

    if (preset.type === "FIXED_PAPER" && Array.isArray(preset.questions)) {
      await MockService.launchMockSession(preset);
    } else {
      const instance = await MockService.generate(preset.selectionRule || {
        title: preset.title,
        count: 25,
        isSectionLocked: !!preset.isSectionLocked
      });
      await MockService.launchMockSession(instance);
    }
  }

  async function deleteSavedPreset(id) {
    if (confirm("Delete this saved mock setup? (Underlying questions remain intact)")) {
      await MockService.deleteMock(id);
      await renderDashboardBlueprints();
    }
  }

  /* ==========================================================================
   * SECTION 18: FLASHCARD VAULT & ANKI EXPORT ENGINE (EXPORT ONLY)
   * ========================================================================== */
  async function renderVault() {
    const flashcards = await getAllRecords("store_flashcards");
    const container = document.getElementById("flashcard-list-container");
    if (!container) return;
    container.innerHTML = "";

    document.getElementById("vault-count-total").innerText = flashcards.length;
    let diagramCount = 0, extraCount = 0;
    flashcards.forEach(f => {
      if (f.frontImageUrl || f.backImageUrl) diagramCount++;
      if (f.extra && f.extra.trim()) extraCount++;
    });
    document.getElementById("vault-count-diagrams").innerText = diagramCount;
    document.getElementById("vault-count-extra").innerText = extraCount;

    const filterSub = document.getElementById("vault-deck-filter-sub") ? document.getElementById("vault-deck-filter-sub").value : "ALL";

    const filtered = flashcards.filter(f => {
      if (filterSub !== "ALL" && f.subject !== filterSub) return false;
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
              <span class="badge" style="background:#151a24; color:var(--accent-cyan); font-size:10px;">${f.subject} • ${f.chapter}</span>
              <span class="anki-type-tag">${f.cardType || 'BASIC'}</span>
            </div>
            <div style="font-size:12.5px; font-weight:600; color:#fff; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">
              ${f.front.replace(/\$+/g, '').slice(0, 75)}...
            </div>
          </div>
          <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);">▼</span>
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

  async function generateAndDownloadAnkiTsv() {
    const sub = document.getElementById("anki-export-subject").value;
    const fieldMapping = document.getElementById("anki-export-fields").value;
    const deckName = document.getElementById("anki-export-deck-name").value.trim() || "SSC CGL 2026";
    const convertMath = document.getElementById("anki-convert-mathjax").checked;
    const includeImages = document.getElementById("anki-include-data-images").checked;

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

    const blob = new Blob([tsv], { type: "text/tab-separated-values;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Anki_${sub}_Export_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    document.getElementById("modal-anki-export").classList.remove("active");
  }

  /* ==========================================================================
   * SECTION 19: FULL SYSTEM BACKUP & DISASTER RECOVERY
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

      alert("Disaster recovery hydration completed successfully. All records preserved.");
      document.getElementById("modal-backup-restore").classList.remove("active");
      SearchService.invalidate();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await renderVault();
    } catch (err) {
      alert("Hydration Error: " + err.message);
    }
  }

  /* ==========================================================================
   * SECTION 20: TOUCH GESTURES, TAB ROUTING & SYSTEM INITIALIZATION
   * ========================================================================== */
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

    // ARENA SWIPING PRESERVED
    attachSwipeHandler("arena-body", () => document.getElementById("btn-q-save-next").click(), () => document.getElementById("btn-q-prev").click());

    // CRITICAL FIX: Knowledge Studio canvas swipe handler is intentionally NOT attached to prevent vertical reading interruptions!

    window.addEventListener("popstate", () => {
      if (navStack.length > 0) popNavLayer();
    });
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

    populateSelect("dojo-nav-subject", false);
    populateSelect("comp-studio-subject-select", false);
    populateSelect("concept-edit-subject", false);
    populateSelect("edit-q-subject", false);
    populateSelect("edit-fc-subject", false);
    populateSelect("vault-deck-filter-sub", true);
    populateSelect("anki-export-subject", true);
    populateSelect("scoped-export-subject", true);
  }

  function switchTab(tId, btn) {
    document.querySelectorAll(".view-container").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));

    const targetEl = document.getElementById(tId);
    if (targetEl) targetEl.classList.add("active");

    const targetNavBtn = btn || document.getElementById(`nav-btn-${tId}`);
    if (targetNavBtn) targetNavBtn.classList.add("active");

    if (tId === "tab-dashboard") renderDashboard();
    if (tId === "tab-dojo") updateDojoChapters();
    if (tId === "tab-vault") renderVault();
  }

  function hideMiniPlayer() {
    const el = document.getElementById("mini-player-dock");
    if (el) el.style.display = "none";
  }

  async function initializeApplication() {
    const shield = document.getElementById("pause-shield");
    if (shield) shield.style.setProperty("display", "none", "important");

    try {
      await getDB();
      await syncAllTaxonomyDropdowns();
      await renderDashboard();
      await renderVault();
      initGestureControllers();
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
   * SECTION 21: PUBLIC API EXPORT FOR DOM EVENT BINDINGS
   * ========================================================================== */
  return {
    switchTab,
    TaxonomyService,
    QuestionService,
    ConceptService,
    SearchService,
    MockService,
    PerformanceService,
    renderDashboard,
    renderVault,
    executeConsoleCommand,
    exportFullBackup,
    executeHydrationRestore,
    openCompendiumToSheet,
    navCompStudioSheet,
    openSynapseGraphModal,
    setSynapseLevel,
    launchDirectChapterDrill,
    launchDirectSheetDrill,
    generateAndDownloadAnkiTsv,
    openEditQuestionModal: (qData) => {
      // Manual Add vs Edit question GUI
      const isNew = !qData;
      document.getElementById("editor-title").innerText = isNew ? "Add New Question" : "Edit Question";
      document.getElementById("edit-q-id").value = isNew ? QuestionService.generateId("QA") : qData.id;
      document.getElementById("edit-q-subject").value = isNew ? "QA" : qData.subject;
      document.getElementById("edit-q-chapter").value = isNew ? "QA_PERCENTAGE" : qData.chapter;
      document.getElementById("edit-q-subtopic").value = isNew ? "" : (qData.subtopic || "");
      document.getElementById("edit-q-method").value = isNew ? "" : (qData.method || "");
      document.getElementById("edit-q-concept-ids").value = isNew ? "" : (Array.isArray(qData.conceptIds) ? qData.conceptIds.join(", ") : (qData.conceptId || ""));
      document.getElementById("edit-q-text").value = isNew ? "" : qData.questionText;
      document.getElementById("edit-q-img-url").value = isNew ? "" : (qData.imageUrl || "");
      document.getElementById("edit-opt-0").value = isNew ? "" : (qData.options[0] || "");
      document.getElementById("edit-opt-1").value = isNew ? "" : (qData.options[1] || "");
      document.getElementById("edit-opt-2").value = isNew ? "" : (qData.options[2] || "");
      document.getElementById("edit-opt-3").value = isNew ? "" : (qData.options[3] || "");
      document.getElementById("edit-q-correct").value = isNew ? "0" : qData.correctIndex;
      document.getElementById("edit-q-explanation").value = isNew ? "" : (qData.explanation || "");
      document.getElementById("btn-delete-q").style.display = isNew ? "none" : "block";

      pushHistoryState("modal-question-editor");
      document.getElementById("modal-question-editor").classList.add("active");
    },
    saveQuestionEditor: async () => {
      const qObj = {
        id: document.getElementById("edit-q-id").value.trim(),
        subject: document.getElementById("edit-q-subject").value,
        chapter: document.getElementById("edit-q-chapter").value.trim().toUpperCase(),
        subtopic: document.getElementById("edit-q-subtopic").value.trim(),
        method: document.getElementById("edit-q-method").value.trim(),
        conceptIds: document.getElementById("edit-q-concept-ids").value.split(",").map(s => s.trim()).filter(Boolean),
        questionText: document.getElementById("edit-q-text").value.trim(),
        imageUrl: currentQuestionImageBase64 || document.getElementById("edit-q-img-url").value.trim(),
        options: [
          document.getElementById("edit-opt-0").value.trim(),
          document.getElementById("edit-opt-1").value.trim(),
          document.getElementById("edit-opt-2").value.trim(),
          document.getElementById("edit-opt-3").value.trim()
        ],
        correctIndex: parseInt(document.getElementById("edit-q-correct").value, 10),
        explanation: document.getElementById("edit-q-explanation").value.trim()
      };

      const existing = await QuestionService.get(qObj.id);
      if (existing) {
        await QuestionService.update(qObj.id, qObj);
      } else {
        await QuestionService.create(qObj);
      }

      document.getElementById("modal-question-editor").classList.remove("active");
      alert(`Question ${qObj.id} saved successfully.`);
      await renderDashboard();
    },
    duplicateCurrentEditingQuestion: async () => {
      const id = document.getElementById("edit-q-id").value.trim();
      if (!id) return;
      const clone = await QuestionService.duplicate(id);
      document.getElementById("modal-question-editor").classList.remove("active");
      alert(`Cloned question as ${clone.id}.`);
      CGL_OS.openEditQuestionModal(clone);
    },
    deleteCurrentEditingQuestion: async () => {
      const id = document.getElementById("edit-q-id").value.trim();
      if (confirm(`Permanently delete question ${id}? (Attempts referencing this question remain preserved)`)) {
        await QuestionService.delete(id);
        document.getElementById("modal-question-editor").classList.remove("active");
        alert(`Question ${id} removed.`);
        await renderDashboard();
      }
    }
  };
})();

// Re-bind to global window anchor
window.CGL_OS = CGL_OS;
