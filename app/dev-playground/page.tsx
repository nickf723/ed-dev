// components/PageHeader.tsx
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";

 const disciplines = [
    {
      title: "Mathematics and Statistics",
      desc: "The study of quantity, structure, space, and change.",
      href: "/formal-science/mathematics",
      //Icon: Calculator,
      className: "theme-math topic-card-wide"
    },
  ];


export default function PlaceholderPage() {
  return (
    <main className="topic-page text-rainbow-smear lg:px-16">
      <PageHeader
        eyebrow="Content Coming Soon"
        title="Under Construction"
        subtitle="This page is being built. Check back soon for new content!"
      />
        <section className="topic-grid">
            {disciplines.map((branch) => (
            <TopicCard
                key={branch.href}
                href={branch.href}
                title={branch.title}
                desc={branch.desc}
                //Icon={branch.Icon}
                className={branch.className}
            />
            ))}
        </section>
    </main>
  );
}