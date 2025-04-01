import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private defaultMessages: Record<number | string, string> = {
    default: 'Неизвестная ошибка',
    400: 'Некорректный запрос',
    401: 'Неверные учетные данные',
    403: 'Доступ запрещен',
    404: 'Ресурс не найден',
    500: 'Ошибка сервера',
  };

  public getUserFriendlyMessage(
    error: unknown,
    errorMessages: Record<string | number, string> = this.defaultMessages
  ): string {
    const status = this.getErrorStatus(error);
    return errorMessages[status] || errorMessages['default'];
  }

  private isHttpErrorResponse(error: unknown): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
  }

  private getErrorStatus(error: unknown): number {
    return (this.isHttpErrorResponse(error) && error.status) || 500;
  }
}
