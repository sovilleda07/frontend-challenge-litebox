import { TopicPill } from '../ui/TopicPill';

interface TopicsFilterProps {
  topics: string[];
  activeTopics: string[];
  onToggle: (topic: string) => void;
}

export const TopicsFilter = ({
  topics,
  activeTopics,
  onToggle,
}: TopicsFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full px-6 md:px-0">
      <h3 className="text-white font-bold shrink-0 text-[18px] leading-[100%]">
        Topics
      </h3>

      <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
        <div className="flex items-center gap-2 md:flex-wrap w-max md:w-auto">
          {topics.map((topic) => (
            <TopicPill
              key={topic}
              label={topic}
              active={activeTopics.includes(topic)}
              showClose={activeTopics.includes(topic)}
              onClick={() => onToggle(topic)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
