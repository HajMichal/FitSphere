import { Navbar } from "@/components/Navbar";
import { AddTrainingDayForm } from "@/components/forms/AddTrainingDayForm";
import { PageContainer } from "@/components/styled/Containers";
import { NameHeader } from "@/components/styled/Text";

const ModifyTraining = () => {
  return (
    <PageContainer>
      <NameHeader>Zarządzaj treningiem!</NameHeader>
      <AddTrainingDayForm trainingNumber={1} />
      <Navbar />
    </PageContainer>
  );
};

export default ModifyTraining;
