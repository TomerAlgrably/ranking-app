
const express = require('express');
const verifyController = require('../controllers/verifyController');
const router = express.Router();

router.post('/verify', async (req, res) => {
  await verifyController(req, res, req.app.get('pool'));
});

module.exports = router;