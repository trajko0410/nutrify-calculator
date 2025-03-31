export default [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::body",
    config: {
      multipart: true,
      jsonLimit: "10mb",
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: "*", // or set Clerk's domain here
      headers: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE"], // Ensure POST is supported
    },
  },
];
