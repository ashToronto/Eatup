const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
var cookieSession = require('cookie-session')
const env = require('dotenv').config()
const client = yelp.client(process.env.API_KEY);
const app = express();
const configuration = require('./knexfile.js')['development']
const knex = require('knex')(configuration);
const SocketServer = require('ws').Server;

app.use(cors());
app.use(bodyParser.json())

app.use(cookieSession({
  name: "session",
  keys: ["dgs"] //secret key
}));

const wss = new SocketServer({
  port: 3001
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  users = {
    type: "userCount",
    userCount: wss.clients.size
  };
  console.log(users)
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });

  wss.clients.forEach(client => {
    client.send(JSON.stringify(wss.clients.size));
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
  users = {
    type: "userCount",
    userCount: wss.clients.size
  };
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });
});

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  // console.log('ip address', ip)
});

const port = process.env.PORT || 8080;

//returns all the current events in the db - original
// app.get('/events', (req, res) => {
//   knex.select("*")
//   .from("events")
//   .then(eventList => {
//     console.log(eventList)
//      res.json(eventList)
//    })

// });

app.get('/events', (req, res) => {
  knex.raw('SELECT * FROM events LEFT JOIN attendees ON events.id  = attendees.events_id LEFT JOIN users ON attendees.users_id = users.id;').then((data) => {
    console.log(data.rows)

    var eventdata = data.rows.reduce(function(a, e) {
      if (a[e.events_id]) {
        a[e.events_id].names.push(e.name)
      } else {
        a[e.events_id] = {
          names: [e.name],
          event_name: e.event_name,
          restaurant_name: e.restaurant_name,
          restaurant_address: e.restaurant_address,
          description: e.description,
          event_start: e.event_start,
          event_end: e.event_end,
          event_id: e.events_id
        }
      }
      return a;
    }, {})
    res.json(eventdata);
    console.log(eventdata);

  })
});

//route to insert users into events
app.post('/joinEvent', (req, res) => {
  // console.log('inserting attendees', req.body)
  knex('attendees').returning('id').insert([{
    users_id: req.body.users_id,
    events_id: req.body.events_id
  }]).then(results => {
    knex.raw(`select name from users join (select users_id from attendees where events_id = ${req.body.events_id}) as A on users.id = A.users_id`).then(data => {

      // console.log('eventid nameS:', data.rows)

      var eventnames = data.rows.map(a => a.name)
      res.json(eventnames)
    })
  })
});

app.post('/leaveEvent', (req, res) => {
 console.log('deleting attendees', req.body)
 knex('attendees')
 .where({users_id: req.body.users_id, events_id: req.body.events_id})
 .del()
 .then(results => {
   knex.raw(`select name from users join (select users_id from attendees where events_id = ${req.body.events_id}) as A on users.id = A.users_id`)
   .then(data => {
     var eventnames = data.rows.map(a => a.name)
     // console.log(eventnames)
     res.json(eventnames)
   })
 })
});

app.post('/users/login', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (req.body.email === "" || req.body.password === "" || req.body.username === "") {
    return res.alert("Error: Email or Password is empty")
  } else {

    return knex('users').where({
      email: req.body.email,
      password: req.body.password,
      name: req.body.username
    }).then(function(data) {
      // console.log('login id', data[0].id)
      req.session.user_id = data[0].id;
      const currentUser = {
        id: data[0].id,
        username: username,
        email: email,
        password: password
      };
      return res.status(200).send(JSON.stringify(currentUser));
    })

    res.alert("Error: Email or Password is incorrect")
  }

});

app.post("/users/logout", (req, res) => {
  // console.log('logging out on server');
  req.session = null;
  res.redirect("/");
});

//To connect to real database:
app.post('/users/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (req.body.email === "" || req.body.password === "") {
    return res.status(400).send("Error: Email or Password Field is Empty")
  } else {

    knex('users').returning('id').insert([{
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    }]).then(function(id) {
      req.session.user_id = id[0];
      // console.log('register id', id[0])
      const currentUser = {
        id: id[0],
        username: username,
        email: email,
        password: password
      };
      res.status(200).send(JSON.stringify(currentUser));

    }).catch(function(error) {

      //need to fix this later to send right error message
      //res.status(400).send("Error: That email/username already exists. Please Try again!")

      console.error('Error:', error);
    });
  }

});

//events route
app.post('/events/:eventName/:restaurantName/:restaurantAddress/:description/:start/:end', (req, res) => {
  const eventName = req.params.eventName
  const restaurantName = req.params.restaurantName
  const description = req.params.description
  const start = req.params.start
  const end = req.params.end
  const id = knex('events').returning('id').insert([{
    event_name: req.params.eventName,
    restaurant_name: req.params.restaurantName,
    restaurant_address: req.params.restaurantAddress,
    description: req.params.description,
    event_start: req.params.start,
    event_end: req.params.end
  }]).then((data) => {
    knex.select('*').from('events').where('id', '=', data[0]).then(results => {
      // console.log(results)
      res.json(results)
    })
  });
});

app.post('/api/search/:category/:radius/:latitude/:longitude', (req, res) => {
  const category = req.params.category
  const radius = req.params.radius
  const latitude = req.params.latitude
  const longitude = req.params.longitude
  console.log(latitude + "" + longitude)
  client.search({
    latitude: latitude,
    longitude: longitude,
    categories: category,
    radius: radius
  }).then(response => {

    const businesses = response.jsonBody.businesses
    //console.log(businesses)
    const restaurantData = [];

    businesses.map(business => {
      const data = {
        name: business.name,
        image: business.image_url,
        addressString: business.location.display_address,
        address: business.location.address1,
        city: business.location.city,
        country: business.location.country,
        state: business.location.state,
        phone: business.display_phone,
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
