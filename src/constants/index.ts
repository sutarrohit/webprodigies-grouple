import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./form"
import {
    GROUP_PAGE_MENU,
    GroupMenuProps,
    LANDING_PAGE_MENU,
    MenuProps,
} from "./menus"
import {
    CREATE_GROUP_PLACEHOLDER,
    CreateGroupPlaceholderProps,
} from "./palceholder"

import { GROUP_LIST, GroupListProps } from "./slider"

type NexoraConstantsProps = {
    landingPageMenu: MenuProps[]
    signUpForm: AuthFormProps[]
    signInForm: AuthFormProps[]
    groupList: GroupListProps[]
    createGroupPlaceholder: CreateGroupPlaceholderProps[]
    groupPageMenu: GroupMenuProps[]
}

export const NEXORA_CONSTANTS: NexoraConstantsProps = {
    landingPageMenu: LANDING_PAGE_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
    groupList: GROUP_LIST,
    createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
    groupPageMenu: GROUP_PAGE_MENU,
}
