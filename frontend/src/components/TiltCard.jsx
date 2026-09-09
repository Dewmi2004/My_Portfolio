import { useRef } from "react";

export default function TiltCard({
  children,
  className = "",
  as: Tag = "div",
  strength = 8,
  nodeRef,
  ...rest
}) {
  const internalRef = useRef(null);
  const ref = nodeRef || internalRef;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty("--ry", `${(px - 0.5) * strength}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * strength}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <span className="tilt-card-spotlight" aria-hidden="true" />
      <div className="tilt-card-content">{children}</div>
    </Tag>
  );
}
