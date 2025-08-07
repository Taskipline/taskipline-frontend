export interface DeleteAccountCredentials {
  password: string
}

export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
}

export interface UpdateProfileResponse {
  message: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    // Add other user properties as needed
  }
}
