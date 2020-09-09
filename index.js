const cheerio = require('cheerio'); // implements a subset of core jQuery, removes all the DOM inconsistencies and browser cruft from the jQuery library

const axios = require('axios').default; //helps makeing html requests from browser

const siteUrl = 'https://memegen.link/examples';

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const getImage = async () => {
  const $ = await fetchData();
  const image = $('.meme-img');
  const link = 'https://memegen.link';
  // const imageSrc = link + image[0].attribs.src;

  for (let i = 0; i < 10; i++) {
    const imageSrc = link + image[i].attribs.src;
    console.log(imageSrc);
  }
};

getImage();

// console.log(firstImage);
