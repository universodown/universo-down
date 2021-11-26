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
        'admin@lar.idoso.com',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
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
        '',
        18
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
        'admin@lar.wrong.com',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
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
        '',
        19
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
        'admin@larabdonbatista.com.br',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
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
        '',
        20
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
        'admin@acampe.com.br',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
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
        '',
        21
    );

INSERT INTO users
VALUES(
        23,
        'Luiza',
        'Dias',
        'luiza.dias@acampe.com.br',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'member',
        'professional',
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
        '',
        21
    );
INSERT INTO users
VALUES(
        24,
        'Teresinha',
        'Conceição',
        'teresinha.conceicao@acampe.com.br',
        '$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq',
        'member',
        'professional',
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
        '31.090.489-4',
        21
    );