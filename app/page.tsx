"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Search, AlertCircle, Copy, Check, Github } from "lucide-react";
import * as IconPark from "@icon-park/react";
import * as AntDesign from "@ant-design/icons";
import * as Heroicons from "@heroicons/react/24/outline";
import * as HeroiconsSolid from "@heroicons/react/24/solid";
import * as Lucide from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as FontAwesome from "@fortawesome/free-solid-svg-icons";

interface IconRecommendation {
  name: string;
  reason: string;
}

interface LLMResponse {
  iconpark?: IconRecommendation[];
  font_awesome?: IconRecommendation[];
  ant_design?: IconRecommendation[];
  heroicons?: IconRecommendation[];
  lucide?: IconRecommendation[];
}

type IconLibrary = 'iconpark' | 'font_awesome' | 'ant_design' | 'heroicons' | 'lucide';


// Icon props interface for IconPark components
interface IconProps {
  size?: number;
  theme?: "outline" | "filled" | "two-tone" | "multi-color";
  strokeWidth?: number;
  className?: string;
}

// Helper function to render error icon
const ErrorIcon = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded border-2 border-dashed border-muted-foreground/30">
    <AlertCircle className="w-4 h-4 text-muted-foreground" />
  </div>
);

// Global variables to store icon names for validation
let iconParkNamesSet: Set<string> | null = null;
let fontAwesomeNamesSet: Set<string> | null = null;
let antDesignNamesSet: Set<string> | null = null;
let heroiconsNamesSet: Set<string> | null = null;
let lucideNamesSet: Set<string> | null = null;

// Function to load IconPark icon names
const loadIconParkNames = async (): Promise<Set<string>> => {
  if (iconParkNamesSet) {
    return iconParkNamesSet;
  }
  
  try {
    const response = await fetch('/icons/iconpark.json');
    if (!response.ok) {
      throw new Error('Failed to load IconPark icons data');
    }
    const iconsData = await response.json();
    iconParkNamesSet = new Set(iconsData.map((icon: { name: string }) => icon.name));
    return iconParkNamesSet;
  } catch (error) {
    console.error('Error loading IconPark names:', error);
    return new Set();
  }
};

// Function to get Font Awesome icon names
const getFontAwesomeNames = (): Set<string> => {
  if (fontAwesomeNamesSet) {
    return fontAwesomeNamesSet;
  }
  
  fontAwesomeNamesSet = new Set();
  Object.keys(FontAwesome).forEach(key => {
    if (key.startsWith('fa') && key.length > 2) {
      // Convert from faCamelCase to kebab-case
      const iconName = key.substring(2).replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
      fontAwesomeNamesSet!.add(iconName);
    }
  });
  
  return fontAwesomeNamesSet;
};

// Function to get Ant Design icon names
const getAntDesignNames = (): Set<string> => {
  if (antDesignNamesSet) {
    return antDesignNamesSet;
  }
  
  antDesignNamesSet = new Set();
  Object.keys(AntDesign).forEach(key => {
    if (key.endsWith('Outlined')) {
      // Convert from PascalCaseOutlined to kebab-case
      const iconName = key.replace('Outlined', '').replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
      antDesignNamesSet!.add(iconName);
    }
  });
  
  return antDesignNamesSet;
};

// Function to get Heroicons names
const getHeroiconsNames = (): Set<string> => {
  if (heroiconsNamesSet) {
    return heroiconsNamesSet;
  }
  
  heroiconsNamesSet = new Set();
  const addIconsFromLib = (lib: typeof Heroicons) => {
    Object.keys(lib).forEach(key => {
      if (key.endsWith('Icon')) {
        // Convert from PascalCaseIcon to kebab-case
        const iconName = key.replace('Icon', '').replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
        heroiconsNamesSet!.add(iconName);
      }
    });
  };
  
  addIconsFromLib(Heroicons as unknown as typeof Heroicons);
  addIconsFromLib(HeroiconsSolid as unknown as typeof Heroicons);
  
  return heroiconsNamesSet;
};

// Function to get Lucide icon names
const getLucideNames = (): Set<string> => {
  if (lucideNamesSet) {
    return lucideNamesSet;
  }
  
  lucideNamesSet = new Set();
  Object.keys(Lucide).forEach(key => {
    // Convert from PascalCase to kebab-case
    const iconName = key.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    lucideNamesSet!.add(iconName);
  });
  
  return lucideNamesSet;
};

// Unified validation function for all icon libraries
const validateIconName = async (library: IconLibrary, iconName: string): Promise<boolean> => {
  switch (library) {
    case 'iconpark':
      const iconParkNames = await loadIconParkNames();
      return iconParkNames.has(iconName);
    case 'font_awesome':
      const fontAwesomeNames = getFontAwesomeNames();
      return fontAwesomeNames.has(iconName);
    case 'ant_design':
      const antDesignNames = getAntDesignNames();
      return antDesignNames.has(iconName);
    case 'heroicons':
      const heroiconsNames = getHeroiconsNames();
      return heroiconsNames.has(iconName);
    case 'lucide':
      const lucideNames = getLucideNames();
      return lucideNames.has(iconName);
    default:
      return false;
  }
};

// Helper function to convert kebab-case to PascalCase
const toPascalCase = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

// Helper function to convert kebab-case to camelCase with 'fa' prefix
const toFontAwesomeCamelCase = (str: string) => {
  return 'fa' + str.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

// Function to generate React code for each icon library
const generateReactCode = (library: IconLibrary, iconName: string): string => {
  switch (library) {
    case 'iconpark':
      const iconParkComponent = toPascalCase(iconName);
      return `<${iconParkComponent} size={24} theme="outline" strokeWidth={2} />`;

    case 'font_awesome':
      const faIconKey = toFontAwesomeCamelCase(iconName);
      return `<FontAwesomeIcon icon={${faIconKey}} />`;

    case 'ant_design':
      const antComponent = toPascalCase(iconName) + 'Outlined';
      return `<${antComponent} />`;

    case 'heroicons':
      const heroComponent = toPascalCase(iconName) + 'Icon';
      return `<${heroComponent} className="h-6 w-6" />`;

    case 'lucide':
      const lucideComponent = toPascalCase(iconName);
      return `<${lucideComponent} size={24} />`;

    default:
      return `// Unknown library: ${library}`;
  }
};

// Component to dynamically render Iconpark icons
const IconParkIcon = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  const componentName = toPascalCase(iconName);
  
  // Get the icon component safely
  let IconComponent: React.ComponentType<IconProps> | undefined;
  try {
    IconComponent = (IconPark as unknown as Record<string, React.ComponentType<IconProps>>)[componentName];
  } catch (error) {
    console.warn(`Icon ${iconName} (${componentName}) component not found in IconPark library:`, error);
  }

  if (!IconComponent) {
    return <ErrorIcon />;
  }

  return (
    <IconComponent 
      size={size} 
      theme="outline" 
      strokeWidth={2}
      className="text-primary"
    />
  );
};

// Component to dynamically render Font Awesome icons
const FontAwesomeIconComponent = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  const iconKey = toFontAwesomeCamelCase(iconName);
  const icon = (FontAwesome as Record<string, unknown>)[iconKey];

  if (!icon || typeof icon !== 'object') {
    console.warn(`Icon ${iconName} (${iconKey}) not found in Font Awesome library`);
    return <ErrorIcon />;
  }

  return (
    <FontAwesomeIcon 
      icon={icon as IconProp} 
      size="lg" 
      className="text-primary"
      style={{ fontSize: `${size}px` }}
    />
  );
};

// Component to dynamically render Ant Design icons
const AntDesignIcon = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  const componentName = toPascalCase(iconName) + 'Outlined';
  const IconComponent = (AntDesign as unknown as Record<string, React.ComponentType<Record<string, unknown>>>)[componentName];

  if (!IconComponent) {
    console.warn(`Icon ${iconName} (${componentName}) not found in Ant Design library`);
    return <ErrorIcon />;
  }

  return (
    <IconComponent 
      style={{ fontSize: `${size}px`, color: 'hsl(var(--primary))' }}
    />
  );
};

// Component to dynamically render Heroicons
const HeroIcon = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  const componentName = toPascalCase(iconName) + 'Icon';
  let IconComponent = (Heroicons as unknown as Record<string, React.ComponentType<Record<string, unknown>>>)[componentName];
  
  // Try solid version if outline doesn't exist
  if (!IconComponent) {
    IconComponent = (HeroiconsSolid as unknown as Record<string, React.ComponentType<Record<string, unknown>>>)[componentName];
  }

  if (!IconComponent) {
    console.warn(`Icon ${iconName} (${componentName}) not found in Heroicons library`);
    return <ErrorIcon />;
  }

  return (
    <IconComponent 
      width={size} 
      height={size} 
      className="text-primary"
    />
  );
};

// Component to dynamically render Lucide icons
const LucideIcon = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  const componentName = toPascalCase(iconName);
  const IconComponent = (Lucide as unknown as Record<string, React.ComponentType<Record<string, unknown>>>)[componentName];

  if (!IconComponent) {
    console.warn(`Icon ${iconName} (${componentName}) not found in Lucide library`);
    return <ErrorIcon />;
  }

  return (
    <IconComponent 
      size={size} 
      className="text-primary"
    />
  );
};

// Main icon renderer component
const IconRenderer = ({ library, iconName, size = 32 }: { library: IconLibrary; iconName: string; size?: number }) => {
  switch (library) {
    case 'iconpark':
      return <IconParkIcon iconName={iconName} size={size} />;
    case 'font_awesome':
      return <FontAwesomeIconComponent iconName={iconName} size={size} />;
    case 'ant_design':
      return <AntDesignIcon iconName={iconName} size={size} />;
    case 'heroicons':
      return <HeroIcon iconName={iconName} size={size} />;
    case 'lucide':
      return <LucideIcon iconName={iconName} size={size} />;
    default:
      return <ErrorIcon />;
  }
};

export default function Home() {
  const [requirement, setRequirement] = useState("");
  const [filteredRecommendations, setFilteredRecommendations] = useState<LLMResponse>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasQueried, setHasQueried] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const techStack = [
    { name: 'Next.js', href: 'https://nextjs.org/', iconName: 'application' },
    { name: 'TypeScript', href: 'https://www.typescriptlang.org/', iconName: 'file-code' },
    { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', iconName: 'layers' },
  ];

  // Function to filter invalid icons from recommendations
  const filterValidIcons = async (recommendations: LLMResponse): Promise<LLMResponse> => {
    const filtered: LLMResponse = {};
    
    for (const library of Object.keys(recommendations) as IconLibrary[]) {
      const icons = recommendations[library] || [];
      const validIcons: IconRecommendation[] = [];
      
      for (const icon of icons) {
        const isValid = await validateIconName(library, icon.name);
        if (isValid) {
          validIcons.push(icon);
        } else {
          console.warn(`Filtered out invalid ${library} icon: "${icon.name}"`);
        }
      }
      
      if (validIcons.length > 0) {
        filtered[library] = validIcons;
      }
    }
    
    return filtered;
  };

  // Function to copy text to clipboard with feedback
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Function to copy icon name
  const copyIconName = (iconName: string, library: IconLibrary, index: number) => {
    const key = `name-${library}-${iconName}-${index}`;
    copyToClipboard(iconName, key);
  };

  // Function to copy React code
  const copyReactCode = (iconName: string, library: IconLibrary, index: number) => {
    const key = `code-${library}-${iconName}-${index}`;
    const reactCode = generateReactCode(library, iconName);
    copyToClipboard(reactCode, key);
  };


  const handleSubmit = async () => {
    if (!requirement.trim()) {
      setError("Please enter your icon requirement");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFilteredRecommendations({});
    setHasQueried(true);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement: requirement
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const parsedResponse: LLMResponse = await response.json();
      
      // Filter out invalid icons
      setIsFiltering(true);
      const validRecommendations = await filterValidIcons(parsedResponse);
      setFilteredRecommendations(validRecommendations);
      setIsFiltering(false);
    } catch (err) {
      console.error("Error calling LLM API:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tech.name}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <IconParkIcon iconName={tech.iconName} size={18} />
                  {tech.name}
                </a>
              ))}
            </div>
            <div className="h-5 w-px bg-border" />
            <a
              href="https://github.com/alen-hh/icon-recommender"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star on GitHub"
              tabIndex={0}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-background/80 hover:bg-background transition-colors text-muted-foreground hover:text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 cursor-pointer"
            >
              <IconPark.GithubOne className="h-5 w-5" theme="outline" size={20} aria-label="GitHub" />
              <span>Star</span>
            </a>
          </div>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Icon Recommender
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get personalized icon recommendations powered by AI. Describe what you need, and get curated suggestions from the Iconpark library.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Describe Your Icon Requirements
              </CardTitle>
              <CardDescription>
                Tell us what kind of icon you need. Be specific about the context, style, or function.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., I need an icon for a delete button in my mobile app, or I'm looking for icons for a user profile section..."
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={4}
                className="resize-none"
              />
              {error && (
                <p className="text-destructive text-sm font-medium">{error}</p>
              )}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Press <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Cmd+Enter</kbd> to submit
                </p>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !requirement.trim()}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Getting Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filtering state */}
          {isFiltering && (
            <Card>
              <CardContent className="pt-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">
                  Validating icon recommendations...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Results - Only show after query has been executed and results are available */}
          {!isLoading && !isFiltering && hasQueried && !error && (() => {
            // Get library display names
            const getLibraryDisplayName = (library: IconLibrary) => {
              const names = {
                iconpark: 'IconPark',
                font_awesome: 'Font Awesome',
                ant_design: 'Ant Design',
                heroicons: 'Heroicons',
                lucide: 'Lucide'
              };
              return names[library];
            };
            
            // Get library tag colors
            const getLibraryTagColor = (library: IconLibrary) => {
              const colors = {
                iconpark: 'bg-blue-100 text-blue-800 border-blue-200',
                font_awesome: 'bg-orange-100 text-orange-800 border-orange-200',
                ant_design: 'bg-purple-100 text-purple-800 border-purple-200',
                heroicons: 'bg-green-100 text-green-800 border-green-200',
                lucide: 'bg-indigo-100 text-indigo-800 border-indigo-200'
              };
              return colors[library];
            };
            
            // Calculate total recommendations across all libraries (using filtered recommendations)
            const allRecommendations: Array<{ library: IconLibrary; icon: IconRecommendation }> = [];
            (Object.keys(filteredRecommendations) as IconLibrary[]).forEach(library => {
              const icons = filteredRecommendations[library] || [];
              icons.forEach(icon => {
                allRecommendations.push({ library, icon });
              });
            });
            
            // Show results if we have recommendations
            if (allRecommendations.length > 0) {
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Recommended Icons</h2>
                    <p className="text-sm text-muted-foreground">
                      {allRecommendations.length} valid icon{allRecommendations.length > 1 ? 's' : ''} found across {Object.keys(filteredRecommendations).length} librar{Object.keys(filteredRecommendations).length > 1 ? 'ies' : 'y'}
                    </p>
                  </div>
                  <div className="grid gap-4 md:gap-6">
                    {allRecommendations.map((item, index) => (
                      <Card key={`${item.library}-${item.icon.name}-${index}`} className="transition-colors hover:bg-accent/50">
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-[auto_200px_1fr_auto] gap-4 items-start">
                            <div className="flex items-center justify-center w-16 h-16 bg-background border rounded-lg shadow-sm">
                              <IconRenderer library={item.library} iconName={item.icon.name} size={32} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-primary">
                                {item.icon.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-1 rounded-md border font-medium ${getLibraryTagColor(item.library)}`}>
                                  {getLibraryDisplayName(item.library)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm leading-relaxed">
                                {item.icon.reason}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyIconName(item.icon.name, item.library, index)}
                                className="h-8 px-3 text-xs cursor-pointer"
                              >
                                {copiedStates[`name-${item.library}-${item.icon.name}-${index}`] ? (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    Name
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyReactCode(item.icon.name, item.library, index)}
                                className="h-8 px-3 text-xs cursor-pointer"
                              >
                                {copiedStates[`code-${item.library}-${item.icon.name}-${index}`] ? (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    Code
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }
            
            // Show empty state if no recommendations
            return (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No recommendations found. Try describing your requirements differently.
                  </p>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
