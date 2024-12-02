import { UserData } from '@/interfaces/interfaces'

export function userResetCurrentUser() {
  return {
      id: 0,
      username: "",
      email: "",
      password: "",
      loggedIn: false,
      registered: false,
  } as UserData
}
