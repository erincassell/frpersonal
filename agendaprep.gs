function getMeetings() {
  var sa = SpreadsheetApp.getActiveSpreadsheet();
  var ss = sa.getSheetByName("meetings");
  var data = ss.getDataRange().getValues();
  
  var folders = DriveApp.getFoldersByName("Meetings");
  var folder = folders.next();
  
  var meetings = DriveApp.getFilesByName("Meeting Template");
  var meeting = meetings.next();
  
  var home = DriveApp.getRootFolder();
  
  var i = 0;
  while(i < data.length) {
    var completed = data[i][14];
    if(completed == "") {
      var row = data[i];
      createAgenda(row, folder, meeting, home);
      ss.getRange(i+1, 15).setValue("X");
    }
    i++;
  }
}

function createAgenda(row, folder, meeting, home) {
  var docName = row[4] + " " + row[0] + " Meeting";
  var newMeetingFile = meeting.makeCopy(docName, folder);
  home.removeFile(newMeetingFile);
  
  var newMeeting = DocumentApp.openById(newMeetingFile.getId());
  
  var time = row[1].getHours() + ":" + row[1].getMinutes();
  
  var meetingBody = newMeeting.getBody();
  meetingBody.replaceText("<<Time>>", time);
  meetingBody.replaceText("<<Duration>>", row[2]);
  meetingBody.replaceText("<<calendar>>", row[11]);
  meetingBody.replaceText("<<hangout>>", row[10]);
  meetingBody.replaceText("<<description>>", row[9]);
  meetingBody.replaceText("<<attendee1>>", row[3]);
  newMeeting.saveAndClose();
  
  newMeetingFile.setStarred(true);
}
