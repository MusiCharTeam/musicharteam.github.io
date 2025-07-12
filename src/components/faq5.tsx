export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
];

const Faq5 = ({
  heading = "Common Questions & Answers",
  description = "Find out all the essential details about our platform and how it can serve your needs.",
  faqs = defaultFaqs,
}: Faq5Props) => {
  return (
    <section className="py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">{heading}</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base font-medium text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-8 sm:mt-10 lg:mt-14 max-w-2xl lg:max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6 sm:mb-8 flex gap-3 sm:gap-4">
              <span className="flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed">{faq.question}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq5 };
