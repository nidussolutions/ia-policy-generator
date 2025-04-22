import {PrismaClient} from '../../generated/prisma';

const prisma = new PrismaClient();

export async function updatePlan(userId: string, planId: string) {
    try {
        const userPlan = await prisma.userPlans.upsert({
            where: {userId},
            update: {planId},
            create: {userId, planId},
        });

        if (!userPlan) {
            new Error('Erro ao atualizar o plano do usuário');
            return
        }

        console.log(`Usuário ${userId} atualizado para o plano ${planId} com sucesso.`);

    } catch (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
    }
}
