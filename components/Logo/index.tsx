import LogoLight from '@/public/sellers-wand_logo.svg';
import LogoDark from '@/public/sellers-wand_logo_dark.svg';
import LogoWithTextLight from '@/public/sellers-wand_logo_with_text.svg';
import LogoWithTextDark from '@/public/sellers-wand_logo_with_text_dark.svg';
import Image from 'next/image';

const LOGO_ASPECT_RATIO = 1;
const LOGO_WITH_TEXT_ASPECT_RATIO = 1200 / 500;

export default function Logo({ width = 64, height, withText = false }: Props) {
  const ASPECT_RATIO = withText ? LOGO_WITH_TEXT_ASPECT_RATIO : LOGO_ASPECT_RATIO;
  const adjustedHeight = width ? width / ASPECT_RATIO : height;
  const adjustedWidth = height ? height * ASPECT_RATIO : width;

  if (withText) {
    return (
      <>
        <Image
          className="inline-block dark:hidden"
          src={LogoWithTextLight.src}
          alt="sellers-wand logo"
          width={adjustedWidth}
          height={adjustedHeight}
        />
        <Image
          className="hidden dark:inline-block"
          src={LogoWithTextDark.src}
          alt="sellers-wand logo"
          width={adjustedWidth}
          height={adjustedHeight}
        />
      </>
    );
  }

  return (
    <>
      <Image
        className="inline-block dark:hidden"
        src={LogoLight.src}
        alt="sellers-wand logo"
        width={adjustedWidth}
        height={adjustedHeight}
      />
      <Image
        className="hidden dark:inline-block"
        src={LogoDark.src}
        alt="sellers-wand logo"
        width={adjustedWidth}
        height={adjustedHeight}
      />
    </>
  );
}

type Props = {
  width?: number;
  height?: number;
  withText?: boolean;
};
