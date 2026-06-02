// ============================================================
//  Code.gs
//  CCIU — CTE Curriculum Hub
//  Container-bound script attached to the CTE Hub spreadsheet.
//
//  Deploy: Extensions → Apps Script → Deploy → New deployment
//  Type: Web app | Execute as: Me
//  Who has access: Anyone at CCIU (requires @cciu.org login)
// ============================================================

function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('CTE Curriculum Hub — Chester County Technical College High School')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getPrograms() {
  var ss       = SpreadsheetApp.getActiveSpreadsheet();
  var sheet    = ss.getSheetByName('All Programs');
  var range    = sheet.getDataRange();
  var data     = range.getValues();
  var richText = range.getRichTextValues();
  var headers  = data[0];

  // Columns F–K (index 5–10) hold hyperlinked documents
  var LINK_COLS = [5, 6, 7, 8, 9, 10];

  var programs = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    var program = {};
    for (var j = 0; j < headers.length; j++) {
      if (LINK_COLS.indexOf(j) !== -1) {
        var rt  = richText[i][j];
        var url = rt ? rt.getLinkUrl() : null;
        program[headers[j]] = url || '';
      } else {
        program[headers[j]] = String(row[j]);
      }
    }
    programs.push(program);
  }
  return programs;
}
