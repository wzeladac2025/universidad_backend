const swaggerJSDoc = require("swagger-jsdoc");

const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Backend Universidad Web Services",
    version: "1.0.0",
    description: "API Web Services Proyecto Universidad",
  },
  components
};

const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js", "server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
