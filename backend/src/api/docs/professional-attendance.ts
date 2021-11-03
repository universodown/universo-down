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

export const pathProfessionalAttendanceBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['professionalsAttendances'],
        summary: 'Criação de um novo Atendimento Profissional',
        operationId: 'createProfessionalAttendance',
        parameters: [
            {
                in: 'body',
                name: 'professionalAttendance',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendanceCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Atendimento Profissional cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendance'
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

export const pathProfessionalAttendanceEvolution = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['professionalsAttendances'],
        summary: 'Retorna todos os Atendimentos conforme Evolução do Atendido',
        operationId: 'getProfessionalAttendance',
        parameters: [
            {
                name: 'evolutionRecordId',
                in: 'path',
                description: 'ID da Evolução do Atendido',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Lista de Atendimentos cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/ProfessionalAttendance'
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

export const pathProfessionalAttendanceId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['professionalsAttendances'],
        summary: 'Retorna o Atendimento Profissional conforme ID',
        id: 'getProfessionalAttendance',
        parameters: [
            {
                name: 'professionalAttendanceId',
                in: 'path',
                description: 'ID do Atendimento Profissional',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Atendimento Profissional selecionado',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendance'
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
        tags: ['professionalsAttendances'],
        summary: 'Alteração de um Atendimento Profissional conforme ID',
        operationId: 'updateProfessionalAttendance',
        parameters: [
            {
                name: 'professionalAttendanceId',
                in: 'path',
                description: 'ID do Atendimento Profissional',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'professionalAttendance',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendanceUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Atendimento Profissional alterado com sucesso',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendance'
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
        tags: ['professionalsAttendances'],
        summary: 'Deletar o Atendimento Profissional conforme ID',
        operationId: 'deleteProfessionalAttendance',
        parameters: [
            {
                name: 'professionalAttendanceId',
                in: 'path',
                description: 'ID do Atendimento Profissional',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Atendimento Profissional excluído',
                schema: {
                    $ref: '#/definitions/ProfessionalAttendance'
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

export const professionalAttendanceDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Atendimento Profissional'
        },
        date: {
            type: 'datetime',
            example: '2021-10-10T10:00:00.000Z',
            description: 'Horário do Atendimento'
        },
        result: {
            type: 'string',
            example: 'Resultado do Atendimento Profissional',
            description: 'Descrição detalhada do Atendimento Profissional'
        },
        quantify: {
            type: 'number',
            example: '4',
            description: 'Quantidade de Atendimentos'
        },
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Usuário'
        },
        evolutionRecordId: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Registro de Evolução'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Id da Organização'
        }
    },
    required: [
        'id',
        'date',
        'result',
        'quantify',
        'userId',
        'evolutionRecordId',
        'organizationId'
    ]
}

export const professionalAttendanceCreateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'datetime',
            example: '2021-10-10T10:00:00.000Z',
            description: 'Horário do Atendimento'
        },
        result: {
            type: 'string',
            example: 'Resultado do Atendimento Profissional',
            description: 'Descrição detalhada do Atendimento Profissional'
        },
        quantify: {
            type: 'number',
            example: '4',
            description: 'Quantidade de Atendimentos'
        },
        evolutionRecordId: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Registro de Evolução'
        }
    },
    required: [
        'id',
        'date',
        'result',
        'quantify',
        'evolutionRecordId'
    ]
}

export const professionalAttendanceUpdateDefinition = {
    type: 'object',
    properties: {
        date: {
            type: 'datetime',
            example: '2021-10-10T10:00:00.000Z',
            description: 'Horário do Atendimento'
        },
        result: {
            type: 'string',
            example: 'Resultado do Atendimento Profissional',
            description: 'Descrição detalhada do Atendimento Profissional'
        },
        quantify: {
            type: 'number',
            example: '4',
            description: 'Quantidade de Atendimentos'
        }
    }
}
