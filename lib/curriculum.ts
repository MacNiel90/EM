import curriculumData from './lessons.json';

export interface Curriculum {
  level: string;
  topics: string[];
  status: string;
}

// Define the actual structure from the JSON
interface BasicLevel {
  level: string;
  topics: string[];
  status: string;
}

interface JHSLevel {
  level: string;
  core_topics: string[];
  status: string;
}

interface SHSLevel {
  level: string;
  core_topics: string[];
  status: string;
}

interface SHSElectiveLevel {
  level: string;
  elective_topics: string[];
  status: string;
}

type CurriculumLevel = BasicLevel | JHSLevel | SHSLevel | SHSElectiveLevel;

/**
 * Gets the curriculum topics for the student's *exact* grade level.
 * @param grade The student's grade (e.g., "Basic 4", "JHS 2", "SHS 1")
 * @returns An array of Curriculum topics.
 */
export const getTopicsForGrade = (grade: string): Curriculum[] => {
  const gradeLower = grade.toLowerCase();
  let key = '';

  if (gradeLower.includes('basic')) {
    const num = gradeLower.match(/\d+/)?.[0];
    key = `basic-${num}`;
  } else if (gradeLower.includes('jhs')) {
    const num = gradeLower.match(/\d+/)?.[0];
    key = `jhs-${num}`;
  } else if (gradeLower.includes('shs')) {
    const num = gradeLower.match(/\d+/)?.[0];
    key = `shs-${num}`;
  } else {
    key = 'basic-1'; // Fallback default
  }

  // Get the raw data and normalize it
  const data = curriculumData as Record<string, CurriculumLevel[]>;
  const rawData = data[key] || [];
  
  // Convert to normalized Curriculum format
  return rawData.map(item => {
    let topics: string[] = [];
    
    if ('topics' in item) {
      topics = item.topics;
    } else if ('core_topics' in item) {
      topics = item.core_topics;
    } else if ('elective_topics' in item) {
      topics = item.elective_topics;
    }
    
    return {
      level: item.level,
      topics,
      status: item.status
    };
  });
};
