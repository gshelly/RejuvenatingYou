const FoodControllers = require("../controllers/food.controllers");
const { authenticate } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.get("/api/foods/findAll",authenticate, FoodControllers.findAll);
  app.post("/api/foods/create",authenticate, FoodControllers.create);
  app.put("/api/foods/update/:id",authenticate, FoodControllers.update);
  app.delete("/api/foods/delete/:id",authenticate, FoodControllers.deleteOne);
};
