import { BellIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import { Match } from "../firestore";

interface Props {
  userId: string;
  match: Match;
}

export const StatusIndicator = (props: Props) => {
  if (props.match.status !== "active") {
    return (
      <HStack>
        <Icon as={CloseIcon} w={8} h={8} color="orange.500" />{" "}
        <Text>{props.match.status}</Text>
      </HStack>
    );
  }

  if (getIsMyTurnByMatch(props.userId, props.match)) {
    return (
      <HStack>
        <Text>My Turn!</Text>
        <Icon as={BellIcon} w={8} h={8} color="orange.500" />
      </HStack>
    );
  } else {
    return (
      <HStack>
        <Text>waiting for opponent</Text>
      </HStack>
    );
  }

  function getIsMyTurnByMatch(userId: string, match: Match): boolean {
    let userStoneColor = "b";
    if (match.playerWhiteId == userId) {
      userStoneColor = "w";
    }
    const isMyTurn = userStoneColor === match.nextTurnPlayer;
    return isMyTurn;
  }
};