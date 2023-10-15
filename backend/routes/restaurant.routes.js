module.exports = (app) => {
    const restaurants = require("../controllers/restaurant.controller");

    var router = require("express").Router();

    // Submit a new restaurant
    router.post("/addRestaurant", restaurants.create);

    // Retrieving a random restaurant
    router.get("/getRandomRestaurant", restaurants.findOneRandom);

    app.use('/api/restaurant', router);
};