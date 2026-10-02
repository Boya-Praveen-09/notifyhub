const bcrypt = require("bcryptjs");

async function createHash() {
  const password = "admin123";

  const hash = await bcrypt.hash(password, 10);

  console.log("Password hash:");
  console.log(hash);
}

createHash();