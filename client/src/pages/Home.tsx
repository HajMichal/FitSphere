import { Navbar } from "../components/Navbar";
import { PageContainer } from "../components/styled/Containers";
import { UserData } from "../components/UserData";

function Home() {
  return (
    <PageContainer>
      <UserData />
      <Navbar />
    </PageContainer>
  );
}
export default Home;
