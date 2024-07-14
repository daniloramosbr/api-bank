// import { prisma } from "..";
import { Request, Response } from "express";

class TransactionController {

 async get(request: Request, response: Response) {
  try {
    // const data = await prisma.transaction.findMany({
    //   orderBy: {
    //     createdAt: 'desc', 
    //   },
    //   take: 3, 
    // });

    response.status(200).json({ message: 'funcionando com sucesso!' });
  } catch (error) {
    response.status(500).send(error);
  }
}

}

export default new TransactionController();
