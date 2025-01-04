import { Header } from "./styled/Text";
import { FriendTile } from "./FriendTile";
import { CenterContent } from "./styled/Containers";

export function FriendsList() {
  return (
    <>
      <Header>Friends list</Header>
      <CenterContent>
        <FriendTile />

        <img src="/images/vectors/empty_list.png" alt="empty_list" />
      </CenterContent>
    </>
  );
}
