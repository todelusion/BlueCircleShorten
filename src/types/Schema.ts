import { z } from "zod";

// eslint-disable-next-line import/prefer-default-export
export const schemaPOST = z.object({
  data: z.object({
    status: z.string(),
    user: z.object({ token: z.string(), name: z.string() }).optional(),
  }),
  status: z.number(),
  statusText: z.string(),
  headers: z.object({
    "content-length": z.string(),
    "content-type": z.string(),
  }),
  config: z.object({
    transitional: z.object({
      silentJSONParsing: z.boolean(),
      forcedJSONParsing: z.boolean(),
      clarifyTimeoutError: z.boolean(),
    }),
    timeout: z.number(),
    xsrfCookieName: z.string(),
    xsrfHeaderName: z.string(),
    maxContentLength: z.number(),
    maxBodyLength: z.number(),
    headers: z.object({ Accept: z.string(), "Content-Type": z.string() }),
    method: z.string(),
    url: z.string(),
    data: z.string(),
  }),
  request: z.object({}),
});

export const schemaError = z.object({
  message: z.string(),
  name: z.string(),
  config: z.object({
    transitional: z.object({
      silentJSONParsing: z.boolean(),
      forcedJSONParsing: z.boolean(),
      clarifyTimeoutError: z.boolean(),
    }),
    timeout: z.number(),
    xsrfCookieName: z.string(),
    xsrfHeaderName: z.string(),
    maxContentLength: z.number(),
    maxBodyLength: z.number(),
    headers: z.object({ Accept: z.string(), "Content-Type": z.string() }),
    method: z.string(),
    url: z.string(),
    data: z.string(),
  }),
  code: z.string(),
  status: z.number().optional(),
  response: z.object({
    data: z.object({ message: z.string() }),
    status: z.number(),
    statusText: z.string(),
    headers: z.object({
      "content-length": z.string(),
      "content-type": z.string(),
    }),
    config: z.object({
      transitional: z.object({
        silentJSONParsing: z.boolean(),
        forcedJSONParsing: z.boolean(),
        clarifyTimeoutError: z.boolean(),
      }),
      timeout: z.number(),
      xsrfCookieName: z.string(),
      xsrfHeaderName: z.string(),
      maxContentLength: z.number(),
      maxBodyLength: z.number(),
      headers: z.object({ Accept: z.string(), "Content-Type": z.string() }),
      method: z.string(),
      url: z.string(),
      data: z.string(),
    }),
    request: z.object({}),
  }),
});

export type PostPatchResponse = z.infer<typeof schemaPOST>;

export type ErrorResponse = z.infer<typeof schemaError>;
