import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação básica
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']; // Obtendo o token do cabeçalho

    // Aqui você deve implementar a lógica para verificar o token
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Exemplo de validação do token (pode ser JWT ou outro método)
    // Você deve substituir essa lógica pela sua implementação real
    if (token !== 'seu_token_secreto') {
        return res.status(403).json({ message: 'Token inválido.' });
    }

    next(); // Se o token for válido, prossegue para a próxima função
};

// Rota protegida para listar usuários
router.get('/listar-usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ message: 'Usuários listados com sucesso', users });
    } catch (err) {
        console.error('Erro ao listar usuários:', err); // Log do erro para depuração
        res.status(500).json({ message: 'Falha no servidor' });
    }
});
export default router;
