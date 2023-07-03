import PostgreSQL from 'pg';
declare class Database {
    /**
     * Database connection pool
     */
    private pool;
    /**
     * Create a new database connection pool based on environment variables
     */
    constructor();
    /**
     * Test the database connection
     */
    testConnection(): Promise<void>;
    /**
     * Get a client from the connection pool
     * @returns A client from the connection pool
     */
    connect(): Promise<PostgreSQL.PoolClient>;
}
export default Database;
