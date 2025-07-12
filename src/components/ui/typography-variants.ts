import { cva } from "class-variance-authority"

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
        ul: "my-6 ml-6 list-disc [&>li]:mt-2",
        ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
        li: "leading-7",
        code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        lead: "text-muted-foreground text-xl",
        large: "text-lg font-semibold",
        small: "text-sm leading-none font-medium",
        muted: "text-muted-foreground text-sm",
      },
    },
    defaultVariants: {
      variant: "p",
    },
  }
)

export { typographyVariants } 