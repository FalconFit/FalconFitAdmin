import { Observable } from "rxjs";

  export abstract class BaseMediaService<T = number> {
    public abstract upload(blob:Blob):Observable<T[]>;
  }
