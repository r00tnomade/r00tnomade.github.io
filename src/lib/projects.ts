import { ownershipLabel, statusLabel, todo, type Copy, type Project } from '../content/site';

/** Short labels that say who did the work and where it stands. */
export function projectMeta(p: Project): Copy[] {
  return [
    p.ownership === 'tbd' ? todo('Personal or team project') : ownershipLabel[p.ownership],
    p.status === 'tbd' ? null : statusLabel[p.status],
  ].filter((m): m is Copy => m !== null);
}
