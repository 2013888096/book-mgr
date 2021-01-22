import {defineComponent, reactive, ref} from 'vue'
// defineComponent 用于代码提示
import {MailOutlined,UserOutlined,LockOutlined} from '@ant-design/icons-vue'
import {auth} from '@/service';
import { result } from '@/helpers/utils';

import {message} from 'ant-design-vue';


export default defineComponent({
  // 注册组件
  components:{
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
  setup(){
    // ref 单个数据 reactive 多个数据
    // 注册表单数据
    const regForm = reactive({
      account:'',
      password:'',
      inviteCode:''
    })
    // 注册逻辑
    const register = async()=>{
      if(regForm.account === ''){
        message.info('请输入账户')
        return;
      }
      if(regForm.password === ''){
        message.info('请输入密码')
        return;
      }
      if(regForm.inviteCode === ''){
        message.info('请输入邀请码')
        return;
      }
      const res = await auth.register(regForm.account,regForm.password,regForm.inviteCode)
      result(res)
        .success((data)=>{
          message.success(data.msg);
        })

    }


    // 登录表单数据
    const loginForm = reactive({
      account:'',
      password:'',
    })
    // 登录逻辑
    const login = async ()=>{
      if(regForm.account === ''){
        message.info('请输入账户')
        return;
      }
      if(regForm.password === ''){
        message.info('请输入密码')
        return;
      }

      const {data} = await auth.login(loginForm.account,loginForm.password)

      if(data.code){
        message.success(data.msg);
        return;
      }

      message.error(data.msg);
    }

    return {
      // 注册相关数据
      regForm,
      register,
      // 登录相关注册
      loginForm,
      login
    }
  }
});
