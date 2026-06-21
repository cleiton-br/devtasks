const {Pool} = require('pg');

const pool = new Pool({
    user: "devtasks_user",
    host: "localhost",
    database: "devtasks",
    password: "123456",
    port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error connecting to the database", err);
    } else {
        console.log("Database connection successful:", res.rows[0]);
    }
});

module.exports = pool;