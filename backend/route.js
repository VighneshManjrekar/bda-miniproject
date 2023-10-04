const router = require("express").Router();
const User = require("./User.model");

router.get("/", (req, res) => {
  return res.status(200).send("Server running");
});

/*
    City wise purchases
    cities: ["Mumbai", "Pune", "Banglore", "Delhi", "Kolkata", "Chennai"]
*/
router.get("/city-wise-purchases", async (req, res) => {
  try {
    const cityPurchases = await User.aggregate([
      {
        $group: {
          _id: "$city",
          totalPurchases: { $sum: 1 },
        },
      },
    ]);
    res.json(cityPurchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    Product wise purchases
    products: ["Processor","Laptop","Keyboard","Mouse","Desktop","Charger","Speaker"]
*/
router.get("/product-wise-purchases", async (req, res) => {
  try {
    const productPurchases = await User.aggregate([
      {
        $group: {
          _id: "$product",
          totalPurchases: { $sum: 1 },
        },
      },
    ]);
    res.json(productPurchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Avergage product ratings
router.get("/product-average-ratings", async (req, res) => {
  try {
    const productAverageRatings = await User.aggregate([
      {
        $group: {
          _id: "$product",
          averageRatings: { $avg: "$ratings" },
        },
      },
      {
        $project: {
          _id: 1,
          averageRatings: { $ceil: "$averageRatings" },
        },
      },
    ]);
    res.json(productAverageRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Week wise purchases
router.get("/week-wise-purchases", async (req, res) => {
  try {
    const weekWisePurchases = await User.aggregate([
      {
        $match: {
          purchaseDate: {
            $gte: new Date("2023-04-01"),
            $lt: new Date("2023-05-01"),
          },
        },
      },
      {
        $group: {
          _id: {
            week: { $week: "$purchaseDate" },
            month: { $month: "$purchaseDate" },
          },
          totalPurchases: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          week: {
            $concat: ["Week ", { $toString: { $subtract: ["$_id.week", 12] } }],
          },
          totalPurchases: 1,
        },
      },
    ]);
    res.json(weekWisePurchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
