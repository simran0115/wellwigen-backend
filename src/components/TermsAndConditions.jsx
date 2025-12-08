import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-dark mb-8">Terms and Conditions</h1>
                
                <div className="prose prose-lg text-gray-600 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Wellwigen Fitness ("we," "our," or "us"). By accessing or using our website, mobile application, 
                            and services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). 
                            If you do not agree to these Terms, please do not use our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">2. Use of Services</h2>
                        <p>
                            You must be at least 18 years old to use our Services. You agree to use the Services only for lawful purposes 
                            and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account 
                            credentials and for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">3. Health Disclaimer</h2>
                        <p>
                            The content provided on Wellwigen Fitness, including workout plans, nutritional advice, and other information, 
                            is for educational and informational purposes only. It is not intended as a substitute for professional 
                            medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health 
                            provider with any questions you may have regarding a medical condition before starting any new fitness program.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">4. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of 
                            Wellwigen Fitness and its licensors. Our trademarks and trade dress may not be used in connection with any 
                            product or service without the prior written consent of Wellwigen Fitness.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">5. User Content</h2>
                        <p>
                            Our Service allows you to post, link, store, share and otherwise make available certain information, text, 
                            graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the 
                            Service, including its legality, reliability, and appropriateness.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">6. Limitation of Liability</h2>
                        <p>
                            In no event shall Wellwigen Fitness, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                            be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
                            loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of 
                            or inability to access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">7. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to 
                            access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at wellwigen@gmail.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
