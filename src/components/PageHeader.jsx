import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import StickyNav from "./StickyNav";

const PageHeader = ({ back, backLabel, extra, extraCompact, className = "mb-10" }) => (
  <>
    <div
      className={`${back ? "hidden sm:flex" : "flex"} items-center justify-between ${className}`}
    >
      {back ? (
        <Link
          to={back}
          className="rounded-full border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-4 py-1.5 text-sm text-muted hover:text-sub backdrop-blur-sm transition"
        >
          {backLabel}
        </Link>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-3">
        {extra}
        <ThemeToggle />
        <LangToggle />
      </div>
    </div>

    {back && (
      <StickyNav
        left={
          <Link
            to={back}
            className="px-3 py-1 text-sm text-muted hover:text-sub transition"
          >
            {backLabel}
          </Link>
        }
        right={
          <div className="flex items-center gap-1">
            {extraCompact}
            <ThemeToggle compact />
            <LangToggle compact />
          </div>
        }
      />
    )}
  </>
);

export default PageHeader;
