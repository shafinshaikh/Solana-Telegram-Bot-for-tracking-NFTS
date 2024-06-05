const fs = require('fs');

const editWebhook = async () => {
    try {
      // Read the JSON file
      const addresses = JSON.parse(fs.readFileSync('addresses.json', 'utf8'));
  
      const response = await fetch(
        "https://api.helius.xyz/v0/webhooks/?api-key=1e5c6ee1-43bd-46c1-9914-1ef8ff9e9c8e",
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            webhookURL: "https://telegramquantumbot.shafinshaikh25.workers.dev/",
            transactionTypes: ["NFT_LISTING","NFT_SALE"],
            accountAddresses: addresses,  // Use the addresses from the file
            webhookType: "enhanced"
          }),
        }
      );
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.error("error", e);
    }
  };
  
  editWebhook();
