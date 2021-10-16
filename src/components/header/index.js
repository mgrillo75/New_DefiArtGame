/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { ethers } from "ethers";

// import style
import "./style.scss";

// import images
import Fox from "../../assets/fox.svg";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const INFURA_ID = "";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
};

const web3ModalMainnet = new Web3Modal({
  network: "mainnet",
  providerOptions,
});

const ConnectButton = ({ web3Modal, onProviderSelected, chainName }) => {
  return (
    <button
      className="btn-metamask"
      onClick={async () => {
        console.log("on click...");
        try {
          const web3Provider = await web3Modal.connect();
          console.log({ web3Provider });
          // Subscribe to accounts change
          web3Provider.on("accountsChanged", (accounts) => {
            console.log({ accounts });
          });

          // Subscribe to chainId change
          web3Provider.on("chainChanged", (chainId) => {
            console.log({ chainId });
          });

          // Subscribe to provider connection
          web3Provider.on("connect", (info) => {
            console.log("connected..", info);
            console.log({ info });
          });

          // Subscribe to provider disconnection
          web3Provider.on("disconnect", (error) => {
            console.log({ error });
          });

          onProviderSelected(web3Provider);
        } catch (err) {
          console.log("error while connecting wallet", err);
        }
      }}
    >
      <img src={Fox} alt="metamask-img" className="img-fluid pr-5" width="25" />
      Connect to {chainName}
    </button>
  );
};

const Header = ({ currentAccount }) => {
  const [provider, setProvider] = useState(null);
  const [web3ModalProvider, setWeb3ModalProvider] = useState(null);
  const [signer, setSigner] = useState(
    provider !== null ? provider.getSigner() : null
  );

  useEffect(() => {
    if (provider !== null) setSigner(provider.getSigner());
    console.log({ provider });
  }, [provider]);

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (signer !== null) {
      signer.getAddress().then((_address) => setAddress(_address));
    }
    console.log({ signer });
  }, [signer]);

  useEffect(() => {
    if (provider !== null && address !== "") {
      provider.getBalance(address).then((bal) => setBalance(bal));
    }
  }, [address, provider]);

  useEffect(() => {
    if (web3ModalProvider !== null) {
      setProvider(new ethers.providers.Web3Provider(web3ModalProvider));
    }
    console.log({ web3ModalProvider });
  }, [web3ModalProvider]);

  // Modal Hooks
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function sendEth(amount) {
    //Get address

    const account = await signer.getAddress();
    const balance = await provider.getBalance(account);

    if (Number(ethers.utils.formatUnits(balance, 18)) > amount) {
      try {
        await signer.sendTransaction({
          to: currentAccount[0].toString(),
          value: ethers.utils.parseEther(String(amount)),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Insufficient balance to do the transfer!");
    }
  }

  const logout = useCallback(async () => {
    // await web3ModalBinance.clearCachedProvider();
    await web3ModalMainnet.clearCachedProvider();
    setWeb3ModalProvider(null);
    setProvider(null);
    setAddress("");
    setBalance(0);
  }, [web3ModalMainnet]);

  const onProviderSelected = useCallback((_provider) => {
    console.log("on provider selected");
    setWeb3ModalProvider(_provider);
    handleShow();
  }, []);

  return (
    <Fragment>
      {provider !== null ? (
        <Fragment>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Account Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h4>Account:</h4>
                <p>{address}</p>
              </div>
              <div>
                <h4>Balance:</h4>
                <p>{ethers.utils.formatEther(balance)}</p>
              </div>
            </Modal.Body>
          </Modal>
        </Fragment>
      ) : (
        ""
      )}
      <div className="container">
        <div className="header-container">
          {provider !== null ? (
            <Fragment>
              <button
                className="btn-metamask-disconnect"
                onClick={() => {
                  sendEth(0.001);
                }}
              >
                Send Eth
              </button>
              <button
                className="btn-metamask-disconnect"
                onClick={() => {
                  logout();
                }}
              >
                Disconnect
              </button>
              <button
                className="btn-metamask-disconnect"
                onClick={() => {
                  handleShow();
                }}
              >
                See Account Details
              </button>
            </Fragment>
          ) : (
            <>
              <ConnectButton
                chainName="Ethereum"
                web3Modal={web3ModalMainnet}
                onProviderSelected={onProviderSelected}
              />
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
