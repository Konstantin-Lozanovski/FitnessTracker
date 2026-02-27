import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness Tracker API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
