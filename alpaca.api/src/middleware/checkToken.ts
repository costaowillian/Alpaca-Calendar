import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { httpStatusCode } from "../controllers/Protocols";

// Middleware para verificar a validade de um token JWT
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtém o token do cabeçalho de autorização e verifica se o token está presente
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ Error: "Access denied!" });
  }

  try {
    // Obtém a chave secreta do ambiente (certifique-se de configurar essa variável de ambiente)
    const secret = process.env.SECRET ?? "";

    // Verifica a validade do token
    jwt.verify(token, secret);

    // Se o token for válido, chama a próxima função no pipeline de middleware
    next();
  } catch (err) {
    // Se houver um erro na verificação, retorna uma resposta de erro
    res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ Error: "The Token is invalid!" });
  }
};
