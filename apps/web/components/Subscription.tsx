import useSWR from "swr";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {RefreshCw} from "lucide-react";

import {fetcher, PlanType, SubscriptionType} from "@/lib/api";
import {useCheckout} from "@/hooks/useCheckout";
import {useRouter} from "next/navigation";

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
    const {accessPortalClient} = useCheckout();
    const router = useRouter();
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null);
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(false);
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
                console.log(data);
                setType(!data.subscription.cancelAtPeriodEnd);
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
            mutate().finally();
            userMutate().finally();
        } catch (error) {
            console.error("Failed to update invoices profile:", error);
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
            label: "Manage Subscription",
        };
    };

    const buttonProps = getButtonProps();

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="bg-[#1E0359]/30 backdrop-blur-lg dark:border border-white/10 p-6 rounded-2xl shadow-2xl space-y-6"
        >
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">Current Plan</h2>
                    <p className="text-sm text-gray-300">
                        <strong>Type:</strong>{" "}
                        {plan ? plan.name.charAt(0).toUpperCase() + plan.name.slice(1) : "Loading..."}
                    </p>
                </div>

                <button
                    onClick={handleUpdate}
                    disabled={loadingUpdate}
                    className="flex items-center gap-2 text-sm text-fuchsia-400 hover:underline disabled:opacity-50"
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
            </div>

            {(error || userError) && <p className="text-red-500 text-sm">Error loading subscription.</p>}
            {(isLoading || loadingUser) && <p className="text-gray-400 text-sm">Loading subscription...</p>}

            {subscription ? (
                <div className="text-sm text-gray-300 space-y-1">
      <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${
              subscription.status !== "active"
                  ? "bg-red-600"
                  : subscription.cancelAtPeriodEnd
                      ? "bg-yellow-600"
                      : "bg-green-600"
          }`}
      >
        {subscription.cancelAtPeriodEnd
            ? "Active - Not Renewing"
            : statusLabel[subscription.status] || subscription.status}
      </span>
                    <p className="text-sm text-gray-400 mt-1">
                        <strong>{subscription.cancelAtPeriodEnd ? "Ends on" : "Next charge on"}:</strong>{" "}
                        {subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "---"}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-400">No active subscription at the moment.</p>
            )}

            {plan && buttonProps && (
                <motion.button
                    whileTap={{scale: 0.95}}
                    whileHover={{scale: 1.03}}
                    onClick={() => {
                        if (plan.name === "Free") {
                            router.push("/pricingpage")
                        } else if (subscription?.cancelAtPeriodEnd) {
                            handleSubscription(plan.name);
                        } else {
                            handleAccessPortal().finally();
                        }
                    }}
                    className={`px-4 py-2 rounded-xl text-white font-medium transition shadow-lg ${buttonProps.className}`}
                >
                    {buttonProps.label}
                </motion.button>
            )}
        </motion.div>
    );
};

export default Subscription;
