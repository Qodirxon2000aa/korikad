const API_ROOT = import.meta.env.VITE_KORIK_API_URL || "http://127.0.0.1:5002/api";

/** Rasm yo‘li (/uploads/...) yoki eski to‘liq URL. */
export function resolveDoctorPhotoUrl(urlOrPath) {
  const v = String(urlOrPath || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  const base = API_ROOT.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  const path = v.startsWith("/") ? v : `/${v}`;
  return `${base}${path}`;
}
