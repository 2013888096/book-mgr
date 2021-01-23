import {defineComponent} from 'vue'
export default defineComponent({
  setup(){
    const columns = [{
      title:'姓名',
      dataIndex:'name'
    },
    {
      title:'年龄',
      dataIndex:'age'
    }
  ];

    const dataSource = [{
      name:'小红',
      age:20
    }];

    return{
      columns,
      dataSource,
    }
  },
})
