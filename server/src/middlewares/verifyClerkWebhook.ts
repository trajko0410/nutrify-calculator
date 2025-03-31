import crypto from "crypto";

export default async (ctx, next) => {
  const clerkSecret = process.env.CLERK_WEBHOOK_SECRET;
  const signature = ctx.request.headers["clerk-signature"];
  const body = JSON.stringify(ctx.request.body);

  if (!signature || !clerkSecret) {
    return ctx.throw(401, "Missing Clerk signature");
  }

  const expectedSignature = crypto
    .createHmac("sha256", clerkSecret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return ctx.throw(403, "Invalid Clerk signature");
  }

  await next();
};
