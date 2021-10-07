export const propertiesError = {
    type: 'object',
    properties: {
        error: {
            type: 'string',
        }
    }
}

export function getError(example?: string) {
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