import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/tictactoe.css";

const gameValues = Array(9).fill('');
const winner = { name: "Unknown", line: "" }
const summary = { playerX: 0, playerO: 0 };

function Board({ isGameNow, setIsGameNow }) {
  const [currentSymbol, setCurrentSymbol] = useState("X");

  function handleFieldClick(fieldIndex) {
    if (isGameNow) {
      if (gameValues[fieldIndex] === "") {
        gameValues[fieldIndex] = currentSymbol;
        currentSymbol === "X" ? setCurrentSymbol("O") : setCurrentSymbol("X");
        checkForWinner();
      } else toast.warn("Be more attentive!")
    } else toast.info("You need to start a new game!")
  };

  function handleBtnGameClick() {
    gameValues.fill('');
    if (isGameNow) {
      setIsGameNow(false);
    } else {
      winner.line = "";
      setCurrentSymbol("X");
      setIsGameNow(true);
    }
  };

  function checkForWinner() {
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
      winner.name = `Player "${winnerData.name}" won!`;
      winner.line = winnerData.line;
      winnerData.name === "X" ? summary.playerX++ : summary.playerO++;
      setIsGameNow(false);
    } else if (gameValues.filter((field) => field === "").length === 0) {
      winner.name = "Draw";
      winner.line = "";
      setIsGameNow(false);
    }
  };

  return (<>
    <button className="button-game" onClick={handleBtnGameClick}>
      {isGameNow ? "BREAK THIS GAME" : "START NEW GAME"}
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
  </>)
}

export default function TicTacToe() {
  const [isGameNow, setIsGameNow] = useState(false);

  return (
    <div className="game-block">
      <h2>Tic-Tac-Toe game</h2>
      <Board isGameNow={isGameNow} setIsGameNow={setIsGameNow} />
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