import { Navbar } from "@/components/Navbar";
import { AddTrainingDayForm } from "@/components/forms/AddTrainingDayForm";
import { PageContainer } from "@/components/styled/Containers";
import { NameHeader } from "@/components/styled/Text";

const CreateTrainingDays = () => {
  return (
    <PageContainer>
      <NameHeader>Dodaj treningi!</NameHeader>
      <AddTrainingDayForm />
      <Navbar />
    </PageContainer>
  );
};

export default CreateTrainingDays;
