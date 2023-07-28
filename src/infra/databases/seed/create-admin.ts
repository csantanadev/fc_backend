import { PasswordBcrypt } from "./../../shared/crypto/password.bcrypt.impl";
import { prismaClient } from "../prisma.config";

async function main() {
  const password = await new PasswordBcrypt().hash("admin");

  await prismaClient.user.create({
    data: {
      name: "admin",
      username: "admin",
      password,
      email: "admin@admin.com.br",
      cpf: "00000000000",
      date_birth: new Date("1985-11-04"),
      phone: "81988693905",
      mother_name: "fulana de tal",
    },
  });
}

main();
