import {Router, Response} from 'express';
import {generateAiDocument} from '../service/iaService';
import {AuthRequest, authMiddleware} from '../middlewares/authMiddlewares';
import {PrismaClient} from '../../generated/prisma';
import {checkDocumentLimit} from '../middlewares/checkDocumentLimit';
import {crawlSite} from '../service/crawlSite';

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/',
    authMiddleware,
    checkDocumentLimit,
    async (req: AuthRequest, res: Response): Promise<void> => {
        const {siteId, type, title, observations = ''} = req.body;

        if (!title || !type || !siteId) {
            res.status(400).json({error: 'Title, type and siteId are required'});
            return;
        }

        try {
            const site = await prisma.site.findUnique({where: {id: siteId}});

            if (!site || site.ownerId !== req.userId) {
                res.status(403).json({error: 'Access denied'});
                return;
            }

            const userWithPlan = await prisma.users.findUnique({
                where: {id: req.userId!},
                include: {
                    userPlans: {
                        orderBy: {createdAt: 'desc'},
                        include: {plan: true},
                    },
                },
            });

            const currentPlan = userWithPlan?.userPlans[0]?.plan;

            const content = await generateAiDocument({
                type,
                domain: site.domain,
                legislation: site.legislation,
                language: site.language,
                observations,
                plan: currentPlan?.name?.toLowerCase() || 'free',
                // crawl: await crawlSite(site.domain),
            });

            const doc = await prisma.document.create({
                data: {
                    siteId,
                    type,
                    title,
                    content,
                    usersId: req.userId!,
                },
            });

            await prisma.activityLog.create({
                data: {
                    userId: req.userId!,
                    action: `Created the "${doc.type}" document for site "${site.name}"`,
                },
            });

            res.status(201).json(doc);
        } catch (error) {
            console.error('Error during document creation: ', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
);

export default router;
