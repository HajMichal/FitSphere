import { FriendsList } from "../components/FriendsList";
import { Navbar } from "../components/Navbar";
import { PageContainer } from "../components/styled/Containers";
import { SearchBar } from "../components/UIElements/inputs/SearchBar";

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
