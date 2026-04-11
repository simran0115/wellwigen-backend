import React from 'react';
import { Dumbbell, Heart, Activity, Utensils } from 'lucide-react';

const WhatLookingFor = () => {
    const items = [
        { title: 'Personal Training', icon: <Dumbbell className="w-8 h-8" /> },
        { title: 'Yoga', icon: <Heart className="w-8 h-8" /> },
        { title: 'Physiotherapy', icon: <Activity className="w-8 h-8" /> },
        { title: 'Dietician', icon: <Utensils className="w-8 h-8" /> },
    ];

    return (
        <section className="py-12 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-dark">What are you looking for?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <span className="font-semibold text-dark">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatLookingFor;
