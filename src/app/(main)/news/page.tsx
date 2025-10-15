"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import Container from "@/components/global/container";
import { UserContext } from "@/contexts/UserContext";
import { fetchNews } from "@/api/news/route";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "@/components/main/news/card";
import { NewsItem } from "@/types/news";
import Upgrade from "@/components/main/upgrade";

const News = () => {
  const { user, isLoaded } = useContext(UserContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNews() {
      setLoading(true);
      const newsListing = await fetchNews();
      setNews(newsListing.data);
      setLoading(false);
    }
    getNews();
  }, []);

  return (
    <Container className="pt-2 h-full flex flex-col gap-4 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="font-medium md:text-xl">News</h1>
        {isLoaded && user?.type == "FREE" && <Upgrade />}
      </div>
      <div className="flex flex-wrap h-fit relative lg:pb-10">
        {loading &&
          [1, 2, 3].map((s) => (
            <div className="w-full h-fit xl:w-1/2 p-2" key={s}>
              {" "}
              <Skeleton className="h-64" />
            </div>
          ))}
        {!loading && (
          <Suspense fallback={null}>
            {news.map((news) => (
              <NewsCard key={news.uuid} news={news} />
            ))}
          </Suspense>
        )}
        {user?.type == "FREE" && !loading && (
          <div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-white dark:from-[#121212]"></div>
            <RainbowButton className="w-fit h-fit text-white dark:text-[#121212] absolute bottom-0 left-1/2 transform -translate-x-1/2">
              Get Unlimited Access
            </RainbowButton>
          </div>
        )}
      </div>
    </Container>
  );
};

export default News;
