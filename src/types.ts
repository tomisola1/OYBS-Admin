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

export interface PrayerProps {
    _id: string,
    picture: string,
    startDate: string,
    text: string,
    meetingLink: string,
    createdAt: string,
    updatedAt: string,
}

export interface QuizProps {
    _id: string,
    title: string,
    description: string,
    monthlyQuiz: boolean,
    startDateTime: string,
    endDateTime: string,
    duration: number,
    questionCount: number,
    canReview: boolean,
    createdAt: string,
    updatedAt: string,
}

export interface InsightProps {
    _id: string,
    day: 65,
    content: string,
    likes: number,
    bookTitles: [string],
    userId: string,
    createdAt:string,
    updatedAt: string
}

export interface DonationsProps {
    _id: string,
    userId: {
        _id: string,
        firstName: string,
        lastName: string,
        profilePicture: string
    },
    amount: number,
    currency: string,
    transactionStatus: string,
    paymentGateway: string,
    createdAt: string,
    updatedAt: string,
}