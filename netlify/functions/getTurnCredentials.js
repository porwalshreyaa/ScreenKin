const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const API_KEY = process.env.API_KEY;
  const response = await fetch(`https://screenkin.metered.live/api/v1/turn/credentials?apiKey=${API_KEY}`);
  const iceServers = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(iceServers)
  };
};
