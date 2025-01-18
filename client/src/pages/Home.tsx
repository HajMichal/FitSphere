import { useEffect, useState } from "react";
import { trpc } from "../api/trpc";

import { Exercises } from "../components/Exercises";
import { NameHeader } from "../components/styled/Text";
import { Navbar } from "../components/Navbar";
import { Calendar } from "../components/calendar/Calendar";
import { AvaivableTrainings } from "../components/AvaivableTrainings";
import { PageContainer } from "../components/styled/Containers";

function Home() {
  const [choosedTrainingDay, setTrainingDay] = useState<string | undefined>();

  const { data: user, isFetched } = trpc.example.users.useQuery();
  const { data } = trpc.example.protectedTest.useQuery();
  // const { data } = trpc.auth.logout.useQuery();
  useEffect(() => {
    if (isFetched) setTrainingDay(user?.trainings[0].trainingDay[0].id);
  }, [isFetched, user?.trainings]);

  return (
    <PageContainer>
      <NameHeader>Hello {user?.name}!</NameHeader>
      <Calendar />
      <AvaivableTrainings user={user} setTrainingDay={setTrainingDay} />
      {choosedTrainingDay && (
        <Exercises choosedTrainingDay={choosedTrainingDay} />
      )}
      <Navbar />
    </PageContainer>
  );
}
export default Home;
