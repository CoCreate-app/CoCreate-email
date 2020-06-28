var CocreateEmail = function() {
  this.classBtns = ['.emailCreateAddressBtn','.emailCreateForwardedAddressBtn','.emailDeleteForwardedAddressBtn','.emailGetListAddressBtn',
                    '.emailListUserAddressBtn','.emailGetInfoAddressBtn','.emailRenameAddressDomainBtn','.emailRequestAddressInfoBtn',
                    '.emailRequestForwardedAddressInfoBtn','.emailDeleteAddressBtn','.emailUpdateAddressInfoBtn','.emailUpdateForwardedAddressInfoBtn'];

  this.data_param = 'data-mail_address';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();