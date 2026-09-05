import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "../utils";

function Heading({ level, children }) {
  const Tag = `h${level}`;
  const text = React.Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : c.props.children))
    .join("");
  const id = slugify(String(text));
  return (
    <Tag id={id} className="group relative">
      <a className="no-underline" href={`#${id}`}>
        {children}
      </a>
    </Tag>
  );
}

const components = {
  h1: ({ node, ...props }) => <Heading level={1} {...props} />,
  h2: ({ node, ...props }) => <Heading level={2} {...props} />,
  h3: ({ node, ...props }) => <Heading level={3} {...props} />,
  h4: ({ node, ...props }) => <Heading level={4} {...props} />,
  a: ({ node, children, ...props }) => (
    <a {...props} target={String(props.href || "").startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ node, ...props }) => (
    <img {...props} loading="lazy" className="rounded-xl border border-outline-variant/30 my-4" alt={props.alt || ""} />
  ),
};

export default function MarkdownView({ content }) {
  return (
    <div className="md-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
