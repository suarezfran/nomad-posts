import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("q");

        const whereClause: Prisma.UserWhereInput = search
            ? {
                OR: [
                    { name: { contains: search } },
                    { username: { contains: search } },
                ],
            }
            : {};

        const users = await prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                username: true,
            },
            orderBy: {
                name: "asc",
            },
            take: 5,
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error loading users:", error);
        return NextResponse.json(
            { error: "Failed loading users" },
            { status: 500 },
        );
    }
}
