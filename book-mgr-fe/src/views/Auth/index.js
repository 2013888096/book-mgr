import {defineComponent, reactive, ref} from 'vue'
// defineComponent 用于代码提示
import {MailOutlined,UserOutlined,LockOutlined} from '@ant-design/icons-vue'
import {auth} from '@/service';

export default defineComponent({
  // 注册组件
  components:{
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
  setup(){
    // ref 单个数据 reactive 多个数据
    const regForm = reactive({
      account:'',
      password:'',
    })

    const register = ()=>{
      auth.register(regForm.account,regForm.password)
    }
    return {
      regForm,
      register
    }
  }
});
