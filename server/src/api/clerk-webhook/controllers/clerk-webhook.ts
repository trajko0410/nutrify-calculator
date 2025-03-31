export default {
  async handleWebhook(ctx) {
    console.log("🔗 Clerk Webhook received", ctx.request.body);

    ctx.send({
      message: "Webhook received successfully",
    });
  },
};
