"use strict";

export const routes = [
    {
        method: "POST",
        path: "/clerk-webhook",
        handler: "clerk-webhook.handleWebhook",
        config: {
            auth: false, // Webhooks should usually be public
        },
    },
];
