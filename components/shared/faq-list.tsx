"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem, FaqCategory } from "@/types/sanity";

interface FaqListProps {
  faqItems: FaqItem[];
  categories: FaqCategory[];
  pageTitle?: string;
}

export function FaqList({ faqItems, categories, pageTitle }: FaqListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return faqItems;
    return faqItems.filter((item) => item.category?._id === activeCategory);
  }, [faqItems, activeCategory]);

  return (
    <>
      {/* 分类筛选 */}
      {categories.length > 0 && (
        <section className="py-8 bg-white border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setActiveCategory(category._id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeCategory === category._id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ 列表 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {pageTitle || "常见问题"}
            </h2>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">暂无常见问题</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <details
                    key={item._id}
                    className="bg-white rounded-xl overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-foreground pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
