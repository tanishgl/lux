import useDbProvider from "../providers/DbProvider";

const ScoreCard = ({ name, score }) => {
  return (
    <tr className="border-b border-b-black max-h-4">
      <td className="px-3 py-2 border border-slate-950 ">{name}</td>
      <td className="px-3 py-2 border border-slate-950 ">{score}</td>
    </tr>
  );
};

function Leaderboard() {
  const { topPlayers } = useDbProvider();
  return (
    <table className="bg-red-100  self-start justify-self-end">
      <thead className="px-2">
        <tr>
          <td className="px-3 py-2 border border-slate-950">Username</td>
          <td className="px-3 py-2 border border-slate-950">Best Score</td>
        </tr>
      </thead>
      <tbody>
        {topPlayers.map((player, idx) => {
          return (
            <ScoreCard
              name={player.username}
              score={player.bestScore}
              key={idx}
            ></ScoreCard>
          );
        })}
      </tbody>
    </table>
  );
}

export default Leaderboard;
