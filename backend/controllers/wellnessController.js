const { wellnessService } = require("../services/wellnessService");

const wellnessController = {
  async create(request, response) {
    try {
      const entry = await wellnessService.createEntry(request.body, request.user);
      response.status(201).json(entry);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  async dashboard(request, response) {
    const metrics = await wellnessService.getDashboardMetrics(request.query);
    response.json(metrics);
  }
};

module.exports = { wellnessController };
