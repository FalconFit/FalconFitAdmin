import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { EXERCISE_REPOSITORY_TOKEN, MACHINE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { Exercise } from '../../models/exercise.model';
import { IExerciseService } from "../interfaces/exercise-service.interface";
import { IExerciseRepository } from "../../repositories/interfaces/exercise-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends BaseService<Exercise> implements IExerciseService{
  constructor(
    @Inject(EXERCISE_REPOSITORY_TOKEN) repository: IExerciseRepository
  ){
    super(repository)
  }

}
