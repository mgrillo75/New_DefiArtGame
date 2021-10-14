import { useEffect, useState } from "react";
import axios from "axios";
import "./gallery/card.css";

const MyNFTs = ({ currentAccount }) => {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount[0].length > 0) {
          const { data } = await axios.get(
            "https://api.opensea.io/api/v1/assets",
            {
              params: {
                owner: currentAccount[0].toString(),
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssets();
  }, []);

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
                    <div class="card-body">
                      <img src={asset.image_url} alt="nft" />

                      <h3>Description</h3>
                      {asset.description}
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
