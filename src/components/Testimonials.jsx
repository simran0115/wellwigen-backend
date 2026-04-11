import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Yoga Enthusiast',
            content: "Wellwigen Fitness changed my life! The instructors are amazing and the convenience of booking sessions at home is unbeatable.",
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'Weight Training',
            content: "I've seen incredible results in just 3 months. My trainer is knowledgeable and keeps me motivated every step of the way.",
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        {
            name: 'Emily Davis',
            role: 'Post-Injury Recovery',
            content: "The physiotherapy sessions have been a game-changer for my recovery. Highly recommend Wellwigen Fitness to anyone!",
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }
    ];

    return (
        <section className="py-24 bg-light relative">
             <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(#0B2F42 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark mb-4">What our clients say</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative group">
                            <Quote className="absolute top-8 right-8 text-primary/10 w-12 h-12 transform group-hover:scale-110 transition-transform" />
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-1 bg-gradient-to-br from-primary to-blue-400 rounded-full">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                            
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            
                            <p className="text-text leading-relaxed">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
