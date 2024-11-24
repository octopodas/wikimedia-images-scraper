# Wikimedia Commons Image Scraper

A Node.js script that searches and retrieves image information from Wikimedia Commons based on a search term.

## Features

- Search Wikimedia Commons for images based on a keyword
- Retrieve detailed image information including:
  - Image URL
  - Title
  - Dimensions
  - MIME type
  - Uploader information
  - Upload date
  - License
  - Artist
  - Description (if available)
  - Attribution (if available)
- Save results to a JSON file for later use

## Prerequisites

- Node.js (v12 or higher recommended)
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the source code
2. Install dependencies:
```bash
npm install
```

## Usage

Run the script using Node.js with the following syntax:

```bash
node src/index.js "search term" [number of images]
```

### Parameters:
- `search term`: Required. The keyword(s) to search for on Wikimedia Commons
- `number of images`: Optional. The number of images to retrieve (defaults to 3)

### Example:

```bash
node src/index.js "cats" 5
```

## Output

The script provides two types of output:

1. **Console Output:**
   - Displays detailed information for each found image including:
     - Title
     - URL
     - Dimensions
     - File type
     - Uploader
     - Upload date
     - License
     - Artist
     - Description (if available)
     - Attribution (if available)

2. **File Output:**
   - Saves all retrieved data in JSON format
   - Files are saved in the `results` directory
   - Filename format: `search_term_YYYY-MM-DD_HH-mm-ss.json`

## Dependencies

- node-fetch: ^2.7.0 - Used for making HTTP requests to the Wikimedia API

## License

ISC

## Notes

- The script uses the Wikimedia Commons API to fetch image information
- All images retrieved are freely licensed under various open licenses
- The number of results may be limited by the Wikimedia API's restrictions
