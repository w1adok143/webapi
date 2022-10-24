import {Model} from "express-lite-router";
import {Connection, mariadbPool} from "buildmsql";

export default class BaseModel extends Model {
    public connection: Connection;

    protected get pool(): mariadbPool {
        return this.$context.db.queryPool;
    }
}