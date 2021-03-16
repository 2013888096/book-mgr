import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';


export default defineComponent({
  components: {
    AddOne,
    Update
  },
  setup () {
    const columns = [{
      title: '书名',
      dataIndex: 'name'
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '库存',
      slots: {
        customRender: 'count'
      }
    },
    {
      title: '出版日期',
      dataIndex: 'publishDate',
      slots: {
        customRender: 'publishDate'
      }
    },
    {
      title: '分类',
      dataIndex: 'classify'
    },
    {
      title: '操作',
      slots: {
        customRender: 'actions'
      }
    },
    ];


    const show = ref(false);
    const showUpdateModal = ref(false);

    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curEditBook = ref({});

    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        size: 10,
        keyword: keyword.value,
      });
      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        })
    }

    // 组件被挂载时
    onMounted(async () => {
      getList();
    })

    // 用v-model:show 双向绑定 代替 父组件事件与子组件绑定
    // const setShow = (bool)=>{
    //   show.value = bool;
    // }


    // 切页
    const setPage = (page) => {
      curPage.value = page;
      getList();
    }



    // 触发搜索
    const onSearch = () => {
      getList();
      // 字符串非空的时候 -》true
      // 字符串为空的时候 -》false
      // 隐式转换
      isSearch.value = Boolean(keyword.value);
    }

    // 回到全部列表
    const backAll = () => {
      keyword.value = "";
      getList();
      isSearch.value = false;
    }

    const remove = async ({ text: record }) => {

      const { _id } = record;
      const res = await book.remove(_id);
      result(res)
        .success(({ msg }) => {
          message.success(msg);

          // 方法一
          // const idx = list.value.findIndex((item)=>{
          //   return item._id === id;
          // })
          // list.value.splice(idx,1);

          // 方法二
          getList();
        })
    }

    const updateCount = (type, record) => {
      let word = '增加';
      if (type === 2) {
        word = '减少';
      }
      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="__book_input_count" />

          </div>

        ),
        onOk: async () => {
          const el = document.querySelector('.__book_input_count');


          const res = await book.updateCount({
            id: record._id,
            num: el.value,
            type
          });

          result(res)
            .success((data) => {
              message.success(`成功${word}了${Math.abs(el.value)}本书`);

            })
          // 刷新
          getList();
        }
      })
    }
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditBook.value = record;
    }


    return {
      columns,
      list,
      show,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditBook
    }
  },
})
