import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "YN8Bj5DK_Ud6xMDSJpq9", // Use the new password here
  },
  tls: {
    rejectUnauthorized: false, // Not recommended for production; ensure SSL validation in production
  },
});

export default client;
