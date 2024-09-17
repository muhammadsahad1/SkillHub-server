import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: 'https://justingeorge.site:9200',
  auth : {
    username : 'elastic',
    password : process.env.ELASTICSEARCH_PASSWORD,
  }
})

export default client