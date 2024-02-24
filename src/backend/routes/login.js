const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.post('/login', async (req, res) => {
  await loginController(req, res, req.app.get('pool'));
});

module.exports = router;