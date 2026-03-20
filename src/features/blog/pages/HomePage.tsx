import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the mount animation triggers smoothly
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center py-20">
        {/* Badge */}
        <div
          className={`mb-8 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 backdrop-blur-md transition-all duration-700 hover:bg-indigo-500/20 cursor-default shadow-[0_0_15px_rgba(99,102,241,0.2)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Zap className="mr-2 h-4 w-4 text-indigo-500 animate-pulse" />
          <span>V2.0 Now Live - Join the revolution</span>
        </div>

        {/* Headlines */}
        <h1
          className={`max-w-4xl text-3xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60 drop-shadow-sm mb-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Write, Share, and <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Inspire the World
          </span>
        </h1>

        <p
          className={`max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Discover a platform built for creators. Share your thoughts, connect
          with readers, and join a vibrant community of writers shaping the
          future of content.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-95 group bg-foreground text-background hover:bg-foreground/90 font-semibold border-0"
          >
            Start Reading
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-foreground/10 bg-background/50 backdrop-blur-md transition-all hover:bg-foreground/5 hover:scale-105 active:scale-95 font-semibold text-foreground"
          >
            <BookOpen className="mr-2 h-5 w-5 opacity-70" />
            Write a Story
          </Button>
        </div>

        {/* Featured Mini Cards (Glassmorphism) */}
        <div
          className={`mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {[
            {
              icon: Star,
              title: "Curated Content",
              desc: "Handpicked articles tailored to your interests and reading habits to keep you inspired.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Experience a seamless, instant-loading reading environment without any interruptions.",
            },
            {
              icon: BookOpen,
              title: "Rich Typography",
              desc: "A beautifully crafted reading experience that puts content first and eliminates distractions.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative rounded-[2rem] border border-border/50 bg-background/40 dark:bg-muted/10 p-8 backdrop-blur-xl shadow-2xl transition-all hover:-translate-y-2 hover:shadow-indigo-500/10 overflow-hidden text-left"
            >
              {/* Card Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-6 shadow-md ring-1 ring-white/20">
                <feature.icon className="h-7 w-7" />
              </div>

              <h3 className="relative z-10 font-bold text-2xl mb-3 text-foreground/90 tracking-tight">
                {feature.title}
              </h3>
              <p className="relative z-10 text-muted-foreground leading-relaxed text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
