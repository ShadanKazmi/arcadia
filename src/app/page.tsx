'use client'
import BottomBar from "@/components/BottomBar";
import GameCarousel from "@/components/GameCarousel";
import Header from "@/components/Header";
import PopularGames from "@/components/PopularGames";
import ShowcaseByCategory from "@/components/ShowcaseByCategory";
import TalkToHer from "@/components/TalkToHer";

export default function Home() {
  return (
    <>
    <Header/>
    <GameCarousel/>
    <PopularGames/>
    <ShowcaseByCategory />
    <TalkToHer/>
    <BottomBar/>
    </>
  );
}
