import { Router, type IRouter } from "express";
import https from "https";
import http from "http";

const router: IRouter = Router();

const ALLOWED_HOSTS = [
  "static.wikia.nocookie.net",
  "ddragon.leagueoflegends.com",
  "raw.communitydragon.org",
  "cdn.communitydragon.org",
  "rerollraider.com",
  "game8.co",
  "wutheringwaves.gg",
  "genshin.gg",
  "gamepress.gg",
  "prydwen.gg",
  "arknights.wiki.gg",
  "wikigg.c.gmodstore.com",
  "upload.wikimedia.org",
  "i.imgur.com",
  "cdn.discordapp.com",
  "pbs.twimg.com",
  "g.ddragon.leagueoflegends.com",
  "zzz.gg",
  "ak.gamepress.gg",
  // HoYoverse official game record CDN — serves character icons for Genshin and HSR
  "upload-os-bbs.mihoyo.com",
  "sg-public-data-api.hoyoverse.com",
  "fastcdn.hoyoverse.com",
  // jsDelivr CDN — open GitHub CDN, serves game asset repos (StarRailRes, etc.)
  "cdn.jsdelivr.net",
  // Enka.Network — community CDN for Genshin Impact game assets
  "enka.network",
  // Blizzard Overwatch CloudFront CDN
  "d1u1mce87gyfbn.cloudfront.net",
  // Marvel Comics i.annihil.us — official CDN for Marvel character portrait images
  "i.annihil.us",
  // MyAnimeList CDN — character images for manhwa not on Fandom
  "cdn.myanimelist.net",
  // Anime-Planet CDN — character images (used for Return of the Mad Demon)
  "cdn.anime-planet.com",
];

router.get("/proxy/image", (req, res) => {
  const rawUrl = req.query.url as string;
  if (!rawUrl) {
    res.status(400).json({ error: "Missing url parameter" });
    return;
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
    res.status(403).json({ error: "Host not allowed" });
    return;
  }

  const protocol = targetUrl.protocol === "https:" ? https : http;

  const proxyReq = protocol.get(
    rawUrl,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MultiverseFMA/1.0; image-proxy)",
        Referer: targetUrl.origin,
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      },
      timeout: 8000,
    },
    (proxyRes) => {
      if (proxyRes.statusCode && proxyRes.statusCode >= 300 && proxyRes.statusCode < 400 && proxyRes.headers.location) {
        const redirectUrl = proxyRes.headers.location;
        try {
          const redir = new URL(redirectUrl, rawUrl);
          if (ALLOWED_HOSTS.includes(redir.hostname)) {
            res.redirect(`/api/proxy/image?url=${encodeURIComponent(redir.toString())}`);
          } else {
            res.status(403).json({ error: "Redirect host not allowed" });
          }
        } catch {
          res.status(500).json({ error: "Bad redirect" });
        }
        return;
      }

      if (!proxyRes.statusCode || proxyRes.statusCode >= 400) {
        res.status(proxyRes.statusCode || 500).end();
        return;
      }

      const contentType = proxyRes.headers["content-type"] || "image/jpeg";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");
      proxyRes.pipe(res);
    },
  );

  proxyReq.on("error", () => {
    if (!res.headersSent) {
      res.status(502).end();
    }
  });

  proxyReq.on("timeout", () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).end();
    }
  });
});

export default router;
