function checkEmail() {
  var dataThrds = [];
  var folder = DriveApp.getFoldersByName("Data Files").next();
  try {
  dataThrds = GmailApp.search('label:*Detach');
  var mlabel = GmailApp.getUserLabelByName("*Detach");
  var toSheet = [];
  var toSheetInc = 0;
  if(dataThrds.length > 0) {
    for(var i = 0; i < dataThrds.length; i++) {
      var messages = dataThrds[i].getMessages();
      var attachments = messages[0].getAttachments();
      stop = 4;
      if(attachments.length > 0) {
        for(var j = 0; j < attachments.length; j++) { //One line per attachment
          var toWrite = [];
          toWrite.push(Utilities.formatDate(messages[0].getDate(), 'EST', 'yyyy-MM-dd hh:mm:ss a')); //Put the date in the array
          var from = messages[0].getFrom();
          var name = from.substring(0, from.search("<")).trim(); //Strip the name out of the string
          toWrite.push(name); //Put the name in the array
          var email = from.substring(from.search("<")+1, from.search(">")); //Strip the email out of the string
          toWrite.push(email); //Put the email in the array
          toWrite.push(messages[0].getSubject()); //Put the subject in the messages array
          var k = j+1;
          var file = folder.createFile(attachments[j]);
          //var filename = Utilities.formatDate(messages[0].getDate(), 'EST', 'yyyyMMddHHMMSS') + "-" + name + "-" + k;
          //file.setName(filename);
          file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.EDIT);
          toWrite.push(file.getName());
          toSheet[toSheetInc] = toWrite;
          stop = 5;
          toSheetInc++;
          stop=6;
        }

      }
      dataThrds[i].removeLabel(mlabel);
    }
  }
  var datalog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("datalog");
  var logdata = getDataValues("datalog");
  datalog.getRange(logdata.length+1, 1, toSheet.length, toSheet[0].length).setValues(toSheet);
  logdata = getDataValues("datalog");
  var sortrng = datalog.getRange(2, 1, logdata.length - 1, logdata[0].length);
  sortrng.sort(1);
  } catch(e) {
    Logger.log("No messages with that label");
  }
}

function getDataValues(name) {
  var sa = SpreadsheetApp.getActiveSpreadsheet();
  var data = sa.getSheetByName(name).getDataRange().getValues();
  return data;
}
