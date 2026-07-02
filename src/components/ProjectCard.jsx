import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { techIcons } from "../data/techIcons";
import Lightbox from "./Lightbox";
import { trackEvent } from "../utils/analytics";

const ProjectCard = ({ project, highlightCaseStudy = false }) => {
  const { lang, t } = useLanguage();
  const [lightbox, setLightbox] = useState(null);

  const description =
    lang === "en" ? project.description_en : project.description_es;

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/15 dark:bg-white/8 shadow-xl dark:shadow-black/20 backdrop-blur-md overflow-hidden transition-all duration-300">
        <div className="grid grid-cols-2 gap-0.5 bg-slate-200/50 dark:bg-white/5">
          {project.screenshots.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setLightbox(i);
                trackEvent("project_screenshot", {
                  project: project.name,
                  index: i,
                });
              }}
              className="relative overflow-hidden bg-slate-100 dark:bg-white/5 hover:opacity-90 transition-opacity group"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={src}
                alt={`${project.name} screenshot ${i + 1}`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium transition-opacity">
                  {t("projects.view")}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-slate-800 dark:text-white/90 font-semibold text-base">
              {project.name}
            </h3>
            {project.date && (
              <span className="text-xs text-slate-400 dark:text-white/30 shrink-0">
                {project.date}
              </span>
            )}
          </div>
          <p className="text-slate-600 dark:text-white/50 text-xs leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((tech) => {
              const tech_icon = techIcons[tech];
              const Icon = tech_icon?.icon;
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1 text-xs rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/8 px-2.5 py-0.5 text-slate-600 dark:text-white/55"
                >
                  {Icon && (
                    <Icon
                      className="text-sm shrink-0"
                      style={{ color: tech_icon.color }}
                    />
                  )}
                  {tech}
                </span>
              );
            })}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className={`inline-block rounded-full border px-4 py-1.5 text-xs transition-all duration-500 ${
              highlightCaseStudy
                ? "pulse-beam border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300"
                : "border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80"
            }`}
            onClick={() =>
              trackEvent("case_study_click", { project: project.id })
            }
          >
            {t("projects.case_study")} →
          </Link>
        </div>
      </div>

      <Lightbox
        images={project.screenshots}
        index={lightbox}
        alt={project.name}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
      />
    </>
  );
};

export default ProjectCard;
