import Link from "next/link";
import {Menu, Moon, Sun, X} from "lucide-react";
import {LanguageSelector} from "@/components/LanguageSelector";
import {motion, AnimatePresence} from "framer-motion";
import {useTheme} from "@/components/ThemeContext";
import {useState} from "react";
import {useI18n} from "@/contexts/I18nContext";

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: 'spring', stiffness: 100, damping: 12},
    },
};

const textChangeVariants = {
    enter: {
        opacity: 0,
        y: 10,
        transition: { duration: 0.2 }
    },
    center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 }
    }
};

const mobileMenuVariants = {
    closed: {
        opacity: 0,
        y: -20,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const buttonVariants = {
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    },
    tap: { scale: 0.95 }
};

export default function HeaderPublic() {
    const {t, language} = useI18n();
    const {theme, toggleTheme} = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 relative z-20">
            {/* Logo */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="text-2xl font-bold bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
            >
                <Link href="/">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`logo-${language}`}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={textChangeVariants}
                        >
                            Legal Forge
                        </motion.span>
                    </AnimatePresence>
                </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-light-text-secondary dark:text-dark-text-secondary">
                {['features', 'pricing', 'aboutUs'].map((item) => (
                    <Link
                        key={item}
                        href={`/#${item}`}
                        className="relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`nav-${item}-${language}`}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={textChangeVariants}
                                className="block hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
                            >
                                {t(`nav.${item}`)}
                            </motion.span>
                        </AnimatePresence>
                    </Link>
                ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            {theme === 'dark' ?
                                <Sun className="text-yellow-400"/> :
                                <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>
                            }
                        </motion.div>
                    </AnimatePresence>
                </motion.button>

                <LanguageSelector/>

                <Link href="/auth/login">
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="px-6 py-2 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white rounded-md"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`start-${language}`}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={textChangeVariants}
                            >
                                {t('nav.getStarted')}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </Link>

                <Link href="/contact">
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="px-6 py-2 border border-light-border dark:border-dark-border rounded-md bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`expert-${language}`}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={textChangeVariants}
                            >
                                {t('nav.talkExpert')}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            {theme === 'dark' ?
                                <Sun className="text-yellow-400"/> :
                                <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>
                            }
                        </motion.div>
                    </AnimatePresence>
                </motion.button>

                <LanguageSelector/>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-light-text-primary dark:text-dark-text-primary"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mobileMenuOpen ? 'close' : 'open'}
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                        className="absolute top-full left-0 right-0 bg-light-card/95 dark:bg-dark-card/95 p-4 backdrop-blur-md"
                    >
                        <nav className="flex flex-col space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                            {['features', 'pricing', 'aboutUs'].map((item) => (
                                <motion.div
                                    key={item}
                                    variants={itemVariants}
                                >
                                    <Link
                                        href={`/#${item}`}
                                        className="block hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={`mobile-${item}-${language}`}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                variants={textChangeVariants}
                                            >
                                                {t(`nav.${item}`)}
                                            </motion.span>
                                        </AnimatePresence>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div className="flex flex-col space-y-3 mt-4">
                            <Link href="/auth/login" className="w-full">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full px-6 py-2 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white rounded-md"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={`mobile-start-${language}`}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            variants={textChangeVariants}
                                        >
                                            {t('nav.getStarted')}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </Link>
                            <Link href="/contact" className="w-full">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full px-6 py-2 border border-light-border dark:border-dark-border rounded-md bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={`mobile-expert-${language}`}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            variants={textChangeVariants}
                                        >
                                            {t('nav.talkExpert')}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}