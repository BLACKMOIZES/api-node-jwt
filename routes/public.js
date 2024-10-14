import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; // Variável de ambiente para o segredo do JWT

// Cadastro de Usuário
router.post('/cadastro', async (req, res) => {
    try {
        const { email, name, password, cpfCnpj } = req.body;

        // Gera o salt e a senha hash
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Cria o usuário no banco de dados
        const userDB = await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
                cpfCnpj, // Campo CPF/CNPJ adicionado
            },
        });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: userDB });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err); // Log do erro para depuração
        res.status(500).json({ message: 'Erro no servidor, tente novamente' });
    }
});

// Login do Usuário
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário no banco de dados pelo email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se a senha informada está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (err) {
        console.error('Erro ao realizar login:', err); // Log do erro para depuração
        res.status(500).json({ message: 'Erro no servidor, tente novamente' });
    }
});

export default router;





//Usuário robsonfaria
//Senha mongodb Y89H8Mqp0qnbgjRa


//mongodb+srv://robsonfaria:Y89H8Mqp0qnbgjRa@users.zkg53.mongodb.net/?retryWrites=true&w=majority&appName=Users