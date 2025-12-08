import React from 'react';
import { X, Check, XCircle } from 'lucide-react';

const Modal = ({ isOpen, onClose, type, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-in zoom-in-95 duration-200 scale-100"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="text-center pb-6">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                    }`}>
                        {type === 'success' ? <Check size={32} strokeWidth={3} /> : <XCircle size={32} strokeWidth={3} />}
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 ${
                        type === 'success' ? 'text-gray-900' : 'text-red-600'
                    }`}>
                        {type === 'success' ? 'Success!' : 'Error'}
                    </h3>
                    
                    <p className="text-gray-600">
                        {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 ${
                        type === 'success' ? 'bg-primary' : 'bg-red-500'
                    }`}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
