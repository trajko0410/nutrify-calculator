// src/config/plugins.ts

export default ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      },
    },
  },

  "users-permissions": {
    enabled: true,
    config: {
      // Add custom configurations here if needed
    },
  },
});
