import axios from "axios";
import msal from "@azure/msal-node";

// Replace with your tenant ID, client ID, and client secret
const tenantId = "YOUR_TENANT_ID";
const clientId = "YOUR_CLIENT_ID";
const clientSecret = "YOUR_CLIENT_SECRET";

// MSAL configuration
const config = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret: clientSecret,
  },
};

// Create MSAL Confidential Client Application
const cca = new msal.ConfidentialClientApplication(config);

// Define the scope for Microsoft Graph API
const scopes = ["https://graph.microsoft.com/.default"];

// Function to authenticate and get access token
const getAccessToken = async () => {
  try {
    const result = await cca.acquireTokenByClientCredential({ scopes });
    return result.accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

// Function to list files and generate shareable links
const listFilesAndGenerateLinks = async () => {
  try {
    const accessToken = await getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    // List files in the root directory of OneDrive
    const listFilesResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me/drive/root/children",
      { headers }
    );
    const files = listFilesResponse.data.value;

    for (const file of files) {
      const itemId = file.id;

      // Create a shareable link
      const shareLinkResponse = await axios.post(
        `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/createLink`,
        { type: "view", scope: "anonymous" },
        { headers }
      );

      const shareLink = shareLinkResponse.data.link.webUrl;
      console.log(`File: ${file.name}, Shareable Link: ${shareLink}`);
    }
  } catch (error) {
    console.error("Error listing files or generating links:", error);
  }
};

// Execute the function
listFilesAndGenerateLinks();
