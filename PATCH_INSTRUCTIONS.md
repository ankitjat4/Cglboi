# SSC CGL Codebase Surgical Patches

## Overview
This file documents the surgical replacement blocks needed to fix critical bugs in index.html without regenerating the entire file.

## Critical Bugs Addressed
1. **Neglect Calculation NaN / Epoch Trap** - `checkAndRenderNeglectIndex()` fails with invalid timestamps
2. **Modal Z-Index Hijack** - Frozen arena when drilling from modals
3. **Studio Chapter Reset** - Incorrect navigation to compendium sheets
4. **Crumbled Canvas Synapse Tree** - Unreadable overlapping node graph

## Patch Blocks

### BLOCK 1: Dynamic Subject / Taxonomy Modal (HTML)
**Location:** Before `<!-- ==================== 23. HARDENED PAUSE OVERLAY SHIELD ==================== -->`

Insert the modal-taxonomy-manager HTML block from the user's instructions.

### BLOCK 2: Fixed Neglect & ERI Calculator (JavaScript)
**Location:** Replace `calculateAndRenderERI()` and `checkAndRenderNeglectIndex()` functions

Key fixes:
- Detects `lastAttemptTime === 0` as "Never tested"
- Validates `att.questions` exists before filtering
- Calculates day differences only on valid timestamps
- Prevents NaN propagation in UI

### BLOCK 3: Universal Concept ↔ Question Router (JavaScript)
**Location:** Add `openCompendiumToSheet()` and update `jumpToConceptFromReview()`

Key fixes:
- Closes intercepting modals before opening views
- Sets subject/chapter directly without reset cascade
- Routes correctly from exam review → concept sheet
- Supports fallback navigation

### BLOCK 4: Drill Launcher Modal Unlock Fix (JavaScript)
**Location:** Update `launchDirectSheetDrill()`, `launchCurrentSheetQuestionsDrill()`, etc.

Key fix:
- All drill functions close modals first
- Removes z-index touch event blocking

### BLOCK 5: Expandable Synapse Knowledge Graph Engine (JavaScript)
**Location:** Replace `buildSynapseTopology()`, `handleSynapseNodeClick()`, `drawSynapseGraph()`

Key changes:
- Dynamic expandable/collapsible tree structure
- Starts with root node, branches on user interaction
- No overlapping nodes in fixed bounding box
- Tap nodes to expand/collapse levels

### BLOCK 6: Dynamic Taxonomy Management & Exports (JavaScript)
**Location:** Add new functions for taxonomy CRUD

Functions added:
- `openTaxonomyManagerModal()`
- `renderTaxonomyManagerList()`
- `addNewSubjectAction()`
- `promptAddChapterToSubject()`
- `deleteChapterFromSubject()`

## Implementation Strategy

1. **Open** index.html in your editor
2. **Locate** each section marker provided above
3. **Replace** the old code with new blocks
4. **Update** the `CGL_OS` return object to export new functions
5. **Test** each drill launcher and concept navigation path
6. **Verify** the Synapse graph expands correctly

## Testing Checklist
- [ ] Click neglected chapter → calculates days correctly (no NaN)
- [ ] Jump from review to concept → lands on correct sheet immediately
- [ ] Open drill from modal → arena loads without frozen buttons
- [ ] Synapse graph → nodes expand/collapse without overlap
- [ ] Add new subject → immediately available in dropdowns

## Notes
- All blocks use exact ES6/DOM syntax from existing codebase
- No external dependencies added
- All new functions integrate with existing `CGL_OS` namespace
- Auto-save and localStorage patterns maintained
