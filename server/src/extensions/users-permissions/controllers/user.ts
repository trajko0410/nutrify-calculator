import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "plugin::users-permissions.user",
  ({ strapi }) => ({
    async me(ctx) {
      console.log("🔥 Custom /users/me controller running");

      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in.");
      }

      const userWithRole = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user.id,
        {
          populate: { role: true },
        }
      );

      ctx.body = userWithRole;
    },
  })
);
