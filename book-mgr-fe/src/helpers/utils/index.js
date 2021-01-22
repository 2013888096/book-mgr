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
