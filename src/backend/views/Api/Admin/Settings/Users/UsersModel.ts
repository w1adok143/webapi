import BaseAdminModel from "@/views/Api/Admin/BaseAdminModel";
import type {Type} from "@/views/Api/Admin/Settings/Users/types";

export default class UsersModel extends BaseAdminModel {
    public async select(row: Type.select.row = null) {
        return await this.pool.query(`
            SELECT id,
                name,
                password_raw AS password
            FROM app_user
            WHERE ${row?.id ? 'id = :id' : '1'}
        `, row) as Type.select.queryResult
    }

    public async find(row: Type.find.row) {
        return await this.pool.query(`
            SELECT id,
                name,
                password_raw AS password
            FROM app_user
            WHERE name = :name
        `, row) as Type.find.queryResult
    }

    public async insert(row: Type.insert.row) {
        await this.connection.insert('app_user', row);

        return this.connection.lastInsertId()
    }

    public async update(row: Type.update.row) {
        await this.connection.update('app_user', 'id = :id', row);
    }

    public async remove(row: Type.remove.row) {
        await this.connection.query(`
            DELETE 
            FROM app_user
            WHERE id = :id
        `, row);
    }
}