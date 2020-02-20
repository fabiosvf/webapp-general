import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

const INITIAL_STATE = {
  isSigned: false
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSigned: true };
    case "SIGN_OUT":
      return { ...state, isSigned: false };
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

function Routes() {
  return (
    <Switch>
      <RouteCustom exact path="/" component={SignIn} />
      <RouteCustom path="/home" component={Home} isPrivate />
      <RouteCustom path="/products" component={Products} isPrivate />
      <RouteCustom path="/contacts" component={Contacts} isPrivate />

      <RouteCustom path="*" component={PageNotFound} />
    </Switch>
  );
}

function RouteCustom({ component: Component, isPrivate = false, ...rest }) {
  const isSigned = useSelector(state => state.isSigned);

  console.log("RouteCustom: ", isSigned);

  const { path } = rest;

  if (path !== "*") {
    if (!isSigned && isPrivate) {
      //SignIn
      return <Redirect to="/" />;
    }

    //Home
    if (isSigned && !isPrivate) {
      return <Redirect to="/home" />;
    }
  }

  var Layout = isSigned ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

function Home() {
  return <div>Home</div>;
}

function Products() {
  return <div>Products</div>;
}

function Contacts() {
  return <div>Contacts</div>;
}

function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch({ type: "SIGN_IN" });
  }

  return (
    <>
      <div>SignIn</div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Acessar</button>
      </form>
    </>
  );
}

function PageNotFound() {
  return <div>404 Page Not Found</div>;
}

function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch({ type: "SIGN_OUT" });
  }

  return (
    <>
      <div>Header</div>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/products">Products</Link>
        <br />
        <Link to="/contacts">Contacts</Link>
      </nav>
      <aside>
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </aside>
    </>
  );
}

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function AuthLayout({ children }) {
  return <>{children}</>;
}

export default App;
