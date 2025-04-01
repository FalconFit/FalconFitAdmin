import { DocumentReference } from "firebase/firestore";

export interface FirebaseMachineDetails{
  name: string,
  uuid: string,
  maxWeight: number,
  typicalReps: number,
  setsPerWorkout: number,
  personalRecord: number,
  restPeriod: number,
  progressionRate: number,
  machineComfort: string,
  userId?: DocumentReference;
}
