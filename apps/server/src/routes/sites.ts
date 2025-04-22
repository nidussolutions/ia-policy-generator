import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import {authMiddleware, AuthRequest} from '../middlewares/authMiddlewares';
import {checkPlanLimits} from '../middlewares/checkPlanLimits';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    try {
        const sites = await prisma.site.findMany({
            where: {ownerId: req.userId!},
            orderBy: {createdAt: 'desc'},
        });

        if (!sites) {
            return res.status(404).json({error: 'No sites found'});
        }

        const userPlan = await prisma.userPlans.findUnique({
            where: {userId: req.userId!},
            include: {plan: true},
        });

        if (userPlan?.plan?.name === 'Free') {
            return res.json([sites[0]]);
        }


        res.json(sites);
    } catch
        (error) {
        console.log('Error during fetching sites: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:id', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    const {id} = req.params;
    try {
        const site = await prisma.site.findMany({
            where: {id},
        });

        if (!site) {
            return res.status(404).json({error: 'Site not found'});
        }

        res.json(site);
    } catch
        (error) {
        console.log('Error during fetching sites: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post(
    '/',
    authMiddleware,
    checkPlanLimits,
    async (req: AuthRequest, res) => {
        const {domain, language, legislation, name} = req.body;

        try {
            const site = await prisma.site.create({
                data: {
                    name,
                    domain,
                    language,
                    legislation,
                    ownerId: req.userId!,
                },
            });

            await prisma.activityLog.create({
                data: {
                    userId: req.userId!,
                    action: `Criou o site "${site.name}"`,
                },
            });

            res.status(201).json(site);
        } catch (error) {
            console.log('Error during creating site: ', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
);

router.put('/:id', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    const {id} = req.params;
    const userId = req.userId!;
    const {domain, language, legislation, name} = req.body;

    try {
        const site = await prisma.site.findUnique({where: {id}});

        if (!site) {
            return res.status(404).json({error: 'Site not found'});
        }

        if (site.ownerId !== userId) {
            return res.status(403).json({error: 'Você não tem permissão para alterar este site'});
        }

        const updatedSite = await prisma.site.update({
            where: {id},
            data: {
                domain: domain ? domain : site.domain,
                language: language ? language : site.language,
                legislation: legislation ? legislation : site.legislation,
                name: name ? name : site.name,
            },
        });

        await prisma.activityLog.create({
            data: {
                userId: req.userId!,
                action: `Editou o site "${site.name}"`,
            },
        });

        res.json(updatedSite);
    } catch (error) {
        console.log('Error during updating site: ', error);
        res.status(500).json({error: 'Internal server error'});
    }

});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
    const {id} = req.params;

    try {
        const site = await prisma.site.findUnique({where: {id}});

        if (!site) {
            res.status(404).json({error: 'Site not found'});
        }

        await prisma.document.deleteMany({where: {siteId: id}});
        await prisma.site.delete({where: {id}});

        await prisma.activityLog.create({
            data: {
                userId: req.userId!,
                action: `Removeu o site "${site!.name}"`,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.log('Error during deleting site: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;
