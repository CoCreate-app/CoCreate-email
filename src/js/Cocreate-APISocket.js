var CocreateAPiSocket = function() {
    
        /*this.classBtns =  [];
        this.server = `${location.protocol}//52.203.210.252:8080`;
        this.urlAction = '/api/management/email';
        this.url = this.server+this.urlAction;
        */
        this.req_socket = 'email';
        this.init();
};

CocreateAPiSocket.prototype.init = function (){
    let _this = this;
    //Actions BTNS 
    console.log('init .. ')
    this.actionsBtn();
    console.log("SocketOn Client -> ",this.req_socket)
    CoCreateSocket.listen(this.req_socket,data=>{
        console.log("REsponseSocket",data);
        _this.setResult(data);
    })
}

CocreateAPiSocket.prototype.actionsBtn = function(){
        let that = this;
        this.classBtns.forEach(selectorBtn => {
            let list_btns_actions = document.querySelectorAll(selectorBtn);
            list_btns_actions.forEach(btn => {
                btn.addEventListener("click", that.click_btn,false);
                btn.refClass = that;
                btn.selector = selectorBtn;
            });
        });
    }
    
CocreateAPiSocket.prototype.createAdtional = function(value){    
        let obj = {};
        obj['getAttribute'] = function(){
            return 'class';
        }
        obj['value'] = value
        return obj;
    }
    
CocreateAPiSocket.prototype.preview_validate_btn = function(btn,event){
    return true;
}

CocreateAPiSocket.prototype.validateKeysJson = function(json,rules){
    let keys_json = Object.keys(json);
    keys_json.forEach(key=>{
      const index = rules.indexOf(key);
      if(index != -1)
        rules.splice(index, 1);
    });
    if( rules.length )
      throw "Requires the following "+ rules.toString();
  },
  
CocreateAPiSocket.prototype.click_btn = function(event){
        event.preventDefault();
        let btn = this;
        let that = event.currentTarget.refClass;
        let selector = event.currentTarget.selector
        if(!that.preview_validate_btn(btn,event))
            return false;
        let dataToSend = that.getDataJSON(btn,that);
        dataToSend['type'] = selector;
        //that.socket(selector,dataToSend)
        that.socket(dataToSend,that)
    }

CocreateAPiSocket.prototype.getDataJSON = function(btn,that){
    let form = btn.closest("form");
    let inputs = [].slice.call(form.querySelectorAll('['+that.data_param+']'));
    let data = {}
    inputs.forEach(input => {
        data[input.getAttribute(that.data_param)] = input.value;
    });
    return data;
}

CocreateAPiSocket.prototype.setResult = function(data) {
}

CocreateAPiSocket.prototype.socket = function(data,that){ 
    console.log(".... Sending Request Socket to endPint [email].....");
    console.log(data);
    //socket.emit('email',data);
    CoCreateSocket.send(that.req_socket,data);
    console.log(".... Send to socket .....");
}


/*TEMP only to see result */

/*socket.on('email',function(data){
        console.log("REsponseSocket",data);
})*/