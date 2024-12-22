import { Navbar } from "../components/Navbar";
import { PageContainer } from "../components/styled/Containers";
import { NameHeader } from "../components/styled/Text";
import { CreateTrainigForm } from "../components/forms/CreateTrainig";

function CreateTrainng() {
  return (
    <PageContainer>
      <NameHeader>Create training!</NameHeader>
      <CreateTrainigForm />
      <Navbar />
    </PageContainer>
  );
}
export default CreateTrainng;
