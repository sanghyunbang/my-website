import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const linkCards = [
  {
    title: 'Basic Resume',
    subtitle: '나의 기본 이력서',
    href: 'https://www.notion.so/Hi-I-m-SangHyun-321b82bc8b718076951af8d8979005ff?source=copy_link',
    description: '경력, 기술 스택, 프로젝트 이력을 한 번에 볼 수 있는 Notion 이력서입니다.',
    badge: 'Notion',
    action: 'View Resume',
  },
  {
    title: 'Portfolio',
    subtitle: '나의 포트폴리오',
    href: 'https://www.figma.com/deck/lm0luFHjvmFkrk9ILnaKHZ/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=1-259&t=QONEdD7IQrzUUc2f-1',
    description: '작업 흐름과 결과물을 슬라이드 형식으로 정리한 Figma 포트폴리오입니다.',
    badge: 'Figma',
    action: 'View Portfolio',
  },
  {
    title: 'GitHub',
    subtitle: '나의 깃허브',
    href: 'https://github.com/sanghyunbang',
    description: '개발 중인 코드, 실험 프로젝트, 저장소를 바로 확인할 수 있습니다.',
    badge: 'Code',
    action: 'Open GitHub',
  },
  {
    title: 'Live App',
    subtitle: '운영 서비스 앱',
    href: 'https://m.onestore.co.kr/v2/ko-kr/app/0001002340',
    description: '실제 운영 중인 앱의 배포 페이지로 바로 이동합니다.',
    badge: 'Service',
    action: 'Open App',
  },
] as const;

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="SangHyun Bang personal landing page">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Personal Hub</p>
            <h1 className={styles.title}>{siteConfig.title}</h1>
            <p className={styles.description}>
              이력서, 포트폴리오, GitHub, 운영 서비스 링크를 가장 빠르게 확인할 수 있도록
              정리한 개인 랜딩 페이지입니다.
            </p>
          </div>
        </section>

        <section className={styles.linksSection}>
          <div className={styles.grid}>
            {linkCards.map((card) => (
              <a
                key={card.href}
                className={styles.card}
                href={card.href}
                target="_blank"
                rel="noreferrer">
                <span className={styles.badge}>{card.badge}</span>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardSubtitle}>{card.subtitle}</p>
                <p className={styles.cardDescription}>{card.description}</p>
                <span className={styles.cardAction}>{card.action}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
