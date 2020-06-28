/* global Y */
'use strict'
var utils= require('../utils');


const CoCreateBase = require("../../base");
//const {ObjectID, Binary} = require("mongodb");

class CoCreateEmail extends CoCreateBase {
	constructor(wsManager, db) {
		super(wsManager, db);
		this.init();
		this.url_wilddock = 'http://3.231.17.247:8080';
	}
	
	init() {
		if (this.wsManager) {
			this.wsManager.on('email',		(socket, data) => this.sendEmail(socket, data));
		}
	}
	async sendEmail(socket, data) {
	    
	    console.log("emaiul from lee");
        let data_original = data;
        let type = data['type'];
        delete data['type'];
        let url = '';
        let method = '';
        let targets = [];
        let tags = [];
        /*Address*/
        switch (type) {
            case '.emailCreateAddressBtn':
                url = '/users/:USER/addresses'.replace(/:USER/gi, data['user']);
                if(data['tags_val'])
                    data['tags'] = JSON.parse(data['tags_val']);
                else
                    data['tags'] = [];
                delete data['tags_val'];
                
                method = 'POST'
                break;
            
            case '.emailCreateForwardedAddressBtn':
                url = '/addresses/forwarded';
                method = 'POST';
                
                if(data['tags_val'])
                    data['tags'] = JSON.parse(data['tags_val']);
                else
                    data['tags'] = [];
                delete data['tags_val'];
                
                if(data['targets_val'])
                    data['targets'] = JSON.parse(data['targets_val']);
                else
                    data['targets'] = [];
                delete data['targets_val'];
                
                if(data['autoreply_val'])
                    data['autoreply'] = JSON.parse(data['autoreply_val']);
                else
                    data['autoreply'] = {};
                delete data['autoreply_val'];
                
                break;
            
            case '.emailDeleteForwardedAddressBtn':
                url = '/addresses/forwarded/' + data['address'];
                method = 'DELETE';
                delete data['address'];
                break;
            
            case '.emailDeleteAddressBtn':
                url = '/users/'+ data['user'] + '/addresses/' + data['address'];
                method = 'DELETE';
                delete data['user'];
                delete data['address'];
                break;
            
            case '.emailGetInfoAddressBtn':
                url = '/addresses/resolve/' + data['address'];
                method = 'GET';
                delete data['address'];
                break;
            
            case '.emailListUserAddressBtn':
                url = '/users/'+ data['user'] +'/addresses';
                method = 'GET';
                delete data['user'];
                break;
            
            case '.emailGetListAddressBtn':
                url = `/addresses?`;
                if(data['query'])
                    url += `query=${data['query']}&`;
                if(data['tags'])
                    url += `tags=${data['tags']}&`;
                if(data['requiredTags'])
                    url += `requiredTags=${data['requiredTags']}&`;
                if(data['limit'])
                    url +=`limit=${data['limit']}&`;
                if(data['page'])
                    url +=`page=${data['page']}&`;
                if(data['next'])
                    url +=`next=${data['next']}&`;
                if(data['previous'])
                    url +=`previous=${data['previous']}&`;
                console.log(url)
                method ='GET';
                break;
            
            case '.emailRenameAddressDomainBtn':
                url = '/addresses/renameDomain';
                method = 'PUT';
                break;
            
            case '.emailRequestAddressInfoBtn':
                url = '/users/'+ data['user'] +'/addresses/'+ data['address'];
                method = 'GET';
                break;
            
            case '.emailRequestForwardedAddressInfoBtn':
                url = '/addresses/forwarded/' + data['address'];
                method = 'GET';
                break;
            
            case '.emailUpdateAddressInfoBtn':
                url = '/users/'+ data['user_id'] +'/addresses/'+ data['address_id'];
                method = 'PUT';
                if(data['tags_val'])
                    data['tags'] = JSON.parse(data['tags_val']);
                else
                    data['tags'] = [];
                if(!data['address'])
                    delete data['address'];
                delete data['tags_val'];
                delete data['user_id'];
                delete data['address_id'];
                console.log(url)
                break;
            
            case '.emailUpdateForwardedAddressInfoBtn':
                url = '/addresses/forwarded/' + data['address_id'];
                method = 'PUT';
                
                if(!data['forwards'])
                    data['forwards'] = 0;
                if(data['tags_val'])
                    data['tags'] = JSON.parse(data['tags_val']);
                else
                    data['tags'] = [];
                delete data['tags_val'];
                
                if(data['targets_val'])
                    data['targets'] = JSON.parse(data['targets_val']);
                else
                    data['targets'] = [];
                delete data['targets_val'];
                
                if(data['autoreply_val'])
                    data['autoreply'] = JSON.parse(data['autoreply_val']);
                else
                    data['autoreply'] = {};
                delete data['autoreply_val'];
                
                delete data['address_id'];
                console.log(data)
                break;
            
        }
        
        /*DKIM*/
        switch (type) {
            case '.emailDkimListBtn':
                url = '/dkim';
                method = 'GET';
                data = {};
            break;
            case '.emailDkimBtn':
                url = '/dkim';
                method = 'POST';
            break;
            case '.emailDkimDeleteBtn':
              var id_dkim = data['dkim_id'] || '';
              delete data['dkim_id'];
              url = '/dkim/'+id_dkim;
              method = 'DELETE';
              data = {}
            break;
            case '.emailDkimResolveBtn':
              var domain = data['domain'] || '';
              delete data['domain'];
              url = '/dkim/resolve/'+domain;
              method = 'GET';
              data = {};
            break;
            case '.emailDkimInfoBtn':
              var id_dkim = data['dkim_id'] || '';
              delete data['dkim_id'];
              url = '/dkim/'+id_dkim;
              method = 'GET';
              data = {};
            break;
        }
        
        /*USER*/
        switch (type) {
            
            case '.emailCreateUserBtn':
                url = '/users';
                method = 'POST';
                tags.push(data['tags']);
                data['tags'] = tags;
                break;
            
            case '.emailDeleteUserBtn':
                url = '/users/' + data['user'];
                method = 'DELETE';
                break;
            
            case '.emailGetListUserBtn':
                url = '/users';
                method = 'GET';
                break;
                
            case '.emailLogoutUserBtn':
                url = '/users/'+ data['user'] +'/logout';
                method = 'PUT';
                break;
                
            // openstream
            // end
            case '.emailQuotaResetAllUsersBtn':
                url = '/quota/reset';
                method = 'POST';
                break;
            
            case '.emailQuotaResetUserBtn':
                url = '/users/'+ data['user'] +'/quota/reset';
                method = 'POST';
                break;
            
            case '.emailRequestUserInfoBtn':
                url = '/users/'+ data['user'];
                method = 'GET';
                break;
                
            case '.emailResetPswUserBtn':
                url = '/users/'+ data['user'] +'/password/reset';
                method = 'POST';
                break;
                
            case '.emailResolveIdUserBtn':
                url = '/users/resolve/'+ data['username'];
                method = 'GET';
                break;
            
            case '.emailUpdateUserInfoBtn':
                url = '/users/' + data['user'];
                method = 'PUT';
                delete data['user'];
                break;
                
        }
        
        /* Application Passwords */
        switch (type) {
            case '.emailCreateAspBtn':
                url = '/users/' + data['user'] + '/asps';
                method = 'POST';
                delete data['user'];
                break;
                
            case '.emailDeleteAspBtn':
                url = '/users/'+ data['user'] +'/asps/'+ data['asp'];
                method = 'DELETE';
                break;
            
            case '.emailGetListAspsBtn':
                url = '/users/'+ data['user'] +'/asps';
                method = 'GET';
                break;
                
            case '.emailRequestAspInfoBtn':
                url = '/users/'+ data['user'] +'/asps/'+ data['asp'];
                method = 'GET';
                break;

        }
        
        /* Archive */
        switch (type) {
            case '.emailGetListArchivedMsgsBtn':
                url = `/users/${data['user']}/archived/messages`;
                method = 'GET';
                break;
            
            case '.emailRestoreArchivedMsgBtn':
                url = `/users/${data['user']}/archived/messages/${data['message']}/restore`;
                method = 'POST';
                delete data['user'];
                delete data['message'];
                break;
                
            case '.emailRestoreArchivedAllMsgBtn':
                url = `/users/${data['user']}/archived/restore`;
                method = 'POST';
                delete data['user'];
                break;
        }
        
        /* Audit */
        
        switch (type) {
            //not ready
            case '.emailCreateAuditBtn':
                url = '/audit';
                method = 'POST';
                break;
            
            case '.emailExportAuditBtn':
                url = `/audit/${data['audit']}/export.mbox`;
                method = 'GET';
                break;
            
            case '.emailRequestAuditBtn':
                url = `/audit/${data['audit']}`;
                method = 'GET';
                break;
            
        }
        
        /* Authenticate */
        switch (type) {
            case '.emailAuthenticateUserBtn':
                url = '/authenticate';
                method = 'POST';
                // data['scope'] = "master";
                data['token'] = "true";
                break;
            
            case '.emailInvalidateAuthTokenBtn':
                url = '/authenticate';
                method = 'DELETE';
                break;
            
            case '.emailListAuthEventBtn':
                url = `/users/${data['user']}/authlog`;
                method = 'GET';
                break;
                
            case '.emailRequestEventInfoBtn':
                url = `/users/${data['user']}/authlog/${data['event']}`;
                method = 'GET';
                break;
        }
        
        /* Autoreplies */
        switch (type) {
            case '.emailDeleteAutoreplyInfoBtn':
                url = `/users/${data['user']}/autoreply`;
                method = 'DELETE';
                break;
           
            case '.emailRequestAutoreplyInfoBtn':
                url = `/users/${data['user']}/autoreply`;
                method = 'GET';
                break;
               
            case '.emailUpdateAutoreplyInfoBtn':
                url = `/users/${data['user']}/autoreply`;
                method = 'PUT'
                delete data['user'];
                break;
        }
        /*DomainAlias*/
        switch (type) {
            case '.emailCreateDomainAliasBtn':
                url = `/domainaliases`;
                method = 'POST';
                break;
            
            case '.emailDeleteDomainAliasBtn':
                url = `/domainaliases/${data['alias']}`;
                method = 'DELETE';
                break;
            
            case '.emailListDomainAliasesBtn':
                url =`/domainaliases`;
                method = 'GET';
                break;
            
            case '.emailRequestDomainAliasBtn':
                url = `/domainaliases/${data['alias']}`;
                method = 'GET';
                break;
            
            case '.emailResolveDomainAliasBtn':
                url = `/domainaliases/resolve/${data['alias']}`;
                method = 'GET';
                break;
            
        }
        /*Filter*/
        switch (type) {
            
            case '.emailCreateFilterBtn':
                url = `/users/${data['user']}/filters`;
                method = 'POST';
                
                data['query']  = JSON.parse(data['query_value']);
                delete data['query_value'];
                data['action'] = JSON.parse(data['action_value']);
                delete data['action_value'];
                delete data['user'];
                break;
            
            case '.emailDeleteFilterBtn':
                url = `/users/${data['user']}/filters/${data['filter']}`;
                method = 'DELETE';
                break;
            
            case '.emailListFilterBtn':
                url = `/users/${data['user']}/filters`;
                method = 'GET';
                break;
                
            case '.emailRequestFilterBtn':
                url = `/users/${data['user']}/filters/${data['filter']}`;
                method = 'GET';
                break;
            
            case '.emailUpdateFilterBtn':
                url = `/users/${data['user']}/filters/${data['filter']}`;
                method = "PUT";
                data['query'] = JSON.parse(data['query_value']);
                delete data['query_value'];
                data['action'] = JSON.parse(data['action_value']);
                delete data['action_value'];
                delete data['user'];
                delete data['filter'];
                break;
        }
        
        /*Mailbox*/
        switch (type) {
            case '.emailCreateMailboxBtn':
                url = `/users/${data['user']}/mailboxes`;
                method = 'POST';
                delete data['user'];
                break;
            
            case '.emailDeleteMailboxBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}`;
                method = 'DELETE';
                break;
            
            case '.emailListMailboxBtn':
                url = `/users/${data['user']}/mailboxes`;
                method = 'GET';
                break;
                
            case '.emailRequestMailboxBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}`;
                method = 'GET';
                break;
            
            case '.emailUpdateMailboxBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}`;
                method = 'PUT';
                delete data['user'];
                delete data['mailbox'];
                break;
        }
        /* Message */
        switch (type) {
            case '.emailDeleteMessageBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages/${data['message']}`;
                method = 'DELETE';
                break;
                
            case '.emailDeleteAllMessageBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages`;
                method = 'DELETE';
                break;
            
            case '.emailForwardStoredMessageBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages/${data['message']}/forward`;
                let addresses = [];
                addresses.push(data['addresses']);
                data['addresses'] = addresses;
                method = 'POST';
                break;
            
            case '.emailGetMessageSourceBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages/${data['message']}/message.eml`;
                method = 'GET';
                break;
            
            case '.emailGetListMessagesMailboxBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages`;
                method = 'GET';
                break;
            
            case '.emailRequestMessageInfoBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages/${data['message']}`;
                method = 'GET';
                break;
            
            case '.emailSearchMessageBtn':
                url = `/users/${data['user']}/search`;
                method = 'GET';
                break;
            
            case '.emailSubmitDraftBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages/${data['message']}/submit`;
                method = 'POST';
                // delete data['user'];
                // delete data['mailbox'];
                // delete data['message'];
                break;
            
            case '.emailUpdateMessageBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages`;
                method = 'PUT';
                break;
            
            case '.emailUploadMessageBtn':
                url = `/users/${data['user']}/mailboxes/${data['mailbox']}/messages`;
                method = 'POST';
                if(data['from_val']){
                    data['from'] = JSON.parse(data['from_val']);
                    delete data['from_val'];
                }
                if(data['to_val']){
                    data['to'] = JSON.parse(data['to_val']);
                    delete data['to_val'];
                }
                delete data['user'];
                delete data['mailbox'];
                break;
            
        }
        
        /*Storage*/
        switch (type) {
            case '.emailDeleteFileBtn':
                url = `/users/${data['user']}/storage/${data['file']}`;
                method = 'DELETE';
                break;
                
            case '.emailDownloadFileBtn':
                url = `/users/${data['user']}/storage/${data['file']}`;
                method = 'GET';
                break;
            
            case '.emailGetListStoredFilesBtn':
                url = `/users/${data['user']}/storage`;
                method = 'GET';
                break;
            
            case '.emailUploadFileBtn':
                url = `/users/${data['user']}/storage`;
                method = 'POST';
                break;
            
        }
        /*Submission*/
        switch (type) {
            case '.emailSubmitMessageForDelivery':
                url = `/users/${data['user']}/submit`;
                method = 'POST';
                if(data['from_address']){
                    data['from'] = {};
                    data['from'].address = data['from_address'];
                    delete data['from_address'];
                }
                if(data['to_address']){
                    data['to'] = [];
                    let dataTo = {};
                    dataTo.address = data['to_address'];
                    data['to'].push(dataTo);
                    delete data['to_address'];
                }
                break;
        }
        
        switch (type) {
            case '.emailDisable2FABtn':
                url = `/users/${data['user']}/2fa`;
                method  = 'DELETE';
                break;
            
            case '.emailDisableTOTPAuthBtn':
                url = `/users/${data['user']}/2fa/totp`;
                method = 'DELETE';
                break;
            
            case '.emailDisableCustom2FABtn':
                url = `/users/${data['user']}/2fa/custom`;
                method = 'DELETE';
                break;
            
            case '.emailEnableTOTPSeedBtn':
                url = `/users/${data['user']}/2fa/totp/enable`;
                method = 'POST';
                break;
            
            case '.emailCustom2FABtn':
                url = `/users/${data['user']}/2fa/custom`;
                method = 'PUT';
                delete data['user'];
                break;
            
            case '.emailGenerateTOTPSeedBtn':
                url = `/users/${data['user']}/2fa/totp/setup`;
                method = 'POST';
                break;
            
            case '.emailValidateTOTPBtn':
                url = `/users/${data['user']}/2fa/totp/check`;
                method = 'POST';
                break;
        }
        utils.req(this.url_wilddock+url,method,data,this.wsManager,socket,'email',data_original);
	    
	}
}//end Class CoCreateDomain
module.exports = CoCreateEmail;
