const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The Username is required"],
    },

    password: {
      type: String,
      required: [true, "The password is required"],
    },

    height: {
      type: Number,
      required: [true, "Please enter a valid height"],
    },

    initialWeight: {
      type: Number,
      required: [true, "Please enter a valid weight"],
    },

    age: {
      type: Number,
      required: [true, "Please enter valid age"],
    },

    activityLevel: {
      type: String,
      required: [true, "Please enter your activity level"],
      enum: [
        "noActivity",
        "lightActivity",
        "moderateActivity",
        "heavyActivity",
      ],
    },

    weights: {
      type: Array,
    },

    meals: [
      {
        dateOfMeal: { type: String, required: true },
        breakfast: [{
          food_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
          }, 
          quantity: { type: Number, required: true }
          }],
        lunch: [{
          food_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
          }, 
          quantity: { type: Number, required: true }
          }],
        dinner: [{
          food_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
          }, 
          quantity: { type: Number, required: true }
          }]
      }
    ]
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "The passwords don't match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => console.log(err));
});

module.exports = mongoose.model("User", UserSchema);
