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
import {
    pathProfessionalAttendanceBase,
    pathProfessionalAttendanceId,
    professionalAttendanceCreateDefinition,
    professionalAttendanceUpdateDefinition,
    professionalAttendanceDefinition,
    pathProfessionalAttendanceEvolution
} from './professional-attendance'
import {
    assistedCreateDefinition,
    assistedDefinition,
    assistedUpdateDefinition,
    pathAssistedsBase,
    pathAssistedsId,
    pathAssistedsIdentification
} from './assisted'
import {
    pathSpecialityBase,
    pathSpecialityId,
    pathSpecialityName,
    specialityCreateDefinition,
    specialityDefinition,
    specialityUpdateDefinition
} from './speciality'
import {
    pathRelatedBase,
    pathRelatedByAssisted,
    pathRelatedIdentification,
    pathRelatedsId,
    relatedCreateDefinition,
    relatedDefinition,
    relatedUpdateDefinition
} from './related'
import {
    evolutionRecordCreateDefinition,
    evolutionRecordDefinition,
    evolutionRecordUpdateDefinition,
    pathEvolutionRecordsAssistedId,
    pathEvolutionRecordsBase,
    pathEvolutionRecordsId
} from './evolution-record'
import {
    pathNeedSpecialityByEvolution,
    pathNeedSpecialityBase,
    pathNeedSpecialityId,
    needSpecialityDefinition,
    needSpecialityCreateDefinition
} from './need-speciality'
import {
    pathSpecialitiesBase,
    pathSpecialitiesByUser,
    pathSpecialitiesId,
    specialitiesCreateDefinition,
    specialitiesDefinition
} from './specialities'
import {
    calendarCreateDefinition,
    calendarDefinition,
    calendarUpdateDefinition,
    pathCalendarBase,
    pathCalendarByUser,
    pathCalendarId
} from './calendar'
import {
    pathSchoolRequestsAssistedId,
    pathSchoolRequestsBase,
    pathSchoolRequestsId,
    schoolRequestCreateDefinition,
    schoolRequestDefinition,
    schoolRequestUpdateDefinition
} from './school-request'
import {
    pathTransportRequestsAssistedId,
    pathTransportRequestsBase,
    pathTransportRequestsId,
    transportRequestCreateDefinition,
    transportRequestDefinition,
    transportRequestUpdateDefinition
} from './transport-request'

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
        },
        {
            name: 'professionalsAttendances',
            description: 'Controle do Atendimento Profissional'
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
        '/api/v1/professionalAttendance': pathProfessionalAttendanceBase,
        '/api/v1/professionalAttendance/evolutionRecord/{evolutionRecordId}':
            pathProfessionalAttendanceEvolution,
        '/api/v1/professionalAttendance/{professionalAttendanceId}':
            pathProfessionalAttendanceId,
        '/api/v1/assisted': pathAssistedsBase,
        '/api/v1/assisted/{assistedId}': pathAssistedsId,
        '/api/v1/assisted/identification/{identification}':
            pathAssistedsIdentification,
        '/api/v1/evolution-record': pathEvolutionRecordsBase,
        '/api/v1/evolution-record/{evolutionRecordId}': pathEvolutionRecordsId,
        '/api/v1/evolution-record/assisted/{assistedId}':
            pathEvolutionRecordsAssistedId,
        '/api/v1/need-speciality': pathNeedSpecialityBase,
        '/api/v1/need-speciality/{needSpecialityId}': pathNeedSpecialityId,
        '/api/v1/need-speciality/evolution-record/{evolutionRecordId}':
            pathNeedSpecialityByEvolution,
        '/api/v1/speciality': pathSpecialityBase,
        '/api/v1/speciality/{specialityId}': pathSpecialityId,
        '/api/v1/speciality/name/{name}': pathSpecialityName,
        '/api/v1/specialities': pathSpecialitiesBase,
        '/api/v1/specialities/{specialitiesId}': pathSpecialitiesId,
        '/api/v1/specialities/user/{userId}':
            pathSpecialitiesByUser,
        '/api/v1/calendar': pathCalendarBase,
        '/api/v1/calendar/{calendarId}': pathCalendarId,
        '/api/v1/calendar/user/{userId}':
            pathCalendarByUser,
        '/api/v1/school-request': pathSchoolRequestsBase,
        '/api/v1/school-request/{schoolRequestId}': pathSchoolRequestsId,
        '/api/v1/school-request/assisted/{assistedId}':
            pathSchoolRequestsAssistedId,
        '/api/v1/transport-request': pathTransportRequestsBase,
        '/api/v1/transport-request/{transportRequestId}':
            pathTransportRequestsId,
        '/api/v1/transport-request/assisted/{assistedId}':
            pathTransportRequestsAssistedId,
        '/api/v1/related': pathRelatedBase,
        '/api/v1/related/{relatedId}': pathRelatedsId,
        '/api/v1/related/assisted/{assistedId}': pathRelatedByAssisted,
        '/api/v1/related/identification/{identification}':
            pathRelatedIdentification,
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
        ProfessionalAttendance: professionalAttendanceDefinition,
        ProfessionalAttendanceCreate: professionalAttendanceCreateDefinition,
        ProfessionalAttendanceUpdate: professionalAttendanceUpdateDefinition,
        Assisted: assistedDefinition,
        AssistedCreate: assistedCreateDefinition,
        AssistedUpdate: assistedUpdateDefinition,
        Related: relatedDefinition,
        RelatedCreate: relatedCreateDefinition,
        RelatedUpdate: relatedUpdateDefinition,
        Speciality: specialityDefinition,
        SpecialityCreate: specialityCreateDefinition,
        SpecialityUpdate: specialityUpdateDefinition,
        NeedSpeciality: needSpecialityDefinition,
        NeedSpecialityCreate: needSpecialityCreateDefinition,
        Specialities: specialitiesDefinition,
        SpecialitiesCreate: specialitiesCreateDefinition,
        Calendar: calendarDefinition,
        CalendarCreate: calendarCreateDefinition,
        CalendarUpdate: calendarUpdateDefinition,
        EvolutionRecord: evolutionRecordDefinition,
        EvolutionRecordCreate: evolutionRecordCreateDefinition,
        EvolutionRecordUpdate: evolutionRecordUpdateDefinition,
        SchoolRequest: schoolRequestDefinition,
        SchoolRequestCreate: schoolRequestCreateDefinition,
        SchoolRequestUpdate: schoolRequestUpdateDefinition,
        TransportRequest: transportRequestDefinition,
        TransportRequestCreate: transportRequestCreateDefinition,
        TransportRequestUpdate: transportRequestUpdateDefinition,
        LoginCreate: loginCreate,
        Login: loginDefinition,
        Logout: logoutDefinition
    }
}
