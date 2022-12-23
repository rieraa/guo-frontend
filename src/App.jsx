import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LayoutPc from './pages/Layout';

import StudyHome from './pages/Home';

function App() {
  return (
    //路由配置
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {/* 创建路由 path 和对应组件的关系 */}
          {/* 需要鉴权的路由 */}
          <Route
            path='/'
            element={
              // <AuthRoute>
              <LayoutPc />
              // </AuthRoute>
            }>
            <Route index element={<StudyHome />} />
          </Route>
          {/* <Route path='/register' element={<Rejister />} />
            <Route path='/login' element={<Login />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
