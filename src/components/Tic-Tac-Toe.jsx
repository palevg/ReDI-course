import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/tictactoe.css";

const TicTacToe = () => {
  const [gameValues, setGameValues] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [isGameNow, setIsGameNow] = useState(false);
  const [winner, setWinner] = useState({ name: "Unknown", line: "" });
  const [summary, setSummary] = useState({ playerX: 0, playerO: 0 });

  const changeTurn = () => {
    currentSymbol === "X" ? setCurrentSymbol("O") : setCurrentSymbol("X");
  };

  const handleFieldClick = (fieldIndex) => {
    if (isGameNow) {
      const newValues = gameValues;
      if (gameValues[fieldIndex] === "") {
        newValues[fieldIndex] = currentSymbol;
        setGameValues(newValues);
        changeTurn();
        checkForWinner();
      } else toast.warn("Be more attentive!")
    } else toast.info("You need to start a new game!")
  };

  const handleStartGame = () => {
    setGameValues(["", "", "", "", "", "", "", "", ""]);
    setCurrentSymbol("X");
    setWinner({ name: winner.name, line: "" });
    setIsGameNow(true);
  };

  const checkForWinner = () => {
    const winnerData = { name: "", line: null };
    const winConditions = [
      [0, 1, 2, " winner-line-h1"],
      [3, 4, 5, " winner-line-h2"],
      [6, 7, 8, " winner-line-h3"],
      [0, 3, 6, " winner-line-v1"],
      [1, 4, 7, " winner-line-v2"],
      [2, 5, 8, " winner-line-v3"],
      [0, 4, 8, " winner-line-d1"],
      [2, 4, 6, " winner-line-d2"]
    ];

    for (const [field1, field2, field3, line] of winConditions) {
      if (
        gameValues[field1] !== "" &&
        gameValues[field1] === gameValues[field2] &&
        gameValues[field2] === gameValues[field3]
      ) {
        winnerData.name = gameValues[field1];
        winnerData.line = line;
        break;
      }
    }
    if (winnerData.name !== "") {
      setWinner({
        name: `Player "${winnerData.name}" won!`,
        line: winnerData.line
      });
      setSummary({
        playerX:
          winnerData.name === "X" ? summary.playerX + 1 : summary.playerX,
        playerO: winnerData.name === "O" ? summary.playerO + 1 : summary.playerO
      });
      setIsGameNow(false);
    } else if (gameValues.filter((field) => field === "").length === 0) {
      setWinner({ name: "Draw", line: "" });
      setIsGameNow(false);
    }
  };

  return (
    <div className="game-block">
      <h2>Tic-Tac-Toe game</h2>
      <button className="button-newgame" onClick={handleStartGame}>
        START NEW GAME
      </button>
      <hr className={`winner-line-all${winner.line}`} />
      <div className="game-field">
        <div>
          <div onClick={() => handleFieldClick(0)}>{gameValues[0]}</div>
          <div onClick={() => handleFieldClick(1)}>{gameValues[1]}</div>
          <div onClick={() => handleFieldClick(2)}>{gameValues[2]}</div>
        </div>
        <div>
          <div onClick={() => handleFieldClick(3)}>{gameValues[3]}</div>
          <div onClick={() => handleFieldClick(4)}>{gameValues[4]}</div>
          <div onClick={() => handleFieldClick(5)}>{gameValues[5]}</div>
        </div>
        <div>
          <div onClick={() => handleFieldClick(6)}>{gameValues[6]}</div>
          <div onClick={() => handleFieldClick(7)}>{gameValues[7]}</div>
          <div onClick={() => handleFieldClick(8)}>{gameValues[8]}</div>
        </div>
      </div>
      <div>
        {isGameNow
          ? `Game is on! Current player: ${currentSymbol}`
          : winner.name === "Unknown"
            ? "Click the button to start a new game"
            : "Game is over!"}
      </div>
      <div className="game-block__result">Last game result: {winner.name}</div>
      <div>
        Overall score for players "X" & "O":{" "}
        <strong>
          {summary.playerX} | {summary.playerO}
        </strong>
      </div>
    </div>
  );
};

export default TicTacToe;