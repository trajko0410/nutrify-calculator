"use strict";

export async function handleWebhook(ctx) {
    try {
        const { event, data } = ctx.request.body;
        await strapi
            .service("api::clerk-webhook.clerk-webhook")
            .processClerkWebhook({ event, user: data });
        ctx.send({ message: "Webhook received" });
    } catch (error) {
        strapi.log.error("Error handling Clerk webhook", error);
        ctx.badRequest("Failed to process webhook");
    }
}
