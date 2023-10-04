require("dotenv").config();
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./User.model");

const products = [
  "Processor",
  "Laptop",
  "Keyboard",
  "Mouse",
  "Desktop",
  "Charger",
  "Speaker",
];
const cities = ["Mumbai", "Pune", "Banglore", "Delhi", "Kolkata", "Chennai"];

const generateUsers = (num) => {
  const user = [];

  for (let i = 0; i < num; i++) {
    const fullName = faker.person.fullName();
    const email = faker.internet.email({
      firstName: fullName.split("")[0],
      lastName: fullName.split("")[0],
    });
    const ratings = faker.number.int({ min: 1, max: 5 });
    const reviews = faker.lorem.sentences(3);
    const product = products[Math.floor(Math.random() * products.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const purchaseDate = faker.date.between({
      from: "2023-03-31T18:30:00.000Z",
      to: "2023-04-30T18:30:00.000Z",
    });
    user.push({
      fullName,
      email,
      ratings,
      reviews,
      product,
      city,
      purchaseDate,
    });
  }

  User.insertMany(user)
    .then((docs) => {
      console.log(`${docs.length} users have been inserted into the database.`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      console.error(
        `${
          err.writeErrors?.length ?? 0
        } errors occurred during the insertMany operation.`
      );
      process.exit(0);
    });
};

generateUsers(100);
