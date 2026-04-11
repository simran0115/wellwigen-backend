import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <Helmet>
                <title>404 Not Found | Wellwigen</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>

            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-100 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h1>
                
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Home size={20} />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
