import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useWindowSize } from '../hooks/useWindowSize';
import { limitString } from '../utils/tools';

export const TooltipLabel = ({
  label,
  proportion = 50,
}) => {
  const window = useWindowSize();
  const charLimit = window.width / proportion;
  return (
    <Tooltip
      title={label}
      placement="top"
      arrow
    >
      <span>{limitString(label, charLimit)}</span>
    </Tooltip>
  );
};

TooltipLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  proportion: PropTypes.number,
};
