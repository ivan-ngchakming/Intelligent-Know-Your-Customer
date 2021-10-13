export const drawRect = (top_x, top_y, width, height, index) => {
  const _width = width;
  const _height = height;
  const _left = top_x;
  const _top = top_y;

  return (
    <div
      key={index}
      style={{
        border: `1px solid red`,
        position: 'absolute',
        zIndex: 99,
        width: _width,
        height: _height,
        top: _top,
        left: _left,
      }}
    />
  )
}