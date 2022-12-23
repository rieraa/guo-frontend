import { Routes, Route } from 'react-router-dom';
import LayoutPc from './pages/Layout';
import { HistoryRouter, history } from './utils/history';
import './App.css';

function App() {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <div className='App'>
          <Routes>
            {/* 创建路由 path 和对应组件的关系 */}
            {/* 需要鉴权的路由 */}
            <Route
              path='/'
              element={
                <AuthRoute>
                  <LayoutPc />
                </AuthRoute>
              }></Route>
            <Route path='/register' element={<Rejister />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </ConfigProvider>
    </HistoryRouter>
  );
}

export default App;
