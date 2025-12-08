import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        // { name: 'Become a Trainer', href: '/join-as-trainer' }, // Changed to route as it's a separate page
        { name: 'Contact', href: '#contact' }, // Added Contact link
    ];

    return (
        <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-2xl font-bold text-dark">
                            Wellwigen<span className="text-primary">Fitness</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-text hover:text-primary font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#consultation"
                            className="bg-dark text-white hover:bg-primary font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-dark hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-text hover:text-primary hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#book"
                            className="block w-full text-center mt-4 bg-primary text-dark font-bold py-3 rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
