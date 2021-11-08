import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Especialidade não encontrado.')
}

export const pathNeeSpecialityBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['need-speciality'],
        summary: 'Criação de uma nova necessidade de especialidade',
        operationId: 'createNeeSpeciality',
        parameters: [
            {
                in: 'body',
                name: 'needSpeciality',
                schema: {
                    $ref: '#/definitions/NeeSpecialityCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Necessidade cadastrada com sucesso',
                schema: {
                    $ref: '#/definitions/NeeSpeciality'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta'
                    + ' ação. { (details) }',
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

export const pathNeedSpecialityByEvolution = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['need-speciality'],
        summary: 'Retorna todas as necessidades conforme evolução',
        operationId: 'getSpecialities',
        parameters: [
            {
                name: 'evolutionRecordId',
                in: 'path',
                description: 'ID da Evolução',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Lista de necessidades cadastradas',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/NeeSpeciality'
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

export const pathNeeSpecialityId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['need-speciality'],
        summary: 'Retorna a necessidade de especialidade conforme ID',
        operationId: 'getNeeSpeciality',
        parameters: [
            {
                name: 'needSpecialityId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Especialidade selecionado',
                schema: {
                    $ref: '#/definitions/NeeSpeciality'
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
                description: 'Especialidade não encontrado.',
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
        tags: ['need-speciality'],
        summary: 'Alteração de uma especialidade conforme ID',
        operationId: 'updateNeeSpeciality',
        parameters: [
            {
                name: 'needSpecialityId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'needSpeciality',
                schema: {
                    $ref: '#/definitions/NeeSpecialityUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Necessidade alterada com sucesso',
                schema: {
                    $ref: '#/definitions/NeeSpeciality'
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
                description: 'Necessidade não encontrado.',
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
        tags: ['need-speciality'],
        summary: 'Deleta a necessidade conforme ID',
        operationId: 'deleteNeeSpeciality',
        parameters: [
            {
                name: 'needSpecialityId',
                in: 'path',
                description: 'ID da necessidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Necessidade excluída.',
                schema: {
                    $ref: '#/definitions/NeeSpeciality'
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
                description: 'Necessidade não encontrada.',
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

export const specialityDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'ID da Especialidade'
        },
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Nome da Especialidade'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Especialidade'
        }
    },
    required: [
        'id',
        'name',
        'organizationId'
    ]
}

export const specialityCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Nome da Especialidade'
        }
    },
    required: [
        'name'
    ]
}

export const specialityUpdateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Nome da Especialidade'
        }
    }
}
