import { Client } from "@elastic/elasticsearch";
const client = new Client({
    node: "http://localhost:9201",
    auth: {
        username: "elastic",
        password: "YN8Bj5DK_Ud6xMDSJpq9", // Use the new password here
    },
});
export default client;
