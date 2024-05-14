const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker_db',
    password: "Redpanda8473$!",
    port: 5432,
});

module.exports = pool;