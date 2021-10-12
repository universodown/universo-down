import { loginCreate, loginDefinition, pathLogin } from './login'
import { logoutDefinition, pathLogout } from './logout'
import {
    organizationCreateDefinition,
    organizationDefinition,
    organizationUpdateDefinition,
    pathOrganizationBase,
    pathOrganizationId
} from './organization'
import {
    pathUsersBase,
    pathUsersId,
    userDefinition,
    userCreateDefinition,
    userUpdateDefinition
} from './users'

export const apiDoc = {
    swagger: '2.0',
    basePath: '/',
    info: {
        title: 'universo-down',
        description: 'Documentação da api universo-down,'
            + ' que disponibiliza os endpoints para controle da aplicação do'
            + ' Universo Down.',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: [
        'http',
        'https'
    ],

    tags: [
        {
            name: 'users',
            description: 'Controle de Usuário'
        },
        {
            name: 'organizations',
            description: 'Controle de Organização'
        },
        {
            name: 'auth',
            description: 'Autenticação'
        }
    ],

    securityDefinitions: {
        BearerJWT: {
            in: 'header',
            description: 'Authorization with JWT',
            name: 'x-access-token',
            type: 'apiKey'
        }
    },

    paths: {
        '/api/v1/user': pathUsersBase,
        '/api/v1/user/{userId}': pathUsersId,
        '/api/v1/organization': pathOrganizationBase,
        '/api/v1/organization/{organizationId}': pathOrganizationId,
        '/api/v1/login': pathLogin,
        '/api/v1/logout': pathLogout
    },
    definitions: {
        User: userDefinition,
        UserCreate: userCreateDefinition,
        UserUpdate: userUpdateDefinition,
        Organization: organizationDefinition,
        OrganizationCreate: organizationCreateDefinition,
        OrganizationUpdate: organizationUpdateDefinition,
        LoginCreate: loginCreate,
        Login: loginDefinition,
        Logout: logoutDefinition
    }
}
