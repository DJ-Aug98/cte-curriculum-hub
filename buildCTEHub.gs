// ============================================================
//  buildCTEHub.gs
//  CCIU — CTE Curriculum Hub | Phase 1: Google Sheet Build
//  Paste the entire contents of this file into Google Apps
//  Script (script.google.com), then run buildCTEHub().
// ============================================================

function buildCTEHub() {

  // ── Defensive: create a new file even if name already exists ─
  var baseName = 'CCIU — CTE Curriculum Hub';
  var ssName   = baseName;
  if (DriveApp.getFilesByName(ssName).hasNext()) {
    var ts = Utilities.formatDate(
      new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'
    );
    ssName = baseName + ' (' + ts + ')';
  }

  var ss = SpreadsheetApp.create(ssName);

  // Rename the default sheet to All Programs; Settings goes second
  var allProgramsSheet = ss.getSheets()[0];
  allProgramsSheet.setName('All Programs');

  var settingsSheet = ss.insertSheet('Settings');

  // Build Settings first — validation rules in All Programs reference it
  buildSettings_(settingsSheet);
  buildAllPrograms_(allProgramsSheet, settingsSheet);
  seedPrograms_(allProgramsSheet);

  Logger.log('=================================================');
  Logger.log('CTE Hub created successfully!');
  Logger.log('Name : ' + ssName);
  Logger.log('URL  : ' + ss.getUrl());
  Logger.log('ID   : ' + ss.getId());
  Logger.log('=================================================');
}


// ============================================================
//  SETTINGS TAB
//  Source lists for dropdown validations.
//  Entire tab is protected — edit here to update dropdowns.
// ============================================================
function buildSettings_(sheet) {

  sheet.getRange(1, 1, 1, 3).setValues(
    [['Campuses', 'Status Options', 'Instructional Models']]
  );

  // Campuses (A2:A13) — all realistic single and multi-campus combinations
  sheet.getRange('A2:A13').setValues([
    ['Pickering'],
    ['Pennocks Bridge'],
    ['Brandywine'],
    ['Satellite'],
    ['Pickering, Pennocks Bridge'],
    ['Pickering, Brandywine'],
    ['Pennocks Bridge, Brandywine'],
    ['Pickering, Pennocks Bridge, Brandywine'],
    ['Pickering, Satellite'],
    ['Pennocks Bridge, Satellite'],
    ['Brandywine, Satellite'],
    ['All Campuses + Satellite']
  ]);

  // Status Options (B2:B4)
  sheet.getRange('B2:B4').setValues([['Draft'], ['In Progress'], ['Complete']]);

  // Instructional Models (C2:C5)
  sheet.getRange('C2:C5').setValues([['A/B'], ['A/B/C'], ['Linear'], ['Hybrid']]);

  // Header formatting
  var hdr = sheet.getRange(1, 1, 1, 3);
  hdr.setBackground('#185FA5');
  hdr.setFontColor('#FFFFFF');
  hdr.setFontWeight('bold');

  sheet.autoResizeColumns(1, 3);

  // Protect entire Settings tab
  var prot = sheet.protect();
  prot.setDescription('Settings — dropdown source lists; do not edit manually');
  prot.removeEditors(prot.getEditors());
  if (prot.canDomainEdit()) prot.setDomainEdit(false);
}


// ============================================================
//  ALL PROGRAMS TAB
//
//  Column schema (A–N, 14 columns):
//    A  Program Name
//    B  CIP Code
//    C  Campus(es)          free text — supports "Campus A, Campus B"
//    D  Instructional Model dropdown
//    E  Status              dropdown + conditional color
//    F  Task List           link — state-required program task list (PDF)
//    G  Scope & Sequence    link
//    H  Pacing Guide        link
//    I  Unit Plans          link
//    J  SharePoint Docs     link
//    K  Schoology Page      link
//    L  Last Updated
//    M  Notes
// ============================================================
function buildAllPrograms_(sheet, settingsSheet) {

  var HEADER_BG     = '#185FA5';
  var HEADER_TEXT   = '#FFFFFF';
  var ROW_ALT       = '#F8F9FA';
  var NUM_DATA_ROWS = 200;

  var HEADERS = [
    'Program Name',        // A  1
    'CIP Code',            // B  2
    'Campus(es)',          // C  3
    'Instructional Model', // D  4
    'Status',              // E  5
    'Task List',           // F  6
    'Scope & Sequence',    // G  7
    'Pacing Guide',        // H  8
    'Unit Plans',          // I  9
    'SharePoint Docs',     // J  10
    'Schoology Page',      // K  11
    'Last Updated',        // L  12
    'Notes'                // M  13
  ];
  var NUM_COLS = HEADERS.length; // 13

  // ── Header row ──────────────────────────────────────────────
  var hdrRange = sheet.getRange(1, 1, 1, NUM_COLS);
  hdrRange.setValues([HEADERS]);
  hdrRange.setBackground(HEADER_BG);
  hdrRange.setFontColor(HEADER_TEXT);
  hdrRange.setFontWeight('bold');
  hdrRange.setFontSize(11);
  hdrRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 36);

  sheet.setFrozenRows(1);
  sheet.setHiddenGridlines(true);

  // ── Alternating row backgrounds (rows 2 onward) ──────────────
  var allBgs = [];
  for (var r = 0; r < NUM_DATA_ROWS; r++) {
    var color = (r % 2 === 0) ? '#FFFFFF' : ROW_ALT;
    var rowColors = [];
    for (var c = 0; c < NUM_COLS; c++) rowColors.push(color);
    allBgs.push(rowColors);
  }
  sheet.getRange(2, 1, NUM_DATA_ROWS, NUM_COLS).setBackgrounds(allBgs);

  // ── Column widths ─────────────────────────────────────────────
  //    A    B    C    D    E   F    G    H   I    J   K   M
  var COL_WIDTHS =
    [200,  90, 150, 130, 100,  90, 110,  90,  90, 110,  90,  90, 200];
  COL_WIDTHS.forEach(function(w, i) { sheet.setColumnWidth(i + 1, w); });

  // ── Center-align link columns F–K (cols 6–11) ────────────────
  sheet.getRange(1, 6, NUM_DATA_ROWS + 1, 6).setHorizontalAlignment('center');

  // ── Data validations ─────────────────────────────────────────

  // C — Campus(es): dropdown from Settings A2:A13 (pre-built combinations).
  sheet.getRange(2, 3, NUM_DATA_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInRange(settingsSheet.getRange('A2:A13'), true)
      .setAllowInvalid(false)
      .build()
  );

  // D — Instructional Model: from Settings C2:C5
  sheet.getRange(2, 4, NUM_DATA_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInRange(settingsSheet.getRange('C2:C5'), true)
      .setAllowInvalid(false)
      .build()
  );

  // E — Status: from Settings B2:B4
  sheet.getRange(2, 5, NUM_DATA_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInRange(settingsSheet.getRange('B2:B4'), true)
      .setAllowInvalid(false)
      .build()
  );

  // ── Conditional formatting — Status color coding ──────────────
  var statusRange = sheet.getRange(2, 5, NUM_DATA_ROWS, 1);
  var cfRules = sheet.getConditionalFormatRules();

  cfRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Complete')
      .setBackground('#EAF3DE').setFontColor('#3B6D11')
      .setRanges([statusRange]).build()
  );
  cfRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('In Progress')
      .setBackground('#FAEEDA').setFontColor('#854F0B')
      .setRanges([statusRange]).build()
  );
  cfRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Draft')
      .setBackground('#F1EFE8').setFontColor('#5F5E5A')
      .setRanges([statusRange]).build()
  );

  sheet.setConditionalFormatRules(cfRules);

  // ── Native filter on all columns ─────────────────────────────
  sheet.getRange(1, 1, NUM_DATA_ROWS + 1, NUM_COLS).createFilter();

  // ── Protect header row ────────────────────────────────────────
  var hdrProt = sheet.getRange('1:1').protect();
  hdrProt.setDescription('Header row — do not edit');
  hdrProt.removeEditors(hdrProt.getEditors());
  if (hdrProt.canDomainEdit()) hdrProt.setDomainEdit(false);
}


// ============================================================
//  SEED INITIAL PROGRAMS
// ============================================================
function seedPrograms_(sheet) {

  // One value per column A–M (13 columns)
  var rows = [
    [
      'Construction Trades',
      '46.9999',              // CIP Code
      'Satellite',
      'A/B',
      'In Progress',
      '', '', '', '', '', '', // link cols F–K
      '',                     // Last Updated
      'Year A/B model; mapped as one program.'
    ],
    [
      'Health Career Pathways',
      '51.0899',
      'Pickering',
      'A/B/C',
      'In Progress',
      '', '', '', '', '', '',
      '',
      'A/B/C cycle. Unit plans and pacing guide specific to Pickering.'
    ]
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}


// ============================================================
//  CAMPUS MULTI-SELECTION NOTE
//
//  Multi-campus combinations are handled via pre-built dropdown
//  values in the Settings tab (A2:A13) rather than a trigger.
//  To add a new combination, add it to Settings column A and
//  update the validation range in buildAllPrograms_() above.
// ============================================================


// ============================================================
//  WEB APP — serves All Programs data as JSON for the site
//
//  To activate after pasting this script into the sheet:
//  1. Extensions → Apps Script → Deploy → New deployment
//  2. Type: Web app
//  3. Execute as: Me
//  4. Who has access: Anyone with Google account
//  5. Click Deploy → copy the web app URL
//  6. Paste that URL into index.html as the value of GAS_URL
// ============================================================
function doGet(e) {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var sheet  = ss.getSheetByName('All Programs');
  var data   = sheet.getDataRange().getValues();
  var headers = data[0];

  var programs = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue; // skip empty rows
    var program = {};
    for (var j = 0; j < headers.length; j++) {
      program[headers[j]] = String(row[j]);
    }
    programs.push(program);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ programs: programs }))
    .setMimeType(ContentService.MimeType.JSON);
}
