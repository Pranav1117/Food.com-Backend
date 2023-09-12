const route = require("express").Router();

const {
  Register,
  Login,
  checkLoggedIn,
  logOut,
  saveRecipe,
  getSavedRecipe,
  getComments,
} = require("../controller/controller");

const auth = require("../middleware/auth");

route.post("/register", Register);

route.post("/login", Login);

route.get("/checkloggedin", checkLoggedIn);

route.get("/logout", logOut);

route.put("/saverecipe", saveRecipe);

route.get("/getsaveredcipe", getSavedRecipe);

route.get("/getcomments", getComments);

module.exports = route;
