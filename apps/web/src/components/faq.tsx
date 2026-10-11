export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <details
          key={index}
          className="group rounded-md border border-border bg-surface p-4"
        >
          <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
            {item.question}
          </summary>
          <p className="mt-2 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
