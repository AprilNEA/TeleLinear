export async function sendMarkdown(content: string) {
  await fetch(
    `https://api.telegram.org/bot${Deno.env.get("BOT_TOKEN")}/sendMessage?` +
      new URLSearchParams({
        "chat_id": Deno.env.get("CHAT_ID")!,
        text: content,
        "parse_mode": "Markdown",
      }),
  );
}
