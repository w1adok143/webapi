import BaseAdminController from "@/views/Api/Admin/BaseAdminController";
import Model from "@/views/Api/Admin/Settings/Users/UsersModel";
import {connection, http} from "@/helpers/decorator";
import {ApiError} from "express-lite-router";
import {Validation, required} from "deepvalid";
import {Connection} from "buildmsql";
import bcrypt from "bcrypt";
import type {Type} from "@/views/Api/Admin/Settings/Users/types";

export default class UsersController extends BaseAdminController {
    private model: Model;
    private validation: Validation;

    @http()
    public async init() {
        await super.init();

        this.model = await this.$create(Model);
        this.validation = await this.$create(Validation);
        this.validation.setModel({
            name: {required},
            password: {required}
        });
    }

    @http()
    public async index() {
        return {
            rows: await this.model.select()
        }
    }

    @http()
    public async insert(@connection() connection: Connection) {
        this.model.connection = connection;
        this.validation.validate(this.request.body, ['name', 'password']);
        const {name, password} = this.request.body as Type.insert.request.body
        const rows = await this.model.find({name});

        if (rows.length) {
            throw new ApiError('Это пользователь уже существует', 400, 1);
        }

        const id =  await this.model.insert({
            name: name,
            password: await bcrypt.hash(password, await bcrypt.genSalt(5)),
            password_raw: password
        });

        return {id}
    }

    @http()
    public async update(@connection() connection: Connection) {
        this.model.connection = connection;
        this.validation.validate(this.request.body, ['name', 'password']);
        const {id} = this.request.params;
        const {name, password} = this.request.body as Type.update.request.body;
        let rows = await this.model.select({
            id: +id
        });

        if (!rows.length) {
            throw new ApiError('Пользователь не найден', 404, 1);
        }

        rows = (await this.model.find({name})).filter(row => row.id !== +id);

        if (rows.length) {
            throw new ApiError('Это пользователь уже существует', 400, 1);
        }

        await this.model.update({
            id: +id,
            name: name,
            password: await bcrypt.hash(password, await bcrypt.genSalt(5)),
            password_raw: password
        });
    }

    @http()
    public async delete(@connection() connection: Connection) {
        this.model.connection = connection;
        const {id} = this.request.params;
        const rows = await this.model.select({
            id: +id
        });

        if (!rows.length) {
            throw new ApiError('Пользователь не найден', 404, 1);
        }

        await this.model.remove({
            id: +id
        });
    }
}