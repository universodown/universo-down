-- Update an organization
INSERT INTO organization
VALUES (
        18,
        'Lar de Idosos',
        'Acolhimento para Idosos',
        'lar.idoso.com'
    );
INSERT INTO users
VALUES(
        19,
        'Administrador',
        '',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'admin@lar.idoso.com',
        18,
        'owner',
        'secretary',
        '2021-10-27',
        'not-informed',
        '',
        '',
        '2021-10-27',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );

-- Delete an organization
INSERT INTO organization
VALUES (
        19,
        'Lar de Removido',
        'Inclusão errada',
        'lar.wrong.com'
    );
INSERT INTO users
VALUES(
        20,
        'Administrador',
        '',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'admin@lar.wrong.com',
        19,
        'owner',
        'secretary',
        '2021-10-27',
        'not-informed',
        '',
        '',
        '2021-10-27',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );

-- Find an organization
INSERT INTO organization
VALUES (
        20,
        'Lar Abdon Batista',
        'Atender crianças e adolescentes em situação de vulnerabilidade social, proporcionando-lhes um ambiente familiar acolhedor, com base em valores cristãos, transformando pequenas vidas em cidadãos conscientes de seus deveres e direitos, e aptos a assumirem suas responsabilidades na sociedade.',
        'larabdonbatista.com.br'
    );
INSERT INTO users
VALUES(
        21,
        'Administrador',
        '',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'admin@larabdonbatista.com.br',
        20,
        'owner',
        'secretary',
        '2021-10-27',
        'not-informed',
        '',
        '',
        '2021-10-27',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );


-- Organization to Users Tests
INSERT INTO organization
VALUES (
        21,
        'ACAMPE',
        'Associação Catarinense de Apoio Multiprofissional ao Portador de Necessidades Especiais',
        'acampe.com.br'
    );
INSERT INTO users
VALUES(
        22,
        'Administrador',
        '',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'admin@acampe.com.br',
        21,
        'owner',
        'secretary',
        '2021-10-27',
        'not-informed',
        '',
        '',
        '2021-10-27',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );

INSERT INTO users
VALUES(
        23,
        'Luiza',
        'Dias',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'luiza.dias@acampe.com.br',
        21,
        'member',
        'profissional',
        '2021-10-27',
        'not-informed',
        '',
        '',
        '2021-10-27',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );
INSERT INTO users
VALUES(
        24,
        'Teresinha',
        'Conceição',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'teresinha.conceicao@acampe.com.br',
        21,
        'member',
        'profissional',
        '1952-06-13',
        'female',
        '536.400.759-60',
        '1241',
        '1980-10-27',
        'SSP/SC',
        '89251-560',
        'Rua Severino Schiochet',
        '952',
        'Centro',
        'Jaraguá do Sul',
        'SC',
        '(47) 3556-8750',
        '31.090.489-4'
    );