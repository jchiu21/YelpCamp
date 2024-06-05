const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errror: '))
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '6655261965aa20bc57e8ed47',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum delectus reprehenderit ipsa atque neque optio, nam placeat in repellat ullam repellendus velit molestias, accusamus at consequatur illum. Velit, dicta suscipit.',
            price,
            geometry: {
              	type:"Point", 
              	coordinates:[
                cities[random1000].longitude,
				cities[random1000].latitude
				]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfjnosb7u/image/upload/v1717109172/YelpCamp/vwqjr3jrirsfybyryim5.jpg',
                  filename: 'YelpCamp/vwqjr3jrirsfybyryim5',
                },
                {
                  url: 'https://res.cloudinary.com/dfjnosb7u/image/upload/v1717109173/YelpCamp/jiel8bbbmrmtob16lavj.jpg',
                  filename: 'YelpCamp/jiel8bbbmrmtob16lavj',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})