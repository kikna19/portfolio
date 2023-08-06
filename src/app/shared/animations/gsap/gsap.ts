export const circular = (animation: GSAPAnimation): void => {
  if (animation && animation.progress() === 1)
    animation.reverse();
  if (animation.progress() === 0)
    animation.restart();
}
