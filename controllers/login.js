const router = require("express").Router();
const { User } = require("../models/index");

//Create User
router.post("/", async (req, res) => {
    try {
      // Creates User with all the require information
      const dbUserCreate = await User.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
  

//Login      
req.session.save(() => {
    req.session.loggedIn = true;
    console.log(req.session.loggedIn);
    res.status(200).json(dbUserCreate);
    });
} catch (err) {
    if (err == "SequelizeUniqueConstraintError") {
        res.status(400).json("That username already exists");
    } else {
    console.log(err);
    res.status(500).json(err);
    }
  }
});


//Login get
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});
  

// Login Post
router.post("/login", async (req, res) => {
    try {
      // finds user with email or username
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
//checks against other users and emails for redundancies in bcrypt
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again" });
        return;
      }

const validPassword = await dbUserData.checkPassword(req.body.password);
//Validates UNIQUE password by bcrypt
//If not UNIQUE
    if (!validPassword) {
    respond
      .status(400)
      .json({ message: "Incorrect email or password. Please try again" });
    }


//Compilies Users
router.get("/", async (req, res) => {
    try {
      const dbUser = await User.findAll();
      const userInfo = dbUser.map((user) => user.get({ plain: true }));
  

      res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  });


const userObject = {
    username: dbUserData.username,
    id: dbUserData.id,
    first_name: dbUserData.first_name,
    last_name: dbUserData.last_name,
    email: dbUserData.email,
  };

console.log(userObject);
    req.session.save(() => {
    req.session.loggedIn = true;
    req.session.username = userObject;
    console.log(req.session.loggedIn);
    console.log("You have sucessfully logged in");
    res.status(200).json({ message: "You are now logged in" });
});
    // console.log(req.session)
} catch (err) {
    res.status(500).json(err);
  }
});


//Logs user out
router.post("/logout", (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          console.log("You are now logged out");
          res.status(200).send("You are logged out");
        });
    } else {
        res.status(204).end();
        console.log("You are now logged out!");
      }
    });
     module.exports = router