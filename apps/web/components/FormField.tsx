import React from "react";
import {AnimatePresence, motion} from "framer-motion";

type FormFieldProps = {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: 'input' | 'textarea';
    textDirection: number;
    delay: number;
    required?: boolean;
}

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

const FormField = ({
                       label,
                       name,
                       placeholder,
                       value,
                       onChange,
                       type = "input",
                       textDirection,
                       delay,
                       required = true
                   }: FormFieldProps) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{delay}}
        >
            <AnimatePresence mode="wait">
                <motion.label
                    key={`label-${name}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1"
                >
                    {label}
                </motion.label>
            </AnimatePresence>
            {type === "input" ? (
                <input
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full bg-light-card dark:bg-dark-card/40 backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                />
            ) : (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={4}
                    className="w-full bg-light-card dark:bg-dark-card/40 backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                />
            )}
        </motion.div>
    );
};

export default FormField;