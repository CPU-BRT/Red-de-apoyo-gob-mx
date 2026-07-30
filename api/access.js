const {
  generateDailyPassword,
  signPayload,
  verifySignedToken,
  safeComparePassword,
  setCors,
  delay
} = require('../lib/security');

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const action = body.action || 'validate';

    if (action === 'check') {
      const valid = verifySignedToken(body.token, 'access');
      return res.status(200).json({ valid: valid });
    }

    if (action === 'validate') {
      const daily = generateDailyPassword();
      const input = body.password;

      if (safeComparePassword(input, daily)) {
        return res.status(200).json({
          valid: true,
          token: signPayload('access')
        });
      }

      await delay(600);
      return res.status(200).json({ valid: false });
    }

    return res.status(400).json({ valid: false });
  } catch {
    return res.status(500).json({ valid: false });
  }
};
