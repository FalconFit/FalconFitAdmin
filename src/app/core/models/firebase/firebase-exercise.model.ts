import { DocumentReference } from "firebase/firestore";

export interface FirebaseExercise{
  title: string,
  subtitle: string,
  description: string,
  machine?: string,
  machineId?: string,
  userId?: DocumentReference
}
