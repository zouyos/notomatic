export type NoteType = {
  id?: string
  _id?: string,
  title: string,
  content: string,
  created_at: string,
  modified_at: string,
  userId: string,
}

export type User = {
  id?: string,
  _id?: string,
  email: string,
  password: string,
  resetPasswordToken: string,
  resetPasswordExpires: string,
}