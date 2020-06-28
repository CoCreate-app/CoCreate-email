const axios = require('axios');

module.exports.req=(url,method,params,wsManager,socket,response,data_original)=>{
  
    console.log("Send Req "+method+" AXIOS "+ response);
    axios({
          method: method,
          url: url,
          data: params
    }).then(function (resp) {
        console.log("Succes   REQ")
        send_response(wsManager,socket,{result :  true,response : resp.data,'data_request':data_original},response);
        
    }).catch(function (error) {
        console.log("ERROR   REQ")
        send_response(wsManager,socket,{result :  false,response : error.data ,'data_request':data_original},response);
    });
}

var send_response=(wsManager,socket,obj,send_response)=>{
  console.log("Response   TO-> "+send_response)
  //console.log("Object    ->", obj)
  //socket.emit(send_response,obj)
  wsManager.send(socket, send_response, obj)
}


var send_error=(wsManager,socket,obj,send_response)=>{
  // console.log("error  ",obj)
  let result = obj;
  // delete result.error['request'];// when error, obj too large
  // let result = {type:obj.type, error:obj.error};
  //socket.emit(send_response,result)
  wsManager.send(socket, send_response, obj)
  //res.send(obj);
}

module.exports.send_response = send_response;
module.exports.send_error = send_error;