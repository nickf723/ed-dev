"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type WorldDirectorValue = {
  scene: string | null;
  pinnedScene: string | null;
  previewScene: string | null;
  pinScene: (scene: string | null) => void;
  previewSceneById: (scene: string | null) => void;
};

const WorldDirectorContext = createContext<WorldDirectorValue>({
  scene: null,
  pinnedScene: null,
  previewScene: null,
  pinScene: () => undefined,
  previewSceneById: () => undefined,
});

export default function WorldDirector({
  children,
  initialScene = null,
}: {
  children: ReactNode;
  initialScene?: string | null;
}) {
  const [pinnedScene, setPinnedScene] = useState<string | null>(initialScene);
  const [previewScene, setPreviewScene] = useState<string | null>(null);

  return (
    <WorldDirectorContext.Provider
      value={{
        scene: previewScene ?? pinnedScene,
        pinnedScene,
        previewScene,
        pinScene: setPinnedScene,
        previewSceneById: setPreviewScene,
      }}
    >
      {children}
    </WorldDirectorContext.Provider>
  );
}

export function useWorldDirector() {
  return useContext(WorldDirectorContext);
}

export function WorldSceneFocus({
  scene,
  children,
  className,
}: {
  scene?: string | null;
  children: ReactNode;
  className?: string;
}) {
  const director = useWorldDirector();

  if (!scene) return <div className={className}>{children}</div>;

  return (
    <div
      className={className}
      onMouseEnter={() => director.previewSceneById(scene)}
      onMouseLeave={() => director.previewSceneById(null)}
      onFocusCapture={() => director.previewSceneById(scene)}
      onBlurCapture={() => director.previewSceneById(null)}
    >
      {children}
    </div>
  );
}
