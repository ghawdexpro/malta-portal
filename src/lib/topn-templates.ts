/**
 * Top N Video Templates - Defines visual styles for ranked list videos
 */

export type TopNTemplate = 'countdown' | 'infographic' | 'minimal';
export type TopNCount = 3 | 5 | 10;

export interface TopNTemplateConfig {
  id: TopNTemplate;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  numberPosition: 'center' | 'topLeft' | 'topRight';
  numberFontSize: number;
  numberColor: string;
  numberBorderWidth: number;
  numberBorderColor: string;
  showTitle: boolean;
  titleFontSize: number;
  titlePosition: 'top' | 'bottom' | 'center';
  transitionType: 'fade' | 'slideleft' | 'slideright';
  transitionDuration: number;
  backgroundFilter?: string; // e.g. "boxblur=10:10" for behind number
  /** Intro scene: title font size */
  introTitleFontSize: number;
  /** Intro scene: hook font size */
  introHookFontSize: number;
  /** Default bundled font ID for this template */
  fontId: string;
  /** Progress bar configuration */
  progressBar?: {
    enabled: boolean;
    style: 'bar' | 'countdown' | 'both';
    color: string;
    height: number;
    position: 'bottom' | 'top';
  };
}

export type ProgressBarStyle = 'bar' | 'countdown' | 'both' | 'none';

export interface TopNIntro {
  hook: string;
  visual_prompt: string;
}

export const TOPN_TEMPLATES: Record<TopNTemplate, TopNTemplateConfig> = {
  countdown: {
    id: 'countdown',
    name: 'Odliczanie',
    nameEn: 'Countdown',
    description: 'Duzy numer na srodku, rozmycie za liczba',
    descriptionEn: 'Big centered number, blur behind the number',
    icon: '🔢',
    numberPosition: 'center',
    numberFontSize: 300,
    numberColor: 'white',
    numberBorderWidth: 8,
    numberBorderColor: 'black',
    showTitle: true,
    titleFontSize: 60,
    titlePosition: 'bottom',
    transitionType: 'fade',
    transitionDuration: 0.5,
    backgroundFilter: 'boxblur=4:4',
    introTitleFontSize: 80,
    introHookFontSize: 52,
    fontId: 'bebas',
  },
  infographic: {
    id: 'infographic',
    name: 'Infografika',
    nameEn: 'Infographic',
    description: 'Panel z numerem po lewej, obraz po prawej',
    descriptionEn: 'Number panel on left, image on right',
    icon: '📊',
    numberPosition: 'topLeft',
    numberFontSize: 200,
    numberColor: 'white',
    numberBorderWidth: 4,
    numberBorderColor: '#1a365d',
    showTitle: true,
    titleFontSize: 50,
    titlePosition: 'top',
    transitionType: 'slideleft',
    transitionDuration: 0.4,
    introTitleFontSize: 72,
    introHookFontSize: 46,
    fontId: 'montserrat',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimalistyczny',
    nameEn: 'Minimal',
    description: 'Mala odznaka w rogu, czysty styl',
    descriptionEn: 'Small badge in corner, clean style',
    icon: '✨',
    numberPosition: 'topRight',
    numberFontSize: 80,
    numberColor: 'white',
    numberBorderWidth: 3,
    numberBorderColor: 'black',
    showTitle: false,
    titleFontSize: 0,
    titlePosition: 'top',
    transitionType: 'fade',
    transitionDuration: 0.3,
    introTitleFontSize: 64,
    introHookFontSize: 40,
    fontId: 'poppins',
  },
};

export interface TopNItem {
  rank: number;
  title: string;
  description: string;
  visual_prompt: string;
}
