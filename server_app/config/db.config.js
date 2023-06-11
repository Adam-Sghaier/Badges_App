
export const dbConfig = {
  HOST: "localhost",
  USER: "adem",
  PASSWORD: "adem",
  DB: "DB_Badges",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}