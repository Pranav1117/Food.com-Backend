const User = require("../Models/User");
const Recipe = require("../Models/Recipes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getUser } = require("../Utilities/getUser");
dotenv.config();
const SECRET_KEY = process.env.secretKey;

const getComments = async (req, res) => {
  return res.send([
    {
      comment:
        "A recipe has no soul. You, as the cook, must bring soul to the recipe.",
      user: "Thomas Keller",
      time: "1 HOURS",
    },
    {
      comment: "Recipes tell you nothing. Learning techniques is the key.",
      user: "Tom Colicchio",
      time: "4 HOURS",
    },
    {
      comment:
        "This is my invariable advice to people: Learn how to cook- try new recipes, learn from your mistakes, be fearless, and above all have fun!",
      user: "Julia Child",
      time: "20 MINUTES",
    },
    {
      comment:
        "Don’t be afraid to adapt new ingredients into your own techniques, and traditional ingredients into new recipes.",
      user: "Jose Garces",
      time: "7 HOURS",
    },
    {
      comment:
        "Cooking is like love. It should be entered into with abandon or not at all.",
      user: " Harriet Van Horne",
      time: "10 MINUTES",
    },
    {
      comment:
        "What is the recipe for successful achievement? Choose a career you love. Give it the best there is in you. Seize your opportunities. And be a member of the team.",
      user: "Benjamin Franklin",
      time: "2 HOURS",
    },
    {
      comment:
        "I already enjoy cooking. I like different flavors and putting different things together and really like taking normal recipes to a higher level.",
      user: "Queen Latifah",
      time: "5 HOURS",
    },
    {
      comment:
        "Some of the recipes in the book have evolved for us. Many haven’t",
      user: "Thomas Keller",
      time: "30 MINUTES",
    },
    {
      comment: "Recipes tell you nothing. Learning techniques is the key.",
      user: "Tom Colicchio",
      time: "9 HOURS",
    },
    {
      comment:
        "The recipe for perpetual ignorance is: Be satisfied with your opinions and content with your knowledge.",
      user: "Elbert Hubbard",
      time: "10 MINUTES",
    },
    {
      comment: "Don’t let the secret recipe die with the inventor.",
      user: "Nathan Myhrvold ",
      time: "3 HOURS",
    },
    {
      comment:
        "cooking is like love. It should be entered into with abandon or not at all.",
      user: "Harriet Van Horne",
      time: "2 MINUTES",
    },
  ]);
};

const Register = async (req, res) => {
  // const { email, password } = req.body;

  // const isExist = await User.findOne({ email });
  // console.log(isExist, "-----------------exist");

  // if (isExist) {
  //   return res.send({ msg: "User Already Exists" });
  // }

  // const hashPass = bcrypt.hashSync(password, 10);

  // const tempObj = new User({
  //   email: email,
  //   password: hashPass,
  // });

  // await tempObj.save();
  // const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "3D" });

  // return res.send({
  //   msg: "User registred successfully",
  //   isLoggedIn: true,
  //   token: token,
  // });

  const { email, password } = req.body;
  const User1 = await User.findOne({ email });
  // console.log(User1.email === email, "user msgggg");

  if (User1 && User1.email === email) {
    console.log("in exist");
    return res.send({
      msg: "User already exists, please try a different user or login",
      token: null,
    });
  }

  const hashPass = bcrypt.hashSync(password, 10);

  const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "3D" });

  const tempObj = new User({
    email: email,

    password: hashPass,
  });

  await tempObj.save();
  // StoredData.push(tempObj);

  return res.send({
    msg: "User succesfully registered",
    token: token,
  });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const isExist = await User.findOne({ email: email });

  if (!isExist) {
    return res.send({
      msg: "User is not registered",
      isLoggedIn: false,
      token: null,
    });
  }

  try {
    console.log(typeof password, "------------pass");

    const isVerified = bcrypt.compareSync(password, isExist.password);

    if (isVerified) {
      console.log(isVerified);
      const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "3D" });

      return res.send({
        msg: "User logged in successfully",
        isLoggedIn: true,
        token: token,
      });
    } else {
      return res.send({
        msg: "please enter correct password",
        isLoggedIn: false,
        token: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      msg: "Something went Wrong",
      isLoggedIn: false,
      token: null,
    });
  }
};

const checkLoggedIn = async (req, res) => {
  const currentTime = Math.floor(Date.now() / 1000);

  const data = req.headers;
  const token = data.authorization.split(" ")[1];
  console.log(data.authorization.split(" ")[1], "sssssss---------------");

  if (token) {
    // const token1 = data.authorization.split(" ")[1];

    // const token = token1;
    try {
      const { exp, email } = jwt.verify(token, SECRET_KEY);

      if (email && exp > currentTime) {
        return res.send({ msg: "User is already logged in", isLoggedIn: true });
      } else {
        return res.send({ msg: "Session expired", isLoggedIn: false });
      }
    } catch (err) {
      console.log(err);
      return res.send({ msg: "something went wrong", isLoggedIn: false });
    }
  }
  return res.send({ msg: "Please Login", isLoggedIn: false });
};

const logOut = (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    console.log(token);

    return res.send({
      msg: "Logged Out Succesfully",
      token: null,
      isLoggedIn: false,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      msg: "Something went Wrong",
    });
  }
};

const saveRecipe = async (req, res) => {
  const data = await req.body;
  // console.log(data);
  const User1 = await getUser(req.headers);

  console.log("--------------", "saaassa");

  const t = await User.findOne({
    "saved_recipes.label": data.label,
  });
  console.log(t, "tttttttttttttttttttttttttt");
  let recipeAlreadyBook = false;

  if (t && t.saved_recipes.length > 0) {
    t.saved_recipes.forEach((recipe) => {
      if (recipe.hasOwnProperty("label")) {
        recipeAlreadyBook = true;
      }
    });
  }
  if (User1) {
    if (recipeAlreadyBook) {
      return res.send({ msg: "recipe already bookmarked", isSaved: false });
    }

    const w = await User1.updateOne({
      $push: { saved_recipes: data },
    });

    return res.send({ res: w, isSaved: true });
  }
  return res.send({ msg: "not saved", isSaved: false });
};

const getSavedRecipe = async (req, res) => {
  const user1 = await getUser(req.headers);
  console.log(user1, "------------in getsavedrecipe");
  return res.send({ saved: user1 });
};

const removeSavedRecipe = async (req, res) => {
  const user1 = await getUser(req.headers);
  const data = await req.body;
  // const s = await User.deleteMany({ saved_recipes: label });

  console.log(data.label, "data in req.body");
  const recipeIndex = user1.saved_recipes.findIndex(
    (recipe) => recipe.label === data.label
  );
  console.log(recipeIndex);

  // Remove the recipe object from the saved_recipes array
  user1.saved_recipes.splice(recipeIndex, 1);

  // Save the updated user document
  const result = await user1.save();
  return res.send({ result: result });
};

const getUserData = async (req, res) => {
  const user1 = await getUser(req.headers);
  return res.send({ User: user1 });
};

module.exports = {
  Register,
  Login,
  checkLoggedIn,
  logOut,
  saveRecipe,
  getSavedRecipe,
  getComments,
  getUserData,
  removeSavedRecipe,
};
