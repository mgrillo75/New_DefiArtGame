// import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
// import style
import "./style.scss";

// import images
import Fox from "../../assets/fox.svg";

const Header = ({ signer, provider }) => {
  const history = useHistory();
  const setCurrentAccount = useStoreActions((actions) => actions.wallet.update);
  const clearAccount = useStoreActions((actions) => actions.wallet.clear);
  const currentAccount = useStoreState((state) => state.wallet.account);
  // async function sendEth(amount) {
  //   //Get address

  //   const account = await signer.getAddress();
  //   const balance = await provider.getBalance(account);

  //   if (Number(ethers.utils.formatUnits(balance, 18)) > amount) {
  //     try {
  //       await signer.sendTransaction({
  //         to: currentAccount[0].toString(),
  //         value: ethers.utils.parseEther(String(amount)),
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert("Insufficient balance to do the transfer!");
  //   }
  // }
  return (
    <div className="container">
      <div className="header-container">
        <button className="btn btn-success" onClick={() => history.push("/")}>
          Home
        </button>
        <button
          className="btn btn-success"
          onClick={() => history.push("/mynfts")}
        >
          My NFTs
        </button>

        {console.log(currentAccount)}
        {currentAccount.length > 0 ? (
          <button
            className="btn-metamask-disconnect"
            onClick={() => {
              clearAccount();
            }}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="btn-metamask"
            onClick={async () => {
              if (provider) {
                const account = await provider.send("eth_requestAccounts", []);
                console.log(account.toString(), "ACCOUNT HEADER");
                setCurrentAccount(account.toString());
              } else {
                window.open("https://metamask.io/download");
              }
            }}
          >
            <img
              src={Fox}
              alt="metamask-img"
              className="img-fluid pr-5"
              width="25"
            />

            {provider ? "Connect to MetaMask" : "Download MetaMask"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
