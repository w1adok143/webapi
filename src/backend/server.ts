import express, {Application} from "express";
import routes from "@/routes";
import db from "@/helpers/db";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes({
    db: db.connect()
}));
app.listen(3000, () => console.log('Development server http://localhost:3000 started'));