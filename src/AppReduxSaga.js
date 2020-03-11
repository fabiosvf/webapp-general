import React, { useState } from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

import { Router, Switch, Route, Redirect, Link } from "react-router-dom";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { takeLatest, all, put, select } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

import { createBrowserHistory } from "history";

// ************************************************************************
// ACTION AUTH
function actionSignInRequest(email, password) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, password }
  };
}

function actionSignInSuccess(token, user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user }
  };
}

function actionSignFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}

function actionSignOut() {
  return {
    type: "@auth/SIGN_OUT"
  };
}

// ************************************************************************
// REDUCER AUTH
const INITIAL_STATE_AUTH = {
  token: null,
  user: null,
  isSigned: false,
  loading: false
};

function authReducer(state = INITIAL_STATE_AUTH, action) {
  switch (action.type) {
    case "@auth/SIGN_IN_REQUEST":
      return { ...state, loading: true };
    case "@auth/SIGN_IN_SUCCESS": {
      return {
        ...state,
        token: action.payload.token,
        isSigned: true,
        loading: false
      };
    }
    case "@auth/SIGN_FAILURE": {
      return {
        ...state,
        loading: false
      };
    }
    case "@auth/SIGN_OUT":
      return { ...state, token: null, user: null, isSigned: false };
    default:
      return state;
  }
}

// ************************************************************************
// SAGA AUTH

function* sagaSignIn({ payload }) {
  try {
    //const { email, password } = payload;
    const { password } = payload;

    //Envia o Email e Password para autenticar no servico
    // Utilizar o método call do redux-saga/effects

    //simula um erro de autenticação vindo do serviço
    if (password !== "123456") {
      throw new Error("Senha inválida");
    }

    //Simulando dados vindos do servico após autenticação com sucesso HTTP 200
    const response = {
      data: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc4NjI1MTA3LCJleHAiOjE1NzkyMjk5MDd9.lgCb5TIvk17Hhpd74gsR8Qe77K2wKO6Aet_Neu1KoSw",
        user: {
          id: 1,
          name: "Fabio Silva Ferreira",
          email: "demo@demo.com"
        }
      }
    };
    const { token, user } = response.data;

    //Outras consistências se forem necessárias

    //Neste ponto, registrar o cabeçalho da API com o token obtido
    //Exemplo
    //api.defaults.headers.Authorization = `Bearer ${token}`;

    //Atualiza o token e o usuario logado na Global Session
    yield put(actionSignInSuccess(token, user));
    alert("Sucesso ao logar no sistema");
    history.push("/home");
  } catch (err) {
    //Se o retorno da requisição for diferente do código 200
    if (err.message) alert(err.message);
    else alert("Falha na autenticação, verifique seus dados");
    yield put(actionSignFailure());
  }
}

function sagaSetToken({ payload }) {
  if (!payload) return;

  const { token } = payload.token;

  if (token) {
    //api.defaults.header.Authorization = `Bearer ${token}`;
  }
}

function sagaSignOut() {
  history.push("/");
}

function authSaga() {
  return all([
    //takeLatest("persist/REHYDRATE", sagaSetToken),
    takeLatest("@auth/SIGN_IN_REQUEST", sagaSignIn),
    takeLatest("@auth/SIGN_OUT", sagaSignOut)
  ]);
}

// ************************************************************************
// ACTION PRODUCT
function actionUpdateProductRequest(id, description, value) {
  return {
    type: "@product/UPDATE_REQUEST",
    payload: { id, description, value }
  };
}

function actionUpdateProductSuccess(id, description, value) {
  return {
    type: "@product/UPDATE_SUCCESS",
    payload: { id, description, value }
  };
}

function actionUpdateProductFailure() {
  return {
    type: "@product/UPDATE_FAILURE"
  };
}

function actionAddProductRequest(description, value) {
  return {
    type: "@product/ADD_REQUEST",
    payload: { description, value }
  };
}

function actionAddProductSuccess(id, description, value) {
  return {
    type: "@product/ADD_SUCCESS",
    payload: { id, description, value }
  };
}

function actionAddProductFailure() {
  return {
    type: "@product/ADD_FAILURE"
  };
}

function actionRemoveProductRequest(id) {
  return {
    type: "@product/REMOVE_REQUEST",
    payload: { id }
  };
}

function actionRemoveProductSuccess(id) {
  return {
    type: "@product/REMOVE_SUCCESS",
    payload: { id }
  };
}

function actionRemoveProductFailure() {
  return {
    type: "@product/REMOVE_FAILURE"
  };
}

// ************************************************************************
// REDUCER PRODUCT
const INITIAL_STATE_PRODUCT = {
  products: [],
  loading: false
};

function productReducer(state = INITIAL_STATE_PRODUCT, action) {
  switch (action.type) {
    case "@product/UPDATE_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "@product/UPDATE_SUCCESS":
      return {
        ...state,
        products: [
          ...state.products.filter(a => a.id !== action.payload.id),
          {
            id: action.payload.id,
            description: action.payload.description,
            value: action.payload.value
          }
        ],
        loading: false
      };
    case "@product/UPDATE_FAILURE":
      return {
        ...state,
        loading: false
      };
    case "@product/ADD_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "@product/ADD_SUCCESS":
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.payload.id,
            description: action.payload.description,
            value: action.payload.value
          }
        ],
        loading: false
      };
    case "@product/ADD_FAILURE":
      return {
        ...state,
        loading: false
      };
    case "@product/REMOVE_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "@product/REMOVE_SUCCESS":
      return {
        ...state,
        products: [...state.products.filter(a => a.id !== action.payload.id)],
        loading: false
      };
    case "@product/REMOVE_FAILURE":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

// ************************************************************************
// SAGA PRODUCT

function* sagaProductAdd({ payload }) {
  try {
    const { description, value } = payload;

    //Chama o serviço que grava no banco de dados
    //Caso ocorra algum erro, o sistema direcionará automaticamente para o catch

    //Simulando um erro durante o cadastro
    if (description === "Erro") {
      throw new Error("Não foi possível gravar o produto");
    }

    //Simulando a geração do ID PK gravado no banco de dados
    const newId = yield select(state =>
      state.product.products.length === 0
        ? 1
        : Math.max.apply(
            null,
            state.product.products.map(item => item.id)
          ) + 1
    );

    alert("Produto incluído com sucesso");

    yield put(actionAddProductSuccess(newId, description, value));
  } catch (err) {
    if (err.message) alert(err.message);
    else alert("Falha durante a inclusão do produto");
    yield put(actionAddProductFailure());
  }
}

function* sagaProductUpdate({ payload }) {
  try {
    const { id, description, value } = payload;

    //Chama o serviço que grava no banco de dados
    //Caso ocorra algum erro, o sistema direcionará automaticamente para o catch

    //Simulando um erro durante o cadastro
    if (description === "Erro") {
      throw new Error("Não foi possível gravar o produto");
    }

    alert("Produto alterado com sucesso");

    yield put(actionUpdateProductSuccess(id, description, value));
  } catch (err) {
    alert("Falha durante a alteração do produto");
    yield put(actionUpdateProductFailure());
  }
}

function* sagaProductRemove({ payload }) {
  try {
    const { id } = payload;

    //Chama o serviço que grava no banco de dados
    //Caso ocorra algum erro, o sistema direcionará automaticamente para o catch

    alert("Produto removido com sucesso");

    yield put(actionRemoveProductSuccess(id));
  } catch (err) {
    alert("Falha durante a exclusão do produto");
    yield put(actionRemoveProductFailure());
  }
}

function productSaga() {
  return all([
    takeLatest("@product/ADD_REQUEST", sagaProductAdd),
    takeLatest("@product/UPDATE_REQUEST", sagaProductUpdate),
    takeLatest("@product/REMOVE_REQUEST", sagaProductRemove)
  ]);
}

// ************************************************************************
// COMBINE REDUCERS, PERSISTOR, HISTORY, SAGA
// ************************************************************************

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer
});

// COMBINO TODAS AS SAGAS
function* rootSaga() {
  return yield all([authSaga(), productSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; //É possível relacionar outros middlewares nesse Array

const store = createStore(
  persistReducer(
    {
      key: "webapp1",
      storage,
      whitelist: ["product"],
      blacklist: ["auth"]
    },
    rootReducer
  ),
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

const history = createBrowserHistory();

// ************************************************************************

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
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
  return <div style={{ background: "#ee8888" }}>Home</div>;
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
    dispatch(actionRemoveProductRequest(id));

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

    // console.log("newId: ", newId);
    // console.log("newDescription: ", newDescription);
    // console.log("newValue: ", newValue);

    if (!newDescription) {
      alert("Campo descrição obrigatório");
      return;
    }

    if (!newValue) {
      alert("Campo valor obrigatório");
      return;
    }

    if (newId === 0) {
      // console.log(actionAddProductRequest(newDescription, newValue));
      dispatch(actionAddProductRequest(newDescription, newValue));
    } else {
      // console.log(actionUpdateProductRequest(newId, newDescription, newValue));
      dispatch(actionUpdateProductRequest(newId, newDescription, newValue));
    }

    clearLocalState();
  }

  return (
    <div style={{ background: "lightblue" }}>
      <div>Products</div>
      <ul>
        {products.length === 0 ? (
          <li>Não há produtos cadastrados</li>
        ) : (
          products.map(prod => (
            <li
              key={prod.id}
              style={
                prod.id === newId ? { color: "#ff0000" } : { color: "#000000" }
              }
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
    </div>
  );
}

function Contacts() {
  return <div style={{ background: "lightgreen" }}>Contacts</div>;
}

function SignIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    if (!email) {
      alert("Campo e-mail obrigatório");
      return;
    }

    if (!password) {
      alert("Campo senha obrigatório");
      return;
    }

    dispatch(actionSignInRequest(email, password));
  }

  return (
    <div style={{ background: "yellow" }}>
      <div>SignIn</div>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Sua senha"
        />
        <button type="submit">Acessar</button>
      </form>
    </div>
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
    <div style={{ background: "orange" }}>
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
    </div>
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
