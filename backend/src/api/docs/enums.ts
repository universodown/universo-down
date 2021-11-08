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

export const civilStatus = {
    type: 'string',
    description: 'Status cívil de Familiar',
    enum: [
        'single', 'married', 'divorced',
        'widower', 'judicially-separated'
    ],
    example: 'single'
}

export const evolutionStatus = {
    type: 'string',
    description: 'Evolução',
    enum: [
        'pending',
        'done',
        'refused'
    ],
    example: 'pending'
}

export const daysOfWeek = {
    type: 'string',
    description: 'Dia da Semana',
    enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ],
    example: 'monday'
}
