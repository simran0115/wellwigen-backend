import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Modal from './Modal';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ConsultationForm = () => {
    const servicesList = [
        "Fat Loss", "Muscle & Strength gaining", "Yoga", "Physiotherapy",
        "Running Coaching", "Calisthenics", "Dance Fitness", "Pregnancy Training",
        "PCOS/PCOD-weight loss", "Female Muscle Building", "Boxing Training",
        "Senior citizen Mobility", "Fitness training for Children", "Home Workouts"
    ];

    const challengesList = [
        "Lack of Motivation", "No Time", "Don't know where to start",
        "Injury/Pain", "Plateaued", "Diet Consistency"
    ];

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedChallenges, setSelectedChallenges] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        gender: '',
        notes: '',
        termsAccepted: false
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const toggleChallenge = (challenge) => {
        if (selectedChallenges.includes(challenge)) {
            setSelectedChallenges(selectedChallenges.filter(c => c !== challenge));
        } else {
            setSelectedChallenges([...selectedChallenges, challenge]);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.id || e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await addDoc(collection(db, 'consultations'), {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                gender: formData.gender,
                services: selectedServices,
                challenges: selectedChallenges,
                notes: formData.notes,
                createdAt: serverTimestamp()
            });
            setStatus({ type: 'success', message: 'Your request has been submitted successfully! We will contact you soon.' });
            setFormData({ name: '', mobile: '', email: '', gender: '', notes: '', termsAccepted: false });
            setSelectedServices([]);
            setSelectedChallenges([]);
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus({ type: 'error', message: 'Failed to submit request. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="consultation" className="py-24 bg-gradient-to-b from-light to-white relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            Start Your <span className="text-primary">Fitness Journey</span>
                        </h2>
                        <p className="text-text text-lg">
                            Want to get fit but don't know where to start? Tell us your challenge.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Mobile*</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-medium">
                                        🇮🇳 +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-r-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="10-digit mobile number"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Email (Optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Gender*</label>
                                <select
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                    required
                                >
                                    <option value="">Select your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Services Multi-select */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-dark uppercase tracking-wider">Which services are you looking for?</label>
                            <div className="flex flex-wrap gap-3">
                                {servicesList.map((service, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedServices.includes(service)
                                            ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                                            : 'bg-white text-text border-gray-200 hover:border-primary hover:text-primary'
                                            }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">Select all that apply</p>
                        </div>

                        {/* Challenges Multi-select */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-dark uppercase tracking-wider">What's your biggest fitness challenge right now?</label>
                            <div className="flex flex-wrap gap-3">
                                {challengesList.map((challenge, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => toggleChallenge(challenge)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedChallenges.includes(challenge)
                                            ? 'bg-dark text-white border-dark shadow-md transform scale-105'
                                            : 'bg-white text-text border-gray-200 hover:border-dark hover:text-dark'
                                            }`}
                                    >
                                        {challenge}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-dark uppercase tracking-wider">Additional Notes (Optional)</label>
                            <textarea
                                id="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-32 resize-none"
                                placeholder="Tell us anything else you'd like us to know... Share any specific goals or concerns"
                                maxLength={500}
                            ></textarea>
                            <div className="text-right text-xs text-gray-400">{formData.notes.length}/500</div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="termsAccepted"
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    required
                                />
                            </div>
                            <label htmlFor="termsAccepted" className="text-sm text-gray-500">
                                I agree to be contacted by Wellwigen Fitness and understand my details may be used to respond to this enquiry. <a href="/terms-and-conditions" className="text-primary hover:underline">Terms & Conditions</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-dark text-white font-bold py-5 rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-[1.01] shadow-xl text-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Start Your Fitness Journey'}
                            {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                        </button>
                    </form>
                </div>
            </div>
            <Modal 
                isOpen={!!status.message}
                type={status.type}
                message={status.message}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </section>
    );
};

export default ConsultationForm;
