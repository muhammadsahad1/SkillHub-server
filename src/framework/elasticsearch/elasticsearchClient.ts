import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "YN8Bj5DK_Ud6xMDSJpq9",
  },
  tls: {
    rejectUnauthorized: false // Only use this for self-signed certificates
  }
});

export default client;