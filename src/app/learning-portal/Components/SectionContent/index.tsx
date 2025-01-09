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
              {block.type === "text" && <p className="text-gray-700">{block.content}</p>}
              {block.type === "image" && (
                <Image
                  src={block.content}
                  alt={block.description || "Image"}
                  className="w-full rounded"
                  layout="responsive"
                  width={700}
                  height={475}
                  onError={(e) => {
                    console.error(`Failed to load image: ${block.content}`);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              {block.type === "code" && (
                <pre className="bg-gray-200 p-4 rounded">
                  <code className="text-black">{block.content}</code>
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
