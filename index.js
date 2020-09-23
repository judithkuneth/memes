const axios = require('axios').default; //makes http requests, connects to a website
const cheerio = require('cheerio'); // provides an API for manipulating the resulting data, used for scraping
const fs = require('fs'); // used in download function
const request = require('request'); // used in download function

// Step 0: Create a new folder in case it does not exist using mkdirSync

const path = require('path');

// Check whether directory exists or not by using fs.exists() method
console.log('Checking for directory ' + path.join(__dirname, 'memes'));

fs.exists(path.join(__dirname, 'memes'), (exists) => {
  console.log(
    exists ? 'The directory already exists' : 'Folder does not exist yet!',
  );

  // Declare a function that creates a new Directory
  function createDir() {
    console.log('creating new folder');
    fs.mkdirSync(path.join(__dirname, 'memes'));
  }

  // Run function if directory does not exist

  exists ? console.log('starting download now') : createDir();
});

// Step 1: Connect to the website and read the HTML

const hostUrl = 'https://memegen.link/examples';

const fetchData = async () => {
  const result = await axios.get(hostUrl);
  return cheerio.load(result.data);
};

// Step 2: Declare a function to download the images

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

// Step 3: Declare a function that identiefies the Image and loops over the firs 10 to download them

const getImages = async () => {
  const $ = await fetchData();
  const images = $('.meme-img');
  const link = 'https://memegen.link';

  //Loop over the first 10 images:

  for (let i = 0; i < 10; i++) {
    const currentImage = images[i];
    const imageLink = link + currentImage.attribs.src;

    //Download 10 images:

    console.log(imageLink);
    download(imageLink, `./memes/${i}.jpg`, () => {
      console.log(`downloaded ${i}.jpg ✅`);
    });
  }
};

// Run function

getImages();
