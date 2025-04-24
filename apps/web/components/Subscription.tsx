import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import useSWR from "swr";
import {fetcher, PlanType, SubscriptionType} from "@/lib/api";
import {RefreshCw} from "lucide-react";

type SubscriptionProps = {
    handleSubscription: (planName: string) => void;
    setType: (type: boolean) => void;
};

const statusLabel: Record<string, string> = {
    active: "Active",
    canceled: "Canceled",
    incomplete: "Incomplete",
    unpaid: "Unpaid",
};

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const Subscription = ({setType, handleSubscription}: SubscriptionProps) => {
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null);
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
                setType(data.subscription.cancelAtPeriodEnd);
            }
        }

        if (user) {
            setPlan(user.plan);
        }

    }, [data, user, setType]);

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/update-subscription-profile`, {
                method: "PATCH",
                headers: {Authorization: `Bearer ${token}`},
            });
            mutate();
            userMutate();
        } catch (error) {
            console.error("Failed to update invoices profile:", error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    const getButtonProps = () => {
        if (!plan) return null;


        if (plan.name === "Free") {
            return {
                className: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
                label: "Subscribe",
            };
        }

        if (subscription?.cancelAtPeriodEnd) {
            return {
                className: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800",
                label: "Reactivate Subscription",
            };
        }

        return {
            className: "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
            label: "Cancel Subscription",
        };
    };

    const buttonProps = getButtonProps();

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-6"
        >
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Current Plan
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Type:</strong>{" "}
                        {plan ? plan.name.charAt(0).toUpperCase() + plan.name.slice(1) : "Loading..."}
                    </p>
                </div>

                <div className="flex flex-col flex-end items-end justify-between gap-2">
                    <button
                        onClick={handleUpdate}
                        disabled={loadingUpdate}
                        className="flex items-center gap-2 text-sm text-blue-500 hover:underline disabled:opacity-50 cursor-pointer"
                        aria-label="Update invoices profile"
                    >
                        {loadingUpdate ? (
                            <>
                                <RefreshCw className="animate-spin" size={16}/> Updating...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16}/> Update
                            </>
                        )}
                    </button>

                    <button
                        disabled={isLoading || !subscription}
                        className={`text-sm text-blue-500 hover:underline disabled:opacity-50 ${subscription ? "cursor-pointer" : "cursor-not-allowed"}`}
                        onClick={() => {
                        }}
                        aria-label="Change payment method"
                    >
                        Change payment method
                    </button>
                </div>
            </div>

            {error || userError && <p className="text-red-500 text-sm">Error loading subscription.</p>}
            {isLoading || loadingUser && <p className="text-gray-400 text-sm">Loading subscription...</p>}

            {subscription ? (
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p
                        className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold text-white ${
                            subscription.status !== "active"
                                ? "bg-red-600"
                                : subscription.cancelAtPeriodEnd
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                        }`}
                    >
                        <strong>Status:</strong>{" "}
                        {subscription.cancelAtPeriodEnd
                            ? "Active - Not Renewing"
                            : statusLabel[subscription.status] || subscription.status}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <strong>{subscription.cancelAtPeriodEnd ? "Ends on" : "Next charge on"}:</strong>{" "}
                        {subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "---"}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    No active subscription at the moment.
                </p>
            )}

            {plan && buttonProps && (
                <motion.button
                    whileTap={{scale: 0.95}}
                    whileHover={{scale: 1.02}}
                    onClick={() => handleSubscription(plan.name)}
                    className={`px-4 py-2 rounded text-white font-medium transition ${buttonProps.className}`}
                    aria-label={buttonProps.label}
                >
                    {buttonProps.label}
                </motion.button>
            )}
        </motion.div>
    );
};

export default Subscription;
