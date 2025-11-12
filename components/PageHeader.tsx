// components/PageHeader.tsx
type PageHeaderProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
};

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="header relative z-10 mx-auto mb-16 max-w-3xl text-center">
      <h1
        className="mb-4 text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl"
        style={{
          backgroundImage:
            "linear-gradient(120deg, var(--theme-text-title), var(--theme-text-header))",
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