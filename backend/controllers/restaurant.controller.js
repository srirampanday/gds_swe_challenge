const db = require("../models");
const { sequelize } = db;
const Restaurant = db.restaurants;

exports.create = (req, res) => {
    // Validating the request
    if (!req.body.name) {
        res.status(400).send({
            message: "No Restaurant was submitted."
        });
        return;
    }
    else {
        // Creating a Restaurant
        const newRestaurant = {
            name: req.body.name,
        };

        // Saving the Restaurant in the database
        Restaurant.create(newRestaurant).then(result => {
            res.status(200).send({ data: result, message: "Restaurant submitted" });
        }).catch(err => {
            res.status(500).send({
                Message:
                    err.message || "Error submitting a restaurant"
            });
        });
    }
};

exports.findOneRandom = (req, res) => {

    Restaurant.findOne({
        order: sequelize.random(),
        limit: 1
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving a random restaurant"
        });
    });

};