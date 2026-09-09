import { Link } from 'wouter';

interface CrossLink {
  label: string;
  href: string;
  description: string;
}

interface Props {
  title: string;
  links: CrossLink[];
}

export function CrossLinks({ title, links }: Props) {
  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
          {title}
        </h2>
        <nav aria-label="Related pages" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group bg-card border border-border rounded-2xl p-5 transition-shadow hover:shadow-md"
            >
              <span className="block font-bold text-primary group-hover:underline mb-1">
                {link.label}
              </span>
              <span className="block text-sm text-muted-foreground leading-relaxed">
                {link.description}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}