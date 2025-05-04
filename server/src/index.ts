module.exports = {
  register({ strapi }) {
    const controller = strapi.plugin("users-permissions").controllers.auth;
    const originalRegister = controller.register;

    controller.register = async (ctx) => {
      const { first_name, last_name } = ctx.request.body;

      // Call the original register function
      const result = await originalRegister.call(controller, ctx);

      // Get the user object from the response
      const { user } = result;

      if (user) {
        // Update the user object with the custom fields
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;

        // Save the user (if required)
        await strapi.plugins["users-permissions"].services.user.edit(
          { id: user.id },
          { first_name, last_name }
        );
      }

      return result;
    };
  },

  bootstrap({ strapi }) {
    // Any initialization logic for your plugin
  },
};
