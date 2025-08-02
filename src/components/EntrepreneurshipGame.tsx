import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  Zap,
  ShoppingCart,
  Smartphone,
  Coffee,
  Shirt,
  Leaf,
  BookOpen,
  Heart,
  ArrowRight,
  ArrowLeft,
  Star,
  Trophy,
  Coins,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Award,
  Sparkles,
  TrendingDown,
  Clock,
  MapPin,
  Globe,
  Briefcase,
  Megaphone,
  Settings,
  Rocket,
  Building,
  Handshake,
  LineChart,
  PlusCircle,
  MinusCircle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Download,
  Upload,
  Save,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Home,
  User,
  Mail,
  Phone,
  Camera,
  Video,
  Music,
  Image,
  FileText,
  Folder,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Bluetooth,
  Printer,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Mic,
  Speaker,
  Gamepad2,
  Joystick,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Shield
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GameState {
  currentStep: number;
  industry: string;
  industryData?: IndustryOption;
  productName: string;
  budget: number;
  revenue: number;
  customers: number;
  satisfaction: number;
  marketShare: number;
  employees: number;
  monthsInBusiness: number;
  decisions: Array<{
    step: number;
    decision: string;
    impact: string;
    cost: number;
    timestamp: string;
  }>;
  events: Array<{
    id: number;
    title: string;
    description: string;
    type: 'challenge' | 'opportunity' | 'neutral';
    resolved: boolean;
  }>;
  completedSteps: number[];
  achievements: string[];
  finalInvestment: number;
  gameComplete: boolean;
}

interface IndustryOption {
  id: string;
  name: string;
  icon: any;
  description: string;
  examples: string[];
  startingCosts: { [key: string]: number };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marketSize: string;
  competition: string;
  profitPotential: string;
}

interface BusinessEvent {
  id: number;
  title: string;
  description: string;
  type: 'challenge' | 'opportunity' | 'neutral';
  choices: Array<{
    text: string;
    cost: number;
    impact: {
      budget?: number;
      revenue?: number;
      customers?: number;
      satisfaction?: number;
      employees?: number;
      marketShare?: number;
    };
    consequence: string;
  }>;
}

const EntrepreneurshipGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    industry: '',
    productName: '',
    budget: 1000,
    revenue: 0,
    customers: 0,
    satisfaction: 50,
    marketShare: 0,
    employees: 1,
    monthsInBusiness: 0,
    decisions: [],
    events: [],
    completedSteps: [],
    achievements: [],
    finalInvestment: 0,
    gameComplete: false
  });

  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<BusinessEvent | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [animatingMetrics, setAnimatingMetrics] = useState(false);

  const industries: IndustryOption[] = [
    {
      id: 'tech',
      name: 'Tech App',
      icon: Smartphone,
      description: 'Create a mobile app that solves problems for people',
      examples: ['Social media app', 'Gaming app', 'Learning app', 'Productivity tool'],
      startingCosts: { development: 300, marketing: 150, testing: 100 },
      difficulty: 'Medium',
      marketSize: 'Huge (billions of users)',
      competition: 'Very High',
      profitPotential: 'Very High'
    },
    {
      id: 'food',
      name: 'Food Business',
      icon: Coffee,
      description: 'Start a food-related business that people will love',
      examples: ['Food truck', 'Bakery', 'Healthy snacks', 'Meal delivery'],
      startingCosts: { supplies: 200, equipment: 250, permits: 100 },
      difficulty: 'Easy',
      marketSize: 'Large (everyone eats)',
      competition: 'Medium',
      profitPotential: 'Medium'
    },
    {
      id: 'clothing',
      name: 'Clothing Brand',
      icon: Shirt,
      description: 'Design and sell clothing or accessories that express style',
      examples: ['T-shirt brand', 'Jewelry', 'Sneakers', 'Accessories'],
      startingCosts: { design: 150, production: 300, branding: 100 },
      difficulty: 'Medium',
      marketSize: 'Large (fashion industry)',
      competition: 'High',
      profitPotential: 'High'
    },
    {
      id: 'eco',
      name: 'Eco Products',
      icon: Leaf,
      description: 'Create environmentally friendly products for a better planet',
      examples: ['Reusable bottles', 'Solar gadgets', 'Recycled items', 'Green cleaning'],
      startingCosts: { research: 200, materials: 200, certification: 150 },
      difficulty: 'Hard',
      marketSize: 'Growing (eco-conscious)',
      competition: 'Medium',
      profitPotential: 'High'
    },
    {
      id: 'services',
      name: 'Services',
      icon: Users,
      description: 'Offer services that help people solve their problems',
      examples: ['Tutoring', 'Pet sitting', 'Lawn care', 'Tech support'],
      startingCosts: { advertising: 100, supplies: 150, insurance: 50 },
      difficulty: 'Easy',
      marketSize: 'Medium (local focus)',
      competition: 'Low',
      profitPotential: 'Medium'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: Gamepad2,
      description: 'Create games or gaming-related products and services',
      examples: ['Mobile game', 'Board game', 'Gaming accessories', 'Esports team'],
      startingCosts: { development: 400, art: 200, marketing: 150 },
      difficulty: 'Hard',
      marketSize: 'Huge (global gaming)',
      competition: 'Very High',
      profitPotential: 'Very High'
    }
  ];

  const gameSteps = [
    { id: 0, title: 'Choose Industry', description: 'Pick what type of business you want to start', icon: Target },
    { id: 1, title: 'Design Product', description: 'Create your product or service', icon: Lightbulb },
    { id: 2, title: 'Set Budget', description: 'Decide how to spend your starting money', icon: DollarSign },
    { id: 3, title: 'Launch', description: 'Bring your product to market', icon: Rocket },
    { id: 4, title: 'Grow', description: 'Scale your business and handle challenges', icon: TrendingUp },
    { id: 5, title: 'Pitch', description: 'Present to investors for funding', icon: Briefcase }
  ];

  const businessEvents: BusinessEvent[] = [
    {
      id: 1,
      title: '🚨 Competitor Alert!',
      description: 'A big company just launched a similar product to yours. They have more money and resources. How do you respond to stay competitive?',
      type: 'challenge',
      choices: [
        {
          text: '💰 Lower our prices to compete directly',
          cost: 0,
          impact: { revenue: -100, customers: 30, satisfaction: -15 },
          consequence: 'You gain customers but make less money per sale. This could hurt long-term profits.'
        },
        {
          text: '⚡ Improve our product features quickly',
          cost: 200,
          impact: { satisfaction: 25, customers: 15, revenue: 50 },
          consequence: 'Customers love the improvements! Your product stands out from the competition.'
        },
        {
          text: '🎯 Focus on better customer service',
          cost: 100,
          impact: { satisfaction: 30, customers: 20, employees: 2 },
          consequence: 'Amazing customer service becomes your competitive advantage!'
        },
        {
          text: '📱 Partner with influencers for marketing',
          cost: 150,
          impact: { customers: 50, revenue: 100, satisfaction: 10 },
          consequence: 'Influencer marketing brings lots of new customers who trust their recommendations.'
        }
      ]
    },
    {
      id: 2,
      title: '🔥 Viral Moment!',
      description: 'Your product just went viral on social media! Thousands of people are talking about it and want to buy it. How do you handle this sudden popularity?',
      type: 'opportunity',
      choices: [
        {
          text: '🏭 Quickly increase production to meet demand',
          cost: 300,
          impact: { revenue: 400, customers: 150, satisfaction: -10, employees: 5 },
          consequence: 'You meet the demand but quality suffers slightly. Still a big win overall!'
        },
        {
          text: '🎯 Keep current pace and maintain quality',
          cost: 0,
          impact: { revenue: 200, customers: 75, satisfaction: 15 },
          consequence: 'You maintain quality but some customers have to wait. They appreciate the quality!'
        },
        {
          text: '🤝 Partner with a bigger company for distribution',
          cost: 0,
          impact: { revenue: 300, customers: 120, satisfaction: 5, marketShare: 10 },
          consequence: 'The partnership helps you reach more customers faster!'
        },
        {
          text: '💎 Create a premium version for the hype',
          cost: 150,
          impact: { revenue: 250, customers: 50, satisfaction: 20 },
          consequence: 'The premium version becomes a status symbol and sells really well!'
        }
      ]
    },
    {
      id: 3,
      title: '📦 Supply Chain Crisis',
      description: 'Your main supplier is having serious problems and can\'t deliver materials on time. This could delay your product launch or hurt existing customers.',
      type: 'challenge',
      choices: [
        {
          text: '🔍 Find a new supplier quickly',
          cost: 150,
          impact: { revenue: -50, satisfaction: -5, customers: 5 },
          consequence: 'The new supplier costs more but gets you back on track quickly.'
        },
        {
          text: '⏳ Wait for current supplier to fix issues',
          cost: 0,
          impact: { revenue: -100, customers: -30, satisfaction: -25 },
          consequence: 'Waiting hurts your business, but you save money and keep the relationship.'
        },
        {
          text: '🏭 Make the product yourself temporarily',
          cost: 250,
          impact: { revenue: -25, satisfaction: 15, employees: 3 },
          consequence: 'Making it yourself is expensive but customers love the personal touch!'
        },
        {
          text: '📢 Be honest with customers about delays',
          cost: 50,
          impact: { satisfaction: 10, customers: -10, revenue: -25 },
          consequence: 'Customers appreciate your honesty and most stick with you.'
        }
      ]
    },
    {
      id: 4,
      title: '💡 Innovation Opportunity',
      description: 'You\'ve discovered a new technology that could revolutionize your product. But it\'s risky and expensive to implement.',
      type: 'opportunity',
      choices: [
        {
          text: '🚀 Go all-in on the new technology',
          cost: 400,
          impact: { revenue: 300, satisfaction: 35, customers: 80, marketShare: 15 },
          consequence: 'The risk pays off! You become an industry leader with cutting-edge technology.'
        },
        {
          text: '🧪 Test it with a small pilot program',
          cost: 150,
          impact: { revenue: 100, satisfaction: 15, customers: 25 },
          consequence: 'Smart approach! The pilot shows promise and you can expand later.'
        },
        {
          text: '📚 Research more before deciding',
          cost: 75,
          impact: { satisfaction: 5, revenue: 25 },
          consequence: 'More research helps you make a better decision later, but you miss the first-mover advantage.'
        },
        {
          text: '❌ Stick with current technology',
          cost: 0,
          impact: { satisfaction: -5, customers: 10 },
          consequence: 'Playing it safe keeps costs low but competitors might get ahead.'
        }
      ]
    },
    {
      id: 5,
      title: '🌟 Celebrity Endorsement',
      description: 'A famous celebrity wants to endorse your product! They have millions of followers but want a lot of money upfront.',
      type: 'opportunity',
      choices: [
        {
          text: '💸 Pay the full endorsement fee',
          cost: 350,
          impact: { customers: 200, revenue: 500, satisfaction: 20, marketShare: 20 },
          consequence: 'The celebrity endorsement is a huge success! Sales skyrocket.'
        },
        {
          text: '🤝 Negotiate a revenue-sharing deal',
          cost: 100,
          impact: { customers: 150, revenue: 300, satisfaction: 15 },
          consequence: 'The celebrity agrees to share in your success. Great partnership!'
        },
        {
          text: '📱 Ask for social media posts instead',
          cost: 50,
          impact: { customers: 75, revenue: 150, satisfaction: 10 },
          consequence: 'Social media posts are cheaper and still bring good results.'
        },
        {
          text: '🎯 Focus on micro-influencers instead',
          cost: 100,
          impact: { customers: 100, revenue: 200, satisfaction: 25 },
          consequence: 'Micro-influencers have more engaged audiences and better conversion rates!'
        }
      ]
    },
    {
      id: 6,
      title: '🏆 Award Nomination',
      description: 'Your company has been nominated for "Best New Business of the Year"! Winning could bring huge publicity, but preparing costs time and money.',
      type: 'opportunity',
      choices: [
        {
          text: '🎪 Go all-out for the award ceremony',
          cost: 200,
          impact: { customers: 100, satisfaction: 30, revenue: 250, marketShare: 10 },
          consequence: 'You win the award! The publicity brings tons of new customers.'
        },
        {
          text: '📝 Submit a simple application',
          cost: 50,
          impact: { customers: 25, satisfaction: 10, revenue: 75 },
          consequence: 'You don\'t win but get some good publicity from being nominated.'
        },
        {
          text: '🎥 Create a promotional video',
          cost: 100,
          impact: { customers: 60, satisfaction: 20, revenue: 150 },
          consequence: 'The video goes viral even without winning the award!'
        },
        {
          text: '💼 Focus on business instead of awards',
          cost: 0,
          impact: { revenue: 100, customers: 30, satisfaction: 5 },
          consequence: 'You focus on customers instead of awards. They appreciate the attention!'
        }
      ]
    },
    {
      id: 7,
      title: '🌍 Global Expansion Opportunity',
      description: 'A company from another country wants to help you sell your product internationally. This could be huge, but it\'s also risky.',
      type: 'opportunity',
      choices: [
        {
          text: '✈️ Expand to 5 countries immediately',
          cost: 500,
          impact: { customers: 300, revenue: 600, satisfaction: -5, employees: 10, marketShare: 25 },
          consequence: 'Global expansion is challenging but successful! You\'re now an international business.'
        },
        {
          text: '🇨🇦 Start with just one country',
          cost: 200,
          impact: { customers: 100, revenue: 200, satisfaction: 10, employees: 3 },
          consequence: 'Smart approach! You learn from one market before expanding further.'
        },
        {
          text: '💻 Sell online internationally first',
          cost: 100,
          impact: { customers: 150, revenue: 250, satisfaction: 15 },
          consequence: 'Online sales are easier to manage and still reach global customers.'
        },
        {
          text: '🏠 Focus on dominating your home market',
          cost: 0,
          impact: { customers: 50, revenue: 150, satisfaction: 20, marketShare: 15 },
          consequence: 'You become the #1 choice in your home market. Strong foundation!'
        }
      ]
    },
    {
      id: 8,
      title: '💔 Key Employee Wants to Quit',
      description: 'Your best employee, who knows all your secrets, wants to quit and start a competing business. How do you handle this situation?',
      type: 'challenge',
      choices: [
        {
          text: '💰 Offer them a big raise and promotion',
          cost: 150,
          impact: { satisfaction: 20, employees: 1, revenue: 50 },
          consequence: 'They stay! Other employees are motivated by seeing loyalty rewarded.'
        },
        {
          text: '🤝 Offer them partnership/equity in the company',
          cost: 0,
          impact: { satisfaction: 30, revenue: 100, marketShare: 5 },
          consequence: 'They become a partner! Their expertise helps grow the business even more.'
        },
        {
          text: '📋 Let them go but protect your secrets',
          cost: 100,
          impact: { satisfaction: -10, employees: -1, customers: -20 },
          consequence: 'You protect your business but lose valuable knowledge and experience.'
        },
        {
          text: '🎓 Help them start their business in a different area',
          cost: 50,
          impact: { satisfaction: 15, customers: 20, revenue: 25 },
          consequence: 'Your kindness creates a valuable business relationship and good reputation!'
        }
      ]
    }
  ];

  const achievements = [
    { id: 'first_sale', name: 'First Sale!', description: 'Made your first dollar in revenue', icon: '💰' },
    { id: 'hundred_customers', name: 'Customer Magnet', description: 'Reached 100 customers', icon: '👥' },
    { id: 'high_satisfaction', name: 'Customer Love', description: 'Achieved 80% customer satisfaction', icon: '❤️' },
    { id: 'profitable', name: 'Profitable!', description: 'Revenue exceeded your starting budget', icon: '📈' },
    { id: 'viral_moment', name: 'Viral Success', description: 'Handled a viral moment successfully', icon: '🔥' },
    { id: 'global_expansion', name: 'Global Player', description: 'Expanded internationally', icon: '🌍' },
    { id: 'innovation_leader', name: 'Innovation Leader', description: 'Successfully implemented new technology', icon: '🚀' },
    { id: 'team_builder', name: 'Team Builder', description: 'Grew your team to 10+ employees', icon: '👨‍💼' }
  ];

  const generateRandomEvent = (): BusinessEvent => {
    const availableEvents = businessEvents.filter(event => 
      !gameState.events.some(gameEvent => gameEvent.id === event.id)
    );
    
    if (availableEvents.length === 0) {
      return businessEvents[Math.floor(Math.random() * businessEvents.length)];
    }
    
    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
  };

  const checkAchievements = (newState: GameState) => {
    const newAchievements: string[] = [];
    
    if (newState.revenue > 0 && !newState.achievements.includes('first_sale')) {
      newAchievements.push('first_sale');
    }
    if (newState.customers >= 100 && !newState.achievements.includes('hundred_customers')) {
      newAchievements.push('hundred_customers');
    }
    if (newState.satisfaction >= 80 && !newState.achievements.includes('high_satisfaction')) {
      newAchievements.push('high_satisfaction');
    }
    if (newState.revenue >= 1000 && !newState.achievements.includes('profitable')) {
      newAchievements.push('profitable');
    }
    if (newState.employees >= 10 && !newState.achievements.includes('team_builder')) {
      newAchievements.push('team_builder');
    }
    
    return newAchievements;
  };

  const animateMetrics = () => {
    setAnimatingMetrics(true);
    setTimeout(() => setAnimatingMetrics(false), 1000);
  };

  const handleIndustrySelect = (industry: IndustryOption) => {
    console.log('Industry selected:', industry.name);
    setGameState(prev => ({
      ...prev,
      industry: industry.id,
      industryData: industry,
      currentStep: 1,
      completedSteps: [...prev.completedSteps, 0],
      decisions: [...prev.decisions, {
        step: 0,
        decision: `Chose ${industry.name} industry`,
        impact: `Starting in ${industry.marketSize} market`,
        cost: 0,
        timestamp: new Date().toLocaleTimeString()
      }]
    }));
  };

  const handleProductDesign = (productName: string) => {
    console.log('Product designed:', productName);
    if (!productName.trim()) return;
    
    setGameState(prev => ({
      ...prev,
      productName: productName.trim(),
      currentStep: 2,
      completedSteps: [...prev.completedSteps, 1],
      decisions: [...prev.decisions, {
        step: 1,
        decision: `Created product: ${productName}`,
        impact: 'Ready for market research',
        cost: 0,
        timestamp: new Date().toLocaleTimeString()
      }]
    }));
  };

  const handleBudgetDecision = (decision: string, cost: number, impact: any, description: string) => {
    console.log('Budget decision made:', decision);
    
    const newState = {
      ...gameState,
      budget: Math.max(0, gameState.budget - cost),
      revenue: Math.max(0, gameState.revenue + (impact.revenue || 0)),
      customers: Math.max(0, gameState.customers + (impact.customers || 0)),
      satisfaction: Math.max(0, Math.min(100, gameState.satisfaction + (impact.satisfaction || 0))),
      employees: Math.max(1, gameState.employees + (impact.employees || 0)),
      marketShare: Math.max(0, Math.min(100, gameState.marketShare + (impact.marketShare || 0))),
      decisions: [...gameState.decisions, {
        step: gameState.currentStep,
        decision,
        impact: description,
        cost,
        timestamp: new Date().toLocaleTimeString()
      }],
      currentStep: gameState.currentStep + 1,
      completedSteps: [...gameState.completedSteps, gameState.currentStep],
      monthsInBusiness: gameState.monthsInBusiness + 1
    };

    const newAchievements = checkAchievements(newState);
    newState.achievements = [...gameState.achievements, ...newAchievements];

    setGameState(newState);
    animateMetrics();

    // Trigger random events occasionally (30% chance)
    if (Math.random() < 0.3 && gameState.currentStep >= 2) {
      setTimeout(() => {
        const event = generateRandomEvent();
        setCurrentEvent(event);
        setShowEvent(true);
      }, 1500);
    }
  };

  const handleEventChoice = (choice: any) => {
    console.log('Event choice made:', choice.text);
    
    if (!currentEvent) return;

    const newState = {
      ...gameState,
      budget: Math.max(0, gameState.budget - choice.cost),
      revenue: Math.max(0, gameState.revenue + (choice.impact.revenue || 0)),
      customers: Math.max(0, gameState.customers + (choice.impact.customers || 0)),
      satisfaction: Math.max(0, Math.min(100, gameState.satisfaction + (choice.impact.satisfaction || 0))),
      employees: Math.max(1, gameState.employees + (choice.impact.employees || 0)),
      decisions: [...gameState.decisions, {
        step: gameState.currentStep,
        decision: choice.text,
        impact: choice.consequence,
        cost: choice.cost,
        timestamp: new Date().toLocaleTimeString()
      }],
      events: [...gameState.events, {
        id: currentEvent.id,
        title: currentEvent.title,
        description: currentEvent.description,
        type: currentEvent.type,
        resolved: true
      }]
    };

    // Check for special achievements based on event
    if (currentEvent.id === 2) { // Viral moment
      newState.achievements = [...gameState.achievements, 'viral_moment'];
    }

    const newAchievements = checkAchievements(newState);
    newState.achievements = [...newState.achievements, ...newAchievements];

    setGameState(newState);
    setShowEvent(false);
    setCurrentEvent(null);
    animateMetrics();
  };

  const calculateScore = () => {
    const { revenue, customers, satisfaction, budget, employees, marketShare } = gameState;
    const baseScore = (revenue * 0.3) + (customers * 2) + (satisfaction * 5) + (budget * 0.1) + (employees * 10) + (marketShare * 8);
    const achievementBonus = gameState.achievements.length * 100;
    return Math.round(baseScore + achievementBonus);
  };

  const getScoreRating = (score: number) => {
    if (score >= 2000) return { rating: 'Unicorn Startup! 🦄', color: 'text-purple-600', description: 'You built the next big thing!' };
    if (score >= 1500) return { rating: 'Successful Business! 🚀', color: 'text-green-600', description: 'Your business is thriving!' };
    if (score >= 1000) return { rating: 'Growing Company! 📈', color: 'text-blue-600', description: 'You\'re on the right track!' };
    if (score >= 500) return { rating: 'Learning Experience! 📚', color: 'text-yellow-600', description: 'Great learning opportunity!' };
    return { rating: 'Keep Trying! 💪', color: 'text-red-600', description: 'Every entrepreneur faces challenges!' };
  };

  const handleStartGame = () => {
    console.log('Start game clicked');
    setGameStarted(true);
  };

  const handleShowTutorial = () => {
    console.log('Tutorial clicked');
    setShowTutorial(true);
  };

  const handleResetGame = () => {
    console.log('Reset game clicked');
    setGameState({
      currentStep: 0,
      industry: '',
      industryData: undefined,
      productName: '',
      budget: 1000,
      revenue: 0,
      customers: 0,
      satisfaction: 50,
      marketShare: 0,
      employees: 1,
      monthsInBusiness: 0,
      decisions: [],
      events: [],
      completedSteps: [],
      achievements: [],
      finalInvestment: 0,
      gameComplete: false
    });
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    console.log('Back to menu clicked');
    setGameStarted(false);
    setShowTutorial(false);
  };

  const handleStepClick = (stepId: number) => {
    console.log('Step clicked:', stepId);
    if (gameState.completedSteps.includes(stepId) || gameState.currentStep === stepId) {
      setGameState(prev => ({ ...prev, currentStep: stepId }));
    }
  };

  const handleTabChange = (value: string) => {
    console.log('Tab changed:', value);
  };

  // Tutorial Modal
  if (showTutorial) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Play: Young Entrepreneur Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gameSteps.map((step, index) => (
                    <div key={step.id} className="card-gradient p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="font-semibold text-primary mb-3">🎯 Game Tips:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Start with $1,000 virtual dollars to build your business</li>
                    <li>• Every decision affects your budget, customers, and satisfaction</li>
                    <li>• Random events will test your problem-solving skills</li>
                    <li>• Try to balance spending money with making money</li>
                    <li>• Happy customers are more valuable than lots of unhappy customers</li>
                    <li>• You can replay the game to try different strategies!</li>
                  </ul>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={handleStartGame} variant="default" size="lg">
                    <Play className="mr-2 w-5 h-5" />
                    Start Playing
                  </Button>
                  <Button onClick={handleBackToMenu} variant="outline" size="lg">
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Menu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Game Start Screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Young Entrepreneur Game
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build your own startup from scratch! Make real business decisions, handle challenges, 
              and learn what it takes to be an entrepreneur. Every choice matters!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleShowTutorial}>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Learn by Doing</h3>
                  <p className="text-sm text-muted-foreground">Make real business decisions and see the results instantly</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleShowTutorial}>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-secondary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">Watch your business grow with real metrics and achievements</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleShowTutorial}>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-accent mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Earn Your Score</h3>
                  <p className="text-sm text-muted-foreground">Get rated on your entrepreneurial skills and decision-making</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleStartGame}
                  variant="default" 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Start Your Business Journey
                </Button>
                <Button 
                  onClick={handleShowTutorial}
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  <BookOpen className="mr-2 w-5 h-5" />
                  How to Play
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>15-30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Ages 10+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Learn by playing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Event Modal
  if (showEvent && currentEvent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              {currentEvent.type === 'challenge' && <AlertTriangle className="w-6 h-6 text-red-500" />}
              {currentEvent.type === 'opportunity' && <Star className="w-6 h-6 text-yellow-500" />}
              {currentEvent.type === 'neutral' && <Zap className="w-6 h-6 text-blue-500" />}
              <CardTitle className="text-xl">{currentEvent.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{currentEvent.description}</p>
            <div className="space-y-3">
              {currentEvent.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-6 h-auto hover:bg-primary/5 hover:border-primary transition-all duration-300"
                  onClick={() => handleEventChoice(choice)}
                >
                  <div className="w-full">
                    <div className="font-semibold mb-2 text-lg">{choice.text}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Cost: ${choice.cost}</span>
                      {choice.impact.revenue && <span> | Revenue: {choice.impact.revenue > 0 ? '+' : ''}${choice.impact.revenue}</span>}
                      {choice.impact.customers && <span> | Customers: {choice.impact.customers > 0 ? '+' : ''}{choice.impact.customers}</span>}
                      {choice.impact.satisfaction && <span> | Satisfaction: {choice.impact.satisfaction > 0 ? '+' : ''}{choice.impact.satisfaction}%</span>}
                      {choice.impact.employees && <span> | Employees: {choice.impact.employees > 0 ? '+' : ''}{choice.impact.employees}</span>}
                    </div>
                    <div className="text-xs text-muted-foreground italic">
                      "{choice.consequence}"
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {gameState.productName || 'Your Startup'}
              </h1>
              {gameState.industryData && (
                <p className="text-muted-foreground">
                  {gameState.industryData.name} • Month {gameState.monthsInBusiness}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                Score: {calculateScore()}
              </div>
              <div className={`text-sm ${getScoreRating(calculateScore()).color}`}>
                {getScoreRating(calculateScore()).rating}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetGame}
                className="mt-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                New Game
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{gameState.completedSteps.length} / {gameSteps.length} steps</span>
            </div>
            <Progress value={(gameState.completedSteps.length / gameSteps.length) * 100} className="h-3" />
          </div>

          <div className="flex flex-wrap gap-2">
            {gameSteps.map((step) => (
              <Button
                key={step.id}
                variant={gameState.completedSteps.includes(step.id) ? "default" : 
                        gameState.currentStep === step.id ? "secondary" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => handleStepClick(step.id)}
                disabled={!gameState.completedSteps.includes(step.id) && gameState.currentStep !== step.id}
              >
                <step.icon className="w-3 h-3 mr-1" />
                {step.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <Tabs value={`step-${gameState.currentStep}`} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                {gameSteps.map((step) => (
                  <TabsTrigger 
                    key={step.id}
                    value={`step-${step.id}`}
                    className="text-xs"
                    disabled={!gameState.completedSteps.includes(step.id) && gameState.currentStep !== step.id}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {step.id + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Step 0: Choose Industry */}
              <TabsContent value="step-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Choose Your Industry
                    </CardTitle>
                    <p className="text-muted-foreground">
                      What type of business excites you the most? Each industry has different challenges, opportunities, and profit potential.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {industries.map((industry) => (
                        <Card 
                          key={industry.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                          onClick={() => handleIndustrySelect(industry)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <industry.icon className="w-6 h-6 text-primary group-hover:text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold group-hover:text-primary transition-colors">{industry.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {industry.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {industry.description}
                            </p>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Market Size:</span>
                                <span className="font-medium">{industry.marketSize}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Competition:</span>
                                <span className="font-medium">{industry.competition}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Profit Potential:</span>
                                <span className="font-medium">{industry.profitPotential}</span>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Examples:</span> {industry.examples.join(', ')}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 1: Design Product */}
              <TabsContent value="step-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Design Your Product
                    </CardTitle>
                    <p className="text-muted-foreground">
                      What will you create in the {gameState.industryData?.name} industry? Give your product a name and think about what makes it special.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Product/Service Name</label>
                        <Input
                          type="text"
                          className="text-lg p-4"
                          placeholder="Enter your product name..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              handleProductDesign(e.currentTarget.value);
                            }
                          }}
                          onChange={(e) => {
                            // Real-time validation could go here
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Press Enter when you're ready to continue
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="card-gradient hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => {}}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                              💡 Make it Unique
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              What problem does your product solve? What makes it different from competitors? Think about what would make YOU want to buy it!
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="card-gradient hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => {}}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Users className="w-4 h-4 mr-2 text-blue-500" />
                              🎯 Know Your Customers
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Who will buy your product? What do they need and want? Understanding your customers is the key to success!
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {gameState.industryData && (
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 text-primary">
                              💼 {gameState.industryData.name} Industry Insights
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Market Size:</span>
                                <span className="ml-2 font-medium">{gameState.industryData.marketSize}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Competition:</span>
                                <span className="ml-2 font-medium">{gameState.industryData.competition}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 2: Budget Decisions */}
              <TabsContent value="step-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Manage Your Starting Budget
                    </CardTitle>
                    <p className="text-muted-foreground">
                      You have ${gameState.budget} to start your business. Choose wisely - every dollar counts!
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Hire professional designer',
                          200,
                          { satisfaction: 25, customers: 15, revenue: 50 },
                          'Professional design attracts more customers'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                            Hire Professional Designer
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $200</span> | 
                            <span className="text-green-600"> +25 Satisfaction</span> | 
                            <span className="text-blue-600"> +15 Customers</span> | 
                            <span className="text-purple-600"> +$50 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Make your product look amazing with professional design that attracts customers
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'DIY design and save money',
                          75,
                          { satisfaction: 10, customers: 8, revenue: 25 },
                          'Saved money but design quality is lower'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Edit className="w-4 h-4 mr-2 text-green-500" />
                            DIY Design
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $75</span> | 
                            <span className="text-green-600"> +10 Satisfaction</span> | 
                            <span className="text-blue-600"> +8 Customers</span> | 
                            <span className="text-purple-600"> +$25 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Save money by doing the design yourself, but it might not look as professional
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Big marketing campaign',
                          300,
                          { customers: 75, revenue: 200, satisfaction: 5, marketShare: 5 },
                          'Massive reach but expensive'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Megaphone className="w-4 h-4 mr-2 text-red-500" />
                            Big Marketing Campaign
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $300</span> | 
                            <span className="text-blue-600"> +75 Customers</span> | 
                            <span className="text-purple-600"> +$200 Revenue</span> | 
                            <span className="text-orange-600"> +5% Market Share</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Spend big on TV, radio, and online ads to reach lots of people quickly
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Social media marketing',
                          125,
                          { customers: 40, revenue: 100, satisfaction: 15, marketShare: 2 },
                          'Cost-effective digital marketing'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Share2 className="w-4 h-4 mr-2 text-blue-500" />
                            Social Media Marketing
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $125</span> | 
                            <span className="text-blue-600"> +40 Customers</span> | 
                            <span className="text-purple-600"> +$100 Revenue</span> | 
                            <span className="text-green-600"> +15 Satisfaction</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Use Instagram, TikTok, and other social platforms to reach your target audience
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Focus on product quality',
                          150,
                          { satisfaction: 35, customers: 20, revenue: 75 },
                          'Premium quality builds loyal customers'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2 text-yellow-500" />
                            Focus on Quality
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $150</span> | 
                            <span className="text-green-600"> +35 Satisfaction</span> | 
                            <span className="text-blue-600"> +20 Customers</span> | 
                            <span className="text-purple-600"> +$75 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Invest in making the best possible product that customers will love and recommend
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Build minimum viable product (MVP)',
                          100,
                          { customers: 25, revenue: 50, satisfaction: 5 },
                          'Quick to market but basic features'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-orange-500" />
                            Build MVP (Minimum Viable Product)
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $100</span> | 
                            <span className="text-blue-600"> +25 Customers</span> | 
                            <span className="text-purple-600"> +$50 Revenue</span> | 
                            <span className="text-green-600"> +5 Satisfaction</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Launch quickly with basic features to test the market and get feedback
                          </p>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 3: Launch */}
              <TabsContent value="step-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      🚀 Launch Your Product!
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Time to go to market! Your launch strategy will determine how many customers you reach and how they perceive your brand.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Grand launch event',
                          250,
                          { customers: 60, satisfaction: 20, revenue: 300, marketShare: 8 },
                          'Big splash creates buzz and media attention'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                            🎉 Grand Launch Event
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $250</span> | 
                            <span className="text-blue-600"> +60 Customers</span> | 
                            <span className="text-green-600"> +20 Satisfaction</span> | 
                            <span className="text-purple-600"> +$300 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Host a big party with media, influencers, and potential customers
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Soft launch to friends and family',
                          50,
                          { customers: 25, satisfaction: 25, revenue: 125 },
                          'Safe approach with valuable feedback'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-pink-500" />
                            👥 Soft Launch
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $50</span> | 
                            <span className="text-blue-600"> +25 Customers</span> | 
                            <span className="text-green-600"> +25 Satisfaction</span> | 
                            <span className="text-purple-600"> +$125 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Start small with people you know to get honest feedback and testimonials
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Online-only launch',
                          100,
                          { customers: 80, satisfaction: 12, revenue: 200, marketShare: 3 },
                          'Digital-first approach reaches global audience'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-green-500" />
                            💻 Online Launch
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $100</span> | 
                            <span className="text-blue-600"> +80 Customers</span> | 
                            <span className="text-green-600"> +12 Satisfaction</span> | 
                            <span className="text-purple-600"> +$200 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Launch through social media, website, and online marketplaces
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Partner with influencer',
                          200,
                          { customers: 100, satisfaction: 15, revenue: 350, marketShare: 6 },
                          'Influencer credibility drives sales'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2 text-yellow-500" />
                            🌟 Influencer Partnership
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $200</span> | 
                            <span className="text-blue-600"> +100 Customers</span> | 
                            <span className="text-green-600"> +15 Satisfaction</span> | 
                            <span className="text-purple-600"> +$350 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Team up with a popular social media star who matches your target audience
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Local community launch',
                          75,
                          { customers: 35, satisfaction: 30, revenue: 150 },
                          'Strong local foundation and word-of-mouth'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            🏘️ Community Launch
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $75</span> | 
                            <span className="text-blue-600"> +35 Customers</span> | 
                            <span className="text-green-600"> +30 Satisfaction</span> | 
                            <span className="text-purple-600"> +$150 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Start in your local community where people can see and trust your product
                          </p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                        onClick={() => handleBudgetDecision(
                          'Beta test with early adopters',
                          125,
                          { customers: 30, satisfaction: 40, revenue: 100 },
                          'Perfect the product before full launch'
                        )}
                      >
                        <div className="w-full">
                          <div className="font-semibold mb-2 flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-gray-500" />
                            🧪 Beta Test Launch
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-red-600">Cost: $125</span> | 
                            <span className="text-blue-600"> +30 Customers</span> | 
                            <span className="text-green-600"> +40 Satisfaction</span> | 
                            <span className="text-purple-600"> +$100 Revenue</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Launch to a small group of enthusiastic early adopters for feedback
                          </p>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 4: Grow */}
              <TabsContent value="step-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      📈 Grow Your Business
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Your business is running! Now you need to make smart decisions to grow while handling new challenges.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Hire more employees',
                            300,
                            { customers: 40, satisfaction: 30, revenue: 200, employees: 5 },
                            'Team growth improves service quality'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Users className="w-4 h-4 mr-2 text-blue-500" />
                              👥 Hire Team Members
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $300</span> | 
                              <span className="text-blue-600"> +40 Customers</span> | 
                              <span className="text-green-600"> +30 Satisfaction</span> | 
                              <span className="text-purple-600"> +$200 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Get help to serve customers better and handle more business
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Expand to new markets',
                            250,
                            { customers: 100, satisfaction: -5, revenue: 400, marketShare: 12 },
                            'Growth brings challenges but more revenue'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Globe className="w-4 h-4 mr-2 text-green-500" />
                              🌍 Expand Markets
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $250</span> | 
                              <span className="text-blue-600"> +100 Customers</span> | 
                              <span className="text-red-600"> -5 Satisfaction</span> | 
                              <span className="text-purple-600"> +$400 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Sell in new cities, states, or countries to reach more customers
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Improve product features',
                            175,
                            { customers: 25, satisfaction: 35, revenue: 150 },
                            'Better product creates loyal customers'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                              ⚡ Improve Product
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $175</span> | 
                              <span className="text-blue-600"> +25 Customers</span> | 
                              <span className="text-green-600"> +35 Satisfaction</span> | 
                              <span className="text-purple-600"> +$150 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Add new features and improvements that customers have been requesting
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Launch loyalty program',
                            150,
                            { customers: 50, satisfaction: 25, revenue: 250 },
                            'Rewards keep customers coming back'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Award className="w-4 h-4 mr-2 text-purple-500" />
                              💎 Loyalty Program
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $150</span> | 
                              <span className="text-blue-600"> +50 Customers</span> | 
                              <span className="text-green-600"> +25 Satisfaction</span> | 
                              <span className="text-purple-600"> +$250 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Reward your best customers with points, discounts, and special perks
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Invest in customer service',
                            125,
                            { satisfaction: 45, customers: 30, revenue: 175, employees: 2 },
                            'Amazing service creates brand advocates'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                              🎧 Customer Service
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $125</span> | 
                              <span className="text-green-600"> +45 Satisfaction</span> | 
                              <span className="text-blue-600"> +30 Customers</span> | 
                              <span className="text-purple-600"> +$175 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Invest in amazing customer support that makes people love your brand
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => handleBudgetDecision(
                            'Develop new product line',
                            350,
                            { customers: 75, satisfaction: 20, revenue: 300, marketShare: 10 },
                            'Diversification reduces risk and increases revenue'
                          )}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <PlusCircle className="w-4 h-4 mr-2 text-green-500" />
                              🆕 New Product Line
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium text-red-600">Cost: $350</span> | 
                              <span className="text-blue-600"> +75 Customers</span> | 
                              <span className="text-green-600"> +20 Satisfaction</span> | 
                              <span className="text-purple-600"> +$300 Revenue</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Create a complementary product that existing customers will also want
                            </p>
                          </div>
                        </Button>
                      </div>

                      <div className="text-center pt-4">
                        <Button 
                          onClick={() => setGameState(prev => ({ 
                            ...prev, 
                            currentStep: 5, 
                            completedSteps: [...prev.completedSteps, 4],
                            monthsInBusiness: prev.monthsInBusiness + 1
                          }))}
                          variant="default"
                          size="lg"
                          className="hover:scale-105 transition-all duration-300"
                        >
                          <Briefcase className="mr-2 w-5 h-5" />
                          Ready for Investor Pitch
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 5: Pitch to Investors */}
              <TabsContent value="step-5">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      💼 Pitch to Investors
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Present your business to potential investors. Show them why they should invest in your company!
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="card-gradient p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          Your Business Performance
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div className={`transition-all duration-500 ${animatingMetrics ? 'scale-110' : ''}`}>
                            <div className="text-3xl font-bold text-green-600">${gameState.revenue}</div>
                            <div className="text-sm text-muted-foreground">Total Revenue</div>
                          </div>
                          <div className={`transition-all duration-500 ${animatingMetrics ? 'scale-110' : ''}`}>
                            <div className="text-3xl font-bold text-blue-600">{gameState.customers}</div>
                            <div className="text-sm text-muted-foreground">Happy Customers</div>
                          </div>
                          <div className={`transition-all duration-500 ${animatingMetrics ? 'scale-110' : ''}`}>
                            <div className="text-3xl font-bold text-purple-600">{gameState.satisfaction}%</div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                          </div>
                          <div className={`transition-all duration-500 ${animatingMetrics ? 'scale-110' : ''}`}>
                            <div className="text-3xl font-bold text-orange-600">{gameState.employees}</div>
                            <div className="text-sm text-muted-foreground">Team Members</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.4) + (gameState.customers * 3) + (gameState.satisfaction * 2) + (gameState.employees * 20);
                            const investment = Math.round(investorInterest * 8);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.3,
                              finalInvestment: investment,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              gameComplete: true,
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Conservative pitch: Secured $${investment} investment`,
                                impact: 'Steady growth strategy',
                                cost: 0,
                                timestamp: new Date().toLocaleTimeString()
                              }]
                            }));
                          }}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Shield className="w-4 h-4 mr-2 text-blue-500" />
                              🛡️ Conservative Pitch
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Focus on steady growth, proven results, and low risk. Appeal to cautious investors.
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.6) + (gameState.customers * 4) + (gameState.satisfaction * 3) + (gameState.employees * 25);
                            const investment = Math.round(investorInterest * 12);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.5,
                              finalInvestment: investment,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              gameComplete: true,
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Ambitious pitch: Secured $${investment} investment`,
                                impact: 'High growth, high reward strategy',
                                cost: 0,
                                timestamp: new Date().toLocaleTimeString()
                              }]
                            }));
                          }}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Rocket className="w-4 h-4 mr-2 text-red-500" />
                              🚀 Ambitious Pitch
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Promise big returns and rapid expansion. High risk, high reward approach.
                            </p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left hover:bg-primary/5 hover:border-primary transition-all duration-300"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.5) + (gameState.customers * 3.5) + (gameState.satisfaction * 4) + (gameState.employees * 30);
                            const investment = Math.round(investorInterest * 10);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.4,
                              finalInvestment: investment,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              gameComplete: true,
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Innovation pitch: Secured $${investment} investment`,
                                impact: 'Technology-focused growth strategy',
                                cost: 0,
                                timestamp: new Date().toLocaleTimeString()
                              }]
                            }));
                          }}
                        >
                          <div className="w-full">
                            <div className="font-semibold mb-2 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                              💡 Innovation Pitch
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Emphasize unique technology, innovation, and disrupting the market.
                            </p>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 6: Game Complete */}
              <TabsContent value="step-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center flex items-center justify-center">
                      <Trophy className="w-6 h-6 mr-2" />
                      🎉 Congratulations!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">🏆</div>
                      <h2 className="text-3xl font-bold">You Built a Successful Business!</h2>
                      <p className="text-xl text-muted-foreground">
                        {gameState.productName} is now a thriving company with real investors!
                      </p>
                      
                      <div className="card-gradient p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4">Final Results</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                          <div>
                            <div className="text-3xl font-bold text-green-600">${gameState.revenue}</div>
                            <div className="text-sm text-muted-foreground">Revenue</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-blue-600">{gameState.customers}</div>
                            <div className="text-sm text-muted-foreground">Customers</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-purple-600">{gameState.satisfaction}%</div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-orange-600">{gameState.employees}</div>
                            <div className="text-sm text-muted-foreground">Employees</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-primary">{calculateScore()}</div>
                            <div className="text-sm text-muted-foreground">Final Score</div>
                          </div>
                        </div>
                      </div>

                      <div className={`text-2xl font-bold ${getScoreRating(calculateScore()).color}`}>
                        {getScoreRating(calculateScore()).rating}
                      </div>
                      <p className="text-muted-foreground">
                        {getScoreRating(calculateScore()).description}
                      </p>

                      {gameState.finalInvestment > 0 && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">💰 Investment Secured!</h4>
                          <p className="text-green-700">
                            Congratulations! You secured ${gameState.finalInvestment} in investment funding. 
                            This money will help you grow your business even more!
                          </p>
                        </div>
                      )}

                      {gameState.achievements.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-3">🏆 Achievements Unlocked!</h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {gameState.achievements.map((achievementId) => {
                              const achievement = achievements.find(a => a.id === achievementId);
                              return achievement ? (
                                <Badge key={achievementId} variant="secondary" className="text-xs">
                                  {achievement.icon} {achievement.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button 
                            onClick={handleResetGame}
                            variant="default"
                            size="lg"
                            className="hover:scale-105 transition-all duration-300"
                          >
                            <Play className="mr-2 w-5 h-5" />
                            Start New Business
                          </Button>
                          <Button 
                            onClick={handleBackToMenu}
                            variant="outline"
                            size="lg"
                            className="hover:scale-105 transition-all duration-300"
                          >
                            <Home className="mr-2 w-5 h-5" />
                            Back to Menu
                          </Button>
                        </div>
                        
                        <div className="flex justify-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const gameData = {
                                productName: gameState.productName,
                                industry: gameState.industryData?.name,
                                finalScore: calculateScore(),
                                revenue: gameState.revenue,
                                customers: gameState.customers,
                                satisfaction: gameState.satisfaction,
                                achievements: gameState.achievements,
                                decisions: gameState.decisions
                              };
                              navigator.clipboard.writeText(JSON.stringify(gameData, null, 2));
                            }}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Share Results
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const results = `🏆 I just completed the Young Entrepreneur Game!\n\n` +
                                `🚀 Business: ${gameState.productName}\n` +
                                `💼 Industry: ${gameState.industryData?.name}\n` +
                                `💰 Revenue: $${gameState.revenue}\n` +
                                `👥 Customers: ${gameState.customers}\n` +
                                `⭐ Score: ${calculateScore()}\n` +
                                `🏅 Rating: ${getScoreRating(calculateScore()).rating}\n\n` +
                                `Try it yourself at Finance in Advance!`;
                              
                              if (navigator.share) {
                                navigator.share({
                                  title: 'My Entrepreneur Game Results',
                                  text: results
                                });
                              }
                            }}
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share Score
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar with Stats and Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Business Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Budget
                    </span>
                    <span className={`font-semibold ${gameState.budget < 100 ? 'text-red-600' : 'text-green-600'}`}>
                      ${gameState.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Revenue
                    </span>
                    <span className="font-semibold text-blue-600">${gameState.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Customers
                    </span>
                    <span className="font-semibold text-purple-600">{gameState.customers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      Employees
                    </span>
                    <span className="font-semibold text-orange-600">{gameState.employees}</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        Satisfaction
                      </span>
                      <span className="font-semibold">{gameState.satisfaction}%</span>
                    </div>
                    <Progress value={gameState.satisfaction} className="h-2" />
                  </div>
                  {gameState.marketShare > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <PieChart className="w-4 h-4 mr-1" />
                          Market Share
                        </span>
                        <span className="font-semibold">{gameState.marketShare}%</span>
                      </div>
                      <Progress value={gameState.marketShare} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Decisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {gameState.decisions.slice(-5).reverse().map((decision, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3 hover:bg-primary/5 p-2 rounded-r transition-all duration-300 cursor-pointer">
                      <div className="text-sm font-medium">{decision.decision}</div>
                      <div className="text-xs text-muted-foreground">{decision.impact}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {decision.timestamp}
                      </div>
                    </div>
                  ))}
                  {gameState.decisions.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No decisions made yet. Start making choices to see them here!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {gameState.achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {gameState.achievements.map((achievementId) => {
                      const achievement = achievements.find(a => a.id === achievementId);
                      return achievement ? (
                        <div key={achievementId} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                          <span className="text-lg">{achievement.icon}</span>
                          <div>
                            <div className="font-semibold text-sm">{achievement.name}</div>
                            <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learning Corner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="cursor-pointer hover:bg-primary/5 p-2 rounded transition-all duration-300" onClick={() => {}}>
                    <h4 className="font-semibold text-sm text-primary">What is Revenue?</h4>
                    <p className="text-xs text-muted-foreground">
                      Revenue is all the money your business makes from selling products or services. It's different from profit!
                    </p>
                  </div>
                  <div className="cursor-pointer hover:bg-primary/5 p-2 rounded transition-all duration-300" onClick={() => {}}>
                    <h4 className="font-semibold text-sm text-primary">Why Budget Matters</h4>
                    <p className="text-xs text-muted-foreground">
                      Your budget is how much money you can spend. Spend wisely to grow your business without running out of money!
                    </p>
                  </div>
                  <div className="cursor-pointer hover:bg-primary/5 p-2 rounded transition-all duration-300" onClick={() => {}}>
                    <h4 className="font-semibold text-sm text-primary">Customer Satisfaction</h4>
                    <p className="text-xs text-muted-foreground">
                      Happy customers buy more, recommend you to friends, and stay loyal to your brand.
                    </p>
                  </div>
                  <div className="cursor-pointer hover:bg-primary/5 p-2 rounded transition-all duration-300" onClick={() => {}}>
                    <h4 className="font-semibold text-sm text-primary">Market Share</h4>
                    <p className="text-xs text-muted-foreground">
                      This shows what percentage of the total market your business controls. Higher is better!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {gameState.events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Event History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {gameState.events.map((event) => (
                      <div key={event.id} className="flex items-center gap-2 p-2 rounded border border-border/50">
                        {event.type === 'challenge' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        {event.type === 'opportunity' && <Star className="w-4 h-4 text-yellow-500" />}
                        {event.type === 'neutral' && <Zap className="w-4 h-4 text-blue-500" />}
                        <div>
                          <div className="text-sm font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">Resolved ✓</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurshipGame;