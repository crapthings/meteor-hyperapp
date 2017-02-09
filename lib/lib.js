const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

graphql = new Lokka({
  transport: new Transport('http://localhost:4000/graphql')
})
