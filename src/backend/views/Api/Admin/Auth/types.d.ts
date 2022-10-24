export namespace Type {
    type name = string
    type password = string

    export namespace login {
        export namespace request {
            export type body = {
                name: name,
                password: password
            }
        }
    }
    export namespace select {
        export type row = {
            name: name
        }
        export type queryResult = Array<{
            id: id,
            name: name,
            password: password
        }>
    }
}