"use client";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import PersonCard from "@/components/ui/person-card";

interface Person {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export default function CommunitySection() {
  const { t } = useI18n();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      debugger;
      try {
        debugger;
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwIY5-FqRi6IURzK5HJPhOPx1ixLMa893c96aWSxeVySY7WIlLuz96imNa0qDHJYLSQ/exec"
        );
        debugger;
        const data = await response.json();
        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <section id="community" className="py-20 bg-white">
    <h1>hello</h1>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("community.title")}
          </h2>
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

        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.map((person, index) => (
              <PersonCard key={index} {...person} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
