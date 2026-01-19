// Password policy (spaces are NOT treated as special characters)
const PASSWORD_RULES = {
  minLen: 8,
  maxLen: 64,
  lower: /[a-z]/,
  upper: /[A-Z]/,
  digit: /\d/,
  // Only typical "visible" special chars (space is excluded)
  special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
};

function isEmpty(value) {
  return value == null || String(value).trim() === "";
}

export function validateRegister(values) {
  const errors = {};

  // Email (trim spaces)
  const email = (values.email ?? "").trim();

  if (isEmpty(email)) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password (trim to avoid accidental leading/trailing spaces)
  const pwd = (values.password ?? "").trim();

  if (isEmpty(pwd)) {
    errors.password = "Password is required.";
  } else if (pwd.length < PASSWORD_RULES.minLen) {
    errors.password = `Password must be at least ${PASSWORD_RULES.minLen} characters.`;
  } else if (pwd.length > PASSWORD_RULES.maxLen) {
    errors.password = `Password must be at most ${PASSWORD_RULES.maxLen} characters.`;
  } else if (!PASSWORD_RULES.lower.test(pwd)) {
    errors.password = "Password must include at least one lowercase letter.";
  } else if (!PASSWORD_RULES.upper.test(pwd)) {
    errors.password = "Password must include at least one uppercase letter.";
  } else if (!PASSWORD_RULES.digit.test(pwd)) {
    errors.password = "Password must include at least one number.";
  } else if (!PASSWORD_RULES.special.test(pwd)) {
    errors.password = "Password must include at least one special character.";
  }

  // Confirm password (trim for same reason)
  const cpwd = (values.confirmPassword ?? "").trim();

  if (isEmpty(cpwd)) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (!isEmpty(pwd) && cpwd !== pwd) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
