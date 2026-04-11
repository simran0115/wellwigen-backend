import React from 'react';

const Statistics = () => {
    const stats = [
        { value: '33%', label: 'of adults are overweight' },
        { value: '50%', label: 'of adults do not get enough exercise' },
        { value: '1 in 3', label: 'adults have high blood pressure' },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                    alt="Fitness Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 group">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <p className="text-xl text-gray-300 font-light tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
