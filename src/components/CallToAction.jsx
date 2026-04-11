import React from 'react';

const CallToAction = () => {
    return (
        <section className="py-32 relative overflow-hidden">
             <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1552674605-46d536d2f6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                    alt="Gym Motivation" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                    Want to get fit <br/>
                    <span className="text-primary">at home?</span>
                </h2>
                <p className="text-2xl text-gray-200 mb-12 font-light">
                    Join thousands of happy users who have transformed their lives with Wellwigen Fitness. Start your journey today.
                </p>
                <button className="bg-primary text-dark font-bold py-5 px-12 rounded-full text-xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(34,197,205,0.5)]">
                    Book a Free Demo
                </button>
            </div>
        </section>
    );
};

export default CallToAction;
