const gradients = {
  blue: "var(--dt-gradient-blue)",
  violet: "var(--dt-gradient-violet)",
};

export const GradientText = ({
  children,
  color = "blue",
  as: Tag = "span",
  className = "",
}) => (
  <Tag
    className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: gradients[color] }}
  >
    {children}
  </Tag>
);

const SectionTitle = ({
  children,
  color = "blue",
  as: Tag = "h2",
  className = "",
}) => (
  <GradientText
    as={Tag}
    color={color}
    className={`font-semibold uppercase tracking-widest ${className}`}
  >
    {children}
  </GradientText>
);

export default SectionTitle;
