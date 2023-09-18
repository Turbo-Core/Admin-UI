// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@lib/prisma"
import * as argon2 from "argon2";
import getConfig from 'next/config';
import * as jwt from 'jsonwebtoken';

type Data = {
  token: string
} | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { serverRuntimeConfig } = getConfig();
    if (req.method !== "POST" || !req.body.password || !req.body.email) {
        res.status(400).send(null);
        return;
    }
    let userCount = await prisma.user.count();
    if (userCount != 0) {
        res.status(400).send(null);
        return;
    }
    const passwordHash = await argon2.hash(req.body.password);
    await prisma.user.create({
        data: {
            email: req.body.email,
            password: passwordHash
        }
    });
    const token = await jwt.sign({
        email: req.body.email
    }, serverRuntimeConfig.key, { expiresIn: '1h'});
    res.status(200).send({
        token
    });
}