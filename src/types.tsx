export interface userType{
    name: string,
    score: number,
    questions: question[],
    id: string,
    blocked?: boolean,
}

export interface question{
    questionId: Number,
    timeTaken: number,
}