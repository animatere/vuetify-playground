import { UserData } from '@/interfaces/interfaces'

export function userResetCurrentUser() {
  return {
      id: "",
      username: "",
      email: "",
      password: "",
      loggedIn: false,
      registered: false,
  } as UserData
}
