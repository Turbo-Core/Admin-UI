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

    prisma.user.findUniqueOrThrow({
        where: {
            email: req.body.email
        }
    }).then(async value => {
        // User found
        if (await argon2.verify(value.password, req.body.password))  {
            // Password matched, create token
            const token = await jwt.sign({
                email: value.email
            }, serverRuntimeConfig.key, { expiresIn: '1h'});

            // Send said token
            res.status(200).send({
                token
            });
        }
        else {
            res.status(403).send(null);
        }
    }).catch(error => {
        // P2025 is record not found
        if (error.code === 'P2025')
            res.status(403).send(null);
        else // Otherwise, we don't know what went wrong, send a generic 500
            res.status(500).send(null);
    })
}