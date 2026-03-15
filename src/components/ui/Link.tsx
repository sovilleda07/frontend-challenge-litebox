import arrowLime from '../../assets/arrow-lime.png';
import arrowPurple from '../../assets/arrow-purple.png';

type ArrowColor = 'lime' | 'purple';

interface LinkProps {
  label?: string;
  onClick?: () => void;
  arrowColor?: ArrowColor;
  textColor?: string;
}

const arrowAssets: Record<ArrowColor, string> = {
  lime: arrowLime,
  purple: arrowPurple,
};

export const Link = ({
  label = 'Read',
  onClick,
  arrowColor = 'lime',
  textColor = 'white',
}: LinkProps) => {
  const textColorClass =
    textColor === 'black'
      ? 'text-black'
      : textColor === 'white'
        ? 'text-white'
        : '';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 ${textColorClass} text-sm font-medium transition-colors cursor-pointer`}
    >
      {label}
      <img
        src={arrowAssets[arrowColor]}
        alt="arrow"
        className="w-[24px]"
      />
    </button>
  );
};
