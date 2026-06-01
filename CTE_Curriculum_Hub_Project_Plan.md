# CTE Curriculum Hub — Project Plan
**Owner:** DJ | Chester County Intermediate Unit (CCIU), Division of Learning & Leadership Solutions  
**Collaborator:** Josh  
**Last updated:** May 2026  
**Status:** Phase 0 — Planning complete, ready to build

---

## 1. Project Overview

Build a polished, institutionally owned curriculum document hub for CCIU's CTE programs. The hub serves as a single landing page — organized by Career Cluster and program — that surfaces what curriculum documents exist for each program and links out to wherever those materials actually live (Google Drive, SharePoint, Schoology).

**Starting scope:** 2 active programs  
**Full scope:** 22+ CTE programs across 3 schools  
**Primary audiences:** CCIU CTE staff (backend editors), Assistant Principals at 3 schools (viewers/navigators)  
**Future migration target:** Atlas curriculum mapping platform (Faria/Rubicon)

---

## 2. Goals

- Give APs and CTE leaders a single place to see what curriculum documents exist for each program
- Provide direct links to documents regardless of where they live (Google, SharePoint, Schoology)
- Build a backend that is visually polished and functional for internal editors
- Structure all data fields to be Atlas-compatible from day one
- Establish a naming convention and folder structure that scales to 22+ programs
- Set up institutional ownership so the project survives staff transitions

---

## 3. Platform Architecture

### Document storage
| Content type | Platform | Rationale |
|---|---|---|
| Curriculum maps | Google Drive (personal, transfer later) | Collaborative editing, cross-org sharing |
| Unit plans | Google Drive | Same as above |
| Scope & sequence | Google Drive | Same as above |
| Instructional materials | SharePoint (stay as-is) | Already housed there, no benefit to moving |
| Schoology course pages | Schoology (stay as-is) | Live in LMS by design |

### Hub landing page
| Layer | Platform | Purpose |
|---|---|---|
| Backend / source of truth | Google Sheets | Database, filtering, Atlas-ready field structure |
| Frontend / AP-facing (Phase 2) | Google Sites | Visual program cards, navigation by cluster/school |

### Ownership
- **Current:** Built in personal Google account (DJ)
- **Transfer plan:** One-time bulk ownership transfer to CTE Director or designated institutional account when identified
- **Long-term target:** CCIU Google Workspace Shared Drive (pending IT enabling Shared Drive creation for Education accounts)
- **Transfer method:** Google Apps Script batch ownership transfer — do not transfer file by file manually

---

## 4. Folder Structure (Google Drive)

```
📁 CCIU — CTE Curriculum Hub
  📁 _Admin
      📄 Naming Convention Reference
      📄 Change Log
      📄 Atlas Migration Notes
  📁 Architecture & Construction Technology
      📁 [Program Name]
          📄 Curriculum Map — [Program Name]
          📁 Unit Plans
              📄 Unit Plan — [Program Name] — Unit 01 — [Unit Title]
              📄 Unit Plan — [Program Name] — Unit 02 — [Unit Title]
  📁 Business, Management & Finance
      📁 [Program Name]
          ...
  📁 Health Science
      📁 [Program Name]
          ...
  📁 Hospitality & Tourism
      📁 [Program Name]
          ...
  📁 Information Technology
      📁 [Program Name]
          ...
  📁 Transportation, Distribution & Logistics
      📁 [Program Name]
          ...
  [... additional clusters as programs are added]
```

**Folder naming rules:**
- Top-level folders = National Career Cluster names (exact, no abbreviations)
- Program folders = Program name only, no codes or dates
- Document folders = functional type only (`Unit Plans`, `Assessments`, `Resources`)

---

## 5. Naming Convention

### Master format
```
[Document Type] — [Program Name] — [Qualifier]
```

### Document type tokens
| Token | Used for |
|---|---|
| `Curriculum Map` | The full program curriculum map |
| `Unit Plan` | Individual unit plan documents |
| `Scope & Sequence` | Program-level scope and sequence |
| `Pacing Guide` | Course-level pacing guide |
| `Assessment` | Summative or formative assessment tools |

### Examples
```
Curriculum Map — Culinary Arts
Unit Plan — Culinary Arts — Unit 01 — Foundations of Food Safety
Unit Plan — Culinary Arts — Unit 02 — Knife Skills & Kitchen Tools
Scope & Sequence — Health Science Technology
Pacing Guide — Health Science Technology — Year 1
```

### Rules
- Use em dashes (` — `) as separators, not hyphens or slashes
- Unit numbers are always zero-padded two digits (`Unit 01`, not `Unit 1`)
- No dates in file names — version control is handled by Google's native version history
- No abbreviations in file names (spell out program names in full)
- Title case for program names, sentence case for unit titles

---

## 6. Google Sheet Architecture

### Tab structure
| Tab | Purpose |
|---|---|
| `Dashboard` | Summary stats, frozen header, visual entry point |
| `All Programs` | Full program index — the core data table |
| `By Cluster` | Filtered/grouped view by Career Cluster |
| `By School` | Filtered/grouped view by school assignment |
| `Settings` | Dropdown source lists, color key, admin notes |

### Column schema — `All Programs` tab

| Column | Field name | Data type | Atlas field mapping | Notes |
|---|---|---|---|---|
| A | Program Name | Text | Course Name | Full name, no abbreviations |
| B | Career Cluster | Dropdown | Career Cluster | Use National Career Cluster names |
| C | School(s) | Dropdown (multi) | Site/School | Comma-separated if multiple |
| D | Grade Band | Dropdown | Grade Level | 9–10, 11–12, 9–12 |
| E | Course Sequence | Number | Course Sequence | 1, 2, 3 (courses within program) |
| F | Industry Credential | Text | Credential Alignment | Cert name or "None" |
| G | Status | Dropdown | — | Draft / In Progress / Complete |
| H | Curriculum Map | Hyperlink | — | Links to Google Drive file |
| I | Unit Plans Folder | Hyperlink | — | Links to Google Drive folder |
| J | Scope & Sequence | Hyperlink | — | Links to Google Drive file |
| K | Schoology Page | Hyperlink | — | Links to Schoology course |
| L | SharePoint Docs | Hyperlink | — | Links to SharePoint folder |
| M | Primary Contact | Text | — | Teacher or program lead name |
| N | Last Updated | Date | — | Manual entry, MM/YYYY |
| O | Atlas Ready | Checkbox | — | Check when unit plans meet Atlas field spec |
| P | Notes | Text | — | Free text for flags or context |

### Atlas-ready field definition
A program row is considered "Atlas Ready" (column O checked) when:
- Curriculum Map exists and contains: standards alignment, essential questions, content/vocabulary per unit, assessment types
- Unit Plans exist for all units and each contains: unit title, duration, targeted standards (industry + career readiness), summative assessment description
- Career Cluster and Grade Band are populated and match Atlas taxonomy

### Formatting spec (for Apps Script)
- Header row: frozen, `#185FA5` fill, white text, 11px bold
- Alternating row fill: white / `#F8F9FA`
- Status dropdown colors: Complete = `#EAF3DE` / `#3B6D11`, In Progress = `#FAEEDA` / `#854F0B`, Draft = `#F1EFE8` / `#5F5E5A`
- Hyperlink columns (H–L): center-aligned, link icon indicator
- Column widths: A=200, B=160, C=120, D=90, E=90, F=160, G=100, H–L=90, M=150, N=90, O=80, P=200
- Gridlines: hidden (simulate clean table look)
- Protected ranges: header row + Settings tab locked to editors only

---

## 7. Link / Platform Matrix

For each program, the Sheet will surface links to documents across platforms. This table defines where each document type lives:

| Document type | Lives in | Link format |
|---|---|---|
| Curriculum Map | Google Drive | Direct file link |
| Unit Plans | Google Drive | Folder link |
| Scope & Sequence | Google Drive | Direct file link |
| Schoology Course Page | Schoology | Course URL |
| Instructional Materials | SharePoint | Folder URL |
| Industry Standards Reference | External (PDE / industry body) | External URL |

---

## 8. Phase Plan

### Phase 0 — Foundation (current)
- [x] Determine platform architecture (Google Sheets + optional Sites layer)
- [x] Define naming convention
- [x] Define folder structure
- [x] Define Atlas-ready field spec
- [x] Define column schema
- [ ] Create root folder in Google Drive: `CCIU — CTE Curriculum Hub`
- [ ] Create `_Admin` folder with Naming Convention Reference doc
- [ ] Confirm ownership transfer plan with CTE lead

### Phase 1 — Build the Sheet
- [ ] Generate Google Sheet via Apps Script with full tab structure
- [ ] Apply all formatting (frozen header, color coding, dropdowns, protected ranges)
- [ ] Populate Settings tab with dropdown source lists (Career Clusters, schools, grade bands, status options)
- [ ] Seed `All Programs` tab with the 2 active programs
- [ ] Add placeholder rows for all 22 known programs (status: Draft)
- [ ] Test all hyperlink columns with live links from the 2 active programs
- [ ] Review with Josh and CTE lead — adjust schema if needed

### Phase 2 — Populate active programs
- [ ] Complete all fields for Program 1 (confirm name)
- [ ] Complete all fields for Program 2 (confirm name)
- [ ] Verify all links are live and pointing to correct documents
- [ ] Mark Atlas Ready checkbox when unit plan spec is met
- [ ] Share Sheet with AP viewer group (comment access)

### Phase 3 — Scale to remaining programs
- [ ] Add programs incrementally as curriculum documents are built
- [ ] Update Status dropdown as documents progress from Draft → In Progress → Complete
- [ ] Maintain Last Updated column

### Phase 4 — Google Sites layer (time permitting)
- [ ] Create Google Site: `CCIU CTE Curriculum Hub`
- [ ] Build navigation: All Programs / By School / By Cluster
- [ ] Create program cards per Career Cluster section
- [ ] Embed Sheet or link dynamically
- [ ] Set AP access to Viewer on the Site
- [ ] Apply CCIU branding (colors, logo, header)

### Phase 5 — Atlas migration (future)
- [ ] Confirm CCIU/district Atlas license and access
- [ ] Map Sheet columns to Atlas import fields
- [ ] Export Sheet data as CSV for Atlas import
- [ ] Transfer curriculum maps and unit plans into Atlas using Sheet as index
- [ ] Archive Sheet as historical record

---

## 9. Claude Code Kickoff Prompts

### Phase 1 — Build the Sheet

```
I'm building a CTE Curriculum Hub for CCIU using Google Apps Script.
Read this project plan in full before writing any code.

Task: Generate a complete Google Apps Script that:
1. Creates a new Google Spreadsheet named "CCIU — CTE Curriculum Hub"
2. Creates the following tabs: Dashboard, All Programs, By Cluster, By School, Settings
3. On the "All Programs" tab, creates a header row with these columns in order:
   Program Name, Career Cluster, School(s), Grade Band, Course Sequence, 
   Industry Credential, Status, Curriculum Map, Unit Plans, Scope & Sequence, 
   Schoology Page, SharePoint Docs, Primary Contact, Last Updated, Atlas Ready, Notes
4. Applies this formatting:
   - Header row: frozen, #185FA5 fill, white text, 11px bold
   - Alternating row fill: white / #F8F9FA for data rows
   - Status column: data validation dropdown (Draft, In Progress, Complete)
   - Career Cluster column: data validation dropdown (populated from Settings tab)
   - Grade Band column: data validation dropdown (9–10, 11–12, 9–12)
   - School(s) column: data validation dropdown (populated from Settings tab)
   - Columns H–L (link columns): center-aligned
   - Column widths per spec in project plan
   - Hide gridlines
   - Freeze row 1
5. On the Settings tab, creates source lists for:
   - Career Clusters (all 16 National Career Clusters)
   - Schools (3 placeholder school names — I will fill in real names)
   - Status options
   - Grade Band options
6. Protects the header row and Settings tab from editing by non-managers
7. Adds a summary row at the top of Dashboard tab showing: total programs, 
   count by status (Complete / In Progress / Draft), count by school

Return the complete script. I will paste it into Google Apps Script (script.google.com) and run it.
```

---

## 10. Open Questions / Decisions Needed

- [ ] What are the exact names of the 3 schools?
- [ ] What are the names of the 2 active programs being built first?
- [ ] Is there an existing CCIU Google Workspace account to use, or building in personal Drive for now?
- [ ] Who is the designated long-term institutional owner for this project in CTE?
- [ ] Does IT need to be looped in to enable Shared Drive creation?
- [ ] Should APs have Commenter or Viewer access to the Sheet?
- [ ] Is there a CCIU brand color / logo to use in the Sites layer later?

---

## 11. Reference

**National Career Clusters (16):**
Agriculture, Food & Natural Resources · Architecture & Construction · Arts, A/V Technology & Communications · Business Management & Administration · Education & Training · Finance · Government & Public Administration · Health Science · Hospitality & Tourism · Human Services · Information Technology · Law, Public Safety, Corrections & Security · Manufacturing · Marketing · Science, Technology, Engineering & Mathematics · Transportation, Distribution & Logistics

**Atlas unit plan required fields:**
- Unit title
- Duration / time frame
- Targeted standards (industry-based + career readiness)
- Essential questions
- Content & vocabulary
- Summative assessment type and description
- Formative assessment type and description

**Key contacts:**
- CCIU IT (for Shared Drive enablement): TBD
- CTE program lead / long-term owner: TBD
- Josh (co-builder): TBD email
