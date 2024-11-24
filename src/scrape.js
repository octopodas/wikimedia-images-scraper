const fetch = require('node-fetch');

async function searchWikimediaImages(searchTerm, numberOfImages = 3) {
  try {
    // Search for images directly using list=allimages
    const searchUrl = new URL('https://commons.wikimedia.org/w/api.php');
    searchUrl.search = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: `File:${searchTerm}`,  // Specifically search for files
      gsrnamespace: '6',  // File namespace
      gsrlimit: numberOfImages,
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|dimensions|mime|user|timestamp',
      format: 'json',
      origin: '*'
    }).toString();

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.query?.pages) {
      return { success: false, error: 'No results found' };
    }

    // Extract image URLs and metadata
    const images = Object.values(searchData.query.pages).map(page => {
      const imageInfo = page.imageinfo?.[0];
      return {
        title: page.title,
        url: imageInfo?.url,
        thumbUrl: imageInfo?.thumburl,
        dimensions: {
          width: imageInfo?.width,
          height: imageInfo?.height
        },
        mimeType: imageInfo?.mime,
        uploader: imageInfo?.user,
        uploadDate: imageInfo?.timestamp,
        description: imageInfo?.extmetadata?.ImageDescription?.value,
        license: imageInfo?.extmetadata?.License?.value,
        attribution: imageInfo?.extmetadata?.Attribution?.value,
        artist: imageInfo?.extmetadata?.Artist?.value,
        categories: imageInfo?.extmetadata?.Categories?.value
      };
    });

    return { success: true, images };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = searchWikimediaImages; 