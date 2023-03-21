import { HTMLAttributes } from 'react';

interface IBackgroundBlurProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
}

export const BackgroundBlur = ({ isVisible, ...rest }: IBackgroundBlurProps) =>
  isVisible ? (
    <div
      className="w-screen h-screen backdrop-blur-sm fixed left-0 top-0 fadeIn hidden sm:block"
      {...rest}
    />
  ) : (
    <></>
  );
