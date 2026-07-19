import { ZodError } from "zod";
import type { Request, Response } from "express";

export type ApiErrorCode =
  | "bad_request"
  | "conflict"
  | "forbidden"
  | "internal_error"
  | "method_not_allowed"
  | "not_found"
  | "unauthorized"
  | "validation_error"
  | "too_many_requests";

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly details?: unknown;
  readonly status: number;

  constructor(status: number, code: ApiErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof ZodError) {
    return new ApiError(422, "validation_error", "Request validation failed", error.flatten());
  }

  return new ApiError(500, "internal_error", "An unexpected server error occurred");
}

/**
 * Machine‑readable error catalogue (excluding internal errors).
 */
export const errorCatalogue = [
  { code: "bad_request", status: 400, retryable: false, summary: "The request could not be understood or was missing required parameters." },
  { code: "conflict", status: 409, retryable: false, summary: "The request could not be completed due to a conflict with the current state of the resource." },
  { code: "forbidden", status: 403, retryable: false, summary: "The client does not have permission to perform the requested operation." },
  { code: "method_not_allowed", status: 405, retryable: false, summary: "The HTTP method is not supported for the requested resource." },
  { code: "not_found", status: 404, retryable: false, summary: "The requested resource could not be found." },
  { code: "unauthorized", status: 401, retryable: false, summary: "Authentication is required or has failed." },
  { code: "validation_error", status: 422, retryable: false, summary: "The request payload failed validation." },
  { code: "too_many_requests", status: 429, retryable: true, summary: "Rate limit exceeded; the client should retry after a back‑off period." },
] as const;

/**
 * Express handler exposing the error catalogue as JSON (versioned).
 */
export function getErrorCatalogue(req: Request, res: Response) {
  res.json({
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    errors: errorCatalogue,
  });
}
