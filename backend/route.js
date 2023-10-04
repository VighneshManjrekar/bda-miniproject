const router = require("express").Router();
const User = require("./User.model");

// To check server is running or not
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
      {
        $project: {
          _id: 0,
          label: "$_id",
          data: "$totalPurchases",
        },
      },
    ]);
    res.status(200).json(cityPurchases);
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
      {
        $project: {
          _id: 0,
          label: "$_id",
          data: "$totalPurchases",
        },
      },
    ]);
    res.status(200).json(productPurchases);
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
          _id: 0,
          label: "$_id",
          data: { $ceil: "$averageRatings" },
        },
      },
    ]);
    res.status(200).json(productAverageRatings);
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
            label: { $week: "$purchaseDate" },
            month: { $month: "$purchaseDate" },
          },
          data: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: {
            $concat: [
              "Week ",
              { $toString: { $subtract: ["$_id.label", 12] } },
            ],
          },
          data: 1,
        },
      },
    ]);
    const sortedWeekWiseSalesData = weekWisePurchases.sort((a, b) => {
      const weekA = parseInt(a.label.replace("Week ", ""));
      const weekB = parseInt(b.label.replace("Week ", ""));
      return weekA - weekB;
    });
    res.status(200).json(sortedWeekWiseSalesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Daily sales
router.get("/daily-sales", async (req, res) => {
  try {
    const dailySales = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$purchaseDate" },
            month: { $month: "$purchaseDate" },
            day: { $dayOfMonth: "$purchaseDate" },
          },
          data: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          data: 1,
        },
      },
    ]);

    res.status(200).json(dailySales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.use("/*", (req, res) => res.status(404).send("404: Route Doesn't Exists"));

module.exports = router;
