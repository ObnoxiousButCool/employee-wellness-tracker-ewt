const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const userService = {
  async authenticate(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials.");
    }

    const secret = process.env.JWT_SECRET;
    // Defect 2: do not mint forgeable tokens with a hardcoded fallback secret.
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required.");
    }

    return {
      token: jwt.sign({ sub: user.id, role: user.role }, secret, {
        expiresIn: "8h"
      }),
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  }
};

module.exports = { userService };
