import { useState } from "react";
import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { techIcons } from "../data/techIcons";
import { useLanguage } from "../context/LanguageContext";
import PageHeader from "../components/PageHeader";
import SectionTitle, { GradientText } from "../components/SectionTitle";
import Lightbox from "../components/Lightbox";
import NotFound from "./NotFound";
import { trackEvent } from "../utils/analytics";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <SectionTitle className="text-sm mb-2">{title}</SectionTitle>
    <p className="text-body text-sm leading-relaxed">{children}</p>
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const [lightbox, setLightbox] = useState(null);

  const project = projects.find((p) => p.id === slug);
  if (!project) return <NotFound />;

  const field = (name) => project[`${name}_${lang}`] ?? project[`${name}_es`];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "var(--bg-radial)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 max-sm:pb-24">
        <PageHeader back="/" backLabel={t("projects.back")} />

        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
          <GradientText as="h1" className="text-2xl font-bold">
            {project.name}
          </GradientText>
          {project.date && (
            <span className="text-xs text-muted shrink-0">{project.date}</span>
          )}
        </div>
        <p className="text-muted text-sm mb-8">{field("description")}</p>

        <Section title={t("projects.problem")}>{field("problem")}</Section>
        <Section title={t("projects.solution")}>{field("solution")}</Section>
        <Section title={t("projects.outcome")}>{field("outcome")}</Section>

        <div className="mb-8">
          <SectionTitle className="text-sm mb-3">
            {t("projects.stack_used")}
          </SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => {
              const techIcon = techIcons[tech];
              const Icon = techIcon?.icon;
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1 text-xs rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/8 px-2.5 py-0.5 text-slate-600 dark:text-white/55"
                >
                  {Icon && (
                    <Icon
                      className="text-sm shrink-0"
                      style={{ color: techIcon.color }}
                    />
                  )}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        <SectionTitle className="text-sm mb-3">
          {t("projects.screenshots")}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/15">
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
      </div>

      <Lightbox
        images={project.screenshots}
        index={lightbox}
        alt={project.name}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
      />
    </div>
  );
};

export default ProjectDetail;
