var CocreateEmail = function() {
  this.classBtns = ['.emailSubmitMessageForDelivery'];

  this.data_param = 'data-mail_submission';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();