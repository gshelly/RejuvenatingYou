const User = require("../models/user.model");
//const Food = require("../models/food.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const queriedUser = await User.findOne({ username: req.body.username });
      if (queriedUser) {
        res.status(402).json({ message: "username already in use" });
        return;
      }
    } catch (err) {
      res.status(400).json(err);
    }

    const newUser = new User(req.body);
    try {
      const newUserObj = await newUser.save();
      const usertoken = jwt.sign(
        { id: newUserObj._id },
        process.env.SECRET_KEY
      );
      console.log("usertoken", usertoken);
      res
        .cookie("usertoken", usertoken, process.env.SECRET_KEY, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })
        .json(newUserObj);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  login: async (req, res) => {
    let queriedUser;
    try {
      queriedUser = await User.findOne({ username: req.body.username });
      if (!queriedUser) {
        res.status(402).json({ message: "User not found!" });
        return;
      }
    } catch (err) {
      res.status(400).json(err);
      return;
    }

    const passwordCheck = bcrypt.compareSync(
      req.body.password,
      queriedUser.password
    );
    if (!passwordCheck) {
      res.status(403).json({ message: "Password does not match!" });
      return;
    }

    const usertoken = jwt.sign({ id: queriedUser._id }, process.env.SECRET_KEY);
    res
      .cookie("usertoken", usertoken, process.env.SECRET_KEY, {
        httpOnly: true,
      })
      .json(queriedUser);
  },

  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.json({ message: "logout successful" });
  },

  update: async (req, res) => {
    let queriedUser;
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    try {
      queriedUser = await User.findOne({ _id: decodedJwt.payload.id });
      if (!queriedUser) {
        res.status(400).json({ message: "user not found" });
        return;
      }
    } catch (err) {
      res.status(400).json(err);
      return;
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: decodedJwt.payload.id },
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  findOne: async (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    try {
      const queriedUser = await User.findOne({ _id: decodedJwt.payload.id });
      res.json(queriedUser);
    } catch (err) {
      res.status(400).json({ message: "error with finding the user" });
    }
  },
  //add new function for adding meal:
  addToMeal: async (req, res) => {
    const { body, params } = req;
    const dateofToday = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");
    //const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    //const userId = decodedJwt.payload.id;
    let mealIndex = body.meals.findIndex((el) => {
      return el.dateOfMeal === dateofToday;
    });

    if (mealIndex < 0) {
      body.meals.push({
        dateOfMeal: dateofToday,
        breakfast: [],
        lunch: [],
        dinner: [],
      });
      mealIndex = body.meals.length - 1;
    }

    const addFoodToMeal = (arr) => {
      const foodIndex = arr.findIndex((el) => {
        return el.food_id === params.id;
      });
      if (foodIndex >= 0) {
        let newQuantity = arr[foodIndex].quantity;
        arr[foodIndex].quantity = newQuantity + 1;
      } else {
        arr.push({ food_id: params.id, quantity: 1 });
      }
    };

    if (params.mealType == "breakfast") {
      const items = body.meals[mealIndex].breakfast;
      addFoodToMeal(items);
    } else if (params.mealType == "lunch") {
      const items = body.meals[mealIndex].lunch;
      addFoodToMeal(items);
    } else {
      const items = body.meals[mealIndex].dinner;
      addFoodToMeal(items);
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: body._id }, body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(error);
    }
  },

  //add new function for delete food from meal:
  deleteFromMeal: async (req, res) => {
    const { body, params } = req;
    const dateofToday = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");
    //You can also use mealIndex = body.meals.length -1 since the newest date is alway pushed into array
    const mealIndex = body.meals.findIndex((el) => {
      return el.dateOfMeal === dateofToday;
    });

    const deleteFoodFromMeal = (arr) => {
      const foodIndex = arr.findIndex((el) => {
        return el.food_id === params.id;
      });
      let currQuantity = arr[foodIndex].quantity;
      if (currQuantity > 1) {
        currQuantity -= 1;
        arr[foodIndex].quantity = currQuantity;
      } else {
        const updatedArr = arr.filter((item) => {
          return item.food_id !== params.id;
        });
        arr = updatedArr;
      }
    };

    if (params.mealType == "breakfast") {
      const items = body.meals[mealIndex].breakfast;
      deleteFoodFromMeal(items);
    } else if (params.mealType == "lunch") {
      const items = body.meals[mealIndex].lunch;
      deleteFoodFromMeal(items);
    } else {
      const items = body.meals[mealIndex].dinner;
      deleteFoodFromMeal(items);
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: body._id }, body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(error);
    }
  },
  //remove food item from meal:
  removeFromMeal: async (req, res) => {
    const { body, params } = req;
    const dateofToday = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");
    //You can also use mealIndex = body.meals.length -1 since the newest date is alway pushed into array
    const mealIndex = body.meals.findIndex((el) => {
      return el.dateOfMeal === dateofToday;
    });

    const itemRemovalFromMeal = (arr) => {
      const updatedMealItems = arr.filter((item) => {
        return item.food_id !== params.id;
      });
      arr = updatedMealItems;
    };

    if (params.mealType == "breakfast") {
      const items = body.meals[mealIndex].breakfast;
      itemRemovalFromMeal(items);
    } else if (params.mealType == "lunch") {
      const items = body.meals[mealIndex].lunch;
      itemRemovalFromMeal(items);
    } else {
      const items = body.meals[mealIndex].dinner;
      itemRemovalFromMeal(items);
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: body._id }, body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //Dispaly Meal:
  displayMeal: async (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    const userId = decodedJwt.payload.id;
    const { params } = req;
    const currDate = params.currDate.replace("-", "/").replace("-", "/");

    try {
      const currentUser = await User.findOne({ _id: userId })
        .populate({
          path: "meals",
          populate: [
            {
              path: "breakfast",
              populate: {
                path: "food_id",
                model: "Food",
              },
            },
            {
              path: "lunch",
              populate: {
                path: "food_id",
                model: "Food",
              },
            },
            {
              path: "dinner",
              populate: {
                path: "food_id",
                model: "Food",
              },
            },
          ],
        })
        .exec();
      let result = currentUser.meals.find((el) => el.dateOfMeal === currDate);
      console.log(result);
      if (!result) {
        res.json({});
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
