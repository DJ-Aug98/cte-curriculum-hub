// ============================================================
//  Code.gs
//  CCIU — CTE Curriculum Hub | Data API
//  Container-bound script attached to the CTE Hub spreadsheet.
//
//  Deploy: Extensions → Apps Script → Deploy → New deployment
//  Type: Web app | Execute as: Me | Who has access: Anyone
//  Copy the URL → paste into index.html as GAS_URL
// ============================================================

function doGet(e) {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var sheet   = ss.getSheetByName('All Programs');
  var data    = sheet.getDataRange().getValues();
  var headers = data[0];

  var programs = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
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
