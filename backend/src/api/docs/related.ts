import { civilStatus, gender, scholarity } from './enums'
import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Familiar não encontrando')
}

export const pathRelatedBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['relateds'],
        summary: 'Criação de um novo familiar.',
        operationId: 'createRelated',
        parameters: [
            {
                in: 'body',
                name: 'related',
                schema: {
                    $ref: '#/definitions/RelatedCreate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Familiar cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/Related'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + '{ (details) }',
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

export const pathRelatedByAssisted = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['relateds'],
        summary: 'Retorna todos os familiares conforme atendido',
        operationId: 'getRelateds',
        parameters: [
            {
                name: 'assistedId',
                in: 'path',
                description: 'ID do familiar',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Lista de familiares cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Related'
                    }
                }
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + '{ (details) }',
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

export const pathRelatedIdentification = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['relateds'],
        summary: 'Retorna o familiar conforme C.P.F.',
        operationId: 'getRelatedByIdentification',
        parameters: [
            {
                name: 'identification',
                in: 'path',
                description: 'C.P.F. do familiar',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Familiar selecionado',
                schema: {
                    $ref: '#/definitions/Related'
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
                description: 'Familiar não encontrado.',
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

export const pathRelatedsId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['relateds'],
        summary: 'Retorna o familiar conforme ID',
        operationsId: 'getRelated',
        parameters: [
            {
                name: 'relatedId',
                in: 'path',
                description: 'ID do familiar',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Familiar selecionado',
                schema: {
                    $ref: '#/definitions/Related'
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
                description: 'Familiar não encontrado.',
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
        tags: ['relateds'],
        summary: 'Alteração de um familiar conforme ID',
        operationId: 'uppdateRelated',
        parameters: [
            {
                name: 'relatedId',
                in: 'path',
                description: 'ID do familiar',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'related',
                schema: {
                    $ref: '#/definitions/RelatedUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Familiar alterado com sucesso',
                schema: {
                    $ref: '#/definitions/Related'
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
                description: 'Familiar não encontrado.',
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
        tags: ['relateds'],
        summary: 'Delete o familiar conforme ID',
        operationId: 'deleteRelated',
        parameters: [
            {
                name: 'relatedId',
                in: 'path',
                description: 'ID do familiar',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Familiar excluído',
                schema: {
                    $ref: '#/definitions/Related'
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
                description: 'Familiar não encontrado.',
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

export const relatedDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Familiar'
        },
        name: {
            type: 'string',
            example: 'José Carlos dos Anjos',
            description: 'Nome completo do Familiar'
        },
        birthday: {
            type: 'date',
            example: '1996-05-04',
            description: 'Data de nascimento do Familiar'
        },
        gender: {
            ...gender
        },
        civilStatus: {
            ...civilStatus
        },
        identification: {
            type: 'string',
            example: '12312312319',
            description: 'Documento CPF.'
        },
        relationship: {
            type: 'string',
            description: 'Relação do familiar com atendido.',
            enum: [
                'couple', 'father', 'mother', 'father-in-low', 'mother-in-low',
                'sibling', 'grandparent', 'step-parent', 'patchwork-family'
            ],
            example: 'mother'
        },
        generalRegistration: {
            type: 'string',
            description: 'Documento adicional',
            example: '12312313'
        },
        issue: {
            type: 'date',
            description: 'Data de expedição do documento de familiar',
            example: '2021-05-04'
        },
        issuer: {
            type: 'string',
            description: 'Orgão emissor do documento de familiar',
            example: 'SSP-SC'
        },
        zipCode: {
            type: 'string',
            description: 'CEP do familiar',
            example: '12345678'
        },
        address: {
            type: 'string',
            description: 'Endereço da rua do familiar',
            example: 'R: São Miguel'
        },
        number: {
            type: 'string',
            description: 'Número da casa do familiar',
            example: 'Nº 288'
        },
        neighborhood: {
            type: 'string',
            description: 'Bairro do endereço do familiar',
            example: 'Bom Retiro'
        },
        city: {
            type: 'string',
            description: 'Cidade do endereço do familiar',
            example: 'Joinville'
        },
        state: {
            type: 'string',
            description: 'Estado do endereço do familiar',
            example: 'Santa Catarina'
        },
        phone: {
            type: 'string',
            description: 'Contato telefônico do familiar',
            example: '(47) 99999-9999'
        },
        naturalness: {
            type: 'string',
            description: 'Naturalidade do familiar',
            example: 'Argentina'
        },
        nationality: {
            type: 'string',
            description: 'Nacionalidade do familiar',
            example: 'Argentina'
        },
        scholarity: {
            ...scholarity
        },
        revenue: {
            type: 'float',
            description: 'Receita do familiar',
            example: '2500.00'
        },
        professionalSituation: {
            type: 'string',
            description: 'Situação Profissional do familiar.',
            example: 'Tempo integral'
        },
        occupation: {
            type: 'string',
            description: 'Cargo do familiar',
            example: 'Analista de Logística'
        },
        nationalIdentity: {
            type: 'string',
            description: 'RG do familiar',
            example: '1234567'
        },
        responsible: {
            type: 'boolean',
            description: 'O familiar é o responsável?',
            example: true
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe o familiar'
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'Atendido no qual compõe o familiar'
        }
    },
    required: [
        'id',
        'name',
        'birthday',
        'gender',
        'civilStatus',
        'identification',
        'relationship',
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
        'naturalness',
        'nationality',
        'scholarity',
        'revenue',
        'professionalSituation',
        'occupation',
        'nationalIdentity',
        'reponsible',
        'organizationId',
        'assistedId'
    ]
}

export const relatedCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'José Carlos dos Anjos',
            description: 'Nome completo do Familiar'
        },
        birthday: {
            type: 'date',
            example: '1996-05-04',
            description: 'Data de nascimento do Familiar'
        },
        gender: {
            type: 'string',
            description: 'Sexo do familiar',
            enum: ['male', 'female', 'not-informed'],
            example: 'not-informed'
        },
        civilStatus: {
            type: 'string',
            description: 'Status cívil de Familiar',
            enum: [
                'single', 'married', 'divorced',
                'widower', 'judicially-separated'
            ],
            example: 'single'
        },
        identification: {
            type: 'string',
            example: '12312312319',
            description: 'Documento CPF.'
        },
        relationship: {
            type: 'string',
            description: 'Relação do familiar com atendido.',
            enum: [
                'couple', 'father', 'mother', 'father-in-low', 'mother-in-low',
                'sibling', 'grandparent', 'step-parent', 'patchwork-family'
            ],
            example: 'mother'
        },
        generalRegistration: {
            type: 'string',
            description: 'Documento adicional',
            example: '12312313'
        },
        issue: {
            type: 'date',
            description: 'Data de expedição do documento de familiar',
            example: '2021-05-04'
        },
        issuer: {
            type: 'string',
            description: 'Orgão emissor do documento de familiar',
            example: 'SSP-SC'
        },
        zipCode: {
            type: 'string',
            description: 'CEP do familiar',
            example: '12345678'
        },
        address: {
            type: 'string',
            description: 'Endereço da rua do familiar',
            example: 'R: São Miguel'
        },
        number: {
            type: 'string',
            description: 'Número da casa do familiar',
            example: 'Nº 288'
        },
        neighborhood: {
            type: 'string',
            description: 'Bairro do endereço do familiar',
            example: 'Bom Retiro'
        },
        city: {
            type: 'string',
            description: 'Cidade do endereço do familiar',
            example: 'Joinville'
        },
        state: {
            type: 'string',
            description: 'Estado do endereço do familiar',
            example: 'Santa Catarina'
        },
        phone: {
            type: 'string',
            description: 'Contato telefônico do familiar',
            example: '(47) 99999-9999'
        },
        naturalness: {
            type: 'string',
            description: 'Naturalidade do familiar',
            example: 'Argentina'
        },
        nationality: {
            type: 'string',
            description: 'Nacionalidade do familiar',
            example: 'Argentina'
        },
        scholarity: {
            type: 'string',
            description: 'Escolaridade do familiar',
            enum: [
                'elementary-school',
                'high_school',
                'university-school',
                'masters-degree',
                'doctorate-degree'
            ],
            example: 'university-school'
        },
        revenue: {
            type: 'float',
            description: 'Receita do familiar',
            example: '2500.00'
        },
        professionalSituation: {
            type: 'string',
            description: 'Situação Profissional do familiar.',
            example: 'Tempo integral'
        },
        occupation: {
            type: 'string',
            description: 'Cargo do familiar',
            example: 'Analista de Logística'
        },
        nationalIdentity: {
            type: 'string',
            description: 'RG do familiar',
            example: '1234567'
        },
        responsible: {
            type: 'boolean',
            description: 'O familiar é o responsável?',
            example: true
        },
        assistedId: {
            type: 'integer',
            format: 'int64',
            description: 'Atendido no qual compõe o familiar'
        }
    },
    required: [
        'name',
        'birthday',
        'gender',
        'civilStatus',
        'identification',
        'relationship',
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
        'naturalness',
        'nationality',
        'scholarity',
        'revenue',
        'professionalSituation',
        'occupation',
        'nationalIdentity',
        'reponsible',
        'assistedId'
    ]
}

export const relatedUpdateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'José Carlos dos Anjos',
            description: 'Nome completo do Familiar'
        },
        birthday: {
            type: 'date',
            example: '1996-05-04',
            description: 'Data de nascimento do Familiar'
        },
        gender: {
            type: 'string',
            description: 'Sexo do familiar',
            enum: ['male', 'female', 'not-informed'],
            example: 'not-informed'
        },
        civilStatus: {
            type: 'string',
            description: 'Status cívil de Familiar',
            enum: [
                'single', 'married', 'divorced',
                'widower', 'judicially-separated'
            ],
            example: 'single'
        },
        identification: {
            type: 'string',
            example: '12312312319',
            description: 'Documento CPF.'
        },
        relationship: {
            type: 'string',
            description: 'Relação do familiar com atendido.',
            enum: [
                'couple', 'father', 'mother', 'father-in-low', 'mother-in-low',
                'sibling', 'grandparent', 'step-parent', 'patchwork-family'
            ],
            example: 'mother'
        },
        generalRegistration: {
            type: 'string',
            description: 'Documento adicional',
            example: '12312313'
        },
        issue: {
            type: 'date',
            description: 'Data de expedição do documento de familiar',
            example: '2021-05-04'
        },
        issuer: {
            type: 'string',
            description: 'Orgão emissor do documento de familiar',
            example: 'SSP-SC'
        },
        zipCode: {
            type: 'string',
            description: 'CEP do familiar',
            example: '12345678'
        },
        address: {
            type: 'string',
            description: 'Endereço da rua do familiar',
            example: 'R: São Miguel'
        },
        number: {
            type: 'string',
            description: 'Número da casa do familiar',
            example: 'Nº 288'
        },
        neighborhood: {
            type: 'string',
            description: 'Bairro do endereço do familiar',
            example: 'Bom Retiro'
        },
        city: {
            type: 'string',
            description: 'Cidade do endereço do familiar',
            example: 'Joinville'
        },
        state: {
            type: 'string',
            description: 'Estado do endereço do familiar',
            example: 'Santa Catarina'
        },
        phone: {
            type: 'string',
            description: 'Contato telefônico do familiar',
            example: '(47) 99999-9999'
        },
        naturalness: {
            type: 'string',
            description: 'Naturalidade do familiar',
            example: 'Argentina'
        },
        nationality: {
            type: 'string',
            description: 'Nacionalidade do familiar',
            example: 'Argentina'
        },
        scholarity: {
            type: 'string',
            description: 'Escolaridade do familiar',
            enum: [
                'elementary-school',
                'high_school',
                'university-school',
                'masters-degree',
                'doctorate-degree'
            ],
            example: 'university-school'
        },
        revenue: {
            type: 'float',
            description: 'Receita do familiar',
            example: '2500.00'
        },
        professionalSituation: {
            type: 'string',
            description: 'Situação Profissional do familiar.',
            example: 'Tempo integral'
        },
        occupation: {
            type: 'string',
            description: 'Cargo do familiar',
            example: 'Analista de Logística'
        },
        nationalIdentity: {
            type: 'string',
            description: 'RG do familiar',
            example: '1234567'
        },
        responsible: {
            type: 'boolean',
            description: 'O familiar é o responsável?',
            example: true
        }
    }
}
