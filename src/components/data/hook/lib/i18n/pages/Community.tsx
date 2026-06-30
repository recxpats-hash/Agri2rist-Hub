import { useState } from "react";
import {
  Home,
  Eye,
  ShoppingBag,
  Apple,
  Utensils,
  Bike,
  Calendar,
  Bird,
  Leaf,
  Globe,
  Star,
  ArrowRight,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLayout } from "@/components/layout/PageLayout";
import { RURAL_LIFE_WAYS, FARM_IMAGES } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Eye,
  ShoppingBag,
  Apple,
  Utensils,
  Bike,
  Calendar,
  Bird,
  Leaf,
  Globe,
};

const colorMap: Record<string, string> = {
  accent: "bg-accent-light text-accent border-accent/20",
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
};

const iconColorMap: Record<string, string> = {
  accent: "text-accent",
  primary: "text-primary",
  secondary: "text-secondary",
};

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Sydney, NSW",
    text: "An incredible experience at Blue Lagoon Aquaculture. My kids loved watching the fish harvest and we ate the freshest tilapia we've ever tasted. Agri2rist Hub made booking effortless.",
    rating: 5,
    farm: "Blue Lagoon Aquaculture",
  },
  {
    name: "James Okafor",
    location: "Melbourne, VIC",
    text: "The Dreamtime Cultural Farm Stay was transformative. Learning traditional Aboriginal fishing and land management practices opened our eyes to the true depth of Australia's agricultural heritage.",
    rating: 5,
    farm: "Dreamtime Cultural Farm Stay",
  },
  {
    name: "Priya Sharma",
    location: "Brisbane, QLD",
    text: "We visited Green Valley Dairy and made cheese with the farm family. It was the highlight of our family holiday — authentic, educational, and delicious. Highly recommend!",
    rating: 5,
    farm: "Green Valley Dairy Farm",
  },
];

export default function CommunityPage() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("agri2rist_feedback") || "[]");
    localStorage.setItem(
      "agri2rist_feedback",
      JSON.stringify([
        ...saved,
        { ...feedbackForm, createdAt: new Date().toISOString() },
      ])
    );
    setSubmitted(true);
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FARM_IMAGES.groupTour})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4">
            Agritourism <span className="text-gradient-gold">Community</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
            Welcome to Agritourism World. Enjoy new travel planning ideas with friends, family and groups.
            A place for new and unique adventures.
          </p>
        </div>
      </section>

      {/* Get Listed Banner */}
      <section className="bg-secondary py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground font-semibold text-center md:text-left">
            Get Listed. If you are an agritourism destination, our free listings only take a couple steps.
          </p>
          <Link to="/get-listed">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-light font-bold flex-shrink-0">
              Get Listed Free <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Ways to Taste Rural Life */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Ways to <span className="text-primary">Taste Rural Life</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From farm stays to Aboriginal cultural experiences — discover the many ways to connect
              with the land, food, and communities that feed the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {RURAL_LIFE_WAYS.map((way) => {
              const IconComponent = iconMap[way.icon];
              const isSpecial = way.id === 10;
              return (
                <div
                  key={way.id}
                  className={`rounded-xl border p-5 card-hover relative overflow-hidden ${
                    isSpecial
                      ? "bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary/40 sm:col-span-2"
                      : `bg-card border-border`
                  }`}
                >
                  {isSpecial && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 ${
                      colorMap[way.color] || colorMap.primary
                    }`}
                  >
                    {IconComponent && (
                      <IconComponent size={22} className={iconColorMap[way.color] || iconColorMap.primary} />
                    )}
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mb-1">
                    {String(way.id).padStart(2, "0")}
                  </div>
                  <h3 className={`font-extrabold mb-2 ${isSpecial ? "text-xl text-primary" : "text-foreground"}`}>
                    {way.title}
                  </h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{way.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">
              What Guests <span className="text-secondary">Say</span>
            </h2>
            <p className="text-muted-foreground">Real stories from real agritourism travellers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 card-hover">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.location}</div>
                  <div className="text-accent text-xs mt-0.5">{t.farm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">
                Share Your <span className="text-primary">Experience</span>
              </h2>
              <p className="text-muted-foreground">
                Tell us about your agritourism adventure and inspire others.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light mb-4">
                  <Star size={32} className="fill-secondary text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Thank you for sharing!</h3>
                <p className="text-muted-foreground text-sm">
                  Your feedback helps other travellers discover amazing agritourism experiences.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 border-primary text-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setFeedbackForm({ name: "", message: "", rating: 5 });
                  }}
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitFeedback}
                className="bg-card rounded-2xl border border-border p-6 space-y-5"
              >
                <div>
                  <Label htmlFor="feedbackName">Your Name</Label>
                  <Input
                    id="feedbackName"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="John Smith"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFeedbackForm((p) => ({ ...p, rating: r }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={
                            feedbackForm.rating >= r
                              ? "fill-secondary text-secondary"
                              : "text-muted"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedbackMessage">Your Experience</Label>
                  <Textarea
                    id="feedbackMessage"
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your agritourism adventure..."
                    className="mt-1 resize-none"
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-light font-bold"
                >
                  <Send size={16} className="mr-2" />
                  Submit Feedback
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
