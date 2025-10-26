const axios = require('axios');
const fs = require('fs');

axios.get('http://localhost:4000/api/search?q=matrix&page=1')
  .then(res => {
    fs.writeFileSync('movies.json', JSON.stringify(res.data, null, 2));
    console.log('JSON guardado en movies.json');
  })
  .catch(console.error);
