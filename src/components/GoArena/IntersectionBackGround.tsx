import blackStone from "../../assets/blackStoneTrans.png";
import whiteStone from "../../assets/whiteStoneTrans.png";
import { Image } from "@chakra-ui/react";
import IntersctionSVG from "./IntersctionSVG";
import PendingSVG from "./PendingSVG";
import { useContext } from "react";
import { ContextPackage, StoneContext } from "./GoArena";
import LastTurnSVG from "./LastTurnSVG";
import TopSVG from "./TopSVG";
import UpperRightSVG from "./UpperRightSVG";
import LowerLeftSVG from "./LowerLeftSVG";
import LowerRightSVG from "./LowerRightSVG";
import BottomSVG from "./BottomSVG";
import LeftEdgeSVG from "./LeftEdge";
import RightEdgeSVG from "./RightEdgeSVG";
import IntersctionDotSVG from "./IntersctionDotSVG";
import UpperLeftSVG from "./UpperLeftSVG";

interface Props {
  row: number;
  col: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const IntersectionBackGround = (props: Props) => {
  const contextPackage = useContext(StoneContext);
  function isPendingActionHere(
    context: ContextPackage,
    row: number,
    col: number
  ): boolean {
    if (!context.isPlayersTurn) return false;
    if (!context.pendingAction) return false;
    if (context.pendingAction.actionType !== "play") return false;
    if (context.pendingAction?.location?.row !== row) return false;
    if (context.pendingAction?.location?.col !== col) return false;
    return true;
  }

  function isLastPlayHere(
    context: ContextPackage,
    row: number,
    col: number
  ): boolean {
    if (!context.lastAction) return false;
    if (context.lastAction.actionType !== "play") return false;
    if (context.lastAction?.location?.row !== row) return false;
    if (context.lastAction?.location?.col !== col) return false;
    return true;
  }

  let stoneImage = blackStone;
  if (props.content == "w") stoneImage = whiteStone;
  // occupied cell
  if (props.content == "b" || props.content == "w") {
    const lastPlayIconColor = props.content == "b" ? "white" : "black";
    return (
      <div className="boardIntersectionWithStone">
        {intersectionBG(props.row,props.col)}
       {/*  <IntersctionSVG /> */}
        <Image m="5%" className="stone" src={stoneImage} />
        {isLastPlayHere(contextPackage, props.row, props.col) && (
          <LastTurnSVG stoneColor={lastPlayIconColor} />
        )}
      </div>
    );
  }
  //NOT  my turn and empty cell
  if (!props.isMyTurn) {
    return  intersectionBG(props.row,props.col);
  } else {
    // my turn and empty cell
    return (
      <div
        onClick={() => props.onSelectIntersection(props.row, props.col)}
        className=" intersection-hover emptyIntersection"
      >
         {intersectionBG(props.row,props.col)}
        {isPendingActionHere(contextPackage, props.row, props.col) && (
          <PendingSVG stoneColor="#000000" />
        )}
      </div>
    );
  }
};

function intersectionBG(row:number, col:number): JSX.Element {

  // console.log('intersection row col: ',row,col)
   if((row==0) && (col==0)  )  return <UpperLeftSVG/>;
   if((row==0) && (col>0)&& (col<18)   )  return <TopSVG/>;
   if((row==0) &&  (col==18)   )  return <UpperRightSVG/>;

   if((row==18) && (col==0)  )  return <LowerLeftSVG/>;
   if((row==18) && (col>0)&& (col<18)   )  return <BottomSVG/>;
   if((row==18) &&  (col==18)   )  return <LowerRightSVG/>;

   if((row>0) &&(row<18) &&   (col==0)   )  return <LeftEdgeSVG/>;
   if((row>0) &&(row<18) &&   (col==18)   )  return <RightEdgeSVG/>;

   if((row==3) && (col==3)  )  return <IntersctionDotSVG/>;
   if((row==3) && (col==15)  )  return <IntersctionDotSVG/>; 
   if((row==15) && (col==15)  )  return <IntersctionDotSVG/>; 
   if((row==15) && (col==3)  )  return <IntersctionDotSVG/>;
   if((row==3) && (col==9)  )  return <IntersctionDotSVG/>;
   if((row==9) && (col==3)  )  return <IntersctionDotSVG/>;
   if((row==9) && (col==15)  )  return <IntersctionDotSVG/>;
   if((row==9) && (col==9)  )  return <IntersctionDotSVG/>;
   if((row==15) && (col==9)  )  return <IntersctionDotSVG/>;
  return   <IntersctionSVG />;
}


export default IntersectionBackGround;
