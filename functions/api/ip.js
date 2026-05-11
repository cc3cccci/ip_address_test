/**
 * Cloudflare Pages Function: /api/ip
 * Returns the visitor's real IP and Cloudflare-provided metadata.
 */
export async function onRequest(context) {
  const { request } = context;
  const headers = request.headers;

  const ip = headers.get("CF-Connecting-IP") || headers.get("X-Forwarded-For") || "Unknown";
  const country = headers.get("CF-IPCountry") || "";
  const city = headers.get("CF-IPCity") || "";
  const region = headers.get("CF-IPRegion") || "";
  const timezone = headers.get("CF-Timezone") || "";
  const continent = headers.get("CF-IPContinent") || "";
  const longitude = headers.get("CF-IPLongitude") || "";
  const latitude = headers.get("CF-IPLatitude") || "";
  const asn = headers.get("CF-ASN") || "";
  const asOrg = headers.get("CF-ASOrganization") || "";
  const colo = headers.get("CF-Ray") ? headers.get("CF-Ray").split("-").pop() : "";
  const cfRay = headers.get("CF-Ray") || "";
  const userAgent = headers.get("User-Agent") || "";
  const acceptLang = headers.get("Accept-Language") || "";

  // Detect protocol
  const protocol = request.url.startsWith("https") ? "HTTPS" : "HTTP";

  const data = {
    ip,
    country,
    city,
    region,
    timezone,
    continent,
    longitude: longitude ? parseFloat(longitude) : null,
    latitude: latitude ? parseFloat(latitude) : null,
    asn: asn ? `AS${asn}` : null,
    asOrg,
    colo,
    cfRay,
    protocol,
    userAgent,
    acceptLang,
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}
