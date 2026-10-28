
const { Pool } = require('pg');

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432,
};

const pool = new Pool(DbConfig);

async function executeSQL(sqlScript) {
    const client = await pool.connect();

    try {
        const result = await client.query(sqlScript);

        console.log('Comando SQL:', result.command);
        console.log('Linhas afetadas:', result.rowCount);
        console.log('Resultado:', result.rows);

        return result;
    } catch (error) {
        console.error('Erro ao executar SQL:', error.message);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { executeSQL };