import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { throwError } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const customMessage = request.customMessage || 'Success';
        const apiResponse: ApiResponse = {
          statusCode: response.statusCode,
          message: customMessage,
          data,
        };
        return apiResponse;
      }),
      catchError((err) => {
        const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const apiResponse: ApiResponse = {
          statusCode,
          message: err.message || 'Internal server error',
          data: null,
        };
        response.status(statusCode).json(apiResponse);
        return throwError(() => err);
      }),
    );
  }
}
