import { IconTypes } from '@/types/icon'

export default function TaskiplineLogo({
  width = 16,
  height = 16,
  size,
  className = '',
}: IconTypes) {
  return (
    <svg
      width={size || width}
      height={size || height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_9_82)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.2424 14.6667C11.3297 14.6667 10.5348 13.2795 10.1212 11.23C9.70767 13.2795 8.91273 14.6667 8 14.6667C7.08727 14.6667 6.29233 13.2795 5.8788 11.23C5.46523 13.2795 4.6703 14.6667 3.75757 14.6667C2.4187 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 2.4187 1.33333 3.75757 1.33333C4.6703 1.33333 5.46523 2.72048 5.8788 4.77C6.29233 2.72048 7.08727 1.33333 8 1.33333C8.91273 1.33333 9.70767 2.72048 10.1212 4.77C10.5348 2.72048 11.3297 1.33333 12.2424 1.33333C13.5813 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 13.5813 14.6667 12.2424 14.6667Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_82">
          <rect width="16" height="16" fill="black" />
        </clipPath>
      </defs>
    </svg>
  )
}
