import { Pool, QueryResult } from 'pg';
import { config as dotenv } from 'dotenv';

export class Connection {

    private static _instance: Connection;
    private session: Pool;

    private constructor(host: string, user: string, password: string, database: string, port: number) {
        try {
            this.session = new Pool({
                host,
                user,
                password,
                database,
                port
            });
            this.session.connect();
            console.log("\x1b[30m", "\x1b[42m", `database "${database} in hots: ${host}:${port}" by user: ${user}`, "\x1b[0m");
        } catch (error) {
            console.log("\x1b[30m", "\x1b[41m", `Error to connect database: ${database}`, "\x1b[0m");
        }
    }

    public static getInstance(): Connection {
        if (!this._instance) {
            console.log("\x1b[44m", "\x1b[30m", "create a new instance...", "\x1b[0m");
            dotenv();
            let { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
            this._instance = new Connection(String(DB_HOST), String(DB_USERNAME), String(DB_PASSWORD), String(DB_DATABASE), parseInt(String(DB_PORT)));
        }
        return this._instance;
    }

    public async executeSQL(sqlQuery: string): Promise<QueryResult> {
        try {
            let result: QueryResult = await this.session.query(sqlQuery);
            return result;
        } catch (error) {
            throw new Error("ERROR IN EXECUTE SQL QUERY " + error);
        }
    }
}