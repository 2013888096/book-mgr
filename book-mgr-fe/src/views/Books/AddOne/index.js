import { defineComponent,reactive } from 'vue'
import {book} from '@/service';
import {message} from 'ant-design-vue'

import {result,clone} from '@/helpers/utils';

const defaultFormData = {
    name:'',
    price:0,
    author:'',
    publishDate:0,
    classify:'',
    count:'',
}

export default defineComponent({
  props:{
    show:Boolean,
  },
  setup(props,context){


    const addForm = reactive(clone(defaultFormData));

    const submit = async ()=>{
      // 处理时间问题
      const form = clone(addForm);
      form.publishDate = addForm.publishDate.valueOf();


      const res = await book.add(form);

      result(res)
        .success((d,{data})=>{
            // 复制默认空数据对象 (达到重置效果)
            Object.assign(addForm,defaultFormData);
            message.success(data.msg);
        })
    }

    const close = ()=>{
      // context.emit('setShow',false);
      // v-model: 双向绑定方法
      context.emit('update:show',false)
    }
    return {
      addForm,
      submit,
      props,
      close
    }
  },

})
