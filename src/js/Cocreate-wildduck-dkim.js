var CocreateEmail = function() {
  this.classBtns = ['.emailDkimBtn','.emailDkimListBtn','.emailDkimInfoBtn','.emailDkimDeleteBtn','.emailDkimResolveBtn'];
  this.data_param = 'data-mail_dkim';
  CocreateAPiSocket.call(this);
};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();