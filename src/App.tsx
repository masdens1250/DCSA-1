import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import SearchModule from './components/SearchModule';
import WebSurveillanceModule from './components/WebSurveillanceModule';
import NetworkAnalysisModule from './components/NetworkAnalysisModule';
import DatabaseModule from './components/DatabaseModule';
import GeolocationModule from './components/GeolocationModule';
import DocumentAnalysisModule from './components/DocumentAnalysisModule';
import { 
  Shield, 
  Search, 
  Globe, 
  Database, 
  Eye, 
  Zap, 
  Lock, 
  Activity,
  ArrowRight,
  Satellite,
  Network,
  FileSearch,
  Users,
  MapPin,
  Terminal,
  Cpu,
  Wifi,
  LogOut,
  User
} from 'lucide-react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setIsAuthenticated(false);
    setActiveModule(null);
  };
  // Si l'utilisateur n'est pas authentifié, afficher l'écran de connexion
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // Si un module est actif, l'afficher
  if (activeModule === 'search') {
    return <SearchModule onBack={() => setActiveModule(null)} />;
  }
  
  if (activeModule === 'surveillance') {
    return <WebSurveillanceModule onBack={() => setActiveModule(null)} />;
  }
  
  if (activeModule === 'network') {
    return <NetworkAnalysisModule onBack={() => setActiveModule(null)} />;
  }
  
  if (activeModule === 'database') {
    return <DatabaseModule onBack={() => setActiveModule(null)} />;
  }
  
  if (activeModule === 'geolocation') {
    return <GeolocationModule onBack={() => setActiveModule(null)} />;
  }
  
  if (activeModule === 'documents') {
    return <DocumentAnalysisModule onBack={() => setActiveModule(null)} />;
  }

  const services = [
    {
      icon: Search,
      title: "Recherche Avancée",
      description: "Analyse multi-sources et corrélation de données",
      status: "ACTIF"
    },
    {
      icon: Globe,
      title: "Surveillance Web",
      description: "Monitoring en temps réel des plateformes sociales",
      status: "ACTIF"
    },
    {
      icon: Database,
      title: "Base de Données",
      description: "Accès aux archives et bases de données publiques",
      status: "ACTIF"
    },
    {
      icon: Network,
      title: "Analyse Réseau",
      description: "Cartographie des connexions et infrastructures",
      status: "ACTIF"
    },
    {
      icon: FileSearch,
      title: "Analyse Documentaire",
      description: "Extraction et analyse de métadonnées",
      status: "ACTIF"
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Analyse géospatiale et tracking de localisation",
      status: "ACTIF"
    }
  ];

  const stats = [
    { label: "Sources Actives", value: "2,847", icon: Activity },
    { label: "Requêtes/Jour", value: "156,234", icon: Zap },
    { label: "Bases Connectées", value: "94", icon: Database },
    { label: "Taux de Succès", value: "98.2%", icon: Eye }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Satellite className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-cyan-400 text-lg font-mono">Initialisation du système OSINT...</p>
          <p className="text-slate-400 text-sm mt-2">Chargement des modules de surveillance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-cyan-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-cyan-400">OSINT PLATFORM</h1>
                <p className="text-xs text-slate-400">Intelligence opérationnelle</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-slate-300 font-mono">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-xs text-slate-500">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">SYSTÈME OPÉRATIONNEL</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-lg">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">Opérateur</span>
                </div>
                
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-colors group"
                >
                  <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                  <span className="text-sm text-red-400 group-hover:text-red-300">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-red-500/30 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-900/30 rounded-lg">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Confirmer la déconnexion</h3>
                <p className="text-sm text-slate-400">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              </div>
            </div>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-300">
                ⚠️ Toutes les sessions actives seront fermées et vous devrez vous reconnecter.
              </p>
            </div>
            
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyan-900/20 rounded-full mb-6">
            <Eye className="w-12 h-12 text-cyan-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Centre de Commandement OSINT
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Plateforme unifiée de renseignement DCSA à partir de sources ouvertes. 
            Identifiez, Analysez, surveillez et décryptez l'information en temps réel.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-6 h-6 text-cyan-400" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Modules Opérationnels
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                onClick={() => {
                  if (service.title === "Recherche Avancée") {
                    setActiveModule('search');
                  } else if (service.title === "Surveillance Web") {
                    setActiveModule('surveillance');
                  } else if (service.title === "Analyse Réseau") {
                    setActiveModule('network');
                  } else if (service.title === "Base de Données") {
                    setActiveModule('database');
                  } else if (service.title === "Géolocalisation") {
                    setActiveModule('geolocation');
                  } else if (service.title === "Analyse Documentaire") {
                    setActiveModule('documents');
                  }
                }}
                className="group bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6 hover:bg-slate-800/70 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-900/30 rounded-lg group-hover:bg-cyan-900/50 transition-colors">
                    <service.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded-full border border-green-500/30">
                    {service.status}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                  <span>
                    {service.title === "Recherche Avancée" ? "Lancer la recherche" : 
                     service.title === "Surveillance Web" ? "Configurer la surveillance" : 
                     service.title === "Analyse Réseau" ? "Analyser le réseau" :
                     service.title === "Base de Données" ? "Accéder aux bases" :
                     service.title === "Géolocalisation" ? "Localiser et traquer" :
                     service.title === "Analyse Documentaire" ? "Analyser les documents" :
                     "Accéder au module"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Actions Rapides
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group bg-slate-700/50 hover:bg-slate-700 border border-cyan-900/30 hover:border-cyan-500/50 rounded-lg p-6 transition-all duration-300">
              <Terminal className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium">Console d'Analyse</p>
              <p className="text-slate-400 text-sm mt-1">Lancer une recherche avancée</p>
            </button>
            
            <button className="group bg-slate-700/50 hover:bg-slate-700 border border-cyan-900/30 hover:border-cyan-500/50 rounded-lg p-6 transition-all duration-300">
              <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium">Surveillance Active</p>
              <p className="text-slate-400 text-sm mt-1">Monitorer les sources</p>
            </button>
            
            <button className="group bg-slate-700/50 hover:bg-slate-700 border border-cyan-900/30 hover:border-cyan-500/50 rounded-lg p-6 transition-all duration-300">
              <Wifi className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-medium">Réseau Neural</p>
              <p className="text-slate-400 text-sm mt-1">Analyse comportementale</p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-cyan-900/30">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">
              Connexion sécurisée - Chiffrement de bout en bout
            </span>
          </div>
          <p className="text-xs text-slate-500">
            OSINT Platform v2.1.0 - Classification: CONFIDENTIEL DÉFENSE
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;