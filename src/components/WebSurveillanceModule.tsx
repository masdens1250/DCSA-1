import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Globe,
  Plus,
  Search,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  Edit3,
  Play,
  Pause,
  Settings,
  Filter,
  Download,
  Share2,
  ExternalLink,
  Zap,
  Target,
  Activity,
  TrendingUp,
  MapPin,
  Calendar,
  Hash,
  Users,
  FileText,
  Image,
  Video,
  Mail,
  MessageSquare,
  Rss,
  Database,
  Shield,
  Volume2
} from 'lucide-react';

interface WebSurveillanceModuleProps {
  onBack: () => void;
}

interface KeywordAlert {
  id: string;
  keyword: string;
  sources: string[];
  frequency: 'realtime' | 'hourly' | 'daily';
  status: 'active' | 'paused' | 'stopped';
  created: string;
  lastTriggered?: string;
  alertCount: number;
  sensitivity: 'low' | 'medium' | 'high';
  filters: {
    language?: string;
    region?: string;
    contentType?: string[];
    excludeWords?: string[];
  };
}

interface Detection {
  id: string;
  keywordId: string;
  keyword: string;
  title: string;
  content: string;
  source: string;
  url: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relevanceScore: number;
  contentType: 'article' | 'social' | 'forum' | 'blog' | 'news' | 'video' | 'image';
  author?: string;
  location?: string;
  engagement?: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
}

const WebSurveillanceModule: React.FC<WebSurveillanceModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'keywords' | 'detections' | 'settings'>('dashboard');
  const [keywords, setKeywords] = useState<KeywordAlert[]>([]);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>(['web', 'social', 'news']);
  const [selectedFrequency, setSelectedFrequency] = useState<'realtime' | 'hourly' | 'daily'>('realtime');
  const [selectedSensitivity, setSelectedSensitivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isMonitoring, setIsMonitoring] = useState(true);

  const sources = [
    { id: 'web', label: 'Sites Web', icon: Globe, description: 'Pages web publiques' },
    { id: 'social', label: 'Réseaux Sociaux', icon: Users, description: 'Twitter, Facebook, Instagram' },
    { id: 'news', label: 'Actualités', icon: FileText, description: 'Sites d\'actualités' },
    { id: 'forums', label: 'Forums', icon: MessageSquare, description: 'Reddit, forums spécialisés' },
    { id: 'blogs', label: 'Blogs', icon: Rss, description: 'Blogs et publications' },
    { id: 'videos', label: 'Vidéos', icon: Video, description: 'YouTube, Dailymotion' },
    { id: 'images', label: 'Images', icon: Image, description: 'Recherche d\'images' },
    { id: 'documents', label: 'Documents', icon: FileText, description: 'PDF, documents publics' }
  ];

  // Initialisation avec des données d'exemple
  useEffect(() => {
    const sampleKeywords: KeywordAlert[] = [
      {
        id: '1',
        keyword: 'cybersécurité',
        sources: ['web', 'news', 'social'],
        frequency: 'realtime',
        status: 'active',
        created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        alertCount: 47,
        sensitivity: 'high',
        filters: {
          language: 'fr',
          contentType: ['article', 'social'],
          excludeWords: ['publicité', 'spam']
        }
      },
      {
        id: '2',
        keyword: 'intelligence artificielle',
        sources: ['news', 'blogs', 'forums'],
        frequency: 'hourly',
        status: 'active',
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        lastTriggered: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        alertCount: 23,
        sensitivity: 'medium',
        filters: {
          language: 'fr',
          region: 'France'
        }
      },
      {
        id: '3',
        keyword: 'data breach',
        sources: ['web', 'news', 'social', 'forums'],
        frequency: 'realtime',
        status: 'paused',
        created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        alertCount: 12,
        sensitivity: 'high',
        filters: {
          language: 'en',
          excludeWords: ['fiction', 'movie']
        }
      }
    ];

    const sampleDetections: Detection[] = [
      {
        id: '1',
        keywordId: '1',
        keyword: 'cybersécurité',
        title: 'Nouvelle faille de sécurité découverte dans les systèmes bancaires',
        content: 'Une importante faille de cybersécurité a été identifiée dans plusieurs systèmes bancaires européens...',
        source: 'Le Monde Informatique',
        url: 'https://lemondeinformatique.fr/actualites/...',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sentiment: 'negative',
        relevanceScore: 95,
        contentType: 'news',
        author: 'Jean Dupont',
        engagement: { likes: 45, shares: 23, comments: 12 }
      },
      {
        id: '2',
        keywordId: '2',
        keyword: 'intelligence artificielle',
        title: 'L\'IA révolutionne le secteur de la santé',
        content: 'Les dernières avancées en intelligence artificielle permettent des diagnostics plus précis...',
        source: 'Twitter',
        url: 'https://twitter.com/user/status/...',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        sentiment: 'positive',
        relevanceScore: 87,
        contentType: 'social',
        author: '@TechExpert',
        engagement: { likes: 156, shares: 89, comments: 34 }
      },
      {
        id: '3',
        keywordId: '1',
        keyword: 'cybersécurité',
        title: 'Formation en cybersécurité : les meilleures pratiques',
        content: 'Guide complet pour améliorer la cybersécurité en entreprise...',
        source: 'Blog Sécurité IT',
        url: 'https://blog-securite-it.fr/formation-cybersecurite',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        sentiment: 'neutral',
        relevanceScore: 78,
        contentType: 'blog',
        author: 'Marie Martin'
      },
      {
        id: '4',
        keywordId: '2',
        keyword: 'intelligence artificielle',
        title: 'Débat sur l\'éthique de l\'IA au Parlement européen',
        content: 'Les députés européens débattent des implications éthiques de l\'intelligence artificielle...',
        source: 'Euronews',
        url: 'https://euronews.com/tech/ia-ethique-parlement',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        sentiment: 'neutral',
        relevanceScore: 92,
        contentType: 'news',
        author: 'Sophie Dubois',
        location: 'Bruxelles'
      }
    ];

    setKeywords(sampleKeywords);
    setDetections(sampleDetections);
  }, []);

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;

    const newKeywordAlert: KeywordAlert = {
      id: Date.now().toString(),
      keyword: newKeyword.trim(),
      sources: selectedSources,
      frequency: selectedFrequency,
      status: 'active',
      created: new Date().toISOString(),
      alertCount: 0,
      sensitivity: selectedSensitivity,
      filters: {}
    };

    setKeywords(prev => [...prev, newKeywordAlert]);
    setNewKeyword('');
    setShowAddKeyword(false);
  };

  const toggleKeywordStatus = (id: string) => {
    setKeywords(prev => prev.map(keyword => 
      keyword.id === id 
        ? { ...keyword, status: keyword.status === 'active' ? 'paused' : 'active' }
        : keyword
    ));
  };

  const deleteKeyword = (id: string) => {
    setKeywords(prev => prev.filter(keyword => keyword.id !== id));
    setDetections(prev => prev.filter(detection => detection.keywordId !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30';
      case 'paused': return 'text-yellow-400 bg-yellow-900/30';
      case 'stopped': return 'text-red-400 bg-red-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return FileText;
      case 'social': return Users;
      case 'blog': return Rss;
      case 'forum': return MessageSquare;
      case 'video': return Video;
      case 'image': return Image;
      default: return Globe;
    }
  };

  const renderDashboard = () => {
    const activeKeywords = keywords.filter(k => k.status === 'active').length;
    const totalDetections = detections.length;
    const recentDetections = detections.filter(d => 
      new Date(d.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;

    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-6 h-6 text-cyan-400" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{activeKeywords}</p>
            <p className="text-sm text-slate-400">Mots-clés actifs</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Bell className="w-6 h-6 text-cyan-400" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{totalDetections}</p>
            <p className="text-sm text-slate-400">Détections totales</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-6 h-6 text-cyan-400" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{recentDetections}</p>
            <p className="text-sm text-slate-400">Dernières 24h</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {isMonitoring ? 'ACTIF' : 'ARRÊTÉ'}
            </p>
            <p className="text-sm text-slate-400">Statut surveillance</p>
          </div>
        </div>

        {/* Recent Detections */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Détections Récentes</h3>
            <button 
              onClick={() => setActiveTab('detections')}
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center space-x-1"
            >
              <span>Voir tout</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            {detections.slice(0, 3).map((detection) => {
              const IconComponent = getContentTypeIcon(detection.contentType);
              return (
                <div key={detection.id} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-900/30 rounded-lg">
                        <IconComponent className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{detection.title}</h4>
                        <p className="text-sm text-slate-400">{detection.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getSentimentColor(detection.sentiment)}`}>
                        {detection.sentiment}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(detection.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-2 line-clamp-2">{detection.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
                      {detection.keyword}
                    </span>
                    <span className="text-xs text-slate-400">
                      Pertinence: {detection.relevanceScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Keywords */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Mots-clés Surveillés</h3>
            <button 
              onClick={() => setActiveTab('keywords')}
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center space-x-1"
            >
              <span>Gérer</span>
              <Settings className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keywords.slice(0, 6).map((keyword) => (
              <div key={keyword.id} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{keyword.keyword}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(keyword.status)}`}>
                    {keyword.status}
                  </span>
                </div>
                <div className="text-sm text-slate-400 space-y-1">
                  <p>Alertes: {keyword.alertCount}</p>
                  <p>Fréquence: {keyword.frequency}</p>
                  <p>Sources: {keyword.sources.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderKeywords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Gestion des Mots-clés</h3>
        <button
          onClick={() => setShowAddKeyword(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un mot-clé</span>
        </button>
      </div>

      {showAddKeyword && (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Nouveau Mot-clé</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mot-clé ou expression
              </label>
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Ex: cybersécurité, data breach..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fréquence de surveillance
              </label>
              <select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value as any)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="realtime">Temps réel</option>
                <option value="hourly">Toutes les heures</option>
                <option value="daily">Quotidienne</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Sources à surveiller
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sources.map((source) => (
                <label key={source.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSources.includes(source.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSources(prev => [...prev, source.id]);
                      } else {
                        setSelectedSources(prev => prev.filter(s => s !== source.id));
                      }
                    }}
                    className="rounded border-slate-600 text-cyan-600 focus:ring-cyan-500"
                  />
                  <source.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Sensibilité
            </label>
            <select
              value={selectedSensitivity}
              onChange={(e) => setSelectedSensitivity(e.target.value as any)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="low">Faible (moins d'alertes)</option>
              <option value="medium">Moyenne (équilibrée)</option>
              <option value="high">Élevée (toutes les mentions)</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowAddKeyword(false)}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleAddKeyword}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {keywords.map((keyword) => (
          <div key={keyword.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-lg font-semibold text-white">{keyword.keyword}</h4>
                  <p className="text-sm text-slate-400">
                    Créé le {new Date(keyword.created).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(keyword.status)}`}>
                  {keyword.status === 'active' ? 'Actif' : 
                   keyword.status === 'paused' ? 'En pause' : 'Arrêté'}
                </span>
                
                <button
                  onClick={() => toggleKeywordStatus(keyword.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {keyword.status === 'active' ? 
                    <Pause className="w-4 h-4 text-yellow-400" /> :
                    <Play className="w-4 h-4 text-green-400" />
                  }
                </button>
                
                <button
                  onClick={() => deleteKeyword(keyword.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-400">Alertes</p>
                <p className="text-lg font-semibold text-white">{keyword.alertCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Fréquence</p>
                <p className="text-sm text-slate-300">{keyword.frequency}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Sources</p>
                <p className="text-sm text-slate-300">{keyword.sources.length} actives</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Dernière alerte</p>
                <p className="text-sm text-slate-300">
                  {keyword.lastTriggered ? 
                    new Date(keyword.lastTriggered).toLocaleString() : 
                    'Aucune'
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {keyword.sources.map((sourceId) => {
                const source = sources.find(s => s.id === sourceId);
                return source ? (
                  <span key={sourceId} className="flex items-center space-x-1 px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                    <source.icon className="w-3 h-3" />
                    <span>{source.label}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetections = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Détections ({detections.length})</h3>
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

      <div className="space-y-4">
        {detections.map((detection) => {
          const IconComponent = getContentTypeIcon(detection.contentType);
          return (
            <div key={detection.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{detection.title}</h4>
                    <p className="text-sm text-slate-400">{detection.source}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${getSentimentColor(detection.sentiment)}`}>
                    {detection.sentiment}
                  </span>
                  <div className="flex items-center text-xs text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(detection.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{detection.content}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
                    {detection.keyword}
                  </span>
                  <span className="text-xs text-slate-400">
                    Pertinence: {detection.relevanceScore}%
                  </span>
                  {detection.author && (
                    <span className="text-xs text-slate-400">
                      Par: {detection.author}
                    </span>
                  )}
                  {detection.location && (
                    <span className="flex items-center text-xs text-slate-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {detection.location}
                    </span>
                  )}
                </div>
                
                <a
                  href={detection.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  <span>Voir la source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {detection.engagement && (
                <div className="flex items-center space-x-6 text-xs text-slate-400">
                  {detection.engagement.likes && (
                    <span>👍 {detection.engagement.likes}</span>
                  )}
                  {detection.engagement.shares && (
                    <span>🔄 {detection.engagement.shares}</span>
                  )}
                  {detection.engagement.comments && (
                    <span>💬 {detection.engagement.comments}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Paramètres de Surveillance</h3>
      
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Surveillance Globale</h4>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-medium">Surveillance active</p>
            <p className="text-sm text-slate-400">Activer/désactiver toute la surveillance</p>
          </div>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isMonitoring ? 'bg-cyan-600' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isMonitoring ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Intervalle de vérification minimum
            </label>
            <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none">
              <option value="1">1 minute</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre max de résultats par requête
            </label>
            <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Notifications</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notifications en temps réel</p>
              <p className="text-sm text-slate-400">Recevoir des alertes instantanées</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Notifications par email</p>
              <p className="text-sm text-slate-400">Résumé quotidien par email</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Sons d'alerte</p>
              <p className="text-sm text-slate-400">Notification sonore pour les alertes</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Filtres Globaux</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Langues préférées
            </label>
            <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none">
              <option value="all">Toutes les langues</option>
              <option value="fr">Français uniquement</option>
              <option value="en">Anglais uniquement</option>
              <option value="fr,en">Français et Anglais</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Région géographique
            </label>
            <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none">
              <option value="all">Monde entier</option>
              <option value="fr">France</option>
             <option value="dz">Algérie</option>
             <option value="ma">Maroc</option>
             <option value="tn">Tunisie</option>
             <option value="ly">Libye</option>
             <option value="maghreb">Maghreb (Algérie, Maroc, Tunisie)</option>
             <option value="north_africa">Afrique du Nord</option>
              <option value="eu">Europe</option>
              <option value="na">Amérique du Nord</option>
             <option value="africa">Afrique</option>
             <option value="middle_east">Moyen-Orient</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Mots à exclure globalement
          </label>
          <input
            type="text"
            placeholder="spam, publicité, promotion..."
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
          />
          <p className="text-xs text-slate-400 mt-1">Séparez les mots par des virgules</p>
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
                <Globe className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Surveillance Web</h1>
                  <p className="text-xs text-slate-400">Monitoring en temps réel</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-lg">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">Opérateur</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm ${isMonitoring ? 'text-green-400' : 'text-red-400'}`}>
                  {isMonitoring ? 'SURVEILLANCE ACTIVE' : 'SURVEILLANCE ARRÊTÉE'}
                </span>
              </div>
              
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isMonitoring 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isMonitoring ? 'Arrêter' : 'Démarrer'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de Bord', icon: Activity },
              { id: 'keywords', label: 'Mots-clés', icon: Hash },
              { id: 'detections', label: 'Détections', icon: Bell },
              { id: 'settings', label: 'Paramètres', icon: Settings }
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'keywords' && renderKeywords()}
        {activeTab === 'detections' && renderDetections()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
};

export default WebSurveillanceModule;