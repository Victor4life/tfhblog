import React, { useState } from "react";
import styled from "styled-components";

const S = {
  Container: styled.div`
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `,
  Title: styled.h2`
    color: #000;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
  `,
  Option: styled.div`
    background: ${(p) => (p.selected ? "#e2e8f0" : "#f7fafc")};
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: 0.2s;
    margin-bottom: 1rem;
    &:hover {
      background: #e2e8f0;
      transform: translateY(-2px);
    }
  `,
  Progress: styled.div`
    height: 8px;
    background: #cbd5e0;
    border-radius: 4px;
    margin-top: 0.5rem;
    overflow: hidden;
    > div {
      height: 100%;
      background: #4299e1;
      width: ${(p) => p.percent}%;
      transition: width 0.3s;
    }
  `,
  Votes: styled.span`
    font-size: 0.875rem;
    color: #718096;
    margin-left: 0.5rem;
  `,
  Button: styled.button`
    width: 100%;
    margin-top: 1.5rem;
    padding: 0.75rem;
    background: ${(p) => (p.disabled ? "#cbd5e0" : "#4299e1")};
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
    &:hover {
      background: ${(p) => (p.disabled ? "#cbd5e0" : "#3182ce")};
    }
  `,
};

const CelebrityPoll = () => {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);
  const [data, setData] = useState({
    question: "Who is your favorite celebrity?",
    options: [
      { id: 1, name: "Tom Hanks", votes: 150 },
      { id: 2, name: "Morgan Freeman", votes: 120 },
      { id: 3, name: "Meryl Streep", votes: 180 },
      { id: 4, name: "Leonardo DiCaprio", votes: 160 },
    ],
  });

  const total = data.options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = () => {
    if (!selected) return;
    setData((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === selected ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));
    setVoted(true);
  };

  return (
    <S.Container>
      <S.Title>{data.question}</S.Title>
      {data.options.map((opt) => (
        <S.Option
          key={opt.id}
          selected={selected === opt.id}
          onClick={() => !voted && setSelected(opt.id)}
          role="button"
          aria-pressed={selected === opt.id}
          tabIndex={0}
        >
          {opt.name}
          <S.Votes>
            {opt.votes} votes ({((opt.votes / total) * 100).toFixed(1)}%)
          </S.Votes>
          <S.Progress percent={(opt.votes / total) * 100}>
            <div />
          </S.Progress>
        </S.Option>
      ))}
      <S.Button
        onClick={handleVote}
        disabled={!selected || voted}
        aria-label="Submit your vote"
      >
        {voted ? "Thanks for voting!" : "Submit Vote"}
      </S.Button>
    </S.Container>
  );
};

export default CelebrityPoll;
