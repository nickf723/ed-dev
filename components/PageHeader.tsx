// components/PageHeader.tsx
type PageHeaderProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
};

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
              {eyebrow ? (
        <span className="topic-card__eyebrow mb-6 inline-flex">
          {eyebrow}
        </span>
      ) : null}
      <h1
        className="mb-4 text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl"
        style={{
          backgroundImage:
            "linear-gradient(120deg, var(--color-text-title), var(--color-text-header))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {title}
      </h1>
      <p className="leading-relaxed text-neutral-300 sm:text-lg">{subtitle}</p>
    </section>
  );
}