export interface UserProps {
  _id?: string;
  email?: string;
  streak?: number;
  dateJoined: string;
  fullName?: string;
  insightsShared?: number;
  phoneNumber?: string | number;
  isSuspended: boolean;
}

export interface AdminProps {
    firstName: string;
  lastName: string;
  email: string;
  userType: string;
  profilePicture: string;
}

export interface UserDetailProps {
  donations: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  streak: number;
  quizzesTaken: number;
  insightsShared: number;
  phoneNumber: string | number;
  userSuspension:{
    _id: string,
    userId: string,
    reason: string,
    daysSuspended: number,
    suspensionEndsAt: string,
  }
}

export interface PrayerProps {
  _id: string;
  picture: string;
  startDate: string;
  text: string;
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
}


export interface QuizProps {
  _id?: string;
  title?: string;
  description?: string;
  monthlyQuiz?: boolean;
  startDateTime: string;
  endDateTime: string;
  duration?: number;
  questionCount?: number;
  canReview?: boolean;
  createdAt?: string;
  updatedAt?: string;
  author?: AdminProps;
  questions?:[QuestionsProps]
  status: 'PENDING' | 'COMPLETED' | 'LIVE'
}

export interface InsightProps {
  _id: string;
  day: 65;
  content: string;
  likes: number;
  bookTitles: [string];
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DonationsProps {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  amount: number;
  currency: string;
  transactionStatus: string;
  paymentGateway: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsProps {
  _id?: string;
  quiz?: string;
  question: string;
  answer: string;
  answerDescription: string;
  choice: string[];
}

export interface AdminProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
  picture: string;
  createdAt: string;
}

export interface NotificationProps {
  body: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface ScriptureProps {
    _id?: string,
    day: string,
    oldTestament: {
        schedule: [ScheduleProps],
        title: string,
    },
    newTestament: {
        schedule: [ScheduleProps],
        title: string,
    },
    createdAt: string,
    updatedAt?: string,
}

export interface ScheduleProps {
    bookId: string,
    chapter: number,
    startVerse: string,
    endVerse: string,
    _id?: string
}

export interface QuizTakersProps {
    _id: {
        month: number;
        year: number;
    };
    totalUsers: number;
}

export interface MonthMap {
    [key: number]: string;
}

export interface BooksProps {
    bookId: string,
    testament: string,
    name: string,
    shortName: string,
    chapterSize: number
}

export interface BookInfoProps {
    chapter: number,
    verses: number
}