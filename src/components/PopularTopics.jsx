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
  background-color: ${(props) => props.bgColor};
  padding: 16px 16px;
  border-radius: 10px;
  display: inline-block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PopularTopics = () => {
  const topicsFirst = [
    { text: "React Development", color: "#61dafb33" },
    { text: "JavaScript Tips", color: "#f7df1e33" },
    { text: "Web Security", color: "#ff575733" },
    { text: "CSS Tricks", color: "#2965f133" },
  ];

  const topicsSecond = [
    { text: "Node.js Basics", color: "#3c873a33" },
    { text: "API Design", color: "#ff8c0033" },
    { text: "Database Management", color: "#00758f33" },
    { text: "Cloud Computing", color: "#ff990033" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Popular Topics</h2>
      <MarqueeContainer>
        <MarqueeContent role="marquee" aria-label="Scrolling topics group 1">
          {topicsFirst.map((topic, index) => (
            <MarqueeItem key={index} bgColor={topic.color}>
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
            <MarqueeItem key={index} bgColor={topic.color}>
              {topic.text}
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeContainer>
    </>
  );
};

export default PopularTopics;
