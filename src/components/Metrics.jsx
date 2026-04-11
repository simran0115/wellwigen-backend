import React from 'react';

const Metrics = () => {
    const metrics = [
        { value: '5000+', label: 'Trusted Clients' },
        { value: '500+', label: 'Verified Experts' },
        { value: '100k+', label: 'Sessions Delivered' },
    ];

    return (
        <section className="py-24 relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517963879466-cd116699aaaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80")' }}>
            <div className="absolute inset-0 bg-dark/80 backdrop-blur-[2px]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="text-6xl font-black text-primary mb-4">{metric.value}</div>
                            <p className="text-2xl text-white font-medium tracking-wide">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Metrics;
