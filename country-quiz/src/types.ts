export interface Answer {
  question: number,
  answer: string
}

export interface Question {
  question: string,
  options: string[],
  correct_answer: string
}
