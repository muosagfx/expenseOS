import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { SlideElement } from '../types';
import { SLIDE_H, SLIDE_W } from '../layouts/helpers';

interface SlidePreviewProps {
  elements: SlideElement[];
  background: string;
}

const JUSTIFY: Record<string, CSSProperties['justifyContent']> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};

/**
 * Renders the abstract slide element list as absolutely positioned HTML,
 * scaled to the container width so it stays a faithful 16:9 miniature.
 */
export function SlidePreview({ elements, background }: SlidePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pixels per inch of slide space; points convert at 72pt = 1in.
  const ppi = width / SLIDE_W;
  const pt = (points: number) => (points / 72) * ppi;

  const frameStyle = (el: SlideElement): CSSProperties => ({
    position: 'absolute',
    left: `${(el.frame.x / SLIDE_W) * 100}%`,
    top: `${(el.frame.y / SLIDE_H) * 100}%`,
    width: `${(el.frame.w / SLIDE_W) * 100}%`,
    height: `${(el.frame.h / SLIDE_H) * 100}%`,
  });

  return (
    <div ref={ref} className="slide-preview" style={{ background }}>
      {width > 0 &&
        elements.map((el, i) => {
          if (el.kind === 'rect' || el.kind === 'ellipse') {
            return (
              <div
                key={i}
                style={{
                  ...frameStyle(el),
                  background: el.fill ?? 'transparent',
                  border: el.line ? `${pt(el.line.width)}px solid ${el.line.color}` : undefined,
                  borderRadius: el.kind === 'ellipse' ? '50%' : undefined,
                  transform: el.kind === 'rect' && el.rotate ? `rotate(${el.rotate}deg)` : undefined,
                }}
              />
            );
          }
          return (
            <div
              key={i}
              dir={el.rtl ? 'rtl' : 'ltr'}
              style={{
                ...frameStyle(el),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: JUSTIFY[el.valign ?? 'top'],
                textAlign: el.align ?? 'left',
                fontFamily: `'${el.fontFace}', sans-serif`,
                fontSize: pt(el.size),
                color: el.color,
                fontWeight: el.bold ? 700 : 400,
                fontStyle: el.italic ? 'italic' : undefined,
                letterSpacing: el.charSpacing ? pt(el.charSpacing) : undefined,
                WebkitTextStroke: el.outline ? `${pt(el.outline.width)}px ${el.outline.color}` : undefined,
                lineHeight: el.lineSpacing ?? 1.15,
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
              }}
            >
              <div>{el.text}</div>
            </div>
          );
        })}
    </div>
  );
}
