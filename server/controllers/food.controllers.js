const Food = require("../models/food.model");
const jwt = require("jsonwebtoken");

const findAll = async (req, res) => {
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const userId = decodedJwt.payload.id;
  try {
    const allFoods = await Food.find({ user_id: userId })
      .populate("user_id")
      .exec();
    console.log(allFoods);
    res.json(allFoods);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req, res) => {
  const { body } = req;
  let newFood = new Food(body);
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  console.log(decodedJwt);
  newFood.user_id = decodedJwt.payload.id;
  console.log(newFood);
  try {
    newFood = await newFood.save();
    res.json(newFood);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedFood = await Food.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const deleteConfirmation = await Food.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteConfirmation);
  } catch (err) {
    res.status(400).json(error);
  }
};

module.exports = {
  findAll,
  create,
  update,
  deleteOne,
};
