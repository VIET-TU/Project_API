const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", null, {
  host: "localhost",
  dialect: "mysql", // csdl dung la gi
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully."); // established: da dc thanh lap
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
