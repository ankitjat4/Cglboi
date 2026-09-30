# Critical Issues & Fixes - SSC CGL OS

## Status: ✅ PARTIALLY FIXED (MathJax conversion) + IDENTIFIED (Rendering & Edge Cases)

---

## 🔴 ISSUE #1: Square Root Visibility - NOT RENDERING IN QUESTIONS [CRITICAL]

### Problem
Square roots using `\sqrt` notation fail to render visibly in:
- Question text in exam arena
- Flashcards in vault
- Dojo practice mode
- Compendium sheets

### Root Cause
The `sanitizeRadicals()` function in `formatRichText()` handles square root rendering, BUT:
1. **Fallback chain incomplete**: If KaTeX fails, the function returns raw LaTeX markup instead of HTML
2. **Missing CSS styling**: Custom sqrt HTML spans need proper styling to be visible
3. **Inline-block stacking issues**: Border-top on inline-block may not render if parent has no explicit height

### Current Implementation Issue
```javascript
// formatRichText() around line 425-450
if (f.includes("\\sqrt")) {
  return sanitizeRadicals(f.replace(/\\sqrt\{([^}]+)\}/g, '§SQRT§$1§ENDSQRT§'))
    .replace(/§SQRT§(.*?)§ENDSQRT§/g, (match, inner) => {
      // Returns inline HTML but CSS may not be applied correctly
      return `<span style="...">√<span style="border-top:1.5px solid currentColor;...">...</span></span>`;
    });
}
```

### Solution
**File: `style.css` (Add after line 1148)**

```css
/* === SQRT RENDERING FIX === */
.math-sqrt-wrap {
  display: inline-flex;
  align-items: flex-start;
  gap: 2px;
  vertical-align: middle;
  font-size: inherit;
}

.math-sqrt-sign {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}

.math-sqrt-content {
  border-top: 1.5px solid currentColor;
  padding-top: 3px;
  display: inline-block;
  min-width: 20px;
  line-height: 1.2;
  font-family: serif, sans-serif;
}

/* Additional KaTeX override fixes */
.katex .sqrt-sign { 
  display: inline-block !important; 
  font-family: serif !important;
  overflow: visible !important;
}

.katex .mord.sqrt {
  display: inline-block !important;
  vertical-align: middle !important;
}
```

**File: `app.js` (Modify `formatRichText()` around line 438-450)**

```javascript
function formatRichText(str) {
  if (!str) return "";
  let out = String(str);

  // ... existing code ...

  // MATH RENDERING BLOCK - ENHANCED
  if (typeof katex !== 'undefined' && katex) {
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => {
      try {
        return katex.renderToString(f, { displayMode: true, throwOnError: false });
      } catch (e) {
        return sanitizeRadicals(f);
      }
    });

    out = out.replace(/\$([^\$\n]+?)\$/g, (m, f) => {
      // IMPROVED SQRT HANDLING
      if (f.includes("\\sqrt")) {
        try {
          // Step 1: Mark sqrt sections with placeholders
          let marked = f.replace(/\\sqrt\{([^}]+)\}/g, '§SQRT§$1§ENDSQRT§');
          let sanitized = sanitizeRadicals(marked);
          
          // Step 2: Replace placeholders with proper HTML
          return sanitized.replace(/§SQRT§(.*?)§ENDSQRT§/g, (match, inner) => {
            let renderedInner = inner;
            try {
              renderedInner = katex.renderToString(inner, { 
                displayMode: false, 
                throwOnError: false 
              });
            } catch(err) {
              renderedInner = inner; // Fallback to raw inner content
            }
            // Use wrapper class for CSS styling
            return `<span class="math-sqrt-wrap">` +
                   `<span class="math-sqrt-sign">√</span>` +
                   `<span class="math-sqrt-content">${renderedInner}</span>` +
                   `</span>`;
          });
        } catch(e) {
          console.error("SQRT rendering failed:", e);
          return sanitizeRadicals(f);
        }
      }

      try {
        return katex.renderToString(f, { displayMode: false, throwOnError: false });
      } catch (e) {
        console.warn("KaTeX fallback for:", f, e);
        return sanitizeRadicals(f);
      }
    });
  } else {
    // KaTeX offline fallback
    out = out.replace(/\$([^\$\n]+?)\$/g, (m, f) => sanitizeRadicals(f));
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => sanitizeRadicals(f));
  }

  return out;
}
```

---

## 🔴 ISSUE #2: `convertKatexToAnkiMathJax()` Backslash Escaping [FIXED ✅]

### Status: RESOLVED
The function now correctly outputs `\(...\)` and `\[...\]` for Anki/MathJax.

```javascript
// ✅ CORRECT (Current state)
function convertKatexToAnkiMathJax(str) {
  if (!str) return "";
  let out = String(str);
  out = out.replace(/\$\$([\s\S]*?)\$\$/g, "\\[$1\\]");
  out = out.replace(/\$([^\$\n]+?)\$/g, "\\($1\\)");
  return out;
}
```

---

## 🟡 ISSUE #3: `formatRichText()` Missing Try-Catch Wrappers [HIGH RISK]

### Problem
Several regex replacements can throw errors:
1. **Callout blocks** - malformed markdown
2. **Header parsing** - special characters in titles
3. **Code blocks** - triple backticks with embedded symbols
4. **Table parsing** - inconsistent column counts

### Risk
If ANY regex replacement throws, the entire `formatRichText()` function crashes, breaking question display.

### Solution
**File: `app.js` (Wrap the main regex chain)**

```javascript
function formatRichText(str) {
  if (!str) return "";
  let out = String(str);

  try {
    // Callout Blocks
    out = out.replace(/^>\s*\[!trap\]\s*(.*)$/gm, '<div class="callout-box trap"><b>⚠️ Trapping Point:</b> $1</div>');
    out = out.replace(/^>\s*\[!formula\]\s*(.*)$/gm, '<div class="callout-box formula"><b>⚡ Formula:</b> $1</div>');
    out = out.replace(/^>\s*\[!tip\]\s*(.*)$/gm, '<div class="callout-box"><b>💡 Tip:</b> $1</div>');
  } catch(e) { console.warn("Callout block parsing failed:", e); }

  try {
    // Headers & Bold
    out = out.replace(/^### (.*$)/gim, '<h3 style="font-size:15px; font-weight:700; color:var(--accent-cyan); margin:10px 0 4px 0;">$1</h3>');
    out = out.replace(/^## (.*$)/gim, '<h2 style="font-size:17px; font-weight:800; color:#fff; margin:12px 0 6px 0;">$1</h2>');
    out = out.replace(/^# (.*$)/gim, '<h1 style="font-size:19px; font-weight:800; color:#fff; margin:14px 0 8px 0;">$1</h1>');
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  } catch(e) { console.warn("Header parsing failed:", e); }

  try {
    // Math rendering (existing code with enhanced error handling)
    if (typeof katex !== 'undefined' && katex) {
      out = out.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => {
        try {
          return katex.renderToString(f, { displayMode: true, throwOnError: false });
        } catch (e) {
          return sanitizeRadicals(f);
        }
      });
      // ... rest of math block ...
    }
  } catch(e) { console.warn("Math rendering failed:", e); }

  return out;
}
```

---

## 🟡 ISSUE #4: `sanitizeRadicals()` Scope & Chain Breaks [MEDIUM RISK]

### Problem
`sanitizeRadicals()` is defined inside `formatRichText()` as a nested function:

```javascript
function formatRichText(str) {
  const sanitizeRadicals = (str) => {
    // ... implementation ...
  };
  // Used here ✓
  // But if called recursively or from outside, scope is lost
}
```

**Issue**: If math rendering calls `sanitizeRadicals()` at the wrong scope level, it becomes `undefined`.

### Solution
Move `sanitizeRadicals()` to global scope:

**File: `app.js` (Add before `formatRichText()`, around line 420)**

```javascript
// ============ GLOBAL RADICAL SANITIZER ============
// Handles edge cases for square roots and special math symbols
const sanitizeRadicals = (str) => {
  if (!str) return "";
  try {
    // Remove problematic entities that break SVG rendering
    let sanitized = String(str)
      .replace(/&nbsp;/g, " ")
      .replace(/&mdash;/g, "—")
      .replace(/&amp;/g, "&");
    
    // Escape dangerous HTML characters ONLY in non-math context
    return sanitized
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  } catch(e) {
    return str;
  }
};

// Now call it from formatRichText() without scope issues
function formatRichText(str) {
  if (!str) return "";
  let out = String(str);
  // ... rest of function ...
}
```

---

## 🟡 ISSUE #5: Missing Input Validation in Question Rendering [MEDIUM RISK]

### Problem
`renderActiveExamQuestion()` and `renderDojoArenaQuestion()` don't validate:
1. Question object structure (missing `text`, `options`, etc.)
2. HTML injection via formatted math
3. Deeply nested concept references

### Solution
**File: `app.js` (Add validation before rendering)**

```javascript
function renderActiveExamQuestion() {
  if (!activeExam || !activeExam.questions) return;
  
  const q = activeExam.questions[activeExam.currentQuestionIndex];
  if (!q) {
    console.error("Question not found at index:", activeExam.currentQuestionIndex);
    return;
  }

  // VALIDATION BLOCK
  if (typeof q !== 'object' || !q.text) {
    console.error("Invalid question structure:", q);
    document.getElementById("arena-question-text").textContent = "⚠️ Question data corrupted";
    return;
  }

  try {
    // Safe rendering with error boundary
    let formattedText = formatRichText(q.text) || "";
    document.getElementById("arena-question-text").innerHTML = formattedText;
    
    // Render options safely
    const optContainer = document.getElementById("arena-options");
    optContainer.innerHTML = "";
    
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        if (opt && opt.text) {
          const optDiv = document.createElement("div");
          optDiv.className = "opt-card";
          optDiv.innerHTML = formatRichText(opt.text);
          optContainer.appendChild(optDiv);
        }
      });
    }
  } catch(e) {
    console.error("Question rendering crashed:", e);
    document.getElementById("arena-question-text").innerHTML = 
      "<div style='color:red; padding:10px;'>Error rendering question. Check console.</div>";
  }
}
```

---

## 🟡 ISSUE #6: CSS `overflow: visible !important` on SVG [MEDIUM RISK]

### Problem
In `style.css` (line ~1140):
```css
.katex .sqrt-sign {
  overflow: visible !important;
  font-family: serif, sans-serif !important;
}
```

**Issue**: `overflow:visible` on SVG elements can cause rendering clipping if parent has `overflow:hidden`.

### Solution
**File: `style.css` (Replace KaTeX sqrt fix at line 1140)**

```css
/* Fix KaTeX square root surd rendering in Android WebView */
.katex .sqrt {
  display: inline-block !important;
  overflow: visible !important;
  position: relative; /* Ensure proper stacking */
}

.katex .sqrt .sqrt-sign {
  overflow: visible !important;
  font-family: serif, sans-serif !important;
  display: inline-block !important;
}

.katex .sqrt > .root-box {
  border-top: 1.5px solid currentColor !important;
  padding-top: 2px !important;
  display: inline-block !important;
  min-height: 0.8em !important; /* Prevent collapse */
  vertical-align: text-bottom !important;
}

/* Prevent parent containers from clipping */
.q-text-canvas, .opt-card, .q-passage-container {
  overflow: visible !important;
}
```

---

## 🔧 TESTING CHECKLIST

After applying fixes, test:

- [ ] Display mode math: `$$\sqrt{16} = 4$$`
- [ ] Inline math: `The square root is $\sqrt{2}$ approximately`
- [ ] Complex nested: `$\sqrt{\frac{a}{b}}$`
- [ ] In questions: Questions with `\sqrt` notation render visibly
- [ ] In flashcards: Vault cards show square roots
- [ ] In Anki export: Math converts to `\(...\)` format correctly
- [ ] Error handling: Malformed LaTeX doesn't crash app
- [ ] Offline mode: KaTeX CDN fails, fallback works
- [ ] Print mode: `print-sheet-root` renders correctly

---

## 📋 DEPLOYMENT ORDER

1. **Step 1**: Apply CSS fixes (style.css) - low risk
2. **Step 2**: Add global `sanitizeRadicals()` - zero risk
3. **Step 3**: Update `formatRichText()` with try-catch wrappers
4. **Step 4**: Update `renderActiveExamQuestion()` with validation
5. **Step 5**: Test thoroughly before deploying

---

## ⚠️ KNOWN EDGE CASES NOT YET FIXED

| Issue | Impact | Workaround |
|-------|--------|-----------|
| Unicode radicals in non-Latin scripts | Low | Use ASCII `\sqrt{}` |
| Fractional exponents `x^{1/2}` | Medium | Render as `\sqrt{x}` |
| Nested radicals `\sqrt{\sqrt{x}}` | Medium | Split into separate lines |
| MathML mode (not KaTeX) | Low | Not currently supported |

