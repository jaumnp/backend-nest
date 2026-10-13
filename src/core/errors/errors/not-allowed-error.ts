import { IServicesError } from '../services-error.ts';

export class NotAllowed extends Error implements IServicesError {
  constructor(message = 'Not allowed') {
    super(message);
  }
}
