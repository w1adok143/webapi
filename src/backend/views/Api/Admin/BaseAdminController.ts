import BaseController from "@/views/BaseController";
import {ApiError} from "express-lite-router";
import {http} from "@/helpers/decorator";
import jwt from "jsonwebtoken";

export default class BaseAdminController extends BaseController {

    @http()
    public async init() {
        const token = this.request.headers.authorization?.split('Bearer ')[1];

        try {
            jwt.verify(token, this.privateKey);
        } catch (e) {
            throw new ApiError('Вы не авторизованы', 403, 1);
        }
    }
}