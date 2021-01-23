import {message} from 'ant-design-vue';

export const result = (response,authShowErrorMsg = true)=>{
  const {data} = response
  if((data.code === 0)&&authShowErrorMsg){
    message.error(data.msg);
  }
  return {
    success(callback){
      if(data.code !== 0){
        callback(data,response);
      }

      return this;
    },
    fail(callback){
      if(data.code === 0){
        callback(data,response);
      }
      return this;
    },
    finally(callback){
      callback(data,response);

      return this;
    }
  }
}

export const clone = (obj)=>{
  return JSON.parse(JSON.stringify(obj));
}

export const formatTimestamp = (ts)=>{
  const date = new Date(Number(ts));
  const YYYY = date.getFullYear();
  const MM = date.getMonth();
  const DD = date.getDate();

  const hh = date.getHours();
  const mm = date.getSeconds();
  const ss = date.getSeconds();
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;


}
