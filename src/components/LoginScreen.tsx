import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Zap,
  Terminal,
  Satellite,
  Network,
  Activity,
  Globe,
  Database
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const CORRECT_PASSWORD = '55555';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Veuillez saisir le mot de passe');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'une vérification d'authentification
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        onLogin();
      } else {
        setError('Mot de passe incorrect. Accès refusé.');
        setPassword('');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header */}
      <header className="relative z-10 bg-slate-800/80 backdrop-blur-xl border-b border-cyan-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-cyan-400">OSINT PLATFORM</h1>
                <p className="text-xs text-slate-400">Système d'Intelligence Opérationnelle</p>
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
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-400">ACCÈS RESTREINT</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-xl rounded-full border border-cyan-900/30 mb-6">
              <div className="relative">
                <Lock className="w-16 h-16 text-cyan-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ACCÈS SÉCURISÉ
            </h2>
            <p className="text-slate-400">
              Authentification requise pour accéder aux modules OSINT
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mot de passe d'accès
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Saisissez votre mot de passe"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none pr-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Vérification...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>ACCÉDER AU SYSTÈME</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                <Shield className="w-4 h-4" />
                <span>Connexion chiffrée - Classification: CONFIDENTIEL DÉFENSE</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-lg p-4 text-center">
              <Terminal className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Système</p>
              <p className="text-sm text-green-400 font-medium">OPÉRATIONNEL</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-lg p-4 text-center">
              <Satellite className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Satellites</p>
              <p className="text-sm text-green-400 font-medium">CONNECTÉS</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-lg p-4 text-center">
              <Network className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Réseau</p>
              <p className="text-sm text-green-400 font-medium">SÉCURISÉ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-cyan-900/30">
        <p className="text-xs text-slate-500">
          OSINT Platform v2.1.0 - Accès autorisé uniquement
        </p>
      </footer>
    </div>
  );
};

export default LoginScreen;