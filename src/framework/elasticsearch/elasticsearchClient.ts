import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://justingeorge.site:9200',
  auth: {
    username: 'elastic',
    password: 'B_giGunk5pVra*U1NGop', // Use your actual Elasticsearch password
  },
  tls: {
    rejectUnauthorized: false // Only use this for testing. Remove in production!
  }
});

export default client;