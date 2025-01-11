import { DocumentReference } from "firebase/firestore"

export interface Machine {
  title:string,
  subtitle: string,
  description: string,
  taken: Boolean,
  exerciseId?: DocumentReference,
  userId?: DocumentReference
}
