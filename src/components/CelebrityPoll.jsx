import React, { useState } from "react";

const CelebrityPoll = () => {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);
  const [data, setData] = useState({
    question: "Who is your favorite artist?",
    options: [
      { id: 1, name: "Davido🎙️", votes: 150 },
      { id: 2, name: "Wizkid🦅", votes: 120 },
      { id: 3, name: "Burnaboy🦍", votes: 180 },
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
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        {data.question}
      </h2>

      {data.options.map((opt) => {
        const percent = (opt.votes / total) * 100;

        return (
          <div
            key={opt.id}
            className={`mb-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              selected === opt.id
                ? "bg-blue-100 border-blue-400"
                : "bg-gray-50 border-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => !voted && setSelected(opt.id)}
            role="button"
            aria-pressed={selected === opt.id}
            tabIndex={0}
          >
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <span>{opt.name}</span>
              <span className="text-gray-500">
                {opt.votes} votes ({percent.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}

      <button
        onClick={handleVote}
        disabled={!selected || voted}
        className={`w-full mt-6 py-3 px-4 rounded-md text-white font-semibold transition-colors ${
          !selected || voted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label="Submit your vote"
      >
        {voted ? "Thanks for voting!" : "Submit Vote"}
      </button>
    </div>
  );
};

export default CelebrityPoll;
