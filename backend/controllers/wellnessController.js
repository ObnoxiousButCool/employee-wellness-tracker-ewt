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
    try {
      const metrics = await wellnessService.getDashboardMetrics(request.query);
      response.json(metrics);
    } catch (error) {
      // Defect 4: return validation failures without leaking stack traces.
      response.status(400).json({ error: error.message });
    }
  }
};

module.exports = { wellnessController };
