import { Box, Grid, GridItem } from "@chakra-ui/react";
import LetterRow from "./LetterRow";
import GameBoard from "../game-board/game-board";

interface Props {
  boardString: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const GoGameBoard = (props: Props) => {
  return (
    <>
      <div>
        <Grid
          templateAreas={`"corner headerLetters" 
                              "rowNums gameBoard"`}
          gridTemplateColumns={"3fr 97fr"}
          gridTemplateRows={"3fr 97fr"}
          className="boarder-container"
        >
          <GridItem area={"corner"}>
            <div> </div>
          </GridItem>
          <GridItem area={"headerLetters"}>
            <LetterRow></LetterRow>
          </GridItem>
          <GridItem area={"rowNums"} className="row-nums">
            {createRowsNumbers()}
          </GridItem>
          <GridItem area={"gameBoard"}>
            <div className="gameBoard">
              {
                <GameBoard
                  boardString={props.boardString}
                  isMyTurn={props.isMyTurn}
                  onSelectIntersection={props.onSelectIntersection}
                />
              }
            </div>
          </GridItem>
        </Grid>
      </div>
    </>
  );
};

const createRowsNumbers = (): JSX.Element[] => {
  const content: JSX.Element[] = [];
  for (let x = 18; x >= 0; x--) {
    content.push(
      <Box className="rowNumberLabel" key={x}>
        <div className="row-number">{x}</div>
      </Box>
    );
  }
  return content;
};
export default GoGameBoard;
