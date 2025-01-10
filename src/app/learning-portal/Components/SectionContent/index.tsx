import React from "react";
import Image from "next/image";
import {ITopic} from "@/types";

interface SectionContentProps {
  topics: ITopic[];
}

const SectionContent: React.FC<SectionContentProps> = ({topics}) => {
  if (!topics || topics.length === 0) {
    return <p>No content available for this section.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      {topics.map((topic) => (
        <div key={topic.topicId} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">{topic.title}</h2>
          {topic.contentBlocks.map((block, index) => (
            <div key={index} className="mb-4">
              {block.type === "text" && <p className="text-gray-700">{block.value}</p>}
              {block.type === "image" && (
                <div className="w-full flex justify-center">
                  <div className="relative w-4/5 pb-[35%]">
                    {" "}
                    {/* 67.86% is the aspect ratio (475/700 * 100) */}
                    <Image
                      src={block.value}
                      alt={block.description || "Image"}
                      className="w-full rounded"
                      layout="fill"
                      objectFit="contain"
                      onError={(e) => {
                        console.error(`Failed to load image: ${block.value}`);
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
              {block.type === "code" && (
                <pre className="bg-gray-200 p-4 rounded">
                  <code className="text-black">{block.value}</code>
                </pre>
              )}
            </div>
          ))}
          {topic.resources.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-500 font-semibold mt-4">Resources</h3>
              <ul className="list-disc ml-5">
                {topic.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {resource.description || resource.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionContent;
