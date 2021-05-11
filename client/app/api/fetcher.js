import {message} from 'antd';
import {utils} from '@common';
const {fetcher}=utils;

const {target}=require('../../../configs/apis/configs');

const success_code=[200];

const handler=response=>{
  return response.json().then(result=>{
    result.code=result.code??response.status;
    result.msg=result.message??result.msg??response.statusText;
    const {msg,code}=result;
    if(code===401){
      message.error(msg);
      // logout(true);
      throw {code,message:msg};
    }
    if(!success_code.includes(code)){
      throw {code,message:msg};
    }
    return result;
  }).catch(error=>{
    message.error(error.message);
    throw error.message;
  });
};

const fetchApi=fetcher(handler);

const fetch=({method,url,...opt})=>fetchApi(method)(`${target}${url}`,opt);

export default fetch;



