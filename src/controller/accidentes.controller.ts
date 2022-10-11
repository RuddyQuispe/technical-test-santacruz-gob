import { AccidentesModel } from '../model/accidentes.model';
import { SectoresModel } from '../model/sectores.model';
import { EmpleadosModel } from '../model/empleados.model';
import { TiposAccidentesModel } from '../model/tipo_accidentes.model';
import { Request, Response } from 'express';
export class AccidentesController {
    private accidentesModel: AccidentesModel;
    private sectoresModel: SectoresModel;
    private empleadosModel: EmpleadosModel;
    private tiposAccidentesModel: TiposAccidentesModel

    constructor() {
        this.sectoresModel = new SectoresModel();
        this.accidentesModel = new AccidentesModel();
        this.empleadosModel = new EmpleadosModel();
        this.tiposAccidentesModel = new TiposAccidentesModel();
    }

    public index = async (request: Request, response: Response): Promise<void> => {
        let accidentes = await this.accidentesModel.findAll();
        let empleados = await this.empleadosModel.findAll();
        let sectores = await this.sectoresModel.findAll();
        let tiposAccidentes = await this.tiposAccidentesModel.findAll();
        response.render('accidentes_manage/accidentes_manage', {
            sectores, accidentes, empleados, tiposAccidentes
        });
    }

    public store = async (request: Request, response: Response): Promise<void> => {
        let { fecha, severidad, id_empleado, id_sector, id_tipoAccidente } = request.body;
        let created = await this.accidentesModel.create(fecha, severidad, id_empleado, id_sector, id_tipoAccidente);
        if (created) {
            await response.redirect('/accidentes_manage/all');
        } else {
            response.render('error', { message_error: "ERROR" });
        }
    }

    public edit = async (request: Request, response: Response): Promise<void> => {
        let { id } = request.params;
        let accidenteToEdite: { acc_id: number; acc_fecha: string; acc_severidad: string; acc_emp_id: number; emp_nombre: string; emp_apellido: string; acc_sector_id: number; sector_desc: string; acc_ta_id: number; ta_desc: string; } | undefined =
            await this.accidentesModel.findById(parseInt(id));
        if (accidenteToEdite) {
            let empleados = await this.empleadosModel.findAll();
            let sectores = await this.sectoresModel.findAll();
            let tiposAccidentes = await this.tiposAccidentesModel.findAll();
            response.status(200).render(
                'accidentes_manage/accidentes_edit', { accidenteToEdite, sectores, tiposAccidentes, empleados });
        } else {
            response.render('error', { message_error: "ERROR" });
        }
    }

    public update = async (request: Request, response: Response): Promise<void> => {
        let { id } = request.params;
        let { fecha, severidad, idEmpleado, idSector, idTipoAccidente } = request.body;
        let updated = await this.accidentesModel.update(
            parseInt(id), fecha, severidad, idEmpleado, idSector, idTipoAccidente);
        if (updated) {
            response.redirect('/accidentes_manage/all');
        } else {
            response.render('error', { message_error: "ERROR" });
        }
    }

    public delete = async (request: Request, response: Response): Promise<void> => {
        let { id } = request.params;
        let deleted = await this.accidentesModel.delete(parseInt(id));
        if (deleted) {
            response.redirect('/accidentes_manage/all');
        } else {
            response.render('error', { message_error: "ERROR message" });
        }
    }
}