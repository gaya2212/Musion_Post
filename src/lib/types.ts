export type ReleaseStage =
  | "concept"
  | "production"
  | "pre-release"
  | "launch"
  | "post-release"
  | "growth";

export type TaskStatus = "pending" | "in-progress" | "completed" | "approved";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export type Platform =
  | "spotify"
  | "apple-music"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "soundcloud";

export interface Release {
  id: string;
  title: string;
  artist: string;
  stage: ReleaseStage;
  releaseDate: string;
  coverArt?: string;
  genre: string;
  bpm?: number;
  key?: string;
  description: string;
  platforms: Platform[];
  streams: number;
  saves: number;
  playlistPlacements: number;
  pressContacts: number;
  aiScore: number;
  createdAt: string;
}

export interface PromotionalTask {
  id: string;
  releaseId: string;
  releaseTitle: string;
  title: string;
  description: string;
  platform?: Platform;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  isAiGenerated: boolean;
  isAiExecuted: boolean;
  executionResult?: string;
  category:
    | "social"
    | "playlist"
    | "press"
    | "advertising"
    | "content"
    | "distribution";
}

export interface AiRecommendation {
  id: string;
  releaseId: string;
  releaseTitle: string;
  type:
    | "strategy"
    | "timing"
    | "platform"
    | "content"
    | "audience"
    | "budget";
  title: string;
  summary: string;
  details: string;
  confidence: number;
  impact: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  createdAt: string;
  isActioned: boolean;
}

export interface CalendarEvent {
  id: string;
  releaseId: string;
  releaseTitle: string;
  title: string;
  date: string;
  type:
    | "release"
    | "promo"
    | "pitch"
    | "content"
    | "review"
    | "campaign-start"
    | "campaign-end";
  platform?: Platform;
  isAiScheduled: boolean;
  description: string;
}

export interface AnalyticsData {
  releaseId: string;
  releaseTitle: string;
  streams: StreamData[];
  demographics: DemographicData[];
  platforms: PlatformData[];
  growth: GrowthData[];
}

export interface StreamData {
  date: string;
  streams: number;
  saves: number;
  skips: number;
}

export interface DemographicData {
  age: string;
  percentage: number;
}

export interface PlatformData {
  platform: string;
  streams: number;
  saves: number;
  playlistAdds: number;
}

export interface GrowthData {
  week: string;
  followers: number;
  monthlyListeners: number;
}

export interface ArtistProfile {
  id: string;
  name: string;
  genre: string;
  monthlyListeners: number;
  followers: number;
  totalStreams: number;
  releaseCount: number;
  topMarkets: string[];
  plan: "starter" | "pro" | "label";
}
