const jwt = require("jsonwebtoken");

/**
 * Verify a bearer JWT and attach the authenticated user identity to the request.
 */
function authenticate(request, response, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return response.status(500).json({ error: "JWT_SECRET environment variable is required." });
  }

  const header = request.get("authorization") || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({ error: "Authentication required." });
  }

  try {
    const claims = jwt.verify(token, secret);
    // Defect 1: protected routes consume this authenticated identity instead of request payload IDs.
    request.user = { id: claims.sub, role: claims.role };
    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid authentication token." });
  }
}

module.exports = { authenticate };
