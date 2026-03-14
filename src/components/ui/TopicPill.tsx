interface TopicPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const TopicPill = ({
  label,
  active = false,
  onClick,
}: TopicPillProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        rounded-full border transition-all duration-200
        font-medium text-sm cursor-pointer whitespace-nowrap
        ${
          active
            ? 'bg-lime text-black border-lime'
            : 'bg-transparent text-gray-light border-gray-lighthover:border-white hover:text-white'
        }
      `}
    >
      {label}
      <span className="text-base">×</span>
    </button>
  );
};
