import React from "react";

const SectionBadge = ({ title }: { title: string }) => {
  return (
    <div className="px-4 py-1 rounded-full bg-primary/20 cursor-pointer select-none">
      <div className="bg-gradient-to-r from-blue-700 via-blue-300 to-blue-700 bg-[length:200%_100%] bg-clip-text animate-background-shine text-transparent font-medium text-sm">
        {title}
      </div>
    </div>
  );
};

export default SectionBadge;
