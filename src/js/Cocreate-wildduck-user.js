var CocreateEmail = function() {
  this.classBtns = ['.emailCreateUserBtn','.emailDeleteUserBtn','.emailGetListUserBtn','.emailLogoutUserBtn',
                    '.emailQuotaResetAllUsersBtn','.emailQuotaResetUserBtn','.emailRequestUserInfoBtn','.emailResetPswUserBtn',
                    '.emailResolveIdUserBtn','.emailUpdateUserInfoBtn'];

  this.data_param = 'data-mail_user';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();