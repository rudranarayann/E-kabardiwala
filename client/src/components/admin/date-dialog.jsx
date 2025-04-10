import React, { useState } from 'react';

const DateDialog = ({ onClose , handleSubmit, setDate,date}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DateDialog;
