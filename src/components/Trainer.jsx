import React from 'react';

const Trainer = () => {
    return (
        <section id="trainer" className="py-24 relative overflow-hidden">
             <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                    alt="Trainer Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 md:p-20 border border-white/10 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                        Are you a <span className="text-primary">Fitness Professional?</span>
                    </h2>
                    <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Join our growing network of certified trainers, yoga instructors, and physiotherapists. Grow your business and reach more clients with Wellwigen Fitness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-primary text-dark font-bold py-4 px-10 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg text-lg">
                            Join as a Trainer
                        </button>
                        <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-dark transition-all text-lg">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trainer;
