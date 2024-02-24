const express = require('express');
const registerController = require('../controllers/registerController');
const router = express.Router();

router.post('/register', async (req, res) => {
  await registerController(req, res, req.app.get('pool'));
});

module.exports = router;