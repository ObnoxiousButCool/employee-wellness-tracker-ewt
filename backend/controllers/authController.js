const { userService } = require("../services/userService");

const authController = {
  async login(request, response) {
    try {
      const result = await userService.authenticate(request.body.email, request.body.password);
      response.json(result);
    } catch (error) {
      response.status(401).json({ error: error.message });
    }
  }
};

module.exports = { authController };
