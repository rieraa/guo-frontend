import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LayoutPc from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import StudyHome from './pages/Home';
import Chapter from './pages/Chapter';
import LearnVideo from './pages/LearnVideo';
import { AuthRoute } from './components/Auth';
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
            <Route path='chapter' element={<Chapter />} />

            <Route
              path='video'
              element={
                <AuthRoute>
                  <LearnVideo />
                </AuthRoute>
              }
            />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
