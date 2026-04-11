import React from 'react';

const GoalsExpertise = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                                alt="Expert Trainer" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                            
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg max-w-xs">
                                <p className="text-dark font-bold text-lg mb-1">"Consistency is key"</p>
                                <p className="text-primary font-medium">- Head Trainer</p>
                            </div>
                        </div>
                        {/* Decorative dots */}
                        <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 opacity-20" style={{ backgroundImage: 'radial-gradient(#22C5CD 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                    </div>

                    <div>
                        <h2 className="text-5xl md:text-6xl font-black text-dark mb-8 leading-tight">
                            Your Goals, <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Our Expertise.</span>
                        </h2>
                        <p className="text-xl text-text leading-relaxed mb-8">
                            We understand that everyone's fitness journey is unique. That's why we bring you a diverse range of experts to help you achieve your specific goals.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { title: 'Weight Loss', desc: 'Scientific approach to sustainable fat loss.' },
                                { title: 'Muscle Building', desc: 'Hypertrophy focused training programs.' },
                                { title: 'Holistic Wellness', desc: 'Mind-body connection through yoga & meditation.' }
                            ].map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-light transition-colors border border-transparent hover:border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark mb-1">{item.title}</h4>
                                        <p className="text-text/80">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoalsExpertise;
