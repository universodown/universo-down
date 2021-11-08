import { gender, scholarity } from './enums'
import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Atendido não encontrado.')
}

export const pathAssistedsBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['assisteds'],
        summary: 'Criação de um novo atendido',
        operationId: 'createAssisted',
        parameters: [
            {
                in: 'body',
                name: 'assisted',
                schema: {
                    $ref: '#/definitions/AssistedCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Atendido cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/Assisted'
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
    },
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['assisteds'],
        summary: 'Retorna todos os atendidos conforme login',
        operationId: 'getAssisteds',
        parameters: [],
        responses: {
            200: {
                description: 'Lista de atendidos cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Assisted'
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

export const pathAssistedsId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['assisteds'],
        summary: 'Retorna o atendido conforme ID',
        operationId: 'getAssisted',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do atendido',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Atendido selecionado',
                schema: {
                    $ref: '#/definitions/Assisted'
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
                description: 'Atendido não encontrado.',
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
        tags: ['assisteds'],
        summary: 'Alteração de um atendido conforme ID',
        operationId: 'updateAssisted',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do atendido',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'assisted',
                schema: {
                    $ref: '#/definitions/AssistedUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Atendido alterado com sucesso',
                schema: {
                    $ref: '#/definitions/Assisted'
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
                description: 'Atendido não encontrado.',
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
        tags: ['assisteds'],
        summary: 'Delete o atendido conforme ID',
        operationId: 'deleteAssisted',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do atendido',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Atendido excluído',
                schema: {
                    $ref: '#/definitions/Assisted'
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
                description: 'Atendido não encontrado.',
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

export const pathAssistedsIdentification = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['assisteds'],
        summary: 'Retorna o atendido conforme C.P.F.',
        operationId: 'getAssistedByIdentification',
        parameters: [
            {
                name: 'identification',
                in: 'path',
                description: 'C.P.F. do atendido',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Atendido selecionado',
                schema: {
                    $ref: '#/definitions/Assisted'
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
                description: 'Atendido não encontrado.',
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

export const assistedDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Atendido'
        },
        name: {
            type: 'string',
            example: 'Mariah Carolina Pereira',
            description: 'Nome do Atendido'
        },
        birthday: {
            type: 'date',
            example: '1963-03-05'
        },
        gender: {
            ...gender
        },
        identification: {
            type: 'string',
            example: '182.415.357-08',
            description: 'C.P.F. do Atendido'
        },
        nationalIdentity: {
            type: 'string',
            example: '25.606.124-5',
            description: 'R.G. do Atendido'
        },
        issue: {
            type: 'date',
            example: '1987-05-18',
            description: 'Data de Emissão'
        },
        issuer: {
            type: 'string',
            example: 'SSP/SC',
            description: 'Órgão Emissor'
        },
        zipCode: {
            type: 'string',
            example: '65907-466',
            description: 'CEP do Atendido'
        },
        address: {
            type: 'string',
            example: 'Rua Flor do Ipê',
            description: 'Endereço do Atendido'
        },
        number: {
            type: 'string',
            example: '861',
            description: 'Número da Residência do Atendido'
        },
        neighborhood: {
            type: 'string',
            example: 'Nova Imperatriz',
            description: 'Bairro do Atendido'
        },
        city: {
            type: 'string',
            example: 'Imperatriz',
            description: 'Cidade do Atendido'
        },
        state: {
            type: 'string',
            example: 'MA',
            description: 'Estado do Atendido'
        },
        phone: {
            type: 'string',
            example: '(98) 3999-9976',
            description: 'Telefone do Atendido'
        },
        hasBenefits: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido recebe benefícios'
        },
        scholarity: {
            ...scholarity
        },
        naturalness: {
            type: 'string',
            example: 'Joinville',
            description: 'Naturalidade do Atendido'
        },
        nationality: {
            type: 'string',
            example: 'Brasil',
            description: 'Nacionalidade do Atendido'
        },
        occupation: {
            type: 'string',
            example: 'Servente',
            description: 'Ocupação do Atendido'
        },
        generalRegistration: {
            type: 'string',
            example: '',
            description: 'Número de identificação geral'
        },
        active: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido está ativo'
        },
        additionalInformation: {
            type: 'string',
            example: 'Informação complementar',
            description: 'Informações complementares do Atendido'
        },
        photo: {
            type: 'string',
            example: '',
            description: 'Foto do Atendido em Base64'
        },
        benefits: {
            type: 'string',
            example: '',
            description: 'Benefício do Atendido'
        },
        socialIdentificationNumber: {
            type: 'NIS',
            example: '12086327724',
            description: 'Número do NIS do Atendido'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe o Atendido'
        }
    },
    required: [
        'id',
        'name',
        'birthday',
        'gender',
        'identification',
        'generalRegistration',
        'issue',
        'issuer',
        'zipCode',
        'address',
        'number',
        'neighborhood',
        'city',
        'state',
        'phone',
        'hasBenefits',
        'scholarity',
        'naturalness',
        'nationality',
        'nationalIdentity',
        'active',
        'socialIdentificationNumber',
        'organizationId'
    ]
}

export const assistedCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Mariah Carolina Pereira',
            description: 'Nome do Atendido'
        },
        birthday: {
            type: 'date',
            example: '1963-03-05'
        },
        gender: {
            ...gender
        },
        identification: {
            type: 'string',
            example: '182.415.357-08',
            description: 'C.P.F. do Atendido'
        },
        nationalIdentity: {
            type: 'string',
            example: '25.606.124-5',
            description: 'R.G. do Atendido'
        },
        issue: {
            type: 'date',
            example: '1987-05-18',
            description: 'Data de Emissão'
        },
        issuer: {
            type: 'string',
            example: 'SSP/SC',
            description: 'Órgão Emissor'
        },
        zipCode: {
            type: 'string',
            example: '65907-466',
            description: 'CEP do Atendido'
        },
        address: {
            type: 'string',
            example: 'Rua Flor do Ipê',
            description: 'Endereço do Atendido'
        },
        number: {
            type: 'string',
            example: '861',
            description: 'Número da Residência do Atendido'
        },
        neighborhood: {
            type: 'string',
            example: 'Nova Imperatriz',
            description: 'Bairro do Atendido'
        },
        city: {
            type: 'string',
            example: 'Imperatriz',
            description: 'Cidade do Atendido'
        },
        state: {
            type: 'string',
            example: 'MA',
            description: 'Estado do Atendido'
        },
        phone: {
            type: 'string',
            example: '(98) 3999-9976',
            description: 'Telefone do Atendido'
        },
        hasBenefits: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido recebe benefícios'
        },
        scholarity: {
            ...scholarity
        },
        naturalness: {
            type: 'string',
            example: 'Joinville',
            description: 'Naturalidade do Atendido'
        },
        nationality: {
            type: 'string',
            example: 'Brasil',
            description: 'Nacionalidade do Atendido'
        },
        occupation: {
            type: 'string',
            example: 'Servente',
            description: 'Ocupação do Atendido'
        },
        generalRegistration: {
            type: 'string',
            example: '',
            description: 'Número de identificação geral'
        },
        active: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido está ativo'
        },
        additionalInformation: {
            type: 'string',
            example: 'Informação complementar',
            description: 'Informações complementares do Atendido'
        },
        photo: {
            type: 'string',
            example: '',
            description: 'Foto do Atendido em Base64'
        },
        benefits: {
            type: 'string',
            example: '',
            description: 'Benefício do Atendido'
        },
        socialIdentificationNumber: {
            type: 'NIS',
            example: '12086327724',
            description: 'Número do NIS do Atendido'
        }
    },
    required: [
        'id',
        'name',
        'birthday',
        'gender',
        'identification',
        'generalRegistration',
        'issue',
        'issuer',
        'zipCode',
        'address',
        'number',
        'neighborhood',
        'city',
        'state',
        'phone',
        'hasBenefits',
        'scholarity',
        'naturalness',
        'nationality',
        'nationalIdentity',
        'active',
        'socialIdentificationNumber',
        'organizationId'
    ]
}

export const assistedUpdateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Mariah Carolina Pereira',
            description: 'Nome do Atendido'
        },
        birthday: {
            type: 'date',
            example: '1963-03-05'
        },
        gender: {
            ...gender
        },
        identification: {
            type: 'string',
            example: '182.415.357-08',
            description: 'C.P.F. do Atendido'
        },
        nationalIdentity: {
            type: 'string',
            example: '25.606.124-5',
            description: 'R.G. do Atendido'
        },
        issue: {
            type: 'date',
            example: '1987-05-18',
            description: 'Data de Emissão'
        },
        issuer: {
            type: 'string',
            example: 'SSP/SC',
            description: 'Órgão Emissor'
        },
        zipCode: {
            type: 'string',
            example: '65907-466',
            description: 'CEP do Atendido'
        },
        address: {
            type: 'string',
            example: 'Rua Flor do Ipê',
            description: 'Endereço do Atendido'
        },
        number: {
            type: 'string',
            example: '861',
            description: 'Número da Residência do Atendido'
        },
        neighborhood: {
            type: 'string',
            example: 'Nova Imperatriz',
            description: 'Bairro do Atendido'
        },
        city: {
            type: 'string',
            example: 'Imperatriz',
            description: 'Cidade do Atendido'
        },
        state: {
            type: 'string',
            example: 'MA',
            description: 'Estado do Atendido'
        },
        phone: {
            type: 'string',
            example: '(98) 3999-9976',
            description: 'Telefone do Atendido'
        },
        hasBenefits: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido recebe benefícios'
        },
        scholarity: {
            ...scholarity
        },
        naturalness: {
            type: 'string',
            example: 'Joinville',
            description: 'Naturalidade do Atendido'
        },
        nationality: {
            type: 'string',
            example: 'Brasil',
            description: 'Nacionalidade do Atendido'
        },
        occupation: {
            type: 'string',
            example: 'Servente',
            description: 'Ocupação do Atendido'
        },
        generalRegistration: {
            type: 'string',
            example: '',
            description: 'Número de identificação geral'
        },
        active: {
            type: 'boolean',
            example: true,
            description: 'Indica se o atendido está ativo'
        },
        additionalInformation: {
            type: 'string',
            example: 'Informação complementar',
            description: 'Informações complementares do Atendido'
        },
        photo: {
            type: 'string',
            example: '',
            description: 'Foto do Atendido em Base64'
        },
        benefits: {
            type: 'string',
            example: '',
            description: 'Benefício do Atendido'
        },
        socialIdentificationNumber: {
            type: 'string',
            example: '12086327724',
            description: 'Número do NIS do Atendido'
        }
    }
}
