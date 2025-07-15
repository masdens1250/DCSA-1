import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Network,
  Globe,
  Server,
  Wifi,
  Shield,
  Activity,
  Zap,
  MapPin,
  Eye,
  Search,
  Filter,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Target,
  Database,
  Router,
  Smartphone,
  Monitor,
  HardDrive,
  Signal,
  Lock,
  Unlock,
  Users,
  FileText
} from 'lucide-react';

interface NetworkAnalysisModuleProps {
  onBack: () => void;
}

interface NetworkNode {
  id: string;
  ip: string;
  hostname?: string;
  type: 'server' | 'router' | 'device' | 'unknown';
  status: 'online' | 'offline' | 'unknown';
  location?: string;
  ports: number[];
  services: string[];
  os?: string;
  lastSeen: string;
  risk: 'low' | 'medium' | 'high';
}

interface NetworkConnection {
  id: string;
  source: string;
  target: string;
  protocol: string;
  port: number;
  status: 'active' | 'closed' | 'filtered';
  traffic: number;
}

const NetworkAnalysisModule: React.FC<NetworkAnalysisModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'discovery' | 'topology' | 'monitoring' | 'security'>('discovery');
  const [isScanning, setIsScanning] = useState(false);
  const [targetNetwork, setTargetNetwork] = useState('192.168.1.0/24');
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  // Données d'exemple
  useEffect(() => {
    const sampleNodes: NetworkNode[] = [
      {
        id: '1',
        ip: '192.168.1.1',
        hostname: 'router.local',
        type: 'router',
        status: 'online',
        location: 'Gateway',
        ports: [22, 80, 443, 8080],
        services: ['SSH', 'HTTP', 'HTTPS', 'Web Admin'],
        os: 'Linux (OpenWrt)',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        risk: 'medium'
      },
      {
        id: '2',
        ip: '192.168.1.10',
        hostname: 'server-01.local',
        type: 'server',
        status: 'online',
        location: 'DMZ',
        ports: [22, 80, 443, 3306, 5432],
        services: ['SSH', 'Apache', 'MySQL', 'PostgreSQL'],
        os: 'Ubuntu 20.04',
        lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        risk: 'high'
      },
      {
        id: '3',
        ip: '192.168.1.25',
        hostname: 'workstation-01',
        type: 'device',
        status: 'online',
        location: 'Office',
        ports: [135, 139, 445, 3389],
        services: ['RPC', 'NetBIOS', 'SMB', 'RDP'],
        os: 'Windows 10',
        lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        risk: 'low'
      },
      {
        id: '4',
        ip: '192.168.1.50',
        type: 'device',
        status: 'offline',
        location: 'Unknown',
        ports: [],
        services: [],
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        risk: 'low'
      }
    ];

    const sampleConnections: NetworkConnection[] = [
      {
        id: '1',
        source: '192.168.1.1',
        target: '192.168.1.10',
        protocol: 'TCP',
        port: 80,
        status: 'active',
        traffic: 1024
      },
      {
        id: '2',
        source: '192.168.1.25',
        target: '192.168.1.10',
        protocol: 'TCP',
        port: 3306,
        status: 'active',
        traffic: 512
      }
    ];

    setNodes(sampleNodes);
    setConnections(sampleConnections);
  }, []);

  const handleNetworkScan = async () => {
    setIsScanning(true);
    
    // Simulation d'un scan réseau
    setTimeout(() => {
      setIsScanning(false);
      // Ici on pourrait ajouter de nouveaux nœuds découverts
    }, 3000);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'router': return Router;
      case 'server': return Server;
      case 'device': return Monitor;
      default: return HardDrive;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-900/30';
      case 'offline': return 'text-red-400 bg-red-900/30';
      default: return 'text-yellow-400 bg-yellow-900/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const renderDiscovery = () => (
    <div className="space-y-6">
      {/* Scan Controls */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Découverte Réseau</h3>
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Réseau cible
            </label>
            <input
              type="text"
              value={targetNetwork}
              onChange={(e) => setTargetNetwork(e.target.value)}
              placeholder="192.168.1.0/24"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleNetworkScan}
              disabled={isScanning}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Scan en cours...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Lancer le scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Network Nodes */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Nœuds Découverts ({nodes.length})</h3>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtrer</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {nodes.map((node) => {
            const IconComponent = getNodeIcon(node.type);
            return (
              <div 
                key={node.id} 
                onClick={() => setSelectedNode(node)}
                className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-900/30 rounded-lg">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{node.hostname || node.ip}</h4>
                      <p className="text-sm text-slate-400">{node.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                    <span className={`text-xs ${getRiskColor(node.risk)}`}>
                      {node.risk}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Type</p>
                    <p className="text-white">{node.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">OS</p>
                    <p className="text-white">{node.os || 'Inconnu'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Ports ouverts</p>
                    <p className="text-white">{node.ports.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Services</p>
                    <p className="text-white">{node.services.length}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-600">
                  <p className="text-xs text-slate-400">
                    Dernière activité: {new Date(node.lastSeen).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-cyan-500/30 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  {React.createElement(getNodeIcon(selectedNode.type), { className: "w-6 h-6 text-cyan-400" })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedNode.hostname || selectedNode.ip}
                  </h3>
                  <p className="text-sm text-slate-400">{selectedNode.ip}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Statut</p>
                  <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedNode.status)}`}>
                    {selectedNode.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Niveau de risque</p>
                  <p className={`text-sm font-medium ${getRiskColor(selectedNode.risk)}`}>
                    {selectedNode.risk.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Type</p>
                  <p className="text-sm text-white">{selectedNode.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Système d'exploitation</p>
                  <p className="text-sm text-white">{selectedNode.os || 'Inconnu'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Ports ouverts</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.ports.map((port) => (
                    <span key={port} className="px-2 py-1 bg-slate-700 text-cyan-400 rounded text-xs">
                      {port}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Services détectés</h4>
                <div className="space-y-2">
                  {selectedNode.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-white">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTopology = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Topologie Réseau</h3>
        
        <div className="bg-slate-900/50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Network className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <p className="text-xl text-white mb-2">Visualisation de la topologie</p>
            <p className="text-slate-400">Cartographie interactive des connexions réseau</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Connexions Actives</h4>
          <div className="space-y-3">
            {connections.map((conn) => (
              <div key={conn.id} className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {conn.source} → {conn.target}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conn.status)}`}>
                    {conn.status}
                  </span>
                </div>
                <div className="text-sm text-slate-400">
                  <span>{conn.protocol}:{conn.port}</span>
                  <span className="ml-4">Trafic: {conn.traffic} KB/s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Statistiques Réseau</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Nœuds actifs</span>
              <span className="text-white font-medium">
                {nodes.filter(n => n.status === 'online').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Connexions actives</span>
              <span className="text-white font-medium">
                {connections.filter(c => c.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ports ouverts</span>
              <span className="text-white font-medium">
                {nodes.reduce((total, node) => total + node.ports.length, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Services détectés</span>
              <span className="text-white font-medium">
                {nodes.reduce((total, node) => total + node.services.length, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">98.5%</p>
          <p className="text-sm text-slate-400">Disponibilité</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">15ms</p>
          <p className="text-sm text-slate-400">Latence moyenne</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Signal className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2.4 GB/s</p>
          <p className="text-sm text-slate-400">Bande passante</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">3</p>
          <p className="text-sm text-slate-400">Alertes actives</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Surveillance en Temps Réel</h3>
        
        <div className="bg-slate-900/50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl text-white mb-2">Monitoring actif</p>
            <p className="text-slate-400">Surveillance des performances réseau en temps réel</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-red-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-6 h-6 text-red-400" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2</p>
          <p className="text-sm text-slate-400">Vulnérabilités critiques</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-yellow-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">5</p>
          <p className="text-sm text-slate-400">Ports non sécurisés</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-green-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">12</p>
          <p className="text-sm text-slate-400">Services sécurisés</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Analyse de Sécurité</h3>
        
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="font-medium text-red-400">Vulnérabilité Critique</h4>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Port SSH (22) ouvert sur 192.168.1.10 avec authentification par mot de passe
            </p>
            <p className="text-xs text-slate-400">
              Recommandation: Configurer l'authentification par clé SSH
            </p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h4 className="font-medium text-yellow-400">Avertissement de Sécurité</h4>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Service HTTP non chiffré détecté sur le port 80
            </p>
            <p className="text-xs text-slate-400">
              Recommandation: Migrer vers HTTPS (port 443)
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h4 className="font-medium text-green-400">Configuration Sécurisée</h4>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Firewall actif et correctement configuré sur 192.168.1.1
            </p>
            <p className="text-xs text-slate-400">
              Statut: Conforme aux bonnes pratiques de sécurité
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-cyan-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </button>
              <div className="flex items-center space-x-3">
                <Network className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Analyse Réseau</h1>
                  <p className="text-xs text-slate-400">Cartographie des connexions et infrastructures</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-lg">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">Opérateur</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">ANALYSE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'discovery', label: 'Découverte', icon: Search },
              { id: 'topology', label: 'Topologie', icon: Network },
              { id: 'monitoring', label: 'Surveillance', icon: Activity },
              { id: 'security', label: 'Sécurité', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'discovery' && renderDiscovery()}
        {activeTab === 'topology' && renderTopology()}
        {activeTab === 'monitoring' && renderMonitoring()}
        {activeTab === 'security' && renderSecurity()}
      </main>
    </div>
  );
};

export default NetworkAnalysisModule;