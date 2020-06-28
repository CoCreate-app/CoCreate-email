var CocreateEmail = function() {
  this.classBtns = ['.emailDeleteFileBtn','.emailDownloadFileBtn','.emailGetListStoredFilesBtn','.emailUploadFileBtn'];

  this.data_param = 'data-mail_storage';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();