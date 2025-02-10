import { Navbar } from "@/components/Navbar";
import { AddTrainingDayForm } from "@/components/forms/AddTrainingDayForm";
import { PageContainer } from "@/components/styled/Containers";
import { NameHeader } from "@/components/styled/Text";

const ModifyTraining = () => {
  return (
    <PageContainer>
      <NameHeader>Dodaj dzień treningowy!</NameHeader>
      <AddTrainingDayForm />
      <Navbar />
    </PageContainer>
  );
};

export default ModifyTraining;
