import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Compass,
  Lightbulb,
  LoaderCircle,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type ResearchState = 'idle' | 'researching' | 'ready';
type ResearchForm = { query: string };

function Home() {
  const form = useForm<ResearchForm>({ defaultValues: { query: '' } });
  const query = form.watch('query');
  const [researchState, setResearchState] = useState<ResearchState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onSubmit = ({ query: submittedQuery }: ResearchForm) => {
    const cleanQuery = submittedQuery.trim();
    if (!cleanQuery || researchState === 'researching') return;

    setResearchState('researching');
    timerRef.current = setTimeout(() => setResearchState('ready'), 950);
  };

  const resetResearch = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    form.reset({ query: '' });
    setResearchState('idle');
  };

  const chooseSuggestion = (suggestion: string) => {
    form.setValue('query', suggestion, { shouldDirty: true, shouldTouch: true });
    setResearchState('idle');
  };

  return (
    <div className="grain min-h-[100dvh] bg-background text-foreground">
      <div className="flex min-h-[100dvh]">
        <aside className="hidden w-[252px] shrink-0 flex-col justify-between bg-sidebar px-5 py-6 text-sidebar-foreground md:flex">
          <div>
            <div className="flex items-center gap-3 px-2" data-testid="brand-dropship-ai">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
                <Compass className="h-[18px] w-[18px]" strokeWidth={2.5} />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-sidebar-primary" />
              </div>
              <div>
                <div className="display-font text-[15px] font-bold tracking-[-0.02em]">Dropship AI</div>
                <div className="mono-font mt-0.5 text-[9px] uppercase tracking-[0.16em] text-sidebar-foreground/55">Research co-pilot</div>
              </div>
            </div>

            <div className="mt-12 px-2">
              <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/45">Workspace</div>
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-3.5 text-sm font-semibold text-sidebar-accent-foreground" data-testid="status-current-workspace">
                <span className="h-2 w-2 rounded-full bg-sidebar-primary shadow-[0_0_0_4px_rgba(244,178,91,0.12)]" />
                Product research
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/70 p-4" data-testid="card-first-research-tip">
            <div className="flex items-center gap-2 text-sidebar-primary">
              <Lightbulb className="h-4 w-4" />
              <span className="mono-font text-[10px] uppercase tracking-[0.16em]">A useful first step</span>
            </div>
            <p className="mt-3 text-[13px] leading-5 text-sidebar-foreground/75">
              Start with a clear product idea. You can always narrow a broad niche after you see what stands out.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-sidebar-primary">
              <span>Begin with a hunch</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-8 lg:px-12" data-testid="header-dashboard">
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span className="hidden sm:inline">Workspace</span>
              <span className="hidden text-border sm:inline">/</span>
              <span className="font-semibold text-foreground">Product research</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="hidden rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground sm:inline-flex sm:items-center sm:gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4a9b73]" />
                Local workspace
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7d7bb] text-[11px] font-extrabold text-primary" data-testid="avatar-you">Y</div>
            </div>
          </header>

          <div className="mx-auto max-w-[1220px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="page-enter max-w-[800px]">
              <div className="mono-font mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground" data-testid="text-step-label">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">01</span>
                Find your starting point
              </div>
              <h1 className="display-font max-w-[770px] text-[clamp(2.45rem,6vw,5.2rem)] font-bold leading-[0.97] tracking-[-0.065em] text-primary" data-testid="heading-research-intro">
                Turn a hunch into a smarter first move.
              </h1>
              <p className="mt-5 max-w-[570px] text-[15px] leading-7 text-muted-foreground sm:text-[16px]" data-testid="text-research-intro">
                Tell us what you are curious about. Dropship AI will help you structure the questions worth asking before you commit time or money.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] lg:mt-14 lg:gap-10">
              <section className="page-enter delay-1 min-w-0" aria-labelledby="research-form-title">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-[14px] font-extrabold tracking-[-0.02em] text-primary" id="research-form-title">What are you exploring?</h2>
                    <p className="mt-1 text-[12px] text-muted-foreground">A product, a problem, or a whole niche.</p>
                  </div>
                  <span className="mono-font hidden text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70 sm:block">Takes about 1 min</span>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="relative overflow-hidden rounded-[22px] border border-primary/15 bg-card p-3 shadow-sm transition-shadow focus-within:shadow-md" data-testid="form-research-product">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/15 blur-2xl" />
                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="flex min-h-[74px] flex-1 items-start gap-3 rounded-2xl border border-border/80 bg-background/70 px-4 py-3 transition-colors focus-within:border-primary/40 focus-within:bg-card">
                      <Search className="mt-1 h-[18px] w-[18px] shrink-0 text-primary/60" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Product or niche</span>
                        <input
                          {...form.register('query')}
                          className="mt-1.5 w-full bg-transparent text-[15px] font-semibold text-primary outline-none placeholder:font-normal placeholder:text-muted-foreground/65"
                          placeholder="e.g. desk accessories for small spaces"
                          aria-label="Product or niche"
                          data-testid="input-product-or-niche"
                          autoComplete="off"
                        />
                      </span>
                      {query && researchState !== 'researching' ? (
                        <button type="button" onClick={resetResearch} className="mt-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary" aria-label="Clear product idea" data-testid="button-clear-product">
                          <X className="h-4 w-4" />
                        </button>
                      ) : null}
                    </label>
                    <button
                      type="submit"
                      disabled={!query.trim() || researchState === 'researching'}
                      className="research-button inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-[13px] font-extrabold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-[74px] sm:min-w-[172px]"
                      data-testid="button-research-product"
                    >
                      {researchState === 'researching' ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Looking closer
                        </>
                      ) : (
                        <>
                          Research Product
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative mt-3 flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
                    <CircleHelp className="h-3.5 w-3.5 text-primary/50" />
                    <span>Not sure yet? A rough idea is a perfectly good place to start.</span>
                  </div>
                </form>

                <div className="mt-5 flex flex-wrap items-center gap-2" data-testid="suggestion-list">
                  <span className="mr-1 text-[11px] font-semibold text-muted-foreground">Try an example</span>
                  {['Travel organizers', 'Pet enrichment', 'Tiny home storage'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => chooseSuggestion(suggestion)}
                      className="suggestion-chip rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      data-testid={`button-suggestion-${suggestion.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <section className="page-enter delay-2 mt-12" aria-labelledby="results-title">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Your workspace</div>
                      <h2 className="mt-1.5 text-[20px] font-extrabold tracking-[-0.04em] text-primary" id="results-title">Research results</h2>
                    </div>
                    {researchState === 'ready' ? (
                      <button type="button" onClick={resetResearch} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-primary" data-testid="button-start-over">
                        <RotateCcw className="h-3.5 w-3.5" />
                        Start over
                      </button>
                    ) : null}
                  </div>

                  <div className="relative min-h-[285px] overflow-hidden rounded-[22px] border border-dashed border-primary/20 bg-card/55" data-testid="panel-research-results">
                    {researchState === 'researching' ? (
                      <div className="flex min-h-[285px] flex-col items-center justify-center px-6 text-center">
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-accent/15">
                          <div className="result-orbit absolute inset-[-7px] rounded-full border border-dashed border-accent/70" />
                          <Search className="h-6 w-6 text-primary" />
                        </div>
                        <div className="mt-5 text-[15px] font-bold text-primary" data-testid="status-researching">Setting up your research brief</div>
                        <p className="mt-2 max-w-[330px] text-[12px] leading-5 text-muted-foreground">This local demo is preparing the next step. No external research is being run.</p>
                        <div className="mt-5 h-1 w-36 overflow-hidden rounded-full bg-muted"><div className="loading-line h-full w-full rounded-full bg-accent" /></div>
                      </div>
                    ) : researchState === 'ready' ? (
                      <div className="flex min-h-[285px] flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcebdd] text-[#397653]">
                          <Check className="h-6 w-6" strokeWidth={2.5} />
                        </div>
                        <div className="mt-5 text-[15px] font-bold text-primary" data-testid="status-research-ready">Your research brief is ready to shape</div>
                        <p className="mt-2 max-w-[390px] text-[12px] leading-5 text-muted-foreground">
                          We have captured <span className="font-bold text-primary">“{query.trim()}”</span>. Live product insights are not connected in this workspace yet, so your findings will appear here once a research source is added.
                        </p>
                        <button type="button" onClick={resetResearch} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-[12px] font-bold text-primary transition-colors hover:border-primary/30 hover:bg-primary/5" data-testid="button-research-another">
                          Research another idea
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex min-h-[285px] flex-col items-center justify-center px-6 text-center">
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/45 bg-accent/10 text-primary">
                          <div className="absolute inset-[-9px] rounded-full border border-dashed border-accent/35" />
                          <Sparkles className="h-6 w-6" strokeWidth={1.7} />
                        </div>
                        <div className="mt-5 text-[15px] font-bold text-primary" data-testid="status-results-empty">Your research will land here</div>
                        <p className="mt-2 max-w-[350px] text-[12px] leading-5 text-muted-foreground">Enter an idea above to create a focused starting brief. This space stays clear until you decide what to explore.</p>
                        <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/75">
                          <span className="h-px w-6 bg-border" />
                          Nothing saved yet
                          <span className="h-px w-6 bg-border" />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </section>

              <aside className="page-enter delay-3 space-y-4">
                <div className="rounded-[22px] bg-primary p-5 text-primary-foreground shadow-sm" data-testid="card-how-it-works">
                  <div className="flex items-center justify-between">
                    <span className="mono-font text-[10px] uppercase tracking-[0.17em] text-primary-foreground/55">How it works</span>
                    <ArrowUpRight className="h-4 w-4 text-accent" />
                  </div>
                  <div className="mt-7 space-y-5">
                    {[
                      ['01', 'Name the idea', 'Start with the product or niche on your mind.'],
                      ['02', 'Research the angle', 'Use the brief to decide which questions matter.'],
                      ['03', 'Choose your next move', 'Keep momentum without guessing what to do next.'],
                    ].map(([number, title, detail]) => (
                      <div key={number} className="flex gap-3" data-testid={`step-how-it-works-${number}`}>
                        <span className="mono-font mt-0.5 text-[10px] text-accent">{number}</span>
                        <div>
                          <div className="text-[12px] font-bold">{title}</div>
                          <div className="mt-1 text-[11px] leading-4 text-primary-foreground/60">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-border bg-card p-5" data-testid="card-research-note">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-primary">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-[13px] font-extrabold tracking-[-0.02em] text-primary">Good research starts small.</div>
                  <p className="mt-2 text-[12px] leading-5 text-muted-foreground">You do not need a perfect store idea today. You only need a question you want to answer.</p>
                </div>
              </aside>
            </div>

            <footer className="page-enter delay-4 mt-12 flex flex-col gap-2 border-t border-border/70 pt-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between" data-testid="footer-local-note">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#4a9b73]" /> Your ideas stay in this browser for now.</span>
              <span className="mono-font uppercase tracking-[0.13em] text-muted-foreground/60">Dropship AI / v0.1</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
