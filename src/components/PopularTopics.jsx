import React from "react";
import styled from "styled-components";

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 10px 0;
`;

const MarqueeContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: marquee 20s linear infinite;
  padding-right: 50px;

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeItem = styled.span`
  margin-right: 50px;
  font-size: 16px;
  color: #333;
  background-color: ${(props) => props.bgcolor};
  padding: 16px 16px;
  border-radius: 10px;
  display: inline-block;
  transition: transform 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PopularTopics = () => {
  const topicsFirst = [
    // Health Category - Soft Blues/Greens
    { text: "Health", color: "#E3F2FD" },
    { text: "Mental Wellness", color: "#E0F7FA" },
    { text: "Fitness", color: "#E8F5E9" },
    { text: "Nutrition", color: "#F1F8E9" },

    // Entertainment Category - Warm Colors
    { text: "Entertainment", color: "#FFF3E0" },
    { text: "Movies", color: "#FFE0B2" },
    { text: "Gaming", color: "#FFECB3" },
    { text: "Music", color: "#FFF8E1" },
  ];

  const topicsSecond = [
    // Technology Category - Cool Purples/Blues
    { text: "Technology", color: "#EDE7F6" },
    { text: "AI & ML", color: "#E8EAF6" },
    { text: "Cybersecurity", color: "#E3F2FD" },
    { text: "Cloud Computing", color: "#E1F5FE" },

    // Finance Category - Soft Greens
    { text: "Finance", color: "#F1F8E9" },
    { text: "Cryptocurrency", color: "#E8F5E9" },
    { text: "Investment", color: "#E0F2F1" },
    { text: "Personal Finance", color: "#F1F8E9" },

    // Travel Category - Warm Pastels
    { text: "Travel", color: "#FFF3E0" },
    { text: "Adventure", color: "#FFEFD5" },
    { text: "Food Tourism", color: "#FFE4E1" },
    { text: "Cultural Tours", color: "#FFF0F5" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Popular Topics</h2>
      <MarqueeContainer>
        <MarqueeContent role="marquee" aria-label="Scrolling topics group 1">
          {topicsFirst.map((topic, index) => (
            <MarqueeItem
              key={index}
              bgcolor={topic.color}
              style={{ color: "#333" }} // Adding darker text for better contrast
            >
              {topic.text}
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeContainer>

      <MarqueeContainer>
        <MarqueeContent
          role="marquee"
          aria-label="Scrolling topics group 2"
          style={{ animationDirection: "reverse" }}
        >
          {topicsSecond.map((topic, index) => (
            <MarqueeItem
              key={index}
              bgcolor={topic.color}
              style={{ color: "#333" }} // Adding darker text for better contrast
            >
              {topic.text}
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeContainer>
    </>
  );
};

export default PopularTopics;
