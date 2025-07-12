import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <Typography as="h1" variant="h1" className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </Typography>
          <Typography as="p" variant="muted" className="text-base">
            看起來你進入了未知的數位領域。
          </Typography>
        </div>
        <Button asChild>
          <Link to="/">
            返回主頁
          </Link>
        </Button>
      </div>
    </div>
  );
} 