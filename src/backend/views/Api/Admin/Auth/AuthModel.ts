import BaseModel from "@/views/BaseModel";
import type {Type} from "@/views/Api/Admin/Auth/types";

export default class AuthModel extends BaseModel {
    public async select(row: Type.select.row) {
        return await this.pool.query(`
            SELECT id,
                name,
                password
            FROM app_user
            WHERE name = :name
        `, row) as Type.select.queryResult
    }
}