import { lazy, Suspense, useState, Component } from "react";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import "./style.css";
import { BrowserRouter } from "react-router-dom";

const Statistic = lazy(() => import("healthy_front_statistic/app"));
const Account = lazy(() => import("healthy_front_account/app"));

// @ts-ignore
class ErrorBoundary extends Component {
  /* @ts-ignore */
  constructor(props) {
    super(props);
    // @ts-ignore
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /* @ts-ignore */
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // @ts-ignore
    logErrorToMyService(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    // @ts-ignore
    return this.props.children;
  }
}

// const Acc = () => <p>This is acc</p>
// const Stat = () => <p>This is stat</p>

export const App = () => {
  const [isAppendStatistic, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <BrowserRouter basename="/">
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
          {[
            {
              to: "/statistic",
              title: "Stat",
            },
            {
              to: "/account",
              title: "Acc",
            },
          ].map(({ to, title }) => {
            return (
              <div>
                <NavLink to={to}>{title} </NavLink>
              </div>
            );
          })}
        </div>

        <div
          style={{
            flexGrow: 1,
            border: "1px solid red",
          }}
        >
          This is a layput! V4
          <Routes>
            <Route
              path="/statistic"
              element={
                <Suspense fallback={<>...</>}>
                  {/* @ts-ignore */}
                  <ErrorBoundary>
                    <Statistic />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<>...</>}>
                  {/* @ts-ignore */}
                  <ErrorBoundary>
                    <Account />
                  </ErrorBoundary>
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
