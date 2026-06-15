"use client";

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Shield, Wallet, GraduationCap, ChevronDown, ChevronRight,
  Sun, Moon, Star, Award, ExternalLink, Mail, Linkedin, Download,
  CheckCircle2, Lock, Unlock, Lightbulb, AlertTriangle, Terminal,
  ArrowRight, Coins, Blocks, Send, Eye, EyeOff, Copy, RefreshCw,
  Info, MessageCircle, X, Menu, Zap, Globe, Code, Trophy, Rocket,
  ChevronUp, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { learningModules, levelInfo, type LearningModule } from "@/data/learning-modules";
import { cryptoTips, cryptoNews2026, faqItems, creatorBio, techStack } from "@/data/content";
import { createDemoWallet, mockTransfer, type DemoWallet } from "@/lib/wallet-demo";
import { useTheme } from "next-themes";

// ==================== LOCAL STORAGE HELPER ====================
function loadProgress(): { completedModules: number[]; completedTopics: Record<number, number[]> } {
  try {
    const saved = localStorage.getItem("cryptoeduty-progress");
    if (saved) {
      const data = JSON.parse(saved);
      return { completedModules: data.completedModules || [], completedTopics: data.completedTopics || {} };
    }
  } catch {}
  return { completedModules: [], completedTopics: {} };
}

// ==================== PROGRESS HOOK ====================
function useProgress() {
  const [completedModules, setCompletedModules] = useState<number[]>(() => loadProgress().completedModules);
  const [completedTopics, setCompletedTopics] = useState<Record<number, number[]>>(() => loadProgress().completedTopics);

  const save = useCallback((mods: number[], tops: Record<number, number[]>) => {
    try {
      localStorage.setItem("cryptoeduty-progress", JSON.stringify({
        completedModules: mods,
        completedTopics: tops,
      }));
    } catch {}
  }, []);

  const toggleTopic = useCallback((moduleId: number, topicIndex: number) => {
    setCompletedTopics(prev => {
      const current = prev[moduleId] || [];
      const updated = current.includes(topicIndex)
        ? current.filter(i => i !== topicIndex)
        : [...current, topicIndex];
      const newTopics = { ...prev, [moduleId]: updated };
      const mod = learningModules.find(m => m.id === moduleId);
      const newCompleted = mod && updated.length === mod.topics.length
        ? [...new Set([...completedModules, moduleId])]
        : completedModules.filter(id => id !== moduleId || (learningModules.find(m => m.id === id)?.topics.length || 0) === (newTopics[id]?.length || 0));
      setCompletedModules(newCompleted);
      save(newCompleted, newTopics);
      return newTopics;
    });
  }, [completedModules, save]);

  const resetProgress = useCallback(() => {
    setCompletedModules([]);
    setCompletedTopics({});
    save([], {});
  }, [save]);

  const totalTopics = learningModules.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = Object.values(completedTopics).reduce((acc, arr) => acc + arr.length, 0);
  const progressPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  return { completedModules, completedTopics, toggleTopic, resetProgress, progressPercent, totalTopics, completedTopicsCount };
}

// ==================== SECTION HEADER ====================
function SectionHeader({ icon: Icon, title, subtitle, color = "#2d7cff" }: { icon: React.ElementType; title: string; subtitle?: string; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 md:mb-12"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} />
        <span className="text-sm font-semibold tracking-wide uppercase" style={{ color }}>{title}</span>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
}

// ==================== HERO SECTION ====================
function HeroSection({ progress, onNavigate }: { progress: number; onNavigate: (section: string) => void }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020814] via-[#07111f] to-[#020814] dark:from-[#020814] dark:via-[#07111f] dark:to-[#020814]" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(45,124,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(168,85,247,0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 50%)`,
          }} />
        <img src="/hero-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d7cff18] border border-[#2d7cff30] mb-6">
            <Rocket size={16} className="text-[#2d7cff]" />
            <span className="text-sm font-medium text-[#2d7cff]">Plataforma Educativa Open Source</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#2d7cff] via-[#4a90ff] to-[#a855f7] bg-clip-text text-transparent">
              Crypto E-Duty
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Aprende sobre criptomonedas desde cero. 10 módulos, 4 niveles de dificultad,
            contenidos claros y una wallet educativa para practicar sin riesgos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              className="bg-[#2d7cff] hover:bg-[#1e6ae0] text-white font-semibold px-8 text-base"
              onClick={() => onNavigate("learning-path")}
            >
              <BookOpen className="mr-2" size={20} />
              Comenzar a Aprender
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#2d7cff40] hover:bg-[#2d7cff10] text-foreground font-semibold px-8 text-base"
              onClick={() => onNavigate("about")}
            >
              <Info className="mr-2" size={20} />
              Sobre el Proyecto
            </Button>
          </div>
          {progress > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Tu progreso</span>
                <span className="font-bold text-[#2d7cff]">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-[#2d7cff18]" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-muted-foreground/40" size={32} />
      </motion.div>
    </section>
  );
}

// ==================== LEARNING PATH OVERVIEW ====================
function LearningPathOverview({ completedModules, onNavigate }: { completedModules: number[]; onNavigate: (section: string) => void }) {
  return (
    <section id="learning-path" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader icon={GraduationCap} title="Ruta de Aprendizaje" subtitle="4 niveles progresivos que te llevan de principiante a experto en criptomonedas" color="#2d7cff" />

        <div className="grid gap-6 md:gap-8">
          {levelInfo.map((level, idx) => {
            const levelModules = learningModules.filter(m => m.level === level.level);
            const levelCompleted = levelModules.filter(m => completedModules.includes(m.id)).length;
            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: level.color }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{level.icon}</span>
                        <div>
                          <CardTitle className="text-xl" style={{ color: level.color }}>
                            Nivel {level.level}: {level.name}
                          </CardTitle>
                          <CardDescription>{level.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" style={{ backgroundColor: level.bgColor, color: level.color }}>
                        {levelCompleted}/{levelModules.length} completados
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {levelModules.map(mod => (
                        <button
                          key={mod.id}
                          onClick={() => onNavigate(`module-${mod.id}`)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-[#2d7cff40] hover:bg-[#2d7cff08] transition-all text-left group"
                        >
                          <span className="text-2xl">{mod.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate group-hover:text-[#2d7cff] transition-colors">
                              {mod.id}. {mod.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{mod.duration}</p>
                          </div>
                          {completedModules.includes(mod.id) ? (
                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          ) : (
                            <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==================== MODULE DETAIL ====================
function ModuleDetail({
  module,
  isCompleted,
  completedTopics,
  onToggleTopic,
}: {
  module: LearningModule;
  isCompleted: boolean;
  completedTopics: number[];
  onToggleTopic: (topicIndex: number) => void;
}) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const moduleCompletedTopics = completedTopics.length;
  const totalTopics = module.topics.length;
  const moduleProgress = totalTopics > 0 ? Math.round((moduleCompletedTopics / totalTopics) * 100) : 0;

  return (
    <Card id={`module-${module.id}`} className="overflow-hidden border-t-4" style={{ borderTopColor: module.levelColor }}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{module.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" style={{ borderColor: module.levelColor, color: module.levelColor }}>
                Nivel {module.level}: {module.levelName}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock size={12} className="mr-1" /> {module.duration}
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                  <CheckCircle2 size={12} className="mr-1" /> Completado
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl md:text-2xl">
              Módulo {module.id}: {module.title}
            </CardTitle>
            <CardDescription className="mt-2 text-base">{module.description}</CardDescription>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Progreso del módulo</span>
                <span className="font-semibold" style={{ color: module.levelColor }}>{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-2" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Topics */}
        <div className="space-y-3 mb-6">
          {module.topics.map((topic, idx) => {
            const isTopicCompleted = completedTopics.includes(idx);
            const isExpanded = expandedTopic === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all ${
                  isTopicCompleted ? "border-green-500/30 bg-green-500/5" : "border-border/50 hover:border-[#2d7cff30]"
                }`}
              >
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : idx)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleTopic(idx); }}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isTopicCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-muted-foreground/30 hover:border-[#2d7cff]"
                    }`}
                  >
                    {isTopicCompleted && <CheckCircle2 size={14} />}
                  </button>
                  <span className={`font-medium flex-1 ${isTopicCompleted ? "line-through text-muted-foreground" : ""}`}>
                    {topic.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-13">
                        <Separator className="mb-4" />
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base pl-9">
                          {topic.content}
                        </p>
                        {topic.tip && (
                          <div className="mt-4 ml-9 p-3 rounded-lg bg-[#2d7cff10] border border-[#2d7cff20]">
                            <div className="flex items-start gap-2">
                              <Lightbulb size={16} className="text-[#2d7cff] shrink-0 mt-0.5" />
                              <p className="text-sm text-[#2d7cff]"><strong>Tip:</strong> {topic.tip}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Key Terms */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Terminal size={14} className="text-[#2d7cff]" /> Términos clave
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.keyTerms.map((term) => (
              <Badge key={term} variant="secondary" className="text-xs bg-[#2d7cff10] text-[#4a90ff] border-[#2d7cff20]">
                {term}
              </Badge>
            ))}
          </div>
        </div>

        {/* Security Tip */}
        {module.securityTip && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm">Consejo de seguridad</p>
                <p className="text-sm text-amber-700/80 dark:text-amber-300/70 mt-1">{module.securityTip}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== CLOCK ICON (inline) ====================
function Clock({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ==================== WALLET DEMO ====================
function WalletDemo() {
  const [wallet, setWallet] = useState<DemoWallet | null>(null);
  const [showPrivate, setShowPrivate] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferResult, setTransferResult] = useState<ReturnType<typeof mockTransfer> | null>(null);
  const [copied, setCopied] = useState("");

  const handleCreate = () => {
    setWallet(createDemoWallet());
    setTransferResult(null);
    setShowPrivate(false);
  };

  const handleTransfer = () => {
    if (!wallet || !transferTo || !transferAmount) return;
    const result = mockTransfer(transferAmount, transferTo, wallet.address);
    setTransferResult(result);
    setTransferTo("");
    setTransferAmount("");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section id="wallet-demo" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={Wallet} title="Wallet Educativa" subtitle="Practica conceptos de wallets sin riesgo: crea una wallet ficticia y simula transacciones" color="#eab308" />

        {!wallet ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <Card className="max-w-md mx-auto border-dashed border-2 border-[#eab30840]">
              <CardContent className="p-8">
                <Wallet size={48} className="mx-auto mb-4 text-[#eab308]" />
                <h3 className="text-lg font-semibold mb-2">Crea tu Wallet de Práctica</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Esta wallet es 100% ficticia. No maneja criptomonedas reales. Úsala para aprender sobre direcciones, claves y transacciones.
                </p>
                <Button onClick={handleCreate} className="bg-[#eab308] hover:bg-[#ca8a04] text-black font-semibold">
                  <Wallet className="mr-2" size={18} />
                  Crear Wallet Demo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Wallet Info */}
              <Card className="border-[#eab30830]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet size={20} className="text-[#eab308]" />
                    Tu Wallet Demo
                  </CardTitle>
                  <Badge variant="outline" className="w-fit text-xs border-[#22c55e40] text-green-600 dark:text-green-400">
                    <Globe size={10} className="mr-1" /> {wallet.network}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Dirección pública</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 text-xs bg-muted p-2 rounded font-mono break-all">{wallet.address}</code>
                      <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => copyToClipboard(wallet.address, "address")}>
                        <Copy size={14} className={copied === "address" ? "text-green-500" : ""} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Clave privada</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 text-xs bg-muted p-2 rounded font-mono break-all">
                        {showPrivate ? wallet.privateKey : "••••••••••••••••••••"}
                      </code>
                      <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => setShowPrivate(!showPrivate)}>
                        {showPrivate ? <EyeOff size={14} /> : <Eye size={14} />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => copyToClipboard(wallet.privateKey, "private")}>
                        <Copy size={14} className={copied === "private" ? "text-green-500" : ""} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Balance (ficticio)</label>
                    <p className="text-2xl font-bold text-[#eab308] mt-1">{wallet.balance} <span className="text-sm font-normal text-muted-foreground">EDU</span></p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleCreate}>
                    <RefreshCw size={14} className="mr-2" /> Generar nueva wallet
                  </Button>
                </CardContent>
              </Card>

              {/* Transfer */}
              <Card className="border-[#2d7cff30]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Send size={20} className="text-[#2d7cff]" />
                    Simular Transacción
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Dirección destino</label>
                    <Input
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      placeholder="EDU-XXXXXXXXXXXX"
                      className="mt-1 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium">Cantidad (EDU)</label>
                    <Input
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="0.5000"
                      type="number"
                      step="0.0001"
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleTransfer} className="w-full bg-[#2d7cff] hover:bg-[#1e6ae0] text-white" disabled={!transferTo || !transferAmount}>
                    <Send size={16} className="mr-2" /> Enviar (Simulación)
                  </Button>
                  {transferResult && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="font-semibold text-green-600 dark:text-green-400 text-sm">Transacción simulada</span>
                      </div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <p><strong>De:</strong> {transferResult.from}</p>
                        <p><strong>Para:</strong> {transferResult.to}</p>
                        <p><strong>Cantidad:</strong> {transferResult.amount} EDU</p>
                        <p><strong>Hora:</strong> {transferResult.timestamp}</p>
                      </div>
                    </motion.div>
                  )}
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-600/80 dark:text-amber-400/70">Esta es una simulación educativa. No se envían criptomonedas reales.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ==================== CERTIFICATE ====================
function CertificateSection({ progress, completedModules }: { progress: number; completedModules: number[] }) {
  const isComplete = progress === 100;
  const [showCert, setShowCert] = useState(false);

  return (
    <section id="certificate" className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeader icon={Award} title="Certificado de Finalización" subtitle="Completa todos los módulos para obtener tu certificado virtual" color="#a855f7" />

        <Card className={`border-2 ${isComplete ? "border-[#a855f740]" : "border-dashed"}`}>
          <CardContent className="p-8 text-center">
            {isComplete ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Trophy size={64} className="mx-auto mb-4 text-[#a855f7]" />
                <h3 className="text-2xl font-bold mb-2">¡Felicidades!</h3>
                <p className="text-muted-foreground mb-6">Has completado todos los módulos de Crypto E-Duty. ¡Eres todo un experto en criptomonedas!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setShowCert(true)} className="bg-[#a855f7] hover:bg-[#9333ea] text-white">
                    <Award size={18} className="mr-2" /> Ver Certificado
                  </Button>
                  <Button variant="outline">
                    <Download size={18} className="mr-2" /> Descargar Guía PDF
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <Lock size={48} className="mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold mb-2">Certificado Bloqueado</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Completa todos los módulos para desbloquear tu certificado de finalización.
                </p>
                <div className="max-w-xs mx-auto">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-bold text-[#a855f7]">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">{completedModules.length}/10 módulos completados</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Certificate Modal */}
        <Dialog open={showCert} onOpenChange={setShowCert}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">Certificado de Finalización</DialogTitle>
              <DialogDescription className="text-center">
                Crypto E-Duty - Programa Educativo de Criptomonedas
              </DialogDescription>
            </DialogHeader>
            <div className="relative rounded-xl overflow-hidden border-2 border-[#a855f730] p-8 text-center bg-gradient-to-b from-[#0a0f1a] to-[#020814]">
              <img src="/certificate-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl">🎓</span>
                  <span className="text-2xl">₿</span>
                </div>
                <p className="text-xs text-[#a855f7] uppercase tracking-widest mb-2">Certificado de Finalización</p>
                <h3 className="text-xl font-bold mb-4 text-white">Crypto E-Duty</h3>
                <p className="text-sm text-muted-foreground mb-2">Otorgado a:</p>
                <p className="text-lg font-semibold text-white mb-4">Estudiante Dedicado</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Por completar exitosamente los 10 módulos educativos sobre criptomonedas,<br />
                  blockchain, seguridad, DeFi, NFTs y el futuro de la tecnología Web3.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>{new Date().toLocaleDateString("es")}</span>
                  <span>•</span>
                  <span>Crypto E-Duty v2.0</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// ==================== CRYPTO TIPS TICKER ====================
function CryptoTipsTicker() {
  const [currentTip, setCurrentTip] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % cryptoTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 px-4 bg-[#2d7cff10] border-y border-[#2d7cff20]">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Shield size={18} className="text-[#2d7cff] shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-muted-foreground flex-1"
          >
            {cryptoTips[currentTip]}
          </motion.p>
        </AnimatePresence>
        <Badge variant="secondary" className="text-xs shrink-0">
          <Shield size={10} className="mr-1" /> Seguridad
        </Badge>
      </div>
    </div>
  );
}

// ==================== FAQ SECTION ====================
function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <SectionHeader icon={MessageCircle} title="Preguntas Frecuentes" subtitle="Respuestas claras a las dudas más comunes sobre criptomonedas y esta plataforma" color="#22c55e" />
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-xl px-4 data-[state=open]:border-[#22c55e30] data-[state=open]:bg-[#22c55e05]">
              <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ==================== ABOUT PROJECT ====================
function AboutProject() {
  return (
    <section id="about" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={Info} title="Sobre el Proyecto" subtitle="Conoce al creador y la motivación detrás de Crypto E-Duty" color="#a855f7" />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Creator Card */}
          <Card className="border-[#a855f730]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2d7cff] to-[#a855f7] flex items-center justify-center text-white font-bold text-xl">
                  JC
                </div>
                <div>
                  <h3 className="font-bold text-lg">{creatorBio.name}</h3>
                  <p className="text-sm text-muted-foreground">{creatorBio.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{creatorBio.summary}</p>
              <p className="text-sm leading-relaxed mb-4">{creatorBio.motivation}</p>
              <p className="text-sm text-muted-foreground italic mb-4">"{creatorBio.mediumTermGoal}"</p>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <a href={creatorBio.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0A66C2] hover:underline">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href={`mailto:${creatorBio.email}`}
                  className="flex items-center gap-2 text-sm text-[#2d7cff] hover:underline">
                  <Mail size={16} /> {creatorBio.email}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Project Info Card */}
          <Card className="border-[#2d7cff30]">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code size={20} className="text-[#2d7cff]" />
                <h3 className="font-bold text-lg">Tecnologías</h3>
              </div>
              <div className="space-y-3">
                {techStack.map(tech => (
                  <div key={tech.name} className="flex items-start gap-3">
                    <Zap size={14} className="text-[#2d7cff] shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>10 módulos educativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>4 niveles de dificultad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>Wallet educativa interactiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>Certificado de finalización</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>Modo día y noche</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#eab308]" />
                  <span>100% Open Source (MIT)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ==================== ALL MODULES SECTION ====================
function AllModulesSection({
  completedModules,
  completedTopics,
  toggleTopic,
}: {
  completedModules: number[];
  completedTopics: Record<number, number[]>;
  toggleTopic: (moduleId: number, topicIndex: number) => void;
}) {
  const [filterLevel, setFilterLevel] = useState<number | null>(null);
  const filtered = filterLevel ? learningModules.filter(m => m.level === filterLevel) : learningModules;

  return (
    <section id="modules" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={BookOpen} title="Módulos de Aprendizaje" subtitle="Explora cada módulo en detalle y marca los temas que hayas completado" color="#2d7cff" />

        {/* Level filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={filterLevel === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel(null)}
            className={filterLevel === null ? "bg-[#2d7cff] hover:bg-[#1e6ae0]" : ""}
          >
            Todos
          </Button>
          {levelInfo.map(level => (
            <Button
              key={level.level}
              variant={filterLevel === level.level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel(level.level)}
              className={filterLevel === level.level ? "" : ""}
              style={filterLevel === level.level ? { backgroundColor: level.color, borderColor: level.color } : {}}
            >
              {level.icon} Nivel {level.level}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map(module => (
            <ModuleDetail
              key={module.id}
              module={module}
              isCompleted={completedModules.includes(module.id)}
              completedTopics={completedTopics[module.id] || []}
              onToggleTopic={(topicIndex) => toggleTopic(module.id, topicIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== NAVBAR ====================
function Navbar({ onNavigate, progress }: { onNavigate: (s: string) => void; progress: number }) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    (cb) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); },
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", section: "hero" },
    { label: "Ruta", section: "learning-path" },
    { label: "Módulos", section: "modules" },
    { label: "Wallet", section: "wallet-demo" },
    { label: "FAQ", section: "faq" },
    { label: "Proyecto", section: "about" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("hero")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/crypto-logo.png" alt="Crypto E-Duty" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-lg bg-gradient-to-r from-[#2d7cff] to-[#4a90ff] bg-clip-text text-transparent hidden sm:inline">
            Crypto E-Duty
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {progress > 0 && (
            <Badge variant="secondary" className="text-xs hidden sm:flex">
              <Trophy size={10} className="mr-1" /> {progress}%
            </Badge>
          )}

          {mounted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{theme === "dark" ? "Modo día" : "Modo noche"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src="/crypto-logo.png" alt="" className="w-6 h-6 rounded" />
                  Crypto E-Duty
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map(item => (
                  <SheetTrigger key={item.section} asChild>
                    <button
                      onClick={() => onNavigate(item.section)}
                      className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <ArrowRight size={14} className="text-muted-foreground" />
                      {item.label}
                    </button>
                  </SheetTrigger>
                ))}
              </nav>
              {progress > 0 && (
                <div className="mt-6 px-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso total</span>
                    <span className="font-bold text-[#2d7cff]">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ==================== FOOTER ====================
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/crypto-logo.png" alt="" className="w-6 h-6 rounded" />
            <span className="font-semibold text-sm bg-gradient-to-r from-[#2d7cff] to-[#4a90ff] bg-clip-text text-transparent">
              Crypto E-Duty
            </span>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm">
            <button onClick={() => onNavigate("learning-path")} className="text-muted-foreground hover:text-foreground transition-colors">Ruta</button>
            <button onClick={() => onNavigate("modules")} className="text-muted-foreground hover:text-foreground transition-colors">Módulos</button>
            <button onClick={() => onNavigate("wallet-demo")} className="text-muted-foreground hover:text-foreground transition-colors">Wallet</button>
            <button onClick={() => onNavigate("faq")} className="text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
            <button onClick={() => onNavigate("about")} className="text-muted-foreground hover:text-foreground transition-colors">Proyecto</button>
          </nav>

          <div className="flex items-center gap-3">
            <a href={creatorBio.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${creatorBio.email}`} className="text-muted-foreground hover:text-[#2d7cff] transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
            "Todo lo que te propongas, lo puedes lograr, con esfuerzo y ingenio se puede alcanzar"
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Juan Carlos Yepez — Desarrollador del proyecto
          </p>
          <p className="text-xs text-muted-foreground/40 mt-1">
            &copy; {new Date().getFullYear()} Crypto E-Duty &middot; MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APP ====================
export default function CryptoEdutyApp() {
  const {
    completedModules,
    completedTopics,
    toggleTopic,
    resetProgress,
    progressPercent,
  } = useProgress();

  const navigateTo = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigateTo} progress={progressPercent} />

      <main className="flex-1 pt-16">
        <HeroSection progress={progressPercent} onNavigate={navigateTo} />
        <CryptoTipsTicker />
        <LearningPathOverview completedModules={completedModules} onNavigate={navigateTo} />
        <AllModulesSection
          completedModules={completedModules}
          completedTopics={completedTopics}
          toggleTopic={toggleTopic}
        />
        <WalletDemo />
        <CertificateSection progress={progressPercent} completedModules={completedModules} />
        <FAQSection />
        <AboutProject />
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Reset progress button (hidden in footer area) */}
      {progressPercent > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs bg-background/80 backdrop-blur-sm">
                <RefreshCw size={12} className="mr-1" /> Reiniciar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Reiniciar progreso?</DialogTitle>
                <DialogDescription>
                  Esto eliminará todo tu progreso actual. Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                <Button variant="destructive" onClick={resetProgress}>Reiniciar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
