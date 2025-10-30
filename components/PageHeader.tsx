// components/PageHeader.tsx
type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
      <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-6xl font-bold text-transparent">
        {title}
      </h1>
      <p className="leading-relaxed text-neutral-300 sm:text-lg">{subtitle}</p>
    </section>
  );
}