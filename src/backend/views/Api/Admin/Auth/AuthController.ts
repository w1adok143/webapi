import BaseController from "@/views/BaseController";
import Model from "@/views/Api/Admin/Auth/AuthModel";
import {http} from "@/helpers/decorator";
import {ApiError} from "express-lite-router";
import {Validation, required} from "deepvalid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {Type} from "@/views/Api/Admin/Auth/types";

export default class AuthController extends BaseController {
    private model: Model;
    private validation: Validation;

    @http()
    public async init() {
        this.model = await this.$create(Model);
        this.validation = await this.$create(Validation);
        this.validation.setModel({
            name: {required},
            password: {required}
        });
    }

    @http()
    public async login() {
        this.validation.validate(this.request.body, ['name', 'password']);
        const {name, password} = this.request.body as Type.login.request.body;
        const rows = await this.model.select({name});

        if (!rows.length) {
            throw new ApiError('Пользователь не найден', 404, 1);
        }

        const isPassword = await bcrypt.compare(password, rows[0].password);

        if (!isPassword) {
            throw new ApiError('Пользователь не найден', 404, 2);
        }

        const token = jwt.sign({
            id: rows[0].id,
            name: name
        }, this.privateKey);

        return {token}
    }
}