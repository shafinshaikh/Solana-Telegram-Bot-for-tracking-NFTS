require('dotenv').config();

const fs = require('fs');
const HELIUS_API = process.env.HELIUS_API;
const HELIUS_WEBHOOK_ID = process.env.HELIUS_WEBHOOK_ID


const editWebhook = async () => {
    try {
      // Read the JSON file
      const addresses = JSON.parse(fs.readFileSync('addresses.json', 'utf8'));
  
      const response = await fetch(
        `https://api.helius.xyz/v0/webhooks/${HELIUS_WEBHOOK_ID}?api-key=${HELIUS_API}`,
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
