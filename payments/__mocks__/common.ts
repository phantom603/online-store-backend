export const requireAuth = async (req: any, res: any, next: any) => {
  console.log("requireAuth mock called");

  req.currentUser = {
    id: "1",
    email: "foo@biz.common",
  };

  next();
};

export const validateRequest = async (req: any, res: any, next: any) => {
  console.log("validateRequest mock called");

  next();
};

export const errorHandler = async (err: any, req: any, res: any, next: any) => {
  console.log("errorHandler mock called");

  next();
};

export class NotFoundError extends Error {
  constructor() {
    super("Not found");
  }
}
