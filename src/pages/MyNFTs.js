import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import "../components/gallery/card.css";
const MyNFTs = () => {
  const currentAccount = useStoreState((state) => state.wallet.account);
  const [assets, setAssets] = useState([]);
  const [parkData, setParkData] = useState({
    level: 0,
    network: "",
  });
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount.length === 0) {
          setAssets([]);
          return;
        }
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

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {assets.length > 0 ? (
        assets.map((asset) => {
          return (
            <div key={asset.token_id}>
              <div class="card">
                <div class="card-top">
                  <h1>{asset.name}</h1>
                  <div>
                    <div class="card-body mb-4">
                      <img
                        src={asset.image_url}
                        alt="nft"
                        className="img-fluid"
                      />
                      <div className="mb-4">
                        <h5>Description</h5>
                        {asset.description}
                      </div>
                      <h5>Select Parking Garage Level:</h5>
                      <button className="btn btn-success btn-large">
                        Park NFT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No NFTs On OpenSea</h1>
      )}

      {console.log(assets)}
    </div>
  );
};

export default MyNFTs;
