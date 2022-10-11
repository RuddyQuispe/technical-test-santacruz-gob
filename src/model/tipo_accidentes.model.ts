import { Connection } from "../database/connection";

export class TiposAccidentesModel {

    private connectionSQL: Connection;

    constructor() {
        this.connectionSQL = Connection.getInstance();
    }

    public findAll = async (): Promise<
        Array<{ ta_id: number, ta_desc: string }>> => {
        try {
            let tiposAccidentes = await this.connectionSQL.executeSQL(
                `select *  from tipos_accidentes ta;`);
            return tiposAccidentes.rows;
        } catch (error) {
            console.log(`Error into TiposAccidentesModel -> findAll()`);
            return [];
        }
    }
}