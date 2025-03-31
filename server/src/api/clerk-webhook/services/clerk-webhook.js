"use strict";

export async function processClerkWebhook(data) {
    const { event, user } = data;

    if (event === "user.created") {
        return strapi.entityService.create("plugin::users-permissions.user", {
            data: {
                username: user.id,
                email: user.email_addresses[0].email_address,
                provider: "clerk",
                confirmed: true,
            },
        });
    }

    return null;
}
