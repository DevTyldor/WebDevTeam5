export type SignupStatus = 'Confirmed' | 'Waiting'

export interface SessionSignup {
    id: string
    sessionId: number
    memberId: string
    status: SignupStatus
    createdAt: string
    gameId?: number
}