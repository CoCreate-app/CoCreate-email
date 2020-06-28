var CocreateEmail = function() {
  this.classBtns = ['.emailGetListArchivedMsgsBtn','.emailRestoreArchivedMsgBtn','.emailRestoreArchivedAllMsgBtn'];

  this.data_param = 'data-mail_archive';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();