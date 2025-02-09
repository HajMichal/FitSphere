import { useEffect, useState } from "react";
import { TrainingDays } from "./TrainingDays";
import { Calendar } from "./calendar/Calendar";
import { Exercises } from "./Exercises";
import { NameHeader } from "./styled/Text";
import { trpc } from "../api/trpc";
import { ErrorImageBox, Loading } from "./UIElements";
import { ROUTES } from "../pages/routes";
import { WomanOnBike } from "../../public/svgs/WomanOnBike";
import { Gear } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { useSession } from "@/hooks/useSession";
import { Training } from "./Training";

export function UserData() {
  const navigate = useNavigate();
  const [choosedTrainingDay, setTrainingDay] = useState<string | undefined>();
  const { status } = useSession();
  const { data: user, isFetched } = trpc.user.getUserWithTraining.useQuery();
  const {
    mutate: logout,
    isPending: isLogoutPending,
    isSuccess: isLogoutSuccess,
  } = trpc.auth.logout.useMutation();

  useEffect(() => {
    if (isFetched && user?.trainings.length !== 0) {
      setTrainingDay(user?.trainings[0]?.trainingDay[0]?.id);
    }
  }, [isFetched, user?.trainings]);

  useEffect(() => {
    if (isLogoutSuccess) navigate(ROUTES.login);
    if (status === "NOT_AUTHENTICATED") navigate(ROUTES.login);
  }, [isLogoutSuccess, navigate, status]);

  return (
    <>
      {/* FILE NEEDS REFACTOR */}
      {(isLogoutPending || status === "LOADING") && <Loading />}
      <div className="flex items-center justify-between">
        <NameHeader className="whitespace-nowrap max-w-[300px] overflow-hidden overflow-ellipsis">
          Hello {user?.name}!
        </NameHeader>
        <button className="mr-3" onClick={() => logout()}>
          <Gear size={30} />
        </button>
      </div>
      {user?.trainings.length === 0 ? (
        <ErrorImageBox
          text="Nie masz jeszcze żadnego treningu"
          buttonText="STWÓRZ TERAZ"
          svg={<WomanOnBike />}
          navigateTo={ROUTES.createTrainng}
        />
      ) : (
        <>
          <Training currentTraining={user?.trainings[0]} />
          <Calendar />
          <TrainingDays user={user} setTrainingDay={setTrainingDay} />
          {choosedTrainingDay && (
            <Exercises choosedTrainingDay={choosedTrainingDay} />
          )}
        </>
      )}
    </>
  );
}
