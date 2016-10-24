function processPrintEmails() {
  var myDrive, pdfFiles, pdfFile;
  var createDate, stringDate, newMonth;
  
  myDrive = DriveApp.getRootFolder();
  pdfFiles = myDrive.getFilesByType(MimeType.PDF);
  
  var i = 0;
  while(i < pdfFiles.hasNext()) {
    pdfFile = pdfFiles.next();
    if(pdfFile.getName().substring(0, 15) == "Front Rush Mail") {
      createDate = pdfFile.getDateCreated();
      var thisMonth = createDate.getMonth()+1;
      if(thisMonth.toString().length = 1) {
        newMonth = "0" + thisMonth.toString();
      } else {
        newMonth = thismonth.toString();
      }
      
      if(createDate.getDate().toString().length = 1) {
        var newDay = "0" + createDate.toString();
      } else {
        var newDay = createDate.toString();
      }
      stringDate = createDate.getFullYear().toString() + newMonth + newDay;
      pdfFile.setName(stringDate + " - " + pdfFile.getName());
    }
  }
  
}
