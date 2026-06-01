# CTE Curriculum Hub — Naming Convention

**Last updated:** May 2026  
**Owner:** DJ | CCIU Division of Learning & Leadership Solutions

---

## Master Format

```
[Document Type]_[Program Name]_[Qualifier]
```

Qualifiers are optional. Use them only when a document is campus-specific, year-specific, or course-specific and would otherwise be ambiguous.

---

## Document Type Tokens

| Token | Used for |
|---|---|
| `Curriculum Map` | Full program curriculum map |
| `Unit Plan` | Individual unit plan document |
| `Scope & Sequence` | Program-level scope and sequence |
| `Pacing Guide` | Course-level or year-level pacing guide |
| `Assessment` | Summative or formative assessment tool |

---

## Qualifier Tokens

Use qualifiers in this order when more than one applies:

```
_[Campus]_[Year or Course]_[Unit Number]_[Unit Title]
```

| Qualifier | Format | When to use |
|---|---|---|
| Campus | `Pickering`, `Pennocks Bridge`, `Brandywine`, `Satellite` | When the document differs by campus |
| Year | `Year A`, `Year B`, `Year C` | For A/B or A/B/C instructional models |
| Course | `Course 1`, `Course 2`, `Course 3` | For linear models split into separate courses |
| Unit number | `Unit 01`, `Unit 02` ... | Always zero-padded two digits |
| Unit title | Sentence case | Title of that specific unit |

---

## Formatting Rules

| Rule | Correct | Incorrect |
|---|---|---|
| Separator | `_` (underscore) | `-`, `/`, ` — ` |
| Unit numbers | Zero-padded two digits: `Unit 01` | `Unit 1`, `U01` |
| Program names | Spelled out in full, title case | Abbreviations |
| Unit titles | Sentence case | Title Case, ALL CAPS |
| Dates in names | Never | `Pacing Guide 2024`, `v2` |
| Campus names | Spelled out in full | `PB`, `BW`, `Pick` |

---

## Examples

### Documents shared across all campuses (no campus qualifier needed)

```
Curriculum Map_Construction Trades
Scope & Sequence_Health Career Pathways
```

### A/B instructional model (Construction Trades)

```
Pacing Guide_Construction Trades_Year A
Pacing Guide_Construction Trades_Year B
Unit Plan_Construction Trades_Unit 01_Foundations of Construction Safety
Unit Plan_Construction Trades_Unit 02_Hand Tools and Measuring
```

### A/B/C instructional model, campus-specific (Health Career Pathways — Pickering)

```
Pacing Guide_Health Career Pathways_Pickering
Unit Plan_Health Career Pathways_Pickering_Unit 01_Introduction to Health Careers
Unit Plan_Health Career Pathways_Pickering_Unit 02_Medical Terminology
```

### Linear model, three-course split (Health Career Pathways — Pennocks Bridge / Brandywine)

```
Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 1
Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 2
Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 3
Unit Plan_Health Career Pathways_Course 1_Unit 01_Introduction to Health Careers
Unit Plan_Health Career Pathways_Course 1_Unit 02_Medical Terminology
Unit Plan_Health Career Pathways_Course 2_Unit 01_[Unit Title]
```

> If Pennocks Bridge and Brandywine use identical linear unit plans, drop the campus from the unit plan name. Add campus only if the two sites diverge.

### Generic program (single campus, standard model)

```
Curriculum Map_Culinary Arts
Scope & Sequence_Culinary Arts
Pacing Guide_Culinary Arts
Unit Plan_Culinary Arts_Unit 01_Kitchen Safety and Sanitation
Unit Plan_Culinary Arts_Unit 02_Knife Skills and Kitchen Tools
Unit Plan_Culinary Arts_Unit 03_Stocks, Sauces, and Soups
```

---

## Quick Reference Card

```
┌──────────────────────────────────────────────────────────────┐
│  [Doc Type]_[Program Name]_[Campus]_[Year/Course]            │
│            _Unit [##]_[Unit title in sentence case]          │
│                                                              │
│  Separator:     underscore  ( _ )                            │
│  Unit numbers:  always two digits    (01, 02 … 12)           │
│  No dates       No abbreviations     No version numbers      │
└──────────────────────────────────────────────────────────────┘
```

---

## When to add a campus qualifier

Add campus to the filename **only** when the document is campus-specific — meaning the content differs between campuses. If the same document applies to all campuses, leave campus out of the name.

| Document | Campus in name? | Why |
|---|---|---|
| `Curriculum Map_Health Career Pathways` | No | Same across all campuses |
| `Scope & Sequence_Health Career Pathways` | No | Same across all campuses |
| `Pacing Guide_Health Career Pathways_Pickering` | Yes | A/B/C at Pickering vs. linear elsewhere |
| `Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 1` | Yes | Linear model differs from Pickering |
| `Unit Plan_Health Career Pathways_Pickering_Unit 01` | Yes | Pickering units map to A/B/C cycle |
| `Unit Plan_Health Career Pathways_Course 1_Unit 01` | No campus needed | Applies to all linear-model campuses equally |
