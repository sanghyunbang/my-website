import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;            // 카드 제목 (한글)
  imgUrl?: string;          // 외부 이미지 URL (Unsplash, GitHub, CDN 등)
  description: ReactNode;   // 설명 (한글)
  tags?: string[];          // 뱃지(예: ['Frontend','Backend','AI/ML'])
  linkUrl?: string;         // 자세히 보기 링크(선택)
};

// 👉 여기에 원하는 외부 이미지를 자유롭게 넣으세요.
const FeatureList: FeatureItem[] = [
  {
    title: '문제 해결형 백엔드',
    imgUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    description: <>Spring Boot · JPA · MySQL · Redis로 안정적인 API와 데이터 파이프라인을 설계합니다.</>,
    tags: ['Backend', 'DevOps'],
    linkUrl: '/blog/tags/backend',
  },
  {
    title: '사용자 경험 중심 프론트엔드',
    imgUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    description: <>React/Flutter로 반응형·접근성·애니메이션을 고려한 인터페이스를 만듭니다.</>,
    tags: ['Frontend', 'UX'],
    linkUrl: '/blog/tags/frontend',
  },
  {
    title: '데이터·AI 실험 정신',
    imgUrl: 'https://images.unsplash.com/photo-1519305122945-7f1519b6e3e1?q=80&w=1600&auto=format&fit=crop',
    description: <>Bandit · Ranking · Embedding 등으로 실제 서비스에서 학습과 평가를 반복합니다.</>,
    tags: ['AI/ML', 'MLOps'],
    linkUrl: '/blog/tags/ai',
  },
];

function FeatureCard({title, imgUrl, description, tags, linkUrl}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <a className={styles.card} href={linkUrl ?? '#'} aria-label={title}>
        {imgUrl && (
          <div className={styles.thumbWrap}>
            <img src={imgUrl} alt={title} className={styles.thumb} loading="lazy" />
          </div>
        )}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
