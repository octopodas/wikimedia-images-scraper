const fetch = require('node-fetch');

(async () => {
  const searchTerm = 'your search term';
  const numberOfImages = 3;

  const searchResponse = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json`);
  const searchData = await searchResponse.json();

  const pageIds = searchData.query.search.slice(0, numberOfImages).map(result => result.pageid);

  const imageInfoResponse = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&pageids=${pageIds.join('|')}&prop=imageinfo&iiprop=url&format=json`);
  const imageInfoData = await imageInfoResponse.json();

  // Process imageInfoData to extract URLs and construct embed codes

})();
