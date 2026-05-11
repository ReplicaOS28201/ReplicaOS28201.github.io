import errorHandler from "./Core/View/ErrorHandler.js";

export default function errorScene(error) {
  return {
    status: "error",
    message: errorHandler(error, "Scene"),
  };
}
