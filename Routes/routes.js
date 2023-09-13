const route = require("express").Router();

const {
  Register,
  Login,
  checkLoggedIn,
  logOut,
  saveRecipe,
  getSavedRecipe,
  getComments,
  getUserData,
} = require("../controller/controller");

const auth = require("../middleware/auth");

route.post("/register", Register);

route.post("/login", Login);

route.get("/checkloggedin", checkLoggedIn);

route.get("/logout", logOut);

route.put("/saverecipe", saveRecipe);

route.get("/getsaveredcipe", getSavedRecipe);

route.get("/getcomments", getComments);

route.get("/getuserdata", getUserData);

module.exports = route;
