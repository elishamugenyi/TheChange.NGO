// components/DonationPage.tsx
"use client";

import React, { useState } from 'react';

const DonationPage = () => {
    const predefinedAmounts = [10, 25, 50, 100];

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isDonating, setIsDonating] = useState(false);

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setCustomAmount(value);
            setSelectedAmount(null);
        }
    };

    const handleSubmit = async () => {
        let finalAmount: number | null = selectedAmount;

        if (customAmount) {
            const parsedCustomAmount = parseFloat(customAmount);
            if (!isNaN(parsedCustomAmount) && parsedCustomAmount > 0) {
                finalAmount = parsedCustomAmount;
            } else {
                alert('Please enter a valid custom amount (e.g., 75.50).');
                return;
            }
        }

        if (!finalAmount || finalAmount <= 0) {
            alert('Please select or enter a donation amount.');
            return;
        }

        setIsDonating(true);
        console.log(`Attempting to donate: $${finalAmount.toFixed(2)}`);

        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDonating(false);

        alert(`Thank you for your generous donation of $${finalAmount.toFixed(2)}! (This is a simulation)`);

        setSelectedAmount(null);
        setCustomAmount('');
    };

    const currentAmountToDisplay = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 leading-tight">
                    Support Our Mission
                </h1>
                <p className="text-lg text-gray-700 text-center mb-8">
                    Your generous contribution empowers us to continue our vital work. Every dollar makes a profound difference!
                </p>

                <div className="mb-7">
                    <label className="block text-gray-700 text-base font-semibold mb-3">
                        Choose an amount:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {predefinedAmounts.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => handleAmountSelect(amount)}
                                className={`py-3 px-4 rounded-lg font-bold text-lg
                  ${selectedAmount === amount
                                        ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500'
                                        : 'bg-gray-100 text-gray-800 hover:bg-indigo-50 hover:text-indigo-700'
                                    } transition duration-200 ease-in-out transform hover:scale-105`}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-7">
                    <label htmlFor="custom-amount" className="block text-gray-700 text-base font-semibold mb-3">
                        Or enter a custom amount:
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">$</span>
                        <input
                            type="text"
                            id="custom-amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder="e.g., 75.50"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-indigo-500 focus:border-transparent text-xl font-semibold text-gray-800 transition duration-200"
                        />
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleSubmit}
                        disabled={isDonating || !(currentAmountToDisplay > 0)}
                        className={`w-full py-4 px-6 rounded-lg text-2xl font-extrabold text-white
              ${isDonating || !(currentAmountToDisplay > 0)
                                ? 'bg-indigo-400 cursor-not-allowed opacity-80'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-xl'
                            } transition duration-300 ease-in-out flex items-center justify-center space-x-3`}
                    >
                        {isDonating ? (
                            <>
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <span>
                                Donate Now
                                {currentAmountToDisplay > 0 && ` ($${currentAmountToDisplay.toFixed(2)})`}
                            </span>
                        )}
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                    All donations are tax-deductible to the extent allowed by law.
                    <br />
                    <span className="font-semibold text-red-500">Note: This is a demo. Actual payment integration would go here.</span>
                </p>
            </div>
        </div>
    );
};

export default DonationPage;