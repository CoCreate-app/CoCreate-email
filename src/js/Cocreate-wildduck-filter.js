var CocreateEmail = function() {
  this.classBtns = ['.emailCreateFilterBtn','.emailDeleteFilterBtn','.emailListFilterBtn','.emailRequestFilterBtn','.emailUpdateFilterBtn'];

  this.data_param = 'data-mail_filter';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();