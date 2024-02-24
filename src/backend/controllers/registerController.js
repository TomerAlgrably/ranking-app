const { hashPassword } = require('../utils/hash');

const registerController = async (req, res, pool) => {
  const { username, password } = req.body;
  const userTable = "users";

  // Check if username exists
  const existingUser = await pool.query(
    `SELECT * FROM ${userTable} WHERE username = $1`,
    [username]
  );

  if (existingUser.rows.length > 0) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await hashPassword(password);

  // Insert new user
  try {
    await pool.query(
      `INSERT INTO ${userTable} (username, password) VALUES ($1, $2)`,
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = registerController;
