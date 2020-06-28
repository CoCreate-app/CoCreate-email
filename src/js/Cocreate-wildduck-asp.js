var CocreateEmail = function() {
  this.classBtns = ['.emailCreateAspBtn','.emailDeleteAspBtn','.emailGetListAspsBtn','.emailRequestAspInfoBtn'];

  this.data_param = 'data-mail_asp';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();