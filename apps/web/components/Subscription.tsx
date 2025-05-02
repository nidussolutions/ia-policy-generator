import useSWR from "swr";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {RefreshCw} from "lucide-react";
import {useI18n} from "@/contexts/I18nContext";

import {fetcher} from "@/lib/api";
import {PlanType} from '@/types/PlanType';
import {SubscriptionType} from "@/types/SubscriptionsType";
import {useCheckout} from "@/hooks/useCheckout";
import {useRouter} from "next/navigation";

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const textVariants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: (direction: number) => ({
        y: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

const containerVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            staggerChildren: 0.1
        }
    }
};

const Subscription = () => {
    const {accessPortalClient} = useCheckout();
    const router = useRouter();
    const {t, language} = useI18n();
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null);
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const [textDirection, setTextDirection] = useState(0);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [t]);

    const {data, error, isLoading, mutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/subscription` : null,
        (url: string) => fetcher(url, token!)
    );

    const {data: user, error: userError, isLoading: loadingUser, mutate: userMutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/profile` : null,
        (url: string) => fetcher(url, token!)
    );

    useEffect(() => {
        if (data) {
            setSubscription(data.subscription);
            if (data.subscription) {
                console.log(data);
            }
        }

        if (user) {
            setPlan(user.plan);
        }

    }, [data, user]);

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/update-subscription-profile`, {
                method: "PATCH",
                headers: {Authorization: `Bearer ${token}`},
            });
            mutate().finally();
            userMutate().finally();
        } catch (error) {
            console.log("Failed to update invoices profile:", error);
        } finally {
            console.log("Update complete");
            console.log(data);
            setLoadingUpdate(false);
        }
    };

    const handleAccessPortal = async () => {
        setLoadingAccess(true);
        try {
            await accessPortalClient();
        } catch (error) {
            console.error("Failed to access client portal:", error);
        } finally {
            setLoadingAccess(false);
        }
    }

    const getButtonProps = () => {
        if (!plan) return null;

        if (plan.type === "free") {
            return {
                className: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
                label: t("profile.subscription.purchaseSubscription"),
            };
        }

        if (subscription?.cancelAtPeriodEnd) {
            return {
                className: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800",
                label: t("profile.subscription.cancelSubscription"),
            };
        }

        return {
            className: "bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-700 dark:hover:bg-fuchsia-800",
            label: t("profile.subscription.manegeSubscription"),
        };
    };

    const buttonProps = getButtonProps();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-lg border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-2xl space-y-3"
        >
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.h2
                            key={`title-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary"
                        >
                            {t("profile.subscription.currentPlan")}
                        </motion.h2>
                    </AnimatePresence>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={`plan-type-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-sm text-light-text-secondary dark:text-dark-text-secondary"
                        >
                            <strong>{t("profile.subscription.type")}:</strong>{" "}
                            {plan ? plan.name.charAt(0).toUpperCase() + plan.name.slice(1) : "Loading..."}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={handleUpdate}
                    disabled={loadingUpdate}
                    className="flex items-center gap-2 text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline disabled:opacity-50"
                >
                    <RefreshCw className={loadingUpdate ? "animate-spin" : ""} size={16}/>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={`update-${language}-${loadingUpdate}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            {loadingUpdate ? `${t("profile.subscription.updating")}...` : t("profile.subscription.update.button")}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                {(error || userError) && (
                    <motion.p
                        key="error"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-red-500 text-sm"
                    >
                        {t("profile.subscription.update.error")}
                    </motion.p>
                )}

                {(isLoading || loadingUser) && (
                    <motion.p
                        key="loading"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-light-text-secondary dark:text-dark-text-secondary text-sm"
                    >
                        {t("profile.subscription.loading")}
                    </motion.p>
                )}
            </AnimatePresence>

            {subscription ? (
                <motion.div
                    variants={containerVariants}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1"
                >
                    <motion.span
                        whileHover={{scale: 1.05}}
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${
                            subscription.status !== "active"
                                ? "bg-blue-600"
                                : subscription.cancelAtPeriodEnd
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                        }`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={`status-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                            >
                                {subscription.cancelAtPeriodEnd
                                    ? t("profile.subscription.notRenewing")
                                    : t(`profile.subscription.status.${subscription.status}`)}
                            </motion.span>
                        </AnimatePresence>
                    </motion.span>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={`next-charge-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1"
                        >
                            <strong>
                                {subscription.cancelAtPeriodEnd
                                    ? t("profile.subscription.ends")
                                    : t("profile.subscription.nextCharge")}
                                :
                            </strong>{" "}
                            {subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "---"}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>
            ) : (
                <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                        key={`no-plan-${language}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-sm text-light-text-secondary dark:text-dark-text-secondary"
                    >
                        {t("profile.subscription.noPlan")}
                    </motion.p>
                </AnimatePresence>
            )}

            {plan && buttonProps && (
                <motion.button
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.95}}
                    disabled={loadingAccess}
                    onClick={() => {
                        if (plan?.type === "free") {
                            setLoadingAccess(true);
                            router.push("/pricingpage");
                        } else {
                            handleAccessPortal().finally();
                        }
                    }}
                    className={`px-4 py-2 rounded-xl text-white font-medium transition shadow-lg ${buttonProps.className}`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={`button-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            {buttonProps.label}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            )}
        </motion.div>
    );
};

export default Subscription;