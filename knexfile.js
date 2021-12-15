const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection:
      "postgres://mveodlei:7HvEMLc4xWX_JnMxD9RENimnjSilXFne@castor.db.elephantsql.com/mveodlei",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
