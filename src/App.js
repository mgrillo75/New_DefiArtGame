import { React } from "react";
import { createStore, action, StoreProvider, persist } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import MainRouter from "./routes";

const store = createStore(
  persist({
    wallet: {
      accounts: [],
      update: action((state, payload) => {
        state.accounts.push(payload);
      }),
      clear: action((state) => {
        state.accounts = [];
      }),
    },
  })
);

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
