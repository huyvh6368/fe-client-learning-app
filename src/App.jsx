import { Routes, Route, useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { publicRouter } from './routers'
import DefaultLayout from './layouts/DefaultLayout'
import './App.css';

function App() {
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
