var CocreateEmail = function() {
  this.classBtns = ['.emailAuthenticateUserBtn','.emailInvalidateAuthTokenBtn','.emailListAuthEventBtn','.emailRequestEventInfoBtn'];

  this.data_param = 'data-mail_auth';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();