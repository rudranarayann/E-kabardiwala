import React from 'react';

export default function PaymentUser(){

    const transactions = [
        { id: 1, vendor: 'EcoScrap Ltd', amount: 150.0, status: 'success', date: '2025-04-30' },
        { id: 2, vendor: 'GreenCycle', amount: 90.5, status: 'success', date: '2025-04-29' },
        { id: 3, vendor: 'TrashToCash', amount: 0, status: 'pending', date: '2025-04-28' },
        { id: 4, vendor: 'EcoScrap Ltd', amount: 200.0, status: 'success', date: '2025-04-26' },
      ];
    const successfulTransactions = transactions.filter(txn => txn.status === 'success');

    const totalReceived = successfulTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-2xl min-h-screen ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Scrap Pickup Earnings</h2>

      <div className="mb-6 bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-lg">
        <p className="text-xl font-semibold">Total Money Received:</p>
        <p className="text-3xl font-bold">₹{totalReceived.toFixed(2)}</p>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-3">Recent Successful Pickups</h3>

      <div className="space-y-3">
        {successfulTransactions.slice(0, 5).map((txn, index) => (
          <div
            key={txn.id || index}
            className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-700">Vendor: {txn.vendor}</p>
              <p className="text-sm text-gray-500">Date: {new Date(txn.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-semibold text-green-600">+ ₹{txn.amount.toFixed(2)}</p>
          </div>
        ))}

        {successfulTransactions.length === 0 && (
          <p className="text-gray-500 text-center">No successful pickups yet.</p>
        )}
      </div>
    </div>
  );
};

