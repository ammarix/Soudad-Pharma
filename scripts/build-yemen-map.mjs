/**
 * مصادر البيانات: SimpleMaps Yemen Admin 1 (CC BY 4.0) ومرجع HDX/OCHA للحدود الإدارية.
 * ينتج ملف SVG خفيفاً لمساحات المحافظات وحدود اليمن دون أسماء أو ادعاءات تغطية.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://simplemaps.com/static/svg/country/ye/admin1/ye.json";
const destination = "/home/ubuntu/webdev-static-assets/yemen-coverage-map.svg";
const response = await fetch(source, { headers: { "user-agent": "SoudadPharmaMap/1.0" } });

if (!response.ok) {
  throw new Error(`Could not download Yemen boundary data: ${response.status}`);
}

const geojson = await response.json();
const features = geojson.features ?? [];
const rings = [];

for (const feature of features) {
  const geometry = feature.geometry;
  if (!geometry) continue;
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  for (const polygon of polygons ?? []) {
    for (const ring of polygon ?? []) {
      if (ring.length > 2) rings.push(ring);
    }
  }
}

const points = rings.flat();
const longitudes = points.map(([lon]) => lon);
const latitudes = points.map(([, lat]) => lat);
const minLon = Math.min(...longitudes);
const maxLon = Math.max(...longitudes);
const minLat = Math.min(...latitudes);
const maxLat = Math.max(...latitudes);
const width = 960;
const height = 520;
const pad = 38;
const dataRatio = (maxLon - minLon) / (maxLat - minLat);
const canvasRatio = (width - pad * 2) / (height - pad * 2);
const scale = dataRatio > canvasRatio
  ? (width - pad * 2) / (maxLon - minLon)
  : (height - pad * 2) / (maxLat - minLat);
const offsetX = (width - (maxLon - minLon) * scale) / 2;
const offsetY = (height - (maxLat - minLat) * scale) / 2;
const project = ([lon, lat]) => [
  offsetX + (lon - minLon) * scale,
  height - offsetY - (lat - minLat) * scale,
];
const compactRing = (ring) => ring.filter((_, index) => index === 0 || index === ring.length - 1 || index % 4 === 0);
const ringPath = (ring) => compactRing(ring).map((point, index) => {
  const [x, y] = project(point);
  return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ") + " Z";

const paths = rings.map((ring) => `<path d="${ringPath(ring)}"/>`).join("\n      ");
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Yemen administrative map">
  <g fill="#E6EFF1" stroke="#AFC4C9" stroke-width="1.45" stroke-linejoin="round">
      ${paths}
  </g>
</svg>`;

await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, svg, "utf8");
console.log(destination);
