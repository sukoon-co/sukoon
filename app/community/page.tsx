"use client";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import PersonCard from "@/components/ui/person-card";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

interface Person {
  name: string;
  title: string;
  category: string[];
  email?: string;
  phoneNumber?: string;
  linkPortfolio?: string;
  addedDate?: string;
  image?: string;
}


export default function CommunityPage() {
  const { t, dir } = useI18n();
  const [people, setPeople] = useState<Person[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxRSa9ANP74EDa6VnD2el3e8cn8FsKozdgQFBbvg8cNN9STDsD6BffoDE602V4K-POQ/exec/exec?action=categories'
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data.data as string[]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const url = selectedCategory !== "ALL" 
          ? `https://script.google.com/macros/s/AKfycbxRSa9ANP74EDa6VnD2el3e8cn8FsKozdgQFBbvg8cNN9STDsD6BffoDE602V4K-POQ/exec/exec?action=people&category=${encodeURIComponent(selectedCategory)}`
          : 'https://script.google.com/macros/s/AKfycbxRSa9ANP74EDa6VnD2el3e8cn8FsKozdgQFBbvg8cNN9STDsD6BffoDE602V4K-POQ/exec/exec?action=people';
        
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network error');
        }
        const data: any = await response.json();
        
        setPeople(data.data as Person[]);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [selectedCategory]);


  return (
    <div className="min-h-screen" dir={dir}>
      <Navigation isScrolled={true} />
      
      <main className="pt-24 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("community.title")}
            </h1>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "ALL"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ALL
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">{t("common.loading")}</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{t("common.error")}</p>
            </div>
          )}

          {!isLoading && !error && !people && (
            <div className="text-center py-12">
              <p className="text-gray-600">{t("community.noData")}</p>
            </div>
          )}

          {!isLoading && !error && people  && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {people.map((person, index) => (
                <PersonCard key={index} {...person} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
