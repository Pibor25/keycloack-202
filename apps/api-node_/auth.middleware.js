const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://congenial-acorn-rx7v9q5w4wcw7vx-8080.app.github.dev/realms/training/protocol/openid-connect/certs'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function requireRole(role) {
  return (req, res, next) => {
    const roles = req.user?.realm_access?.roles || [];

    if (!roles.includes(role)) {
      return res.status(403).json({ error: 'Insufficient role' });
    }

    next();
  };
}




function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    issuer: 'https://congenial-acorn-rx7v9q5w4wcw7vx-8080.app.github.dev/realms/training'
  }, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken, requireRole };