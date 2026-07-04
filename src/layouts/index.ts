import type { LayoutDefinition, LayoutId } from '../types';
import { bigNumberLayout } from './bigNumber';
import { leftEditorialLayout } from './leftEditorial';
import { centeredPremiumLayout } from './centeredPremium';
import { splitGridLayout } from './splitGrid';
import { patternFooterLayout } from './patternFooter';
import { topBarLayout } from './topBar';
import { fullBleedTextureLayout } from './fullBleedTexture';
import { minimalLineLayout } from './minimalLine';
import { bilingualLayout } from './bilingual';
import { eventProposalLayout } from './eventProposal';

export const LAYOUTS: LayoutDefinition[] = [
  bigNumberLayout,
  leftEditorialLayout,
  centeredPremiumLayout,
  splitGridLayout,
  patternFooterLayout,
  topBarLayout,
  fullBleedTextureLayout,
  minimalLineLayout,
  bilingualLayout,
  eventProposalLayout,
];

export function getLayout(id: LayoutId): LayoutDefinition {
  const layout = LAYOUTS.find((l) => l.id === id);
  if (!layout) throw new Error(`Unknown layout: ${id}`);
  return layout;
}
