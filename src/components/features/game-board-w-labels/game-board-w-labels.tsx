import { Box, Grid, GridItem } from "@chakra-ui/react";
import styles from "./game-board-w-labels.module.css";
import LetterLabelRow from "./letter-label-row";
import GameBoard from "../game-board/game-board";

interface Props {
  boardString: string;
}

const GameBoardWithLabels = (props: Props) => {
  return (
    <>
      <div>
        <Grid
          templateAreas={`"corner headerLetters" 
                              "rowNums gameBoard"`}
          className={styles.boarderContainer}
        >
          <GridItem area={"corner"}>
            <div> </div>
          </GridItem>
          <GridItem area={"headerLetters"}>
            <LetterLabelRow></LetterLabelRow>
          </GridItem>
          <GridItem area={"rowNums"} className={styles.rowNumberColumn}>
            {createRowsNumbers()}
          </GridItem>
          <GridItem area={"gameBoard"}>
            <div>{<GameBoard boardString={props.boardString} />}</div>
          </GridItem>
        </Grid>
      </div>
    </>
  );
};

const createRowsNumbers = (): JSX.Element[] => {
  const content: JSX.Element[] = [];
  for (let rowNum = 19; rowNum >= 1; rowNum--) {
    content.push(
      <Box className={styles.rowNumberLabel} key={rowNum}>
        <div>{rowNum}</div>
      </Box>
    );
  }
  return content;
};
export default GameBoardWithLabels;
