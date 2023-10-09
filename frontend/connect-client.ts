import { ConnectClient } from '@hilla/frontend';


const client = new ConnectClient({
  prefix: 'http://localhost:8080/connect',
});

export default client;