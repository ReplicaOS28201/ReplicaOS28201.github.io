export class EngineError extends Error {
  constructor(
    message,
    { context = "3DENGINE", code = "ENGINE_ERROR", details = null } = {},
  ) {
    super(message);
    this.name = "EngineError";
    this.context = context;
    this.code = code;
    this.details = details;
  }
}

export function formatError(error, context = "3DENGINE") {
  if (error instanceof EngineError) {
    return `[${error.context}] (${error.code}) ${error.message}`;
  }

  const message = error instanceof Error ? error.message : String(error);
  return `[${context}] ${message}`;
}

export function createErrorPayload(error, context = "3DENGINE") {
  return {
    status: "error",
    message: formatError(error, context),
    details: error instanceof EngineError ? error.details : null,
  };
}

export default formatError;
