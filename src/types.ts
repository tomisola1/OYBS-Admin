export interface UserProps {
    _id?: string,
    email?: string,
    streak?: number,
    dateJoined: string,
    fullName?: string,
    insightsShared?: number
    phoneNumber?: string | number
}

export interface UserDetailProps {
    donations: number,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    gender: string,
    streak: number,
    quizzesTaken: number,
    insightsShared: number,
    phoneNumber: string | number,
}