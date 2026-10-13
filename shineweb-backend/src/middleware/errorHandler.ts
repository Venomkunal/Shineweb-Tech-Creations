import type { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response): void {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(error: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction): void {
  const status = error.status ?? 500;
  if (process.env.NODE_ENV !== 'production') console.error(error);
  res.status(status).json({ success: false, message: status === 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message });
}
