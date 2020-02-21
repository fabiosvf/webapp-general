import React, { useState, useCallback } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { uuid } from "uuidv4";

function App() {
  const [isSigned, setIsSigned] = useState(false);

  console.log("App: ", isSigned);

  return (
    <BrowserRouter>
      <Routes isSigned={isSigned} setIsSigned={setIsSigned.bind(this)} />
    </BrowserRouter>
  );
}

function Routes({ ...rest }) {
  const { isSigned, setIsSigned } = rest;

  console.log("Routes: ", isSigned);

  return (
    <Switch>
      <RouteCustom
        exact
        path="/"
        component={SignIn}
        isSigned={isSigned}
        setIsSigned={setIsSigned.bind(this)}
      />
      <RouteCustom
        path="/home"
        component={Home}
        isPrivate
        isSigned={isSigned}
        setIsSigned={setIsSigned.bind(this)}
      />
      <RouteCustom
        path="/products"
        component={Products}
        isPrivate
        isSigned={isSigned}
        setIsSigned={setIsSigned.bind(this)}
      />
      <RouteCustom
        path="/contacts"
        component={Contacts}
        isPrivate
        isSigned={isSigned}
        setIsSigned={setIsSigned.bind(this)}
      />

      <RouteCustom
        path="*"
        component={PageNotFound}
        isSigned={isSigned}
        setIsSigned={setIsSigned.bind(this)}
      />
    </Switch>
  );
}

function RouteCustom({ component: Component, isPrivate = false, ...rest }) {
  const { isSigned, setIsSigned } = rest;

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
        <Layout isSigned={isSigned} setIsSigned={setIsSigned.bind(this)}>
          <Component
            {...props}
            isSigned={isSigned}
            setIsSigned={setIsSigned.bind(this)}
          />
        </Layout>
      )}
    />
  );
}

function Home() {
  return <div>Home</div>;
}

function Products() {
  const [products, setProducts] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");

  const removeProduct = useCallback(
    id => {
      setProducts([...products.filter(a => a.id !== id)]);
    },
    [products]
  );

  const addProduct = useCallback(
    e => {
      e.preventDefault();

      if (!newDescription) {
        alert("Campo descrição obrigatório");
        return;
      }

      if (!newValue) {
        alert("Campo valor obrigatório");
        return;
      }

      setProducts([
        {
          id: uuid(),
          description: newDescription,
          value: newValue
        },
        ...products
      ]);

      setNewDescription("");
      setNewValue("");
    },
    [newDescription, newValue, products]
  );

  return (
    <>
      <div>Products</div>
      <ul>
        {products.length === 0 ? (
          <li>Não há produtos cadastrados</li>
        ) : (
          products.map(prod => (
            <li key={prod.id}>
              {prod.description} - {prod.value}
              <button onClick={() => removeProduct(prod.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>

      <br />

      <form onSubmit={addProduct}>
        <input
          type="text"
          onChange={e => setNewDescription(e.target.value)}
          value={newDescription}
          placeholder="Informe a descrição do produto"
        />
        <input
          type="text"
          onChange={e => setNewValue(e.target.value)}
          value={newValue}
          placeholder="Informe o valor do produto"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

function Contacts() {
  return <div>Contacts</div>;
}

function SignIn({ ...rest }) {
  const { isSigned, setIsSigned } = rest;

  console.log("SignIn: ", isSigned);

  function handleSubmit(e) {
    setIsSigned(true);
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

function Header({ ...rest }) {
  const { isSigned, setIsSigned } = rest;

  console.log("Header: ", isSigned);

  function handleSignOut() {
    setIsSigned(false);
    return <Redirect to="/" />;
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

function DefaultLayout({ children, ...rest }) {
  const { isSigned, setIsSigned } = rest;

  console.log("DefaultLayout: ", isSigned);

  return (
    <>
      <Header isSigned={isSigned} setIsSigned={setIsSigned.bind(this)} />
      {children}
    </>
  );
}

function AuthLayout({ children, ...rest }) {
  const { isSigned } = rest;

  console.log("AuthLayout: ", isSigned);

  return <>{children}</>;
}

export default App;
