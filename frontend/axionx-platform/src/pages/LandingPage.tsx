import { useState } from "react";
import { ArrowRight, Bot, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedBackgroundPattern } from "@/components/AnimatedBackgroundPattern";
import { DemoRequestModal } from "@/components/DemoRequestModal";

export default function LandingPage() {
    const [showDemoModal, setShowDemoModal] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <AnimatedBackgroundPattern />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <ScrollReveal>
                            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 backdrop-blur-sm border border-primary/20">
                                🚀 The Future of Financial Governance is Here
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat tracking-tighter max-w-4xl mx-auto gradient-text leading-tight">
                                AI-Powered <br className="hidden md:inline" />
                                Finance Transformation
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} width="100%">
                            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground font-opensans leading-relaxed">
                                AxionX eliminates data chaos. We automate reconciliation, guarantee governance, and deliver actionable AI insights—saving you millions in cost exposure.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center">
                                <Link to="/auth">
                                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto text-lg px-8 h-12 border-primary/20 hover:bg-primary/5 backdrop-blur-sm"
                                    onClick={() => setShowDemoModal(true)}
                                >
                                    Book a Demo
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-2">
                        <div className="w-1 h-3 bg-primary/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 md:py-32 bg-muted/30 relative">
                <div className="container px-4 md:px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">Why AxionX?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Replace manual spreadsheets with an autonomous, AI-driven financial operating system.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard
                            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                            title="Automated Governance"
                            description="Eliminate compliance risks with real-time data validation and automated controls."
                            delay={0.1}
                        />
                        <ServiceCard
                            icon={<Bot className="h-10 w-10 text-primary" />}
                            title="AI Analysis Agent"
                            description="Your 24/7 financial analyst. Ask questions, get instant answers from your data."
                            delay={0.2}
                        />
                        <ServiceCard
                            icon={<Zap className="h-10 w-10 text-primary" />}
                            title="Instant Reconciliation"
                            description="Connect disparate data sources (OneStream, ERPs) and reconcile in seconds, not days."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* About / Trust Section */}
            <section className="py-24 md:py-32 bg-background relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-primary/[0.02] -z-10" />
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                                Built for the <span className="gradient-text">CFO Office</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 font-opensans">
                                We understand the pressure of month-end closes and regulatory audits. AxionX was designed by finance veterans to solve the specific pain points of modern enterprises.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Bank-grade security & encryption</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Seamless integration with existing ERPs</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Rapid deployment in weeks, not months</span>
                                </li>
                            </ul>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <div className="relative rounded-2xl border border-border/50 bg-card/50 p-2 backdrop-blur-xl shadow-2xl">
                                {/* Abstract representation of dashboard or valid image */}
                                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border border-white/10">
                                    <BarChart3 className="h-24 w-24 text-primary/20" />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary via-accent to-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-6">
                            Ready to Transform Your Finance Function?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                            Join the leading enterprises already using AxionX to secure their data and optimize costs.
                        </p>
                        <Link to="/auth">
                            <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-10 h-14 shadow-xl hover:scale-105 transition-transform">
                                Start Platform Access
                            </Button>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {showDemoModal && (
                <DemoRequestModal onClose={() => setShowDemoModal(false)} />
            )}
        </div>
    );
}

function ServiceCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <ScrollReveal delay={delay}>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 group">
                <div className="mb-4 p-3 rounded-xl bg-primary/5 w-fit group-hover:bg-primary/10 transition-colors">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-montserrat">{title}</h3>
                <p className="text-muted-foreground font-opensans leading-relaxed">
                    {description}
                </p>
            </div>
        </ScrollReveal>
    );
}
