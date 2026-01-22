import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Cpu, Sparkles, Play, ArrowRight, FileJson, Zap, GitBranch, CheckCircle2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCENE_DURATIONS = [3500, 5500, 3500, 4500, 6500, 3500, 3500];

// Sample JSON for the demo
const sampleJson = `{
  "name": "AI Decision Engine",
  "nodes": [
    { "type": "webhook", "name": "Receive Request" },
    { "type": "function", "name": "Apply Rules" },
    { "type": "openai", "name": "AI Reasoning" },
    { "type": "respond", "name": "Return Decision" }
  ]
}`;

// Workflow nodes for visualization
const workflowNodes = [
  { id: 1, name: 'Webhook', icon: Zap, x: 10, y: 40 },
  { id: 2, name: 'Business Rules', icon: GitBranch, x: 35, y: 40 },
  { id: 3, name: 'AI Processing', icon: Sparkles, x: 60, y: 40 },
  { id: 4, name: 'Response', icon: Target, x: 85, y: 40 },
];

// Explanation steps
const explanationSteps = [
  'Webhook receives incoming POST request',
  'Business rules evaluate customer type and amount',
  'AI model applies contextual reasoning',
  'Structured decision returned to caller',
];

export function ProductDemo({ isOpen, onClose }: ProductDemoProps) {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTryFree = () => {
    onClose();
    navigate('/app');
  };

  const startDemo = useCallback(() => {
    setCurrentScene(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCurrentScene(0);
      setIsPlaying(false);
      return;
    }
    // Auto-start when opened
    const timer = setTimeout(() => startDemo(), 500);
    return () => clearTimeout(timer);
  }, [isOpen, startDemo]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentScene >= SCENE_DURATIONS.length) {
      // Loop back
      setTimeout(() => {
        setCurrentScene(0);
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentScene((prev) => prev + 1);
    }, SCENE_DURATIONS[currentScene]);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentScene + 1) / SCENE_DURATIONS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Demo container */}
        <div
          className="relative w-full max-w-5xl aspect-video mx-4 rounded-2xl bg-card border border-border/60 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scene 0: Introduction */}
          <AnimatePresence mode="wait">
            {currentScene === 0 && (
              <Scene0Introduction key="scene0" />
            )}

            {/* Scene 1: User Input */}
            {currentScene === 1 && (
              <Scene1UserInput key="scene1" sampleJson={sampleJson} />
            )}

            {/* Scene 2: Action Trigger */}
            {currentScene === 2 && (
              <Scene2ActionTrigger key="scene2" />
            )}

            {/* Scene 3: AI Processing */}
            {currentScene === 3 && (
              <Scene3Processing key="scene3" nodes={workflowNodes} />
            )}

            {/* Scene 4: Explanation Output */}
            {currentScene === 4 && (
              <Scene4Output key="scene4" steps={explanationSteps} />
            )}

            {/* Scene 5: Key Value Highlight */}
            {currentScene === 5 && (
              <Scene5Highlights key="scene5" />
            )}

            {/* Scene 6: Closing */}
            {currentScene === 6 && (
              <Scene6Closing key="scene6" onTryFree={handleTryFree} />
            )}
          </AnimatePresence>

          {/* Scene indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {SCENE_DURATIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition-colors ${i === currentScene ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Scene 0: Introduction
function Scene0Introduction() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{ top: `${20 + i * 15}%`, width: '100%' }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative p-4 rounded-2xl bg-primary/10 border border-primary/30 mb-6"
      >
        <Cpu className="h-12 w-12 text-primary" />
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-center"
      >
        FlowExplain Ai <span className="text-primary">AI</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-muted-foreground text-center max-w-md"
      >
        Turn complex n8n workflows into clear explanations
      </motion.p>
    </motion.div>
  );
}

// Scene 1: User Input
function Scene1UserInput({ sampleJson }: { sampleJson: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= sampleJson.length) {
        setDisplayedText(sampleJson.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [sampleJson]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-muted/50 rounded-xl border border-border/60 overflow-hidden"
        >
          {/* Editor header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
            <FileJson className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Workflow JSON</span>
            <div className="ml-auto flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
            </div>
          </div>

          {/* Code area */}
          <div className="p-4 font-mono text-sm min-h-[200px] relative">
            <pre className="text-foreground whitespace-pre-wrap">
              <code>
                {displayedText.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-muted-foreground/50 w-6 mr-4 text-right select-none">{i + 1}</span>
                    <span>
                      {line.split(/("[^"]*")/g).map((part, j) =>
                        part.startsWith('"') ? (
                          <span key={j} className="text-primary">{part}</span>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
            {/* Cursor */}
            <motion.span
              className="inline-block w-2 h-5 bg-primary ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-muted-foreground mt-4 text-sm"
        >
          Paste your workflow JSON into the editor
        </motion.p>
      </div>
    </motion.div>
  );
}

// Scene 2: Action Trigger
function Scene2ActionTrigger() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <motion.button
          className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all ${isLoading
              ? 'bg-primary/80 text-primary-foreground'
              : 'bg-primary text-primary-foreground glow-primary'
            }`}
          animate={!isLoading ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isLoading ? (
            <>
              <motion.div
                className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Analyzing...
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Explain Workflow
            </>
          )}
        </motion.button>

        {/* Click indicator */}
        {!isLoading && (
          <motion.div
            className="absolute -bottom-2 -right-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full" />
              </div>
              <motion.div
                className="absolute inset-0 bg-foreground/50 rounded-full"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Processing animation */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex gap-2"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [-5, 5, -5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Scene 3: AI Processing
function Scene3Processing({ nodes }: { nodes: typeof workflowNodes }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground mb-8 font-mono"
      >
        Analyzing workflow structure...
      </motion.p>

      <div className="relative w-full max-w-3xl h-32">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {nodes.slice(0, -1).map((node, i) => (
            <motion.line
              key={i}
              x1={`${node.x + 5}%`}
              y1="50%"
              x2={`${nodes[i + 1].x - 5}%`}
              y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: i * 0.3 + 0.5, duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.3, type: 'spring' }}
          >
            <div className="relative">
              <div className="p-4 rounded-xl bg-card border border-primary/40 shadow-lg">
                <node.icon className="h-6 w-6 text-primary" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ delay: i * 0.3 + 0.5, duration: 1, repeat: Infinity }}
              />
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 + 0.3 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
              >
                {node.name}
              </motion.p>
            </div>
          </motion.div>
        ))}

        {/* Data flow animation */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg"
          style={{ boxShadow: '0 0 20px hsl(var(--primary))' }}
          animate={{ left: ['5%', '90%'] }}
          transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

// Scene 4: Explanation Output
function Scene4Output({ steps }: { steps: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center p-8"
    >
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-card/80 rounded-xl border border-border/60 overflow-hidden"
      >
        {/* Summary header */}
        <div className="p-4 border-b border-border/60">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Workflow Summary</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered decision engine with rule-based preprocessing
              </p>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
            Execution Flow
          </p>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.3 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
            >
              <div className="h-6 w-6 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-mono font-bold text-primary">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span className="text-sm">{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Info cards */}
        <div className="p-4 pt-0 grid grid-cols-2 gap-3">
          {[
            { label: 'Trigger', value: 'Webhook POST' },
            { label: 'Complexity', value: 'Medium' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 + i * 0.2 }}
              className="p-3 rounded-lg bg-muted/20 border border-border/40"
            >
              <p className="text-xs text-muted-foreground font-mono">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Scene 5: Key Value Highlights
function Scene5Highlights() {
  const highlights = [
    { icon: GitBranch, text: 'Node-by-node explanation' },
    { icon: FileJson, text: 'Auto-generated documentation' },
    { icon: CheckCircle2, text: 'Developer & business friendly' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.3, type: 'spring' }}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/30"
          >
            <item.icon className="h-6 w-6 text-primary" />
            <span className="font-medium">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Scene 6: Closing
function Scene6Closing({ onTryFree }: { onTryFree: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
          <Cpu className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">FlowExplain Ai</h2>
      </motion.div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-muted-foreground mb-8"
      >
        Understand any workflow instantly
      </motion.p>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onTryFree}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Try It Free
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
