import { lazy, Suspense, useState } from "react";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import "./style.css";
import { BrowserRouter } from "react-router-dom";



const Statistic = lazy(() => import("healthy_front_statistic/app"));
const Account = lazy(() => import("healthy_front_account/app"));


// const Acc = () => <p>This is acc</p>
// const Stat = () => <p>This is stat</p>

export const App = () => {
  const [isAppendStatistic, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
  <BrowserRouter basename="/" >

    <div
      style={{
        border: "1px solid black",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "100%",
          border: "1px solid black",
        }}
      >

        {[{
          to: '/statistic',
          title: 'Stat'
        },  {
          to: '/account',
          title: 'Acc'
        }].map(({to, title}) => {
          return (
            <div>
              <NavLink to={to}  >{ title } </NavLink>
            </div>
          )
        })}

      </div>

      <div
        style={{
          flexGrow: 1,
          border: "1px solid red",
        }}
      >
        This is a layput!
        <Routes>
          <Route
            path="/statistic"
            element={
              <Suspense fallback={<>...</>}>
                <Statistic />
              </Suspense>
             }
          />
           <Route
            path="/account"
            element={ 
              <Suspense fallback={<>...</>}>
                <Account />
              </Suspense>
             }
          />
        </Routes>
      </div>
    </div>
  </BrowserRouter>

  );
};
