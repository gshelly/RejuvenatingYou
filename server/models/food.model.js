const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "food name is required"], 
        trim:true
      },
      protein: {
          type: Number,
          required: [true, "protein is required"]
        },
        carb: {
          type: Number,
          required: [true, "carb is required"]
        },
        fat:{
          type: Number,
          required: [true, "carb is required"]
        },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
