var CocreateEmail = function() {
  this.classBtns = ['.emailCreateMailboxBtn','.emailDeleteMailboxBtn','.emailListMailboxBtn','.emailRequestMailboxBtn','.emailUpdateMailboxBtn'];

  this.data_param = 'data-mail_mailbox';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();