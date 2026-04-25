const express =require('express');
const {storeMilkData,getMilkData} = require('../controllers/routeControllers');
const protect =require('../../Middleware/authMiddleware')
const router = express.Router();
//Post
  router.post('/addMilkData',protect,storeMilkData);

  //GET Method
  router.get('/getMilkData',protect,getMilkData)
router.get("/milkdata", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;

