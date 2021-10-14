import { useEffect, useState } from "react";
import axios from "axios";
import "./gallery/card.css";

const MyNFTs = ({ currentAccount }) => {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (currentAccount[0].length === 0) {
          const { data } = await axios.get(
            "https://api.opensea.io/api/v1/assets",
            {
              params: {
                owner: "0xb2ebc9b3a788afb1e942ed65b59e9e49a1ee500d",
                order_direction: "desc",
                offset: "0",
                limit: "20",
              },
            }
          );
          const filterAssets = data.assets.filter((asset) => {
            if (asset.name && asset.token_id && asset.image_url) {
              return asset;
            }
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
      {assets.length > 0
        ? assets.map((asset) => {
            return (
              <div key={asset.token_id}>
                <div class="card">
                  <div class="card-top">
                    <h1>{asset.name}</h1>
                    <div>
                      <div class="card-body">
                        {asset.image_url.length > 0 ? (
                          <img src={asset.image_url} alt="nft" />
                        ) : (
                          "No Image Available"
                        )}
                        {}
                        <h3>Description</h3>
                        {asset.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : "No NFTs On OpenSea"}

      {console.log(assets)}
    </div>
  );
};

export default MyNFTs;
