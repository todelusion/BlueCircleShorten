import { z } from "zod";

// eslint-disable-next-line import/prefer-default-export
export const schemaSuccess = z.object({
  data: z
    .object({
      status: z.string(),
    })
    .optional(),
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
    headers: z.object({
      Accept: z.string(),
      "Content-Type": z.string().optional(),
    }),
    method: z.string(),
    url: z.string(),
    data: z.string().optional(),
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
    method: z.string(),
    url: z.string(),
    data: z.string().optional(),
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

export const schemaUrlList = z.object({
  status: z.string(),
  urlList: z.array(
    z.object({
      _id: z.string(),
      url: z.string(),
      shortUrl: z.string(),
      userId: z.string(),
      title: z.string(),
      description: z.string(),
      photo: z.string(),
      tag: z.array(z.unknown()),
      urlId: z.string(),
      repeatTimes: z.number(),
      notRepeatTimes: z.number(),
      __v: z.number(),
    })
  ),
});

export type UrlListResponse = z.infer<typeof schemaUrlList>;

export type SuccessResponse = z.infer<typeof schemaSuccess>;

export type ErrorResponse = z.infer<typeof schemaError>;
