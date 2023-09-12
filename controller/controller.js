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
  // console.log(User, "user msgggg");

  if (User1) {
    return res.send({ msg: "User already registered" });
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
  const data = req.headers;
  const token1 = data.authorization.split(" ")[1];

  const token = token1;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!token) {
    return res.send({ msg: "Please Login", isLoggedIn: false });
  }

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
  const data = req.body;
  const User1 = await getUser(req.headers);
  console.log(User1);
  if (User1) {
    // const res1 = await User1.saved_recipes.push(data);
    // return res.send({ res1: res1 });
    const w = await User1.updateOne({
      $push: { saved_recipes: data },
    });
    return res.send({ res: w });
  }
  return res.send("nottttt");
};

const getSavedRecipe = async (req, res) => {
  const user1 = await getUser(req.headers);

  return res.send({ saved: user1.saved_recipes });
};

module.exports = {
  Register,
  Login,
  checkLoggedIn,
  logOut,
  saveRecipe,
  getSavedRecipe,
  getComments
};
