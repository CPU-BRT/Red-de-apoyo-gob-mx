const crypto = require('crypto');

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const TZ = 'America/Mexico_City';

function getConfig() {
  return {
    salt: process.env.ACCESS_SALT || 'AVIF-RDA-2026-Corp',
    tokenSecret: process.env.TOKEN_SECRET || process.env.ACCESS_SALT || 'AVIF-RDA-2026-Corp-TOKEN',
    adminUser: process.env.ADMIN_USER || 'SUPERVISORES',
    adminPass: process.env.ADMIN_PASS || 'Corp1997'
  };
}

function getTodayKey() {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ });
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generateDailyPassword() {
  const { salt } = getConfig();
  const dateStr = getTodayKey();
  let seed = hashSeed(dateStr + salt);
  let password = '';
  for (let i = 0; i < 8; i++) {
    seed = hashSeed(String(seed) + i + salt + dateStr);
    password += CHARS[seed % CHARS.length];
  }
  return password;
}

function getNextResetLabel() {
  const now = new Date();
  const mx = new Date(now.toLocaleString('en-US', { timeZone: TZ }));
  const next = new Date(mx);
  next.setHours(24, 0, 0, 0);
  return next.toLocaleString('es-MX', {
    timeZone: TZ,
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function signPayload(type, extra) {
  const { tokenSecret } = getConfig();
  const dateStr = getTodayKey();
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${type}|${dateStr}|${nonce}|${extra || ''}`;
  const sig = crypto.createHmac('sha256', tokenSecret).update(payload).digest('hex');
  return Buffer.from(`${payload}|${sig}`).toString('base64url');
}

function verifySignedToken(token, expectedType) {
  try {
    const { tokenSecret } = getConfig();
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const lastPipe = decoded.lastIndexOf('|');
    if (lastPipe === -1) return false;

    const sig = decoded.slice(lastPipe + 1);
    const payload = decoded.slice(0, lastPipe);
    const expectedSig = crypto.createHmac('sha256', tokenSecret).update(payload).digest('hex');

    const sigBuf = Buffer.from(sig, 'hex');
    const expectedBuf = Buffer.from(expectedSig, 'hex');
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

    const parts = payload.split('|');
    if (parts.length < 3) return false;
    if (parts[0] !== expectedType) return false;
    if (parts[1] !== getTodayKey()) return false;

    return true;
  } catch {
    return false;
  }
}

function safeComparePassword(input, expected) {
  const a = String(input || '').trim().toUpperCase();
  const b = String(expected || '').trim().toUpperCase();
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function validateAdminCredentials(user, pass) {
  const { adminUser, adminPass } = getConfig();
  const u = String(user || '').trim();
  const p = String(pass || '');

  if (u.length !== adminUser.length || p.length !== adminPass.length) {
    return false;
  }

  const userOk = crypto.timingSafeEqual(Buffer.from(u), Buffer.from(adminUser));
  const passOk = crypto.timingSafeEqual(Buffer.from(p), Buffer.from(adminPass));
  return userOk && passOk;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  getTodayKey,
  generateDailyPassword,
  getNextResetLabel,
  signPayload,
  verifySignedToken,
  safeComparePassword,
  validateAdminCredentials,
  setCors,
  delay
};
