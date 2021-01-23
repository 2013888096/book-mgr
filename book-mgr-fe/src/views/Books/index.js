import {defineComponent,ref,onMounted} from 'vue';
import {book} from '@/service';
import {result,formatTimestamp} from '@/helpers/utils';
import AddOne from './AddOne/index.vue';


export default defineComponent({
  components:{
    AddOne
  },
  setup(){
    const columns = [{
      title:'书名',
      dataIndex:'name'
    },
    {
      title:'作者',
      dataIndex:'author'
    },
    {
      title:'价格',
      dataIndex:'price'
    },
    {
      title:'出版日期',
      dataIndex:'publishDate',
      slots:{
        customRender:'publishDate'
      }
    },
    {
      title:'分类',
      dataIndex:'classify'
    }
  ];


    const show = ref(false);
    const list = ref(list);

    // 组件被挂载时
    onMounted(async()=>{
      const res = await book.list();
      result(res)
        .success(({data})=>{
          list.value = data
        })
      console.log(list.value);
    })

    // 用v-model:show 双向绑定 代替 父组件事件与子组件绑定
    // const setShow = (bool)=>{
    //   show.value = bool;
    // }



    return{
      columns,
      list,
      show,
      formatTimestamp
    }
  },
})
