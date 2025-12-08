import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80", // Original (Home Workout)
        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80", // Laptop Yoga
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80", // Trainer Gym
        "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"  // Deep stretch/Mobile
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-light to-white overflow-hidden flex items-center pt-20">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70"></div>
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div
                        className="space-y-8"
                        style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
                    >
                        <div className="inline-block mt-5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <span className="text-primary font-bold">#1</span> Fitness Platform in India 🇮🇳
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-dark leading-tight">
                            Transform Your Body <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                                At Home
                            </span>
                        </h1>
                        <p className="text-xl text-text max-w-lg leading-relaxed">
                            We bring the gym to you. Expert trainers, personalized plans, and live sessions - all from the comfort of your home with Wellwigen Fitness.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#consultation" className="bg-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                Get Started Free
                            </a>
                            <a href="#contact" className="bg-white text-dark border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                                Live Demo
                            </a>
                        </div>

                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="text-3xl font-bold text-dark">50k+</p>
                                <p className="text-sm text-gray-500">Happy Users</p>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div>
                                <p className="text-3xl font-bold text-dark">4.9/5</p>
                                <p className="text-sm text-gray-500">App Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Image/Visuals */}
                    <div className="relative h-[600px] w-full">
                        {/* Image Slider */}
                        <div
                            className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
                            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
                        >
                            {heroImages.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Gradient for text readability if needed */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            ))}

                            {/* Floating Cards */}
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg animate-float z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">🔥</div>
                                    <div>
                                        <p className="font-bold text-dark">500 kcal</p>
                                        <p className="text-xs text-gray-500">Burned today</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg animate-float z-20" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500">💪</div>
                                    <div>
                                        <p className="font-bold text-dark">Muscle Gain</p>
                                        <p className="text-xs text-gray-500">On track</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements behind image */}
                        <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-primary/30 rounded-[3rem] transform translate-x-4 translate-y-4"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
