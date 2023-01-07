import React from 'react';
import { Form, Input, Button, MessagePlugin, Upload } from 'tdesign-react';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { getAva } from '../../utils/index';
import './index.scss';
const { FormItem } = Form;

export default function BaseForm() {
  const form = React.createRef();
  const navigate = useNavigate();
  const { registerStore } = useStore();
  let codeimg = getAva();
  const onSubmit = async (e) => {
    console.log(e);
    if (e.validateResult === true) {
      const res = await registerStore.register({
        avatar: codeimg,
        username: e.e.target[0].value,
        password: e.e.target[1].value,
      });
      if (res.code === 0) {
        MessagePlugin.success('注册成功');
        navigate(-1);
      } else MessagePlugin.error('注册失败');
    }
  };

  // 自定义异步校验器
  function rePassword(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(form.current.getFieldValue('password') === val);
        clearTimeout(timer);
      });
    });
  }

  // 自定义校验器，不同的值输出不同的校验结果。支持异步校验（文案选自某密码重置站点，如有侵权，请联系我们删除）
  function passwordValidator(val) {
    if (val.length < 4) {
      return {
        result: false,
        message: '密码长度不小于4！',
        type: 'warning',
      };
    }
    return {
      result: true,
      type: 'success',
    };
  }

  function beforeUpload(file) {
    //读取文件的字符流
    console.log(file[0]);
    const reader = new FileReader();
    //将文件读取为 DataURL 以data:开头的字符串
    reader.readAsDataURL(file[0]);
    reader.onload = (e) => {
      // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
      codeimg = e.target.result;
      console.log(code);
    };
  }

  const rules = {
    account: [
      { required: true, message: '姓名必填', type: 'error' },
      { min: 2, message: '至少需要两个字', type: 'error' },
    ],
    password: [
      { required: true, message: '密码必填', type: 'error' },
      // 不同的校验结果有不同的错误信息提醒，切错误信息类型不同
      { validator: passwordValidator },
    ],
    rePassword: [
      // 自定义校验规则
      { required: true, message: '密码必填', type: 'error' },
      { validator: rePassword, message: '两次密码不一致' },
    ],
  };

  return (
    <div className='register'>
      <div className='register-container p-7'>
        <p className=' flex justify-center pb-3 text-lg text-slate-700'>
          慕课在线学习平台
        </p>
        <Form
          ref={form}
          statusIcon={true}
          onSubmit={onSubmit}
          labelWidth={100}
          rules={rules}>
          <FormItem label='头像' name='avatar'>
            <Upload
              name='avatar'
              autoUpload={false}
              action='https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo'
              theme='image'
              tips='请选择单张图片文件上传'
              accept='image/*'
              onSelectChange={beforeUpload}></Upload>
          </FormItem>
          <FormItem label='用户名' name='account'>
            <Input />
          </FormItem>
          <FormItem label='密码' name='password' initialData=''>
            <Input />
          </FormItem>
          <FormItem label='确认密码' name='rePassword' initialData=''>
            <Input />
          </FormItem>
          <FormItem style={{ marginLeft: 120 }}>
            <Button
              theme='default'
              onClick={() => {
                navigate(-1);
              }}>
              返回
            </Button>
            <Button
              theme='primary'
              type='submit'
              style={{ marginLeft: '100px' }}>
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
