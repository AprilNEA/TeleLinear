import { HandlerContext, Handlers } from "$fresh/server.ts";
import { createHmac } from "https://deno.land/std@0.173.0/node/crypto.ts";
import { sendMarkdown } from "../../libs/sender.ts";
export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    const signature = createHmac("sha256", Deno.env.get("WEBHOOK_SECRET")!)
      .update(
        await req.arrayBuffer(),
      ).digest("hex");
    if (signature !== req.headers.get("linear-signature")) {
      return new Response(undefined, { status: 400 });
    }
    const payload = await req.json();
    // const { action, data, type, createdAt } = payload;
    await sendMarkdown(payload);
    // const event: "Issue" | "Comment" = req.headers.get("Linear-Event");
    // switch (event) {
    //   case "Issue":

    //     break;
    //   case "Comment":
    //     break;
    // }
    return new Response(undefined, { status: 200 });
  },
};
