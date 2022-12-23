import { Layout, Popconfirm } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
// 连接react和mobx状态的
import { observer } from 'mobx-react-lite';
import { LogoutOutlined } from '@ant-design/icons';
import './index.scss';
const { Header, Sider } = Layout;
const LayoutPc = () => {
  //   const { userStore, loginStore } = useStore();
  // 区分角色变量
  const navigate = useNavigate();
  const onLogout = () => {
    // loginStore.loginOut();
    navigate('/login');
  };
  const onClick = (e) => {
    setSelectedKey(e.key);
  };

  //   useEffect(() => {
  //     async function getUserInfo() {
  //       const res = await userStore.getUserInfo();
  //       if (res.status === 1) {
  //         loginStore.loginOut();
  //         navigate('/login');
  //       }
  //     }
  //     getUserInfo();
  //   }, [userStore, loginStore, navigate]);

  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <div className='user-info'>
          <span className='user-name'>{'username'}</span>
          <span className='user-logout'>
            <Popconfirm
              title='是否确认退出？'
              okText='退出'
              cancelText='取消'
              onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      {/* 嵌套路由 */}
      <Outlet></Outlet>
    </Layout>
  );
};

export default observer(LayoutPc);
