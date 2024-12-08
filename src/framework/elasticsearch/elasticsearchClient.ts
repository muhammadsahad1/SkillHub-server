import { Client } from "@elastic/elasticsearch";


const client = new Client({
  node: "http://localhost:9201",
  auth: {
    username: "elastic",
    password: "YN8Bj5DK_Ud6xMDSJpq9",
  },
  tls: {
    rejectUnauthorized: false // Only use this for self-signed certificates
  }
});

const checkElasticsearchConnection = async () => {
  try {
    const response: any = await client.info();
    if (response.statusCode === 200) {
      console.log("Elasticsearch server is connected");
      return true;
    } else {
      console.log("Elasticsearch server is not reachable. Status Code:", response.statusCode);
      return false;
    }
  } catch (error: any) {
    console.error("Error connecting to Elasticsearch:", error.message);
    return false;
  }
};


export default client;
export { checkElasticsearchConnection };