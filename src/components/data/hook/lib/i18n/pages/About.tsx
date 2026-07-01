import {
  Target,
  Globe,
  Users,
  Leaf,
  TrendingUp,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { FARM_IMAGES } from "@/data/sampleData";

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We champion regenerative agriculture and eco-tourism practices that protect the environment for future generations.",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "We believe in the power of rural communities and support local farmers to share their passion with the world.",
  },
  {
    icon: Globe,
    title: "Cultural Respect",
    desc: "We honour Aboriginal and Torres Strait Islander knowledge, traditions, and their deep connection to Country.",
  },
  {
    icon: TrendingUp,
    title: "Economic Growth",
    desc: "We create new income streams for farmers and drive rural economic development through responsible tourism.",
  },
];

const team = [
  {
    name: "David Agri",
    role: "Founder & CEO",
    img: FARM_IMAGES.groupTour,
    bio: "Third-generation farmer turned agritourism advocate. David launched Agri2rist Hub to connect rural communities with the world.",
  },
  {
    name: "Rachel Waters",
    role: "Head of Partnerships",
    img: FARM_IMAGES.fishPonds,
    bio: "With 15 years in tourism, Rachel builds bridges between farm operators, travellers and Indigenous communities.",
  },
  {
    name: "Marcus Chen",
    role: "Technology Lead",
    img: FARM_IMAGES.dairy,
    bio: "Marcus combines his love of technology and farming to build the digital infrastructure that powers Agri2rist Hub.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FARM_IMAGES.fishPonds})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4">
            About <span className="text-gradient-gold">Agri2rist Hub</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
            Connecting travellers with authentic farming experiences — from dairy farms to Aboriginal
            cultural tourism.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-light text-accent text-sm font-semibold px-3 py-1 rounded-full mb-4">
                <Target size={14} />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">
                Local Roots,
                <span className="text-primary"> Global Impacts</span>
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-5">
                Agri2rist Hub was founded on a simple but powerful belief: the world's farms are
                among its most valuable cultural and educational resources. When travellers visit
                farms, they don't just see how food is grown — they connect with the land, the
                communities, and the traditions that sustain us all.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                We are dedicated to promoting sustainable agritourism that respects the environment,
                uplifts farming communities, celebrates Aboriginal cultural knowledge, and creates
                meaningful experiences for visitors from around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/explore">
                  <Button className="bg-primary text-primary-foreground">
                    Explore Farms <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/get-listed">
                  <Button variant="outline" className="border-primary text-primary">
                    Get Listed
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={FARM_IMAGES.groupTour} alt="Community" loading="lazy" decoding="async" className="rounded-xl w-full h-52 object-cover" />
              <img src={FARM_IMAGES.dairy} alt="Dairy" loading="lazy" decoding="async" className="rounded-xl w-full h-52 object-cover mt-6" />
              <img src={FARM_IMAGES.tilapia} alt="Fish" loading="lazy" decoding="async" className="rounded-xl w-full h-52 object-cover -mt-6" />
              <img src={FARM_IMAGES.eggs} alt="Eggs" loading="lazy" decoding="async" className="rounded-xl w-full h-52 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Listed Farms" },
              { value: "15,000+", label: "Happy Guests" },
              { value: "8", label: "States & Territories" },
              { value: "2019", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold text-gradient-gold mb-1">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">
              Our <span className="text-accent">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything we do is guided by our commitment to people, planet, and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div key={val.title} className="bg-card border border-border rounded-xl p-6 card-hover text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-light mb-4">
                  <val.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">
              Meet the <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground">Passionate people building bridges between farms and travellers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-xl overflow-hidden card-hover">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Ready to Start Your <span className="text-gradient-gold">Rural Adventure?</span>
          </h2>
          <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto mb-8">
            Whether you're a traveller seeking authentic experiences or a farm operator wanting to
            share your story — Agri2rist Hub is your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="bg-secondary text-secondary-foreground font-bold px-8 shadow-gold">
                Explore Farms
              </Button>
            </Link>
            <Link to="/get-listed">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold px-8">
                Get Your Farm Listed
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
