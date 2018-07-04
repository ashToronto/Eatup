const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = process.env.PORT || 8080;

app.post('/users/:username/:email/:password', (req, res) => {
  const username = req.params.username
  const email = req.params.email
  const password = req.params.password
  console.log(username)
  console.log(email)
  console.log(password)
});

app.post('/events/:eventName/:restaurantName/:restaurantAddress/:description/:start/:end', (req, res) => {
  const eventName = req.params.eventName
  const restaurantName = req.params.restaurantName
  const restaurantAddress = req.params.restaurantAddress
  const description = req.params.description
  const start = req.params.start
  const end = req.params.end
  console.log(eventName)
  console.log(start)
  console.log(end)
  console.log(description)
  console.log(restaurantName)
  console.log(restaurantAddress)
})

app.post('/api/search/:category/:radius/:latitude/:longitude', (req, res) => {
  const category = req.params.category
  const radius = req.params.radius
  const latitude = req.params.latitude
  const longitude = req.params.longitude
  console.log(latitude)
  console.log(longitude)
  console.log(category)
  client.search({
    latitude: latitude,
    longitude: longitude,
    categories: category,
    radius: radius

  }).then(response => {
 // console.log(response.jsonBody.businesses)

 const businesses = response.jsonBody.businesses
     // console.log(businesses)
     const restaurantData = [];

     businesses.map(business => {
           const data = {
            name: business.name,
            image: business.image_url,
            address: business.location.display_address,
            phone:business.display_phone,
            money: business.price,
            rating: business.rating,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude
          };
           restaurantData.push(data)

         })

        res.send(restaurantData);

      }).catch(e => {
        console.log(e);
      });

    });

app.listen(port, () => console.log(`Listening on port ${port}`));
