export default ({ strapi }) => {
  // You can access strapi here and define your custom logic
  strapi.controllers.auth.register = async (ctx) => {
    console.log("🔥 Custom register controller hit");

    const response = await strapi.controllers.auth.register(ctx);

    const { first_name, last_name } = ctx.request.body;

    if (response?.user) {
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

      response.user = updatedUser;
    }

    return response;
  };

  return strapi;
};
