import React, { memo } from "react";
import { getRandomDarkColors } from "../../helper/colors";
import { isEqual } from "lodash";

interface DividedCircleProps {
  sections: string[];
  size?: number;
  colors?: string[];
  highlightedIndex?: number;
}

const DividedCircle: React.FC<DividedCircleProps> = ({
  sections,
  size = 300,
  colors = getRandomDarkColors(sections.length),
  highlightedIndex = -1,
}) => {
  const center = size / 2;
  const radius = size / 2 - 20; // Reduced padding from 10 to 5 to make circle bigger
  const anglePerSection = (2 * Math.PI) / sections.length;

  const createPath = (index: number) => {
    const startAngle = index * anglePerSection - Math.PI / 2; // Start from top
    const endAngle = (index + 1) * anglePerSection - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = anglePerSection > Math.PI ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = index * anglePerSection + anglePerSection / 2 - Math.PI / 2;
    const textRadius = radius * 0.7; // Position text at 70% of radius
    const x = center + textRadius * Math.cos(angle);
    const y = center + textRadius * Math.sin(angle);
    const rotationAngle = (angle * 180) / Math.PI; // Convert to degrees
    return { x, y, rotationAngle };
  };

  return (
    <svg
      width={size}
      height={size}
      style={{ display: "block", margin: "0 auto" }}
    >
      {sections.map((text, index) => {
        const { x, y, rotationAngle } = getTextPosition(index);
        const color = colors[index % colors.length];
        const isHighlighted = highlightedIndex === index;

        return (
          <g key={index}>
            <path
              d={createPath(index)}
              fill={color}
              stroke={isHighlighted ? "#fff" : "transparent"}
              strokeWidth={isHighlighted ? "4" : "2"}
              style={{ cursor: "pointer" }}
              opacity={isHighlighted ? 1 : highlightedIndex === -1 ? 1 : 0.2}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize={isHighlighted ? "15" : "12"}
              fontWeight="bold"
              style={{ userSelect: "none", pointerEvents: "none" }}
              transform={`rotate(${rotationAngle}, ${x}, ${y})`}
            >
              {text}
            </text>
          </g>
        );
      })}

      {/* Center circle for better visual */}
      <circle
        cx={center}
        cy={center}
        r="20"
        fill="#333"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  );
};

export default memo(DividedCircle, isEqual);
