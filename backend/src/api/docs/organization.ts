import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação.'
    ),
    404: getError('Organização não encontrada.')
}

export const pathOrganizationBase = {
    parameters: [],
    post: {
        security: [],
        tags: ['organizations'],
        summary: 'Criação de uma nova organização',
        operationId: 'createOrganization',
        parameters: [
            {
                in: 'body',
                name: 'organization',
                schema: {
                    $ref: '#/definitions/OrganizationCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Organização cadastrada com sucesso',
                schema: {
                    $ref: '#/definitions/Organization'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const pathOrganizationId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['organizations'],
        summary: 'Retorna a organização conforme ID',
        operationId: 'getOrganization',
        parameters: [
            {
                name: 'organizationId',
                in: 'path',
                description: 'ID da organização',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Organização selecionada',
                schema: {
                    $ref: '#/definitions/Organization'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida.'
                    + ' { Necessário informar o ID }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Organização não encontrada.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    },
    put: {
        security: [{ BearerJWT: [] }],
        tags: ['organizations'],
        summary: 'Alteração de uma organização conforme ID',
        operationId: 'updateOrganization',
        parameters: [
            {
                name: 'organizationId',
                in: 'path',
                description: 'ID da organização',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'organization',
                schema: {
                    $ref: '#/definitions/OrganizationUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Organização alterada com sucesso',
                schema: {
                    $ref: '#/definitions/Organization'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Organização não encontrada.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    },
    delete: {
        security: [{ BearerJWT: [] }],
        tags: ['organizations'],
        summary: 'Deletar a organização conforme ID',
        operationId: 'deleteOrganization',
        parameters: [
            {
                name: 'organizationId',
                in: 'path',
                description: 'ID do organização',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Organização excluída',
                schema: {
                    $ref: '#/definitions/Organization'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida.'
                    + ' { Necessário informar o ID }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Organização não encontrada.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const organizationDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id da Organização'
        },
        name: {
            type: 'string',
            example: 'Lar de Luz',
            description: 'Nome da Organização'
        },
        description: {
            type: 'string',
            example: 'Organização de acolhimento',
            description: 'Descrição detalhada da organização'
        },
        domain: {
            type: 'string',
            example: 'domain.com',
            description: 'Domínio de emails'
        }
    },
    required: ['id', 'name', 'description', 'domain']
}

export const organizationCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Lar de Luz',
            description: 'Nome da Organização'
        },
        description: {
            type: 'string',
            example: 'Organização de acolhimento',
            description: 'Descrição detalhada da organização'
        },
        domain: {
            type: 'string',
            example: 'domain.com',
            description: 'Domínio de emails'
        }
    },
    required: ['name', 'description', 'domain']
}

export const organizationUpdateDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id da Organização'
        },
        name: {
            type: 'string',
            example: 'Lar de Luz',
            description: 'Nome da Organização'
        },
        description: {
            type: 'string',
            example: 'Organização de acolhimento',
            description: 'Descrição detalhada da organização'
        },
        domain: {
            type: 'string',
            example: 'domain.com',
            description: 'Domínio de emails'
        }
    },
    required: ['id']
}
