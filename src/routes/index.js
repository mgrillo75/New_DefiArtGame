import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages
import Home from "../pages/Home";
import Artists from "../pages/Artists";
import Buyers from "../pages/Buyers";
import Liquidity from "../pages/Liquidity";
import Header from "../components/header";
import MyNFTs from "../components/MyNFTs";

const MainRouter = () => {
  const [currentAccount, setCurrentAccount] = useState([""]);

  useEffect(() => {
    const walletCheck = async () => {
      const { ethereum } = window;

      if (!ethereum) return;

      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        setCurrentAccount(accounts);
      } catch (error) {
        console.log(error);
      }
    };
    walletCheck();
  }, []);

  useEffect(() => {
    console.log({ currentAccount });
  }, [currentAccount]);

  return (
    <>
      <Router>
        <Header currentAccount={currentAccount} />
        <Route exact path="/" component={Home} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/buyers" component={Buyers} />
        <Route exact path="/liquidity" component={Liquidity} />
        <Route exact path="/mynfts">
          <MyNFTs currentAccount={currentAccount} />
        </Route>
      </Router>
    </>
  );
};

export default MainRouter;
