module.exports = {
  'type': 'postgres',
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'username': process.env.DB_USER,
  'password': process.env.DB_PASS,
  'database': process.env.DB_NAME,
  'synchronize': false,
  'logging': true,
  'entities': ['**/src/database/entity/**/*.js'],
  'migrations': ['**/src/database/migration/**/*.js'],
  'subscribers': ['**/src/database/subscriber/**/*.js'],
  'migrationsTableName': 'migrations',
  'cli': {
    'entitiesDir': 'src/database/entity',
    'migrationsDir': 'src/database/migration',
    'subscribersDir': 'src/database/subscriber'
  }
}
