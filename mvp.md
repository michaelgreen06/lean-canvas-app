# Lean Canvas Generator - MVP Plan

## Overview

Single HTML file application that walks user through 12 Lean Canvas fields in Typeform-style wizard, then displays completed canvas grid with export options.

**Design Philosophy:** Structure for AI agent integration from day one. Same data format whether filled manually or by AI.

---

## The 12 Lean Canvas Fields

Each field has: `id`, `title`, `briefInstruction`, `detailedInstruction`, `placeholder`

### 1. Problem
- **Brief:** List your customer's top 3 problems
- **Detailed:** What are the most painful problems your customers face? Focus on problems worth solving - ones customers actively try to solve today. Include existing alternatives they currently use.
- **Placeholder:** "1. Problem one\n2. Problem two\n3. Problem three"

### 2. Existing Alternatives
- **Brief:** How are these problems solved today?
- **Detailed:** List the current solutions customers use (competitors, workarounds, manual processes, or "do nothing"). Understanding alternatives reveals what you're really competing against.
- **Placeholder:** "Current solutions customers use..."

### 3. Solution
- **Brief:** Outline possible solution for each problem
- **Detailed:** What is the simplest thing you could build to address each problem? Keep it minimal - you want to test assumptions, not build a complete product. One solution per problem.
- **Placeholder:** "Solution for problem 1:\nSolution for problem 2:\nSolution for problem 3:"

### 4. Key Metrics
- **Brief:** List key numbers that tell you how your business is doing
- **Detailed:** What activities drive your business? Focus on actionable metrics (not vanity metrics). Examples: activation rate, revenue per user, retention rate, referral rate. Pick 3-5 that matter most.
- **Placeholder:** "1. Metric one\n2. Metric two\n3. Metric three"

### 5. Unique Value Proposition
- **Brief:** Single, clear, compelling message that turns visitors into prospects
- **Detailed:** Why are you different and worth paying attention to? Complete this: "We help [customer segment] [solve problem] by [unique approach]." Be specific, not generic.
- **Placeholder:** "We help X do Y by Z..."

### 6. High-Level Concept
- **Brief:** Your X for Y analogy
- **Detailed:** An analogy that quickly explains your concept. Format: "[Known thing] for [your market]". Examples: "YouTube for education" or "Uber for dog walking". Makes the unfamiliar familiar.
- **Placeholder:** "X for Y"

### 7. Unfair Advantage
- **Brief:** Something that cannot be easily copied or bought
- **Detailed:** What do you have that competitors cannot easily replicate? Examples: insider information, personal authority, existing community, team expertise, network effects. If you don't have one yet, leave blank - it often develops over time.
- **Placeholder:** "Our advantage is..."

### 8. Channels
- **Brief:** List your path to customers
- **Detailed:** How will you reach your customer segments? Include both inbound (SEO, content, referrals) and outbound (ads, sales, partnerships). Focus on channels appropriate for your stage - free/low-cost early, paid later.
- **Placeholder:** "1. Channel one\n2. Channel two\n3. Channel three"

### 9. Customer Segments
- **Brief:** List your target customers and users
- **Detailed:** Who are you creating value for? Be specific (not "everyone"). Include demographics, behaviors, and needs. If you have different user types (e.g., buyers vs users), list both. Start narrow - you can expand later.
- **Placeholder:** "Primary segment:\nSecondary segment:"

### 10. Early Adopters
- **Brief:** List characteristics of your ideal early customers
- **Detailed:** Who will be your first customers? Early adopters have the problem acutely, know they have it, have budget to solve it, and are already seeking solutions. They're more forgiving and provide crucial feedback.
- **Placeholder:** "Characteristics:\n- \n- \n- "

### 11. Cost Structure
- **Brief:** List your fixed and variable costs
- **Detailed:** What are the major costs to operate your business? Include: customer acquisition costs, hosting/infrastructure, salaries, tools/services. Categorize as fixed (rent, salaries) vs variable (per-transaction costs).
- **Placeholder:** "Fixed costs:\n- \nVariable costs:\n- "

### 12. Revenue Streams
- **Brief:** List your sources of revenue
- **Detailed:** How will you make money? Include pricing model (subscription, one-time, freemium, transaction fee), price points, and revenue per customer. Multiple streams are fine, but identify primary one.
- **Placeholder:** "Primary revenue:\nSecondary revenue:\nPricing model:"

---

## Technical Architecture

### Data Structure (JSON)
```json
{
  "id": "uuid",
  "title": "Canvas Title",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp",
  "source": "manual | ai-assisted",
  "ideaInput": "original idea if AI-generated",
  "fields": {
    "problem": { "value": "", "notes": "" },
    "existingAlternatives": { "value": "", "notes": "" },
    "solution": { "value": "", "notes": "" },
    "keyMetrics": { "value": "", "notes": "" },
    "uniqueValueProposition": { "value": "", "notes": "" },
    "highLevelConcept": { "value": "", "notes": "" },
    "unfairAdvantage": { "value": "", "notes": "" },
    "channels": { "value": "", "notes": "" },
    "customerSegments": { "value": "", "notes": "" },
    "earlyAdopters": { "value": "", "notes": "" },
    "costStructure": { "value": "", "notes": "" },
    "revenueStreams": { "value": "", "notes": "" }
  }
}
```

### File Structure (Phase 1)
```
lean-canvas-app/
├── mvp.md          # This plan
├── index.html      # Single file app (HTML + CSS + JS)
└── canvases/       # Exported markdown files (optional)
```

---

## Phase 1 Features (MVP)

### Wizard Mode
- [ ] Show one field at a time (Typeform-style)
- [ ] Brief instruction visible by default
- [ ] Expandable dropdown for detailed instruction
- [ ] Textarea for user input
- [ ] "Next" button to advance
- [ ] "Back" button to go previous
- [ ] Progress indicator (e.g., "3 of 12")
- [ ] Ability to jump to specific field

### Canvas View
- [ ] Grid layout matching standard Lean Canvas format
- [ ] All 12 sections visible simultaneously
- [ ] Responsive design (works on different screens)
- [ ] Click any section to edit inline

### Export Options
- [ ] Export as Markdown file (.md download)
- [ ] Print to PDF (browser print dialog)
- [ ] Copy to clipboard as Markdown

### Data Persistence
- [ ] Save to localStorage (auto-save as user types)
- [ ] Option to start new canvas
- [ ] Basic canvas title/naming

---

## Implementation Steps

### Step 1: HTML Structure
- Create single index.html file
- Define wizard container and canvas container
- Set up field definitions array with all 12 fields

### Step 2: CSS Styling
- Wizard view styles (centered card, clean typography)
- Dropdown/accordion for detailed instructions
- Canvas grid layout (CSS Grid for 12 sections)
- Responsive breakpoints
- Print styles for PDF export

### Step 3: JavaScript - Core Logic
- Field navigation (next/back/jump)
- State management (current field, all values)
- localStorage save/load
- View switching (wizard vs canvas)

### Step 4: JavaScript - Export Functions
- Generate Markdown from state
- Trigger file download
- Copy to clipboard function
- Print function

### Step 5: Polish & Testing
- Keyboard navigation (Enter for next)
- Validation (warn on empty fields but allow skip)
- Mobile responsiveness
- Test all exports work

---

## Phase 2 Preview (AI Agent Integration)

When ready, we add:
```javascript
async function generateWithAI(ideaDescription) {
  const response = await fetch('claude-api-endpoint', {
    method: 'POST',
    body: JSON.stringify({
      idea: ideaDescription,
      fieldInstructions: FIELD_DEFINITIONS
    })
  });
  const generatedCanvas = await response.json();
  loadCanvas(generatedCanvas); // Same format as manual
}
```

The key insight: AI returns exact same JSON structure as manual entry. UI doesn't care about source.

---

## Canvas Grid Layout Reference

Based on standard Lean Canvas format:

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│  PROBLEM    │  SOLUTION   │  UNIQUE     │  UNFAIR     │  CUSTOMER   │
│             │             │  VALUE PROP │  ADVANTAGE  │  SEGMENTS   │
│             │             │             │             │             │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│  EXISTING   │  KEY        │  HIGH-LEVEL │  CHANNELS   │  EARLY      │
│  ALTS       │  METRICS    │  CONCEPT    │             │  ADOPTERS   │
│             │             │             │             │             │
├─────────────┴─────────────┴─────────────┴─────────────┴─────────────┤
│        COST STRUCTURE          │         REVENUE STREAMS            │
│                                │                                    │
└────────────────────────────────┴────────────────────────────────────┘
```

---

## Success Criteria

MVP is complete when:
1. User can fill all 12 fields via wizard
2. Completed canvas displays in grid format
3. Can export to Markdown file
4. Can print to PDF
5. Data structure supports future AI integration
