import type { FailedRequest } from "@/constants/auth.types";

let queue: FailedRequest[] = [];

export const processQueue = (error: unknown, token: string | null) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  queue = [];
};

export const addToQueue = (req: FailedRequest) => {
  queue.push(req);
};
