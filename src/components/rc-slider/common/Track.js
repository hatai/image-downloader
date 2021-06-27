/* eslint-disable react/prop-types */

const Track = props => {
  const { className, included, vertical, offset, length, style } = props;

  const positionStyle = vertical
    ? {
        bottom: `${offset}%`,
        height: `${length}%`
      }
    : {
        left: `${offset}%`,
        width: `${length}%`
      };

  const elStyle = {
    ...style,
    ...positionStyle
  };

  return included ? <div className={className} style={elStyle} /> : null;
};

export default Track;
