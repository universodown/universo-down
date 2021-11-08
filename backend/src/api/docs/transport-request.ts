import { evolutionStatus } from './enums'
import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Solicitação não encontrada.')
}

export const pathTransportRequestsBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['transport-requests'],
        summary: 'Criação de uma nova solicitação',
        operationId: 'createTransportRequest',
        parameters: [
            {
                in: 'body',
                name: 'transportRequest',
                schema: {
                    $ref: '#/definitions/TransportRequestCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Solicitação cadastra com sucesso',
                schema: {
                    $ref: '#/definitions/TransportRequest'
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
            500: {
                description: 'O servidor encontrou uma situação com a qual '
                    + 'não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const patTransportRequestByAssisted = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['transport-requests'],
        summary: 'Retorna todos os solicitações conforme assistido',
        operationId: 'getTransportRequests',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do Assistido',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Lista de solicitações cadastras',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/TransportRequest'
                    }
                }
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const pathTransportRequestsId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['transport-requests'],
        summary: 'Retorna o solicitação conforme ID',
        operationId: 'getTransportRequest',
        parameters: [
            {
                name: 'transportRequestId',
                in: 'path',
                description: 'ID da Solicitação',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Solicitação selecionada',
                schema: {
                    $ref: '#/definitions/TransportRequest'
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
                description: 'Solicitação não encontrada.',
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
        tags: ['transport-requests'],
        summary: 'Alteração de uma solicitação conforme ID',
        operationId: 'updateTransportRequest',
        parameters: [
            {
                name: 'transportRequestId',
                in: 'path',
                description: 'ID da Solicitação',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'transportRequest',
                schema: {
                    $ref: '#/definitions/TransportRequestUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Solicitação alterado com sucesso',
                schema: {
                    $ref: '#/definitions/TransportRequest'
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
                description: 'Solicitação não encontrada.',
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
        tags: ['transport-requests'],
        summary: 'Deleta a solicitação conforme ID',
        operationId: 'deleteTransportRequest',
        parameters: [
            {
                name: 'transportRequestId',
                in: 'path',
                description: 'ID da Solicitação',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Solicitação excluído',
                schema: {
                    $ref: '#/definitions/TransportRequest'
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
                description: 'Solicitação não encontrada.',
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

export const pathTransportRequestsAssistedId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['transport-requests'],
        summary: 'Retorna o solicitação conforme Assistido',
        operationId: 'getTransportRequestAssisted',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do Assistido',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Lista de solicitações cadastras',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/TransportRequest'
                    }
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
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const transportRequestDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id da Solicitação'
        },
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Solicitação'
        },
        responseDate: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data do Retorno'
        },
        status: {
            ...evolutionStatus
        },
        observation: {
            type: 'string',
            description: 'Observação da Solicitação',
            example: 'Pedido com urgência'
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Assistido'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Solicitação'
        }
    },
    required: [
        'id',
        'date',
        'responseDate',
        'status',
        'assistedId',
        'organizationId'
    ]
}

export const transportRequestCreateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Solicitação'
        },
        responseDate: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data do Retorno'
        },
        status: {
            ...evolutionStatus
        },
        observation: {
            type: 'string',
            description: 'Observação da Solicitação',
            example: 'Pedido com urgência'
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Assistido'
        }
    },
    required: [
        'date',
        'responseDate',
        'status',
        'assistedId'
    ]
}

export const transportRequestUpdateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Solicitação'
        },
        responseDate: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data do Retorno'
        },
        status: {
            ...evolutionStatus
        },
        observation: {
            type: 'string',
            description: 'Observação da Solicitação',
            example: 'Pedido com urgência'
        }
    }
}
