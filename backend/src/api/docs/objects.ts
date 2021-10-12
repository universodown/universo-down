type Error = {
    type: string
    properties: {
        error: {
            type: string
            example: string
        }
    }
}

export const propertiesError: Error = {
    type: 'object',
    properties: {
        error: {
            type: 'string',
            example: ''
        }
    }
}

export function getError(example?: string): Error {
    return {
        type: 'object',
        properties: {
            error: {
                type: 'string',
                example: example ?? 'string'
            }
        }
    }
}
