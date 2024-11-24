import searchWikimediaImages from './scrape.js';
import saveSearchResults from './saveResults.js';

async function main() {
  const searchTerm = process.argv[2];
  const numberOfImages = parseInt(process.argv[3]) || 3;

  if (!searchTerm) {
    console.error('Please provide a search term');
    console.log('Usage: node index.js "search term" [number of images]');
    process.exit(1);
  }

  console.log(`Searching for "${searchTerm}"...`);
  const result = await searchWikimediaImages(searchTerm, numberOfImages);

  if (!result.success) {
    console.error('Error:', result.error);
    process.exit(1);
  }

  // Save results to file
  const saveResult = await saveSearchResults(searchTerm, result.images);
  if (saveResult.success) {
    console.log(`\nResults saved to: ${saveResult.filepath}`);
  } else {
    console.error('Error saving results:', saveResult.error);
  }

  console.log('\nFound images:');
  result.images.forEach((image, index) => {
    console.log(`\n[Image ${index + 1}]`);
    console.log('Title:', image.title);
    console.log('URL:', image.url);
    console.log('Dimensions:', `${image.dimensions.width}x${image.dimensions.height}`);
    console.log('Type:', image.mimeType);
    console.log('Uploader:', image.uploader);
    console.log('Upload Date:', new Date(image.uploadDate).toLocaleDateString());
    console.log('License:', image.license);
    console.log('Artist:', image.artist);
    if (image.description) console.log('Description:', image.description);
    if (image.attribution) console.log('Attribution:', image.attribution);
  });
}

main().catch(console.error);