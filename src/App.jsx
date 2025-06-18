import { Routes, Route, useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { publicRouter } from './routers'
import DefaultLayout from './layouts/DefaultLayout'
import './App.css';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra token khi khởi động app
    const learnerData = localStorage.getItem("learner");
    const token = localStorage.getItem('accessToken');
    const currentPath = window.location.pathname;
    if (learnerData === null && currentPath !== '/register') {
      navigate("/login");
    }
    // Chỉ chuyển hướng đến /login nếu không có token VÀ không đang ở trang đăng ký
    if (token === null && currentPath !== '/register') {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      {publicRouter.map((rou, index) => {
        const Layouts = rou.layout === null ? Fragment : DefaultLayout;
        const Page = rou.component;
        return (
          <Route
            key={index}
            path={rou.path}
            element={
              <Layouts>
                <Page />
              </Layouts>
            }
          />
        )

      })}
    </Routes>
  );
}

export default App;
