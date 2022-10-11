import { Connection } from '../database/connection';
import { QueryResult } from 'pg';

export class AccidentesModel {
    private connectionSQL: Connection;

    constructor() {
        this.connectionSQL = Connection.getInstance();
    }

    public create = async (
        fecha: string, severidad: string, idEmpleado: number,
        idSector: number, idTipoAccidente: number): Promise<boolean> => {
        try {
            await this.connectionSQL.executeSQL(
                `insert into accidentes (acc_fecha, acc_severidad, acc_emp_id, acc_sector_id, acc_ta_id) values
                ('${fecha}', '${severidad}', ${idEmpleado}, ${idSector}, ${idTipoAccidente});`);
            return true;
        } catch (error) {
            console.log(`Error into AccidentesModel -> create()`);
            return false;
        }
    }

    public findById = async (id: number): Promise<
        { acc_id: number, acc_fecha: string, acc_severidad: string, acc_emp_id: number, emp_nombre: string, emp_apellido: string, acc_sector_id: number, sector_desc: string, acc_ta_id: number, ta_desc: string } | undefined> => {
        try {
            let accident: QueryResult = await this.connectionSQL.executeSQL(
                `select a.acc_id, a.acc_fecha, a.acc_severidad, a.acc_emp_id, e.emp_nombre, e.emp_apellido, a.acc_sector_id, s.sector_desc, a.acc_ta_id, ta.ta_desc  
                from accidentes a, empleados e, sectores s, tipos_accidentes ta 
                where a.acc_emp_id=e.emp_id and e.emp_sector_id=s.sector_id and ta.ta_id=a.acc_ta_id and a.acc_id=${id};`);
            return accident.rows[0];
        } catch (error) {
            console.log(`Error into AccidentesModel -> findById()`);
            return undefined;
        }
    }

    public update = async (id: number, fecha: string, severidad: string, idEmpleado: number, idSector: number, idTipoAccidente: number): Promise<boolean> => {
        try {
            await this.connectionSQL.executeSQL(
                `update accidentes
                set acc_fecha='${fecha}', acc_severidad='${severidad}', acc_emp_id=${idEmpleado}, acc_sector_id=${idSector}, acc_ta_id=${idTipoAccidente}
                where acc_id=${id};`);
            return true;
        } catch (error) {
            console.log(`Error into AccidentesModel -> update()`);
            return false;
        }
    }

    public delete = async (id: number): Promise<boolean> => {
        try {
            await this.connectionSQL.executeSQL(`delete from accidentes where acc_id=${id};`);
            return true;
        } catch (error) {
            console.log(`Error into AccidentesModel -> delete()`);
            return false;
        }
    }

    public findAll = async (): Promise<Array<
        { acc_id: number, acc_fecha: string, acc_severidad: string, acc_emp_id: number, emp_nombre: string, emp_apellido: string, acc_sector_id: number, sector_desc: string, acc_ta_id: number, ta_desc: string }>> => {
        try {
            let accidents = await this.connectionSQL.executeSQL(
                `select a.acc_id, a.acc_fecha, a.acc_severidad, a.acc_emp_id, e.emp_nombre, e.emp_apellido, a.acc_sector_id, s.sector_desc, a.acc_ta_id, ta.ta_desc  
                from accidentes a, empleados e, sectores s, tipos_accidentes ta 
                where a.acc_emp_id=e.emp_id and e.emp_sector_id=s.sector_id and ta.ta_id=a.acc_ta_id;`);
            return accidents.rows;
        } catch (error) {
            console.log(`Error into AccidentesModel -> findAll()`);
            return [];
        }
    }
}