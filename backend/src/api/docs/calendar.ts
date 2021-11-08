import { daysOfWeek } from './enums'
import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Calendário não encontrado.')
}

export const pathCalendarBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['calendar'],
        summary: 'Criação de um novo calendário',
        operationId: 'createCalendar',
        parameters: [
            {
                in: 'body',
                name: 'calendar',
                schema: {
                    $ref: '#/definitions/CalendarCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Calendário cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/Calendar'
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

export const pathCalendarByUser = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['calendar'],
        summary: 'Retorna todos os calendários por usuário',
        operationId: 'getSpecialitiesByUser',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'ID do Usuário',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Lista de calendários cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Calendar'
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

export const pathCalendarId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['calendar'],
        summary: 'Retorna a calendário conforme ID',
        operationId: 'getCalendar',
        parameters: [
            {
                name: 'calendarId',
                in: 'path',
                description: 'ID da calendário',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Calendário selecionado',
                schema: {
                    $ref: '#/definitions/Calendar'
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
                description: 'Calendário não encontrado.',
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
        tags: ['calendar'],
        summary: 'Alteração de uma calendário conforme ID',
        operationId: 'updateCalendar',
        parameters: [
            {
                name: 'calendarId',
                in: 'path',
                description: 'ID da calendário',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'calendar',
                schema: {
                    $ref: '#/definitions/CalendarUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Calendário alterada com sucesso',
                schema: {
                    $ref: '#/definitions/Calendar'
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
                description: 'Calendário não encontrado.',
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
        tags: ['calendar'],
        summary: 'Deleta a calendário conforme ID',
        operationId: 'deleteCalendar',
        parameters: [
            {
                name: 'calendarId',
                in: 'path',
                description: 'ID da calendário',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Calendário excluída.',
                schema: {
                    $ref: '#/definitions/Calendar'
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
                description: 'Calendário não encontrada.',
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

export const calendarDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'ID da Calendário'
        },
        dayOfWeek: {
            ...daysOfWeek
        },
        startHour: {
            type: 'string',
            example: '08:00',
            description: 'Horário de Início'
        },
        endHour: {
            type: 'string',
            example: '12:00',
            description: 'Horário de Término'
        },
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'Usuário do calendário'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Calendário'
        }
    },
    required: [
        'id',
        'dayOfWeek',
        'startHour',
        'endHour',
        'userId',
        'organizationId'
    ]
}

export const calendarCreateDefinition = {
    type: 'object',
    properties: {
        dayOfWeek: {
            ...daysOfWeek
        },
        startHour: {
            type: 'string',
            example: '08:00',
            description: 'Horário de Início'
        },
        endHour: {
            type: 'string',
            example: '12:00',
            description: 'Horário de Término'
        },
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'Usuário do calendário'
        }
    },
    required: [
        'name'
    ]
}

export const calendarUpdateDefinition = {
    type: 'object',
    properties: {
        dayOfWeek: {
            ...daysOfWeek
        },
        startHour: {
            type: 'string',
            example: '08:00',
            description: 'Horário de Início'
        },
        endHour: {
            type: 'string',
            example: '12:00',
            description: 'Horário de Término'
        }
    }
}
