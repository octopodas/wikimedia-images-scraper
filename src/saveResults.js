const fs = require('fs/promises');
const path = require('path');

async function saveSearchResults(searchTerm, images) {
  try {
    // Create results directory if it doesn't exist
    const resultsDir = path.join(process.cwd(), 'results');
    await fs.mkdir(resultsDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${searchTerm}_${timestamp}.json`;
    const filepath = path.join(resultsDir, filename);

    // Format the data
    const searchResults = {
      searchTerm,
      timestamp: new Date().toISOString(),
      totalResults: images.length,
      images: images.map(image => ({
        title: image.title,
        url: image.url,
        dimensions: image.dimensions,
        type: image.mimeType,
        uploader: image.uploader,
        uploadDate: image.uploadDate,
        license: image.license,
        artist: image.artist,
        description: image.description,
        attribution: image.attribution
      }))
    };

    // Write to file
    await fs.writeFile(filepath, JSON.stringify(searchResults, null, 2));
    return { success: true, filepath };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = saveSearchResults; 