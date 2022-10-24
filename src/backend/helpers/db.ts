import {Query} from "buildmsql";

const connect = () => {
    const query = new Query();
    const queryPool = query.createPool({
        "host": "db",
        "user": "root",
        "password": "root",
        "database": "webapi",
        "connectTimeout": 10000,
        "acquireTimeout": 10000,
        "idleTimeout": 720,
        "connectionLimit": 2,
        "charset": "utf8",
        "compress": true,
        "port": 3306,
        "multipleStatements": true,
        "namedPlaceholders": true,
        "dateStrings": true,
        "decimalAsNumber": true,
        "bigIntAsNumber": true,
        "insertIdAsNumber": true,
        "prepareCacheLength": 0
    });

    return {
        query: query,
        queryPool: queryPool
    }
}

export default {connect};