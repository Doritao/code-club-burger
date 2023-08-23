import User from "../models/User";
import { v4 } from "uuid";
import * as Yup from "yup";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    // if(!(await schema.isValid(request.body))) {
    //     return response.status(400).json({error: "Make sure your data is correct!"})
    // }
    try {
      await schema.validateSync(request.body, { abortEarly: false }); // o abortEarly assim que ele encontrar um error, ele ja para a aplicacao, entao ele nao fica procurando por outros errors, portanto se tiver algum error no email,senha, etc, ele so vai mostrar em um deles, por isto deve setar ele como falso
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return response.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });

    return response.status(201).json({ id: user.id, name, email, admin });
  }
}

export default new UserController();
