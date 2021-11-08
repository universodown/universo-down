export const gender = {
    type: 'string',
    description: 'Sexo',
    enum: ['male', 'female', 'not-informed'],
    example: 'not-informed'
}

export const scholarity = {
    type: 'string',
    description: 'Escolaridade',
    enum: [
        'elementary-school',
        'high_school',
        'university-school',
        'masters-degree',
        'doctorate-degree'
    ],
    example: 'elementary-school'
}
