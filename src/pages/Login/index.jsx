import './index.scss';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, MessagePlugin } from 'tdesign-react';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react';

const { FormItem } = Form;
function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(e);
    const username = e.e.target[0].value;
    const password = e.e.target[1].value;
    console.log(username, password);
    if (e.validateResult === true) {
      const res = await loginStore.getToken({ username, password });
      if (res.code === 0) {
        document.cookie = `token=${loginStore.token}`;
        MessagePlugin.success('登录成功');
        navigate(-1, { replace: true });
      } else {
        MessagePlugin.error('登录失败');
      }
    }
  };

  return (
    <div className='login'>
      <div className='login-container p-7'>
        <p className=' flex justify-center pb-3 text-lg text-slate-700'>
          慕课在线学习平台
        </p>
        <Form statusIcon={true} onSubmit={onSubmit} colon={true} labelWidth={0}>
          <FormItem name='account'>
            <Input
              clearable={true}
              prefixIcon={<DesktopIcon />}
              placeholder='请输入账户名'
            />
          </FormItem>
          <FormItem name='password'>
            <Input
              type='password'
              prefixIcon={<LockOnIcon />}
              clearable={true}
              placeholder='请输入密码'
            />
          </FormItem>
          <FormItem>
            <Button theme='primary' type='submit' block>
              登录
            </Button>
          </FormItem>
        </Form>
        <Button
          className=' mt-3'
          theme='default'
          block
          onClick={() => {
            navigate('/register');
          }}>
          注册
        </Button>
      </div>
    </div>
  );
}

export default Login;
