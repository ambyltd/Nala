export class ApiError extends Error {
  public statusCode: number;
  public context?: any;

  constructor(message: string, statusCode = 500, context?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.context = context;
  }
}

export class DataFetchError extends Error {
  public source: string;
  public context?: any;

  constructor(message: string, source: string, context?: any) {
    super(message);
    this.name = 'DataFetchError';
    this.source = source;
    this.context = context;
  }
}

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
    };
  }
  
  return {
    error: error instanceof Error ? error.message : 'Une erreur inconnue s\'est produite',
    statusCode: 500
  };
};
