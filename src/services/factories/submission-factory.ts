import { StonePlay, Submission } from "@two-way-press/go-game-move-processor";
import { ACTION_STONE_PLAY } from "../../constants";
import { Turn } from "../data/turn-service";
import utilities from "../utilitities";

function createSubmission(turn: Turn, row:number, col:number): Submission {
  const currentPlayerColor = utilities.getStoneColorOfCurrentTurn( turn);
  const boardArray = utilities.stringBoardToArray(turn.resultState.board);
  const koCompareBoardArray = utilities.stringBoardToArray(turn.initialState.board);
  const submission: Submission = new Submission(
    new StonePlay(row, col),
    koCompareBoardArray,
    boardArray,
    ACTION_STONE_PLAY,
    currentPlayerColor
  );
  return submission;
}

const submissionFactory = {
  createSubmission
};

export default submissionFactory;