import {
  Exercises,
  Friendships,
  Sessions,
  TrainingDay,
  Trainings,
  User,
} from "./schema";

export const users: User[] = [
  {
    id: "918e72cd-7599-40f5-801a-a138a40f701f",
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    password: "hashedPassword123",
    role: "gymmer",
    country: "USA",
    city: "New York",
    gymName: "Powerhouse Gym",
    age: 30,
    height: 180.25,
    weight: 75.5,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "f37e3287-151a-434e-bbf6-7c97815a0498",
    name: "Jane",
    surname: "Smith",
    email: "jane.smith@example.com",
    phone: "987654321",
    password: "hashedPassword456",
    role: "trainer",
    country: "Canada",
    city: "Toronto",
    gymName: "Fit Club",
    age: 28,
    height: 165.75,
    weight: 62.0,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "0684cc49-ca6a-4735-8d81-56dba21df23f",
    name: "Alice",
    surname: "Johnson",
    email: "alice.johnson@example.com",
    phone: "112233445",
    password: "hashedPassword789",
    role: "gymmer",
    country: "Australia",
    city: "Sydney",
    gymName: "Iron Paradise",
    age: 25,
    height: 170.1,
    weight: 68.3,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
];

export const friendships: Friendships[] = [
  {
    friendId: "0684cc49-ca6a-4735-8d81-56dba21df23f",
    userId: "f37e3287-151a-434e-bbf6-7c97815a0498",
  },
];

export const trainings: Trainings[] = [
  {
    id: "97b8a00e-0907-43f5-a586-cc893ca23e62",
    userId: "918e72cd-7599-40f5-801a-a138a40f701f",
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
    name: "My Personal training",
    period: 6,
    weeklyFrequency: 3,
    description: "Lose 10kg",
  },
];

export const trainingDay: TrainingDay[] = [
  {
    id: "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97",
    trainingId: "97b8a00e-0907-43f5-a586-cc893ca23e62",
    name: "PUSH",
    description: null,
    trainingNumber: 0,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "80b4dd83-2a47-4224-bc7e-78d96223cc4c",
    trainingId: "97b8a00e-0907-43f5-a586-cc893ca23e62",
    name: "PULL",
    trainingNumber: 0,
    description: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "25f09b9c-c733-4df8-8b38-ce41980bb575",
    trainingId: "97b8a00e-0907-43f5-a586-cc893ca23e62",
    name: "LEGS",
    trainingNumber: 0,
    description: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
];

export const exercises: Exercises[] = [
  {
    id: "bffdf869-87fb-4b7d-8555-b9f9313a21c5",
    name: "Bench press",
    kilograms: 60,
    series: 3,
    trainingDayId: "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97",
    reps: JSON.stringify(["2x6", "1x10"]),
    description: null,
    rpe: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "559cd283-19aa-46bb-9479-1fb5e059fc00",
    name: "Over Head Press (OHP)",
    kilograms: 30,
    series: 3,
    trainingDayId: "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97",
    reps: JSON.stringify(["3x10"]),
    description: null,
    rpe: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "0df46fb2-3349-4112-a1f2-9921149b75df",
    name: "Incline DB",
    kilograms: 30,
    series: 3,
    trainingDayId: "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97",
    reps: JSON.stringify(["3x10"]),
    description: null,
    rpe: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
  {
    id: "875ca772-9ff6-42a3-9d80-f1cd73393795",
    name: "Tricpes",
    kilograms: 30,
    series: 3,
    trainingDayId: "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97",
    reps: JSON.stringify(["4xMAX"]),
    description: null,
    rpe: null,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
  },
];

export const sessions: Sessions[] = [
  {
    id: "61e277ea-0262-4f9f-a2b3-8af4e588dc06",
    userId: "0684cc49-ca6a-4735-8d81-56dba21df23f",
    name: "Alice",
    expiresAt: new Date(new Date().setFullYear(2026)).getTime().toString(),
    token: "",
  },
];

// const main = async () => {
//   const db = getDb({ DB: "backend/server/db/DB/sqlite.db" });
//   try {
//     await db.delete(friendshipsSchema);
//     await db.delete(exercisesSchema);
//     await db.delete(trainingDaySchema);
//     await db.delete(trainingsSchema);
//     await db.delete(sessionsSchema);
//     await db.delete(usersSchema);

//     await db.insert(friendshipsSchema).values(friendships);
//     await db.insert(usersSchema).values(users);
//     await db.insert(trainingsSchema).values(trainings);
//     await db.insert(trainingDaySchema).values(trainingDay);
//     await db.insert(exercisesSchema).values(exercises);
//     await db.insert(sessionsSchema).values(sessions);

//     // const userData = await db.query.users.findMany();
//     // const friendShipData = await db.query.friendships.findMany();
//     // const trainingsData = await db.query.trainings.findMany();
//     // const trainingDayData = await db.query.trainingDay.findMany();
//     // const exercisesData = await db.query.exercises.findMany();
//     // const sessionsData = await db.query.sessions.findMany();

//     // console.log(userData);
//     // console.log(friendShipData);
//     // console.log(trainingsData);
//     // console.log(trainingDayData);
//     // console.log(exercisesData);
//     // console.log(sessionsData);
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// };

// main()
//   .catch((error) => {
//     console.error("error");
//     console.error(error);
//   })
//   .finally(() => {
//     process.exit();
//   });
