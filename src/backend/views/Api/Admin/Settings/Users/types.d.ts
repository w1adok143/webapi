export namespace Type {
    type id = number
    type name = string
    type password = string

    export namespace select {
        export type row = {
            id: id
        }
        export type queryResult = Array<{
            id: id,
            name: name,
            password: password
        }>
    }
    export namespace find {
        export type row = {
            name: name
        }
        export type queryResult = Array<{
            id: id,
            name: name,
            password: password
        }>
    }
    export namespace insert {
        export namespace request {
            export type body = {
                name: name,
                password: password
            }
        }
        export type row = {
            name: name,
            password: password,
            password_raw: password
        }
    }
    export namespace update {
        export namespace request {
            export type body = {
                name: name,
                password: password
            }
        }
        export type row = {
            id: id,
            name: name,
            password: password,
            password_raw: password
        }
    }
    export namespace remove {
        export type row = {
            id: id
        }
    }
}