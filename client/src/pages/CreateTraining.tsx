import { Navbar } from "../components/Navbar";
import { PageContainer } from "../components/styled/Containers";
import { NameHeader } from "../components/styled/Text";
import { CreateTrainigForm } from "../components/forms/CreateTrainigForm";

function CreateTraining() {
  return (
    <PageContainer>
      <NameHeader>Stwórz trening!</NameHeader>
      <CreateTrainigForm />
      <Navbar />
    </PageContainer>
  );
}
export default CreateTraining;
