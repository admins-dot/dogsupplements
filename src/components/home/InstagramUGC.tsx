import { useState, useEffect } from "react";
import { Instagram, Heart, MessageCircle, Bookmark } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { useIsMobile } from "@/hooks/use-mobile";
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

const PostCard = ({ post }: { post: typeof posts[0] }) => (
  <div className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm">
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
);

const MobileCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
    }
  };


  const getPosition = (index: number) => {
    const diff = (index - activeIndex + posts.length) % posts.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  return (
    <div 
      className="relative h-[480px] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
        {posts.map((post, index) => {
          const position = getPosition(index);
          
          const transforms = {
            center: {
              transform: "translateX(0) scale(1) rotateY(0deg)",
              opacity: 1,
              zIndex: 30,
            },
            right: {
              transform: "translateX(60%) scale(0.75) rotateY(-25deg)",
              opacity: 1,
              zIndex: 20,
            },
            left: {
              transform: "translateX(-60%) scale(0.75) rotateY(25deg)",
              opacity: 1,
              zIndex: 20,
            },
          };

          const style = transforms[position];

          return (
            <div
              key={index}
              className="absolute w-[75%] max-w-[320px] transition-all duration-700 ease-out"
              style={{
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
                transformStyle: "preserve-3d",
              }}
              onClick={() => setActiveIndex(index)}
            >
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const InstagramUGC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-3">
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">Real Customers, Real Results</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The .day Community
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile Carousel */}
        {isMobile && <MobileCarousel />}

        {/* Desktop Grid */}
        {!isMobile && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <StaggerItem key={index}>
                <div className="hover:shadow-md transition-shadow duration-300">
                  <PostCard post={post} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
};
