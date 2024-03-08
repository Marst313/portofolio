export const getRotationClass = (index, totalSkills) => {
  const rotationDegree = ((index + 1) * 360) / totalSkills;
  return `rotate-${rotationDegree}deg`;
};
