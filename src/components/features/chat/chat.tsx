import { Box, Button, Card, CardBody, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Match } from "../../../services/data/match-service";
import {PlayerContext, PlayerContextType } from "../../../contexts/PlayerContext";
import useMessages from "../../../services/data/use-messages";
import { Message } from "../../../services/data/message-service";
import styles from "./chat.module.css";
import MessageCard from "./message-card";
import { STONE_BLACK, STONE_WHITE } from "../../../constants";

interface Props {
  match: Match;
}

const Chat = ({ match }: Props) => {
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const [newMessageText, setNewMessageText] = useState<string>("");
  const {messages, addNewMessage} = useMessages(match.id);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newMessageText === "") return;
    addNewMessage({
      message: newMessageText,
      speakerName: player?.name ?? "unkown",
      matchId: match.id,
      createDate: new Date().toISOString(),
    } as Message);
    setNewMessageText("");
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  function getMessageStoneColor(senderName: string, match: Match): string {
    if (match.playerBlackName === senderName) {
      return STONE_BLACK;
    } else return STONE_WHITE;
  }
  return (
    <Card h="100%" p={0}>
      <CardBody height="100%" pb={2} className={styles.chatCardBody}>
        <Box className="chat-window" p="0px">
          <Box overflowY="scroll" className={styles.chatScroll}>
            {messages.map((item) => {
              return (
                <MessageCard
                  key={item.id}
                  message={item}
                  stoneColor={getMessageStoneColor(item.speakerName, match)}
                ></MessageCard>
              );
            })}
            {false && <AlwaysScrollToBottom />}
          </Box>
          <form onSubmit={handleSubmit}>
            <Flex mt="10px" flexDirection="row">
              <input
                style={{ flex: 1 }}
                onChange={(e) => setNewMessageText(e.target.value)}
                value={newMessageText}
              ></input>
              <Button type="submit" colorScheme="blue">Send</Button>
            </Flex>
          </form>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Chat;
