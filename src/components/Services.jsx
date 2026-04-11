import React from 'react';
import { Dumbbell, Heart, Activity, Users } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'Personal Training',
            description: 'One-on-one sessions tailored to your fitness goals, whether weight loss, muscle gain, or endurance.',
            icon: <Dumbbell className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Yoga & Meditation',
            description: 'Find your inner peace and improve flexibility with our expert yoga instructors.',
            icon: <Heart className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Physiotherapy',
            description: 'Recover from injuries and improve mobility with certified physiotherapists.',
            icon: <Activity className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Group Classes',
            description: 'Join our energetic group classes for a fun and motivating workout experience.',
            icon: <Users className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Our Services</h2>
                    <p className="text-text max-w-2xl mx-auto">
                        We offer a wide range of fitness and wellness services designed to help you achieve your best self.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="bg-primary/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
