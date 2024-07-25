import React, { useState} from "react";

import { Button } from "@/components/ui/button.tsx";
import metamask from "@/assets/metamask-icon.svg";
import {
  Bitcoin,
  Gamepad2,
  LightbulbIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import IconsSection from "@/Components/IconsSection";
import {authenticate} from "@/lib/Web3Service";

export default function Login() {

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const response = await authenticate();
    console.log(response);
    setLoading(false);
  }
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container py-24 lg:py-32">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Rock Papers Scissors
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
                Start playing now and win big prizes.
            </p>
            <div className="mt-7 sm:mt-12 mx-auto ">
                <Button
                disabled={loading}
                onClick={() => {
                  handleLogin();
                }}
                variant={"default"} className="w-max border-2 py-6 text-lg px-8 ">
                    <img src={metamask} className="w-6 h-auto mr-2" alt="Metamask" />
                    {loading ? "Connecting..." : "Connect with Metamask"}
                </Button>
            </div>
            <div className="mt-10 sm:mt-20 flex flex-wrap gap-2 justify-center">
              <Button variant={"outline"}>
                <Gamepad2 className="flex-shrink-0 w-3 h-auto mr-2" />
                Gaming
              </Button>
              <Button variant={"outline"}>
                <SettingsIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                Strategy
              </Button>
              <Button variant={"outline"}>
                <Bitcoin className="flex-shrink-0 w-3 h-auto mr-2" />
                Crypto
              </Button>
              <Button variant={"outline"}>
                <LightbulbIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                Creative
              </Button>
              <Button variant={"outline"}>
                <UsersIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                Community
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
      {/* Icon section */}
      <IconsSection />
      {/* End Icon section */}
      {/* Features section */}
    </>
  );
}
