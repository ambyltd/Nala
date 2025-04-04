class Logger {
  private isProduction = process.env.NODE_ENV === 'production';
  private source: string;
  
  constructor(source: string) {
    this.source = source;
  }
  
  private formatMessage(message: string): string {
    return `[${this.source}] ${message}`;
  }
  
  info(message: string, data?: any): void {
    console.info(this.formatMessage(message), data || '');
  }
  
  warn(message: string, data?: any): void {
    console.warn(this.formatMessage(message), data || '');
  }
  
  error(message: string, error?: any): void {
    console.error(this.formatMessage(message), error || '');
    
    // En production, on pourrait envoyer les erreurs à un service de monitoring
    if (this.isProduction && error) {
      this.captureException(error);
    }
  }
  
  debug(message: string, data?: any): void {
    if (!this.isProduction) {
      console.debug(this.formatMessage(message), data || '');
    }
  }
  
  private captureException(error: Error | unknown): void {
    // Ici, vous pourriez intégrer un service comme Sentry
    // Par exemple: Sentry.captureException(error);
    console.log("Error captured:", error);
  }
}

export const createLogger = (source: string) => new Logger(source);

export default Logger;
