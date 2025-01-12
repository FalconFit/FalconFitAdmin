import { DocumentReference } from "firebase/firestore"

export interface FirebaseMachine {
  title:string,
  subtitle: string,
  description: string,
  taken: Boolean,
  exerciseId?: DocumentReference,
  userId?: DocumentReference
}
