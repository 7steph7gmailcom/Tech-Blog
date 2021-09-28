const router = require("express").Router();
const { Post } = require("../models/index");

// Get all Posts
router.get("/", async (req, res) => {
  try {
    // Gets all informatation from our post model/Database
    const postCardsData = await Post.findAll();
    // Maps the data collected in a prettier format
    const postCards = postCardsData.map((post) => post.get({ plain: true }));

    // Renders this information using handlebars and make sure we are logged in
    // switch to render homepage when frontend is done
    // res.json(carCards)
    res.render("postFeed", { postCards, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.render("login");
  } else {
    res.render("dashboard", { loggedIn: req.session.loggedIn });
  }
  // Renders dashboard handlebars page
});

router.get("/upload", (req, res) => res.render("uploadPage"));

module.exports = router;