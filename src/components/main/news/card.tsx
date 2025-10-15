import React from "react";
import Image from "next/image";
import { NewsItem } from "@/types/news";
import Link from "next/link";
import Container from "@/components/global/container";

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Container className="w-full h-fit xl:w-1/2 p-2">
      <Link
        target="_blank"
        href={news.url}
        className="lg:h-64 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col lg:flex-row border dark:border-neutral-700"
      >
        <div className="w-full lg:w-1/2 my-auto h-full overflow-hidden">
          <Image
            src={news.image_url}
            alt={news.title}
            width={600}
            height={600}
            className="h-full w-hull object-cover object-left"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full text content flex flex-col justify-between p-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl">{news.title}</h1>
            <p className="font-normal text-sm mt-4">{news.description}</p>
          </div>
          <p className="text-sm text-muted-foreground text-end">Read More</p>
        </div>
      </Link>
    </Container>
  );
};

export default NewsCard;
