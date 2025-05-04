// src/extensions/users-permissions/strapi-server.ts

export default (plugin) => {
  // Log the entire controllers object to check its structure
  console.log("🔥 plugin.controllers.auth: ", plugin.controllers.auth);

  const originalRegister = plugin.controllers.auth?.register;

  if (!originalRegister) {
    console.log("❌ Register function not found. Please check the plugin structure.");
  }

  plugin.controllers.auth.register = async (ctx) => {
    console.log("🔥 Custom Register Controller Hit");

    const { first_name, last_name } = ctx.request.body;

    console.log("Received body data:", { first_name, last_name });

    // Call the original register function
    const response = await originalRegister(ctx);

    if (response?.user) {
      console.log("Updating user with first_name and last_name...");
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        response.user.id,
        {
          data: {
            first_name,
            last_name,
          },
        }
      );

      const updatedUser = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        response.user.id,
        {
          populate: ["role"],
        }
      );

      console.log("Updated User: ", updatedUser);

      response.user = updatedUser;
    }

    return response;
  };

  return plugin;
};
