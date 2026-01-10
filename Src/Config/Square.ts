import { SquareEnvironment, SquareClient } from "square";
const environment =
  process.env.SQUARE_ENV === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

export const squareClient = new SquareClient({
  environment,
  token: process.env.SQUAREBOX_ACCESS_TOKEN!,
});
