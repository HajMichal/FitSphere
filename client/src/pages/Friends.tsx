import { PageContainer } from "../components/styled/Containers";
import { FriendsList } from "../components/FriendsList";
import { SearchBar } from "../components/UIElements/SearchBar";
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
