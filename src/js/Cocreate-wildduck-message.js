var CocreateEmail = function() {
  this.classBtns = ['.emailDeleteMessageBtn','.emailDeleteAllMessageBtn','.emailDownloadAttachmentBtn',
                    '.emailForwardStoredMessageBtn','.emailGetMessageSourceBtn','.emailGetListMessagesMailboxBtn',
                    '.emailRequestMessageInfoBtn','.emailSearchMessageBtn','.emailSubmitDraftBtn','.emailUpdateMessageBtn',
                    '.emailUploadMessageBtn'];

  this.data_param = 'data-mail_message'
  
  
  CocreateAPiSocket.call(this);

};

CocreateEmail.prototype = Object.create(CocreateAPiSocket.prototype);
CocreateEmail.prototype.constructor = CocreateEmail;

var CocreateEmail = new CocreateEmail();