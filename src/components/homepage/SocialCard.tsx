import type React from "react";
import type { JSX } from "react";

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="m-auto h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M14 3h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SocialCardProps {
  children: React.ReactNode;
  color: string;
  link: string;
  isMeLink?: boolean;
}

export const SocialCard = ({
  children,
  color,
  link,
  isMeLink = false,
}: SocialCardProps): JSX.Element => {
  return (
    <div
      className={`group relative flex h-20 w-28 flex-shrink-0 rounded-lg shadow-lg ${color} m-1`}
    >
      {children}
      <a
        className="absolute inset-0 hidden rounded-lg border border-accent bg-secondary bg-opacity-95 text-2xl shadow-xl group-hover:flex"
        href={link}
        rel={isMeLink ? "me noreferrer" : "noreferrer"}
        target="_blank"
      >
        <ExternalLinkIcon />
      </a>
    </div>
  );
};
