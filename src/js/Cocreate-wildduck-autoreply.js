var CocreateEmail = function() {
  this.classBtns = ['.emailDeleteAutoreplyInfoBtn','.emailRequestAutoreplyInfoBtn','.emailUpdateAutoreplyInfoBtn'];

  this.data_param = 'data-mail_autoreply';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();