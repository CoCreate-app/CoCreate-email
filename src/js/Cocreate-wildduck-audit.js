var CocreateEmail = function() {
  this.classBtns = ['.emailCreateAuditBtn','.emailExportAuditBtn','.emailRequestAuditBtn'];

  this.data_param = 'data-mail_audit';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();