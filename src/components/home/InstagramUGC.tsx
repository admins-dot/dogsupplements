import { Instagram, Heart, MessageCircle, Bookmark } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import hikeDay from "@/assets/ugc/hike-day.png";
import pourOverDay from "@/assets/ugc/pour-over-day.png";
import roadtripDay from "@/assets/ugc/roadtrip-day.png";

const posts = [
  {
    image: hikeDay,
    username: "adventure_with_max",
    handle: "@adventure_with_max",
    caption: "Trail days hit different when your pup has energy to spare 🥾🐕 Thanks .day!",
    likes: "2,847",
    comments: "143",
    timeAgo: "2d",
    avatar: "M",
  },
  {
    image: pourOverDay,
    username: "luna_the_heeler",
    handle: "@luna_the_heeler",
    caption: "Morning routine: coffee for me, .day for Luna ☕✨ She literally waits by her bowl now",
    likes: "1,923",
    comments: "89",
    timeAgo: "4d",
    avatar: "L",
  },
  {
    image: roadtripDay,
    username: "goldengirl.bella",
    handle: "@goldengirl.bella",
    caption: "Road trip essentials: snacks, good tunes, and Bella's daily vitamins 🚗💛 #dotday",
    likes: "3,412",
    comments: "201",
    timeAgo: "1w",
    avatar: "B",
  },
];

export const InstagramUGC = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-3">
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">Real Customers, Real Results</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground">
              The .day Community
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <StaggerItem key={index}>
              <div className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Post Header */}
                <div className="flex items-center gap-3 p-3 border-b border-border/30">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{post.username}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>

                {/* Post Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={`Customer photo by ${post.username}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <button className="hover:opacity-70 transition-opacity">
                        <Heart className="w-5 h-5 text-foreground" />
                      </button>
                      <button className="hover:opacity-70 transition-opacity">
                        <MessageCircle className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                    <button className="hover:opacity-70 transition-opacity">
                      <Bookmark className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{post.likes} likes</p>
                  <p className="text-sm text-foreground/90 line-clamp-2">
                    <span className="font-semibold">{post.username}</span>{" "}
                    {post.caption}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    View all {post.comments} comments
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
