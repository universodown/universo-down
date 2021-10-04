import Container from "typedi"
import OrganizationService from "../services/organization"
import UserService from "../services/user"
import { Context } from "./dto/context"

export async function getContext(userId: number): Promise<Context> {
    const userService = Container.get(UserService)
    const organizationService = Container.get(OrganizationService)

    const user = await userService.find(userId)
    const organization = await organizationService.find(user.organizationId)

    return { user, organization }
}