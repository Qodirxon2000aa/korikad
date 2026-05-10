const RAW_API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

/** Rasm yo‘li (/uploads/...) yoki eski to‘liq URL. */
export function resolveDoctorPhotoUrl(urlOrPath) {
  const v = String(urlOrPath || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  const base = RAW_API_URL.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  const path = v.startsWith("/") ? v : `/${v}`;
  return `${base}${path}`;
}
