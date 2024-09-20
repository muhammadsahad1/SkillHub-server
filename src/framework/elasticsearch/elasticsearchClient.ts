import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "elastic", // Use the new password here
  },
});

export default client;

// YN8Bj5DK_Ud6xMDSJpq9