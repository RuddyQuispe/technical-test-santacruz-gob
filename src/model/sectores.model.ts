import { Connection } from "../database/connection";

export class SectoresModel {

    private connectionSQL: Connection;

    constructor() {
        this.connectionSQL = Connection.getInstance();
    }

    public findAll = async (): Promise<
        Array<{ sector_id: number, sector_desc: string }>> => {
        try {
            let sectors = await this.connectionSQL.executeSQL(
                `select sector_id, sector_desc  from sectores;`);
            return sectors.rows;
        } catch (error) {
            console.log(`Error into SectoresModel -> findAll()`);
            return [];
        }
    }
}