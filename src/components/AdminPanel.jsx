import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { 
    LayoutDashboard, 
    Users, 
    MessageSquare, 
    LogOut, 
    Search, 
    Filter, 
    ChevronLeft, 
    ChevronRight,
    Calendar
} from 'lucide-react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Data Information
    const [trainers, setTrainers] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const session = localStorage.getItem('adminSession');
        if (session) {
            const { expiresAt } = JSON.parse(session);
            if (new Date().getTime() < expiresAt) {
                setIsAuthenticated(true);
                fetchAllData();
            } else {
                localStorage.removeItem('adminSession');
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoginLoading(true);

        try {
            // Check for hardcoded fallback first (for initial setup if DB empty)
            if (credentials.username === 'admin' && credentials.password === 'admin123') {
                authenticateUser();
                return;
            }

            // Query Firestore for admin user
            const adminsRef = collection(db, 'admins');
            const q = await getDocs(adminsRef);
            let found = false;
            
            q.forEach((doc) => {
                const data = doc.data();
                if (data.username === credentials.username && data.password === credentials.password) {
                    found = true;
                }
            });

            if (found) {
                authenticateUser();
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('An error occurred during login');
        } finally {
            setLoginLoading(false);
        }
    };

    const authenticateUser = () => {
        const expiresAt = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 1 week
        localStorage.setItem('adminSession', JSON.stringify({ expiresAt }));
        setIsAuthenticated(true);
        fetchAllData();
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
    };

    // ... (fetchAllData and other existing functions remain same, just call them inside checkAuth/authenticateUser)

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchTrainers(), fetchConsultations(), fetchMessages()]);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };
    const [messages, setMessages] = useState([]);

    const fetchTrainers = async () => {
        const snapshot = await getDocs(collection(db, 'trainers'));
        setTrainers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchConsultations = async () => {
        const snapshot = await getDocs(collection(db, 'consultations'));
        setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchMessages = async () => {
        const snapshot = await getDocs(collection(db, 'messages'));
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const getFilteredData = (data) => {
        if (!filterDate) return data;
        const selectedDate = new Date(filterDate);
        return data.filter(item => {
            if (!item.createdAt) return false;
            const itemDate = new Date(item.createdAt.seconds * 1000);
            return itemDate.getMonth() === selectedDate.getMonth() && 
                   itemDate.getFullYear() === selectedDate.getFullYear();
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex bg-white">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-dark">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-dark/90 z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                        alt="Fitness Admin" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 flex flex-col justify-center px-12 text-white h-full">
                        <h1 className="text-5xl font-bold mb-6">Wellwigen Fitness</h1>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            Manage your trainers, track consultations, and oversee your fitness empire from one central dashboard.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <Users size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="mt-2 text-sm text-gray-600">Please sign in to your admin account</p>
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        placeholder="Enter username"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        placeholder="Enter password"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-dark hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loginLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const filteredTrainers = getFilteredData(trainers);
    const filteredConsultations = getFilteredData(consultations);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-dark text-white transition-all duration-300 flex flex-col relative z-20 shadow-xl`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Wellwigen</h1>
                    ) : (
                        <span className="text-xl font-bold text-primary">W</span>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<Users size={20} />} label="Trainers" active={activeTab === 'trainers'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('trainers')} />
                    <SidebarItem icon={<MessageSquare size={20} />} label="Consultations" active={activeTab === 'consultations'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('consultations')} />
                    <SidebarItem icon={<Search size={20} />} label="Messages" active={activeTab === 'messages'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('messages')} />
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={handleLogout}
                        className={`flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-3 rounded-lg hover:bg-white/5 ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 relative">
                <header className="bg-white shadow-sm sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                        {activeTab === 'dashboard' ? 'Overview' : activeTab}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                            <Filter size={16} className="text-gray-500" />
                            <input 
                                type="month" 
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="bg-transparent text-sm outline-none text-gray-700"
                            />
                            {filterDate && (
                                <button onClick={() => setFilterDate('')} className="text-xs text-red-500 hover:text-red-700">Clear</button>
                            )}
                        </div>
                        <button onClick={fetchAllData} className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                            Refresh Data
                        </button>
                    </div>
                </header>

                <div className="p-8">
                    {activeTab === 'dashboard' && (
                        <DashboardView 
                            trainers={trainers} 
                            consultations={consultations} 
                            filteredTrainers={filteredTrainers}
                            filteredConsultations={filteredConsultations}
                            filterDate={filterDate}
                        />
                    )}
                    {activeTab === 'trainers' && (
                        <TableView 
                            title="Recent Trainer Applications" 
                            data={filteredTrainers} 
                            columns={[
                                { header: 'Name', key: 'name', primary: true },
                                { header: 'Specialty', key: 'specialty' },
                                { header: 'Experience', key: 'experience', suffix: ' yrs' },
                                { header: 'Contact', key: 'phone' },
                                { header: 'Date', key: 'createdAt', isDate: true }
                            ]} 
                        />
                    )}
                    {activeTab === 'consultations' && (
                        <TableView 
                            title="Fitness Journey Requests" 
                            data={filteredConsultations} 
                            columns={[
                                { header: 'Name', key: 'name', primary: true },
                                { header: 'Goal', key: 'services', isArray: true },
                                { header: 'Challenge', key: 'challenges', isArray: true },
                                { header: 'Mobile', key: 'mobile' },
                                { header: 'Date', key: 'createdAt', isDate: true }
                            ]} 
                        />
                    )}
                    {activeTab === 'messages' && (
                        <TableView 
                            title="Contact Messages" 
                            data={messages} 
                            columns={[
                                { header: 'Name', key: 'name', primary: true },
                                { header: 'Subject', key: 'subject' },
                                { header: 'Email', key: 'email' },
                                { header: 'Message', key: 'message' },
                                { header: 'Date', key: 'createdAt', isDate: true }
                            ]} 
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, collapsed, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
            active 
            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
        } ${collapsed && 'justify-center'}`}
    >
        {icon}
        {!collapsed && <span className="font-medium">{label}</span>}
    </button>
);

const DashboardView = ({ trainers, consultations, filteredTrainers, filteredConsultations, filterDate }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                icon={<Users size={24} className="text-blue-500" />} 
                label="Total Trainers" 
                value={trainers.length} 
                subValue={filterDate ? `${filteredTrainers.length} this month` : null}
                color="bg-blue-50" 
            />
            <StatCard 
                icon={<MessageSquare size={24} className="text-purple-500" />} 
                label="Consultations" 
                value={consultations.length} 
                subValue={filterDate ? `${filteredConsultations.length} this month` : null}
                color="bg-purple-50" 
            />
             <StatCard 
                icon={<Calendar size={24} className="text-green-500" />} 
                label="Period" 
                value={filterDate ? new Date(filterDate).toLocaleDateString('default', { month: 'long', year: 'numeric' }) : 'All Time'} 
                color="bg-green-50" 
            />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Latest Trainers</h3>
                <div className="space-y-4">
                    {filteredTrainers.slice(0, 5).map(t => (
                        <div key={t.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {t.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{t.name}</p>
                                <p className="text-xs text-gray-500">{t.specialty}</p>
                            </div>
                            <div className="ml-auto text-xs text-gray-400">
                                {t.createdAt?.seconds ? new Date(t.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    ))}
                    {filteredTrainers.length === 0 && <p className="text-center text-gray-400 py-4">No data available</p>}
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Recent Inquiries</h3>
                <div className="space-y-4">
                    {filteredConsultations.slice(0, 5).map(c => (
                        <div key={c.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                {c.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{c.name}</p>
                                <p className="text-xs text-gray-500">{c.services?.[0] || 'General Inquiry'}</p>
                            </div>
                             <div className="ml-auto text-xs text-gray-400">
                                {c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    ))}
                    {filteredConsultations.length === 0 && <p className="text-center text-gray-400 py-4">No data available</p>}
                </div>
            </div>
        </div>
    </div>
);

const StatCard = ({ icon, label, value, subValue, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
                {subValue && <p className="text-xs text-green-600 mt-2 font-medium">{subValue}</p>}
            </div>
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        </div>
    </div>
);

const TableView = ({ title, data, columns }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col, idx) => (
                                <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {col.isDate ? (
                                        row[col.key]?.seconds ? new Date(row[col.key].seconds * 1000).toLocaleDateString() : 'N/A'
                                    ) : col.isArray ? (
                                        <div className="flex flex-wrap gap-1">
                                            {row[col.key]?.slice(0, 2).map((item, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200">
                                                    {item}
                                                </span>
                                            ))}
                                            {row[col.key]?.length > 2 && <span className="text-xs text-gray-400">+{row[col.key].length - 2}</span>}
                                        </div>
                                    ) : (
                                        <span className={col.primary ? 'font-medium text-gray-900' : ''}>
                                            {row[col.key]}{col.suffix || ''}
                                        </span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400">
                                No records found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default AdminPanel;
