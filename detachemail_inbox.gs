function detachAttachments() {
  var dataThrds = [];
  var folder = DriveApp.getFoldersByName("Inbox").next(); //Get the Inbox folder
  try {
    dataThrds = GmailApp.search('label:*Inbox'); //Get the emails with the label *Inbox
    var mlabel = GmailApp.getUserLabelByName("*Inbox"); //Get the label name
    var toSheet = []; //Initialize the array
    var toSheetInc = 0; 
    if(dataThrds.length > 0) { //If emails returned
      for(var i = 0; i < dataThrds.length; i++) { //Loop through them
        var messages = dataThrds[i].getMessages(); //Get a single message
        var attachments = messages[0].getAttachments(); //Get an attachment
        stop = 4;
        if(attachments.length > 0) { //If there are attachments
          for(var j = 0; j < attachments.length; j++) { //Loop through the attachments
            var toWrite = [];
            toWrite.push(Utilities.formatDate(messages[0].getDate(), 'EST', 'yyyy-MM-dd')); //Put the date in the array
            var k = j+1;
            var file = folder.createFile(attachments[j]); //Put the attachment in the folder
            toWrite.push(file.getName()); //Write the file to the sheet
            toSheet[toSheetInc] = toWrite;
            stop = 5;
            toSheetInc++;
            stop=6;
           }
        }
      dataThrds[i].removeLabel(mlabel); //Remove the label
    }
  }
  var datalog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("log"); //Get the log sheet
  var logdata = getDataValues("log"); //Get the files
  datalog.getRange(logdata.length+1, 1, toSheet.length, toSheet[0].length).setValues(toSheet); //Put the new files in the sheet
  logdata = getDataValues("datalog"); //Get the data values
  var sortrng = datalog.getRange(2, 1, logdata.length - 1, logdata[0].length); //Sort the range by date
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
