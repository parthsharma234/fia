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
  Star,
  Trophy,
  Coins,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface GameState {
  currentStep: number;
  industry: string;
  productName: string;
  budget: number;
  revenue: number;
  customers: number;
  satisfaction: number;
  marketShare: number;
  decisions: Array<{
    step: number;
    decision: string;
    impact: string;
    cost: number;
  }>;
  events: Array<{
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
      };
    }>;
  }>;
  completedSteps: number[];
}

const EntrepreneurshipGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    industry: '',
    productName: '',
    budget: 500,
    revenue: 0,
    customers: 0,
    satisfaction: 50,
    marketShare: 0,
    decisions: [],
    events: [],
    completedSteps: []
  });

  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const industries = [
    {
      id: 'tech',
      name: 'Tech App',
      icon: Smartphone,
      description: 'Create a mobile app that solves problems',
      examples: ['Social media app', 'Gaming app', 'Learning app'],
      startingCosts: { development: 200, marketing: 100 },
      difficulty: 'Medium'
    },
    {
      id: 'food',
      name: 'Food Business',
      icon: Coffee,
      description: 'Start a food-related business',
      examples: ['Food truck', 'Bakery', 'Healthy snacks'],
      startingCosts: { supplies: 150, equipment: 200 },
      difficulty: 'Easy'
    },
    {
      id: 'clothing',
      name: 'Clothing Brand',
      icon: Shirt,
      description: 'Design and sell clothing or accessories',
      examples: ['T-shirt brand', 'Jewelry', 'Sneakers'],
      startingCosts: { design: 100, production: 200 },
      difficulty: 'Medium'
    },
    {
      id: 'eco',
      name: 'Eco Products',
      icon: Leaf,
      description: 'Create environmentally friendly products',
      examples: ['Reusable bottles', 'Solar gadgets', 'Recycled items'],
      startingCosts: { research: 150, materials: 150 },
      difficulty: 'Hard'
    },
    {
      id: 'services',
      name: 'Services',
      icon: Users,
      description: 'Offer services to help people',
      examples: ['Tutoring', 'Pet sitting', 'Lawn care'],
      startingCosts: { advertising: 50, supplies: 100 },
      difficulty: 'Easy'
    }
  ];

  const gameSteps = [
    { id: 0, title: 'Choose Industry', description: 'Pick what type of business you want to start' },
    { id: 1, title: 'Design Product', description: 'Create your product or service' },
    { id: 2, title: 'Set Budget', description: 'Decide how to spend your starting money' },
    { id: 3, title: 'Launch', description: 'Bring your product to market' },
    { id: 4, title: 'Grow', description: 'Scale your business and handle challenges' },
    { id: 5, title: 'Pitch', description: 'Present to investors for funding' }
  ];

  const generateRandomEvent = () => {
    const events = [
      {
        id: 1,
        title: 'Competitor Alert!',
        description: 'A big company just launched a similar product. How do you respond?',
        type: 'challenge' as const,
        choices: [
          {
            text: 'Lower our prices to compete',
            cost: 0,
            impact: { revenue: -50, customers: 20, satisfaction: -10 }
          },
          {
            text: 'Improve our product features',
            cost: 100,
            impact: { satisfaction: 20, customers: 10 }
          },
          {
            text: 'Focus on better customer service',
            cost: 50,
            impact: { satisfaction: 25, customers: 15 }
          }
        ]
      },
      {
        id: 2,
        title: 'Viral Moment!',
        description: 'Your product went viral on social media! How do you handle the sudden attention?',
        type: 'opportunity' as const,
        choices: [
          {
            text: 'Quickly increase production',
            cost: 150,
            impact: { revenue: 200, customers: 100, satisfaction: -5 }
          },
          {
            text: 'Keep current pace and maintain quality',
            cost: 0,
            impact: { revenue: 100, customers: 50, satisfaction: 10 }
          },
          {
            text: 'Partner with influencers for more promotion',
            cost: 100,
            impact: { revenue: 150, customers: 80, satisfaction: 5 }
          }
        ]
      },
      {
        id: 3,
        title: 'Supply Chain Issue',
        description: 'Your supplier is having problems. What\'s your backup plan?',
        type: 'challenge' as const,
        choices: [
          {
            text: 'Find a new supplier quickly',
            cost: 75,
            impact: { revenue: -25, satisfaction: -5 }
          },
          {
            text: 'Wait for current supplier to fix issues',
            cost: 0,
            impact: { revenue: -50, customers: -20, satisfaction: -15 }
          },
          {
            text: 'Make the product yourself temporarily',
            cost: 100,
            impact: { revenue: -10, satisfaction: 10 }
          }
        ]
      }
    ];

    return events[Math.floor(Math.random() * events.length)];
  };

  const handleIndustrySelect = (industry: any) => {
    setGameState(prev => ({
      ...prev,
      industry: industry.id,
      currentStep: 1,
      completedSteps: [...prev.completedSteps, 0]
    }));
  };

  const handleProductDesign = (productName: string) => {
    setGameState(prev => ({
      ...prev,
      productName,
      currentStep: 2,
      completedSteps: [...prev.completedSteps, 1]
    }));
  };

  const handleBudgetDecision = (decision: string, cost: number, impact: any) => {
    setGameState(prev => ({
      ...prev,
      budget: prev.budget - cost,
      ...impact,
      decisions: [...prev.decisions, {
        step: prev.currentStep,
        decision,
        impact: `Spent $${cost}`,
        cost
      }],
      currentStep: prev.currentStep + 1,
      completedSteps: [...prev.completedSteps, prev.currentStep]
    }));

    // Trigger random events occasionally
    if (Math.random() < 0.3) {
      const event = generateRandomEvent();
      setCurrentEvent(event);
      setShowEvent(true);
    }
  };

  const handleEventChoice = (choice: any) => {
    setGameState(prev => ({
      ...prev,
      budget: Math.max(0, prev.budget - choice.cost),
      revenue: Math.max(0, prev.revenue + (choice.impact.revenue || 0)),
      customers: Math.max(0, prev.customers + (choice.impact.customers || 0)),
      satisfaction: Math.max(0, Math.min(100, prev.satisfaction + (choice.impact.satisfaction || 0))),
      decisions: [...prev.decisions, {
        step: prev.currentStep,
        decision: choice.text,
        impact: `Cost: $${choice.cost}`,
        cost: choice.cost
      }]
    }));
    setShowEvent(false);
    setCurrentEvent(null);
  };

  const calculateScore = () => {
    const { revenue, customers, satisfaction, budget } = gameState;
    return Math.round((revenue * 0.4) + (customers * 0.3) + (satisfaction * 0.2) + (budget * 0.1));
  };

  const getScoreRating = (score: number) => {
    if (score >= 800) return { rating: 'Unicorn Startup!', color: 'text-purple-600', icon: '🦄' };
    if (score >= 600) return { rating: 'Successful Business!', color: 'text-green-600', icon: '🚀' };
    if (score >= 400) return { rating: 'Growing Company!', color: 'text-blue-600', icon: '📈' };
    if (score >= 200) return { rating: 'Learning Experience!', color: 'text-yellow-600', icon: '📚' };
    return { rating: 'Keep Trying!', color: 'text-red-600', icon: '💪' };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Young Entrepreneur Game
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build your own startup from scratch! Make real business decisions, handle challenges, 
              and learn what it takes to be an entrepreneur.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-gradient p-6 rounded-xl">
                <Target className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Learn by Doing</h3>
                <p className="text-sm text-muted-foreground">Make real business decisions and see the results</p>
              </div>
              <div className="card-gradient p-6 rounded-xl">
                <BarChart3 className="w-8 h-8 text-secondary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Watch your business grow with real metrics</p>
              </div>
              <div className="card-gradient p-6 rounded-xl">
                <Trophy className="w-8 h-8 text-accent mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Earn Your Score</h3>
                <p className="text-sm text-muted-foreground">Get rated on your entrepreneurial skills</p>
              </div>
            </div>

            <Button 
              onClick={() => {
                console.log('Start button clicked!');
                setGameStarted(true);
              }}
              variant="default" 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Business Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Event Modal
  if (showEvent && currentEvent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              {currentEvent.type === 'challenge' && <AlertTriangle className="w-6 h-6 text-red-500" />}
              {currentEvent.type === 'opportunity' && <Star className="w-6 h-6 text-yellow-500" />}
              {currentEvent.type === 'neutral' && <Zap className="w-6 h-6 text-blue-500" />}
              <CardTitle className="text-xl">{currentEvent.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{currentEvent.description}</p>
            <div className="space-y-3">
              {currentEvent.choices.map((choice: any, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handleEventChoice(choice)}
                >
                  <div>
                    <div className="font-semibold mb-1">{choice.text}</div>
                    <div className="text-sm text-muted-foreground">
                      Cost: ${choice.cost} | 
                      {choice.impact.revenue && ` Revenue: ${choice.impact.revenue > 0 ? '+' : ''}${choice.impact.revenue}`}
                      {choice.impact.customers && ` | Customers: ${choice.impact.customers > 0 ? '+' : ''}${choice.impact.customers}`}
                      {choice.impact.satisfaction && ` | Satisfaction: ${choice.impact.satisfaction > 0 ? '+' : ''}${choice.impact.satisfaction}`}
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
            <h1 className="text-3xl font-bold text-foreground">
              {gameState.productName || 'Your Startup'}
            </h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                Score: {calculateScore()}
              </div>
              <div className={`text-sm ${getScoreRating(calculateScore()).color}`}>
                {getScoreRating(calculateScore()).icon} {getScoreRating(calculateScore()).rating}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{gameState.completedSteps.length} / {gameSteps.length} steps</span>
            </div>
            <Progress value={(gameState.completedSteps.length / gameSteps.length) * 100} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2">
            {gameSteps.map((step) => (
              <Badge 
                key={step.id}
                variant={gameState.completedSteps.includes(step.id) ? "default" : 
                        gameState.currentStep === step.id ? "secondary" : "outline"}
                className="text-xs"
              >
                {step.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <Tabs value={`step-${gameState.currentStep}`} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                {gameSteps.map((step) => (
                  <TabsTrigger 
                    key={step.id}
                    value={`step-${step.id}`}
                    className="text-xs"
                    disabled={!gameState.completedSteps.includes(step.id) && gameState.currentStep !== step.id}
                  >
                    {step.id + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Step 0: Choose Industry */}
              <TabsContent value="step-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Industry</CardTitle>
                    <p className="text-muted-foreground">
                      What type of business excites you the most? Each industry has different challenges and opportunities.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {industries.map((industry) => (
                        <Card 
                          key={industry.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                          onClick={() => handleIndustrySelect(industry)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <industry.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{industry.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {industry.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {industry.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Examples: {industry.examples.join(', ')}
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
                    <CardTitle>Design Your Product</CardTitle>
                    <p className="text-muted-foreground">
                      What will you create? Give your product a name and think about what makes it special.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Product Name</label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg"
                          placeholder="Enter your product name..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value) {
                              handleProductDesign(e.currentTarget.value);
                            }
                          }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card-gradient p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">💡 Tip: Make it Unique</h4>
                          <p className="text-sm text-muted-foreground">
                            What problem does your product solve? What makes it different from competitors?
                          </p>
                        </div>
                        <div className="card-gradient p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">🎯 Think About Your Customers</h4>
                          <p className="text-sm text-muted-foreground">
                            Who will buy your product? What do they need and want?
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 2: Budget Decisions */}
              <TabsContent value="step-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Your Budget</CardTitle>
                    <p className="text-muted-foreground">
                      You have ${gameState.budget} to start. How will you spend it wisely?
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Hire professional designer',
                          150,
                          { satisfaction: 20, customers: 10 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">Hire Professional Designer</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $150 | +20 Satisfaction, +10 Customers
                          </div>
                          <p className="text-xs">Make your product look amazing with professional design</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'DIY design and save money',
                          50,
                          { satisfaction: 5, customers: 5 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">DIY Design</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $50 | +5 Satisfaction, +5 Customers
                          </div>
                          <p className="text-xs">Save money by doing the design yourself</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Big marketing campaign',
                          200,
                          { customers: 50, revenue: 100 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">Big Marketing Campaign</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $200 | +50 Customers, +$100 Revenue
                          </div>
                          <p className="text-xs">Spend big on ads to reach lots of people</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Social media marketing',
                          75,
                          { customers: 25, revenue: 50 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">Social Media Marketing</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $75 | +25 Customers, +$50 Revenue
                          </div>
                          <p className="text-xs">Use Instagram, TikTok, and other social platforms</p>
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
                    <CardTitle>🚀 Launch Your Product!</CardTitle>
                    <p className="text-muted-foreground">
                      Time to go to market! Choose your launch strategy carefully.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Grand launch event',
                          100,
                          { customers: 30, satisfaction: 15, revenue: 150 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">🎉 Grand Launch Event</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $100 | +30 Customers, +15 Satisfaction, +$150 Revenue
                          </div>
                          <p className="text-xs">Host a big party to announce your product</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Soft launch to friends and family',
                          25,
                          { customers: 15, satisfaction: 10, revenue: 75 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">👥 Soft Launch</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $25 | +15 Customers, +10 Satisfaction, +$75 Revenue
                          </div>
                          <p className="text-xs">Start small with people you know</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Online-only launch',
                          50,
                          { customers: 40, satisfaction: 8, revenue: 100 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">💻 Online Launch</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $50 | +40 Customers, +8 Satisfaction, +$100 Revenue
                          </div>
                          <p className="text-xs">Launch through social media and websites</p>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="p-6 h-auto text-left"
                        onClick={() => handleBudgetDecision(
                          'Partner with influencer',
                          150,
                          { customers: 60, satisfaction: 12, revenue: 200 }
                        )}
                      >
                        <div>
                          <div className="font-semibold mb-2">🌟 Influencer Partnership</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Cost: $150 | +60 Customers, +12 Satisfaction, +$200 Revenue
                          </div>
                          <p className="text-xs">Team up with a popular social media star</p>
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
                    <CardTitle>📈 Grow Your Business</CardTitle>
                    <p className="text-muted-foreground">
                      Your business is running! How will you handle growth challenges?
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => handleBudgetDecision(
                            'Hire more employees',
                            200,
                            { customers: 20, satisfaction: 25, revenue: 100 }
                          )}
                        >
                          <div>
                            <div className="font-semibold mb-2">👥 Hire Team Members</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Cost: $200 | +20 Customers, +25 Satisfaction, +$100 Revenue
                            </div>
                            <p className="text-xs">Get help to serve customers better</p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => handleBudgetDecision(
                            'Expand to new markets',
                            150,
                            { customers: 50, satisfaction: -5, revenue: 200 }
                          )}
                        >
                          <div>
                            <div className="font-semibold mb-2">🌍 Expand Markets</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Cost: $150 | +50 Customers, -5 Satisfaction, +$200 Revenue
                            </div>
                            <p className="text-xs">Sell in new cities or countries</p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => handleBudgetDecision(
                            'Improve product quality',
                            100,
                            { customers: 10, satisfaction: 30, revenue: 50 }
                          )}
                        >
                          <div>
                            <div className="font-semibold mb-2">⚡ Improve Quality</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Cost: $100 | +10 Customers, +30 Satisfaction, +$50 Revenue
                            </div>
                            <p className="text-xs">Make your product even better</p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => handleBudgetDecision(
                            'Launch loyalty program',
                            75,
                            { customers: 25, satisfaction: 20, revenue: 125 }
                          )}
                        >
                          <div>
                            <div className="font-semibold mb-2">💎 Loyalty Program</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Cost: $75 | +25 Customers, +20 Satisfaction, +$125 Revenue
                            </div>
                            <p className="text-xs">Reward your best customers</p>
                          </div>
                        </Button>
                      </div>

                      <div className="text-center pt-4">
                        <Button 
                          onClick={() => setGameState(prev => ({ ...prev, currentStep: 5, completedSteps: [...prev.completedSteps, 4] }))}
                          variant="default"
                          size="lg"
                        >
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
                    <CardTitle>💼 Pitch to Investors</CardTitle>
                    <p className="text-muted-foreground">
                      Present your business to potential investors. Show them why they should invest!
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="card-gradient p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4">Your Business Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-600">${gameState.revenue}</div>
                            <div className="text-sm text-muted-foreground">Total Revenue</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{gameState.customers}</div>
                            <div className="text-sm text-muted-foreground">Customers</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600">{gameState.satisfaction}%</div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-600">${gameState.budget}</div>
                            <div className="text-sm text-muted-foreground">Remaining Budget</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.3) + (gameState.customers * 2) + (gameState.satisfaction * 1.5);
                            const investment = Math.round(investorInterest * 10);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.5,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Secured $${investment} investment!`,
                                impact: 'Game Complete!',
                                cost: 0
                              }]
                            }));
                          }}
                        >
                          <div>
                            <div className="font-semibold mb-2">🎯 Conservative Pitch</div>
                            <p className="text-xs">Focus on steady growth and reliability</p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.5) + (gameState.customers * 3) + (gameState.satisfaction * 2);
                            const investment = Math.round(investorInterest * 15);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.7,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Secured $${investment} investment!`,
                                impact: 'Game Complete!',
                                cost: 0
                              }]
                            }));
                          }}
                        >
                          <div>
                            <div className="font-semibold mb-2">🚀 Ambitious Pitch</div>
                            <p className="text-xs">Promise big returns and rapid expansion</p>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="p-6 h-auto text-left"
                          onClick={() => {
                            const investorInterest = (gameState.revenue * 0.4) + (gameState.customers * 2.5) + (gameState.satisfaction * 3);
                            const investment = Math.round(investorInterest * 12);
                            setGameState(prev => ({ 
                              ...prev, 
                              budget: prev.budget + investment,
                              revenue: prev.revenue + investment * 0.6,
                              currentStep: 6,
                              completedSteps: [...prev.completedSteps, 5],
                              decisions: [...prev.decisions, {
                                step: 5,
                                decision: `Secured $${investment} investment!`,
                                impact: 'Game Complete!',
                                cost: 0
                              }]
                            }));
                          }}
                        >
                          <div>
                            <div className="font-semibold mb-2">💡 Innovation Pitch</div>
                            <p className="text-xs">Emphasize unique features and technology</p>
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
                    <CardTitle className="text-center">🎉 Congratulations!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      <div className="text-6xl mb-4">🏆</div>
                      <h2 className="text-3xl font-bold">You Built a Successful Business!</h2>
                      <p className="text-xl text-muted-foreground">
                        {gameState.productName} is now a thriving company!
                      </p>
                      
                      <div className="card-gradient p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4">Final Results</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">${gameState.revenue}</div>
                            <div className="text-sm text-muted-foreground">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{gameState.customers}</div>
                            <div className="text-sm text-muted-foreground">Customers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{gameState.satisfaction}%</div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{calculateScore()}</div>
                            <div className="text-sm text-muted-foreground">Final Score</div>
                          </div>
                        </div>
                      </div>

                      <div className={`text-2xl font-bold ${getScoreRating(calculateScore()).color}`}>
                        {getScoreRating(calculateScore()).icon} {getScoreRating(calculateScore()).rating}
                      </div>

                      <div className="space-y-2">
                        <Button 
                          onClick={() => {
                            setGameState({
                              currentStep: 0,
                              industry: '',
                              productName: '',
                              budget: 500,
                              revenue: 0,
                              customers: 0,
                              satisfaction: 50,
                              marketShare: 0,
                              decisions: [],
                              events: [],
                              completedSteps: []
                            });
                          }}
                          variant="default"
                          size="lg"
                        >
                          Start New Business
                        </Button>
                        <Button 
                          onClick={() => setGameStarted(false)}
                          variant="outline"
                          size="lg"
                        >
                          Back to Menu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar with Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Business Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <span className="font-semibold text-green-600">${gameState.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="font-semibold text-blue-600">${gameState.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Customers</span>
                    <span className="font-semibold text-purple-600">{gameState.customers}</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Satisfaction</span>
                      <span className="font-semibold">{gameState.satisfaction}%</span>
                    </div>
                    <Progress value={gameState.satisfaction} className="h-2" />
                  </div>
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
                <div className="space-y-3">
                  {gameState.decisions.slice(-3).map((decision, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3">
                      <div className="text-sm font-medium">{decision.decision}</div>
                      <div className="text-xs text-muted-foreground">{decision.impact}</div>
                    </div>
                  ))}
                  {gameState.decisions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No decisions made yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learning Corner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-primary">What is Revenue?</h4>
                    <p className="text-xs text-muted-foreground">
                      Revenue is all the money your business makes from selling products or services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-primary">Why Budget Matters</h4>
                    <p className="text-xs text-muted-foreground">
                      Your budget is how much money you can spend. Spend wisely to grow your business!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurshipGame;