export type NoteType = {
  id?: string
  _id?: string,
  title: string,
  content: string,
  created_at: string | Date,
  modified_at?: string | Date,
  userId: string,
  __v?: number
}

export type User = {
  id?: string,
  _id?: string,
  email: string,
  password: string,
  resetPasswordToken: string,
  resetPasswordExpires: string,
}