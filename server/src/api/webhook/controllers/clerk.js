// api/webhook/controllers/clerk.js

module.exports = {
  async handleClerkWebhook(ctx) {
    const { body } = ctx.request;

    if (!body || !body.user_id) {
      return ctx.throw(400, "Invalid data");
    }

    try {
      const user = await strapi.services.user.findOne({
        clerkUserId: body.user_id,
      });

      if (!user) {
        // Create the user if not found
        await strapi.services.user.create({
          username: body.email, // Customize this to your data
          email: body.email,
          clerkUserId: body.user_id,
          // Add any other necessary fields
        });
      } else {
        // Update the user if found
        await strapi.services.user.update(
          { id: user.id },
          {
            username: body.email, // Customize this to your data
            email: body.email,
            // Update any other necessary fields
          }
        );
      }
      const jwt = strapi.plugins["users-permissions"].services.jwt;

      const token = jwt.issue({
        id: user.id,
        email: user.email,
        username: user.username,
        // Add other fields as necessary
      });

      // Return the JWT token along with a success message
      ctx.send({ token, message: "User data synced and JWT issued" });

      ctx.send({ message: "User data synced with Strapi" });
    } catch (err) {
      console.log("Error while processing Clerk webhook:", err);
      ctx.throw(500, "Internal Server Error");
    }
  },
};
