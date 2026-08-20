import * as React from "react"

/**
 * Design-sync shim for `next/image` — the design bundle has no Next.js
 * runtime, so images render as plain <img>. Aliased via tsconfig.sync.json.
 */
export default function Image({
  src,
  alt = "",
  width,
  height,
  fill,
  priority: _priority,
  quality: _quality,
  loader: _loader,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  sizes,
  style,
  ...rest
}: any) {
  const finalStyle = fill
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, ...style }
    : style
  return (
    <img
      src={typeof src === "string" ? src : src?.src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      style={finalStyle}
      {...rest}
    />
  )
}
