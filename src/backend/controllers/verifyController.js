const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserFromDatabase = async (userId, pool) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length > 0) {
      // Return user information
      return {
        id: result.rows[0].id,
        username: result.rows[0].username,
        // Add more user details as needed
      };
    } else {
      // Return null or handle the case where the user is not found
      return null;
    }
  } catch (error) {
    // Handle database query error
    console.error('Error querying database:', error);
    throw error; // You might want to handle or log the error differently based on your needs
  }
};


const verifyController = async (req, res, pool) => {
  const token = req.body.token;

  try {
    // Verify the token using your server's authentication logic
    const decoded = jwt.verify(token, 'your_secret_key');
    const user = getUserFromDatabase(decoded.userId, pool); // Fetch user information from the database

    // If the verification is successful, send back user information
    res.json({ user });
  } catch (error) {
    // Handle token verification failure
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

module.exports = verifyController;

