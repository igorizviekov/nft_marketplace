import React from 'react';
import { INFTLog } from '../../../../store/model/profile/profile.types';

export interface IActivityBodyProps {
  activities: INFTLog[];
}

export interface ITooltipProps {
  time: Date;
  ref?: React.RefObject<HTMLElement>;
}
