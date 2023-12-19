import { Box, Flex, VStack } from '@chakra-ui/react'
import GameMoveButtons from './game-move-buttons';
import CancelMoveButton from './cancel-move-button';


interface Props {
  isPendingMove: boolean;
  isPendingPass: boolean;
  isMyTurn: boolean;
  onPlayConfirm: () => void;
  onPassConfirm: () => void;
  onPlayCancel: () => void;
  onPassCancel: () => void;
  onPass: () => void;
  isActiveGame: boolean;
  turnNumber: number;
  turnStutus: string;
  onResign: () => void;
}


export const GameActionCard = (props: Props) => {
  return (

    <VStack h="100px"  >
      <Box h="10px"></Box>
      <Flex w="100%" h="32px" >
        <Flex flex={1} justifyItems="right" ></Flex>
        <Flex flex={1} justifyContent="center" >
          <GameMoveButtons
            isPendingMove={props.isPendingMove}
            isMyTurn={props.isMyTurn}
            onPlayConfirm={props.onPlayConfirm}
            onPassConfirm={props.onPassConfirm}
            onPass={props.onPass}
            isActiveGame={props.isActiveGame}
            isPendingPass={props.isPendingPass} />
        </Flex>
        <Flex flex={1} justifyContent="right" alignContent="center">
          {/* TBD TBD TBD  <Button colorScheme="gray" size="sm" >Resign</Button> */}
        </Flex>
      </Flex>
      <Flex h="32px" w="100%" justifyContent="center"  > <CancelMoveButton
        isPendingMove={props.isPendingMove}
        isMyTurn={props.isMyTurn}
        onPlayCancel={props.onPlayCancel}
        onPassCancel={props.onPassCancel}
        isPendingPass={props.isPendingPass}
      ></CancelMoveButton>
      </Flex>
    </VStack>
  )
}