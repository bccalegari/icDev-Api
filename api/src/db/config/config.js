module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      define: {
        freezeTableName: true,
      },
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      }
    }
  }
};
