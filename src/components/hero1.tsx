import { ArrowRight, ArrowUpRight, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero1Props {
  badge?: string;
  heading: string;
  "description-line1"?: string;
  "description-line2"?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  badge = "",
  heading = "",
  "description-line1": descriptionLine1 = "",
  "description-line2": descriptionLine2 = "",
  buttons = {
    primary: {
      text: "",
      url: "",
    },
    secondary: {
      text: "",
      url: "",
    },
  },
  image = {
    src: "",
    alt: "",
  },
}: Hero1Props) => {
  return (
    <section className="flex-1 flex items-center justify-center pt-10 lg:pt-40">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="secondary" className="font-bold">
                <a href="" className="font-bold">{badge}</a>
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-3xl font-bold lg:text-5xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 lg:text-base">
              <span className="block lg:inline">{descriptionLine1}</span>
              <br className="hidden lg:block" />
              <span className="block lg:inline">{descriptionLine2}</span>
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link to={buttons.primary.url}>
                    {buttons.primary.text}
                    <Monitor className="size-4" />
                  </Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a target="_blank" href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <video
              src={image.src}
              className="max-h-96 w-full rounded-md object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 rounded-md" style={{
              background: `
                linear-gradient(to right, var(--background) 0%, transparent 20%, transparent 80%, var(--background) 100%),
                linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 80%, var(--background) 100%)
              `
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
