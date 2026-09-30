  // Translates KaTeX delimiters ($...$) to Anki-Native MathJax (\(...\) and \[...\])
  function convertKatexToAnkiMathJax(str) {
    if (!str) return "";
    let out = String(str);
    out = out.replace(/\$\$([\s\S]*?)\$\$/g, "\\[$1\\]");
    out = out.replace(/\$([^\$\n]+?)\$/g, "\\($1\\)");
    return out;
  }
