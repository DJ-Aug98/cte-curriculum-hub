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

  // Columns that store hyperlinked documents rather than plain text.
  // Col G = Year at a Glance, Col H = Scope and Sequence.
  var LINK_HEADERS = {
    'Task List':    true,
    'Pacing Guide': true,
    'Unit Plans':   true
  };

  var programs = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0] || !String(row[0]).trim()) continue;
    var program = {};
    for (var j = 0; j < headers.length; j++) {
      var header = headers[j].toString().trim();
      if (LINK_HEADERS[header]) {
        var rt  = richText[i][j];
        var url = null;
        if (rt) {
          url = rt.getLinkUrl();
          if (!url) {
            var runs = rt.getRuns();
            for (var k = 0; k < runs.length; k++) {
              var runUrl = runs[k].getLinkUrl();
              if (runUrl) { url = runUrl; break; }
            }
          }
        }
        program[header] = url || '';
      } else {
        program[header] = String(row[j]);
      }
    }
    programs.push(program);
  }
  return programs;
}

function testLinks() {
  var programs = getPrograms();
  console.log(JSON.stringify(programs));
}
