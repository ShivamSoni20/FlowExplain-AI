import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductDemo } from '@/components/ProductDemo';
import { 
  Cpu, 
  ArrowRight, 
  Zap, 
  GitBranch, 
  FileJson, 
  Sparkles,
  CheckCircle2,
  Play
} from 'lucide-react';

const features = [
  {
    icon: FileJson,
    title: 'Paste Any Workflow',
    description: 'Simply paste your workflow JSON and let our AI analyze it instantly.',
  },
  {
    icon: GitBranch,
    title: 'Step-by-Step Breakdown',
    description: 'Get a detailed explanation of each step in your automation flow.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Understand triggers, use cases, and complexity levels in seconds.',
  },
];

const supportedPlatforms = [
  { name: 'n8n', color: 'bg-success' },
  { name: 'Make', color: 'bg-primary' },
  { name: 'Zapier', color: 'bg-warning' },
];

const Landing = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Product Demo Modal */}
      <ProductDemo isOpen={showDemo} onClose={() => setShowDemo(false)} />

      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-xl bg-primary/10 border border-primary/20 glow-subtle">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Workflow Explainer</span>
            </div>
            <Link to="/app">
              <Button variant="outline" size="sm" className="gap-2">
                Open App
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-[1]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-mono mb-8 opacity-0 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            AI-Powered Analysis
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Understand Your{' '}
            <span className="text-primary text-glow">Automation</span>{' '}
            Workflows
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
            Paste any workflow JSON and get instant, AI-powered explanations. 
            Perfect for documentation, onboarding, and debugging.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link to="/app">
              <Button size="lg" className="gap-2 h-12 px-8 text-base glow-primary">
                <Cpu className="h-5 w-5" />
                Try It Free
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 h-12 px-8 text-base"
              onClick={() => setShowDemo(true)}
            >
              <Play className="h-5 w-5" />
              View Demo
            </Button>
          </div>

          {/* Supported Platforms */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-mono opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <span className="text-muted-foreground/60">Supports:</span>
            {supportedPlatforms.map((platform) => (
              <span key={platform.name} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${platform.color}`} />
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-[1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-up">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Three simple steps to understand any automation workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="relative p-6 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group opacity-0 animate-fade-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-mono font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4 group-hover:glow-subtle transition-all">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 relative z-[1]">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-card/80 border border-border/60 backdrop-blur-sm corner-decoration">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Built for{' '}
                  <span className="text-primary">Automation Engineers</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whether you're onboarding team members, documenting complex workflows, 
                  or debugging automation logic — we've got you covered.
                </p>
                <Link to="/app">
                  <Button className="gap-2 glow-subtle">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  'Instant AI-powered analysis',
                  'Complexity assessment',
                  'Maintenance recommendations',
                  'Step-by-step breakdowns',
                ].map((benefit) => (
                  <div 
                    key={benefit}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/40"
                  >
                    <div className="p-1 rounded-md bg-success/10">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-[1]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to analyze?</h2>
          <p className="text-muted-foreground mb-8">
            Start understanding your workflows in seconds.
          </p>
          <Link to="/app">
            <Button size="lg" className="gap-2 h-12 px-10 text-base glow-primary">
              <Cpu className="h-5 w-5" />
              Launch Workflow Explainer
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-auto relative z-[1]">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground/70 font-mono tracking-wide">
            <span className="text-primary">▸</span> workflow.explain() <span className="text-muted-foreground/40">// powered by AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
