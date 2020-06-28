var CocreateEmail = function() {
  this.classBtns = ['.emailDisable2FABtn','.emailDisableTOTPAuthBtn','.emailDisableCustom2FABtn',
                    '.emailEnableTOTPSeedBtn','.emailCustom2FABtn','.emailGenerateTOTPSeedBtn','.emailValidateTOTPBtn'];

  this.data_param = 'data-mail_two_factor_auth';
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();