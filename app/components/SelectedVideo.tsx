"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Video = {
  id: string;
  name: string;
  url: string;
};

type SelectedVideoContextType = {
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string | null) => void;
};

const SelectedVideoContext = createContext<SelectedVideoContextType | undefined>(undefined);

export function SelectedVideoProvider({ children }: { children: ReactNode }) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <SelectedVideoContext.Provider value={{ selectedVideoId, setSelectedVideoId }}>
      {children}
    </SelectedVideoContext.Provider>
  );
}

export function useSelectedVideo() {
  const context = useContext(SelectedVideoContext);
  if (!context) throw new Error("useSelectedVideo must be used within SelectedVideoProvider");
  return context;
}
