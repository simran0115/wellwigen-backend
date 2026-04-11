import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
                                alt="About Wellwigen Fitness"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
                            Why Choose <span className="text-primary">Wellwigen Fitness</span>?
                        </h2>
                        <p className="text-text mb-8 text-lg leading-relaxed">
                            We believe fitness should be accessible, personalized, and enjoyable. Our platform connects you with top-tier professionals who are dedicated to your success.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Certified and Verified Trainers',
                                'Flexible Scheduling at Your Convenience',
                                'Customized Workout & Diet Plans',
                                'Progress Tracking & Analytics',
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                    <span className="text-dark font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <a
                                href="#book"
                                className="text-primary font-bold hover:text-dark transition-colors inline-flex items-center"
                            >
                                Learn more about our mission &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
