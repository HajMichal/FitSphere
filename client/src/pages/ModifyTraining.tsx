import { Navbar } from "@/components/Navbar";
import { AddTrainingDayForm } from "@/components/forms/AddTrainingDayForm";
import { PageContainer } from "@/components/styled/Containers";
import { NameHeader } from "@/components/styled/Text";

const ModifyTraining = () => {
  return (
    <PageContainer>
      <NameHeader>Modyfikuj trening!</NameHeader>
      <AddTrainingDayForm />
      <Navbar />
    </PageContainer>
  );
};

export default ModifyTraining;
