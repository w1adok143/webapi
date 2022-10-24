import express from "express";
import {Router} from "express-lite-router";

export default (context: Record<string, any> = {}) => {
    const router = Router({
        router: express.Router(),
        dir: 'src/backend/views',
        context
    });

    router.get('/', 'BaseController@index');

    // auth
    router.post('/api/admin/login', 'Api/Admin/Auth/AuthController@login');
    // settings/users
    router.get('/api/admin/settings/users', 'Api/Admin/Settings/Users/UsersController@index');
    router.post('/api/admin/settings/users', 'Api/Admin/Settings/Users/UsersController@insert');
    router.put('/api/admin/settings/users/:id', 'Api/Admin/Settings/Users/UsersController@update');
    router.delete('/api/admin/settings/users/:id', 'Api/Admin/Settings/Users/UsersController@delete');

    return router.express();
}