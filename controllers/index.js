const router = require('express').Router();
        
// const homeRoutes = require('./home-route')
// const loginRoutes = require('./login-route')
// const dashboardRoutes = require('./dashboard-route')
const apiRoutes = require('./api')
const postRoutes = require("./post-routes.js");
        
    
        
    
router.use('/', homeRoutes)
router.use("/user", loginRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)
router.use("/", postRoutes);
	

router.use((req, res) => {
  res.status(404).json({ message: "That route does not exist" }).send();
});
 
    
module.exports = router;
    