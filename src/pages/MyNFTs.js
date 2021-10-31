import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";

import { ethers } from "ethers";

import "../components/gallery/card.css";

const txAccounts = {
  eth: "0xC39F570481EFA0C835FD2dcfEE347c521Ef8F5bb",
};

const MyNFTs = ({ provider, signer }) => {
  const currentAccount = useStoreState((state) => state.wallet.account);
  const [assets, setAssets] = useState([]);
  const [parkData, setParkData] = useState({
    level: 0,
    network: "",
  });
  const [ethPrice, setEthPrice] = useState(0);
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount.length === 0) {
          setAssets([]);
          return;
        }

        const ethApi = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          { params: { ids: "ethereum", vs_currencies: "usd" } }
        );
        setEthPrice(ethApi.data.ethereum.usd);

        const { data } = await axios.get(
          "https://api.opensea.io/api/v1/assets",
          {
            params: {
              owner: currentAccount,
              order_direction: "desc",
              offset: "0",
              limit: "20",
            },
          }
        );
        const filterAssets = data.assets.filter((asset) => {
          if (!asset.name || !asset.token_id || !asset.image_url) {
            return null;
          }
          return asset;
        });

        setAssets(filterAssets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssets();
  }, [currentAccount]);

  const handleChange = (e) => {
    setParkData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    console.log(parkData);

    try {
      const txCost = parkData.level / ethPrice;

      await signer.sendTransaction({
        to: txAccounts.eth,
        value: ethers.utils.parseEther(String(txCost)),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {console.log(ethPrice)}
      {assets.length > 0 ? (
        assets.map((asset) => {
          return (
            <div key={asset.token_id}>
              <div class="card">
                <div class="card-top">
                  <h1>{asset.name}</h1>
                  <img src={asset.image_url} alt="nft" className="img-fluid" />
                </div>

                <div class="card-body mb-4">
                  <div className="mb-4">
                    <h5>Description</h5>
                    {asset.description}
                  </div>
                  <h5>Select Parking Garage Level:</h5>
                  <div className="input-group mb-3 text-center">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect01"
                      >
                        Parking Level
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01"
                      onChange={handleChange}
                      name="level"
                    >
                      <option value=""></option>
                      <option value="10">$10</option>
                      <option value="25">$25</option>
                      <option value="50">$50</option>
                    </select>
                  </div>
                  <div className="input-group mb-3  text-center">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect01"
                      >
                        Network
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01 "
                      onChange={handleChange}
                      name="network"
                    >
                      <option value=""></option>
                      <option value="avax">AVAX</option>
                      <option value="poly">POLY</option>
                      <option value="eth">ETH</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-success btn-large"
                    onClick={handleSubmit}
                  >
                    Park NFT
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No NFTs On OpenSea</h1>
      )}
    </div>
  );
};

export default MyNFTs;
