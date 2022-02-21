import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Next,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//context = original request\
// reference to the request handler in our controller

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // Run something before request handler
    console.log('running before handler');

    return next.handle().pipe(
      map((data: any) => {
        console.log('running before response is sent out', data);
        return {
          status: 'succes',
          data: data,
        };
      }),
    );
  }
}
