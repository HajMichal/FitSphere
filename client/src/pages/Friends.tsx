import { PageContainer } from "../components/styled/Containers";
import { FriendsList } from "../components/FriendsList";
import { SearchBar } from "../components/UiElements/SearchBar";
import { Navbar } from "../components/Navbar";

function Friends() {
  return (
    <PageContainer>
      <SearchBar />
      <FriendsList />
      <Navbar />
    </PageContainer>
  );
}

export default Friends;
