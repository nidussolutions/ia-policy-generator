import Link from "next/link";
import {Menu, Moon, Sun, X} from "lucide-react";
import {LanguageSelector} from "@/components/LanguageSelector";
import {motion} from "framer-motion";
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

export default function HeaderPublic() {
    const {t} = useI18n();
    const {theme, toggleTheme} = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 relative z-20">
            {/* Navbar */}
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                <Link href="/">Legal Forge</Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-light-text-secondary dark:text-dark-text-secondary">
                <Link href="/#features" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                    {t('nav.features')}
                </Link>
                <Link href="/#pricing" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                    {t('nav.pricing')}
                </Link>
                <Link href="/#about" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                    {t('nav.aboutUs')}
                </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                >
                    {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                        <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                </button>
                <LanguageSelector/>
                <Link href="/auth/login">
                    <motion.button
                        whileHover={{scale: 1.05}}
                        className="px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                        variants={itemVariants}
                    >
                        {t('nav.getStarted')}
                    </motion.button>
                </Link>
                <Link href="/contact">
                    <motion.button
                        whileHover={{scale: 1.05}}
                        className="px-6 py-2 border border-light-border dark:border-dark-text-secondary rounded-md text-light-text-primary dark:text-dark-text-primary"
                        variants={itemVariants}
                    >
                        {t('nav.talkExpert')}
                    </motion.button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                >
                    {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                        <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                </button>
                <LanguageSelector/>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-light-text-primary dark:text-dark-text-primary"
                >
                    {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-light-card/95 dark:bg-dark-card/95 p-4">
                    <nav className="flex flex-col space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                        <Link
                            href="/#features"
                            className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav.features')}
                        </Link>
                        <Link
                            href="/#pricing"
                            className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav.pricing')}
                        </Link>
                        <Link
                            href="/#about"
                            className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav.aboutUs')}
                        </Link>
                    </nav>
                    <div className="flex flex-col space-y-3 mt-4">
                        <Link href="/auth/login" className="w-full">
                            <motion.button
                                className="w-full px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                            >
                                {t('nav.getStarted')}
                            </motion.button>
                        </Link>
                        <Link href="/contact" className="w-full">
                            <motion.button
                                className="w-full px-6 py-2 border border-light-border dark:border-dark-border rounded-md text-light-text-primary dark:text-dark-text-primary"
                            >
                                {t('nav.talkExpert')}
                            </motion.button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}