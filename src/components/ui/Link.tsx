import arrowLime from '../../assets/arrow-lime.png';
import arrowPurple from '../../assets/arrow-purple.png';
import { FaChevronLeft } from 'react-icons/fa6';

type ArrowColor = 'lime' | 'purple';

type LinkVariant = 'default' | 'breadcrumb';

interface LinkProps {
  label?: string;
  onClick?: () => void;
  arrowColor?: ArrowColor;
  textColor?: string;
  showArrow?: boolean;
  variant?: LinkVariant;
  iconLeft?: React.ReactNode;
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
  showArrow = true,
  variant = 'default',
  iconLeft,
}: LinkProps) => {
  const textColorClass =
    textColor === 'black'
      ? 'text-black'
      : textColor === 'white'
        ? 'text-white'
        : '';

  const shouldShowArrow = variant === 'breadcrumb' ? false : showArrow;
  const defaultBreadcrumbIcon = (
    <FaChevronLeft
      className="w-[6px] h-[px] text-white"
      aria-hidden="true"
    />
  );
  const iconToRender =
    variant === 'breadcrumb' ? (iconLeft ?? defaultBreadcrumbIcon) : iconLeft;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 ${textColorClass} text-sm font-medium transition-colors cursor-pointer`}
    >
      {iconToRender}
      {label}
      {shouldShowArrow && (
        <img src={arrowAssets[arrowColor]} alt="arrow" className="w-[24px]" />
      )}
    </button>
  );
};
