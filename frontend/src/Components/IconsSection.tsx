import {
    FuelIcon,
    ShieldIcon,
    ThumbsUpIcon,
    TrophyIcon,
    UsersIcon,
    ZapIcon,
  } from "lucide-react";
  
  export default function IconsSection() {
    return (
      <>
        {/* Icon Blocks */}
        <div className="container pb-24 lg:pb-32">
          <div className="max-w-4xl mx-auto">
            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-6 lg:space-y-10">
                {/* Icon Block */}
                <div className="flex">
                  <ShieldIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Secure
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      We take security seriously and have implemented the latest
                      security standards.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <FuelIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Best gas prices
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      We&apos;ve optimized our contracts to provide the best gas
                      prices.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Fast transactions
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Our platform is optimized for fast transactions, so you can
                      play without interruptions.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
              </div>
              {/* End Col */}
              <div className="space-y-6 lg:space-y-10">
                {/* Icon Block */}
                <div className="flex">
                  <TrophyIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Leaderboard
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Compete with others and climb the leaderboard to win prizes.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <UsersIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                    Community
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Join our community and meet other players , share your experience and learn from others.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <ThumbsUpIcon className="flex-shrink-0 mt-2 h-8 w-8" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Easy to use
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Our platform is user friendly and easy to use , for all ages.

                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
        </div>
        {/* End Icon Blocks */}
      </>
    );
  }
  