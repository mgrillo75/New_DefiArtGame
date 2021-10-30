import { React } from "react";
import { createStore, action, StoreProvider } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import MainRouter from "./routes";

const store = createStore({
  wallet: {
    accounts: [],
    update: action((state, payload) => {
      state.items.push(payload);
    }),
  },
});

const App = () => {
  return (
    <div className="App">
      <StoreProvider store={store}>
        <MainRouter />
      </StoreProvider>
    </div>
  );
};

export default App;
