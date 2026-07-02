import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";

const Lightbox = ({ images, index, alt, onClose, onChange }) => {
  const { t } = useLanguage();

  if (index === null) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`${alt} screenshot ${index + 1}`}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => onChange((index - 1 + images.length) % images.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={() => onChange((index + 1) % images.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}

        <p className="text-white/40 text-xs mt-3">
          {index + 1} / {images.length}
        </p>
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/60 hover:text-white text-sm transition"
      >
        {t("projects.close")} ✕
      </button>
    </div>,
    document.body,
  );
};

export default Lightbox;
