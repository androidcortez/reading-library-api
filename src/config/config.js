const config = {
  port: process.env.PORT,
  tokenSecret: process.env.TOKEN_SECRET,
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    name: process.env.DATABASE_NAME,
  },
};

module.exports = config;
