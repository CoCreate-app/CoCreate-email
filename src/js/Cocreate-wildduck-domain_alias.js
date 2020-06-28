var CocreateEmail = function() {
  this.classBtns = ['.emailCreateDomainAliasBtn','.emailDeleteDomainAliasBtn','.emailListDomainAliasesBtn','.emailRequestDomainAliasBtn','.emailResolveDomainAliasBtn'];

  this.data_param = 'data-mail_domain_alias';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();