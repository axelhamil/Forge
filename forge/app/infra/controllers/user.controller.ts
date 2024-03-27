import { CreateUserDTO } from "@app/domain/contracts/users.contract";
import AllUsersPresenter from "@app/domain/handlers/presenters/AllUsers.presenter";
import CreateUser from "@app/domain/usecases/createUser";
import FindAllUsers from "@app/domain/usecases/findAllUsers";
import UserRepoDrizzle from "@app/infra/repositories/userRepo.drizzle";
import { FastifyReply, FastifyRequest } from "fastify";
import { injectable, registry } from "tsyringe";

@injectable()
@registry([{ token: "IUserRepo", useClass: UserRepoDrizzle }])
class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly findAllUsersUseCase: FindAllUsers,
  ) {}

  public async createUser(
    req: FastifyRequest<{
      Body?: CreateUserDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { email, password } = req.body;

      await this.createUserUseCase.execute({
        email,
        password,
      });

      return reply.redirect(`/users`);
    } catch (error) {
      return reply.send(error).code(500);
    }
  }

  public async findAllUsers(
    _req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.findAllUsersUseCase.execute();
    const presenter = new AllUsersPresenter(reply);

    return presenter.render(result);
  }
}

export default UserController;