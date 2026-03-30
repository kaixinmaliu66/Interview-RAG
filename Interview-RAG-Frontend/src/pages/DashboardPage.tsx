import { BookOpen, Clock, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-8">
        Dashboard
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Notes Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center">
            <div className="rounded-md bg-blue-50 p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="ml-4 text-lg font-semibold text-slate-900">Total Notes</h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-700">12</p>
        </div>

        {/* Study Hours Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center">
            <div className="rounded-md bg-green-50 p-3">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="ml-4 text-lg font-semibold text-slate-900">Study Hours</h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-700">24h</p>
        </div>

        {/* Quick Review Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center">
            <div className="rounded-md bg-amber-50 p-3">
              <Zap className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="ml-4 text-lg font-semibold text-slate-900">Need Review</h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-700">5</p>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <p className="text-slate-500">Welcome back to your interview preparation dashboard. Start reviewing your notes or create new ones to build your knowledge base!</p>
      </div>
    </div>
  );
}