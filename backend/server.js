const express = require("express");
const { authController } = require("./controllers/authController");
const { wellnessController } = require("./controllers/wellnessController");

const app = express();
app.use(express.json());
app.post("/api/login", authController.login);
app.post("/api/wellness-entries", wellnessController.create);
app.get("/api/dashboard", wellnessController.dashboard);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`EWT backend listening on ${port}`);
  });
}
