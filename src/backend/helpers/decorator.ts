import "reflect-metadata";
import {Connection} from "buildmsql";

const metadata = {
    connection: Symbol('connection')
}

const defineMetadata = (metadataKey: Symbol) => {
    return function(target: any, propertyKey: string, parameterIndex: number) {
        const metadataValue = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        metadataValue.push(parameterIndex);
        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }
}

export const connection = () => defineMetadata(metadata.connection);

export const http = () => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function() {
            const args: IArguments[] = [];
            const connections: Connection[] = [];
            const metadataConnection = Reflect.getOwnMetadata(metadata.connection, target, propertyKey) || [];

            for (const key of metadataConnection) {
                const connect = await this.$context.db.query.getConnection();
                args[key] = connect;
                connections.push(connect);
            }

            try {
                if (['init'].includes(propertyKey)) {
                    await method.apply(this, args);
                } else {
                    return this.success(await method.apply(this, args));
                }
            } catch (e) {
                if (connections.length) await Promise.all(connections.map(connection => connection.rollback()));

                return this.error(e);
            } finally {
                if (connections.length) await Promise.all(connections.map(connection => connection.release()));
            }
        }
    }
}