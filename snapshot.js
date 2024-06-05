
const fs = require('fs');
const url = `https://mainnet.helius-rpc.com/?api-key=1e5c6ee1-43bd-46c1-9914-1ef8ff9e9c8e`;

const getAssetsByCreator = async () => {
  let page = 1;
  let allMintAddresses = [];

  while (true) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: `my-id-page-${page}`,
        method: 'getAssetsByCreator',
        params: {
          creatorAddress: 'GFQBHxuNcAwYwHtEpggMwbH5kwV6Ne4JowHbLVfsMC6C',
          onlyVerified: true,
          page: page,
          limit: 1000
        },
      }),
    });

    const { result } = await response.json();

    // If there are no more items, break the loop
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }else{
      if (!result.items || result.items.length === 0) {
        break;
      }
    }

    // Extract mint addresses and add them to the list
    const mintAddresses = result.items.map(item => item.id); 
    allMintAddresses.push(...mintAddresses);

    // Check if there are less than 1000 results to stop further requests
    if (result.items.length < 1000) {
      break;
    }

    page++;
  }

  // Join the addresses by comma
  const addressesString = allMintAddresses.join(',');
  console.log("All Mint Addresses: ", addressesString);
  fs.writeFileSync('addresses.json', JSON.stringify(allMintAddresses, null, 2));
};

getAssetsByCreator();
