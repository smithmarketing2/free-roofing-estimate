/**
 * Smith Roofing Lead Form Handler
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create new project
 * 3. Paste this code
 * 4. Save and deploy as web app
 * 5. Copy the web app URL and replace YOUR_SCRIPT_ID in index.html
 */

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  // Spreadsheet ID - create a new sheet and paste the ID here
  const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
  
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Leads');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Full Name', 'Email', 'Phone', 'Source']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }
    
    // Append data
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Lead captured successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    service: 'Smith Roofing Lead Form'
  })).setMimeType(ContentService.MimeType.JSON);
}