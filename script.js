const jwt = require('jsonwebtoken');
const encrypt = (payload, secret) => {
  if (!payload || !secret) {
    throw new Error("Payload and secret are required");
  }

 
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, message: 'Token has expired.' };
    }
    return { valid: false, message: 'Invalid token' };
  }
};

const secret = 'adz@123';
const payload = { userId: 123, username: 'Adrina123' };

try {
  const token = encrypt(payload, secret);
  console.log("Generated Token:", token);

  const result = verifyToken(token, secret);
  console.log("Verification Result:", result);
} catch (error) {
  console.error("Error:", error.message);
}
