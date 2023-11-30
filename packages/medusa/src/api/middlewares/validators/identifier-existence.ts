import { Request, Response, NextFunction } from "express"

// Middleware for Work Details
export function processIdentifierMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const identifier = req.query.identifier as string

  if (identifier) {
    // Modify query to use store_id instead of identifier
    req.query.store_id = identifier
    delete req.query.identifier
    next() // Call next() to pass control to the next middleware in the chain
  } else {
    // Send response indicating that identifier is required
    res.status(422).json({
      code: 422,
      type: "invalid_request_error",
      message: "Identifier is required in the query parameters.",
    })
  }
}
