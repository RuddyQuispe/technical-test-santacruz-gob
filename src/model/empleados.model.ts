import { Connection } from "../database/connection";

export class EmpleadosModel {

    private connectionSQL: Connection;

    constructor() {
        this.connectionSQL = Connection.getInstance();
    }

    public findAll = async (): Promise<
        Array<{
            emp_id: number, emp_apellido: string, emp_nombre: string, emp_sexo: boolean, emp_fecnac: string, emp_fecing: string, emp_id_supervisor: string, emp_sector_id: number
        }>> => {
        try {
            let empleados = await this.connectionSQL.executeSQL(
                `select *  from empleados;`);
            return empleados.rows;
        } catch (error) {
            console.log(`Error into EmpleadosModel -> findAll()`);
            return [];
        }
    }
}