import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

/** 공개 글만 (draft: true는 목록·홈·사이트맵·[slug] 어디에도 나오지 않는다) */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

/** 언어별 공개 프로젝트(draft 제외, order 순). kind를 주면 case(상세 페이지 있음) / brief(짧은 항목)만 */
export async function getProjects(
  lang: Lang,
  kind?: 'case' | 'brief'
): Promise<CollectionEntry<'projects'>[]> {
  return (
    await getCollection(
      'projects',
      ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft && (!kind || data.kind === kind)
    )
  ).sort((a, b) => a.data.order - b.data.order);
}

/** 'ko/heat-trip' → 'heat-trip' */
export function projectSlug(p: CollectionEntry<'projects'>): string {
  return p.id.split('/').pop()!;
}
