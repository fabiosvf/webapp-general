import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

// ************************************************************************
// REDUCER AUTH
const INITIAL_STATE_AUTH = {
  isSigned: false
};

function authReducer(state = INITIAL_STATE_AUTH, action) {
  switch (action.type) {
    case "@auth/SIGN_IN":
      return { ...state, isSigned: true };
    case "@auth/SIGN_OUT":
      return { ...state, isSigned: false };
    default:
      return state;
  }
}

// ACTION AUTH
function actionSignIn(email, password) {
  return {
    type: "@auth/SIGN_IN",
    payload: { email, password }
  };
}

function actionSignOut() {
  return {
    type: "@auth/SIGN_OUT"
  };
}

// ************************************************************************
// REDUCER PRODUCT
const INITIAL_STATE_PRODUCT = {
  products: []
};

function productReducer(state = INITIAL_STATE_PRODUCT, action) {
  switch (action.type) {
    case "@product/UPDATE":
      return {
        ...state,
        products: [
          ...state.products.filter(a => a.id !== action.payload.id),
          {
            id: action.payload.id,
            description: action.payload.description,
            value: action.payload.value
          }
        ]
      };
    case "@product/ADD":
      const newId =
        state.products.length === 0
          ? 1
          : Math.max.apply(
              null,
              state.products.map(item => item.id)
            ) + 1;

      console.log("productReducer - newId: ", newId);
      console.log("action: ", action);

      return {
        ...state,
        products: [
          ...state.products,
          {
            id: newId,
            description: action.payload.description,
            value: action.payload.value
          }
        ]
      };
    case "@product/REMOVE":
      return {
        ...state,
        products: [...state.products.filter(a => a.id !== action.payload.id)]
      };
    default:
      return state;
  }
}

// ACTION PRODUCT
function actionUpdateProduct(id, description, value) {
  return {
    type: "@product/UPDATE",
    payload: { id, description, value }
  };
}

function actionAddProduct(description, value) {
  return {
    type: "@product/ADD",
    payload: { description, value }
  };
}

function actionRemoveProduct(id) {
  return {
    type: "@product/REMOVE",
    payload: { id }
  };
}

// ************************************************************************
// COMBINE REDUCERS
// ************************************************************************
const store = createStore(
  combineReducers({ auth: authReducer, product: productReducer })
);

// ************************************************************************

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
  const isSigned = useSelector(state => state.auth.isSigned);

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
  const dispatch = useDispatch();

  //LOCAL STATE
  const [newId, setNewId] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");

  //GLOBAL STATE
  const products = useSelector(state => state.product.products);

  function clearLocalState() {
    setNewId(0);
    setNewDescription("");
    setNewValue("");
  }

  function handleSelectProduct(id, description, value) {
    setNewId(id);
    setNewDescription(description);
    setNewValue(value);
  }

  function handleRemoveProduct(id) {
    dispatch(actionRemoveProduct(id));

    clearLocalState();
  }

  function handleSubmitProduct(e) {
    e.preventDefault();

    // const id = e.target["id"].value;
    // const description = e.target["description"].value;
    // const value = e.target["value"].value;

    // console.log("id: ", id);
    // console.log("description: ", description);
    // console.log("value: ", value);

    console.log("newId: ", newId);
    console.log("newDescription: ", newDescription);
    console.log("newValue: ", newValue);

    if (!newDescription) {
      alert("Campo descrição obrigatório");
      return;
    }

    if (!newValue) {
      alert("Campo valor obrigatório");
      return;
    }

    if (newId === 0) dispatch(actionAddProduct(newDescription, newValue));
    else dispatch(actionUpdateProduct(newId, newDescription, newValue));

    clearLocalState();
  }

  return (
    <>
      <div>Products</div>
      <ul>
        {products.length === 0 ? (
          <li>Não há produtos cadastrados</li>
        ) : (
          products.map(prod => (
            <li
              style={
                prod.id === newId ? { color: "#ff0000" } : { color: "#000000" }
              }
              key={prod.id}
            >
              {prod.id} - {prod.description} - {prod.value}
              <button onClick={() => handleRemoveProduct(prod.id)}>
                Excluir
              </button>
              <button
                onClick={() =>
                  handleSelectProduct(prod.id, prod.description, prod.value)
                }
              >
                Selecionar
              </button>
            </li>
          ))
        )}
      </ul>

      <br />

      <form onSubmit={handleSubmitProduct}>
        <input type="hidden" name="id" value={newId} />
        <span>{newId}</span>
        <br />
        <input
          type="text"
          name="description"
          onChange={e => setNewDescription(e.target.value)}
          value={newDescription}
          placeholder="Informe a descrição do produto"
        />
        <br />
        <input
          type="text"
          name="value"
          onChange={e => setNewValue(e.target.value)}
          value={newValue}
          placeholder="Informe o valor do produto"
        />
        <br />
        <button type="button" onClick={() => clearLocalState()}>
          Reset
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function Contacts() {
  return <div>Contacts</div>;
}

function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    dispatch(actionSignIn(email, password));
  }

  return (
    <>
      <div>SignIn</div>
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Seu e-mail" />
        <input type="password" name="password" placeholder="Sua senha" />
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
    dispatch(actionSignOut());
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
