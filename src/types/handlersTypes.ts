export type HandleFillingType = {
  setFill: React.Dispatch<React.SetStateAction<string>>;
  initialFill: string; 
  indexRect: number;
}

export type HandleColoringType = {
  setFill: React.Dispatch<React.SetStateAction<string>>;
  setAlpha: React.Dispatch<React.SetStateAction<number>>;
  initialFill: string;
  someFill: string;
  indexRect: number; 
}