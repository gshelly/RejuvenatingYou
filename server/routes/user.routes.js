const UserController = require("../controllers/user.controllers");
const { authenticate } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.get("/api/users/getOne", authenticate, UserController.findOne);
  app.post("/api/users/register", UserController.register);
  app.post("/api/users/login", UserController.login);
  app.post("/api/users/logout", UserController.logout);
  app.put("/api/users/update", authenticate, UserController.update);
  //add new route for meal actions:
  app.put("/api/user/addtomeal/:id/:mealType",authenticate,UserController.addToMeal);
  app.put("/api/user/deletefrommeal/:id/:mealType", authenticate, UserController.deleteFromMeal);
  app.put("/api/user/removefrommeal/:id/:mealType", authenticate, UserController.removeFromMeal);
  //the currDate format must be as '2021/09/21'
  app.get("/api/meal/:currDate", authenticate, UserController.displayMeal);
};
