import arrowLime from '../../assets/arrow-lime.png';
import arrowPurple from '../../assets/arrow-purple.png';

type ArrowColor = 'lime' | 'purple';

interface LinkProps {
  label?: string;
  onClick?: () => void;
  arrowColor?: ArrowColor;
}

const arrowAssets: Record<ArrowColor, string> = {
  lime: arrowLime,
  purple: arrowPurple,
};

export const Link = ({
  label = 'Read',
  onClick,
  arrowColor = 'lime',
}: LinkProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-white text-sm font-medium transition-colors cursor-pointer"
    >
      {label}
      <img
        src={arrowAssets[arrowColor]}
        alt="arrow"
        style={{ width: '24px' }}
      />
    </button>
  );
};
