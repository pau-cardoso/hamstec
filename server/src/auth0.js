const jwt = require('jsonwebtoken');

async function verifyTokenPermissionMiddleware(permission, secret) {
  return async (req, res, next) => {
    const token = req.headers['authorization'];

    try {
      // Verify the signature of the JWT
      const decoded = await jwt.verify(token, secret);

      // Get the "permissions" claim
      const { permissions } = decoded;

      // Check if the permission is included in the "permissions" claim
      if (permissions.includes(permission)) {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
}