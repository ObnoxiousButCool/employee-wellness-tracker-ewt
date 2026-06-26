const { Op } = require("sequelize");
const { WellnessEntry } = require("../models/WellnessEntry");

function assertRange(payload, field, minimum, maximum) {
  const value = Number(payload[field]);
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new Error(`${field} must be between ${minimum} and ${maximum}.`);
  }
  return value;
}

const wellnessService = {
  async createEntry(payload, user) {
    const entry = {
      user_id: user ? user.id : Number(payload.user_id),
      department_id: assertRange(payload, "department_id", 1, Number.MAX_SAFE_INTEGER),
      stress_level: assertRange(payload, "stress_level", 1, 10),
      work_hours: assertRange(payload, "work_hours", 0, 24),
      sleep_hours: assertRange(payload, "sleep_hours", 0, 24),
      mood: String(payload.mood || "").trim(),
      energy_level: assertRange(payload, "energy_level", 1, 10),
      submission_date: payload.submission_date || new Date().toISOString().slice(0, 10)
    };

    if (!entry.user_id || !entry.mood) {
      throw new Error("user_id and mood are required.");
    }
    return WellnessEntry.create(entry);
  },

  async getDashboardMetrics(filters) {
    const where = {};
    if (filters.department_id) {
      where.department_id = Number(filters.department_id);
    }
    if (filters.from || filters.to) {
      where.submission_date = {};
      if (filters.from) where.submission_date[Op.gte] = filters.from;
      if (filters.to) where.submission_date[Op.lte] = filters.to;
    }

    return WellnessEntry.findAll({
      attributes: [
        "department_id",
        [WellnessEntry.sequelize.fn("AVG", WellnessEntry.sequelize.col("stress_level")), "average_stress"],
        [WellnessEntry.sequelize.fn("AVG", WellnessEntry.sequelize.col("sleep_hours")), "average_sleep"],
        [WellnessEntry.sequelize.fn("COUNT", WellnessEntry.sequelize.col("id")), "entry_count"]
      ],
      group: ["department_id"],
      where
    });
  }
};

module.exports = { wellnessService };
