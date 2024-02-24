const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function comparePassword(hashedPassword, password) {
    return await bcrypt.compare(password, hashedPassword);
  }

const loginController = async (req, res, pool) => {
    const { username, password } = req.body;
    const userTable = "users";
    // Find user by username
    const user = await pool.query(
      `SELECT * FROM ${userTable} WHERE username = $1`,
      [username]
    );
  
    if (!user.rows.length) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    const hashedPassword = user.rows[0].password;
  
    // Compare passwords
    const validPassword = await comparePassword(hashedPassword, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Generate JWT
    const payload = { userId: user.rows[0].id }; // Assume id column exists
    const secret = 'your_secret_key'; // Replace with a strong secret
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  
    res.json({ token });
};

module.exports = loginController;

