import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { IMachineRepository } from "../../repositories/interfaces/machine-repository.interface";
import { EXERCISE_REPOSITORY_TOKEN, MACHINE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { Exercise } from '../../models/exercise.model';
import { IExerciseService } from "../interfaces/exercise-service.interface";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends BaseService<Exercise> implements IExerciseService{
  constructor(
    @Inject(EXERCISE_REPOSITORY_TOKEN) repository: IMachineRepository
  ){
    super(repository)
  }

}
