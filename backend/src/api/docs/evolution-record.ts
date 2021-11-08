import { evolutionStatus } from './enums'
import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Evolução não encontrada.')
}

export const pathEvolutionRecordsBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['evolution-records'],
        summary: 'Criação de uma nova evolução',
        operationId: 'createEvolutionRecord',
        parameters: [
            {
                in: 'body',
                name: 'evolutionRecord',
                schema: {
                    $ref: '#/definitions/EvolutionRecordCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Evolução cadastra com sucesso',
                schema: {
                    $ref: '#/definitions/EvolutionRecord'
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

export const patEvolutionRecordByAssisted = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['evolution-records'],
        summary: 'Retorna todos os evoluções conforme assistido',
        operationId: 'getEvolutionRecords',
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
                description: 'Lista de evoluções cadastras',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/EvolutionRecord'
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

export const pathEvolutionRecordsId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['evolution-records'],
        summary: 'Retorna o evolução conforme ID',
        operationId: 'getEvolutionRecord',
        parameters: [
            {
                name: 'evolutionRecordId',
                in: 'path',
                description: 'ID da Evolução',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Evolução selecionada',
                schema: {
                    $ref: '#/definitions/EvolutionRecord'
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
                description: 'Evolução não encontrada.',
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
        tags: ['evolution-records'],
        summary: 'Alteração de uma evolução conforme ID',
        operationId: 'updateEvolutionRecord',
        parameters: [
            {
                name: 'evolutionRecordId',
                in: 'path',
                description: 'ID da Evolução',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'evolutionRecord',
                schema: {
                    $ref: '#/definitions/EvolutionRecordUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Evolução alterado com sucesso',
                schema: {
                    $ref: '#/definitions/EvolutionRecord'
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
                description: 'Evolução não encontrada.',
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
        tags: ['evolution-records'],
        summary: 'Deleta a evolução conforme ID',
        operationId: 'deleteEvolutionRecord',
        parameters: [
            {
                name: 'evolutionRecordId',
                in: 'path',
                description: 'ID da Evolução',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Evolução excluído',
                schema: {
                    $ref: '#/definitions/EvolutionRecord'
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
                description: 'Evolução não encontrada.',
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

export const pathEvolutionRecordsAssistedId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['evolution-records'],
        summary: 'Retorna o evolução conforme Assistido',
        operationId: 'getEvolutionRecordAssisted',
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
                description: 'Lista de evoluções cadastras',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/EvolutionRecord'
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

export const evolutionRecordDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id da Evolução'
        },
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Avaliação'
        },
        status: {
            ...evolutionStatus
        },
        weight: {
            type: 'double',
            description: 'Peso do Evolução',
            example: 80.0
        },
        height: {
            type: 'double',
            description: 'Altura do Evolução',
            example: 1.90
        },
        report: {
            type: 'string',
            example: 'Encontra-se em perfeitas condições.',
            description: 'Parecer do Atendimento'
        },
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'Usuário que realizou a evolução.'
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Assistido'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Evolução'
        }
    },
    required: [
        'id',
        'date',
        'status',
        'weight',
        'height',
        'report',
        'userId',
        'assistedId',
        'organizationId'
    ]
}

export const evolutionRecordCreateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Avaliação'
        },
        status: {
            ...evolutionStatus
        },
        weight: {
            type: 'double',
            description: 'Peso do Evolução',
            example: 80.0
        },
        height: {
            type: 'double',
            description: 'Altura do Evolução',
            example: 1.90
        },
        report: {
            type: 'string',
            example: 'Encontra-se em perfeitas condições.',
            description: 'Parecer do Atendimento'
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Assistido'
        }
    },
    required: [
        'date',
        'status',
        'weight',
        'height',
        'report',
        'assistedId'
    ]
}

export const evolutionRecordUpdateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'date',
            example: '2021-09-08',
            description: 'Data da Avaliação'
        },
        status: {
            ...evolutionStatus
        },
        weight: {
            type: 'double',
            description: 'Peso do Evolução',
            example: 80.0
        },
        height: {
            type: 'double',
            description: 'Altura do Evolução',
            example: 1.90
        },
        report: {
            type: 'string',
            example: 'Encontra-se em perfeitas condições.',
            description: 'Parecer do Atendimento'
        }
    }
}
