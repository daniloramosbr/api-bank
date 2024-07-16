
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
  async create(request: Request, response: Response) {          //cria usuario
  
    try {
      const { name, email, password } = request.body;

      if (!name || !email) {
        return response.status(500).json({ erro: "insira todos os dados" });          //verircia se temm todos os dados
      }
 
      const user = await prisma.user.findUnique({  //busca no banco o email
        where: {
          email
        },
      })
       
      if (user != null) {
        return response.status(500).json({ erro: "email já cadastrado" });         //retorna erro
      }

      const passCrypt = await bcrypt.hash(password, 10);   //senha criptografada
         
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: passCrypt,
        },
      });
      
      await prisma.valor.create({         //cria valor com id e name do user
        data: {
          name,
          user: newUser.id
        },
      });       

      const data = Jwt.sign({ id: newUser.id, name:name }, "190526", {
        //cria token com id e name
        expiresIn: "24h",
      });

      response.status(201).json({data})
    } catch (error) {
      response.status(500).send(error)
    }
  }

  async valid(request: Request, response: Response) {
    //valida user
    try {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return response.status(401).json({ erro: "Usuário não encontrado" });
      }

      const hash = await prisma.user.findUnique({
        where: { email: email },
        select: { password: true },
      });

      if (hash == null) {
        return response.status(404).send({
          message: "usuário ou senha incorretos",
        });
      }

      const validPassword = await bcrypt.compare(password, hash.password!); //verifica se a senha eh igual

      if (!validPassword) {
        return response.status(401).json({ erro: "Senha inválida" });
      }

      const data = Jwt.sign({ id: user.id, name: user.name }, "190526", {
        expiresIn: "24h",
      });

      response.json({ data });
    } catch (error) {
      response.status(500).send(error);
    }
  }
  async googlevalid(request: Request, response: Response) {
    //valida google
    try {
      const { email } = request.body;

      const user = await prisma.user.findUnique({ where: { email } }); //busca no banco

      if (!user) {
        return response.status(401).json({ erro: "Usuário não encontrado" });
      }

      const data = Jwt.sign({ id: user.id, name: user.name }, "190526", {
        expiresIn: "24h",
      });

      response.json({ data });
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async all(request: Request, response: Response) {
    //busca todos users
    try {
      const user = request.params.id;

      const data = await prisma.user.findMany({
        where: {
          NOT: {
            id: user,        //remove o com id informado
          },
        },
        select: {id: true,
          name: true,
        }
      });
      response.status(200).json({data});
    } catch (error) {
      response.status(500).send(error);
    }
  }
}
export default new UserController();
