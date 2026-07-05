import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/shared/back-button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          页面未找到
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在。请检查链接是否正确，或返回首页。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
