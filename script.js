const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  console.log(
    "heap size at start (MB)",
    process.memoryUsage().heapUsed / 1024 / 1024
  );

  const usersInput = Array.from({ length: 1000 * 1000 }, (_, i) => ({
    id: `user-id-${i}`,
    organizationId: "organization-id",
    email: `u${i}@mail.com`,
    mobileNumber: "+999898171872",
    birthDate: new Date(),
    password: `password${i}`,
    familyName: `fname${i}`,
    givenName: `gname${i}`,
    settings: { theme: "red", locale: "fr" },
    isActive: i % 2 === 0,
  }));

  console.log(
    "heap size before insert (MB)",
    process.memoryUsage().heapUsed / 1024 / 1024
  );
  await prisma.user.createMany({ data: usersInput });
  console.log("done");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
