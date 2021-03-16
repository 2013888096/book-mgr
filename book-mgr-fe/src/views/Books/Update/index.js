import { defineComponent,reactive, watch } from 'vue'
import {book} from '@/service';
import {message} from 'ant-design-vue'

import {result,clone} from '@/helpers/utils';
import moment from 'moment';

export default defineComponent({
  props:{
    show:Boolean,
    book:Object,
  },
  setup(props,context){

    const editForm = reactive({
      name:'',
      price:0,
      author:'',
      publishDate:0,
      classify:'',
    })

    const close = ()=>{
      // context.emit('setShow',false);
      // v-model: 双向绑定方法
      context.emit('update:show',false)
    }

    watch(()=>props.book,(current)=>{
      Object.assign(editForm,current);
      // 使用moment 处理时间问题
      editForm.publishDate = moment(Number(editForm.publishDate));
    })
    const submit = async ()=>{
      // 请求后端需要 _id 才能查找到相应的数据
      const res =  await book.update({
        id:props.book._id,
        name:editForm.name,
        price:editForm.price,
        author:editForm.author,
        classify:editForm.classify,
        publishDate:editForm.publishDate.valueOf()
      });
      result(res)
        .success(({data,msg})=>{
          Object.assign(props.book,data);
          message.success(msg);
          close();
        })

    }
    return {
      props,
      close,
      editForm,
      submit
    }
  },

})
