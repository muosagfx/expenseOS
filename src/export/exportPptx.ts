import PptxGenJS from 'pptxgenjs';
import type { LayoutContext, LayoutDefinition, SlideElement } from '../types';

function hex(color: string): string {
  return color.replace('#', '').toUpperCase();
}

function addElement(pptx: PptxGenJS, slide: PptxGenJS.Slide, el: SlideElement): void {
  switch (el.kind) {
    case 'rect':
    case 'ellipse': {
      const shape = el.kind === 'rect' ? pptx.ShapeType.rect : pptx.ShapeType.ellipse;
      slide.addShape(shape, {
        x: el.frame.x,
        y: el.frame.y,
        w: el.frame.w,
        h: el.frame.h,
        fill: el.fill ? { color: hex(el.fill) } : { type: 'none' },
        line: el.line ? { color: hex(el.line.color), width: el.line.width } : { type: 'none' },
        rotate: el.kind === 'rect' ? el.rotate : undefined,
      });
      break;
    }
    case 'text': {
      slide.addText(el.text, {
        x: el.frame.x,
        y: el.frame.y,
        w: el.frame.w,
        h: el.frame.h,
        fontFace: el.fontFace,
        fontSize: el.size,
        color: hex(el.color),
        bold: el.bold ?? false,
        italic: el.italic ?? false,
        align: el.align ?? 'left',
        valign: el.valign ?? 'top',
        charSpacing: el.charSpacing,
        lineSpacingMultiple: el.lineSpacing,
        rtlMode: el.rtl ?? false,
        margin: 0,
      });
      break;
    }
  }
}

/** Build a .pptx containing one slide per selected layout and trigger a browser download. */
export async function exportPptx(layouts: LayoutDefinition[], ctx: LayoutContext): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 in, 16:9
  pptx.title = 'Divider Slides';

  for (const layout of layouts) {
    const slide = pptx.addSlide();
    slide.background = { color: hex(ctx.inputs.background) };
    for (const el of layout.build(ctx)) {
      addElement(pptx, slide, el);
    }
  }

  await pptx.writeFile({ fileName: `dividers-${ctx.preset.id}.pptx` });
}
