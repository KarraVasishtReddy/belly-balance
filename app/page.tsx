'use client'

import { useState } from 'react';
import { Camera, Plus, Leaf, Flame } from 'lucide-react';

// TypeScript interfaces
interface FoodLog {
  id: number;
  name: string;
  antioxidants: number;
  oxidativeLoad: number;
  calories: number;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Totals calculations
  const totalAntioxidants = logs.reduce((sum, log) => sum + log.antioxidants, 0);
  const totalOxidativeLoad = logs.reduce((sum, log) => sum + log.oxidativeLoad, 0);
  const netBalance = totalAntioxidants - totalOxidativeLoad;

  // Mock function to simulate n8n + AI Photo processing
  const handlePhotoUpload = () => {
    setIsUploading(true);
    // In production, this posts the image to your n8n Webhook URL.
    // n8n processes it with Vision AI, saves to Supabase, and returns the data.
    setTimeout(() => {
      const mockAiResponse: FoodLog = {
        id: Date.now(),
        name: "Processed Burger & Fries",
        antioxidants: 150,
        oxidativeLoad: 4500,
        calories: 950,
      };
      setLogs([...logs, mockAiResponse]);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Balance Tracker</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm">
            Upgrade to Premium
          </button>
        </header>

        {/* Balance Status Card */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Cellular Balance</h2>
          
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center text-green-600 font-medium"><Leaf className="w-4 h-4 mr-1"/> Antioxidants</span>
            <span className="flex items-center text-red-500 font-medium">Oxidative Load <Flame className="w-4 h-4 ml-1"/></span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-red-100 rounded-full h-6 flex overflow-hidden">
            <div 
              className="bg-green-500 h-6 transition-all duration-500" 
              style={{ width: `${Math.max(10, Math.min(90, (totalAntioxidants / (totalAntioxidants + totalOxidativeLoad || 1)) * 100))}%` }}
            ></div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Net Status</p>
            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {netBalance >= 0 ? '+' : ''}{netBalance} Units
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handlePhotoUpload}
            disabled={isUploading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-4 rounded-xl font-semibold transition-colors"
          >
            {isUploading ? 'Analyzing via AI...' : <><Camera className="mr-2" /> Scan Food Photo</>}
          </button>
        </div>

        {/* Food Log List */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Log</h3>
          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No food logged yet today. Snap a photo!</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{log.name}</h4>
                    <p className="text-sm text-gray-500">{log.calories} kcal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">+{log.antioxidants} AOX</p>
                    <p className="text-sm text-red-500 font-medium">-{log.oxidativeLoad} OXL</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
