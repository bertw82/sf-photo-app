/*
In order to hide my api key while deploying this project to Netlify I patched together a few tutorials to find the solution:
* https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
* https://github.com/DavidWells/netlify-functions-workshop/tree/master/lessons-code-complete/use-cases/13-returning-dynamic-images
*/
const fetch = require('isomorphic-fetch');

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  let images;
  try {
    const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&user_id=${process.env.REACT_APP_USERID}&format=json&nojsoncallback=1`);

    images = await response.buffer();
    return {
      statusCode: 200,
      headers: {
        'Content-type': 'image/jpeg'
      },
      body: images.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};