export type CreateLogBody = {
  userId: string;
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    parentResourceId: string;
  };
};

export type GetLogParams = {
  userId: string;
  level?: string;
  message?: string | RegExp;
  messageExactMatch?: boolean;
  resourceId?: string;
  timestamp?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
  min_timestamp?: string;
  max_timestamp?: string;
  'metadata.parentResourceId'?: string;
};
