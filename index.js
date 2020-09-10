const axios = require('axios').default; //makes http requests, connects to a website
const cheerio = require('cheerio'); // provides an API for manipulating the resulting data, used for scraping
const fs = require('fs'); // used in download function
const request = require('request'); // used in download function

// Step 0: Create a new folder

const createDir = (dirPath) => {
  fs.mkdirSync(process.cwd() + dirPath, { recursive: true }, (error) => {
    if (error) {
      console.error('An error occurred: ', error);
    } else {
      console.log('Your directory is made!');
    }
  });
};
const path = '/memes';
createDir(path);

// Step 1: Connect to the website and read the HTML

const hostUrl = 'https://memegen.link/examples';

const fetchData = async () => {
  const result = await axios.get(hostUrl);
  return cheerio.load(result.data);
};

// Step 2: Write a function that identiefies the Image

const getImageUrl = async () => {
  const $ = await fetchData();
  const images = $('.meme-img');
  const link = 'https://memegen.link';

  // Step 3: Loop over the first 10 images

  for (let i = 0; i < 10; i++) {
    const currentImage = images[i];
    const imageLink = link + currentImage.attribs.src;
    console.log(imageLink);

    // Step 4: Write a function to download the images

    const download = (url, path, callback) => {
      request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback);
      });
    };
    download(imageLink, `./memes/${i}.jpg`, () => {
      console.log(`downloaded ${i}.jpg ✅`);
    });
  }
};

// Step 5: Download 10 images

getImageUrl();
