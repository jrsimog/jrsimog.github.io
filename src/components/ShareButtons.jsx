import { useState, useRef, useEffect } from "react";
import { SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiCopy, FiCheck } from "react-icons/fi";
import { trackEvent } from "../utils/analytics";

const ShareButtons = ({ lang, title, description, tag }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const getUrl = () => window.location.href;

  const shareText = [
    [title, description].filter(Boolean).join(" — "),
    lang === "es" ? "Míralo aquí:" : "Check it out:",
  ].join("\n\n");

  const copyLink = () => {
    const url = getUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
    trackEvent("share", { method: "copy_link", url });
  };

  const btnClass =
    "flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-xs text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs text-muted">
        {lang === "es" ? "Compartir:" : "Share:"}
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getUrl())}${tag ? `&hashtags=${tag}` : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        onClick={() => trackEvent("share", { method: "x", url: getUrl() })}
      >
        <SiX className="text-sm" /> X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        onClick={() =>
          trackEvent("share", { method: "linkedin", url: getUrl() })
        }
      >
        <FaLinkedinIn className="text-sm text-[#0077B5]" /> LinkedIn
      </a>
      <button onClick={copyLink} className={btnClass}>
        {copied ? (
          <FiCheck className="text-sm text-emerald-500" />
        ) : (
          <FiCopy className="text-sm" />
        )}
        {copied
          ? lang === "es"
            ? "¡Copiado!"
            : "Copied!"
          : lang === "es"
            ? "Copiar enlace"
            : "Copy link"}
      </button>
    </div>
  );
};

export default ShareButtons;
