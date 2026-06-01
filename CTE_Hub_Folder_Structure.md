# CTE Curriculum Hub — Google Drive Folder Structure

**Last updated:** May 2026  
**Owner:** DJ | CCIU Division of Learning & Leadership Solutions

---

## Root Folder

```
📁 CCIU — CTE Curriculum Hub
```

---

## Top-Level Structure

```
📁 CCIU — CTE Curriculum Hub
  │
  ├── 📊 CTE Hub_Program Index        ← Google Sheet (source of truth for all program data)
  │
  ├── 📁 _Admin
  │     ├── 📄 CTE Hub_Naming Convention Reference
  │     ├── 📄 CTE Hub_Change Log
  │     └── 📄 CTE Hub_Atlas Migration Notes
  │
  ├── 📁 Construction Trades
  │     ├── 📄 Curriculum Map_Construction Trades
  │     ├── 📄 Scope & Sequence_Construction Trades
  │     ├── 📄 Pacing Guide_Construction Trades_Year A
  │     ├── 📄 Pacing Guide_Construction Trades_Year B
  │     └── 📁 Unit Plans
  │           ├── 📄 Unit Plan_Construction Trades_Unit 01_[Unit Title]
  │           ├── 📄 Unit Plan_Construction Trades_Unit 02_[Unit Title]
  │           └── ...
  │
  ├── 📁 Health Career Pathways
  │     ├── 📄 Curriculum Map_Health Career Pathways
  │     ├── 📄 Scope & Sequence_Health Career Pathways
  │     ├── 📄 Pacing Guide_Health Career Pathways_Pickering
  │     ├── 📄 Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 1
  │     ├── 📄 Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 2
  │     ├── 📄 Pacing Guide_Health Career Pathways_Pennocks Bridge_Course 3
  │     ├── 📄 Pacing Guide_Health Career Pathways_Brandywine_Course 1
  │     ├── 📄 Pacing Guide_Health Career Pathways_Brandywine_Course 2
  │     ├── 📄 Pacing Guide_Health Career Pathways_Brandywine_Course 3
  │     └── 📁 Unit Plans
  │           ├── 📄 Unit Plan_Health Career Pathways_Pickering_Unit 01_[Unit Title]
  │           ├── 📄 Unit Plan_Health Career Pathways_Pickering_Unit 02_[Unit Title]
  │           ├── 📄 Unit Plan_Health Career Pathways_Course 1_Unit 01_[Unit Title]
  │           └── ...
  │
  └── 📁 [Program Name]        ← add one folder per program as built
        ├── 📄 Curriculum Map_[Program Name]
        ├── 📄 Scope & Sequence_[Program Name]
        ├── 📄 Pacing Guide_[Program Name]
        └── 📁 Unit Plans
              └── 📄 Unit Plan_[Program Name]_Unit 01_[Unit Title]
```

---

## Folder Rules

| Rule | Detail |
|---|---|
| One folder per program | All documents for a program live in a single flat folder — no campus sub-folders |
| `_Admin` prefix | Sorts admin folder to the top in Drive's alphabetical view |
| No dates in folder names | Drive's version history handles versioning |
| No abbreviations | Spell out full program names in folder names |

---

## When to add a campus qualifier to a document

Use the flat, no-campus-folder structure. Add the campus name **inside the filename** only when:

- The document is **campus-specific** (e.g., a pacing guide built for Pickering's A/B/C model differs from the linear version at Pennocks Bridge and Brandywine)
- The document would otherwise be ambiguous without a campus identifier

**Do not** add a campus identifier to documents that are shared across all campuses (e.g., the Curriculum Map, Scope & Sequence, and shared unit plans).

---

## Document type → folder mapping

| Document type | Where it lives |
|---|---|
| Curriculum Map | Program folder (root level) |
| Scope & Sequence | Program folder (root level) |
| Pacing Guide | Program folder (root level) — add campus or year qualifier to filename if campus-specific |
| Unit Plans | `Unit Plans` subfolder within the program folder |
| Assessments | `Unit Plans` subfolder (attached to the relevant unit plan) or program folder root if standalone |
| SharePoint materials | Stays in SharePoint — link from the Google Sheet, do not copy |
| Schoology pages | Stays in Schoology — link from the Google Sheet, do not copy |

---

## Program folder checklist (before marking a program "In Progress")

- [ ] Program folder created in Drive with exact program name
- [ ] Curriculum Map file created (even if empty — placeholder is fine)
- [ ] Scope & Sequence file created
- [ ] Unit Plans subfolder created
- [ ] All file links entered into the corresponding row in `CTE Hub_Program Index` (`All Programs` tab)

---

## Notes on the two active programs

**Construction Trades** (CIP 46.9999)  
- A/B instructional model — two-year cycle mapped as one program  
- One pacing guide per year (Year A, Year B)  
- Unit plans shared across the A/B cycle unless a unit is year-specific

**Health Career Pathways** (CIP 51.0899)  
- Pickering: A/B/C instructional model  
- Pennocks Bridge + Brandywine: Linear model, three separate courses (Course 1, Course 2, Course 3)  
- Curriculum Map and Scope & Sequence are program-wide (no campus in filename)  
- Pacing guides and unit plans need campus qualifier in filename due to different delivery models
