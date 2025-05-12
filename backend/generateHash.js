const bcrypt = require('bcrypt');

const generateHash = async () => {
  const hash = await bcrypt.hash('parola123', 10);
  console.log('Parola criptată:', hash);
};

generateHash();
